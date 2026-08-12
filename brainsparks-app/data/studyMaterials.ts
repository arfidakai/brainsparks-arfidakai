export interface StudyMaterial {
  id: string;
  title: string;
  summary: string;
  keyPoints: string[];
  quickTip: string;
  example: string;
}

export interface StudySubtopic {
  id: string;
  title: string;
  description: string;
  materials: StudyMaterial[];
}

export interface StudyTrack {
  id: string;
  title: string;
  emoji: string;
  description: string;
  subtopics: StudySubtopic[];
}

export const studyMaterials: StudyTrack[] = [
  {
    id: 'pemrograman',
    title: 'Pemrograman',
    emoji: '💻',
    description: 'Mulai dari alur kode, logika program, sampai struktur data dan OOP.',
    subtopics: [
      {
        id: 'pemrograman-dasar',
        title: 'Dasar Program',
        description: 'Kenali cara baca kode, variabel, operator, dan alur dasar sebelum masuk ke soal yang lebih kompleks.',
        materials: [
          {
            id: 'programming-variables',
            title: 'Variabel & Tipe Data',
            summary: 'Pelajari cara menyimpan nilai, mengenali tipe data, dan membaca perubahan isi variabel dari satu baris ke baris lain.',
            keyPoints: [
              'Perhatikan nilai awal sebelum variabel diubah.',
              'Cek apakah nilai bertambah, berkurang, atau diganti total.',
              'Bedakan string, number, dan boolean saat membaca soal.'
            ],
            quickTip: 'Kalau bingung, tulis ulang isi variabel per langkah di tabel kecil.',
            example: 'x = 2 lalu x = x + 3 berarti nilai akhir x adalah 5.'
          },
          {
            id: 'programming-operators',
            title: 'Operator Dasar',
            summary: 'Pahami operator aritmatika, perbandingan, dan logika supaya hasil evaluasi kondisi tidak ketukar.',
            keyPoints: [
              'Operator perbandingan menghasilkan true atau false.',
              'Urutan prioritas operator memengaruhi hasil akhir.',
              'Gabungan AND dan OR sering jadi jebakan soal.'
            ],
            quickTip: 'Kerjakan bagian dalam tanda kurung lebih dulu, baru lanjut ke operator lain.',
            example: 'Jika (3 + 2 > 4) dan (5 == 5), maka hasil akhirnya true.'
          }
        ]
      },
      {
        id: 'pemrograman-alur',
        title: 'Alur Program',
        description: 'Fokus ke percabangan, loop, dan proses debugging saat membaca potongan kode.',
        materials: [
          {
            id: 'programming-loops',
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
            id: 'programming-debugging',
            title: 'Debugging Dasar',
            summary: 'Belajar mencari sumber error dari output, logika salah, dan urutan proses yang tidak sesuai.',
            keyPoints: [
              'Cek baris yang paling dekat dengan error terlebih dahulu.',
              'Bandingkan hasil yang diharapkan dengan hasil nyata.',
              'Cari perubahan kecil yang paling mungkin memicu bug.'
            ],
            quickTip: 'Kalau kode terasa aneh, baca ulang input, proses, lalu output secara terpisah.',
            example: 'Jika program selalu masuk ke cabang else, berarti kondisi if-nya tidak pernah terpenuhi.'
          }
        ]
      },
      {
        id: 'pemrograman-structure',
        title: 'Struktur Program',
        description: 'Masuk ke konsep class, fungsi, dan cara menata kode biar lebih rapi dan mudah dibaca.',
        materials: [
          {
            id: 'programming-oop',
            title: 'OOP Basics',
            summary: 'Pelajari konsep class, method, inheritance, overriding, dan encapsulation agar lebih lancar mengerjakan soal teknis.',
            keyPoints: [
              'Class adalah cetak biru, object adalah instance nyata.',
              'Override berarti mengganti perilaku method dari parent class.',
              'Encapsulation membantu data tetap aman dan terorganisir.'
            ],
            quickTip: 'Kalau soal menanyakan beda override dan overload, fokus pada nama method dan parameter.',
            example: 'Subclass yang menulis ulang method dari superclass disebut overriding.'
          },
          {
            id: 'programming-functions',
            title: 'Fungsi & Modularisasi',
            summary: 'Pahami cara memecah masalah besar jadi fungsi kecil yang lebih mudah diuji dan dipakai ulang.',
            keyPoints: [
              'Fungsi sebaiknya punya satu tugas utama.',
              'Parameter membuat fungsi lebih fleksibel.',
              'Return value dipakai untuk mengirim hasil keluar dari fungsi.'
            ],
            quickTip: 'Kalau satu blok kode dipakai lebih dari sekali, jadikan fungsi.',
            example: 'fungsi hitungLuas(panjang, lebar) mengembalikan panjang x lebar.'
          }
        ]
      }
    ]
  },
  {
    id: 'logika',
    title: 'Logika',
    emoji: '🧠',
    description: 'Latihan pola, deduksi, dan penalaran bertahap untuk soal yang butuh konsentrasi.',
    subtopics: [
      {
        id: 'logika-pola',
        title: 'Pola & Urutan',
        description: 'Cocok untuk soal angka, bentuk, dan urutan yang tersembunyi.',
        materials: [
          {
            id: 'logic-patterns',
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
            id: 'logic-sequences',
            title: 'Sequence Reasoning',
            summary: 'Gunakan pola penambahan, pengurangan, perkalian, atau kombinasi untuk menebak elemen berikutnya.',
            keyPoints: [
              'Pisahkan dulu perubahan besar dan perubahan kecil.',
              'Lihat apakah ada pola selang-seling.',
              'Bandingkan dua atau tiga langkah sekaligus.'
            ],
            quickTip: 'Tuliskan selisih antar angka supaya pola lebih gampang kelihatan.',
            example: '1, 3, 6, 10, 15 adalah deret selisih bertambah 2, 3, 4, 5.'
          }
        ]
      },
      {
        id: 'logika-deduksi',
        title: 'Deduksi & Penalaran',
        description: 'Latihan menyusun fakta, batasan, dan kesimpulan logis secara sistematis.',
        materials: [
          {
            id: 'logic-seating',
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
            id: 'logic-syllogism',
            title: 'Syllogism & Conclusion',
            summary: 'Belajar menarik kesimpulan dari premis umum dan khusus tanpa melompat ke asumsi yang salah.',
            keyPoints: [
              'Premis benar belum tentu semua kesimpulan benar.',
              'Cari hubungan yang pasti, bukan yang hanya mungkin.',
              'Jangan menambahkan informasi yang tidak ada di soal.'
            ],
            quickTip: 'Tanyakan dulu: kesimpulan itu pasti, mungkin, atau salah total?',
            example: 'Jika semua A adalah B, dan C adalah A, maka C juga termasuk B.'
          }
        ]
      },
      {
        id: 'logika-strategi',
        title: 'Strategi Cepat',
        description: 'Teknik kerja cepat saat waktu terbatas dan soal terasa panjang.',
        materials: [
          {
            id: 'logic-elimination',
            title: 'Elimination Strategy',
            summary: 'Gunakan eliminasi untuk mencoret opsi yang jelas salah dan mempersempit jawaban.',
            keyPoints: [
              'Cari jawaban yang bertabrakan dengan satu aturan saja.',
              'Eliminasi lebih cepat daripada membuktikan semua opsi benar.',
              'Prioritaskan petunjuk yang paling spesifik.'
            ],
            quickTip: 'Saat waktu mepet, coret yang salah dulu baru pilih dari sisa opsi.',
            example: 'Kalau tiga opsi melanggar aturan urutan, tinggal satu opsi yang tersisa.'
          }
        ]
      }
    ]
  },
  {
    id: 'matematika',
    title: 'Matematika Dasar',
    emoji: '📐',
    description: 'Tambahan materi untuk memperkuat hitungan cepat, pecahan, dan perbandingan.',
    subtopics: [
      {
        id: 'matematika-aritmetika',
        title: 'Aritmetika',
        description: 'Dasar hitungan cepat yang sering muncul di soal campuran.',
        materials: [
          {
            id: 'math-fractions',
            title: 'Fractions & Ratios',
            summary: 'Pahami pecahan, perbandingan, dan proporsi supaya hitungan cepat lebih akurat.',
            keyPoints: [
              'Samakan penyebut dulu kalau membandingkan pecahan.',
              'Perbandingan bisa diubah jadi bentuk rasio sederhana.',
              'Kurangi langkah hitung yang tidak perlu.'
            ],
            quickTip: 'Kalau ada pecahan, ubah ke bentuk yang paling mudah dibandingkan.',
            example: '1/2 lebih besar dari 2/5 karena 0,5 > 0,4.'
          },
          {
            id: 'math-percentages',
            title: 'Persentase Cepat',
            summary: 'Hitung diskon, kenaikan, dan perubahan nilai dengan cara yang cepat dan konsisten.',
            keyPoints: [
              '10% berarti geser koma satu langkah.',
              'Cari persentase dari nilai dasar, bukan dari hasil yang sudah diubah.',
              'Gunakan pendekatan 50%, 25%, 10% kalau perlu.'
            ],
            quickTip: 'Mecah persentase besar jadi beberapa bagian kecil yang mudah dihitung.',
            example: '20% dari 150 adalah 30.'
          }
        ]
      },
      {
        id: 'matematika-pola',
        title: 'Pola Angka',
        description: 'Memperkuat intuisi mencari aturan dari angka yang berulang atau naik bertahap.',
        materials: [
          {
            id: 'math-number-patterns',
            title: 'Number Patterns',
            summary: 'Baca pola aritmetika, geometri, dan pola campuran agar bisa menebak suku berikutnya.',
            keyPoints: [
              'Cek selisih antar suku terlebih dahulu.',
              'Lihat apakah selisihnya juga punya pola.',
              'Cari petunjuk pengali jika penambahannya tidak konsisten.'
            ],
            quickTip: 'Bikin dua baris: angka asli dan selisihnya.',
            example: '3, 6, 12, 24 adalah pola dikali 2 setiap langkah.'
          }
        ]
      }
    ]
  }
];
