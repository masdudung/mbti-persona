import { Injectable } from '@nestjs/common';
import { EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { AnswerEntity } from '@/common/entities/answer.entity';
import { QuestionEntity } from '@/common/entities/question.entity';

@Injectable()
export class MbtiTestService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: EntityRepository<QuestionEntity>,
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: EntityRepository<AnswerEntity>,
  ) {}

  async getUnansweredQuestions(userId: number): Promise<QuestionEntity[]> {
    const answeredQuestions = await this.getAnsweredQuestion(userId);
    const answeredQuestionIds = answeredQuestions.map(
      (answer) => answer.question.id,
    );

    const unansweredQuestions = await this.questionRepository.find({
      id: { $nin: answeredQuestionIds },
    });

    return unansweredQuestions;
  }

  async getAnsweredQuestion(userId: number): Promise<AnswerEntity[]> {
    const answers = await this.answerRepository.find({ user: { id: userId } });
    return answers;
  }

  async answerQuestion(
    userId: number,
    questionId: number,
    answer: number,
  ): Promise<AnswerEntity> {
    // Check if the user has already answered this question
    const existingAnswer = await this.answerRepository.findOne({
      user: { id: userId },
      question: { id: questionId },
    });

    // If the answer already exists, return it (or you can handle this scenario differently)
    if (existingAnswer) {
      throw new Error('You have already answered this question.');
    }

    // calculate result
    const result = 'I';

    // Create a new AnswerEntity instance
    const newAnswer = this.answerRepository.create({
      user: userId,
      question: questionId,
      answer,
      result,
    });

    // return await this.answerRepository.persist(newAnswer);
  }
}
