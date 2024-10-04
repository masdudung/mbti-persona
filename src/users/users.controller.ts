import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from '@/common/entities/user.entity';
import { ApiResponse } from '@/common/api-response/api-response';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<ApiResponse<UserEntity[]>> {
    const users = await this.userService.getAll();
    return new ApiResponse(users);
  }
}
