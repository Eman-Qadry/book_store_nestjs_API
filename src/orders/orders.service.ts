import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import Stripe from 'stripe';

@Injectable()
export class OrdersService {
  private stripe: Stripe;

  constructor(private prisma: PrismaService) {
    this.stripe = new Stripe(
      process.env.STRIPE_SECRET_KEY || 'default_stripe_value',
    );
  }

  async create(userId: number, dto: CreateOrderDto) {
    // Get book prices
    const bookIds = dto.items.map((item) => item.bookId);
    const books = await this.prisma.book.findMany({
      where: { id: { in: bookIds } },
    });

    if (books.length !== dto.items.length) {
      throw new NotFoundException('One or more books not found');
    }

    let totalPrice = 0;
    const orderItems = dto.items.map((item) => {
      const book = books.find((b) => b.id === item.bookId);
      if (!book) {
        throw new NotFoundException(`Book with ID ${item.bookId} not found`);
      }
      const price = book.price * item.quantity;
      totalPrice += price;
      return {
        bookId: item.bookId,
        quantity: item.quantity,
        price: book.price,
      };
    });

    // Create order in DB (pending)
    const order = await this.prisma.order.create({
      data: {
        userId,
        total: totalPrice,
        status: 'PENDING',
        items: { create: orderItems },
      },
      include: { items: true },
    });

    // Create Stripe payment session
    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: orderItems.map((item) => {
        const book = books.find((b) => b.id === item.bookId);
        return {
          price_data: {
            currency: 'usd',
            product_data: { name: book?.title || 'Unknown Book' },
            unit_amount: item.price * 100, // stripe in cents
          },
          quantity: item.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}/orders/success?orderId=${order.id}`,
      cancel_url: `${process.env.CLIENT_URL}/orders/cancel?orderId=${order.id}`,
      metadata: { orderId: order.id.toString() },
    });

    return { order, checkoutUrl: session.url };
  }

  async findUserOrders(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: { include: { book: true } } },
    });
  }

  async updateStatus(orderId: number, dto: UpdateOrderStatusDto) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: dto.status },
    });
  }
  constructWebhookEvent(rawBody: Buffer, sig: string | string[]) {
    return this.stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET || 'default_webhook_secret_value',
    );
  }

  async handleWebhookEvent(event: Stripe.Event) {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (!session.metadata || !session.metadata.orderId) {
          console.log('No order ID in session metadata');
            return;
        }
        const orderId = session.metadata.orderId ;

        await this.prisma.order.update({
          where: { id: Number(orderId) },
          data: { status: 'PAID' },
        });
        break;
      }
      case 'payment_intent.payment_failed': {
        const intent = event.data.object as Stripe.PaymentIntent;
        const orderId = intent.metadata?.orderId;

        if (orderId) {
          await this.prisma.order.update({
            where: { id: Number(orderId) },
            data: { status: 'CANCELLED' },
          });
        }
        break;
      }
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  }
}
