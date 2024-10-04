import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { RegisterDto } from '@/auth/dto/register.dto';
import { InjectRepository } from '@mikro-orm/nestjs';
import { UserEntity } from '@/common/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: EntityRepository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    const users = await this.userRepository.findAll();
    return users;
  }

  async findOne(email: string, password: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ email: email });
    const isPasswordValid = await bcrypt.compare(
      password,
      user?.password ?? '',
    );

    if (!isPasswordValid || !user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async register(registerDto: RegisterDto): Promise<UserEntity> {
    const userAlreadyExist = await this.userRepository.findOne({
      email: registerDto.email,
    });

    if (userAlreadyExist) {
      throw new BadRequestException('Email Already Exist');
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(registerDto.password, saltRounds);

    // create new instance
    const newUser = new UserEntity();
    newUser.email = registerDto.email;
    newUser.password = hashedPassword;
    newUser.fullname = registerDto.fullname;
    newUser.phone = registerDto.phone;

    // save to database
    await this.userRepository.insert(newUser);
    return newUser;
  }
}
