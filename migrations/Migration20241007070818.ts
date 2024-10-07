import { Migration } from '@mikro-orm/migrations';

export class Migration20241007070818 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "answer_entity" drop constraint "answer_entity_question_id_foreign";`);

    this.addSql(`create table "questions" ("id" serial primary key, "pertanyaan" varchar(255) not null, "type" varchar(255) not null);`);

    this.addSql(`create table "users" ("id" serial primary key, "email" varchar(255) not null, "fullname" varchar(255) not null, "phone" varchar(255) null, "password" varchar(255) not null);`);
    this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);

    this.addSql(`create table "refresh_tokens" ("id" serial primary key, "user_id" int not null, "token" varchar(255) not null, "expires_at" timestamptz not null, "created_at" timestamptz not null default CURRENT_TIMESTAMP, "updated_at" timestamptz not null);`);
    this.addSql(`alter table "refresh_tokens" add constraint "refresh_tokens_token_unique" unique ("token");`);

    this.addSql(`create table "user_answers" ("id" serial primary key, "user_id" int not null, "question_id" int not null, "answer" int not null, "result" varchar(255) not null);`);

    this.addSql(`alter table "refresh_tokens" add constraint "refresh_tokens_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);

    this.addSql(`alter table "user_answers" add constraint "user_answers_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;`);
    this.addSql(`alter table "user_answers" add constraint "user_answers_question_id_foreign" foreign key ("question_id") references "questions" ("id") on update cascade;`);

    this.addSql(`drop table if exists "answer_entity" cascade;`);

    this.addSql(`drop table if exists "question_entity" cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "user_answers" drop constraint "user_answers_question_id_foreign";`);

    this.addSql(`alter table "refresh_tokens" drop constraint "refresh_tokens_user_id_foreign";`);

    this.addSql(`alter table "user_answers" drop constraint "user_answers_user_id_foreign";`);

    this.addSql(`create table "answer_entity" ("id" serial primary key, "user_id" int4 not null, "question_id" int4 not null, "answer" int4 not null, "result" varchar(255) not null);`);

    this.addSql(`create table "question_entity" ("id" serial primary key, "pertanyaan" varchar(255) not null, "type" varchar(255) not null);`);

    this.addSql(`alter table "answer_entity" add constraint "answer_entity_question_id_foreign" foreign key ("question_id") references "question_entity" ("id") on update cascade on delete no action;`);

    this.addSql(`drop table if exists "questions" cascade;`);

    this.addSql(`drop table if exists "users" cascade;`);

    this.addSql(`drop table if exists "refresh_tokens" cascade;`);

    this.addSql(`drop table if exists "user_answers" cascade;`);
  }

}
