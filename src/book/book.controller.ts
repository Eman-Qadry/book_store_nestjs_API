import { BookService } from './book.service';
import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  Patch,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'customer')
  findAll() {
    return this.bookService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }
  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }
  @Get('search/:title')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'customer')
  searchByTitle(@Param('title') title: string) {
    return this.bookService.searchByTitle(title);
  }
  @Get('author/:authorId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'customer')
  findByAuthor(@Param('authorId') authorId: string) {
    return this.bookService.findByAuthor(+authorId);
  }
  @Get('category/:categoryId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'customer')
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.bookService.findByCategory(+categoryId);
  }
  @Get('popular')
  findPopularBooks() {
    return this.bookService.findPopularBooks();
  }
  @Get('latest')
  findLatestBooks() {
    return this.bookService.findLatestBooks();
  }
  @Get('featured')
  findFeaturedBooks() {
    return this.bookService.findFeaturedBooks();
  }
  @Get('top-rated')
  findTopRatedBooks() {
    return this.bookService.findTopRatedBooks();
  }
  @Get('recommended')
  findRecommendedBooks() {
    return this.bookService.findRecommendedBooks();
  }
  @Get('bestsellers')
  findBestsellers() {
    return this.bookService.findBestsellers();
  }
  @Get('trending')
  findTrendingBooks() {
    return this.bookService.findTrendingBooks();
  }
  @Get('new-releases')
  findNewReleases() {
    return this.bookService.findNewReleases();
  }
}
