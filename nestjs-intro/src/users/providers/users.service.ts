import { BadRequestException, forwardRef, HttpException, HttpStatus, Inject, Injectable, RequestTimeoutException } from '@nestjs/common';
import { GetUserParamDto } from '../dtos/get-user.dto';
import { AuthService } from 'src/auth/providers/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import * as config from '@nestjs/config';
import profileConfig from '../config/profile.config';
import { UsersCreateManyProvider } from './users-create-many.provider';
import { CreateManyUsersDto } from '../dtos/create-many-users.dto';
import { CreateUserProvider } from './create-user.provider';
import { FindOneUserByEmailProvider } from './find-one-user-by-email.provider';

/**
 * Class to connect to users tables and perform users service
 */
@Injectable()
export class UsersService {
    constructor(
        private readonly configService: config.ConfigService,

        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,

        @InjectRepository(User)
        private usersRepository: Repository<User>,

        @Inject(profileConfig.KEY)
        private readonly profileConfiguration: config.ConfigType<typeof profileConfig>,

        private readonly usersCreateManyProviders: UsersCreateManyProvider,

        private readonly createUserProvider: CreateUserProvider,

        private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider
    ) {}

    async createUser(createUserDto: CreateUserDto) {
        return await this.createUserProvider.createUser(createUserDto);
    }

    /**
     * methods to get all user
     */
    findAll(getUserParamDto: GetUserParamDto, limit: number, page: number) {
        throw new HttpException(
            {
                status: HttpStatus.MOVED_PERMANENTLY,
                code: 'BR100',
                error: 'The API endpoint does not exist',
                fileName: 'users.service.ts',
                lineNumber: 88
            },
            HttpStatus.MOVED_PERMANENTLY,
            {
                description: 'Occured because the API endpoint was permanetly moved'
            }
        );
    }

    /**
     * find one user by Id
     */
    async findOneById(id: number) {
        let user: User | null;

        try {
            user = await this.usersRepository.findOneBy({ id });
        } catch (error) {
            throw new RequestTimeoutException('Unable to process your request at the moment please try later', {
                description: 'Error connecting to the database'
            });
        }

        if (!user) {
            throw new BadRequestException('The user id does not exist');
        }

        return user;
    }

    async createMany(createManyUsersDto: CreateManyUsersDto) {
        return await this.usersCreateManyProviders.createMany(createManyUsersDto);
    }

    async findOneByEmail(email: string) {
        return await this.findOneUserByEmailProvider.findOneByEmail(email);
    }
}
