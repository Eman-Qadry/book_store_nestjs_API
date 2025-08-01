import { Controller } from '@nestjs/common';
import { BookService } from './book.service';
import { Get, Param,Post } from '@nestjs/common';
@Controller('book')
export class BookController {
    constructor(private readonly bookService: BookService) {}
   
    // @Get()
    @Get('all')
    async getAllBooks() {
        return this.bookService.getAllBooks();
    }
    // @Get(':id')
    @Get(':id') 
    async getBookById(@Param('id') id: number) {
        return this.bookService.getBookById(id);
    }   

}
