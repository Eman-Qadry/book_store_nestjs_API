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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@ApiTags('Books')
@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new book' })
  @ApiResponse({ status: 201, description: 'Book successfully created' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'customer')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all books' })
  @ApiResponse({ status: 200, description: 'Return all books' })
  findAll() {
    return this.bookService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a book by ID' })
  @ApiResponse({ status: 200, description: 'Return the book' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a book by ID' })
  @ApiResponse({ status: 200, description: 'Book successfully updated' })
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.update(+id, updateBookDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a book by ID' })
  @ApiResponse({ status: 200, description: 'Book successfully deleted' })
  remove(@Param('id') id: string) {
    return this.bookService.remove(+id);
  }

  @Get('search/:title')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'customer')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Search books by title' })
  findByTitle(@Param('title') title: string) {
    return this.bookService.searchByTitle(title);
  }

  @Get('author/:authorId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'customer')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find books by author' })
  findByAuthor(@Param('authorId') authorId: string) {
    return this.bookService.findByAuthor(+authorId);
  }

  @Get('category/:categoryId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'customer')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Find books by category' })
  findByCategory(@Param('categoryId') categoryId: string) {
    return this.bookService.findByCategory(+categoryId);
  }

  @Get('popular')
  @ApiOperation({ summary: 'Get most popular books' })
  findPopularBooks() {
    return this.bookService.findPopularBooks();
  }

  @Get('latest')
  @ApiOperation({ summary: 'Get latest books' })
  findLatestBooks() {
    return this.bookService.findLatestBooks();
  }

  @Get('featured')
  @ApiOperation({ summary: 'Get featured books' })
  findFeaturedBooks() {
    return this.bookService.findFeaturedBooks();
  }

  @Get('top-rated')
  @ApiOperation({ summary: 'Get top rated books (rating >= 4)' })
  findTopRatedBooks() {
    return this.bookService.findTopRatedBooks();
  }

  @Get('recommended')
  @ApiOperation({ summary: 'Get recommended books by view count' })
  findRecommendedBooks() {
    return this.bookService.findRecommendedBooks();
  }

  @Get('bestsellers')
  @ApiOperation({ summary: 'Get bestselling books' })
  findBestsellers() {
    return this.bookService.findBestsellers();
  }

  @Get('trending')
  @ApiOperation({ summary: 'Get trending books in the last week' })
  findTrendingBooks() {
    return this.bookService.findTrendingBooks();
  }

  @Get('new-releases')
  @ApiOperation({ summary: 'Get newly released books (last month)' })
  findNewReleases() {
    return this.bookService.findNewReleases();
  }
}
