import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import { ApiResponse } from '@/common/api-response/api-response';
import { Controller, Get, Request, UseGuards } from '@nestjs/common';

@Controller('mbti-test')
export class MbtiTestController {
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async showQuesttion(@Request() req) {
    const questions = req;
    return new ApiResponse(questions);
  }
}
