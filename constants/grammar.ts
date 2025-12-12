export const GRAMMAR_TENSES = [
  {
    id: 'present_simple',
    title: 'Present Simple',
    formula: '<S>S</S> + <V>V(s/es)</V> + <O>O</O>',
    usage: 'To describe habits, routines, general truths, and fixed schedules.',
    usageVi: 'Diễn tả thói quen, hành động lặp đi lặp lại, sự thật hiển nhiên hoặc lịch trình cố định.',
    keywords: 'always, usually, often, sometimes, every day, every week, etc.',
    example: '<S>I</S> <V>wake up</V> <O>at 6 AM</O> <K>every day</K>. / <S>The sun</S> <V>rises</V> <O>in the east</O>. / <S>The train</S> <V>leaves</V> <O>at 9 PM</O>.',
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
      },
      {
        question: 'They usually ___ (go) to school by bus.',
        options: ['go', 'goes', 'going', 'went'],
        answer: 'go',
      },
      {
        question: 'The library ___ (open) at 8 AM.',
        options: ['opens', 'open', 'opening', 'opened'],
        answer: 'opens',
      },
      {
        question: 'He ___ (not/like) spicy food.',
        options: ['do not like', 'does not like', 'not likes', 'is not liking'],
        answer: 'does not like',
      },
      {
        question: '___ (do) you speak English?',
        options: ['Do', 'Does', 'Are', 'Is'],
        answer: 'Do',
      },
      {
        question: 'We ___ (visit) our grandparents on weekends.',
        options: ['visits', 'visit', 'visiting', 'are visiting'],
        answer: 'visit',
      },
      {
        question: 'My brother ___ (work) as a doctor.',
        options: ['works', 'work', 'working', 'is working'],
        answer: 'works',
      },
      {
        question: 'The Earth ___ (go) around the Sun.',
        options: ['go', 'goes', 'going', 'went'],
        answer: 'goes',
      },
      {
        question: '___ (does) she study French?',
        options: ['Do', 'Does', 'Is', 'Are'],
        answer: 'Does',
      }
    ]
  },
  {
    id: 'present_continuous',
    title: 'Present Continuous',
    formula: '<S>S</S> + <Aux>am/is/are</Aux> + <V>V-ing</V> + <O>O</O>',
    usage: 'To describe actions happening now, temporary situations, or future arrangements.',
    usageVi: 'Diễn tả hành động đang xảy ra ngay lúc nói, xung quanh thời điểm nói hoặc kế hoạch tương lai gần.',
    keywords: 'now, at the moment, right now, Look!, Listen!, etc.',
    example: '<S>She</S> <Aux>is</Aux> <V>reading</V> <O>a book</O> <K>right now</K>. / <S>I</S> <Aux>am</Aux> <V>meeting</V> <O>him</O> <K>tonight</K>.',
    quiz: [
      {
        question: 'Look! It ___ (rain).',
        options: ['rains', 'rain', 'is raining', 'rained'],
        answer: 'is raining',
      },
      {
        question: 'They ___ (play) football in the park now.',
        options: ['play', 'are playing', 'plays', 'played'],
        answer: 'are playing',
      },
      {
        question: 'I ___ (study) for my exam at the moment.',
        options: ['study', 'am studying', 'studying', 'studies'],
        answer: 'am studying',
      },
      {
        question: 'Listen! Someone ___ (sing).',
        options: ['sings', 'sing', 'is singing', 'are singing'],
        answer: 'is singing',
      },
      {
        question: 'We ___ (not/watch) TV right now.',
        options: ['are not watching', 'do not watch', 'not watching', 'is not watching'],
        answer: 'are not watching',
      },
      {
        question: 'What ___ (you/do) tonight?',
        options: ['are you doing', 'do you do', 'you doing', 'did you do'],
        answer: 'are you doing',
      },
      {
        question: 'She ___ (stay) with her friend this week.',
        options: ['stays', 'is staying', 'staying', 'stayed'],
        answer: 'is staying',
      },
      {
        question: 'He ___ (always/complain) about his job! (annoyance)',
        options: ['always complains', 'is always complaining', 'complains', 'complaining'],
        answer: 'is always complaining',
      },
      {
        question: 'The children ___ (sleep) upstairs.',
        options: ['sleep', 'are sleeping', 'sleeping', 'sleeps'],
        answer: 'are sleeping',
      },
      {
        question: '___ (be) you listening to me?',
        options: ['Do', 'Are', 'Is', 'Have'],
        answer: 'Are',
      }
    ]
  },
  {
    id: 'present_perfect',
    title: 'Present Perfect',
    formula: '<S>S</S> + <Aux>have/has</Aux> + <V>V3/ed</V> + <O>O</O>',
    usage: 'To describe actions that started in the past and continue to the present, experiences, or recent events with present results.',
    usageVi: 'Diễn tả hành động bắt đầu trong quá khứ và kéo dài đến hiện tại, trải nghiệm hoặc hành động vừa xảy ra.',
    keywords: 'for, since, just, already, yet, ever, never, recently, lately.',
    example: '<S>I</S> <Aux>have</Aux> <V>visited</V> <O>Paris</O> <K>twice</K>. / <S>She</S> <Aux>has</Aux> <V>lived</V> <O>here</O> <K>for 10 years</K>.',
    quiz: [
      {
        question: 'I ___ (live) here for 10 years.',
        options: ['live', 'lived', 'have lived', 'living'],
        answer: 'have lived',
      },
      {
        question: 'She ___ (just/finish) her homework.',
        options: ['finishes', 'has just finished', 'finished', 'is finishing'],
        answer: 'has just finished',
      },
      {
        question: '___ (you/ever/see) a ghost?',
        options: ['Did you ever see', 'Have you ever seen', 'Do you ever see', 'Are you seeing'],
        answer: 'Have you ever seen',
      },
      {
        question: 'We ___ (not/meet) him before.',
        options: ['haven\'t met', 'didn\'t meet', 'not meet', 'haven\'t meet'],
        answer: 'haven\'t met',
      },
      {
        question: 'He ___ (lose) his keys. He can\'t find them.',
        options: ['lost', 'has lost', 'loses', 'is losing'],
        answer: 'has lost',
      },
      {
        question: 'They ___ (be) to Japan three times.',
        options: ['were', 'have been', 'are', 'was'],
        answer: 'have been',
      },
      {
        question: 'I ___ (know) her since 2010.',
        options: ['know', 'knew', 'have known', 'known'],
        answer: 'have known',
      },
      {
        question: 'The train ___ (not/arrive) yet.',
        options: ['didn\'t arrive', 'hasn\'t arrived', 'doesn\'t arrive', 'isn\'t arriving'],
        answer: 'hasn\'t arrived',
      },
      {
        question: 'John ___ (buy) a new car recently.',
        options: ['bought', 'has bought', 'buys', 'buying'],
        answer: 'has bought',
      },
      {
        question: 'How long ___ (you/work) here?',
        options: ['do you work', 'did you work', 'have you worked', 'are you working'],
        answer: 'have you worked',
      }
    ]
  },
  {
    id: 'past_simple',
    title: 'Past Simple',
    formula: '<S>S</S> + <V>V2/ed</V> + <O>O</O>',
    usage: 'To describe finished actions at a specific time in the past.',
    usageVi: 'Diễn tả hành động đã xảy ra và kết thúc hoàn toàn tại một thời điểm xác định trong quá khứ.',
    keywords: 'yesterday, last night/week/month/year, ago, in 2010, etc.',
    example: '<S>He</S> <V>bought</V> <O>a car</O> <K>yesterday</K>. / <S>We</S> <V>went</V> <O>to the cinema</O> <K>last night</K>.',
    quiz: [
      {
        question: 'They ___ (go) to the cinema last night.',
        options: ['go', 'goes', 'went', 'gone'],
        answer: 'went',
      },
      {
        question: 'I ___ (not/see) him yesterday.',
        options: ['don\'t see', 'didn\'t see', 'haven\'t seen', 'wasn\'t see'],
        answer: 'didn\'t see',
      },
      {
        question: 'Where ___ (you/spend) your holiday last summer?',
        options: ['do you spend', 'did you spend', 'have you spent', 'were you spending'],
        answer: 'did you spend',
      },
      {
        question: 'She ___ (buy) a new dress two days ago.',
        options: ['buys', 'bought', 'has bought', 'buying'],
        answer: 'bought',
      },
      {
        question: 'We ___ (be) very tired after the trip.',
        options: ['were', 'was', 'are', 'been'],
        answer: 'were',
      },
      {
        question: 'The film ___ (start) at 8 PM.',
        options: ['started', 'starts', 'start', 'starting'],
        answer: 'started',
      },
      {
        question: 'He ___ (stop) smoking last year.',
        options: ['stops', 'stopped', 'has stopped', 'stopping'],
        answer: 'stopped',
      },
      {
        question: '___ (did) you call me?',
        options: ['Do', 'Did', 'Have', 'Was'],
        answer: 'Did',
      },
      {
        question: 'They ___ (leave) the party early.',
        options: ['leave', 'left', 'leaves', 'leaving'],
        answer: 'left',
      },
      {
        question: 'Mozart ___ (write) more than 600 pieces of music.',
        options: ['writes', 'wrote', 'has written', 'was writing'],
        answer: 'wrote',
      }
    ]
  },
   // Add remaining tenses similarly... (Truncated for brevity in this file, but logic applies)
   {
    id: 'future_simple',
    title: 'Future Simple',
    formula: '<S>S</S> + <Aux>will</Aux> + <V>V</V> + <O>O</O>',
    usage: 'To describe decisions made at the moment of speaking, predictions, promises, or offers.',
    usageVi: 'Diễn tả quyết định ngay tại thời điểm nói, dự đoán (không có căn cứ), lời hứa hoặc lời đề nghị.',
    keywords: 'tomorrow, next week/month/year, soon, in + time, think, believe, promise.',
    example: '<S>I</S> <Aux>will</Aux> <V>help</V> <O>you</O>. / I think <S>it</S> <Aux>will</Aux> <V>rain</V> <K>tomorrow</K>.',
    quiz: [
      {
        question: 'I think it ___ (rain) tomorrow.',
        options: ['rains', 'rain', 'will rain', 'raining'],
        answer: 'will rain',
      },
      {
        question: 'Don\'t worry, I ___ (help) you.',
        options: ['help', 'will help', 'am helping', 'helped'],
        answer: 'will help',
      },
      {
        question: 'They ___ (probably/arrive) late.',
        options: ['arrive', 'will probably arrive', 'arrived', 'are arriving'],
        answer: 'will probably arrive',
      },
      {
        question: '___ (you/open) the window, please?',
        options: ['Will you open', 'Do you open', 'Are you opening', 'Did you open'],
        answer: 'Will you open',
      },
      {
        question: 'I promise I ___ (not/tell) anyone.',
        options: ['don\'t tell', 'won\'t tell', 'not tell', 'didn\'t tell'],
        answer: 'won\'t tell',
      },
      {
        question: 'I believe she ___ (pass) the exam.',
        options: ['passes', 'will pass', 'pass', 'passing'],
        answer: 'will pass',
      },
      {
        question: 'The phone is ringing. I ___ (answer) it.',
        options: ['answer', 'will answer', 'am answering', 'answered'],
        answer: 'will answer',
      },
      {
        question: 'Maybe we ___ (stay) at home tonight.',
        options: ['will stay', 'stay', 'staying', 'stayed'],
        answer: 'will stay',
      },
      {
        question: 'He ___ (be) 20 years old next month.',
        options: ['is', 'will be', 'was', 'being'],
        answer: 'will be',
      },
      {
        question: '___ (will) you marry me?',
        options: ['Do', 'Will', 'Are', 'Did'],
        answer: 'Will',
      }
    ]
  },
];
