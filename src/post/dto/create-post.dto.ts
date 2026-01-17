import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreatePostDto {
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly description?: string;
    
    @IsNumber()
    readonly price: number;
}
