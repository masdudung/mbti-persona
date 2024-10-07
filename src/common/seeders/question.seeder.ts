import { Seeder } from '@mikro-orm/seeder';
import { EntityManager } from '@mikro-orm/core';
import { QuestionEntity } from '../entities/question.entity';

export class QuestionSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const questions = [
      // E-I Questions
      {
        pertanyaan:
          'Apakah Anda merasa lebih nyaman di lingkungan sosial daripada sendirian?',
        type: 'E-I',
      },
      {
        pertanyaan: 'Apakah Anda lebih suka berbicara daripada mendengarkan?',
        type: 'E-I',
      },
      {
        pertanyaan:
          'Apakah Anda mendapatkan energi dari berada di sekitar banyak orang?',
        type: 'E-I',
      },
      {
        pertanyaan:
          'Apakah Anda cenderung bersikap terbuka dan mudah bersosialisasi?',
        type: 'E-I',
      },
      {
        pertanyaan:
          'Apakah Anda sering merasa kesepian ketika tidak ada orang di sekitar Anda?',
        type: 'E-I',
      },

      // N-S Questions
      {
        pertanyaan:
          'Apakah Anda lebih mempercayai firasat daripada data yang ada?',
        type: 'N-S',
      },
      {
        pertanyaan:
          'Apakah Anda lebih suka memikirkan ide abstrak daripada fakta konkrit?',
        type: 'N-S',
      },
      {
        pertanyaan:
          'Apakah Anda sering mengandalkan intuisi untuk membuat keputusan?',
        type: 'N-S',
      },
      {
        pertanyaan:
          'Apakah Anda tertarik dengan kemungkinan daripada kenyataan saat ini?',
        type: 'N-S',
      },
      {
        pertanyaan:
          'Apakah Anda lebih sering memikirkan masa depan daripada masa kini?',
        type: 'N-S',
      },

      // T-F Questions
      {
        pertanyaan:
          'Apakah Anda lebih sering membuat keputusan berdasarkan logika daripada perasaan?',
        type: 'T-F',
      },
      {
        pertanyaan:
          'Apakah Anda lebih suka memberikan penilaian objektif daripada subjektif?',
        type: 'T-F',
      },
      {
        pertanyaan:
          'Apakah Anda merasa lebih mudah memecahkan masalah dengan analisis daripada emosi?',
        type: 'T-F',
      },
      {
        pertanyaan:
          'Apakah Anda lebih percaya pada fakta daripada intuisi dalam pengambilan keputusan?',
        type: 'T-F',
      },
      {
        pertanyaan:
          'Apakah Anda cenderung tidak terpengaruh oleh perasaan orang lain dalam keputusan Anda?',
        type: 'T-F',
      },

      // J-P Questions
      {
        pertanyaan:
          'Apakah Anda lebih suka memiliki rencana yang terstruktur daripada spontanitas?',
        type: 'J-P',
      },
      {
        pertanyaan:
          'Apakah Anda merasa nyaman dengan rutinitas dan jadwal yang tetap?',
        type: 'J-P',
      },
      {
        pertanyaan:
          'Apakah Anda lebih suka menyelesaikan tugas jauh sebelum tenggat waktu?',
        type: 'J-P',
      },
      {
        pertanyaan:
          'Apakah Anda merasa tidak nyaman dengan situasi yang tidak pasti atau ambigu?',
        type: 'J-P',
      },
      {
        pertanyaan:
          'Apakah Anda lebih memilih untuk merencanakan kegiatan Anda secara rinci?',
        type: 'J-P',
      },
    ];

    for (const questionData of questions) {
      const question = em.create(QuestionEntity, questionData);
      await em.persistAndFlush(question);
    }
  }
}
