// src/mikro-orm.config.ts

import { defineConfig, PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';

export default defineConfig({
  // Menambahkan Migrator sebagai ekstensi
  extensions: [Migrator],
  // Path ke entitas yang sudah terkompilasi dan yang belum
  entities: ['./dist/entities'],
  entitiesTs: ['./src/entities'],
  // Menggunakan driver PostgreSQL
  driver: PostgreSqlDriver,
  // URL koneksi ke database lokal
  clientUrl: 'postgresql://postgres:lalalala@127.0.0.1:5432/mbti', // Ubah sesuai dengan detail lokal Anda
  debug: true, // Aktifkan mode debug
  migrations: {
    tableName: 'mikro_orm_migrations', // Nama tabel untuk menyimpan informasi migrasi
    path: './migrations', // Jalur ke folder di mana migrasi akan disimpan
  },
});
