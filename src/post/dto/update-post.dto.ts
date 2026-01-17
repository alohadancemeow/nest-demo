import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    @IsOptional()
    @IsString()
    readonly name?: string;

    @IsOptional()
    @IsString()
    readonly description?: string;

    @IsOptional()
    @IsNumber()
    readonly price?: number;
}
