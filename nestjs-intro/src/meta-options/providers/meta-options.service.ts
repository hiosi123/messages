import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOption } from '../meta-option.entity';
import { CreatePostMetaOptionsDto } from '../dtos/create-post-meta-options.dto';
import { Repository } from 'typeorm';

@Injectable()
export class MetaOptionsService {
    constructor(
        @InjectRepository(MetaOption)
        private metaOptionRepository: Repository<MetaOption>
    ) {}

    async create(createPostMetaOptionsDto: CreatePostMetaOptionsDto) {
        const metaOption = this.metaOptionRepository.create(createPostMetaOptionsDto);
        return await this.metaOptionRepository.save(metaOption);
    }
}
