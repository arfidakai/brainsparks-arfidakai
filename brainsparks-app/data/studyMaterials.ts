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
    id: 'computer-fundamentals',
    title: 'Computer Fundamentals',
    emoji: '🖥️',
    description:
      'Kenali komputer, hardware, software, sistem operasi, dan bagaimana komputer memproses data.',
    subtopics: [
      {
        id: 'computer-basics',
        title: 'Dasar Komputer',
        description:
          'Pahami konsep dasar komputer dan bagaimana komputer menerima, memproses, dan menghasilkan informasi.',
        materials: [
          {
            id: 'what-is-computer',
            title: 'Apa Itu Komputer?',
            summary:
              'Komputer adalah perangkat yang menerima input, memproses data berdasarkan instruksi, lalu menghasilkan output.',
            keyPoints: [
              'Komputer bekerja berdasarkan instruksi atau program.',
              'Proses dasar komputer terdiri dari input, process, dan output.',
              'Komputer dapat digunakan untuk mengolah, menyimpan, dan mengirimkan data.',
            ],
            quickTip:
              'Bayangkan komputer seperti dapur: input adalah bahan, process adalah memasak, dan output adalah makanan.',
            example:
              'Saat mengetik keyboard, input masuk ke komputer, diproses oleh CPU, lalu hasilnya tampil di layar.',
          },
          {
            id: 'hardware-software',
            title: 'Hardware vs Software',
            summary:
              'Hardware adalah bagian fisik komputer, sedangkan software adalah program atau instruksi yang dijalankan komputer.',
            keyPoints: [
              'Hardware dapat disentuh secara fisik.',
              'Software berupa program dan instruksi.',
              'Hardware dan software saling membutuhkan.',
            ],
            quickTip:
              'Kalau bisa disentuh, kemungkinan besar hardware. Kalau berupa program, kemungkinan besar software.',
            example:
              'Keyboard adalah hardware, sedangkan Google Chrome adalah software.',
          },
          {
            id: 'input-process-output',
            title: 'Input, Process, Output',
            summary:
              'Pelajari alur sederhana bagaimana data masuk ke komputer, diproses, kemudian menghasilkan informasi.',
            keyPoints: [
              'Input adalah data yang diberikan kepada komputer.',
              'Process adalah pengolahan data berdasarkan instruksi.',
              'Output adalah hasil dari proses tersebut.',
            ],
            quickTip:
              'Saat melihat sebuah sistem, coba selalu tanyakan: input-nya apa, diproses bagaimana, dan output-nya apa?',
            example:
              'Kalkulator menerima angka sebagai input, menghitungnya sebagai process, lalu menampilkan hasil sebagai output.',
          },
        ],
      },
      {
        id: 'computer-hardware',
        title: 'Hardware',
        description:
          'Kenali komponen utama komputer dan fungsi masing-masing bagian.',
        materials: [
          {
            id: 'cpu',
            title: 'CPU',
            summary:
              'CPU adalah komponen yang menjalankan instruksi dan melakukan berbagai operasi dalam komputer.',
            keyPoints: [
              'CPU menjalankan instruksi program.',
              'CPU melakukan operasi aritmatika dan logika.',
              'Kecepatan CPU bukan satu-satunya faktor yang menentukan performa komputer.',
            ],
            quickTip:
              'Anggap CPU sebagai salah satu pusat pemrosesan utama komputer.',
            example:
              'Saat aplikasi melakukan perhitungan, CPU menjalankan instruksi yang diperlukan untuk menghasilkan hasilnya.',
          },
          {
            id: 'ram',
            title: 'RAM',
            summary:
              'RAM adalah memori sementara yang digunakan untuk menyimpan data dan program yang sedang digunakan.',
            keyPoints: [
              'RAM bersifat sementara.',
              'Data di RAM digunakan agar program dapat diakses dengan cepat.',
              'RAM berbeda dengan storage seperti SSD atau HDD.',
            ],
            quickTip:
              'RAM = tempat kerja sementara. Storage = tempat penyimpanan jangka panjang.',
            example:
              'Saat membuka browser dan beberapa aplikasi sekaligus, data yang sedang digunakan akan membutuhkan RAM.',
          },
          {
            id: 'storage',
            title: 'Storage',
            summary:
              'Storage digunakan untuk menyimpan data secara lebih permanen, seperti file, aplikasi, dan sistem operasi.',
            keyPoints: [
              'SSD dan HDD adalah contoh storage.',
              'Data tetap tersimpan setelah komputer dimatikan.',
              'SSD umumnya memiliki akses data lebih cepat dibanding HDD.',
            ],
            quickTip:
              'Foto, dokumen, aplikasi, dan sistem operasi biasanya tersimpan di storage.',
            example:
              'File project coding yang kamu simpan di laptop berada di storage.',
          },
          {
            id: 'gpu',
            title: 'GPU',
            summary:
              'GPU dirancang untuk melakukan banyak operasi secara paralel dan sangat penting untuk grafis serta workload tertentu.',
            keyPoints: [
              'GPU banyak digunakan untuk pemrosesan grafis.',
              'GPU juga dapat digunakan untuk beberapa workload AI dan komputasi paralel.',
              'GPU berbeda fungsi dengan CPU.',
            ],
            quickTip:
              'CPU lebih general-purpose, sedangkan GPU sangat kuat untuk pekerjaan yang bisa diproses secara paralel.',
            example:
              'Game 3D menggunakan GPU untuk membantu menghasilkan tampilan grafis di layar.',
          },
        ],
      },
      {
        id: 'operating-system',
        title: 'Operating System',
        description:
          'Pahami fungsi sistem operasi dan bagaimana OS mengatur sumber daya komputer.',
        materials: [
          {
            id: 'what-is-os',
            title: 'Apa Itu Operating System?',
            summary:
              'Operating System atau OS adalah software utama yang mengelola hardware dan menyediakan lingkungan untuk menjalankan aplikasi.',
            keyPoints: [
              'OS mengelola hardware komputer.',
              'OS menjalankan dan mengatur aplikasi.',
              'Contoh OS adalah Windows, macOS, Linux, Android, dan iOS.',
            ],
            quickTip:
              'OS adalah penghubung utama antara aplikasi, user, dan hardware.',
            example:
              'Saat membuka aplikasi di laptop, OS membantu mengalokasikan resource yang dibutuhkan aplikasi tersebut.',
          },
          {
            id: 'files-folders',
            title: 'File & Folder',
            summary:
              'File dan folder digunakan untuk mengorganisasi data di dalam sistem operasi.',
            keyPoints: [
              'File menyimpan data atau informasi.',
              'Folder digunakan untuk mengelompokkan file.',
              'Path menunjukkan lokasi sebuah file atau folder.',
            ],
            quickTip:
              'Biasakan memahami struktur folder karena developer sering bekerja dengan file dan path.',
            example:
              'src/components/Button.tsx berarti file Button.tsx berada di dalam folder components yang berada di dalam src.',
          },
          {
            id: 'linux-basics',
            title: 'Linux Basics',
            summary:
              'Kenali Linux dan alasan sistem operasi ini banyak digunakan dalam dunia development dan server.',
            keyPoints: [
              'Linux adalah keluarga sistem operasi berbasis kernel Linux.',
              'Banyak server menggunakan Linux.',
              'Developer sering menggunakan terminal untuk bekerja dengan sistem Linux.',
            ],
            quickTip:
              'Tidak perlu langsung menghafal command Linux. Pahami dulu konsep file system dan terminal.',
            example:
              'Command seperti pwd, ls, cd, dan mkdir digunakan untuk bekerja dengan file system melalui terminal.',
          },
        ],
      },
      {
        id: 'data-representation',
        title: 'Data & Binary',
        description:
          'Pelajari bagaimana komputer merepresentasikan data menggunakan angka dan kode.',
        materials: [
          {
            id: 'bits-bytes',
            title: 'Bit & Byte',
            summary:
              'Bit adalah unit data terkecil dalam komputer, sedangkan byte terdiri dari sekumpulan bit.',
            keyPoints: [
              'Bit memiliki nilai 0 atau 1.',
              'Satu byte terdiri dari 8 bit.',
              'Storage dan ukuran data sering dinyatakan dalam byte.',
            ],
            quickTip:
              'Ingat: bit = 0/1, byte = 8 bit.',
            example:
              '10101010 adalah contoh data sepanjang 8 bit atau 1 byte.',
          },
          {
            id: 'binary',
            title: 'Binary Number',
            summary:
              'Komputer menggunakan sistem bilangan biner yang hanya menggunakan angka 0 dan 1.',
            keyPoints: [
              'Binary menggunakan basis 2.',
              'Setiap digit binary disebut bit.',
              'Binary digunakan untuk merepresentasikan berbagai jenis data.',
            ],
            quickTip:
              'Kalau melihat angka yang hanya terdiri dari 0 dan 1, kemungkinan itu representasi binary.',
            example:
              'Angka desimal 5 dapat direpresentasikan sebagai 101 dalam binary.',
          },
          {
            id: 'encoding',
            title: 'Character Encoding',
            summary:
              'Character encoding digunakan untuk merepresentasikan karakter menjadi data yang dapat diproses komputer.',
            keyPoints: [
              'Komputer membutuhkan representasi numerik untuk karakter.',
              'ASCII adalah salah satu encoding karakter.',
              'Unicode memungkinkan representasi berbagai bahasa dan simbol.',
            ],
            quickTip:
              'Unicode penting karena aplikasi modern harus bisa menangani banyak bahasa dan simbol.',
            example:
              'Huruf, angka, emoji, dan karakter dari berbagai bahasa dapat direpresentasikan menggunakan Unicode.',
          },
        ],
      },
    ],
  },

  // =========================================================
  // INTERNET & WEB FUNDAMENTALS
  // =========================================================
  {
    id: 'internet-web',
    title: 'Internet & Web Fundamentals',
    emoji: '🌐',
    description:
      'Pahami cara kerja internet, website, browser, HTTP, server, dan API sebelum mulai membangun aplikasi web.',
    subtopics: [
      {
        id: 'internet-basics',
        title: 'Dasar Internet',
        description:
          'Kenali konsep dasar internet dan bagaimana perangkat dapat saling berkomunikasi.',
        materials: [
          {
            id: 'internet-vs-web',
            title: 'Internet vs Web',
            summary:
              'Internet adalah jaringan global yang menghubungkan perangkat, sedangkan World Wide Web adalah salah satu layanan yang berjalan di atas internet.',
            keyPoints: [
              'Internet adalah infrastrukturnya.',
              'Web adalah salah satu layanan yang menggunakan internet.',
              'Email, online gaming, dan web adalah contoh penggunaan internet.',
            ],
            quickTip:
              'Internet bukan sama dengan website. Website hanya salah satu bagian dari internet.',
            example:
              'Kamu bisa menggunakan internet untuk mengakses website, tetapi internet juga digunakan untuk layanan lain seperti email.',
          },
          {
            id: 'client-server',
            title: 'Client & Server',
            summary:
              'Client meminta resource atau layanan, sedangkan server menerima request dan memberikan response.',
            keyPoints: [
              'Browser biasanya bertindak sebagai client.',
              'Server menyediakan data atau layanan.',
              'Komunikasi client-server terjadi melalui jaringan.',
            ],
            quickTip:
              'Bayangkan client sebagai pelanggan yang meminta sesuatu dan server sebagai pihak yang melayani permintaan.',
            example:
              'Browser meminta halaman website kepada server, lalu server mengirimkan response berisi data halaman tersebut.',
          },
          {
            id: 'ip-address',
            title: 'IP Address',
            summary:
              'IP address digunakan untuk mengidentifikasi perangkat atau interface dalam jaringan.',
            keyPoints: [
              'IP membantu perangkat saling menemukan di jaringan.',
              'Ada IPv4 dan IPv6.',
              'IP address berbeda dengan domain.',
            ],
            quickTip:
              'Domain lebih mudah diingat manusia, sedangkan IP digunakan dalam komunikasi jaringan.',
            example:
              'Sebuah server dapat memiliki IP address yang digunakan perangkat lain untuk menghubunginya.',
          },
          {
            id: 'dns',
            title: 'DNS',
            summary:
              'DNS menerjemahkan nama domain yang mudah dibaca manusia menjadi informasi yang digunakan untuk menemukan server.',
            keyPoints: [
              'DNS berarti Domain Name System.',
              'DNS membantu menerjemahkan domain ke alamat jaringan.',
              'Tanpa DNS, pengguna harus mengingat alamat IP.',
            ],
            quickTip:
              'Anggap DNS seperti buku kontak internet.',
            example:
              'Saat kamu mengetik sebuah domain di browser, DNS membantu menemukan server yang terkait dengan domain tersebut.',
          },
        ],
      },
      {
        id: 'web-fundamentals',
        title: 'Web Fundamentals',
        description:
          'Pahami komponen dasar website dan proses ketika browser meminta halaman.',
        materials: [
          {
            id: 'website-web-app',
            title: 'Website vs Web Application',
            summary:
              'Website umumnya berfokus pada penyajian informasi, sedangkan web application menyediakan interaksi dan fungsi yang lebih kompleks.',
            keyPoints: [
              'Website dapat berfokus pada informasi.',
              'Web application biasanya memiliki interaksi dan state yang lebih kompleks.',
              'Batas antara website dan web application tidak selalu mutlak.',
            ],
            quickTip:
              'Fokus pada fungsi aplikasi, bukan hanya istilahnya.',
            example:
              'Blog sederhana dapat disebut website, sedangkan dashboard administrasi dapat disebut web application.',
          },
          {
            id: 'browser',
            title: 'Browser',
            summary:
              'Browser adalah aplikasi yang digunakan untuk mengakses dan menampilkan resource dari web.',
            keyPoints: [
              'Browser mengirim request ke server.',
              'Browser memproses HTML, CSS, dan JavaScript.',
              'Chrome, Firefox, Safari, dan Edge adalah contoh browser.',
            ],
            quickTip:
              'Browser bukan sekadar tempat membuka website; browser juga menjalankan JavaScript dan merender halaman.',
            example:
              'Saat membuka aplikasi React, browser menjalankan JavaScript yang diperlukan untuk membuat UI interaktif.',
          },
          {
            id: 'http',
            title: 'HTTP & HTTPS',
            summary:
              'HTTP adalah protokol komunikasi yang digunakan dalam web, sedangkan HTTPS menambahkan lapisan keamanan melalui enkripsi.',
            keyPoints: [
              'HTTP menggunakan request dan response.',
              'HTTPS melindungi komunikasi dengan enkripsi.',
              'HTTP method menunjukkan jenis operasi yang diminta.',
            ],
            quickTip:
              'Kalau melihat HTTPS, ingat bahwa komunikasi antara client dan server dilindungi menggunakan enkripsi.',
            example:
              'Browser mengirim HTTP request untuk mengambil resource dari server dan menerima HTTP response.',
          },
          {
            id: 'status-codes',
            title: 'HTTP Status Codes',
            summary:
              'HTTP status code memberi informasi mengenai hasil dari sebuah request.',
            keyPoints: [
              '2xx biasanya menunjukkan keberhasilan.',
              '4xx biasanya berkaitan dengan masalah dari request/client.',
              '5xx biasanya menunjukkan masalah pada server.',
            ],
            quickTip:
              'Hafalkan dulu 200, 201, 400, 401, 403, 404, dan 500.',
            example:
              '404 berarti resource yang diminta tidak ditemukan.',
          },
        ],
      },
      {
        id: 'api-basics',
        title: 'API',
        description:
          'Pelajari bagaimana aplikasi saling berkomunikasi menggunakan API.',
        materials: [
          {
            id: 'what-is-api',
            title: 'Apa Itu API?',
            summary:
              'API adalah cara terstruktur bagi satu software untuk berkomunikasi dan menggunakan fungsi atau data dari software lain.',
            keyPoints: [
              'API menyediakan aturan komunikasi antar sistem.',
              'API sering digunakan antara frontend dan backend.',
              'API dapat mengembalikan data seperti JSON.',
            ],
            quickTip:
              'Bayangkan API sebagai waiter yang menerima pesanan dari client dan menyampaikannya ke server.',
            example:
              'Frontend meminta daftar produk melalui endpoint API, kemudian backend mengirimkan data produk.',
          },
          {
            id: 'http-methods',
            title: 'HTTP Methods',
            summary:
              'HTTP methods menunjukkan aksi yang ingin dilakukan terhadap resource.',
            keyPoints: [
              'GET biasanya digunakan untuk mengambil data.',
              'POST biasanya digunakan untuk membuat data.',
              'PUT/PATCH biasanya digunakan untuk memperbarui data.',
              'DELETE biasanya digunakan untuk menghapus data.',
            ],
            quickTip:
              'Ingat CRUD: Create, Read, Update, Delete.',
            example:
              'GET /users dapat digunakan untuk mengambil daftar user.',
          },
          {
            id: 'json',
            title: 'JSON',
            summary:
              'JSON adalah format data populer yang sering digunakan untuk pertukaran data antara client dan server.',
            keyPoints: [
              'JSON mudah dibaca manusia.',
              'JSON menggunakan struktur key-value.',
              'JSON sering digunakan pada REST API.',
            ],
            quickTip:
              'Saat bekerja dengan API, biasakan membaca struktur JSON sebelum langsung melakukan coding.',
            example:
              '{"name": "Arfida", "age": 21}',
          },
        ],
      },
    ],
  },

  // =========================================================
  // PROGRAMMING
  // =========================================================
  {
    id: 'pemrograman',
    title: 'Pemrograman',
    emoji: '💻',
    description:
      'Mulai dari alur kode, logika program, sampai struktur data dan OOP.',
    subtopics: [
      {
        id: 'pemrograman-dasar',
        title: 'Dasar Program',
        description:
          'Kenali cara baca kode, variabel, operator, dan alur dasar sebelum masuk ke soal yang lebih kompleks.',
        materials: [
          {
            id: 'programming-variables',
            title: 'Variabel & Tipe Data',
            summary:
              'Pelajari cara menyimpan nilai, mengenali tipe data, dan membaca perubahan isi variabel dari satu baris ke baris lain.',
            keyPoints: [
              'Perhatikan nilai awal sebelum variabel diubah.',
              'Cek apakah nilai bertambah, berkurang, atau diganti total.',
              'Bedakan string, number, dan boolean saat membaca soal.',
            ],
            quickTip:
              'Kalau bingung, tulis ulang isi variabel per langkah di tabel kecil.',
            example:
              'x = 2 lalu x = x + 3 berarti nilai akhir x adalah 5.',
          },
          {
            id: 'programming-operators',
            title: 'Operator Dasar',
            summary:
              'Pahami operator aritmatika, perbandingan, dan logika supaya hasil evaluasi kondisi tidak ketukar.',
            keyPoints: [
              'Operator perbandingan menghasilkan true atau false.',
              'Urutan prioritas operator memengaruhi hasil akhir.',
              'Gabungan AND dan OR sering jadi jebakan soal.',
            ],
            quickTip:
              'Kerjakan bagian dalam tanda kurung lebih dulu, baru lanjut ke operator lain.',
            example:
              'Jika (3 + 2 > 4) dan (5 == 5), maka hasil akhirnya true.',
          },
        ],
      },
      {
        id: 'pemrograman-alur',
        title: 'Alur Program',
        description:
          'Fokus ke percabangan, loop, dan proses debugging saat membaca potongan kode.',
        materials: [
          {
            id: 'programming-loops',
            title: 'Loops & Conditionals',
            summary:
              'Pahami alur loop, kondisi, dan skip logic pada kode untuk menghindari kesalahan saat membaca soal.',
            keyPoints: [
              'Perhatikan urutan eksekusi dari atas ke bawah.',
              'Kenali kapan loop berhenti dan kapan kondisi skip dijalankan.',
              'Hitung nilai sementara secara bertahap agar tidak salah.',
            ],
            quickTip:
              'Coba tulis nilai variabel di setiap iterasi supaya lebih mudah diprediksi.',
            example:
              'Pada loop 1..5, jika ada continue saat i = 3, nilai yang dilewati tidak ikut dihitung.',
          },
          {
            id: 'programming-debugging',
            title: 'Debugging Dasar',
            summary:
              'Belajar mencari sumber error dari output, logika salah, dan urutan proses yang tidak sesuai.',
            keyPoints: [
              'Cek baris yang paling dekat dengan error terlebih dahulu.',
              'Bandingkan hasil yang diharapkan dengan hasil nyata.',
              'Cari perubahan kecil yang paling mungkin memicu bug.',
            ],
            quickTip:
              'Kalau kode terasa aneh, baca ulang input, proses, lalu output secara terpisah.',
            example:
              'Jika program selalu masuk ke cabang else, berarti kondisi if-nya tidak pernah terpenuhi.',
          },
        ],
      },
      {
        id: 'pemrograman-structure',
        title: 'Struktur Program',
        description:
          'Masuk ke konsep class, fungsi, dan cara menata kode biar lebih rapi dan mudah dibaca.',
        materials: [
          {
            id: 'programming-oop',
            title: 'OOP Basics',
            summary:
              'Pelajari konsep class, method, inheritance, overriding, dan encapsulation agar lebih lancar mengerjakan soal teknis.',
            keyPoints: [
              'Class adalah cetak biru, object adalah instance nyata.',
              'Override berarti mengganti perilaku method dari parent class.',
              'Encapsulation membantu data tetap aman dan terorganisir.',
            ],
            quickTip:
              'Kalau soal menanyakan beda override dan overload, fokus pada nama method dan parameter.',
            example:
              'Subclass yang menulis ulang method dari superclass disebut overriding.',
          },
          {
            id: 'programming-functions',
            title: 'Fungsi & Modularisasi',
            summary:
              'Pahami cara memecah masalah besar jadi fungsi kecil yang lebih mudah diuji dan dipakai ulang.',
            keyPoints: [
              'Fungsi sebaiknya punya satu tugas utama.',
              'Parameter membuat fungsi lebih fleksibel.',
              'Return value dipakai untuk mengirim hasil keluar dari fungsi.',
            ],
            quickTip:
              'Kalau satu blok kode dipakai lebih dari sekali, jadikan fungsi.',
            example:
              'fungsi hitungLuas(panjang, lebar) mengembalikan panjang x lebar.',
          },
        ],
      },
    ],
  },

  // =========================================================
  // LOGIC
  // =========================================================
  {
    id: 'logika',
    title: 'Logika',
    emoji: '🧠',
    description:
      'Latihan pola, deduksi, dan penalaran bertahap untuk soal yang butuh konsentrasi.',
    subtopics: [
      {
        id: 'logika-pola',
        title: 'Pola & Urutan',
        description:
          'Cocok untuk soal angka, bentuk, dan urutan yang tersembunyi.',
        materials: [
          {
            id: 'logic-patterns',
            title: 'Pattern Recognition',
            summary:
              'Pelajari cara mengenali pola visual, angka, dan urutan logika agar lebih cepat menemukan jawaban yang hilang.',
            keyPoints: [
              'Perhatikan perubahan yang konsisten di setiap langkah.',
              'Coba identifikasi apakah pola bergerak, bertambah, atau berganti aturan.',
              'Jangan terpaku pada satu detail; lihat keseluruhan bentuk pola.',
            ],
            quickTip:
              'Kalau menemukan pola yang rumit, pecah jadi 3 bagian: posisi, warna, dan urutan.',
            example:
              'Contoh: 2, 4, 8, 14, 22, ... -> pola naik +2, +4, +6, +8, jadi jawabannya 32.',
          },
          {
            id: 'logic-sequences',
            title: 'Sequence Reasoning',
            summary:
              'Gunakan pola penambahan, pengurangan, perkalian, atau kombinasi untuk menebak elemen berikutnya.',
            keyPoints: [
              'Pisahkan dulu perubahan besar dan perubahan kecil.',
              'Lihat apakah ada pola selang-seling.',
              'Bandingkan dua atau tiga langkah sekaligus.',
            ],
            quickTip:
              'Tuliskan selisih antar angka supaya pola lebih gampang kelihatan.',
            example:
              '1, 3, 6, 10, 15 adalah deret selisih bertambah 2, 3, 4, 5.',
          },
        ],
      },
      {
        id: 'logika-deduksi',
        title: 'Deduksi & Penalaran',
        description:
          'Latihan menyusun fakta, batasan, dan kesimpulan logis secara sistematis.',
        materials: [
          {
            id: 'logic-seating',
            title: 'Seating & Deduction',
            summary:
              'Gunakan aturan yang ketat untuk menyusun urutan tempat duduk, hubungan, dan kesimpulan logis.',
            keyPoints: [
              'Tulis semua batasan secara singkat sebelum menjawab.',
              'Cari elemen yang pasti dan eliminasi opsi yang bertentangan.',
              'Jika ada dua aturan yang saling menguatkan, gunakan keduanya bersama.',
            ],
            quickTip:
              'Biasanya lebih cepat kalau kamu menggambar garis sederhana dari setiap pernyataan.',
            example:
              'Budi duduk kiri, Cici tidak mau dekat Andy atau Dedi, jadi susunan yang cocok bisa langsung terlihat.',
          },
          {
            id: 'logic-syllogism',
            title: 'Syllogism & Conclusion',
            summary:
              'Belajar menarik kesimpulan dari premis umum dan khusus tanpa melompat ke asumsi yang salah.',
            keyPoints: [
              'Premis benar belum tentu semua kesimpulan benar.',
              'Cari hubungan yang pasti, bukan yang hanya mungkin.',
              'Jangan menambahkan informasi yang tidak ada di soal.',
            ],
            quickTip:
              'Tanyakan dulu: kesimpulan itu pasti, mungkin, atau salah total?',
            example:
              'Jika semua A adalah B, dan C adalah A, maka C juga termasuk B.',
          },
        ],
      },
      {
        id: 'logika-strategi',
        title: 'Strategi Cepat',
        description:
          'Teknik kerja cepat saat waktu terbatas dan soal terasa panjang.',
        materials: [
          {
            id: 'logic-elimination',
            title: 'Elimination Strategy',
            summary:
              'Gunakan eliminasi untuk mencoret opsi yang jelas salah dan mempersempit jawaban.',
            keyPoints: [
              'Cari jawaban yang bertabrakan dengan satu aturan saja.',
              'Eliminasi lebih cepat daripada membuktikan semua opsi benar.',
              'Prioritaskan petunjuk yang paling spesifik.',
            ],
            quickTip:
              'Saat waktu mepet, coret yang salah dulu baru pilih dari sisa opsi.',
            example:
              'Kalau tiga opsi melanggar aturan urutan, tinggal satu opsi yang tersisa.',
          },
        ],
      },
    ],
  },

  // =========================================================
  // MATHEMATICS
  // =========================================================
  {
    id: 'matematika',
    title: 'Matematika Dasar',
    emoji: '📐',
    description:
      'Tambahan materi untuk memperkuat hitungan cepat, pecahan, dan perbandingan.',
    subtopics: [
      {
        id: 'matematika-aritmetika',
        title: 'Aritmetika',
        description:
          'Dasar hitungan cepat yang sering muncul di soal campuran.',
        materials: [
          {
            id: 'math-fractions',
            title: 'Fractions & Ratios',
            summary:
              'Pahami pecahan, perbandingan, dan proporsi supaya hitungan cepat lebih akurat.',
            keyPoints: [
              'Samakan penyebut dulu kalau membandingkan pecahan.',
              'Perbandingan bisa diubah jadi bentuk rasio sederhana.',
              'Kurangi langkah hitung yang tidak perlu.',
            ],
            quickTip:
              'Kalau ada pecahan, ubah ke bentuk yang paling mudah dibandingkan.',
            example:
              '1/2 lebih besar dari 2/5 karena 0,5 > 0,4.',
          },
          {
            id: 'math-percentages',
            title: 'Persentase Cepat',
            summary:
              'Hitung diskon, kenaikan, dan perubahan nilai dengan cara yang cepat dan konsisten.',
            keyPoints: [
              '10% berarti geser koma satu langkah.',
              'Cari persentase dari nilai dasar, bukan dari hasil yang sudah diubah.',
              'Gunakan pendekatan 50%, 25%, 10% kalau perlu.',
            ],
            quickTip:
              'Mecah persentase besar jadi beberapa bagian kecil yang mudah dihitung.',
            example:
              '20% dari 150 adalah 30.',
          },
        ],
      },
      {
        id: 'matematika-pola',
        title: 'Pola Angka',
        description:
          'Memperkuat intuisi mencari aturan dari angka yang berulang atau naik bertahap.',
        materials: [
          {
            id: 'math-number-patterns',
            title: 'Number Patterns',
            summary:
              'Baca pola aritmetika, geometri, dan pola campuran agar bisa menebak suku berikutnya.',
            keyPoints: [
              'Cek selisih antar suku terlebih dahulu.',
              'Lihat apakah selisihnya juga punya pola.',
              'Cari petunjuk pengali jika penambahannya tidak konsisten.',
            ],
            quickTip:
              'Bikin dua baris: angka asli dan selisihnya.',
            example:
              '3, 6, 12, 24 adalah pola dikali 2 setiap langkah.',
          },
        ],
      },
    ],
  },

  // =========================================================
  // DATABASE
  // =========================================================
  {
    id: 'database',
    title: 'Database',
    emoji: '🗄️',
    description:
      'Pelajari cara menyimpan, mengambil, dan mengelola data dalam aplikasi.',
    subtopics: [
      {
        id: 'database-basics',
        title: 'Database Fundamentals',
        description:
          'Kenali konsep database dan bagaimana data disusun.',
        materials: [
          {
            id: 'what-is-database',
            title: 'Apa Itu Database?',
            summary:
              'Database adalah sistem yang digunakan untuk menyimpan dan mengelola data agar dapat diakses dan digunakan oleh aplikasi.',
            keyPoints: [
              'Database menyimpan data secara terstruktur.',
              'Aplikasi dapat membaca dan mengubah data di database.',
              'Database membantu mengelola data dalam jumlah besar.',
            ],
            quickTip:
              'Bayangkan database sebagai lemari arsip digital yang memiliki aturan penyimpanan.',
            example:
              'Aplikasi toko online dapat menyimpan data user, produk, pesanan, dan pembayaran di database.',
          },
          {
            id: 'sql-vs-nosql',
            title: 'SQL vs NoSQL',
            summary:
              'SQL database umumnya menggunakan struktur tabel, sedangkan NoSQL mencakup berbagai model penyimpanan data non-relasional.',
            keyPoints: [
              'SQL banyak digunakan untuk data relasional.',
              'NoSQL memiliki beberapa model seperti document dan key-value.',
              'Pilihan database bergantung pada kebutuhan aplikasi.',
            ],
            quickTip:
              'Jangan menganggap SQL selalu lebih baik atau NoSQL selalu lebih cepat. Pilih berdasarkan kebutuhan.',
            example:
              'PostgreSQL adalah contoh database SQL, sedangkan MongoDB adalah contoh database document-oriented.',
          },
        ],
      },
      {
        id: 'database-sql',
        title: 'SQL Dasar',
        description:
          'Belajar query dasar untuk mengambil dan mengubah data.',
        materials: [
          {
            id: 'sql-crud',
            title: 'CRUD',
            summary:
              'CRUD adalah empat operasi utama pada data: Create, Read, Update, dan Delete.',
            keyPoints: [
              'Create digunakan untuk membuat data.',
              'Read digunakan untuk membaca data.',
              'Update digunakan untuk memperbarui data.',
              'Delete digunakan untuk menghapus data.',
            ],
            quickTip:
              'CRUD adalah konsep yang sangat sering muncul dalam backend development.',
            example:
              'Membuat user baru adalah Create, mengambil data user adalah Read.',
          },
          {
            id: 'sql-select',
            title: 'SELECT & WHERE',
            summary:
              'SELECT digunakan untuk mengambil data dan WHERE digunakan untuk memberikan kondisi.',
            keyPoints: [
              'SELECT menentukan data yang ingin diambil.',
              'WHERE membatasi data berdasarkan kondisi.',
              'Gunakan kondisi yang jelas agar query menghasilkan data yang tepat.',
            ],
            quickTip:
              'Baca query SQL dari SELECT lalu FROM kemudian WHERE.',
            example:
              'SELECT name FROM users WHERE age >= 18;',
          },
          {
            id: 'sql-joins',
            title: 'JOIN',
            summary:
              'JOIN digunakan untuk menggabungkan data dari beberapa tabel berdasarkan hubungan tertentu.',
            keyPoints: [
              'JOIN menghubungkan data antar tabel.',
              'INNER JOIN hanya mengambil data yang memiliki pasangan.',
              'LEFT JOIN mempertahankan seluruh data dari tabel kiri.',
            ],
            quickTip:
              'Sebelum memakai JOIN, pahami dulu hubungan antar tabel.',
            example:
              'Users dapat dihubungkan dengan Orders menggunakan user_id.',
          },
        ],
      },
    ],
  },

  // =========================================================
  // DATA STRUCTURES & ALGORITHMS
  // =========================================================
  {
    id: 'data-structures',
    title: 'Data Structures & Algorithms',
    emoji: '📦',
    description:
      'Pelajari cara menyimpan data dan menyelesaikan masalah secara efisien.',
    subtopics: [
      {
        id: 'basic-data-structures',
        title: 'Data Structures',
        description:
          'Kenali struktur data dasar yang sering digunakan dalam programming.',
        materials: [
          {
            id: 'array',
            title: 'Array',
            summary:
              'Array menyimpan kumpulan elemen yang dapat diakses berdasarkan index.',
            keyPoints: [
              'Array memiliki index.',
              'Index biasanya dimulai dari 0 pada banyak bahasa pemrograman.',
              'Array cocok untuk menyimpan kumpulan data yang berurutan.',
            ],
            quickTip:
              'Saat membaca soal array, perhatikan index dan panjang array.',
            example:
              'const fruits = ["apple", "banana", "orange"];',
          },
          {
            id: 'stack',
            title: 'Stack',
            summary:
              'Stack menggunakan prinsip Last In, First Out atau LIFO.',
            keyPoints: [
              'Data terakhir masuk akan keluar terlebih dahulu.',
              'Operasi umum adalah push dan pop.',
              'Stack sering digunakan dalam proses seperti undo dan call stack.',
            ],
            quickTip:
              'Bayangkan tumpukan piring: piring terakhir yang diletakkan adalah yang pertama diambil.',
            example:
              'Push A, push B, lalu pop akan mengeluarkan B.',
          },
          {
            id: 'queue',
            title: 'Queue',
            summary:
              'Queue menggunakan prinsip First In, First Out atau FIFO.',
            keyPoints: [
              'Data pertama masuk akan keluar terlebih dahulu.',
              'Queue sering digunakan dalam sistem antrian.',
              'Operasi umum adalah enqueue dan dequeue.',
            ],
            quickTip:
              'Bayangkan antrean kasir.',
            example:
              'A masuk lebih dulu, lalu B. Saat dequeue, A akan keluar lebih dahulu.',
          },
          {
            id: 'hash-map',
            title: 'Hash Map',
            summary:
              'Hash map menyimpan pasangan key-value dan memungkinkan pencarian berdasarkan key secara efisien pada kondisi umum.',
            keyPoints: [
              'Data disimpan sebagai key dan value.',
              'Key digunakan untuk mencari value.',
              'Sangat umum digunakan dalam aplikasi.',
            ],
            quickTip:
              'Bayangkan dictionary: kamu mencari arti sebuah kata berdasarkan key.',
            example:
              'const user = { name: "Arfida", age: 21 };',
          },
        ],
      },
      {
        id: 'algorithms',
        title: 'Algorithms',
        description:
          'Kenali cara berpikir algoritmik dan algoritma dasar.',
        materials: [
          {
            id: 'searching',
            title: 'Searching',
            summary:
              'Searching adalah proses menemukan data tertentu dalam kumpulan data.',
            keyPoints: [
              'Linear search memeriksa elemen satu per satu.',
              'Binary search bekerja pada data yang terurut.',
              'Pilihan algoritma memengaruhi efisiensi.',
            ],
            quickTip:
              'Sebelum menggunakan binary search, pastikan memahami bahwa datanya perlu terurut.',
            example:
              'Mencari nama dalam array dari elemen pertama sampai terakhir adalah contoh linear search.',
          },
          {
            id: 'sorting',
            title: 'Sorting',
            summary:
              'Sorting adalah proses mengurutkan data berdasarkan aturan tertentu.',
            keyPoints: [
              'Data dapat diurutkan ascending atau descending.',
              'Ada banyak algoritma sorting dengan karakteristik berbeda.',
              'Sorting sering menjadi bagian dari proses pengolahan data.',
            ],
            quickTip:
              'Pahami konsep sorting terlebih dahulu sebelum menghafalkan implementasinya.',
            example:
              '[5, 2, 8, 1] dapat diurutkan menjadi [1, 2, 5, 8].',
          },
          {
            id: 'big-o',
            title: 'Big O Notation',
            summary:
              'Big O digunakan untuk menggambarkan bagaimana kebutuhan waktu atau resource algoritma berkembang terhadap ukuran input.',
            keyPoints: [
              'Big O membantu membandingkan efisiensi algoritma.',
              'O(1) tidak bergantung secara langsung pada ukuran input.',
              'O(n) bertambah secara linear terhadap input.',
              'O(n²) dapat bertambah jauh lebih cepat ketika input membesar.',
            ],
            quickTip:
              'Jangan hanya menghitung jumlah baris kode. Fokus pada pertumbuhan pekerjaan terhadap input.',
            example:
              'Loop tunggal yang memproses setiap elemen array biasanya memiliki kompleksitas O(n).',
          },
        ],
      },
    ],
  },

  // =========================================================
  // GIT & GITHUB
  // =========================================================
  {
    id: 'git-github',
    title: 'Git & GitHub',
    emoji: '🔀',
    description:
      'Pelajari version control dan workflow dasar untuk bekerja dengan code secara aman.',
    subtopics: [
      {
        id: 'git-basics',
        title: 'Git Basics',
        description:
          'Kenali konsep repository, commit, branch, dan perubahan kode.',
        materials: [
          {
            id: 'what-is-git',
            title: 'Apa Itu Git?',
            summary:
              'Git adalah version control system yang digunakan untuk melacak perubahan pada file dan source code.',
            keyPoints: [
              'Git membantu melacak history perubahan.',
              'Git memungkinkan developer kembali ke versi sebelumnya.',
              'Git dapat digunakan tanpa GitHub.',
            ],
            quickTip:
              'Git adalah tool version control, sedangkan GitHub adalah salah satu platform untuk menyimpan dan berkolaborasi pada repository Git.',
            example:
              'Kamu dapat membuat commit setelah menyelesaikan sebuah perubahan pada project.',
          },
          {
            id: 'git-commit',
            title: 'Commit',
            summary:
              'Commit adalah snapshot perubahan yang disimpan dalam history repository.',
            keyPoints: [
              'Commit memiliki message.',
              'Commit membantu memahami history project.',
              'Commit sebaiknya mewakili perubahan yang jelas.',
            ],
            quickTip:
              'Buat commit kecil dan bermakna daripada satu commit besar yang mencampur banyak perubahan.',
            example:
              'git commit -m "add login validation"',
          },
          {
            id: 'git-branch',
            title: 'Branch',
            summary:
              'Branch memungkinkan developer mengembangkan perubahan secara terpisah dari branch lainnya.',
            keyPoints: [
              'Branch membantu memisahkan pekerjaan.',
              'Branch dapat digabungkan melalui merge.',
              'Workflow branch sering digunakan dalam kerja tim.',
            ],
            quickTip:
              'Anggap branch sebagai jalur pengembangan yang terpisah.',
            example:
              'Developer dapat membuat branch feature/login untuk mengembangkan fitur login.',
          },
        ],
      },
      {
        id: 'github-basics',
        title: 'GitHub',
        description:
          'Kenali fungsi GitHub dalam kolaborasi dan penyimpanan repository.',
        materials: [
          {
            id: 'github-repository',
            title: 'Repository',
            summary:
              'Repository adalah tempat project dan history Git disimpan.',
            keyPoints: [
              'Repository dapat berisi source code dan konfigurasi project.',
              'Repository dapat bersifat public atau private.',
              'Repository digunakan sebagai pusat kolaborasi code.',
            ],
            quickTip:
              'Satu project biasanya memiliki satu repository utama.',
            example:
              'Project React kamu dapat disimpan di sebuah repository GitHub.',
          },
          {
            id: 'pull-request',
            title: 'Pull Request',
            summary:
              'Pull Request digunakan untuk mengusulkan perubahan dari satu branch agar ditinjau dan digabungkan.',
            keyPoints: [
              'Pull Request membantu code review.',
              'Developer lain dapat memberikan komentar.',
              'Pull Request dapat digunakan sebelum merge.',
            ],
            quickTip:
              'Anggap Pull Request sebagai proses: "Saya sudah membuat perubahan, tolong review sebelum digabungkan."',
            example:
              'Feature/login dibuat di branch terpisah lalu dibuat Pull Request menuju main.',
          },
        ],
      },
    ],
  },

  // =========================================================
  // SOFTWARE ENGINEERING
  // =========================================================
  {
    id: 'software-engineering',
    title: 'Software Engineering',
    emoji: '🏗️',
    description:
      'Pelajari cara membangun software secara terstruktur, maintainable, dan dapat dikembangkan bersama tim.',
    subtopics: [
      {
        id: 'software-development',
        title: 'Software Development',
        description:
          'Pahami proses umum dalam membangun software.',
        materials: [
          {
            id: 'sdlc',
            title: 'SDLC',
            summary:
              'Software Development Life Cycle adalah gambaran proses yang digunakan untuk merencanakan, membangun, menguji, dan memelihara software.',
            keyPoints: [
              'Development bukan hanya aktivitas coding.',
              'Requirement dan planning penting sebelum implementasi.',
              'Testing dan maintenance merupakan bagian dari software development.',
            ],
            quickTip:
              'Software engineering bukan sekadar "bisa coding", tetapi juga bagaimana membangun software dengan proses yang baik.',
            example:
              'Sebuah aplikasi dapat melalui tahap requirement, design, development, testing, deployment, dan maintenance.',
          },
          {
            id: 'pseudocode',
            title: 'Pseudocode',
            summary:
              'Pseudocode membantu merancang solusi dengan bahasa sederhana sebelum menulis kode sebenarnya.',
            keyPoints: [
              'Pseudocode tidak terikat pada bahasa pemrograman tertentu.',
              'Pseudocode membantu fokus pada logika.',
              'Pseudocode dapat mengurangi kebingungan saat mulai coding.',
            ],
            quickTip:
              'Kalau belum tahu harus mulai coding dari mana, tulis langkah-langkahnya menggunakan bahasa manusia terlebih dahulu.',
            example:
              'Input angka → cek apakah angka habis dibagi 2 → tampilkan "genap" jika benar.',
          },
        ],
      },
      {
        id: 'clean-code',
        title: 'Clean Code',
        description:
          'Belajar menulis kode yang mudah dibaca, dipahami, dan dirawat.',
        materials: [
          {
            id: 'readable-code',
            title: 'Readable Code',
            summary:
              'Kode yang baik seharusnya mudah dipahami oleh developer lain, bukan hanya bisa dijalankan.',
            keyPoints: [
              'Gunakan nama variable dan function yang jelas.',
              'Hindari kompleksitas yang tidak perlu.',
              'Jaga fungsi tetap memiliki tanggung jawab yang jelas.',
            ],
            quickTip:
              'Tulis kode seolah-olah developer lain akan membacanya besok pagi.',
            example:
              'getUserById() lebih mudah dipahami daripada doSomething().',
          },
          {
            id: 'testing-basics',
            title: 'Testing Basics',
            summary:
              'Testing digunakan untuk memeriksa apakah software bekerja sesuai dengan yang diharapkan.',
            keyPoints: [
              'Testing membantu menemukan bug.',
              'Test dapat dilakukan secara manual maupun otomatis.',
              'Unit test biasanya menguji bagian kecil dari aplikasi.',
            ],
            quickTip:
              'Jangan hanya menguji kondisi normal. Coba juga input kosong, invalid, dan edge case.',
            example:
              'Function pembagian perlu diuji untuk angka normal dan kondisi pembagi bernilai 0.',
          },
        ],
      },
    ],
  },

  // =========================================================
  // AI & LLM
  // =========================================================
  {
    id: 'ai-llm',
    title: 'AI & LLM',
    emoji: '🤖',
    description:
      'Kenali konsep dasar Artificial Intelligence, Machine Learning, dan Large Language Models.',
    subtopics: [
      {
        id: 'ai-basics',
        title: 'AI Fundamentals',
        description:
          'Pahami konsep dasar AI dan bagaimana AI berbeda dari software biasa.',
        materials: [
          {
            id: 'ai-vs-ml',
            title: 'AI vs Machine Learning',
            summary:
              'AI adalah bidang yang luas tentang sistem yang melakukan tugas yang membutuhkan kemampuan seperti kecerdasan, sedangkan Machine Learning adalah pendekatan yang memungkinkan sistem belajar dari data.',
            keyPoints: [
              'AI merupakan bidang yang luas.',
              'Machine Learning adalah salah satu pendekatan dalam AI.',
              'Tidak semua software otomatis termasuk AI.',
            ],
            quickTip:
              'Pahami hubungan AI dan ML sebagai konsep umum dan salah satu pendekatannya.',
            example:
              'Sistem rekomendasi dapat menggunakan machine learning untuk mempelajari pola dari data pengguna.',
          },
          {
            id: 'generative-ai',
            title: 'Generative AI',
            summary:
              'Generative AI adalah sistem AI yang dapat menghasilkan konten baru seperti teks, gambar, audio, atau kode.',
            keyPoints: [
              'Generative AI menghasilkan output baru berdasarkan input dan model.',
              'Output tidak selalu benar.',
              'Kualitas output bergantung pada model, konteks, dan input.',
            ],
            quickTip:
              'Anggap output AI sebagai hasil yang perlu diperiksa, bukan sumber kebenaran mutlak.',
            example:
              'AI dapat digunakan untuk menghasilkan draft artikel, kode program, atau gambar.',
          },
        ],
      },
      {
        id: 'llm-basics',
        title: 'Large Language Models',
        description:
          'Kenali konsep dasar model bahasa modern dan bagaimana aplikasi dapat memanfaatkannya.',
        materials: [
          {
            id: 'what-is-llm',
            title: 'Apa Itu LLM?',
            summary:
              'Large Language Model adalah model machine learning yang dirancang untuk memahami dan menghasilkan bahasa berdasarkan pola yang dipelajari dari data.',
            keyPoints: [
              'LLM bekerja berdasarkan pola dalam data pelatihan.',
              'LLM dapat menghasilkan teks berdasarkan konteks.',
              'LLM dapat digunakan dalam berbagai aplikasi.',
            ],
            quickTip:
              'Jangan menganggap LLM sebagai database fakta. Model dapat menghasilkan jawaban yang terdengar benar tetapi salah.',
            example:
              'Chatbot dapat menggunakan LLM untuk memahami pertanyaan user dan menghasilkan respons.',
          },
          {
            id: 'prompting',
            title: 'Prompting',
            summary:
              'Prompting adalah cara memberikan instruksi dan konteks kepada model AI untuk mendapatkan output yang lebih sesuai.',
            keyPoints: [
              'Instruksi yang jelas biasanya menghasilkan output yang lebih terarah.',
              'Context membantu model memahami kebutuhan.',
              'Format output dapat ditentukan dalam prompt.',
            ],
            quickTip:
              'Jelaskan task, context, constraint, dan format output jika membutuhkan hasil yang konsisten.',
            example:
              'Daripada "jelaskan API", gunakan "jelaskan API untuk pemula dalam 3 poin dan berikan satu contoh sederhana".',
          },
          {
            id: 'ai-api',
            title: 'AI API',
            summary:
              'AI API memungkinkan aplikasi mengirim input ke model AI dan menerima output dari model tersebut.',
            keyPoints: [
              'Aplikasi dapat berkomunikasi dengan model melalui API.',
              'API key harus dijaga dan tidak disimpan secara sembarangan di frontend.',
              'Response AI dapat diproses kembali oleh aplikasi.',
            ],
            quickTip:
              'Jangan expose secret API key di client-side code.',
            example:
              'Backend dapat menerima prompt dari frontend, memanggil AI API, lalu mengirim hasilnya kembali ke frontend.',
          },
        ],
      },
    ],
  },
];