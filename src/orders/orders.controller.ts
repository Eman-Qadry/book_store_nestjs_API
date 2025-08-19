import { Controller, Post, Body, Get, Param, UseGuards, Patch, Req, HttpCode, Res } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderStatusDto } from './dto/update-order-status.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { CurrentUser } from 'common/decorators/current-user.decorator';
import Stripe from 'stripe';
import { Request, Response } from 'express';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
@Roles('customer')
  @Post()
  create(@CurrentUser() user: any, @Body() dto: CreateOrderDto) {
    return this.ordersService.create(user.userId, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  findUserOrders(@CurrentUser() user: any) {
    return this.ordersService.findUserOrders(user.userId);
  }
// admin can update order status
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Patch(':id/status')
  updateStatus(@Param('id') orderId: number, @Body() dto: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(orderId, dto);
  }

  @Post('webhook')
  @HttpCode(200) // Stripe expects 200 to confirm receipt
  async handleWebhook(@Req() req: Request, @Res() res: Response) {
    const sig = req.headers['stripe-signature'] as string;
    let event: Stripe.Event;

    try {
      event = this.ordersService.constructWebhookEvent(req['rawBody'], sig);
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Delegate handling to service
    await this.ordersService.handleWebhookEvent(event);

    return res.send({ received: true });
  }
}
