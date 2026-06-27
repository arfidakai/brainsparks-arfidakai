export interface QuizQuestion {
  id: string;
  category: 'Logic' | 'Programming';
  subCategory: string;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export const mockQuizQuestions: QuizQuestion[] = [
  // --- LOGIC & REASONING ---
  {
    id: 'l1',
    category: 'Logic',
    subCategory: 'Deret Angka',
    question: 'Tentukan angka selanjutnya dari deret berikut: 2, 4, 8, 14, 22, ?',
    options: ['30', '32', '34', '36'],
    correctAnswerIndex: 1,
    explanation: 'Polanya adalah penambahan bilangan genap berurutan: +2, +4, +6, +8, +10. Jadi, 22 + 10 = 32.'
  },
  {
    id: 'l2',
    category: 'Logic',
    subCategory: 'Logical Puzzle',
    question: 'Andi, Budi, Cici, dan Dedi duduk berdampingan di sebuah bangku panjang. Cici tidak mau duduk di sebelah Andi atau Dedi. Jika Budi duduk di ujung paling kiri, siapakah yang duduk di sebelah Cici?',
    options: ['Andi', 'Budi', 'Dedi', 'Tidak ada'],
    correctAnswerIndex: 1,
    explanation: 'Urutan duduk dari kiri ke kanan yang memenuhi syarat adalah: Budi, Cici, Andi, Dedi (atau Andi dan Dedi bisa bertukar tempat). Yang pasti berada di sebelah Cici adalah Budi.'
  },
  {
    id: 'l3',
    category: 'Logic',
    subCategory: 'Abstract Visual Pattern',
    question: 'Perhatikan pola rotasi simbol berikut: [↑] → [→] → [↓] → [←] → ? . Bentuk apakah yang berikutnya?',
    options: ['[→]', '[←]', '[↑]', '[↓]'],
    correctAnswerIndex: 2,
    explanation: 'Simbol panah berputar 90 derajat searah jarum jam pada setiap langkah. Setelah menghadap ke kiri [←], rotasi berikutnya akan kembali menghadap ke atas [↑].'
  },
  {
    id: 'l4',
    category: 'Logic',
    subCategory: 'Deret Angka Lompat',
    question: 'Berapakah angka kelanjutan dari pola ini: 1, 3, 3, 9, 5, 27, 7, ?',
    options: ['9', '35', '54', '81'],
    correctAnswerIndex: 3,
    explanation: 'Pola ini terdiri dari dua deret yang berselang-seling.\nDeret ganjil (posisi 1, 3, 5, 7): 1, 3, 5, 7 (selalu +2).\nDeret genap (posisi 2, 4, 6, 8): 3, 9, 27, ? (selalu dikali 3). Jadi, 27 x 3 = 81.'
  },
  {
    id: 'l5',
    category: 'Logic',
    subCategory: 'Probability Sederhana',
    question: 'Dalam sebuah kotak terdapat 4 bola merah dan 6 bola biru. Jika diambil 2 bola secara acak satu per satu tanpa pengembalian, berapakah peluang terambilnya bola merah pada pengambilan pertama dan bola biru pada pengambilan kedua?',
    options: ['4/15', '6/25', '2/5', '4/25'],
    correctAnswerIndex: 0,
    explanation: 'Peluang merah pertama = 4/10. Karena tanpa pengembalian, sisa bola 9 (4 merah, 5 biru). Peluang biru kedua = 6/9. Total peluang = (4/10) * (6/9) = 24/90 = 4/15.'
  },
  {
    id: 'l6',
    category: 'Logic',
    subCategory: 'Silogisme',
    question: 'Semua widget yang rusak tidak dapat digunakan. Beberapa perangkat di lab Apple Developer Academy adalah widget yang rusak. Kesimpulan yang sah adalah...',
    options: [
      'Semua perangkat di lab tidak dapat digunakan.',
      'Beberapa perangkat di lab tidak dapat digunakan.',
      'Beberapa perangkat di lab masih bisa diperbaiki.',
      'Semua widget di lab pasti rusak.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Karena beberapa perangkat di lab termasuk kelompok "widget yang rusak", dan semua widget yang rusak "tidak dapat digunakan", maka beberapa perangkat tersebut otomatis tidak dapat digunakan.'
  },
  {
    id: 'l7',
    category: 'Logic',
    subCategory: 'Kriptografi Sederhana',
    question: 'Jika kata "SWIFT" dikodekan menjadi "UXKHV" (menggeser huruf ke depan), maka kata "CODE" akan dikodekan menjadi...',
    options: ['EQFG', 'ERGH', 'ERFG', 'FREG'],
    correctAnswerIndex: 0,
    explanation: 'Polanya adalah menggeser setiap huruf maju sebanyak 2 posisi dalam alfabet (S->U, W->X, I->K, F->H, T->V). Menggunakan pola yang sama untuk CODE: C->E, O->Q, D->F, E->G. Hasilnya adalah EQFG.'
  },
  {
    id: 'l8',
    category: 'Logic',
    subCategory: 'Visual Matrix',
    question: 'Baris 1: 🔴 🔵 🟢 | Baris 2: 🔵 🟢 🔴 | Baris 3: 🟢 🔴 ? . Elemen apakah yang hilang?',
    options: ['🟢', '🔴', '🔵', '🟡'],
    correctAnswerIndex: 2,
    explanation: 'Setiap baris dan kolom harus memiliki tepat satu dari masing-masing warna (Merah, Biru, Hijau). Baris ketiga kekurangan warna Biru (🔵).'
  },

  // --- PROGRAMMING & TECH CONCEPTS ---
  {
    id: 'p1',
    category: 'Programming',
    subCategory: 'Conditionals & Loops',
    question: 'Berapa output akhir dari nilai "total" pada pseudocode berikut?',
    codeSnippet: `var total = 0
for i in 1...5 {
    if i == 3 {
        continue
    }
    total += i
}
// Berapa nilai total?`,
    options: ['15', '12', '10', '9'],
    correctAnswerIndex: 1,
    explanation: 'Loop berjalan dari 1 sampai 5. Saat i = 3, perintah "continue" dipicu sehingga proses "total += i" dilewati. Total eksekusi: 1 + 2 + 4 + 5 = 12.'
  },
  {
    id: 'p2',
    category: 'Programming',
    subCategory: 'Array & Indexing',
    question: 'Diberikan sebuah array bernama "colors". Apa output dari baris kode terakhir?',
    codeSnippet: `var colors = ["Red", "Green", "Blue"]
colors.append("Yellow")
colors.remove(at: 1)
print(colors[1])`,
    options: ['Red', 'Green', 'Blue', 'Yellow'],
    correctAnswerIndex: 2,
    explanation: 'Awal: ["Red", "Green", "Blue"]\nAppend: ["Red", "Green", "Blue", "Yellow"]\nRemove index 1 ("Green"): ["Red", "Blue", "Yellow"]\nSekarang index 1 diisi oleh "Blue".'
  },
  {
    id: 'p3',
    category: 'Programming',
    subCategory: 'OOP Concepts',
    question: 'Ketika sebuah Class anak (Subclass) mendefinisikan ulang fungsi yang sudah ada di Class induk (Superclass) dengan nama dan parameter yang sama, konsep ini disebut...',
    options: ['Overloading', 'Overriding', 'Encapsulation', 'Abstraction'],
    correctAnswerIndex: 1,
    explanation: 'Mengganti atau menulis ulang isi fungsi milik superclass di dalam subclass dikenal dengan istilah Method Overriding (di Swift biasanya menggunakan keyword "override").'
  },
  {
    id: 'p4',
    category: 'Programming',
    subCategory: 'String Manipulation',
    question: 'Berapakah jumlah karakter (*count*) dari string hasil operasi berikut?',
    codeSnippet: `let part1 = "Apple"
let part2 = "Academy"
let combined = part1 + " " + part2
//Berapakah combined.count?`,
    options: ['12', '13', '11', '14'],
    correctAnswerIndex: 1,
    explanation: '"Apple" (5 karakter) + " " (1 spasi) + "Academy" (7 karakter) = 5 + 1 + 7 = 13 karakter.'
  },
  {
    id: 'p5',
    category: 'Programming',
    subCategory: 'Boolean Logic',
    question: 'Berapakah nilai akhir dari variabel "isValid"?',
    codeSnippet: `let a = true
let b = false
let c = true
let isValid = (a && b) || (c && !b)`,
    options: ['true', 'false', 'nil', 'error'],
    correctAnswerIndex: 0,
    explanation: '(a && b) -> (true && false) = false.\n(c && !b) -> (true && true) = true.\nfalse || true = true. Maka isValid berharga true.'
  },
  {
    id: 'p6',
    category: 'Programming',
    subCategory: 'Tech Terminology',
    question: 'Manakah dari komponen berikut yang paling bertanggung jawab untuk mengatur tata letak, warna, bentuk tombol, dan pengalaman visual interaktif pengguna di dalam aplikasi?',
    options: ['Database Layer', 'Backend Engine', 'UI/UX Design System', 'API Gateway'],
    correctAnswerIndex: 2,
    explanation: 'UI/UX Design System (serta Frontend) fokus penuh pada elemen visual, interaksi, dan kenyamanan mata serta navigasi pengguna.'
  },
  {
    id: 'p7',
    category: 'Programming',
    subCategory: 'While Loops',
    question: 'Berapa kali isi dari perulangan (while loop) ini akan dieksekusi?',
    codeSnippet: `var counter = 10
while counter > 2 {
    counter -= 3
}`,
    options: ['2 kali', '3 kali', '4 kali', 'Infinite loop'],
    correctAnswerIndex: 1,
    explanation: 'Iterasi 1: counter=10 (>2), diubah menjadi 10-3 = 7.\nIterasi 2: counter=7 (>2), diubah menjadi 7-3 = 4.\nIterasi 3: counter=4 (>2), diubah menjadi 4-3 = 1.\nSaat cek kondisi berikutnya, 1 > 2 salah (false), perulangan berhenti. Loop berjalan tepat 3 kali.'
  }
];