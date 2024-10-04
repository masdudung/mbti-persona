import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from '@/entities/user.entity';
import { ApiResponse } from '@/common/api-response/api-response';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async getAllUsers(): Promise<ApiResponse<UserEntity[]>> {
    const users = await this.userService.getAll();
    return new ApiResponse(users);
  }
}
