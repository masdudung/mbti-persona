// src/seeders/DatabaseSeeder.ts
import { Seeder } from '@mikro-orm/seeder';
import { EntityManager } from '@mikro-orm/postgresql';
import { QuestionSeeder } from './question.seeder';
import { UserSeeder } from './user.seeder';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const questionSeeder = new QuestionSeeder();
    await questionSeeder.run(em);

    const userSeeder = new UserSeeder();
    await userSeeder.run(em);
  }
}
