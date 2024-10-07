// src/seeders/DatabaseSeeder.ts
import { Seeder } from '@mikro-orm/seeder';
import { QuestionSeeder } from './question.seeder';
import { EntityManager } from '@mikro-orm/postgresql';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const questionSeeder = new QuestionSeeder();
    await questionSeeder.run(em);
  }
}
