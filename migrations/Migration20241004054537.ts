import { Migration } from '@mikro-orm/migrations';

export class Migration20241004054537 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`alter table "users" alter column "phone" type varchar(255) using ("phone"::varchar(255));`);
    this.addSql(`alter table "users" alter column "phone" drop not null;`);
    this.addSql(`alter table "users" add constraint "users_email_unique" unique ("email");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "users" drop constraint "users_email_unique";`);

    this.addSql(`alter table "users" alter column "phone" type varchar(255) using ("phone"::varchar(255));`);
    this.addSql(`alter table "users" alter column "phone" set not null;`);
  }

}
