import { BadRequestException, forwardRef, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';

@Injectable()
export class CreateUserProvider {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,

        @Inject(forwardRef(() => HashingProvider))
        private readonly hashingProvider: HashingProvider
    ) {}

    async createUser(createUserDto: CreateUserDto) {
        let existingUser: User | null;

        try {
            existingUser = await this.usersRepository.findOne({
                where: { email: createUserDto.email }
            });
        } catch (error) {
            // Infomation which is sensitive
            throw new RequestTimeoutException('Unable to process your request at the moment please try later', {
                description: 'Error connecting to the database'
            });
        }

        if (existingUser) {
            throw new BadRequestException('The user already exists');
        }

        let user = this.usersRepository.create({
            ...createUserDto,
            password: await this.hashingProvider.hashPassword(createUserDto.password)
        });

        try {
            user = await this.usersRepository.save(user);
        } catch (error) {
            throw new RequestTimeoutException('Unable to process your request at the moment please try later', {
                description: 'Error connecting to the database'
            });
        }

        return user;
    }
}
