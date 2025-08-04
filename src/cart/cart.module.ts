import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from 'prisma/prisma.service';
@Module({
    providers: [CartService, PrismaService],
    controllers: [CartController],
    exports: [CartService], 
})
export class CartModule {}
