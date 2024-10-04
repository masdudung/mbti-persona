import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { UserEntity } from '@/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.findAll();
    return users;
  }

  async findOne(email: string, password: string): Promise<UserEntity> {
    console.log(email, password);
    const user = await this.userRepository.findOne({
      email: email,
      password: password,
    });
    return user;
  }
}
