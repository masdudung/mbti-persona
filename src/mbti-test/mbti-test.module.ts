import { Module } from '@nestjs/common';
import { MbtiTestController } from './mbti-test.controller';
import { MbtiTestService } from './mbti-test.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AnswerEntity } from '@/common/entities/answer.entity';
import { QuestionEntity } from '@/common/entities/question.entity';

@Module({
  imports: [MikroOrmModule.forFeature([QuestionEntity, AnswerEntity])],
  controllers: [MbtiTestController],
  providers: [MbtiTestService],
})
export class MbtiTestModule {}
