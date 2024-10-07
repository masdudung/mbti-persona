import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ApiResponse } from '@/common/api-response/api-response';
import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { MbtiTestService } from './mbti-test.service';
import { AnswerDto } from './dto/answer.dto';

@Controller('mbti-test')
@UseGuards(JwtAuthGuard)
export class MbtiTestController {
  constructor(private readonly mbtiTestService: MbtiTestService) {}

  @Get()
  async showQuesttion(@Request() req) {
    const user = req.user;
    const unansweredQuestions =
      await this.mbtiTestService.getUnansweredQuestions(user.id);
    return new ApiResponse(unansweredQuestions);
  }

  @Post()
  async answerQuesttion(@Request() req, @Body() answerDto: AnswerDto) {
    const user = req.user;
    const answerQuestions = await this.mbtiTestService.answerQuestion(
      user.id,
      answerDto.question_id,
      answerDto.answer,
    );
    return new ApiResponse(answerQuestions);
  }
}
