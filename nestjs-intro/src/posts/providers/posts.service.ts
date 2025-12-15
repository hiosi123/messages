import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';

@Injectable()
export class PostsService {
    constructor(
        private readonly usersService: UsersService
    ) {
    }

    findAll(userId: string) {
        const user = this.usersService.findOneById(userId)

        return [
            {
                user,
                title: "best",
                content: "hi",
            }
        ]
    }

    create(createPostDto: CreatePostDto) {
        return {
            postId: "1",
            ...createPostDto,
        }
    }
}
