import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  extensions: [Migrator],
  entities: ['./dist/src/entities'],
  entitiesTs: ['./src/entities'],
  driver: PostgreSqlDriver,
  clientUrl: process.env.DB_CLIENT_URL,
  debug: process.env.DB_DEBUG === 'true',
  migrations: {
    tableName: 'mikro_orm_migrations',
    path: './migrations',
  },
});
