import { Property, PrimaryKey, Entity } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';

@Entity({ tableName: 'users' })
export class UserEntity {
  @PrimaryKey()
  id: number;

  @Property({ unique: true })
  email: string;

  @Property()
  fullname: string;

  @Property({ nullable: true })
  phone: string;

  @Exclude()
  @Property()
  password: string;
}
