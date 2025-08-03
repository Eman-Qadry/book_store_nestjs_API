
import { BookService } from './book.service';
import {Controller, Get, Param,Post,Delete,Patch,Body } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
 constructor(private readonly bookService: BookService) {}
    @Post()
    create(@Body() createBookDto: CreateBookDto) {
        return this.bookService.create(createBookDto);
    }
    @Get()
    findAll() {
        return this.bookService.findAll();
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bookService.findOne(+id);
    }
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
        return this.bookService.update(+id, updateBookDto);
    }
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bookService.remove(+id);
    }
    @Get('search/:title')
    searchByTitle(@Param('title') title: string) {
        return this.bookService.searchByTitle(title);
    }
    @Get('author/:authorId')
    findByAuthor(@Param('authorId') authorId: string) {
        return this.bookService.findByAuthor(+authorId);
    }
    @Get('category/:categoryId')
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
