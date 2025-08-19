import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'prisma/prisma.service';
export class ReviewsService {
constructor(private readonly prisma: PrismaService) {}
    async create(userId: number, dto: CreateReviewDto) {
        return this.prisma.review.create({
            data: {
                bookId: dto.bookId,
                userId,
                comment: dto.content,
                rating: dto.rating,
            },
        });
    }

    async findByBookId(bookId: number) {
        return this.prisma.review.findMany({
            where: { bookId },

           
        });
    }

    async update(userId:number,id: number, dto: UpdateReviewDto) {
        return this.prisma.review.update({
            where: { id },
            data: {
                bookId: dto.bookId,
                userId: userId,
                comment: dto.content,
                rating: dto.rating,
            },
        });
    }

    async findAll() {
        return this.prisma.review.findMany();
    }

    async delete(id: number) {
        return this.prisma.review.delete({
            where: { id },
        });
    }
}
