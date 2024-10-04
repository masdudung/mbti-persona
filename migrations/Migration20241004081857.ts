import { Migration } from '@mikro-orm/migrations';

export class Migration20241004081857 extends Migration {
  override async up(): Promise<void> {
    this.addSql(
      `create table "users" ("id" serial primary key, "email" varchar(255) not null, "fullname" varchar(255) not null, "phone" varchar(255) null, "password" varchar(255) not null);`,
    );
    this.addSql(
      `alter table "users" add constraint "users_email_unique" unique ("email");`,
    );

    this.addSql(
      `create table "refresh_tokens" ("id" serial primary key, "user_id" int not null, "token" varchar(255) not null, "expires_at" timestamptz not null, "created_at" timestamptz not null default CURRENT_TIMESTAMP, "updated_at" timestamptz not null);`,
    );
    this.addSql(
      `alter table "refresh_tokens" add constraint "refresh_tokens_token_unique" unique ("token");`,
    );

    this.addSql(
      `alter table "refresh_tokens" add constraint "refresh_tokens_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`,
    );
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "refresh_tokens" drop constraint "refresh_tokens_user_id_foreign";`,
    );

    this.addSql(`drop table if exists "users" cascade;`);

    this.addSql(`drop table if exists "refresh_tokens" cascade;`);
  }
}
