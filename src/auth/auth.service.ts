import { UsersService } from '@/users/users.service';
import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenEntity } from '@/common/entities/refresh-token.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { UserEntity } from '@/common/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,

    @InjectRepository(RefreshTokenEntity)
    private readonly refreshTokenRepository: EntityRepository<RefreshTokenEntity>,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ user: UserEntity; token: string; refreshToken: string }> {
    const user = await this.userService.findOne(email, password);
    const payload = { sub: user.id, username: user.email };
    const jwt_token = await this.jwtService.signAsync(payload);
    const refreshToken = await this.generateRefreshToken(user);

    return {
      user,
      token: jwt_token,
      refreshToken: refreshToken,
    };
  }

  async register(registerDto: RegisterDto): Promise<UserEntity> {
    return await this.userService.register(registerDto);
  }

  async generateRefreshToken(user: UserEntity): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(
      { id: user.id },
      { expiresIn: '7d' },
    );

    // Simpan refresh token ke database
    const newRefreshToken = new RefreshTokenEntity();
    newRefreshToken.token = refreshToken;
    newRefreshToken.user = user;
    newRefreshToken.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    // save to database
    await this.refreshTokenRepository.insert(newRefreshToken);

    return refreshToken;
  }
}
