import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AddToWishlistDto } from './dto/add-to-wishlist.dto';
@Injectable()
export class WishlistService {
    constructor(private readonly prismaService: PrismaService) {}
    async getOrCreateWishlist(userId: number) {
        let wishlist = await this.prismaService.wishlist.findUnique({
            where: { userId },
        });
        if (!wishlist) {
            wishlist = await this.prismaService.wishlist.create({
                data: { userId },
            });
        }
        return wishlist;
    }
    async addToWishlist(userId: number, dto: AddToWishlistDto) {
        const wishlist = await this.getOrCreateWishlist(userId);

        const existingItem = await this.prismaService.wishlistItem.findFirst({
            where: {
                wishlistId: wishlist.id,
                bookId: dto.bookId,
            },
        });

        if (existingItem) {
            throw new NotFoundException('Item already exists in wishlist');
        }

        return this.prismaService.wishlistItem.create({
            data: {
                wishlistId: wishlist.id,
                bookId: dto.bookId,
            },
        });
    }
    async getWishlist(userId: number) {
        const wishlist = await this.getOrCreateWishlist(userId);
        return this.prismaService.wishlist.findUnique({
            where: { id: wishlist.id },
            include: {
                items: {
                    include: { book: true },
                },
            },
        });
    }
   
    async removeFromWishlist(userId: number, bookId: number) {
        const wishlist = await this.getOrCreateWishlist(userId);

        const item = await this.prismaService.wishlistItem.findFirst({
            where: {
                wishlistId: wishlist.id,
                bookId,
            },
        });

        if (!item) {
            throw new NotFoundException('Item not found in wishlist');
        }

        return this.prismaService.wishlistItem.delete({
            where: { id: item.id },
        });
    }

}
