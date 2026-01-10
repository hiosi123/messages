import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { AuthType } from 'src/auth/enums/auth-type.enum';
import { AUTH_TYPE_KEY } from 'src/auth/constants/auth.constant';

@Injectable()
export class AuthenticationGuard implements CanActivate {
    private static readonly defaultAuthType = AuthType.Bearer;

    private readonly authTypeGuardMap: Record<AuthType, CanActivate | CanActivate[]>;

    constructor(
        private readonly reflactor: Reflector,
        private readonly accessTokenGuard: AccessTokenGuard
    ) {
        this.authTypeGuardMap = {
            [AuthType.Bearer]: this.accessTokenGuard,
            [AuthType.None]: { canActivate: () => true }
        };
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        // authTypes from reflector
        const authTypes = this.reflactor.getAllAndOverride(AUTH_TYPE_KEY, [
            context.getHandler(),
            context.getClass()
        ]) ?? [AuthenticationGuard.defaultAuthType];

        console.log(authTypes);

        // arrary of guards
        // loop guards canActivate

        return true;
    }
}
