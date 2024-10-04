import { Property, PrimaryKey, Entity } from '@mikro-orm/core';
import { Exclude } from 'class-transformer';

@Entity({ tableName: 'users' })
export class UserEntity {
  @PrimaryKey()
  id: number;

  @Property()
  email: string;

  @Property()
  fullname: string;

  @Property()
  phone: string;

  @Exclude()
  @Property()
  password: string;
}
