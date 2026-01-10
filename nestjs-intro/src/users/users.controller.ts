import {
    Controller,
    Get,
    Post,
    Patch,
    Put,
    Delete,
    Query,
    Param,
    Body,
    Headers,
    Ip,
    ParseIntPipe,
    DefaultValuePipe,
    ValidationPipe,
    UseGuards,
    SetMetadata
} from '@nestjs/common';
import { UsersService } from './providers/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUserParamDto } from './dtos/get-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Controller('users')
@ApiTags('Users')
export class UsersController {
    constructor(
        // Injecting Users Service
        private usersService: UsersService
    ) {}

    // pipes - validation, transformation
    // param id - optional, convert to integer, cannot have a default value

    @Get('{/:id}')
    @ApiOperation({
        description: 'It fetches users'
    })
    @ApiResponse({
        status: 200,
        description: '조회 성공'
    })
    @ApiQuery({
        name: 'limit',
        type: 'number',
        required: false,
        description: 'The number of entries return for query',
        example: 10
    })
    @ApiQuery({
        name: 'page',
        type: 'number',
        required: false,
        description: 'The position of page return for query',
        example: 1
    })
    getUsers(
        @Param() getUserParamDto: GetUserParamDto,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number
    ) {
        return this.usersService.findAll(getUserParamDto, limit, page);
    }

    @Post()
    @Auth(AuthType.None)
    createUsers(@Body() createUserDto: CreateUserDto, @Headers() header: any, @Ip() ip: any) {
        return this.usersService.createUser(createUserDto);
    }

    @Post('create-many')
    createManyUsers(@Body() createManyUsersDto: CreateManyUsersDto) {
        return this.usersService.createMany(createManyUsersDto);
    }

    @Patch()
    patchUser(@Body() patchUserDto: PatchUserDto) {}
}
