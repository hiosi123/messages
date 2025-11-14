import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>
    ) {
    }

    create(email: string, password: string) {
        // why use create and save?, this is related to dto validation
        const user = this.repo.create({email, password}) 

        return this.repo.save(user)
    }

    findOne(id: number) {
       return this.repo.findOneBy({id}); // only return 1 
    }

    find(email: string) {
        return this.repo.find({where: {email}}) // return array
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.repo.findOneBy({id})
        if (!user) {
            throw new Error('user not found')
        }
        Object.assign(user, attrs) // over writing properties from attrs -> user
        return this.repo.save(user)
    }

    async remove(id: number) {
        const user = await this.repo.findOneBy({id})
        if (!user) {
            throw new Error('user not found')
        }

        return this.repo.remove(user)
    }
}
