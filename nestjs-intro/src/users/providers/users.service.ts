import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { GetUserParamDto } from "../dtos/get-user.dto";
import { AuthService } from "src/auth/providers/auth.service";


/**
 * Class to connect to users tables and perform users service
 */
@Injectable()
export class UsersService{
    constructor(
        @Inject(forwardRef(() => AuthService))
        private readonly authService: AuthService,
    ){}


    /**
     * methods to get all user
     */
    findAll(
        getUserParamDto: GetUserParamDto,
        limit: number,
        page: number,
    ){
        const isAuth = this.authService.isAuth()
        console.log(isAuth)
        return [
            {
                firstName: "John",
                email: "john@doe.com"
            },
            {
                firstName: "hong",
                email: "hong@gmail.com"
            }
        ]
    }

    /**
     * find one user by Id
     */
    findOneById(id: string) {
        return {
            id: 1234,
            firstName: "hongseok",
            lastname: "shin"
        }
    }

}