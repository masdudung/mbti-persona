import { Entity, PrimaryKey, Property, ManyToOne } from '@mikro-orm/core';
import { UserEntity } from './user.entity';

@Entity({ tableName: 'refresh_tokens' })
export class RefreshTokenEntity {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => UserEntity)
  user!: UserEntity;

  @Property({ type: 'varchar', unique: true })
  token!: string;

  @Property({ type: 'timestamp' })
  expiresAt!: Date;

  @Property({ type: 'timestamp', defaultRaw: 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Property({ type: 'timestamp', onUpdate: () => new Date() })
  updatedAt!: Date;

  constructor() {
    this.createdAt = new Date(); // Inisialisasi createdAt saat constructor dipanggil
    this.updatedAt = new Date(); // Inisialisasi updatedAt saat constructor dipanggil
  }
}
