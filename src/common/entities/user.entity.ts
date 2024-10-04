import {
  Property,
  PrimaryKey,
  Entity,
  OneToMany,
  Collection,
} from '@mikro-orm/core';
import { Exclude } from 'class-transformer';
import { RefreshTokenEntity } from './refresh-token.entity';

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

  // One-to-Many relationship with RefreshTokenEntity
  @Exclude()
  @OneToMany(() => RefreshTokenEntity, (refreshToken) => refreshToken.user)
  refreshTokens = new Collection<RefreshTokenEntity>(this);
}
