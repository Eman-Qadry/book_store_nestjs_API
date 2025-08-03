import { IsNotEmpty,IsString } from "class-validator";
export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string;
    
    @IsString()
    description?: string; // Optional field for category description
    }