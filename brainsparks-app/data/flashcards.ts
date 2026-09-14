export interface QuizQuestion {
  id: string;
  category: 'Logic' | 'Programming';
  subCategory: string;
  question: string;
  codeSnippet?: string;
  isVisual?: boolean; 
  visualLayout?: string[];
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export const mockQuizQuestions: QuizQuestion[] = [
  {
    id: 'v1',
    category: 'Logic',
    subCategory: 'Visual Matrix 3x3',
    question: 'Analyze the 3x3 visual matrix below. Which option logically replaces the question mark [ ? ] to complete the pattern?',
    isVisual: true,
    visualLayout: [
      '⬛ ⬛ 🟩',
      '⬛ 🟩 ⬛',
      '🟩 ⬛ ?'
    ],
    options: ['🟩 (Green Square)', '⬛ (Black Square)', '🔺 (Red Triangle)', '🔵 (Blue Circle)'],
    correctAnswerIndex: 1,
    explanation: 'The green square (🟩) moves diagonally from top-right to bottom-left. Row 1: 3rd column. Row 2: 2nd column. Row 3: 1st column. Therefore, the missing slot at the bottom-right (3rd column) must be a plain black square (⬛).'
  },
  {
    id: 'v2',
    category: 'Logic',
    subCategory: 'Spatial Overlay Pattern',
    question: 'If Shape A combines with Shape B using an overlap rule (overlapping elements cancel each other out / become empty), determine the final resulting shape:',
    isVisual: true,
    visualLayout: [
      'Shape A: [ 🔵 ➕ 🔺 ]',
      'Shape B: [ 🟡 ➕ 🔺 ]',
      'Result : [ ? ]'
    ],
    options: ['🔵 🟡 🔺', '🔵 🟡', '🔺 🔺', '➕ ➕'],
    correctAnswerIndex: 1,
    explanation: 'Following the overlap cancellation rule, the elements present in BOTH shapes (🔺 and ➕) cancel each other out and disappear. The unique elements (🔵 from Shape A and 🟡 from Shape B) remain. Thus, the result is 🔵 🟡.'
  },
  {
    id: 'v3',
    category: 'Logic',
    subCategory: 'Abstract Sequence',
    question: 'Observe the progressive growth of the geometric structure below. What comes next in the 4th sequence?',
    isVisual: true,
    visualLayout: [
      '1st: 🟢',
      '2nd: 🟢 📦 🟢',
      '3rd: 🟢 📦 🟢 📦 🟢',
      '4th: ?'
    ],
    options: [
      '🟢 📦 🟢 📦 🟢',
      '📦 📦 📦 📦 📦',
      '🟢 📦 🟢 📦 🟢 📦 🟢',
      '🟢 🟢 🟢 🟢 📦'
    ],
    correctAnswerIndex: 2,
    explanation: 'The pattern alternates by adding a box (📦) followed by a circle (🟢) at each step. Sequence 1 has 1 item, Seq 2 has 3 items, Seq 3 has 5 items. The 4th sequence must append another box and circle, resulting in 7 alternating items: 🟢 📦 🟢 📦 🟢 📦 🟢.'
  },

  // --- STANDARD LOGIC & REASONING ---
  {
    id: 'l1',
    category: 'Logic',
    subCategory: 'Number Series',
    question: 'Determine the next number in the following sequence: 2, 4, 8, 14, 22, ?',
    options: ['30', '32', '34', '36'],
    correctAnswerIndex: 1,
    explanation: 'The pattern increases by consecutive even numbers: +2, +4, +6, +8, +10. Therefore, 22 + 10 = 32.'
  },
  {
    id: 'l2',
    category: 'Logic',
    subCategory: 'Logical Puzzle',
    question: 'Andy, Budi, Cici, and Dedi are sitting next to each other on a long bench. Cici refuses to sit next to Andy or Dedi. If Budi sits on the far left, who is sitting next to Cici?',
    options: ['Andy', 'Budi', 'Dedi', 'Nobody'],
    correctAnswerIndex: 1,
    explanation: 'The seating order from left to right that satisfies the condition is: Budi, Cici, Andy, Dedi. Therefore, Budi is definitely sitting right next to Cici.'
  },
  {
    id: 'l4',
    category: 'Logic',
    subCategory: 'Alternating Number Series',
    question: 'What is the next number in this sequence: 1, 3, 3, 9, 5, 27, 7, ?',
    options: ['9', '35', '54', '81'],
    correctAnswerIndex: 3,
    explanation: 'This sequence consists of two alternating series. Odd positions: 1, 3, 5, 7 (+2). Even positions: 3, 9, 27, ? (x3). Therefore, 27 x 3 = 81.'
  },
  {
    id: 'l6',
    category: 'Logic',
    subCategory: 'Syllogism',
    question: 'All broken widgets are unusable. Some devices in the Apple Developer Academy lab are broken widgets. Which conclusion is valid?',
    options: [
      'All devices in the lab are unusable.',
      'Some devices in the lab are unusable.',
      'Some devices in the lab can still be repaired.',
      'All widgets in the lab are definitely broken.'
    ],
    correctAnswerIndex: 1,
    explanation: 'Since some devices in the lab belong to the group of "broken widgets", and all broken widgets are "unusable", those specific devices are automatically unusable.'
  },

  // --- PROGRAMMING & TECH CONCEPTS ---
  {
    id: 'p1',
    category: 'Programming',
    subCategory: 'Conditionals & Loops',
    question: 'What is the final value of "total" in the following pseudocode?',
    codeSnippet: `var total = 0
for i in 1...5 {
    if i == 3 {
        continue
    }
    total += i
}
// What is the value of total?`,
    options: ['15', '12', '10', '9'],
    correctAnswerIndex: 1,
    explanation: 'The loop runs from 1 to 5. When i = 3, the "continue" statement is triggered, skipping "total += i". Total execution: 1 + 2 + 4 + 5 = 12.'
  },
  {
    id: 'p2',
    category: 'Programming',
    subCategory: 'Array & Indexing',
    question: 'Given an array named "colors", what is the output of the last line of code?',
    codeSnippet: `var colors = ["Red", "Green", "Blue"]
colors.append("Yellow")
colors.remove(at: 1)
print(colors[1])`,
    options: ['Red', 'Green', 'Blue', 'Yellow'],
    correctAnswerIndex: 2,
    explanation: 'Initial: ["Red", "Green", "Blue"] -> Append: ["Red", "Green", "Blue", "Yellow"] -> Remove index 1 ("Green"): ["Red", "Blue", "Yellow"]. Now index 1 is occupied by "Blue".'
  },
  {
    id: 'p3',
    category: 'Programming',
    subCategory: 'OOP Concepts',
    question: 'When a subclass redefines a method already existing in its superclass with the exact same name and parameters, this concept is known as...',
    options: ['Overloading', 'Overriding', 'Encapsulation', 'Abstraction'],
    correctAnswerIndex: 1,
    explanation: 'Replacing or rewriting a method belonging to a superclass inside a subclass is known as Method Overriding (declared with the "override" keyword in Swift).'
  },
  // --- ADDITIONAL LOGIC & REASONING ---
  // --- ADDITIONAL LOGIC & REASONING ---
    // --- ADDITIONAL LOGIC & REASONING ---
  // --- ADDITIONAL LOGIC & REASONING ---
      // --- ADDITIONAL LOGIC & REASONING ---
      // --- ADDITIONAL LOGIC & REASONING ---
      // --- ADDITIONAL LOGIC & REASONING ---
        // --- ADDITIONAL LOGIC & REASONING ---
  {
    id: 'l7',
    category: 'Logic',
    subCategory: 'Deductive Reasoning',
    question: 'If "All cats have tails" is true, and "Some creatures with tails are not cats" is true, which of the following is logically guaranteed?',
    options: [
      'No non-cats have tails.',
      'Some creatures are not cats.',
      'All creatures with tails are cats.',
      'All cats are creatures.'
    ],
    correctAnswerIndex: 1,
    explanation: 'The premise "Some creatures with tails are not cats" explicitly confirms the existence of creatures that are not cats, thus satisfying the option.'
  },
  {
    id: 'l8',
    category: 'Logic',
    subCategory: 'Sequence Pattern',
    question: 'What comes next in this sequence: 1, 1, 2, 3, 5, 8, 13, ?',
    options: ['15', '20', '21', '24'],
    correctAnswerIndex: 2,
    explanation: 'This is the Fibonacci sequence, where each number is the sum of the two preceding ones. 8 + 13 = 21.'
  },
 {
    id: 'p4',
    category: 'Programming',
    subCategory: 'Bitwise Operators',
    question: 'What is the decimal result of the bitwise operation (5 << 1)?',
    codeSnippet: `// 5 in binary is 0101
// Applying a left shift by 1 position (<< 1)
print(5 << 1)`,
    options: ['5', '8', '10', '12'],
    correctAnswerIndex: 2,
    explanation: 'Left shifting 0101 by 1 position results in 1010, which is 10 in decimal (equivalent to multiplying by 2^1).'
  },
  {
    id: 'p5',
    category: 'Programming',
    subCategory: 'Asynchronous Programming',
    question: 'In modern Swift concurrency, what does the "await" keyword effectively do?',
    options: [
      'It stops the entire application until the task finishes.',
      'It suspends the current function, allowing the thread to do other work until the awaited task completes.',
      'It forces the code to run on a background thread automatically.',
      'It ignores any errors that might occur during the function call.'
    ],
    correctAnswerIndex: 1,
    explanation: 'The "await" keyword indicates a suspension point where the function yields control back to the system, allowing the thread to remain productive while waiting for the asynchronous operation.'
  },
  {
    id: 'p6',
    category: 'Programming',
    subCategory: 'Data Structures',
    question: 'Which of the following is a characteristic of a "Stack" data structure?',
    options: [
      'FIFO (First In, First Out)',
      'LIFO (Last In, First Out)',
      'Random access to all elements at O(1) time',
      'It does not allow duplicate values'
    ],
    correctAnswerIndex: 1,
    explanation: 'A stack follows the LIFO (Last In, First Out) principle, where the last element added is the first one to be removed.'
  },

  // --- CRYPTARITHM ---
  // --- CRYPTARITHM ---
 
  {
    id: 'l9',
    category: 'Logic',
    subCategory: 'Cryptarithm',
    question: 'In the classic cryptarithm SEND + MORE = MONEY, each letter represents a unique digit (0-9). What must the value of M be?',
    options: ['0', '1', '9', 'Cannot be determined'],
    correctAnswerIndex: 1,
    explanation: 'SEND and MORE are both 4-digit numbers, so their sum can be at most 19998. Since MONEY is a 5-digit number, the leading digit M of the result must be the carried-over 1 — so M = 1.'
  },
  {
    id: 'l10',
    category: 'Logic',
    subCategory: 'Cryptarithm',
    question: 'If TWO + TWO = FOUR (each letter is a unique digit, and no leading letter is zero), what is the parity (odd/even) of the digit R?',
    options: ['R must be even', 'R must be odd', 'R can be either', 'No valid solution exists'],
    correctAnswerIndex: 0,
    explanation: 'In the units column, O + O = R (plus a possible carry of 10 which does not change parity of the last digit). Since O + O is always even, R must be even.'
  },

  // --- NUMBER SERIES ---
  {
    id: 'l11',
    category: 'Logic',
    subCategory: 'Number Series',
    question: 'Determine the next number in the sequence: 2, 6, 12, 20, 30, ?',
    options: ['36', '40', '42', '44'],
    correctAnswerIndex: 2,
    explanation: 'The differences between terms increase by 2 each time: +4, +6, +8, +10, +12. Each term equals n(n+1), so the next term is 6x7 = 42.'
  },

  // --- SEATING ARRANGEMENT ---
  {
    id: 'l12',
    category: 'Logic',
    subCategory: 'Seating Arrangement',
    question: 'A, B, C, and D sit around a circular table. A does not sit next to B. C sits next to D. If B sits next to D, who sits next to A?',
    options: ['B', 'C', 'D', 'Nobody, A sits alone'],
    correctAnswerIndex: 1,
    explanation: 'Since C must sit next to D, and B must also sit next to D, the order around the table is B-D-C (or C-D-B). That leaves only one remaining seat for A, which is next to C.'
  },

  // --- SILOGISME (VERBAL REASONING) ---
  {
    id: 'l13',
    category: 'Logic',
    subCategory: 'Syllogism',
    question: 'All developers like logic. Some people who like logic also like design. Is it necessarily true that "some developers like design"?',
    options: [
      'Yes, it is necessarily true.',
      'No, the conclusion does not necessarily follow.',
      'Only true if all designers are developers.',
      'Only true if no developers like design.'
    ],
    correctAnswerIndex: 1,
    explanation: 'The "some people who like logic also like design" group is not guaranteed to overlap with the "developers" subset of logic-lovers — the people who like both logic and design could all be non-developers. The conclusion is a classic invalid syllogism trap.'
  }

];