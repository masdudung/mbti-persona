import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from '@/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<UserEntity[]> {
    const users = await this.userService.getAll();
    return users;
  }
}
