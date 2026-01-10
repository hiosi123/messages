import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { SignInDto } from './dtos/signin.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('sign-in')
    @HttpCode(HttpStatus.ACCEPTED)
    async signIn(@Body() signInDto: SignInDto) {
        return await this.authService.signIn(signInDto);
    }
}

// what is hashing
// hash function, one way process, which is irrversable
