import { Body, Controller, Post } from '@nestjs/common';
import { MetaOptionsService } from './providers/meta-options.service';
import { CreatePostMetaOptionsDto } from './dtos/create-post-meta-options.dto';

@Controller('meta-options')
export class MetaOptionsController {
    constructor(private metaOptionsService: MetaOptionsService) {}

    @Post()
    async CreateMetaOption(@Body() createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
        return this.metaOptionsService.create(createPostMetaOptionsDto);
    }
}
