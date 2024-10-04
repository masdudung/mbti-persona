import { Migration } from '@mikro-orm/migrations';

export class Migration20241003030910 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "users" ("id" serial primary key, "username" varchar(255) not null, "email" varchar(255) not null, "fullname" varchar(255) not null, "phone" varchar(255) not null, "password" varchar(255) not null);`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "users" cascade;`);
  }
}
