import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/index.dto';
import { ApiResponse } from '@/common/api-response/api-response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return new ApiResponse(
        await this.authService.login(loginDto.email, loginDto.password),
        'User Login successfully',
      );
    } catch (error) {
      throw error;
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      return new ApiResponse(
        await this.authService.register(registerDto),
        'User registered successfully',
      );
    } catch (error) {
      throw error;
    }
  }
}
