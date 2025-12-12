export const GRAMMAR_TENSES = [
  // LEVEL 1: Simple Tenses
  {
    id: 'present_simple',
    title: 'Present Simple',
    titleVi: 'Hiện tại đơn',
    difficulty: 1,
    formula: '<S>S</S> + <V>V(s/es)</V> + <O>O</O>',
    usage: 'To describe habits, routines, general truths, and fixed schedules.',
    usageVi: 'Diễn tả thói quen, hành động lặp đi lặp lại, sự thật hiển nhiên hoặc lịch trình cố định.',
    tips: [
      '- Với động từ thường: I/You/We/They + V (nguyên thể). He/She/It + V(s/es).',
      '- Quy tắc thêm s/es: Thêm "es" với từ tận cùng là o, s, x, z, ch, sh (vd: go->goes, watch->watches). Còn lại thêm "s".',
      '- Với động từ To be: I + am; He/She/It + is; You/We/They + are.'
    ],
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
    titleVi: 'Hiện tại tiếp diễn',
    difficulty: 2,
    formula: '<S>S</S> + <Aux>am/is/are</Aux> + <V>V-ing</V> + <O>O</O>',
    usage: 'To describe actions happening now, temporary situations, or future arrangements.',
    usageVi: 'Diễn tả hành động đang xảy ra ngay lúc nói, xung quanh thời điểm nói hoặc kế hoạch tương lai gần.',
    tips: [
      '- I + am + V-ing.',
      '- He/She/It + is + V-ing.',
      '- You/We/They + are + V-ing.',
      '- Quy tắc V-ing: Tận cùng là "e" thì bỏ "e" thêm "ing" (write -> writing). Tận cùng 1 phụ âm, trước là 1 nguyên âm thì gấp đôi phụ âm (sit -> sitting).'
    ],
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
    id: 'future_simple',
    title: 'Future Simple',
    titleVi: 'Tương lai đơn',
    difficulty: 2,
    formula: '<S>S</S> + <Aux>will</Aux> + <V>V</V> + <O>O</O>',
    usage: 'To describe decisions made at the moment of speaking, predictions, promises, or offers.',
    usageVi: 'Diễn tả quyết định ngay tại thời điểm nói, dự đoán (không có căn cứ), lời hứa hoặc lời đề nghị.',
    tips: [
      '- Dùng "will" + Động từ nguyên thể cho tất cả các ngôi (S).',
      '- Không chia động từ sau will (không thêm s/es/ing/ed).',
      '- Phủ định: will not = won\'t.'
    ],
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
  {
    id: 'past_simple',
    title: 'Past Simple',
    titleVi: 'Quá khứ đơn',
    difficulty: 3,
    formula: '<S>S</S> + <V>V2/ed</V> + <O>O</O>',
    usage: 'To describe finished actions at a specific time in the past.',
    usageVi: 'Diễn tả hành động đã xảy ra và kết thúc hoàn toàn tại một thời điểm xác định trong quá khứ.',
    tips: [
      '- Động từ có quy tắc: Thêm "ed".',
      '- Động từ bất quy tắc: Dùng cột 2 trong bảng động từ bất quy tắc (Go -> Went).',
      '- Động từ To be: I/He/She/It + was. You/We/They + were.',
      '- Câu phủ định và nghi vấn mượn trợ động từ "did" thì động từ chính quay về nguyên thể (Did you go...?).'
    ],
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
  {
    id: 'past_continuous',
    title: 'Past Continuous',
    titleVi: 'Quá khứ tiếp diễn',
    difficulty: 3,
    formula: '<S>S</S> + <Aux>was/were</Aux> + <V>V-ing</V> + <O>O</O>',
    usage: 'To describe actions happening at a specific time in the past or interrupted actions.',
    usageVi: 'Diễn tả hành động đang xảy ra tại một thời điểm cụ thể trong quá khứ hoặc bị hành động khác cắt ngang.',
    tips: [
      '- I/He/She/It + was + V-ing.',
      '- You/We/They + were + V-ing.',
      '- Hành động đang xảy ra (dùng Quá khứ tiếp diễn) thì có hành động khác xen vào (dùng Quá khứ đơn).'
    ],
    keywords: 'at this time yesterday, at 8 PM last night, when, while, etc.',
    example: '<S>I</S> <Aux>was</Aux> <V>reading</V> <O>a book</O> <K>at 8 PM last night</K>. / <S>He</S> <Aux>was</Aux> <V>sleeping</V> <O>when</O> <S>I</S> <V>came</V>.',
    quiz: [
      {
        question: 'This time last year I ___ (live) in Brazil.',
        options: ['lived', 'was living', 'have lived', 'living'],
        answer: 'was living',
      },
      {
        question: 'What ___ (you/do) at 10 PM last night?',
        options: ['did you do', 'were you doing', 'have you done', 'do you do'],
        answer: 'were you doing',
      },
      {
        question: 'She ___ (cook) when the phone rang.',
        options: ['cooked', 'was cooking', 'has cooked', 'cooks'],
        answer: 'was cooking',
      },
      {
        question: 'We ___ (not/drive) fast when the accident happened.',
        options: ['weren\'t driving', 'didn\'t drive', 'haven\'t driven', 'not driving'],
        answer: 'weren\'t driving',
      },
      {
        question: 'I ___ (walk) down the street when I saw Dave.',
        options: ['walked', 'was walking', 'have walked', 'am walking'],
        answer: 'was walking',
      },
      {
        question: 'While they ___ (play) chess, we were watching TV.',
        options: ['played', 'were playing', 'did play', 'playing'],
        answer: 'were playing',
      },
      {
        question: 'It ___ (rain) when we went out.',
        options: ['rained', 'was raining', 'rains', 'has rained'],
        answer: 'was raining',
      },
      {
        question: 'He ___ (work) in the garden all day yesterday.',
        options: ['worked', 'was working', 'works', 'has worked'],
        answer: 'was working',
      },
      {
        question: 'Who ___ (you/talk) to when I saw you?',
        options: ['did you talk', 'were you talking', 'have you talked', 'do you talk'],
        answer: 'were you talking',
      },
      {
        question: 'She ___ (wear) a beautiful dress at the party.',
        options: ['wore', 'was wearing', 'wears', 'has worn'],
        answer: 'was wearing',
      }
    ]
  },
  {
    id: 'present_perfect',
    title: 'Present Perfect',
    titleVi: 'Hiện tại hoàn thành',
    difficulty: 4,
    formula: '<S>S</S> + <Aux>have/has</Aux> + <V>V3/ed</V> + <O>O</O>',
    usage: 'To describe actions that started in the past and continue to the present, experiences, or recent events with present results.',
    usageVi: 'Diễn tả hành động bắt đầu trong quá khứ và kéo dài đến hiện tại, trải nghiệm hoặc hành động vừa xảy ra.',
    tips: [
      '- I/You/We/They + have + V3/ed.',
      '- He/She/It + has + V3/ed.',
      '- V3: Cột 3 bảng bất quy tắc. Nếu có quy tắc thì thêm ed.'
    ],
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
    id: 'future_continuous',
    title: 'Future Continuous',
    titleVi: 'Tương lai tiếp diễn',
    difficulty: 4,
    formula: '<S>S</S> + <Aux>will be</Aux> + <V>V-ing</V> + <O>O</O>',
    usage: 'To describe actions that will be in progress at a specific time in the future.',
    usageVi: 'Diễn tả hành động sẽ đang diễn ra tại một thời điểm xác định trong tương lai.',
    tips: [
      '- S + will be + V-ing (Dùng cho tất cả các ngôi).',
      '- Nhấn mạnh vào quá trình diễn ra của hành động tại thời điểm cụ thể trong tương lai.'
    ],
    keywords: 'at this time tomorrow, at 5 PM next Monday, etc.',
    example: '<S>I</S> <Aux>will be</Aux> <V>sleeping</V> <K>at 11 o\'clock tonight</K>. / <S>We</S> <Aux>will be</Aux> <V>working</V> <O>when</O> <S>you</S> <V>arrive</V>.',
    quiz: [
      {
        question: 'At this time tomorrow, I ___ (fly) to Paris.',
        options: ['will fly', 'will be flying', 'fly', 'am flying'],
        answer: 'will be flying',
      },
      {
        question: 'Don\'t call me at 9 PM. I ___ (watch) the news.',
        options: ['will watch', 'will be watching', 'watch', 'am watching'],
        answer: 'will be watching',
      },
      {
        question: 'This time next week, we ___ (lie) on the beach.',
        options: ['will lie', 'will be lying', 'lie', 'are lying'],
        answer: 'will be lying',
      },
      {
        question: 'She ___ (work) when you arrive.',
        options: ['will work', 'will be working', 'works', 'is working'],
        answer: 'will be working',
      },
      {
        question: 'I ___ (wait) for you when your bus arrives.',
        options: ['wait', 'will be waiting', 'waited', 'am waiting'],
        answer: 'will be waiting',
      },
      {
        question: 'They ___ (stay) at the Ritz Hotel.',
        options: ['will stay', 'will be staying', 'stay', 'stayed'],
        answer: 'will be staying',
      },
      {
        question: '___ (you/use) your car tomorrow?',
        options: ['Will you use', 'Will you be using', 'Do you use', 'Are you using'],
        answer: 'Will you be using',
      },
      {
        question: 'He ___ (study) at the library tonight.',
        options: ['will study', 'will be studying', 'studies', 'studied'],
        answer: 'will be studying',
      },
      {
        question: 'We ___ (have) dinner at 8 PM.',
        options: ['will have', 'will be having', 'have', 'had'],
        answer: 'will be having',
      },
      {
        question: 'Who ___ (look) after the children?',
        options: ['will look', 'will be looking', 'looks', 'looked'],
        answer: 'will be looking',
      }
    ]
  },
  {
    id: 'past_perfect',
    title: 'Past Perfect',
    titleVi: 'Quá khứ hoàn thành',
    difficulty: 5,
    formula: '<S>S</S> + <Aux>had</Aux> + <V>V3/ed</V> + <O>O</O>',
    usage: 'To describe an action that happened before another action in the past.',
    usageVi: 'Diễn tả hành động đã xảy ra và hoàn thành trước một hành động khác trong quá khứ.',
    tips: [
      '- S + had + V3/ed (Dùng cho tất cả các ngôi).',
      '- "Had" dùng chung cho cả số ít và số nhiều.',
      '- Hành động xảy ra trước dùng Quá khứ hoàn thành, hành động xảy ra sau dùng Quá khứ đơn.'
    ],
    keywords: 'before, after, when, by the time, because, etc.',
    example: '<S>She</S> <Aux>had</Aux> <V>left</V> <K>before</K> <S>I</S> <V>arrived</V>. / <S>Only after</S> <S>he</S> <Aux>had</Aux> <V>finished</V> <O>lunch</O> <V>did</V> <S>he</S> <V>go</V> out.',
    quiz: [
      {
        question: 'When I arrived at the station, the train ___ (leave).',
        options: ['left', 'had left', 'has left', 'was leaving'],
        answer: 'had left',
      },
      {
        question: 'She was tired because she ___ (walk) 10km.',
        options: ['walked', 'had walked', 'has walked', 'was walking'],
        answer: 'had walked',
      },
      {
        question: 'They ___ (finish) their work before 5 PM.',
        options: ['finished', 'had finished', 'have finished', 'were finishing'],
        answer: 'had finished',
      },
      {
        question: 'The film ___ (start) by the time we got to the cinema.',
        options: ['started', 'had started', 'has started', 'was starting'],
        answer: 'had started',
      },
      {
        question: 'I ___ (never/see) such a beautiful beach before I went to Hawaii.',
        options: ['never saw', 'had never seen', 'have never seen', 'didn\'t see'],
        answer: 'had never seen',
      },
      {
        question: 'He failed the test because he ___ (not/study).',
        options: ['didn\'t study', 'hadn\'t studied', 'hasn\'t studied', 'wasn\'t studying'],
        answer: 'hadn\'t studied',
      },
      {
        question: 'After I ___ (eat) breakfast, I went to work.',
        options: ['ate', 'had eaten', 'have eaten', 'was eating'],
        answer: 'had eaten',
      },
      {
        question: 'By the age of 25, he ___ (write) two books.',
        options: ['wrote', 'had written', 'has written', 'was writing'],
        answer: 'had written',
      },
      {
        question: 'She realized she ___ (leave) her phone at home.',
        options: ['left', 'had left', 'has left', 'was leaving'],
        answer: 'had left',
      },
      {
        question: '___ (you/finish) the report before the meeting started?',
        options: ['Did you finish', 'Had you finished', 'Have you finished', 'Were you finishing'],
        answer: 'Had you finished',
      }
    ]
  },
  {
    id: 'present_perfect_continuous',
    title: 'Present Perfect Continuous',
    titleVi: 'Hiện tại hoàn thành tiếp diễn',
    difficulty: 5,
    formula: '<S>S</S> + <Aux>have/has been</Aux> + <V>V-ing</V> + <O>O</O>',
    usage: 'To describe actions that started in the past and are still continuing now, emphasizing the duration.',
    usageVi: 'Diễn tả hành động bắt đầu trong quá khứ và kéo dài liên tục đến hiện tại, nhấn mạnh tính liên tục.',
    tips: [
      '- I/You/We/They + have been + V-ing.',
      '- He/She/It + has been + V-ing.',
      '- Khác với Hiện tại hoàn thành (nhấn mạnh kết quả), thì này nhấn mạnh vào quá trình kéo dài.'
    ],
    keywords: 'for, since, all day/week/year, how long, lately, recently.',
    example: '<S>I</S> <Aux>have been</Aux> <V>waiting</V> <O>for you</O> <K>for two hours</K>. / <S>It</S> <Aux>has been</Aux> <V>raining</V> <K>all day</K>.',
    quiz: [
      {
        question: 'I ___ (wait) for you for two hours.',
        options: ['waited', 'have been waiting', 'am waiting', 'was waiting'],
        answer: 'have been waiting',
      },
      {
        question: 'She ___ (study) English since she was 6.',
        options: ['studied', 'has been studying', 'is studying', 'was studying'],
        answer: 'has been studying',
      },
      {
        question: 'They ___ (play) tennis all afternoon.',
        options: ['played', 'have been playing', 'are playing', 'were playing'],
        answer: 'have been playing',
      },
      {
        question: 'How long ___ (you/learn) French?',
        options: ['do you learn', 'have you been learning', 'are you learning', 'did you learn'],
        answer: 'have you been learning',
      },
      {
        question: 'He ___ (work) here for 20 years.',
        options: ['works', 'has been working', 'is working', 'worked'],
        answer: 'has been working',
      },
      {
        question: 'You look tired. ___ (you/run)?',
        options: ['Do you run', 'Have you been running', 'Are you running', 'Did you run'],
        answer: 'Have you been running',
      },
      {
        question: 'It ___ (rain) since this morning.',
        options: ['rained', 'has been raining', 'is raining', 'rains'],
        answer: 'has been raining',
      },
      {
        question: 'I ___ (read) this book for weeks.',
        options: ['read', 'have been reading', 'am reading', 'was reading'],
        answer: 'have been reading',
      },
      {
        question: 'The phone ___ (ring) for 5 minutes.',
        options: ['rang', 'has been ringing', 'is ringing', 'rings'],
        answer: 'has been ringing',
      },
      {
        question: 'We ___ (look) for a new house recently.',
        options: ['looked', 'have been looking', 'are looking', 'look'],
        answer: 'have been looking',
      }
    ]
  },
  {
    id: 'future_perfect',
    title: 'Future Perfect',
    titleVi: 'Tương lai hoàn thành',
    difficulty: 6,
    formula: '<S>S</S> + <Aux>will have</Aux> + <V>V3/ed</V> + <O>O</O>',
    usage: 'To describe actions that will be finished before a specific time in the future.',
    usageVi: 'Diễn tả hành động sẽ hoàn thành trước một thời điểm hoặc một hành động khác trong tương lai.',
    tips: [
      '- S + will have + V3/ed (Dùng cho tất cả các ngôi).',
      '- Thường đi kèm với "By + mốc thời gian" hoặc "By the time + mệnh đề hiện tại đơn".'
    ],
    keywords: 'by + future time, by the time, before, etc.',
    example: '<S>I</S> <Aux>will have</Aux> <V>finished</V> <O>my homework</O> <K>by 8 PM</K>. / <S>She</S> <Aux>will have</Aux> <V>left</V> <K>by the time you arrive</K>.',
    quiz: [
      {
        question: 'By next year, I ___ (graduate) from university.',
        options: ['will graduate', 'will have graduated', 'graduate', 'am graduating'],
        answer: 'will have graduated',
      },
      {
        question: 'She ___ (leave) by the time you arrive.',
        options: ['will leave', 'will have left', 'leaves', 'left'],
        answer: 'will have left',
      },
      {
        question: 'They ___ (finish) the project by Monday.',
        options: ['will finish', 'will have finished', 'finish', 'finished'],
        answer: 'will have finished',
      },
      {
        question: 'How many countries ___ (you/visit) by the time you are 50?',
        options: ['will you visit', 'will you have visited', 'do you visit', 'have you visited'],
        answer: 'will you have visited',
      },
      {
        question: 'I ___ (complete) the report by 5 PM.',
        options: ['complete', 'will have completed', 'will complete', 'completed'],
        answer: 'will have completed',
      },
      {
        question: 'The train ___ (leave) before we get there.',
        options: ['will leave', 'will have left', 'leaves', 'left'],
        answer: 'will have left',
      },
      {
        question: 'We ___ (save) enough money by Christmas.',
        options: ['will save', 'will have saved', 'save', 'saved'],
        answer: 'will have saved',
      },
      {
        question: 'He ___ (write) the book by next month.',
        options: ['writes', 'will have written', 'will write', 'wrote'],
        answer: 'will have written',
      },
      {
        question: '___ (you/retire) by the time you are 65?',
        options: ['Will you retire', 'Will you have retired', 'Do you retire', 'Are you retiring'],
        answer: 'Will you have retired',
      },
      {
        question: 'They ___ (build) the bridge by 2026.',
        options: ['build', 'will have built', 'will build', 'built'],
        answer: 'will have built',
      }
    ]
  },
  {
    id: 'past_perfect_continuous',
    title: 'Past Perfect Continuous',
    titleVi: 'Quá khứ hoàn thành tiếp diễn',
    difficulty: 7,
    formula: '<S>S</S> + <Aux>had been</Aux> + <V>V-ing</V> + <O>O</O>',
    usage: 'To describe an action that had been happening for a period of time before another action in the past.',
    usageVi: 'Diễn tả hành động đã xảy ra liên tục trong một khoảng thời gian trước một hành động khác trong quá khứ.',
    tips: [
      '- S + had been + V-ing (Dùng cho tất cả các ngôi).',
      '- Nhấn mạnh tính liên tục của hành động trước một hành động quá khứ khác.'
    ],
    keywords: 'for, since, before, how long.',
    example: '<S>He</S> <Aux>had been</Aux> <V>working</V> <K>for 10 hours</K> when <S>he</S> <V>fainted</V>. / <S>It</S> <Aux>had been</Aux> <V>raining</V> <K>all night</K>.',
    quiz: [
      {
        question: 'She was tired because she ___ (run) for 2 hours.',
        options: ['ran', 'had been running', 'has been running', 'was running'],
        answer: 'had been running',
      },
      {
        question: 'They ___ (wait) for the bus for 30 minutes before it arrived.',
        options: ['waited', 'had been waiting', 'have been waiting', 'were waiting'],
        answer: 'had been waiting',
      },
      {
        question: 'I ___ (study) English for 5 years before I moved to London.',
        options: ['studied', 'had been studying', 'has been studying', 'was studying'],
        answer: 'had been studying',
      },
      {
        question: 'How long ___ (you/work) there before you quit?',
        options: ['did you work', 'had you been working', 'have you been working', 'were you working'],
        answer: 'had you been working',
      },
      {
        question: 'It ___ (snow) for days before the roads were cleared.',
        options: ['snowed', 'had been snowing', 'has been snowing', 'was snowing'],
        answer: 'had been snowing',
      },
      {
        question: 'He ___ (smoke) for 30 years before he finally stopped.',
        options: ['smoked', 'had been smoking', 'has been smoking', 'was smoking'],
        answer: 'had been smoking',
      },
      {
        question: 'We ___ (look) for the dog for hours before we found him.',
        options: ['looked', 'had been looking', 'have been looking', 'were looking'],
        answer: 'had been looking',
      },
      {
        question: 'The baby ___ (cry) all night.',
        options: ['cried', 'had been crying', 'has been crying', 'was crying'],
        answer: 'had been crying',
      },
      {
        question: 'My eyes were red because I ___ (cut) onions.',
        options: ['cut', 'had been cutting', 'have been cutting', 'was cutting'],
        answer: 'had been cutting',
      },
      {
        question: 'They ___ (play) football for an hour when it started to rain.',
        options: ['played', 'had been playing', 'have been playing', 'were playing'],
        answer: 'had been playing',
      }
    ]
  },
  {
    id: 'future_perfect_continuous',
    title: 'Future Perfect Continuous',
    titleVi: 'Tương lai hoàn thành tiếp diễn',
    difficulty: 8,
    formula: '<S>S</S> + <Aux>will have been</Aux> + <V>V-ing</V> + <O>O</O>',
    usage: 'To describe an action that will happen continuously up to a certain time in the future.',
    usageVi: 'Diễn tả hành động sẽ xảy ra liên tục kéo dài đến một thời điểm cụ thể trong tương lai.',
    tips: [
      '- S + will have been + V-ing (Dùng cho tất cả các ngôi).',
      '- Nhấn mạnh khoảng thời gian (duration) tính đến một mốc trong tương lai.'
    ],
    keywords: 'by...for, by the time...for.',
    example: '<S>By next year</S>, <S>we</S> <Aux>will have been</Aux> <V>living</V> <O>here</O> <K>for 5 years</K>.',
    quiz: [
      {
        question: 'By 2030, I ___ (work) here for 20 years.',
        options: ['will work', 'will have been working', 'work', 'am working'],
        answer: 'will have been working',
      },
      {
        question: 'By the time you arrive, she ___ (wait) for 2 hours.',
        options: ['will wait', 'will have been waiting', 'waits', 'is waiting'],
        answer: 'will have been waiting',
      },
      {
        question: 'Next month, they ___ (live) in Spain for 10 years.',
        options: ['will live', 'will have been living', 'live', 'are living'],
        answer: 'will have been living',
      },
      {
        question: 'I ___ (study) for 5 hours by the time the exam starts.',
        options: ['will study', 'will have been studying', 'study', 'am studying'],
        answer: 'will have been studying',
      },
      {
        question: 'How long ___ (you/drive) by the time we get there?',
        options: ['will you drive', 'will you have been driving', 'do you drive', 'are you driving'],
        answer: 'will you have been driving',
      },
      {
        question: 'By Christmas, we ___ (save) money for a year.',
        options: ['will save', 'will have been saving', 'save', 'are saving'],
        answer: 'will have been saving',
      },
      {
        question: 'He ___ (teach) at the university for 30 years by the time he retires.',
        options: ['will teach', 'will have been teaching', 'teaches', 'is teaching'],
        answer: 'will have been teaching',
      },
      {
        question: 'By 5 PM, it ___ (rain) for 12 hours.',
        options: ['will rain', 'will have been raining', 'rains', 'is raining'],
        answer: 'will have been raining',
      },
      {
        question: 'They ___ (travel) for 24 hours by the time they reach Sydney.',
        options: ['will travel', 'will have been traveling', 'travel', 'are traveling'],
        answer: 'will have been traveling',
      },
      {
        question: 'I ___ (not/sleep) for 24 hours by then.',
        options: ['won\'t sleep', 'won\'t have been sleeping', 'don\'t sleep', 'am not sleeping'],
        answer: 'won\'t have been sleeping',
      }
    ]
  }
];
