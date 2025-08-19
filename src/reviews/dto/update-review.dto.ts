
import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
} from 'class-validator';
export class UpdateReviewDto {
    @IsOptional()
    @IsNumber()
    bookId?: number;

    @IsOptional()
    @IsString()
    content?: string;

    @IsOptional()
    @IsNumber()
    rating?: number;
}
