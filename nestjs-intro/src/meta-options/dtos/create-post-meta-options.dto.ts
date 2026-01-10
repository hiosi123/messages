import { ApiProperty } from '@nestjs/swagger';
import { IsJSON, IsNotEmpty, IsObject } from 'class-validator';

export class CreatePostMetaOptionsDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsObject()
    metaValue: Record<string, any>;
}
