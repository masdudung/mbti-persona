import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '@/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { RefreshTokenEntity } from '@/common/entities/refresh-token.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
dotenv.config();

@Module({
  imports: [
    UsersModule,
    MikroOrmModule.forFeature([RefreshTokenEntity]),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRES },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
