import { Controller } from '@nestjs/common';
import { Post, Body, Get, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from 'common/decorators/current-user.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('customer')
    @Post()
    create(@CurrentUser() user: any, @Body() dto: CreateReviewDto) {
        return this.reviewsService.create(user.userId, dto);
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Get(':bookId')
    findByBookId(@Param('bookId') bookId: number) {
        return this.reviewsService.findByBookId(bookId);
    }
   
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('customer')
    @Post(':id')
    update(@CurrentUser() user: any,@Param('id') id: number, @Body() dto: UpdateReviewDto) {
        return this.reviewsService.update(user.userId,id, dto);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get()
    findAll() {
        return this.reviewsService.findAll();
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles('admin')
    @Get(':id')
    delete(@Param('id') id: number) {
        return this.reviewsService.delete(id);
    }
}
