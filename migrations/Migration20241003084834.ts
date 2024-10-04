import { Migration } from '@mikro-orm/migrations';

export class Migration20241003084834 extends Migration {
  override async up(): Promise<void> {
    this.addSql(`alter table "users" drop column "username";`);
  }

  override async down(): Promise<void> {
    this.addSql(
      `alter table "users" add column "username" varchar(255) not null;`,
    );
  }
}
