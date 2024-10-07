import { IsNotEmpty, Max, Min } from 'class-validator';

export class AnswerDto {
  @IsNotEmpty()
  question_id: number;

  @IsNotEmpty()
  @Min(1)
  @Max(5)
  answer: number;
}
