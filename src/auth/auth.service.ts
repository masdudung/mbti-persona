import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { User as UserInterface } from '@/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  async login(email: string, password: string): Promise<UserInterface> {
    return await this.userService.findOne(email, password);
  }
}
