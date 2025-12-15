import { Type } from "class-transformer";
import { IsArray, IsDate, IsEnum, IsISO8601, IsJSON, IsNotEmpty, IsOptional, IsString, IsUrl, Matches, MinLength, ValidateNested } from "class-validator";
import { PostType } from "../enums/postType.enum";
import { Status } from "../enums/postStatus.enum";
import { CreatePostMetaOptionsDto } from "./create-post-meta-options.dto";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";


export class CreatePostDto {
    @ApiProperty({
        description: 'This is the title for the blog post',
        example: "This is a title",
    })
    @IsString()
    @MinLength(4)
    @IsNotEmpty()
    title: string;


    @ApiProperty({
        enum: PostType,
        description: "Possible values, 'post', 'page', 'story', 'seriese'",
    })
    @IsEnum(PostType)
    @IsNotEmpty()
    postType: PostType;

    @ApiProperty({
        description: "For Example - 'my-url'",
    })
    @IsString()
    @IsNotEmpty()
    @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/,{
        message: 
        'A slug should be all small letters and uses only "-" and without spaces. For exampl "my-url"'
    })
    slug: string;

    @ApiProperty({
        enum: Status,
        description: "Possbile Values 'draft', 'scheduled', 'review', 'published'"
    })
    @IsEnum(Status)
    @IsNotEmpty()
    status: Status;


    @ApiPropertyOptional({
        description: "This is the content of the post",
        example: "The post content",
    })
    @IsString()
    @IsOptional()
    content?: string;

    @ApiPropertyOptional({
        description: "Serialize your JSON object else a validation error will be thrown",
    })
    @IsOptional()
    @IsJSON()
    schema?: string;

    @ApiPropertyOptional({
        description: "http://image-url.com"
    })
    @IsOptional()
    @IsUrl()
    featuredImageUrl?: string;

    @ApiPropertyOptional({
        description: "The date the blog post is posted"
    })
    @IsISO8601()
    @IsOptional()
    publishOn?: Date;

    @ApiPropertyOptional({
        description: "Array of tags passed",
    })
    @IsOptional()
    @IsArray()
    @IsString({each: true})
    @MinLength(3, {each: true})
    tags?: string[];


    @ApiPropertyOptional({
        type: "array",
        required: false,
        items: {
            type: 'object',
            properties: {
                key: {
                    type: 'string',
                    description: 'the key can be any string identifier for your meta option',
                    example: 'sidebarEnabled',
                },
                value: {
                    type: 'any',
                    description: 'Any value',
                    example: true
                }
                
            }
        }
    })
    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    @Type(() => CreatePostMetaOptionsDto)
    metaOptions?: CreatePostMetaOptionsDto[];
}

