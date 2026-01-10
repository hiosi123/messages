import { BadRequestException, Injectable, RequestTimeoutException } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../post.entity';
import { MetaOption } from 'src/meta-options/meta-option.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { Tag } from 'src/tags/tag.entity';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { Pagniated } from 'src/common/pagination/interfaces/paginated.interface';

@Injectable()
export class PostsService {
    constructor(
        private readonly usersService: UsersService,

        private readonly tagsService: TagsService,

        @InjectRepository(Post)
        private readonly postReposiotry: Repository<Post>,

        @InjectRepository(MetaOption)
        private readonly metaOptionRepository: Repository<MetaOption>,

        private readonly paginationProvider: PaginationProvider
    ) {}

    async findAll(userId: string, postQuery: GetPostsDto): Promise<Pagniated<Post>> {
        let posts = await this.paginationProvider.paginateQuery(
            {
                limit: postQuery.limit,
                page: postQuery.page
            },
            this.postReposiotry
        );
        return posts;
    }

    async create(createPostDto: CreatePostDto) {
        // find author from database based on authorId
        const author = await this.usersService.findOneById(createPostDto.authorId);

        if (!author) {
            throw new BadRequestException();
        }

        const tags = await this.tagsService.findMutipleTags(createPostDto.tags || []);

        if (!tags) {
            throw new BadRequestException();
        }

        // create post
        const post = this.postReposiotry.create({
            ...createPostDto,
            author,
            tags
        });

        // return the post
        return await this.postReposiotry.save(post);
    }

    async update(patchPostDto: PatchPostDto) {
        let tags: Tag[] | null;
        let post: Post | null;

        try {
            tags = await this.tagsService.findMutipleTags(patchPostDto.tags || []);
        } catch (error) {
            throw new RequestTimeoutException('Unable to process your request at the moment please try later');
        }
        // find the tags

        if (!tags || tags.length !== patchPostDto?.tags?.length) {
            throw new BadRequestException('Please check your tag Ids and ensure they are correct');
        }
        // find the posts
        try {
            post = await this.postReposiotry.findOneBy({
                id: patchPostDto.id
            });
        } catch (error) {
            throw new RequestTimeoutException('Unable to process your request at the moment please try later');
        }

        if (!post) {
            throw new BadRequestException('The Post ID does not exist');
        }
        // update the properties
        post.title = patchPostDto.title ?? post.title;
        post.content = patchPostDto.content ?? post.content;
        post.postStatus = patchPostDto.status ?? post.postStatus;
        post.postType = patchPostDto.postType ?? post.postType;
        post.slug = patchPostDto.slug ?? post.slug;
        post.featuredImageUrl = patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
        post.publishOn = patchPostDto.publishOn ?? post.publishOn;

        // assign the new tags
        post.tags = tags;

        // save the post and return
        return await this.postReposiotry.save(post);
    }

    async delete(id: number) {
        await this.postReposiotry.delete(id); //from many to many it delets the relation

        return { deleted: true, id };
    }
}
