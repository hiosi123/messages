import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";
import { User } from "./user.entity";
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { NotFoundError } from "rxjs";


describe('AuthService', () => {
    let service: AuthService
    let fakeUsersService: Partial<UsersService>

    beforeEach(async () => {
        const users: User[] = [];

        fakeUsersService =  {
            find: (email: string) => {
                const filteredUsers = users.filter(user => user.email === email)
                return Promise.resolve(filteredUsers)
            }, // create promise and immediately resolves
            create: (email: string, password: string) => {
                const user = ({id: Math.floor(Math.random() *9999999), email, password} as User)
                users.push(user);
                return Promise.resolve(user)
            },
        }

        const module  = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService, // 이걸 물으면
                    useValue: fakeUsersService, // 이걸 줘라
                }
            ],

        }).compile()

        service = module.get(AuthService);
    })

    it('can create an instance of auth service', async () => {
        expect(service).toBeDefined();
    })

    it('creates a new user weith a salted and hashed password', async() => {
        const user = await service.signup('asdf@asdf.com', 'asdf')

        expect(user.password).not.toEqual('asdf');
        const [salt, hash] = user.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    })

    it('throws an error if user signs up with email that is in use', async () => {
        await service.signup('asdf@asdf.com', 'asdf')

        await expect(service.signup('asdf@asdf.com', 'asdf')).rejects.toThrow(BadRequestException);
    });

    it('throws if signin is called with an unusedemail', async() => {
        await expect(service.signin("asdwe@sdc.com", "asdf")).rejects.toThrow(NotFoundException)
    })

    it('throws if an invalid password is provided', async () => {
        await service.signup("abs", "1234")
        
        await expect(service.signin('abs', '12345')).rejects.toThrow(BadRequestException)
    })


    it('returns a user if correct password is provided', async () => {
        await service.signup('asdf@asdf.com', 'mypassword')

        const user = await service.signin('asdf@asdf.com', 'mypassword')
        expect(user).toBeDefined();

    })

})
