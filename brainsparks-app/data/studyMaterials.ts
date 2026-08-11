export interface StudyMaterial {
  id: string;
  category: 'Logic' | 'Programming';
  title: string;
  summary: string;
  keyPoints: string[];
  quickTip: string;
  example: string;
}

export const studyMaterials: StudyMaterial[] = [
  {
    id: 'logic-patterns',
    category: 'Logic',
    title: 'Pattern Recognition',
    summary: 'Pelajari cara mengenali pola visual, angka, dan urutan logika agar lebih cepat menemukan jawaban yang hilang.',
    keyPoints: [
      'Perhatikan perubahan yang konsisten di setiap langkah.',
      'Coba identifikasi apakah pola bergerak, bertambah, atau berganti aturan.',
      'Jangan terpaku pada satu detail; lihat keseluruhan bentuk pola.'
    ],
    quickTip: 'Kalau menemukan pola yang rumit, pecah jadi 3 bagian: posisi, warna, dan urutan.',
    example: 'Contoh: 2, 4, 8, 14, 22, ... -> pola naik +2, +4, +6, +8, jadi jawabannya 32.'
  },
  {
    id: 'logic-seating',
    category: 'Logic',
    title: 'Seating & Deduction',
    summary: 'Gunakan aturan yang ketat untuk menyusun urutan tempat duduk, hubungan, dan kesimpulan logis.',
    keyPoints: [
      'Tulis semua batasan secara singkat sebelum menjawab.',
      'Cari elemen yang pasti dan eliminasi opsi yang bertentangan.',
      'Jika ada dua aturan yang saling menguatkan, gunakan keduanya bersama.'
    ],
    quickTip: 'Biasanya lebih cepat kalau kamu menggambar garis sederhana dari setiap pernyataan.',
    example: 'Budi duduk kiri, Cici tidak mau dekat Andy atau Dedi, jadi susunan yang cocok bisa langsung terlihat.'
  },
  {
    id: 'programming-loops',
    category: 'Programming',
    title: 'Loops & Conditionals',
    summary: 'Pahami alur loop, kondisi, dan skip logic pada kode untuk menghindari kesalahan saat membaca soal.',
    keyPoints: [
      'Perhatikan urutan eksekusi dari atas ke bawah.',
      'Kenali kapan loop berhenti dan kapan kondisi skip dijalankan.',
      'Hitung nilai sementara secara bertahap agar tidak salah.'
    ],
    quickTip: 'Coba tulis nilai variabel di setiap iterasi supaya lebih mudah diprediksi.',
    example: 'Pada loop 1..5, jika ada continue saat i = 3, nilai yang dilewati tidak ikut dihitung.'
  },
  {
    id: 'programming-oop',
    category: 'Programming',
    title: 'OOP Basics',
    summary: 'Pelajari konsep class, method, inheritance, overriding, dan encapsulation agar lebih lancar mengerjakan soal teknis.',
    keyPoints: [
      'Class adalah cetak biru, object adalah instance nyata.',
      'Override berarti mengganti perilaku method dari parent class.',
      'Encapsulation membantu data tetap aman dan terorganisir.'
    ],
    quickTip: 'Kalau soal menanyakan “apa bedanya override dan overload”, fokus pada “nama method sama vs parameter berbeda”.',
    example: 'Subclass yang menulis ulang method dari superclass disebut overriding.'
  }
];
