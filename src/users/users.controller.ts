import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Request,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserEntity } from '@/common/entities/user.entity';
import { ApiResponse } from '@/common/api-response/api-response';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers(@Request() req): Promise<ApiResponse<UserEntity[]>> {
    console.log(req.user);
    console.log(req.isAuthenticated);
    console.log(req._sessionManager);
    console.log(req.isUnauthenticated);
    console.log(req.Login);
    console.log(req.logout);
    const users = await this.userService.getAll();
    return new ApiResponse(users);
  }
}
