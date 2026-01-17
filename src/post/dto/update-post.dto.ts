import { PartialType } from '@nestjs/swagger';
import { CreatePostDto } from './create-post.dto';

export class UpdatePostDto extends PartialType(CreatePostDto) {
    readonly name?: string;
    readonly description?: string;
    readonly price?: number;
}
