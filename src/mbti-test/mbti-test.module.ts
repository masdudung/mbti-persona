import { Module } from '@nestjs/common';
import { MbtiTestController } from './mbti-test.controller';

@Module({
  controllers: [MbtiTestController]
})
export class MbtiTestModule {}
