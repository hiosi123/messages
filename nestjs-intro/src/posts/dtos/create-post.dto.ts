import { Type } from 'class-transformer';
import {
    IsArray,
    IsDate,
    IsEnum,
    IsInt,
    IsISO8601,
    IsJSON,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUrl,
    Matches,
    MaxLength,
    MinLength,
    ValidateNested
} from 'class-validator';
import { PostType } from '../enums/postType.enum';
import { Status } from '../enums/postStatus.enum';
import { CreatePostMetaOptionsDto } from '../../meta-options/dtos/create-post-meta-options.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Tag } from 'src/tags/tag.entity';

export class CreatePostDto {
    @ApiProperty({
        description: 'This is the title for the blog post',
        example: 'This is a title'
    })
    @IsString()
    @MinLength(4)
    @MaxLength(512)
    @IsNotEmpty()
    title: string;

    @ApiProperty({
        enum: PostType,
        description: "Possible values, 'post', 'page', 'story', 'seriese'"
    })
    @IsEnum(PostType)
    @IsNotEmpty()
    postType: PostType;

    @ApiProperty({
        description: "For Example - 'my-url'"
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
        message: 'A slug should be all small letters and uses only "-" and without spaces. For exampl "my-url"'
    })
    @MaxLength(256)
    slug: string;

    @ApiProperty({
        enum: Status,
        description: "Possbile Values 'draft', 'scheduled', 'review', 'published'"
    })
    @IsEnum(Status)
    @IsNotEmpty()
    status: Status;

    @ApiPropertyOptional({
        description: 'This is the content of the post',
        example: 'The post content'
    })
    @IsString()
    @IsOptional()
    content?: string;

    @ApiPropertyOptional({
        description: 'Serialize your JSON object else a validation error will be thrown'
    })
    @IsOptional()
    @IsJSON()
    schema?: string;

    @ApiPropertyOptional({
        description: 'http://image-url.com'
    })
    @IsOptional()
    @IsUrl()
    @MaxLength(1024)
    featuredImageUrl?: string;

    @ApiPropertyOptional({
        description: 'The date the blog post is posted'
    })
    @IsISO8601()
    @IsOptional()
    publishOn?: Date;

    @ApiPropertyOptional({
        description: 'Array of ids tags passed',
        example: [1, 2]
    })
    @IsOptional()
    @IsArray()
    @IsInt({ each: true })
    tags?: number[];

    @ApiPropertyOptional({
        type: () => CreatePostMetaOptionsDto,
        description: 'An optional object to store meta key-value data',
        example: {
            metaValue: {
                sidebarEnabled: true,
                showAuthor: false
            }
        }
    })
    @IsOptional()
    @ValidateNested()
    @Type(() => CreatePostMetaOptionsDto)
    metaOptions?: CreatePostMetaOptionsDto;

    @IsInt()
    @IsNotEmpty()
    @ApiProperty({
        type: 'integer',
        required: true,
        example: 1
    })
    authorId: number;
}
