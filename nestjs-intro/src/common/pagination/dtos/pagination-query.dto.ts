import { Type } from 'class-transformer';
import { IsOptional, IsPositive, MaxLength } from 'class-validator';

export class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    limit: number = 10;

    @IsOptional()
    @IsPositive()
    page: number = 1;
}
