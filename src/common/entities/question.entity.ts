import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity({ tableName: 'questions' })
export class QuestionEntity {
  @PrimaryKey()
  id!: number;

  @Property()
  pertanyaan!: string;

  @Property()
  type!: string;
}
