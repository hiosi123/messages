import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import * as config from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import jwtConfig from 'src/auth/config/jwt.config';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constant';

@Injectable()
export class AccessTokenGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,

        @Inject(jwtConfig.KEY)
        private readonly jwtConfiguration: config.ConfigType<typeof jwtConfig>
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        // extract the request fromt he execution context
        const request = context.switchToHttp().getRequest();

        // extract the token from header
        const token = this.extractRequestFromHeader(request);

        console.log('token', token);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(token, this.jwtConfiguration);

            request[REQUEST_USER_KEY] = payload;
            console.log(payload);
        } catch {
            throw new UnauthorizedException();
        }

        // validate the token
        return true;
    }

    private extractRequestFromHeader(request: Request): string | undefined {
        const [_, token] = request.headers.authorization?.split(' ') ?? [];
        return token;
    }
}
