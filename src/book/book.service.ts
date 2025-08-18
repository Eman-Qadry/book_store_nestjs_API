import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(private prisma: PrismaService) {}

  create(createBookDto: CreateBookDto) {
    return this.prisma.book.create({
      data: createBookDto,
    });
  }

  findAll() {
    return this.prisma.book.findMany();
  }

  findOne(id: number) {
    return this.prisma.book.findUnique({
      where: { id },
    });
  }

  update(id: number, updateBookDto: UpdateBookDto) {
    return this.prisma.book.update({
      where: { id },
      data: updateBookDto,
    });
  }

   remove(id: number) {
    return this.prisma.book.delete({
      where: { id },
    });
  }

  searchByTitle(title: string) {
    return this.prisma.book.findMany({
      where: { title: { contains: title, mode: 'insensitive' } },
    });
  }

  findByAuthor(authorId: number) {
    return this.prisma.book.findMany({
      where: { authorId },
    });
  }

  findByCategory(categoryId: number) {
    return this.prisma.book.findMany({
      where: { categoryId },
    });
  }
  findPopularBooks() {
    return this.prisma.book.findMany({
      orderBy: {
        soldCount: 'desc',
      },
      take: 10,
    });
  }

  findLatestBooks() {
    return this.prisma.book.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });
  }

  findFeaturedBooks() {
    return this.prisma.book.findMany({
      where: {
        isFeatured: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });
  }

  findTopRatedBooks() {
    return this.prisma.book.findMany({
      orderBy: {
        rating: 'desc',
      },
      where: {
        rating: {
          gte: 4,
        },
      },
      take: 10,
    });
  }

  findRecommendedBooks() {
    return this.prisma.book.findMany({
      orderBy: {
        viewCount: 'desc',
      },
      take: 10,
    });
  }

  findBestsellers() {
    return this.prisma.book.findMany({
      orderBy: {
        soldCount: 'desc',
      },
      take: 10,
    });
  }

  findTrendingBooks() {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    return this.prisma.book.findMany({
      where: {
        createdAt: {
          gte: oneWeekAgo,
        },
      },
      orderBy: {
        viewCount: 'desc',
      },
      take: 10,
    });
  }

  findNewReleases() {
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    return this.prisma.book.findMany({
      where: {
        createdAt: {
          gte: oneMonthAgo,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });
  }
}
