import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePostDto, updatePostDto } from './posts.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async createPost({ title, content }: CreatePostDto, id: number) {
    try {
      if (id != null) {
        const post = this.prisma.post.create({
          data: {
            title,
            content,
            authorId: id,
          },
        });
        return post;
      }
      throw new UnauthorizedException('token expirado');
    } catch {
      throw new BadRequestException();
    }
  }

  async getAllPostsFromUser(id: number) {
    try {
      return this.prisma.post.findMany({
        where: {
          authorId: id,
        },
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async getPostsByTitle(title: string, id: number) {
    try {
      return this.prisma.post.findMany({
        where: {
          title: {
            startsWith: `_${title}_`,
          },
          authorId: id,
        },
      });
    } catch {
      throw new BadRequestException();
    }
  }

  async updatePost(postToUpdate: updatePostDto, postId: number) {
    try {
      const post = this.prisma.post.findUnique({
        where: {
          id: postId,
        },
      });
      if (post) {
        const update = this.prisma.post.update({
          where: {
            id: (await post).id,
          },
          data: {
            content:
              postToUpdate.content !== null || postToUpdate.content !== ''
                ? postToUpdate.content
                : (await post).content,
            title:
              postToUpdate.title !== null || postToUpdate.title !== ''
                ? postToUpdate.title
                : (await post).title,
          },
        });
        return update;
      }
      throw new NotFoundException('post dont exists');
    } catch (error) {
      throw error;
    }
  }

  async deletePost(id: number) {
    try {
      const post = this.prisma.post.findUnique({
        where: {
          id: id,
        },
      });
      if (post) {
        const postToDelete = this.prisma.post.delete({
          where: {
            id: (await post).id,
          },
        });
        return postToDelete;
      }
      throw new NotFoundException('post dont exists');
    } catch (error) {
      throw error;
    }
  }
}
