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
    title: 'Programming',
    emoji: '💻',
    description: 'Starting from code flow and program logic, to data structures and OOP.',
    subtopics: [
      {
        id: 'pemrograman-dasar',
        title: 'Basic Programming',
        description: 'Learn how to read code, variables, operators, and basic flows before diving into more complex problems.',
        materials: [
          {
            id: 'programming-variables',
            title: 'Variables & Data Types',
            summary: 'Learn how to store values, identify data types, and track variable changes from one line to the next.',
            keyPoints: [
              'Pay attention to the initial value before the variable is modified.',
              'Check if the value is incremented, decremented, or completely replaced.',
              'Distinguish between strings, numbers, and booleans when reading the problem.'
            ],
            quickTip: 'If you are confused, rewrite the variable values step-by-step in a small table.',
            example: 'x = 2 then x = x + 3 means the final value of x is 5.'
          },
          {
            id: 'programming-operators',
            title: 'Basic Operators',
            summary: 'Understand arithmetic, comparison, and logical operators so you do not mix up condition evaluations.',
            keyPoints: [
              'Comparison operators evaluate to true or false.',
              'Operator precedence affects the final result.',
              'Combinations of AND and OR are often used as trick questions.'
            ],
            quickTip: 'Evaluate the expressions inside parentheses first, then proceed to the other operators.',
            example: 'If (3 + 2 > 4) and (5 == 5), then the final result is true.'
          }
        ]
      },
      {
        id: 'pemrograman-alur',
        title: 'Program Flow',
        description: 'Focus on branching, loops, and the debugging process when reading code snippets.',
        materials: [
          {
            id: 'programming-loops',
            title: 'Loops & Conditionals',
            summary: 'Understand loop flows, conditions, and skip logic in code to avoid mistakes when reading problems.',
            keyPoints: [
              'Note the top-to-bottom execution order.',
              'Identify when a loop stops and when a skip (continue) condition is triggered.',
              'Calculate intermediate values step-by-step to avoid errors.'
            ],
            quickTip: 'Try writing down variable values at each iteration to make them easier to predict.',
            example: 'In a loop from 1..5, if there is a continue when i = 3, the skipped value is not counted.'
          },
          {
            id: 'programming-debugging',
            title: 'Basic Debugging',
            summary: 'Learn how to find the source of errors from outputs, faulty logic, and incorrect process orders.',
            keyPoints: [
              'Check the line closest to the error first.',
              'Compare the expected result with the actual result.',
              'Look for small changes that are most likely to trigger a bug.'
            ],
            quickTip: 'If the code feels off, reread the input, process, and output separately.',
            example: 'If a program always enters the else branch, it means the if condition is never met.'
          }
        ]
      },
      {
        id: 'pemrograman-structure',
        title: 'Program Structure',
        description: 'Dive into the concepts of classes, functions, and how to structure code to make it cleaner and more readable.',
        materials: [
          {
            id: 'programming-oop',
            title: 'OOP Basics',
            summary: 'Learn the concepts of classes, methods, inheritance, overriding, and encapsulation to smoothly tackle technical questions.',
            keyPoints: [
              'A class is a blueprint; an object is a real instance.',
              'Overriding means changing the behavior of a method from the parent class.',
              'Encapsulation keeps data safe and organized.'
            ],
            quickTip: 'If a question asks for the difference between override and overload, focus on the method name and parameters.',
            example: 'A subclass rewriting a method from its superclass is called overriding.'
          },
          {
            id: 'programming-functions',
            title: 'Functions & Modularity',
            summary: 'Understand how to break down large problems into small functions that are easier to test and reuse.',
            keyPoints: [
              'A function should ideally have one main task.',
              'Parameters make functions more flexible.',
              'Return values are used to send results out of a function.'
            ],
            quickTip: 'If a block of code is used more than once, turn it into a function.',
            example: 'the calculateArea(length, width) function returns length x width.'
          }
        ]
      }
    ]
  },
  {
    id: 'logika',
    title: 'Logic',
    emoji: '🧠',
    description: 'Practice patterns, deduction, and step-by-step reasoning for questions that require concentration.',
    subtopics: [
      {
        id: 'logika-pola',
        title: 'Patterns & Sequences',
        description: 'Perfect for number, shape, and hidden sequence problems.',
        materials: [
          {
            id: 'logic-patterns',
            title: 'Pattern Recognition',
            summary: 'Learn how to recognize visual, numerical, and logical sequence patterns to quickly find the missing answer.',
            keyPoints: [
              'Notice consistent changes at each step.',
              'Try to identify if the pattern moves, increases, or changes rules.',
              'Do not get fixated on a single detail; look at the overall shape of the pattern.'
            ],
            quickTip: 'If you find a complex pattern, break it down into 3 parts: position, color, and sequence.',
            example: 'Example: 2, 4, 8, 14, 22, ... -> ascending pattern +2, +4, +6, +8, so the answer is 32.'
          },
          {
            id: 'logic-sequences',
            title: 'Sequence Reasoning',
            summary: 'Use patterns of addition, subtraction, multiplication, or combinations to guess the next element.',
            keyPoints: [
              'Separate major changes from minor changes first.',
              'See if there is an alternating pattern.',
              'Compare two or three steps at once.'
            ],
            quickTip: 'Write down the differences between numbers to make the pattern easier to spot.',
            example: '1, 3, 6, 10, 15 is a series with increasing differences of 2, 3, 4, 5.'
          }
        ]
      },
      {
        id: 'logika-deduksi',
        title: 'Deduction & Reasoning',
        description: 'Practice systematically arranging facts, constraints, and logical conclusions.',
        materials: [
          {
            id: 'logic-seating',
            title: 'Seating & Deduction',
            summary: 'Use strict rules to organize seating arrangements, relationships, and logical conclusions.',
            keyPoints: [
              'Write down all constraints briefly before answering.',
              'Find definite elements and eliminate contradictory options.',
              'If two rules reinforce each other, use them together.'
            ],
            quickTip: 'It is usually faster to draw simple lines for each statement.',
            example: 'Budi sits on the left, Cici does not want to be near Andy or Dedi, so the correct arrangement can be seen immediately.'
          },
          {
            id: 'logic-syllogism',
            title: 'Syllogism & Conclusion',
            summary: 'Learn to draw conclusions from general and specific premises without jumping to false assumptions.',
            keyPoints: [
              'A true premise does not guarantee all conclusions are true.',
              'Look for definite relationships, not just probable ones.',
              'Do not add information that is not in the question.'
            ],
            quickTip: 'Ask first: is the conclusion certain, possible, or completely wrong?',
            example: 'If all A are B, and C is A, then C is also included in B.'
          }
        ]
      },
      {
        id: 'logika-strategi',
        title: 'Quick Strategies',
        description: 'Fast techniques for when time is limited and questions feel long.',
        materials: [
          {
            id: 'logic-elimination',
            title: 'Elimination Strategy',
            summary: 'Use elimination to cross out obviously wrong options and narrow down the answers.',
            keyPoints: [
              'Look for answers that conflict with just a single rule.',
              'Elimination is faster than proving all options are correct.',
              'Prioritize the most specific clues.'
            ],
            quickTip: 'When time is tight, cross out the wrong ones first, then choose from the remaining options.',
            example: 'If three options violate the sequence rules, only one option remains.'
          }
        ]
      }
    ]
  },
  {
    id: 'matematika',
    title: 'Basic Math',
    emoji: '📐',
    description: 'Additional materials to strengthen quick calculations, fractions, and ratios.',
    subtopics: [
      {
        id: 'matematika-aritmetika',
        title: 'Arithmetic',
        description: 'Basics of quick calculations that often appear in mixed problems.',
        materials: [
          {
            id: 'math-fractions',
            title: 'Fractions & Ratios',
            summary: 'Understand fractions, ratios, and proportions to make quick calculations more accurate.',
            keyPoints: [
              'Equalize the denominators first when comparing fractions.',
              'Comparisons can be converted into simple ratios.',
              'Reduce unnecessary calculation steps.'
            ],
            quickTip: 'If there are fractions, convert them into the easiest form to compare.',
            example: '1/2 is greater than 2/5 because 0.5 > 0.4.'
          },
          {
            id: 'math-percentages',
            title: 'Quick Percentages',
            summary: 'Calculate discounts, increases, and value changes quickly and consistently.',
            keyPoints: [
              '10% means shifting the decimal point one step.',
              'Find the percentage from the base value, not the altered result.',
              'Use the 50%, 25%, and 10% approach if needed.'
            ],
            quickTip: 'Break down large percentages into smaller, easily calculable parts.',
            example: '20% of 150 is 30.'
          }
        ]
      },
      {
        id: 'matematika-pola',
        title: 'Number Patterns',
        description: 'Strengthen your intuition in finding rules from repeating or gradually increasing numbers.',
        materials: [
          {
            id: 'math-number-patterns',
            title: 'Number Patterns',
            summary: 'Read arithmetic, geometric, and mixed patterns to guess the next term.',
            keyPoints: [
              'Check the difference between terms first.',
              'See if the differences also form a pattern.',
              'Look for a multiplier clue if the addition is inconsistent.'
            ],
            quickTip: 'Create two rows: the original numbers and their differences.',
            example: '3, 6, 12, 24 is a pattern multiplied by 2 at each step.'
          }
        ]
      }
    ]
  }
];