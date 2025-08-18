import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { PrismaService } from 'prisma/prisma.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoriesService } from './categories/categories.service';
import { CategoriesController } from './categories/categories.controller';
import { CategoriesModule } from './categories/categories.module';
import { AuthorsModule } from './authors/authors.module';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { OrdersModule } from './orders/orders.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  imports: [BookModule, AuthModule, UserModule, CategoriesModule, AuthorsModule, CartModule, WishlistModule, OrdersModule, ReviewsModule,PrismaModule],
  controllers: [AppController, CategoriesController, CartController, OrdersController],
  providers: [AppService,PrismaService, CategoriesService, CartService, OrdersService],
  exports: [PrismaService],
})
export class AppModule {}
