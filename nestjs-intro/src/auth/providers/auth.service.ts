import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService)) 
        private readonly usersService: UsersService,
    ){}

    login(email: string, password: string) {
        // check user exists database
        const user = this.usersService.findOneById('1234')
        // login
    
        // token
        return "SAMPLE_TOKEN"
    }


    isAuth() {
        return true
    }

}
