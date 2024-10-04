import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsString()
  phone: string;

  @IsNotEmpty()
  password: string;
}
