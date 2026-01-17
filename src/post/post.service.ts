import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schema/post.schema';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) { }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const createdPost = new this.postModel(createPostDto);
    return createdPost.save();
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findOne(id: string): Promise<Post | null> {
    return this.postModel.findById(id).exec();
  }

  async update(id: string, updatePostDto: UpdatePostDto): Promise<Post | null> {
    const post = await this.postModel.findById(id).exec();
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return this.postModel.findByIdAndUpdate(id, updatePostDto, { new: true }).exec();
  }

  async remove(id: string): Promise<{ message: string } | null> {
    try {
      const result = await this.postModel.findByIdAndDelete(id).exec();

      if (!result) {
        throw new NotFoundException(`Post with id ${id} not found`);
      }
      return { message: 'Post deleted successfully' };
    } catch (error) {
      throw new InternalServerErrorException(`Error deleting post with id ${id}`);
    }
  }
}
