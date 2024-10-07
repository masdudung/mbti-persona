import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { UserEntity } from './user.entity';
import { QuestionEntity } from './question.entity';

@Entity({ tableName: 'user_answers' })
export class AnswerEntity {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => UserEntity)
  user!: UserEntity;

  @ManyToOne(() => QuestionEntity)
  question!: QuestionEntity;

  @Property()
  answer!: number;

  @Property()
  result!: string;
}
