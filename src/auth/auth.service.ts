import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { User as UserInterface } from '@/interfaces/user.interface';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ user: UserInterface; token: string }> {
    const user = await this.userService.findOne(email, password);
    const payload = { sub: user.id, username: user.email };
    const jwt_token = await this.jwtService.signAsync(payload);

    return {
      user,
      token: jwt_token,
    };
  }

  async register(registerDto: RegisterDto): Promise<UserInterface> {
    return await this.userService.register(registerDto);
  }
}
