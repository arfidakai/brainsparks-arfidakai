export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  category: 'JavaScript' | 'Logic' | 'Apple Tech';
}

export const mockFlashcards: Flashcard[] = [
  {
    id: '1',
    category: 'JavaScript',
    question: 'Apa perbedaan utama antara "const", "let", dan "var" dalam JavaScript?',
    answer: '"const" untuk variabel yang nilainya tetap (block-scoped). "let" untuk variabel yang nilainya bisa diubah (block-scoped). "var" adalah cara lama (function-scoped) yang rentan terkena hoisting dan bug.'
  },
  {
    id: '2',
    category: 'Logic',
    question: 'Bagaimana cara kerja algoritma "Spaced Repetition" secara sederhana dalam proses belajar?',
    answer: 'Algoritma ini menjadwalkan pengulangan informasi berdasarkan tingkat ingatan. Informasi yang sulit akan diulang lebih sering dalam waktu dekat, sedangkan informasi yang mudah akan diulang dengan jarak waktu yang lebih lama.'
  },
  {
    id: '3',
    category: 'Apple Tech',
    question: 'Apa yang dimaksud dengan konsep "Human Interface Guidelines (HIG)" milik Apple?',
    answer: 'HIG adalah panduan desain software yang dibuat oleh Apple untuk membantu developer merancang aplikasi yang memiliki keindahan visual, konsistensi tinggi, dan pengalaman pengguna (UX) yang luar biasa.'
  },
  {
    id: '4',
    category: 'JavaScript',
    question: 'Apa arti dari istilah "Asynchronous" dalam pemrograman JavaScript?',
    answer: 'Asynchronous memungkinkan program untuk mengeksekusi proses yang memakan waktu (seperti mengambil data dari internet) di latar belakang tanpa menghentikan atau membekukan jalannya baris kode yang lain.'
  }
];