import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import microOrmConfig from './mikro-orm.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { QuestionsModule } from './questions/questions.module';

@Module({
  imports: [MikroOrmModule.forRoot(microOrmConfig), UsersModule, AuthModule, QuestionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
