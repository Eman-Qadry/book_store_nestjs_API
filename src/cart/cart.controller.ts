import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { UpdateCartItemDto } from './dto/update-cart-item.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer')
  getCart(@CurrentUser() user: any) {
    return this.cartService.getCart(user.userId);
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer')
  addToCart(@CurrentUser() user: any, @Body() dto: AddToCartDto) {
    return this.cartService.addToCart(user.userId, dto);
  }

  @Patch(':itemId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer')
  updateCartItem(
    @CurrentUser() user: any,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItem(user.userId, itemId, dto);
  }

  @Delete(':itemId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer')
  removeCartItem(
    @CurrentUser() user: any,
    @Param('itemId', ParseIntPipe) itemId: number,
  ) {
    return this.cartService.removeCartItem(user.userId, itemId);
  }

  @Delete('clear')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('customer')
  clearCart(@CurrentUser() user: any) {
    return this.cartService.clearCart(user.userId);
  }
}
