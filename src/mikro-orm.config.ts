import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  extensions: [Migrator, SeedManager],
  entities: ['./dist/src/common/entities'],
  entitiesTs: ['./src/common/entities'],
  driver: PostgreSqlDriver,
  clientUrl: process.env.DB_CLIENT_URL,
  debug: process.env.DB_DEBUG === 'true',
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './migrations',
  },
  seeder: {
    path: './dist/src/common/seeders',
    pathTs: './src/common/seeders',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  },
});
