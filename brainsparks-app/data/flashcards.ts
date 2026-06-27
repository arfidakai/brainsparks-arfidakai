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
    id: 'l3',
    category: 'Logic',
    subCategory: 'Abstract Visual Pattern',
    question: 'Look at the rotation pattern of this symbol: [↑] → [→] → [↓] → [←] → ? . What shape comes next?',
    options: ['[→]', '[←]', '[↑]', '[↓]'],
    correctAnswerIndex: 2,
    explanation: 'The arrow rotates 90 degrees clockwise at each step. After pointing left [←], the next rotation will point back up [↑].'
  },
  {
    id: 'l4',
    category: 'Logic',
    subCategory: 'Alternating Number Series',
    question: 'What is the next number in this sequence: 1, 3, 3, 9, 5, 27, 7, ?',
    options: ['9', '35', '54', '81'],
    correctAnswerIndex: 3,
    explanation: 'This sequence consists of two alternating series. Odd positions (1st, 3rd, 5th, 7th): 1, 3, 5, 7 (always +2). Even positions (2nd, 4th, 6th, 8th): 3, 9, 27, ? (always multiplied by 3). Therefore, 27 x 3 = 81.'
  },
  {
    id: 'l5',
    category: 'Logic',
    subCategory: 'Simple Probability',
    question: 'A box contains 4 red balls and 6 blue balls. If 2 balls are drawn at random one after another without replacement, what is the probability of drawing a red ball first and a blue ball second?',
    options: ['4/15', '6/25', '2/5', '4/25'],
    correctAnswerIndex: 0,
    explanation: 'Probability of red first = 4/10. Since it is without replacement, 9 balls remain (4 red, 5 blue). Probability of blue second = 6/9. Total probability = (4/10) * (6/9) = 24/90 = 4/15.'
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
  {
    id: 'l7',
    category: 'Logic',
    subCategory: 'Simple Cryptography',
    question: 'If the word "SWIFT" is encoded as "UXKHV" (shifting letters forward), then the word "CODE" will be encoded as...',
    options: ['EQFG', 'ERGH', 'ERFG', 'FREG'],
    correctAnswerIndex: 0,
    explanation: 'The pattern shifts each letter forward by 2 positions in the alphabet (S->U, W->X, etc.). Applying the same pattern to CODE: C->E, O->Q, D->F, E->G. The result is EQFG.'
  },
  {
    id: 'l8',
    category: 'Logic',
    subCategory: 'Visual Matrix',
    question: 'Row 1: 🔴 🔵 🟢 | Row 2: 🔵 🟢 🔴 | Row 3: 🟢 🔴 ? . Which element is missing?',
    options: ['🟢', '🔴', '🔵', '🟡'],
    correctAnswerIndex: 2,
    explanation: 'Each row and column must contain exactly one of each color (Red, Blue, Green). The third row is missing Blue (🔵).'
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
  {
    id: 'p4',
    category: 'Programming',
    subCategory: 'String Manipulation',
    question: 'What is the character count of the combined string output?',
    codeSnippet: `let part1 = "Apple"
let part2 = "Academy"
let combined = part1 + " " + part2
// What is combined.count?`,
    options: ['12', '13', '11', '14'],
    correctAnswerIndex: 1,
    explanation: '"Apple" (5 chars) + " " (1 white space) + "Academy" (7 chars) = 5 + 1 + 7 = 13 characters.'
  },
  {
    id: 'p5',
    category: 'Programming',
    subCategory: 'Boolean Logic',
    question: 'What is the final truth value of the variable "isValid"?',
    codeSnippet: `let a = true
let b = false
let c = true
let isValid = (a && b) || (c && !b)`,
    options: ['true', 'false', 'nil', 'error'],
    correctAnswerIndex: 0,
    explanation: '(a && b) -> (true && false) = false. (c && !b) -> (true && true) = true. false || true = true. Therefore, isValid is true.'
  },
  {
    id: 'p6',
    category: 'Programming',
    subCategory: 'Tech Terminology',
    question: 'Which of the following components is primarily responsible for managing layout, colors, button shapes, and the overall interactive visual experience for users?',
    options: ['Database Layer', 'Backend Engine', 'UI/UX Design System', 'API Gateway'],
    correctAnswerIndex: 2,
    explanation: 'The UI/UX Design System (and Frontend development) focuses entirely on visual layouts, styling, user interactions, and clean navigation flows.'
  },
  {
    id: 'p7',
    category: 'Programming',
    subCategory: 'While Loops',
    question: 'How many times will the body of this while loop execute?',
    codeSnippet: `var counter = 10
while counter > 2 {
    counter -= 3
}`,
    options: ['2 times', '3 times', '4 times', 'Infinite loop'],
    correctAnswerIndex: 1,
    explanation: 'Iteration 1: counter=10 (>2) -> becomes 10-3 = 7. Iteration 2: counter=7 (>2) -> becomes 7-3 = 4. Iteration 3: counter=4 (>2) -> becomes 4-3 = 1. Next check: 1 > 2 is false, loop terminates. It executed exactly 3 times.'
  }
];
