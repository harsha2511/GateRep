
export interface Question {
  id: number;
  question: string;
  options?: string[];
  correctAnswer: string | string[];
  type: 'single' | 'multiple' | 'numerical';
  section: 'general' | 'subjects';
  image?: string; // Optional image URL
}

export const questionsData: Question[] = [
  // General Aptitude Questions (1-10)
  {
    id: 1,
    question: "Ravi had ______ younger brother who taught at ______ university. He was widely regarded as ______ honorable man. Select the option with the correct sequence of articles to fill in the blanks.",
    options: [
      "a; a; an",
      "the; an; a", 
      "a; an; a",
      "an; an; a"
    ],
    correctAnswer: "a; a; an",
    type: 'single',
    section: 'general'
  },
  {
    id: 2,
    question: "The CEO's decision to downsize the workforce was considered 'myopic' because it sacrificed long-term stability to accommodate short-term gains. Select the most appropriate option that can replace the word 'myopic' without changing the meaning of the sentence.",
    options: [
      "visionary",
      "Shortsighted",
      "Progressive", 
      "innovative"
    ],
    correctAnswer: "Shortsighted",
    type: 'single',
    section: 'general'
  },
  {
    id: 3,
    question: "The average marks obtained by a class in an examination were calculated as 30.8. However, while checking the marks entered, the teacher found that the marks of one student were entered incorrectly as 24 instead of 42. After correcting the marks, the average becomes 31.4. How many students does the class have?",
    options: [
      "25",
      "28",
      "30",
      "32"
    ],
    correctAnswer: "30",
    type: 'single',
    section: 'general'
  },
  {
    id: 4,
    question: "The average marks obtained by a class in an examination were calculated as 30.8. However, while checking the marks entered, the teacher found that the marks of one student were entered incorrectly as 24 instead of 42. After correcting the marks, the average becomes 31.4. How many students does the class have?",
    options: [
      "Both (1) and (2) are true.",
      "Both (1) and (3) are true.", 
      "Only (3) is true.",
      "Only (4) is true."
    ],
    correctAnswer: "Both (1) and (2) are true.",
    type: 'single',
    section: 'general'
  },
  {
    id: 5,
    question: "According to the map shown in the figure, which one of the following statements is correct?\nNote: The figure shown is representative.",
    options: [
      "The library is located to the northwest of the canteen.",
      "The hospital is located to the east of the chemistry lab.",
      "The chemistry lab is to the southeast of the physics lab.",
      "The classrooms and canteen are next to each other."
    ],
    correctAnswer: "The classrooms and canteen are next to each other.",
    type: 'single',
    section: 'general',
    image: "/placeholder-map-image.png" // Placeholder for map image
  },
  {
    id: 6,
    question: "Consider the following + tree with 5 nodes, in which a node can store at most 3 key + tree. Which of the following options(s) values. The value 23 is now inserted in the is/are CORRECT?",
    options: [
      "None of the nodes will split.",
      "At least one node will split and redistribute.",
      "The total number of nodes will remain same.",
      "The height of the tree will increase"
    ],
    correctAnswer: ["At least one node will split and redistribute.", "The height of the tree will increase"],
    type: 'multiple',
    section: 'general',
    image: "/placeholder-tree-image.png" // Placeholder for tree diagram
  },
  {
    id: 7,
    question: "Suppose in a multiprogramming environment, the following C program segment is executed. A process goes into I/O queue whenever an I/O related operation is performed. Assume that there will always be a context switch whenever a process requests for an I/O, and also whenever the process returns from an I/O. The number of times the process will enter the ready queue during its lifetime (not counting the time the process enters the ready queue when it is run initially) is _______. (Answer in integer)\n\nint main()\n{\n    int x=0,i=0;\n    scanf(\"%d\",&x);\n    for(i=0; i<20; i++)\n    {\n        x = x+20;\n        printf(\"%d\\n\",x);\n    }\n    return 0;\n}",
    correctAnswer: "21",
    type: 'numerical',
    section: 'general'
  },
  {
    id: 8,
    question: "The average marks obtained by a class in an examination were calculated as 30.8. However, while checking the marks entered, the teacher found that the marks of one student were entered incorrectly as 24 instead of 42. After correcting the marks, the average becomes 31.4. How many students does the class have?",
    options: [
      "25",
      "28", 
      "30",
      "32"
    ],
    correctAnswer: "30",
    type: 'single',
    section: 'general'
  },
  {
    id: 9,
    question: "The average marks obtained by a class in an examination were calculated as 30.8. However, while checking the marks entered, the teacher found that the marks of one student were entered incorrectly as 24 instead of 42. After correcting the marks, the average becomes 31.4. How many students does the class have?",
    options: [
      "Both (1) and (2) are true.",
      "Both (1) and (3) are true.",
      "Only (3) is true.", 
      "Only (4) is true."
    ],
    correctAnswer: "Both (1) and (2) are true.",
    type: 'single',
    section: 'general'
  },
  {
    id: 10,
    question: "The average marks obtained by a class in an examination were calculated as 30.8. However, while checking the marks entered, the teacher found that the marks of one student were entered incorrectly as 24 instead of 42. After correcting the marks, the average becomes 31.4. How many students does the class have?",
    options: [
      "25",
      "28",
      "30", 
      "32"
    ],
    correctAnswer: "30",
    type: 'single',
    section: 'general'
  },

  // Candidate's Subject Questions (11-20)
  {
    id: 11,
    question: "Ravi had ______ younger brother who taught at ______ university. He was widely regarded as ______ honorable man. Select the option with the correct sequence of articles to fill in the blanks.",
    options: [
      "a; a; an",
      "the; an; a",
      "a; an; a", 
      "an; an; a"
    ],
    correctAnswer: "a; a; an",
    type: 'single',
    section: 'subjects'
  },
  {
    id: 12,
    question: "The CEO's decision to downsize the workforce was considered 'myopic' because it sacrificed long-term stability to accommodate short-term gains. Select the most appropriate option that can replace the word 'myopic' without changing the meaning of the sentence.",
    options: [
      "visionary",
      "Shortsighted", 
      "Progressive",
      "innovative"
    ],
    correctAnswer: "Shortsighted",
    type: 'single',
    section: 'subjects'
  },
  {
    id: 13,
    question: "The average marks obtained by a class in an examination were calculated as 30.8. However, while checking the marks entered, the teacher found that the marks of one student were entered incorrectly as 24 instead of 42. After correcting the marks, the average becomes 31.4. How many students does the class have?",
    options: [
      "25",
      "28",
      "30",
      "32"
    ],
    correctAnswer: "30",
    type: 'single',
    section: 'subjects'
  },
  {
    id: 14,
    question: "The average marks obtained by a class in an examination were calculated as 30.8. However, while checking the marks entered, the teacher found that the marks of one student were entered incorrectly as 24 instead of 42. After correcting the marks, the average becomes 31.4. How many students does the class have?",
    options: [
      "Both (1) and (2) are true.",
      "Both (1) and (3) are true.",
      "Only (3) is true.",
      "Only (4) is true."
    ],
    correctAnswer: "Both (1) and (2) are true.",
    type: 'single',
    section: 'subjects'
  },
  {
    id: 15,
    question: "According to the map shown in the figure, which one of the following statements is correct?\nNote: The figure shown is representative.",
    options: [
      "The library is located to the northwest of the canteen.",
      "The hospital is located to the east of the chemistry lab.",
      "The chemistry lab is to the southeast of the physics lab.",
      "The classrooms and canteen are next to each other."
    ],
    correctAnswer: "The classrooms and canteen are next to each other.",
    type: 'single',
    section: 'subjects',
    image: "/placeholder-map-image-2.png" // Placeholder for map image
  },
  {
    id: 16,
    question: "Consider the following + tree with 5 nodes, in which a node can store at most 3 key + tree. Which of the following options(s) values. The value 23 is now inserted in the is/are CORRECT?",
    options: [
      "None of the nodes will split.",
      "At least one node will split and redistribute.",
      "The total number of nodes will remain same.",
      "The height of the tree will increase"
    ],
    correctAnswer: ["At least one node will split and redistribute.", "The height of the tree will increase"],
    type: 'multiple',
    section: 'subjects',
    image: "/placeholder-tree-image-2.png" // Placeholder for tree diagram
  },
  {
    id: 17,
    question: "Suppose in a multiprogramming environment, the following C program segment is executed. A process goes into I/O queue whenever an I/O related operation is performed. Assume that there will always be a context switch whenever a process requests for an I/O, and also whenever the process returns from an I/O. The number of times the process will enter the ready queue during its lifetime (not counting the time the process enters the ready queue when it is run initially) is _______. (Answer in integer)\n\nint main()\n{\n    int x=0,i=0;\n    scanf(\"%d\",&x);\n    for(i=0; i<20; i++)\n    {\n        x = x+20;\n        printf(\"%d\\n\",x);\n    }\n    return 0;\n}",
    correctAnswer: "21",
    type: 'numerical',
    section: 'subjects'
  },
  {
    id: 18,
    question: "The average marks obtained by a class in an examination were calculated as 30.8. However, while checking the marks entered, the teacher found that the marks of one student were entered incorrectly as 24 instead of 42. After correcting the marks, the average becomes 31.4. How many students does the class have?",
    options: [
      "25",
      "28",
      "30",
      "32"
    ],
    correctAnswer: "30",
    type: 'single',
    section: 'subjects'
  },
  {
    id: 19,
    question: "The average marks obtained by a class in an examination were calculated as 30.8. However, while checking the marks entered, the teacher found that the marks of one student were entered incorrectly as 24 instead of 42. After correcting the marks, the average becomes 31.4. How many students does the class have?",
    options: [
      "Both (1) and (2) are true.",
      "Both (1) and (3) are true.",
      "Only (3) is true.",
      "Only (4) is true."
    ],
    correctAnswer: "Both (1) and (2) are true.",
    type: 'single',
    section: 'subjects'
  },
  {
    id: 20,
    question: "The average marks obtained by a class in an examination were calculated as 30.8. However, while checking the marks entered, the teacher found that the marks of one student were entered incorrectly as 24 instead of 42. After correcting the marks, the average becomes 31.4. How many students does the class have?",
    options: [
      "25",
      "28",
      "30",
      "32"
    ],
    correctAnswer: "30",
    type: 'single',
    section: 'subjects'
  }
];

export const getQuestionsBySection = (section: 'general' | 'subjects'): Question[] => {
  return questionsData.filter(q => q.section === section);
};
