import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BookService {

    constructor(private prisma: PrismaService) {}
    async getAllBooks() {
        return this.prisma.book.findMany();
    }
    async getBookById(id: number) {
        return this.prisma.book.findUnique({
            where: { id },
        });
    }
    async createBook(data: { title: string; author: string; price: number }) {
        return this.prisma.book.create({
            data,
        });
    }
    async updateBook(id: number, data: { title?: string; author?: string; price?: number }) {
        return this.prisma.book.update({
            where: { id },
            data,
        });
    }
    async deleteBook(id: number) {
        return this.prisma.book.delete({
            where: { id },
        });
    }
    async getBooksByAuthor(author: string) {
        return this.prisma.book.findMany({
            where: { author },
        });
    }
    async getBooksByPriceRange(minPrice: number, maxPrice: number) {
        return this.prisma.book.findMany({
            where: {
                price: {
                    gte: minPrice,
                    lte: maxPrice,
                },
            },
        });
    }
    async getBooksByTitle(title: string) {
        return this.prisma.book.findMany({
            where: {
                title: {
                    contains: title,
                    mode: 'insensitive',
                },
            },
        });
    }
    async getBookByCategory(category: string) {
        return this.prisma.book.findMany({
            where: {
                category: {
                    contains: category,
                    mode: 'insensitive',
                },
            },
        });
    }
}
