import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { ZodValidationPipe } from 'src/pipes/zod.pipe';
import { CreatePostDto, createPostSchema } from './posts.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('posts')
export class PostsController {
  constructor(private posts: PostsService) {}

  @Post()
  @UsePipes(new ZodValidationPipe(createPostSchema))
  async createPost(@Body() post: CreatePostDto, @Request() req) {
    return this.posts.createPost(post, Number.parseInt(req.user.sub));
  }

  @Get()
  async getPosts(@Request() req) {
    return this.posts.getAllPostsFromUser(Number.parseInt(req.user.sub));
  }
}
