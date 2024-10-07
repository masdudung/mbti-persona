import { Seeder } from '@mikro-orm/seeder';
import { EntityManager } from '@mikro-orm/core';
import { UserEntity } from '../entities/user.entity';

export class UserSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const users = [
      {
        email: 'm.mufiddin@gmail.com',
        password:
          '$2a$12$WRiXRs2JdoymDFHvf/LaUukW/KxPpKAgGzf7r9JOTwwGfRYKdI0q6',
        fullname: 'moch mufiddin',
        phone: '089527379092',
      },
    ];

    for (const userData of users) {
      const user = em.create(UserEntity, userData);
      await em.persistAndFlush(user);
    }
  }
}
