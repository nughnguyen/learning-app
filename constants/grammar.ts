export const GRAMMAR_TENSES = [
  {
    id: 'present_simple',
    title: 'Present Simple',
    formula: 'S + V(s/es) + O',
    usage: 'To describe habits, general truths, and fixed arrangements.',
    example: 'I wake up at 6 AM every day. / The sun rises in the east.',
    quiz: [
      {
        question: 'She ___ (play) tennis every Sunday.',
        options: ['play', 'plays', 'playing', 'played'],
        answer: 'plays',
      },
      {
        question: 'Water ___ (boil) at 100 degrees Celsius.',
        options: ['boil', 'boils', 'boiling', 'is boiling'],
        answer: 'boils',
      }
    ]
  },
  {
    id: 'present_continuous',
    title: 'Present Continuous',
    formula: 'S + am/is/are + V-ing',
    usage: 'To describe actions happening now or around now.',
    example: 'She is reading a book right now.',
    quiz: [
      {
        question: 'Look! It ___ (rain).',
        options: ['rains', 'rain', 'is raining', 'rained'],
        answer: 'is raining',
      }
    ]
  },
  {
    id: 'present_perfect',
    title: 'Present Perfect',
    formula: 'S + have/has + V3/ed',
    usage: 'To describe actions that started in the past and continue to the present, or experiences.',
    example: 'I have visited Paris twice.',
    quiz: [
        {
          question: 'I ___ (live) here for 10 years.',
          options: ['live', 'lived', 'have lived', 'living'],
          answer: 'have lived',
        }
      ]
  },
  {
    id: 'past_simple',
    title: 'Past Simple',
    formula: 'S + V2/ed + O',
    usage: 'Actions finished at a specific time in the past.',
    example: 'He bought a car yesterday.',
    quiz: [
        {
          question: 'They ___ (go) to the cinema last night.',
          options: ['go', 'goes', 'went', 'gone'],
          answer: 'went',
        }
      ]
  },
   // Add remaining tenses similarly... (Truncated for brevity in this file, but logic applies)
   {
    id: 'future_simple',
    title: 'Future Simple',
    formula: 'S + will + V',
    usage: 'Decisions made at the moment of speaking, predictions.',
    example: 'I will help you.',
    quiz: [
        {
          question: 'I think it ___ (rain) tomorrow.',
          options: ['rains', 'rain', 'will rain', 'raining'],
          answer: 'will rain',
        }
      ]
  },
];
