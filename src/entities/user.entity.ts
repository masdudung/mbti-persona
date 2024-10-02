import { Property, PrimaryKey, Entity } from '@mikro-orm/core';

@Entity({ tableName: 'users' })
export class UserEntity {
  @PrimaryKey()
  id: number;

  @Property()
  username: string;

  @Property()
  email: string;

  @Property()
  fullname: string;

  @Property()
  phone: string;

  @Property()
  password: string;
}
