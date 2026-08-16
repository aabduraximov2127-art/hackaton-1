import { 
  Level, Course, Topic, Lesson, Word, Question, Quiz, 
  ConversationScenario, Achievement, LocationItem, User, DailyChallenge 
} from '../types';

export const INITIAL_LEVELS: Level[] = [
  {
    code: 'A1',
    name: 'Beginner',
    order: 1,
    passing_score: 80,
    description: 'Boshlang‘ich daraja — oddiy iboralar, tanishuv, kundalik so‘zlar va asosiy grammatika.',
    color: 'from-emerald-500 to-teal-700',
    badge_icon: '🌱'
  },
  {
    code: 'A2',
    name: 'Elementary',
    order: 2,
    passing_score: 80,
    description: 'Boshlang‘ichdan yuqori — sayohat, xaridlar, qiziqishlar va o‘tmish zamon ifodalari.',
    color: 'from-blue-500 to-indigo-700',
    badge_icon: '🌿'
  },
  {
    code: 'B1',
    name: 'Intermediate',
    order: 3,
    passing_score: 85,
    description: 'O‘rta daraja — texnologiyalar, fikr bildirish, erkin muloqot va murakkabroq mavzular.',
    color: 'from-indigo-500 to-purple-700',
    badge_icon: '⚡'
  },
  {
    code: 'B2',
    name: 'Upper-Intermediate',
    order: 4,
    passing_score: 85,
    description: 'Yuqori o‘rta daraja — professional munozara, tezkor nutq va boy so‘z boyligi.',
    color: 'from-purple-500 to-pink-700',
    badge_icon: '🔥'
  },
  {
    code: 'C1',
    name: 'Advanced',
    order: 5,
    passing_score: 90,
    description: 'Ilg‘or daraja — akademik ingliz tili, idiomalar, murakkab tahliliy fikrlar.',
    color: 'from-pink-500 to-rose-700',
    badge_icon: '💎'
  },
  {
    code: 'C2',
    name: 'Proficiency',
    order: 6,
    passing_score: 90,
    description: 'Mukammal daraja — ona tilidek erkin muloqot, barcha nuanslarni tushunish.',
    color: 'from-amber-500 to-yellow-700',
    badge_icon: '👑'
  }
];

export const INITIAL_COURSES: Course[] = [
  // A1 Courses
  {
    id: 'course-a1-1',
    level_code: 'A1',
    title: 'Introducing Yourself & Family',
    description: 'O‘zingizni tanishtirish, oila a’zolari, yosh va kasblar haqida gapirishni o‘rganing.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
    duration: '4 soat (6 mavzu)',
    is_active: true,
    topics_count: 6,
    color_gradient: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30'
  },
  {
    id: 'course-a1-2',
    level_code: 'A1',
    title: 'Food, Daily Routine & Numbers',
    description: 'Kun tartibi, sevimli taomlar, sonlar va soatlar bilan ishlash bo‘yicha amaliy darslar.',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=600&auto=format&fit=crop&q=80',
    duration: '3.5 soat (5 mavzu)',
    is_active: true,
    topics_count: 5,
    color_gradient: 'from-teal-500/20 to-cyan-500/10 border-teal-500/30'
  },
  // A2 Courses
  {
    id: 'course-a2-1',
    level_code: 'A2',
    title: 'Travel, Airports & City Navigation',
    description: 'Sayohat qilish, aeroportda suhbat, mehmonxonaga buyurtma berish va shaharda yo‘l so‘rash.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80',
    duration: '5 soat (6 mavzu)',
    is_active: true,
    topics_count: 6,
    color_gradient: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30'
  },
  {
    id: 'course-a2-2',
    level_code: 'A2',
    title: 'Shopping, Hobbies & Teen Life',
    description: 'Do‘konda savdolashish, kiyimlar, sevimli mashg‘ulotlar va do‘stlar bilan rejalashtirish.',
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?w=600&auto=format&fit=crop&q=80',
    duration: '4 soat (5 mavzu)',
    is_active: true,
    topics_count: 5,
    color_gradient: 'from-indigo-500/20 to-cyan-500/10 border-indigo-500/30'
  },
  // B1 Courses
  {
    id: 'course-b1-1',
    level_code: 'B1',
    title: 'Technology, AI & Social Media',
    description: 'Zamonaviy texnologiyalar, sun’iy intellekt, ijtimoiy tarmoqlar va kelajak kasblari.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80',
    duration: '6 soat (6 mavzu)',
    is_active: true,
    topics_count: 6,
    color_gradient: 'from-indigo-500/20 to-purple-500/10 border-indigo-500/30'
  },
  {
    id: 'course-b1-2',
    level_code: 'B1',
    title: 'Environment, Climate & Modern World',
    description: 'Ekologiya, atrof-muhitni muhofaza qilish, global o‘zgarishlar va yechimlar haqida bahslashish.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&auto=format&fit=crop&q=80',
    duration: '5 soat (5 mavzu)',
    is_active: true,
    topics_count: 5,
    color_gradient: 'from-purple-500/20 to-violet-500/10 border-purple-500/30'
  },
  // B2 Courses
  {
    id: 'course-b2-1',
    level_code: 'B2',
    title: 'Critical Thinking & Global Debates',
    description: 'Murakkab dalillar keltirish, bahslarda o‘z fikrini ishonarli himoya qilish va maqolalar tahlili.',
    image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=600&auto=format&fit=crop&q=80',
    duration: '6 soat (6 mavzu)',
    is_active: true,
    topics_count: 6,
    color_gradient: 'from-purple-500/20 to-pink-500/10 border-purple-500/30'
  },
  // C1 Courses
  {
    id: 'course-c1-1',
    level_code: 'C1',
    title: 'Academic Writing & IELTS Mastery',
    description: 'Murakkab insholar, taqdimotlar, akademik leksika va xalqaro imtihonlarga tayyorgarlik.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&auto=format&fit=crop&q=80',
    duration: '8 soat (8 mavzu)',
    is_active: true,
    topics_count: 8,
    color_gradient: 'from-pink-500/20 to-rose-500/10 border-pink-500/30'
  }
];

export const INITIAL_TOPICS: Topic[] = [
  // A1 Topics
  {
    id: 'topic-a1-1',
    course_id: 'course-a1-1',
    level_code: 'A1',
    title: 'Introducing Yourself & Greetings',
    description: 'Salomlashish, ism-familiyani aytish va to be fe’lini ishlatish.',
    order: 1,
    duration_minutes: 45,
    icon: '👋'
  },
  {
    id: 'topic-a1-2',
    course_id: 'course-a1-1',
    level_code: 'A1',
    title: 'My Family & Relationships',
    description: 'Oila a’zolari (parents, siblings) va egalik olmoshlari (my, your, his, her).',
    order: 2,
    duration_minutes: 50,
    icon: '👨‍👩‍👧‍👦'
  },
  {
    id: 'topic-a1-3',
    course_id: 'course-a1-1',
    level_code: 'A1',
    title: 'Numbers, Age & Time',
    description: '1 dan 100 gacha sonlar, yoshni aytish va soatni so‘rash.',
    order: 3,
    duration_minutes: 40,
    icon: '🔢'
  },
  {
    id: 'topic-a1-4',
    course_id: 'course-a1-2',
    level_code: 'A1',
    title: 'Food, Drinks & Ordering in a Cafe',
    description: 'Taom nomlari, yoqtirish/yoqtirmaslik (like/dislike) va buyurtma berish.',
    order: 1,
    duration_minutes: 50,
    icon: '🍔'
  },
  {
    id: 'topic-a1-5',
    course_id: 'course-a1-2',
    level_code: 'A1',
    title: 'My Daily Routine & Habits',
    description: 'Ertalabdan kechgacha qilinadigan ishlar va Present Simple zamoni.',
    order: 2,
    duration_minutes: 55,
    icon: '⏰'
  },
  // A2 Topics
  {
    id: 'topic-a2-1',
    course_id: 'course-a2-1',
    level_code: 'A2',
    title: 'At the Airport & Checking In',
    description: 'Pasport nazorati, yuk topshirish va reys haqida ma’lumot olish.',
    order: 1,
    duration_minutes: 55,
    icon: '✈️'
  },
  {
    id: 'topic-a2-2',
    course_id: 'course-a2-1',
    level_code: 'A2',
    title: 'Asking for Directions in a New City',
    description: 'Shaharda xaritadan foydalanish, yo‘l so‘rash (turn left, go straight).',
    order: 2,
    duration_minutes: 45,
    icon: '🗺️'
  },
  {
    id: 'topic-a2-3',
    course_id: 'course-a2-2',
    level_code: 'A2',
    title: 'Shopping for Clothes & Gadgets',
    description: 'Razmerlar, narxlar, chegirmalar va to‘lov turlari.',
    order: 1,
    duration_minutes: 50,
    icon: '🛍️'
  },
  // B1 Topics
  {
    id: 'topic-b1-1',
    course_id: 'course-b1-1',
    level_code: 'B1',
    title: 'Artificial Intelligence & Future Tech',
    description: 'AI vositalari, robototexnika va ularning hayotimizdagi o‘rni.',
    order: 1,
    duration_minutes: 60,
    icon: '🤖'
  },
  {
    id: 'topic-b1-2',
    course_id: 'course-b1-1',
    level_code: 'B1',
    title: 'Social Media & Digital Well-being',
    description: 'Ijtimoiy tarmoqlarning ijobiy va salbiy tomonlari haqida erkin munozara.',
    order: 2,
    duration_minutes: 55,
    icon: '📱'
  }
];

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: 'lesson-a1-1-vocab',
    topic_id: 'topic-a1-1',
    title: 'Essential Greetings & Introductions',
    type: 'vocabulary',
    order: 1,
    xp_reward: 10,
    content: {
      summary: 'Ingliz tilida ilk bor tanishganda eng ko‘p ishlatiladigan so‘z va iboralar.'
    }
  },
  {
    id: 'lesson-a1-1-grammar',
    topic_id: 'topic-a1-1',
    title: 'Verb "To Be" (am, is, are)',
    type: 'grammar',
    order: 2,
    xp_reward: 15,
    content: {
      summary: 'To be fe’li ingliz tilining eng muhim fundamenti hisoblanadi.',
      rules: [
        {
          title: 'I am / You are / He, She, It is',
          explanation: 'Egalarga qarab to be fe’lining to‘g‘ri shakli qo‘llaniladi.',
          example: 'I am a student. She is a doctor. We are ready.'
        },
        {
          title: 'Inkor shakli (Negative)',
          explanation: 'To be dan keyin "not" yuklamasi qo‘shiladi.',
          example: 'I am not tired. They are not at home.'
        },
        {
          title: 'Savol shakli (Questions)',
          explanation: 'To be egadan oldinga o‘tadi.',
          example: 'Are you 16 years old? Is he from Tashkent?'
        }
      ]
    }
  },
  {
    id: 'lesson-a1-1-listening',
    topic_id: 'topic-a1-1',
    title: 'Meeting at School — Audio Dialogue',
    type: 'listening',
    order: 3,
    xp_reward: 20,
    content: {
      listening_audio_text: "Hello! My name is Alex. I am 15 years old and I am from London. Nice to meet you!",
      dialogue: [
        { speaker: 'Alex', text: 'Hello! I am Alex. What is your name?', translation: 'Salom! Men Alexman. Ismingiz nima?' },
        { speaker: 'Aziz', text: 'Hi Alex! My name is Aziz. Nice to meet you.', translation: 'Salom Alex! Mening ismim Aziz. Tanishganimdan xursandman.' },
        { speaker: 'Alex', text: 'Where are you from, Aziz?', translation: 'Qayerdansan, Aziz?' },
        { speaker: 'Aziz', text: 'I am from Uzbekistan, Tashkent.', translation: 'Men O‘zbekistondanman, Toshkentdan.' }
      ]
    }
  },
  {
    id: 'lesson-a1-1-quiz',
    topic_id: 'topic-a1-1',
    title: 'A1 Greetings & Grammar Check',
    type: 'quiz',
    order: 4,
    xp_reward: 30,
    content: {
      summary: 'O‘rgangan bilimlaringizni tezkor interaktiv test orqali sinab ko‘ring!'
    }
  },
  {
    id: 'lesson-a1-1-speaking',
    topic_id: 'topic-a1-1',
    title: 'Speaking Challenge: Self Introduction',
    type: 'speaking',
    order: 5,
    xp_reward: 40,
    content: {
      summary: 'Mikrofonni yoqing va 30 soniya davomida o‘zingizni ingliz tilida tanishtiring.'
    }
  }
];

export const INITIAL_WORDS: Word[] = [
  // A1 Words
  {
    id: 'w-1',
    level_code: 'A1',
    topic_id: 'topic-a1-1',
    word: 'Greeting',
    phonetic: '/ˈɡriːtɪŋ/',
    translation: 'Salomlashish',
    example: 'A friendly greeting makes everyone smile.',
    example_uz: 'Samimiy salomlashish har kimni jilmaytiradi.',
    difficulty: 'easy',
    part_of_speech: 'noun'
  },
  {
    id: 'w-2',
    level_code: 'A1',
    topic_id: 'topic-a1-1',
    word: 'Introduce',
    phonetic: '/ˌɪntrəˈdjuːs/',
    translation: 'Tanishtirmoq',
    example: 'Let me introduce my best friend, Alex.',
    example_uz: 'Ruxsat bering, eng yaxshi do‘stim Alexni tanishtiray.',
    difficulty: 'easy',
    part_of_speech: 'verb'
  },
  {
    id: 'w-3',
    level_code: 'A1',
    topic_id: 'topic-a1-1',
    word: 'Hometown',
    phonetic: '/ˈhəʊmtaʊn/',
    translation: 'Tug‘ilib o‘sgan shahar',
    example: 'Tashkent is my beloved hometown.',
    example_uz: 'Toshkent — mening sevimli ona shahrim.',
    difficulty: 'easy',
    part_of_speech: 'noun'
  },
  {
    id: 'w-4',
    level_code: 'A1',
    topic_id: 'topic-a1-2',
    word: 'Sibling',
    phonetic: '/ˈsɪblɪŋ/',
    translation: 'Aka-uka yoki opa-singil',
    example: 'I have two siblings: an older brother and a younger sister.',
    example_uz: 'Mening ikkita aka-singlim bor: akam va singlim.',
    difficulty: 'medium',
    part_of_speech: 'noun'
  },
  {
    id: 'w-5',
    level_code: 'A1',
    topic_id: 'topic-a1-4',
    word: 'Delicious',
    phonetic: '/dɪˈlɪʃəs/',
    translation: 'Juda mazali, totli',
    example: 'Traditional Uzbek plov is absolutely delicious.',
    example_uz: 'Milliy o‘zbek palovi juda ham mazali.',
    difficulty: 'easy',
    part_of_speech: 'adjective'
  },
  {
    id: 'w-6',
    level_code: 'A1',
    topic_id: 'topic-a1-5',
    word: 'Routine',
    phonetic: '/ruːˈtiːn/',
    translation: 'Kun tartibi, odat',
    example: 'Morning exercise is part of my daily routine.',
    example_uz: 'Ertalabki badantarbiya mening kun tartibimning bir qismi.',
    difficulty: 'easy',
    part_of_speech: 'noun'
  },
  // A2 Words
  {
    id: 'w-7',
    level_code: 'A2',
    topic_id: 'topic-a2-1',
    word: 'Boarding pass',
    phonetic: '/ˈbɔːdɪŋ pɑːs/',
    translation: 'Samolyotga chiqish taloni',
    example: 'Please show your passport and boarding pass at gate 4.',
    example_uz: 'Iltimos, 4-darvozada pasport va chiqish talonini ko‘rsating.',
    difficulty: 'medium',
    part_of_speech: 'noun'
  },
  {
    id: 'w-8',
    level_code: 'A2',
    topic_id: 'topic-a2-1',
    word: 'Destination',
    phonetic: '/ˌdestɪˈneɪʃn/',
    translation: 'Boriladigan manzil',
    example: 'London is our final travel destination.',
    example_uz: 'London — bizning yakuniy sayohat manzilimiz.',
    difficulty: 'medium',
    part_of_speech: 'noun'
  },
  {
    id: 'w-9',
    level_code: 'A2',
    topic_id: 'topic-a2-2',
    word: 'Intersection',
    phonetic: '/ˌɪntəˈsekʃn/',
    translation: 'Chorraha',
    example: 'Turn right at the second intersection.',
    example_uz: 'Ikkinchi chorrahadan o‘ngga buriling.',
    difficulty: 'medium',
    part_of_speech: 'noun'
  },
  {
    id: 'w-10',
    level_code: 'A2',
    topic_id: 'topic-a2-3',
    word: 'Discount',
    phonetic: '/ˈdɪskaʊnt/',
    translation: 'Chegirma',
    example: 'Students get a 20% discount on all books.',
    example_uz: 'Talabalar barcha kitoblarga 20% chegirma olishadi.',
    difficulty: 'easy',
    part_of_speech: 'noun'
  },
  // B1 Words
  {
    id: 'w-11',
    level_code: 'B1',
    topic_id: 'topic-b1-1',
    word: 'Artificial',
    phonetic: '/ˌɑːtɪˈfɪʃl/',
    translation: 'Sun’iy',
    example: 'Artificial intelligence is changing the way we learn languages.',
    example_uz: 'Sun’iy intellekt bizning til o‘rganish uslubimizni o‘zgartirmoqda.',
    difficulty: 'medium',
    part_of_speech: 'adjective'
  },
  {
    id: 'w-12',
    level_code: 'B1',
    topic_id: 'topic-b1-1',
    word: 'Algorithm',
    phonetic: '/ˈælɡərɪðəm/',
    translation: 'Algoritm',
    example: 'The recommendation algorithm suggests lessons based on your level.',
    example_uz: 'Tavsiya algoritmi darajangizga qarab darslarni taklif qiladi.',
    difficulty: 'hard',
    part_of_speech: 'noun'
  },
  {
    id: 'w-13',
    level_code: 'B1',
    topic_id: 'topic-b1-2',
    word: 'Productivity',
    phonetic: '/ˌprɒdʌkˈtɪvəti/',
    translation: 'Samaradorlik, unumdorlik',
    example: 'Setting daily goals boosts your study productivity.',
    example_uz: 'Kunlik maqsadlar qo‘yish o‘qish samaradorligingizni oshiradi.',
    difficulty: 'medium',
    part_of_speech: 'noun'
  },
  {
    id: 'w-14',
    level_code: 'B1',
    topic_id: 'topic-b1-2',
    word: 'Influence',
    phonetic: '/ˈɪnfluəns/',
    translation: 'Ta’sir ko‘rsatmoq / Ta’sir',
    example: 'Social media can strongly influence teen behavior.',
    example_uz: 'Ijtimoiy tarmoqlar o‘smirlar xatti-harakatiga kuchli ta’sir qilishi mumkin.',
    difficulty: 'medium',
    part_of_speech: 'verb'
  },
  // B2/C1 Words
  {
    id: 'w-15',
    level_code: 'B2',
    topic_id: 'topic-b1-1',
    word: 'Comprehensive',
    phonetic: '/ˌkɒmprɪˈhensɪv/',
    translation: 'Har tomonlama to‘liq, mukammal',
    example: 'The OSON platform offers a comprehensive English syllabus.',
    example_uz: 'OSON platformasi har tomonlama to‘liq ingliz tili dasturini taqdim etadi.',
    difficulty: 'hard',
    part_of_speech: 'adjective'
  },
  {
    id: 'w-16',
    level_code: 'C1',
    topic_id: 'topic-b1-1',
    word: 'Eloquent',
    phonetic: '/ˈeləkwənt/',
    translation: 'Fasohatchi, chiroyli va ta’sirchan gapiruvchi',
    example: 'She gave an eloquent presentation about youth education.',
    example_uz: 'U yoshlar ta’limi haqida ta’sirchan va go‘zal taqdimot qildi.',
    difficulty: 'hard',
    part_of_speech: 'adjective'
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  // ================= A1 QUESTIONS =================
  {
    id: 'q-a1-1',
    level_code: 'A1',
    topic_id: 'topic-a1-1',
    quiz_id: 'quiz-a1-1',
    question: 'Choose the correct form: "She ______ a 15-year-old high school student."',
    question_type: 'multiple_choice',
    options: ['am', 'is', 'are', 'be'],
    correct_answer: 'is',
    explanation: '"She" birlikdagi III shaxs bo‘lgani uchun "is" yordamchi fe’li ishlatiladi.'
  },
  {
    id: 'q-a1-2',
    level_code: 'A1',
    topic_id: 'topic-a1-1',
    quiz_id: 'quiz-a1-1',
    question: 'How do you respond politely to "Nice to meet you"?',
    question_type: 'multiple_choice',
    options: ['Nice to meet you too!', 'Good bye!', 'I am fine, thank you.', 'No problem, see ya.'],
    correct_answer: 'Nice to meet you too!',
    explanation: '"Nice to meet you" ga javoban odatda "Nice to meet you too!" deyiladi.'
  },
  {
    id: 'q-a1-3',
    level_code: 'A1',
    topic_id: 'topic-a1-1',
    quiz_id: 'quiz-a1-1',
    question: 'Listen & complete: "They ______ from Tashkent."',
    question_type: 'listening',
    audio_phrase: 'They are from Tashkent.',
    options: ['are', 'is', 'am', 'was'],
    correct_answer: 'are',
    explanation: '"They" (ular) ko‘plikdagi ega bo‘lgani uchun "are" to‘g‘ri variant.'
  },
  {
    id: 'q-a1-4',
    level_code: 'A1',
    topic_id: 'topic-a1-1',
    quiz_id: 'quiz-a1-1',
    question: 'Fill in the blank: "What is ______ phone number?"',
    question_type: 'fill_blank',
    options: ['your', 'you', 'he', 'we'],
    correct_answer: 'your',
    explanation: 'Egalik olmoshi "your" (sizning / sening) ism yoki ot oldidan keladi.'
  },
  {
    id: 'q-a1-5',
    level_code: 'A1',
    topic_id: 'topic-a1-1',
    quiz_id: 'quiz-a1-1',
    question: 'Arrange words into a correct sentence: "English / every / I / study / day"',
    question_type: 'sentence_order',
    options: ['I study English every day', 'Every day study I English', 'Study I English every day', 'English I study every day'],
    correct_answer: 'I study English every day',
    explanation: 'Ingliz tilida standart gap tartibi: Ega (I) + Kesim (study) + To‘ldiruvchi (English) + Hol (every day).'
  },
  {
    id: 'q-a1-6',
    level_code: 'A1',
    topic_id: 'topic-a1-4',
    quiz_id: 'quiz-a1-2',
    question: 'In a restaurant: "I would like a cup of ______ tea, please."',
    question_type: 'multiple_choice',
    options: ['green', 'loud', 'slow', 'tall'],
    correct_answer: 'green',
    explanation: '"Green tea" (ko‘k choy) ichimlik sifatini ifodalaydi.'
  },
  {
    id: 'q-a1-7',
    level_code: 'A1',
    topic_id: 'topic-a1-5',
    quiz_id: 'quiz-a1-2',
    question: 'Daily Routine: "He ______ up at 7:00 AM every morning."',
    question_type: 'multiple_choice',
    options: ['wakes', 'wake', 'waking', 'is wake'],
    correct_answer: 'wakes',
    explanation: 'Present Simple da He/She/It egalari uchun fe’lga "-s" qo‘shimchasi qo‘shiladi (wakes up).'
  },
  {
    id: 'q-a1-8',
    level_code: 'A1',
    topic_id: 'topic-a1-5',
    quiz_id: 'quiz-a1-2',
    question: 'Time question: "Excuse me, what ______ is it?"',
    question_type: 'fill_blank',
    options: ['time', 'hour', 'clock', 'watch'],
    correct_answer: 'time',
    explanation: 'Vaqtni so‘rashda "What time is it?" iborasi qo‘llaniladi.'
  },
  {
    id: 'q-a1-9',
    level_code: 'A1',
    topic_id: 'topic-a1-2',
    quiz_id: 'quiz-a1-2',
    question: 'Plural nouns: What is the plural form of "child"?',
    question_type: 'multiple_choice',
    options: ['children', 'childs', 'childes', 'childrens'],
    correct_answer: 'children',
    explanation: '"Child" so‘zining ko‘plik shakli noto‘g‘ri otlar qatorida "children" bo‘ladi.'
  },

  // ================= A2 QUESTIONS =================
  {
    id: 'q-a2-1',
    level_code: 'A2',
    topic_id: 'topic-a2-1',
    quiz_id: 'quiz-a2-1',
    question: 'At the airport: "Where can I drop off my ______?"',
    question_type: 'multiple_choice',
    options: ['luggage', 'homework', 'kitchen', 'pencil'],
    correct_answer: 'luggage',
    explanation: 'Aeroportda yuk topshirish joyi "luggage drop-off" deyiladi.'
  },
  {
    id: 'q-a2-2',
    level_code: 'A2',
    topic_id: 'topic-a2-1',
    quiz_id: 'quiz-a2-1',
    question: 'Past simple: "Yesterday we ______ to Samarkand by high-speed train."',
    question_type: 'multiple_choice',
    options: ['travelled', 'travels', 'travel', 'travelling'],
    correct_answer: 'travelled',
    explanation: '"Yesterday" o‘tgan zamon ko‘rsatkichi bo‘lib, fe’lning Past Simple (travelled) shakli qo‘yiladi.'
  },
  {
    id: 'q-a2-3',
    level_code: 'A2',
    topic_id: 'topic-a2-2',
    quiz_id: 'quiz-a2-1',
    question: 'Directions: "Go ______ ahead and turn right at the traffic lights."',
    question_type: 'fill_blank',
    options: ['straight', 'behind', 'under', 'between'],
    correct_answer: 'straight',
    explanation: '"Go straight ahead" — to‘g‘riga qarab to‘g‘ri boring degan ma’noni anglatadi.'
  },
  {
    id: 'q-a2-4',
    level_code: 'A2',
    topic_id: 'topic-a2-3',
    quiz_id: 'quiz-a2-2',
    question: 'Comparatives: "This laptop is ______ than my old one."',
    question_type: 'multiple_choice',
    options: ['faster', 'more fast', 'fastest', 'as fast'],
    correct_answer: 'faster',
    explanation: 'Bir bo‘g‘inli sifatlar qiyosiy darajada "-er" oladi (faster than).'
  },
  {
    id: 'q-a2-5',
    level_code: 'A2',
    topic_id: 'topic-a2-3',
    quiz_id: 'quiz-a2-2',
    question: 'Shopping: "How ______ does this hoodie cost?"',
    question_type: 'fill_blank',
    options: ['much', 'many', 'long', 'often'],
    correct_answer: 'much',
    explanation: 'Narx so‘rashda "How much does it cost?" deb so‘raladi.'
  },
  {
    id: 'q-a2-6',
    level_code: 'A2',
    topic_id: 'topic-a2-1',
    quiz_id: 'quiz-a2-2',
    question: 'Listen: "The flight to London departs from Gate 14."',
    question_type: 'listening',
    audio_phrase: 'The flight to London departs from Gate 14.',
    options: ['Gate 14', 'Gate 4', 'Gate 40', 'Gate 24'],
    correct_answer: 'Gate 14',
    explanation: 'Audio e’londa reys 14-darvozadan (Gate 14) uchishi aytildi.'
  },

  // ================= B1 QUESTIONS =================
  {
    id: 'q-b1-1',
    level_code: 'B1',
    topic_id: 'topic-b1-1',
    quiz_id: 'quiz-b1-1',
    question: 'Choose the most suitable word: "Artificial intelligence has the potential to ______ education worldwide."',
    question_type: 'multiple_choice',
    options: ['revolutionize', 'delete', 'sleep', 'hesitate'],
    correct_answer: 'revolutionize',
    explanation: '"Revolutionize" — tubdan o‘zgartirmoq yoki yangi bosqichga olib chiqmoq.'
  },
  {
    id: 'q-b1-2',
    level_code: 'B1',
    topic_id: 'topic-b1-1',
    quiz_id: 'quiz-b1-1',
    question: 'Conditionals: "If teenagers ______ more time reading, their vocabulary would expand rapidly."',
    question_type: 'multiple_choice',
    options: ['spent', 'spend', 'will spend', 'had spent'],
    correct_answer: 'spent',
    explanation: 'Second Conditional (nohaqiqiy hozirgi/kelasi zamon) formulasi: If + Past Simple, would + V1.'
  },
  {
    id: 'q-b1-3',
    level_code: 'B1',
    topic_id: 'topic-b1-2',
    quiz_id: 'quiz-b1-1',
    question: 'Present Perfect: "She ______ in Tashkent since 2018."',
    question_type: 'multiple_choice',
    options: ['has lived', 'lives', 'lived', 'is living'],
    correct_answer: 'has lived',
    explanation: '"Since 2018" davomiylikni bildiradi va Present Perfect (has lived) talab qiladi.'
  },
  {
    id: 'q-b1-4',
    level_code: 'B1',
    topic_id: 'topic-b1-2',
    quiz_id: 'quiz-b1-2',
    question: 'Passive voice: "The new mobile app ______ by a team of young Uzbek developers."',
    question_type: 'multiple_choice',
    options: ['was developed', 'developed', 'is develop', 'has developing'],
    correct_answer: 'was developed',
    explanation: 'Majhul nisbat (Passive Voice): was/were + V3 (was developed).'
  },
  {
    id: 'q-b1-5',
    level_code: 'B1',
    topic_id: 'topic-b1-2',
    quiz_id: 'quiz-b1-2',
    question: 'Modal verbs: "You ______ turn off your phone during the official exam."',
    question_type: 'fill_blank',
    options: ['must', 'might', 'could', 'prefer'],
    correct_answer: 'must',
    explanation: 'Qat’iy qoida va majburiyat uchun "must" modali qo‘llanadi.'
  },

  // ================= B2 QUESTIONS =================
  {
    id: 'q-b2-1',
    level_code: 'B2',
    quiz_id: 'quiz-b2-1',
    question: 'Collocations: "The government took effective measures to ______ with the environmental crisis."',
    question_type: 'multiple_choice',
    options: ['cope', 'handle', 'solve', 'face'],
    correct_answer: 'cope',
    explanation: '"Cope with" iborasi qiyinchiliklarni yengib o‘tish yoki kurashish ma’nosida ishlatiladi.'
  },
  {
    id: 'q-b2-2',
    level_code: 'B2',
    quiz_id: 'quiz-b2-1',
    question: 'Third Conditional: "If they had prepared more thoroughly, they ______ the debate contest."',
    question_type: 'multiple_choice',
    options: ['would have won', 'will win', 'would win', 'had won'],
    correct_answer: 'would have won',
    explanation: 'Third Conditional (o‘tmishdagi afsus): If + Past Perfect, would have + V3.'
  },
  {
    id: 'q-b2-3',
    level_code: 'B2',
    quiz_id: 'quiz-b2-1',
    question: 'Phrasal verbs: "The teacher asked the students to ______ up the unfamiliar words in the dictionary."',
    question_type: 'fill_blank',
    options: ['look', 'take', 'make', 'give'],
    correct_answer: 'look',
    explanation: '"Look up" — lug‘atdan yoki ma’lumotlar bazasidan qidirib topmoq.'
  },
  {
    id: 'q-b2-4',
    level_code: 'B2',
    quiz_id: 'quiz-b2-1',
    question: 'Inversion: "Seldom ______ such an inspiring presentation on artificial intelligence."',
    question_type: 'multiple_choice',
    options: ['have I witnessed', 'I have witnessed', 'I witnessed', 'witnessed I'],
    correct_answer: 'have I witnessed',
    explanation: 'Inkor so‘zlar (Seldom, Never, Rarely) gap boshida kelsa, inversiya (yordamchi fe’l egadan oldinga) yuz beradi.'
  },

  // ================= C1 & C2 QUESTIONS =================
  {
    id: 'q-c1-1',
    level_code: 'C1',
    quiz_id: 'quiz-c1-1',
    question: 'Idiomatic expressions: "Passing the certification exam with flying colors means you passed ______."',
    question_type: 'multiple_choice',
    options: ['with exceptionally high scores', 'barely on the edge', 'by cheating', 'after several attempts'],
    correct_answer: 'with exceptionally high scores',
    explanation: '"With flying colors" — juda yuqori va yorqin natijalar bilan degan ma’noni anglatuvchi mashhur inglizcha idioma.'
  },
  {
    id: 'q-c1-2',
    level_code: 'C1',
    quiz_id: 'quiz-c1-1',
    question: 'Advanced lexis: "His argument was so ______ that no one in the committee could refute it."',
    question_type: 'multiple_choice',
    options: ['compelling', 'fragile', 'superficial', 'negligible'],
    correct_answer: 'compelling',
    explanation: '"Compelling argument" — inkor etib bo‘lmas, juda kuchli va ishonarli dalil.'
  },
  {
    id: 'q-c1-3',
    level_code: 'C1',
    quiz_id: 'quiz-c1-1',
    question: 'Subjunctive mood: "It is imperative that every student ______ present at the keynote lecture."',
    question_type: 'multiple_choice',
    options: ['be', 'is', 'was', 'are'],
    correct_answer: 'be',
    explanation: 'Subjunctive Mood (It is imperative that + S + base form V): "that every student be present".'
  },
  {
    id: 'q-c2-1',
    level_code: 'C2',
    quiz_id: 'quiz-c2-1',
    question: 'Nuance: "The novel’s subtle irony was lost on readers who took the narrative at ______ value."',
    question_type: 'multiple_choice',
    options: ['face', 'front', 'surface', 'sight'],
    correct_answer: 'face',
    explanation: '"At face value" — tashqi ko‘rinishiga qarab to‘g‘ridan-to‘g‘ri qabul qilmoq.'
  },
  {
    id: 'q-c2-2',
    level_code: 'C2',
    quiz_id: 'quiz-c2-1',
    question: 'C2 Vocabulary: "The speaker gave an impromptu and remarkably ______ discourse on modern linguistics."',
    question_type: 'multiple_choice',
    options: ['lucid', 'opaque', 'turgid', 'vacuous'],
    correct_answer: 'lucid',
    explanation: '"Lucid" — juda tiniq, ravshan va tushunarli ma’nosini anglatadi.'
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz-a1-1',
    level_code: 'A1',
    topic_id: 'topic-a1-1',
    title: 'A1 Starter: Tanishuv va Asosiy Grammatika',
    description: 'Salomlashish, to be fe’li va asosiy gap tuzilishidan 5 ta savol.',
    question_count: 5,
    xp_reward: 30,
    passing_score: 80,
    time_limit_seconds: 180
  },
  {
    id: 'quiz-a1-2',
    level_code: 'A1',
    topic_id: 'topic-a1-4',
    title: 'A1 Daily Life: Taomlar, Vaqt va Odatlar',
    description: 'Restoranda buyurtma berish, soatni so‘rash va Present Simple.',
    question_count: 4,
    xp_reward: 30,
    passing_score: 80,
    time_limit_seconds: 180
  },
  {
    id: 'quiz-a2-1',
    level_code: 'A2',
    topic_id: 'topic-a2-1',
    title: 'A2 Explorer: Sayohat va Past Simple',
    description: 'Aeroport, yo‘l so‘rash va o‘tgan zamon bo‘yicha interaktiv test.',
    question_count: 3,
    xp_reward: 35,
    passing_score: 80,
    time_limit_seconds: 180
  },
  {
    id: 'quiz-a2-2',
    level_code: 'A2',
    topic_id: 'topic-a2-3',
    title: 'A2 Lifestyle: Xaridlar va Sifat Darajalari',
    description: 'Kiyimlar, narx so‘rash va sifatlarning qiyosiy darajalari.',
    question_count: 3,
    xp_reward: 35,
    passing_score: 80,
    time_limit_seconds: 180
  },
  {
    id: 'quiz-b1-1',
    level_code: 'B1',
    topic_id: 'topic-b1-1',
    title: 'B1 Tech & Conditionals Quiz',
    description: 'Sun’iy intellekt, 2-shart mayli va Present Perfect.',
    question_count: 3,
    xp_reward: 40,
    passing_score: 80,
    time_limit_seconds: 150
  },
  {
    id: 'quiz-b1-2',
    level_code: 'B1',
    topic_id: 'topic-b1-2',
    title: 'B1 Grammar: Passive Voice & Modals',
    description: 'Majhul nisbat, majburiyat modallari va ijtimoiy tarmoqlar leksikasi.',
    question_count: 2,
    xp_reward: 40,
    passing_score: 80,
    time_limit_seconds: 150
  },
  {
    id: 'quiz-b2-1',
    level_code: 'B2',
    title: 'B2 Upper-Intermediate Fluency Sprint',
    description: 'Inversiya, phrasal verbs, uchinchi shart mayli va frazalar.',
    question_count: 4,
    xp_reward: 45,
    passing_score: 85,
    time_limit_seconds: 180
  },
  {
    id: 'quiz-c1-1',
    level_code: 'C1',
    title: 'C1 Advanced & Academic IELTS Challenge',
    description: 'Akademik insho leksikasi, idiomalar va Subjunctive Mood.',
    question_count: 3,
    xp_reward: 50,
    passing_score: 85,
    time_limit_seconds: 180
  },
  {
    id: 'quiz-c2-1',
    level_code: 'C2',
    title: 'C2 Proficiency Master Test',
    description: 'Ona tilidek nozik ma’nolar, ilg‘or ritorika va stilistika.',
    question_count: 2,
    xp_reward: 60,
    passing_score: 90,
    time_limit_seconds: 120
  },
  // Level Final Certification Exams
  {
    id: 'level-test-a1',
    level_code: 'A1',
    title: 'A1 Level Final Exam (Certification Test)',
    description: 'A1 darajasini to‘liq yakunlash va A2 darajani ochish uchun yakuniy 5 ta savolli imtihon.',
    question_count: 5,
    xp_reward: 100,
    passing_score: 80,
    time_limit_seconds: 300,
    is_level_test: true
  },
  {
    id: 'level-test-a2',
    level_code: 'A2',
    title: 'A2 Level Final Exam (Certification Test)',
    description: 'A2 darajasini muvaffaqiyatli topshirib B1 Intermediate ga o‘tish imtihoni.',
    question_count: 5,
    xp_reward: 120,
    passing_score: 85,
    time_limit_seconds: 300,
    is_level_test: true
  }
];

export const SPEAKING_TOPICS = [
  {
    id: 'spk-1',
    level_code: 'A1',
    title: 'Introduce Yourself & Your Hobby',
    prompt: 'Tell us your name, age, city, and what you love doing in your free time.',
    prompt_uz: 'Ismingiz, yoshingiz, yashash shahringiz va bo‘sh vaqtingizdagi sevimli mashg‘ulotingiz haqida gapiring.',
    sample_text: 'Hello, my name is Jasur. I am 15 years old and I live in Tashkent. In my free time, I love playing football and learning English on OSON platform.',
    keywords: ['name', 'years old', 'live in', 'free time', 'hobby'],
    duration_suggested: '30-45 seconds'
  },
  {
    id: 'spk-2',
    level_code: 'A2',
    title: 'Order Your Favorite Food at a Cafe',
    prompt: 'Imagine you are at a cafe in London. Order a main dish, a drink, and ask for the bill.',
    prompt_uz: 'Londondagi kafedasiz. Taom, ichimlik buyurtma bering va hisobni so‘rang.',
    sample_text: 'Good afternoon! Could I please have a chicken burger and an iced tea? Also, could you bring the check when you have a moment? Thank you!',
    keywords: ['could I have', 'iced tea', 'check', 'thank you', 'please'],
    duration_suggested: '30-60 seconds'
  },
  {
    id: 'spk-3',
    level_code: 'B1',
    title: 'How Artificial Intelligence Impacts Teen Life',
    prompt: 'Discuss the benefits and challenges of AI tools like ChatGPT for modern school students.',
    prompt_uz: 'Sun’iy intellekt vositalarining o‘quvchilar hayotidagi foydasi va xavflari haqida fikr bildiring.',
    sample_text: 'In my opinion, artificial intelligence is an incredible tool that helps students learn faster and understand difficult topics. However, we should not rely entirely on AI for our homework.',
    keywords: ['in my opinion', 'artificial intelligence', 'incredible tool', 'however', 'homework'],
    duration_suggested: '45-90 seconds'
  },
  {
    id: 'spk-4',
    level_code: 'B2',
    title: 'My Dream Career and University Goals',
    prompt: 'Describe what profession you wish to pursue and which skills you are actively developing today.',
    prompt_uz: 'Kelajakda qaysi kasb egasi bo‘lmoqchisiz va hozir qaysi ko‘nikmalarni rivojlantiryapsiz?',
    sample_text: 'My aspiration is to become a software engineer specializing in artificial intelligence. To achieve this, I consistently practice programming, mathematics, and English communication.',
    keywords: ['aspiration', 'software engineer', 'consistently', 'achieve', 'communication'],
    duration_suggested: '60-120 seconds'
  }
];

export const CONVERSATION_SCENARIOS: ConversationScenario[] = [
  {
    id: 'sc-freechat',
    title: 'Free Conversation & IELTS Coach',
    title_uz: 'Erkin Suhbat & IELTS Murabbiy',
    icon: '🌟',
    description: 'Istalgan mavzuda (o‘yinlar, film, texnologiya, darslar) erkin suhbat quring yoki IELTS Speaking savollariga tayyorlaning.',
    level_min: 'A1',
    ai_role: 'Friendly Native English Mentor (Alex)',
    user_role: 'Curious English Learner',
    initial_message: "Hey there! I am Alex, your 24/7 AI English coach. We can chat about absolutely anything — your favorite video games, movies, coding, IELTS speaking, or daily life. What's on your mind today?",
    suggested_replies: [
      "Tell me a fun joke in English!",
      "How can I improve my English speaking fast?",
      "Let's practice for an IELTS Speaking Part 1 topic.",
      "What are your favorite hobbies and video games?"
    ]
  },
  {
    id: 'sc-restaurant',
    title: 'Cozy London Cafe',
    title_uz: 'London Kafesida Buyurtma',
    icon: '☕',
    description: 'Kafeda ofitsiant bilan suhbat: menyu so‘rash, taom tanlash va hisob-kitob.',
    level_min: 'A1',
    ai_role: 'Polite London Cafe Waiter (James)',
    user_role: 'Teen Customer',
    initial_message: "Welcome to Big Ben Cafe! Take a seat please. What can I get started for you today?",
    suggested_replies: [
      "Hi! Could I see the menu, please?",
      "Hello! I'd like a hot chocolate and a croissant.",
      "What do you recommend for lunch today?"
    ]
  },
  {
    id: 'sc-airport',
    title: 'International Airport Check-in',
    title_uz: 'Aeroportda Ro‘yxatdan O‘tish',
    icon: '🛫',
    description: 'Pasport nazorati, reys ma’lumoti va samolyot o‘rnini tanlash.',
    level_min: 'A2',
    ai_role: 'Airlines Check-in Officer (Sarah)',
    user_role: 'International Traveler',
    initial_message: "Good day! Welcome to British Airways check-in desk. May I have your passport and ticket please?",
    suggested_replies: [
      "Here is my passport and booking confirmation.",
      "Can I please get a window seat?",
      "How much baggage weight is allowed?"
    ]
  },
  {
    id: 'sc-hotel',
    title: 'Hotel Reception in New York',
    title_uz: 'Nyu-York Mehmonxonasida',
    icon: '🏨',
    description: 'Mehmonxonaga joylashish, Wi-Fi paroli va nonushta vaqtini bilish.',
    level_min: 'A2',
    ai_role: 'Hotel Concierge (Michael)',
    user_role: 'Hotel Guest',
    initial_message: "Welcome to The Manhattan Star Hotel! Are you checking in today?",
    suggested_replies: [
      "Yes, I have a reservation under the name Jasur.",
      "What time is breakfast served tomorrow morning?",
      "Could you tell me the Wi-Fi password, please?"
    ]
  },
  {
    id: 'sc-interview',
    title: 'Tech Internship Interview',
    title_uz: 'IT Amaliyot Suhbatida',
    icon: '💼',
    description: 'Yosh dasturchi yoki dizayner amaliyoti bo‘yicha ish suhbati mashqi.',
    level_min: 'B1',
    ai_role: 'Tech Lead Interviewer (David)',
    user_role: 'Junior Tech Applicant',
    initial_message: "Hello! Thank you for applying for our youth internship program. Could you tell me a little bit about yourself and why you enjoy technology?",
    suggested_replies: [
      "Hello David! I love creating web apps and solving problems using code.",
      "I have been learning web development and building small projects for school.",
      "My strongest skill is fast learning and collaborating with a team."
    ]
  },
  {
    id: 'sc-school',
    title: 'First Day at an International School',
    title_uz: 'Xalqaro Maktabda Ilk Kun',
    icon: '🎓',
    description: 'Yangi sinfdoshlar bilan tanishuv, dars jadvali va maktab to‘garaklari.',
    level_min: 'A1',
    ai_role: 'Friendly Classmate (Emma)',
    user_role: 'New International Student',
    initial_message: "Hey! Are you the new student joining our class today? I'm Emma, nice to meet you!",
    suggested_replies: [
      "Hi Emma! Yes, I am new here. My name is Jasur, nice to meet you too!",
      "Which classroom is for English class?",
      "What clubs or sports are popular at this school?"
    ]
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'First Step',
    title_uz: 'Ilk Qadam',
    description: 'Complete your very first English lesson or quiz on OSON.',
    description_uz: 'OSON platformasida birinchi dars yoki testni muvaffaqiyatli yakunlang.',
    icon: '🎯',
    xp_reward: 50,
    category: 'general',
    condition_type: 'lessons_completed',
    condition_target: 1
  },
  {
    id: 'ach-2',
    title: '7 Day Warrior',
    title_uz: '7 Kunlik Qahramon',
    description: 'Maintain a 7-day daily study streak.',
    description_uz: 'Ketma-ket 7 kun davomida har kuni platformaga kirib o‘qing.',
    icon: '🔥',
    xp_reward: 150,
    category: 'streak',
    condition_type: 'streak_days',
    condition_target: 7
  },
  {
    id: 'ach-3',
    title: 'Confident Speaker',
    title_uz: 'Ishonchli Notiq',
    description: 'Complete 5 AI-powered speaking challenges with 80%+ score.',
    description_uz: '5 ta speaking topshirig‘ini 80% dan yuqori ball bilan bajaring.',
    icon: '🎙️',
    xp_reward: 200,
    category: 'speaking',
    condition_type: 'speaking_count',
    condition_target: 5
  },
  {
    id: 'ach-4',
    title: 'Speed Master',
    title_uz: 'Tezkor Bilimdon',
    description: 'Score 100% on any quiz in under 60 seconds.',
    description_uz: 'Istalgan testda 60 soniyadan kam vaqtda 100% natija ko‘rsating.',
    icon: '⚡',
    xp_reward: 100,
    category: 'quiz',
    condition_type: 'fast_quiz',
    condition_target: 1
  },
  {
    id: 'ach-5',
    title: 'Vocabulary King',
    title_uz: 'So‘z Boyligi Qiroli',
    description: 'Master 30 new words with spaced repetition.',
    description_uz: 'Interval takrorlash orqali 30 ta yangi so‘zni to‘liq o‘zlashtiring.',
    icon: '📚',
    xp_reward: 120,
    category: 'vocab',
    condition_type: 'words_mastered',
    condition_target: 30
  },
  {
    id: 'ach-6',
    title: 'AI Companion',
    title_uz: 'AI Hamroh',
    description: 'Complete 3 full dialogue scenarios with AI Tutor.',
    description_uz: 'AI Tutor bilan 3 ta to‘liq suhbat stsenariysini bajaring.',
    icon: '🤖',
    xp_reward: 100,
    category: 'general',
    condition_type: 'ai_chats_completed',
    condition_target: 3
  },
  {
    id: 'ach-7',
    title: 'Top 10 Champion',
    title_uz: 'Top 10 Peshqadam',
    description: 'Reach the Top 10 on the Global Leaderboard.',
    description_uz: 'Umumiy reytingda eng kuchli top 10 talikka kiring.',
    icon: '🏆',
    xp_reward: 300,
    category: 'general',
    condition_type: 'leaderboard_rank',
    condition_target: 10
  },
  {
    id: 'ach-8',
    title: 'Level Conqueror',
    title_uz: 'Daraja Zafari',
    description: 'Pass any Level Certification Exam with 85%+ score.',
    description_uz: 'Daraja yakuniy imtihonidan 85% dan yuqori ball bilan o‘ting.',
    icon: '👑',
    xp_reward: 250,
    category: 'level',
    condition_type: 'level_test_passed',
    condition_target: 1
  }
];

export const INITIAL_LOCATIONS: LocationItem[] = [
  {
    id: 'loc-1',
    name: 'OSON Central Flagship Campus',
    address: 'Toshkent sh., Amir Temur shoh ko‘chasi, 107A (IT Park binosi yaqinida)',
    latitude: 41.311081,
    longitude: 69.279737,
    description: 'OSON ning bosh o‘quv markazi. Zamonaviy VR Speaking Lab, Coworking va Teen Hub mavjud.',
    working_hours: 'Dushanba – Shanba: 08:30 – 21:00',
    contact: '+998 71 200 45 45',
    available_courses: ['A1-C2 English Courses', 'IELTS Teen Intensive', 'AI Speaking Club', 'Offline Hackathons'],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'loc-2',
    name: 'OSON Youth Innovation Hub (Oybek)',
    address: 'Toshkent sh., Mirobod tumani, Oybek ko‘chasi, 24',
    latitude: 41.295289,
    longitude: 69.271512,
    description: '13-18 yoshdagi o‘smirlar uchun interaktiv til va texnologiya markazi.',
    working_hours: 'Har kuni: 09:00 – 20:00',
    contact: '+998 71 200 45 46',
    available_courses: ['Interactive Speaking Labs', 'Grammar Bootcamp', 'English for Coders'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'loc-3',
    name: 'OSON Chilonzor Smart Branch',
    address: 'Toshkent sh., Chilonzor tumani, Qatortol ko‘chasi, 60',
    latitude: 41.282711,
    longitude: 69.204318,
    description: 'Qulay joylashuv, audio studiya va haftalik bepul Native Speaker uchrashuvlari.',
    working_hours: 'Dushanba – Shanba: 09:00 – 20:30',
    contact: '+998 71 200 45 47',
    available_courses: ['General English (A1-B2)', 'Speaking Club with Foreigners', 'Quiz Nights'],
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'loc-4',
    name: 'OSON Mirzo Ulug‘bek Hub',
    address: 'Toshkent sh., Mirzo Ulug‘bek tumani, Buyuk Ipak Yo‘li ko‘chasi, 112',
    latitude: 41.326829,
    longitude: 69.336712,
    description: 'Maktab o‘quvchilari uchun maxsus guruhlar, robototexnika va ingliz tili integratsiyasi.',
    working_hours: 'Dushanba – Shanba: 08:30 – 19:30',
    contact: '+998 71 200 45 48',
    available_courses: ['Teen Starter (A1)', 'Exam Prep', 'Debate Society'],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'loc-5',
    name: 'OSON Samarkand Regional Center',
    address: 'Samarqand sh., Registon ko‘chasi, 45B',
    latitude: 39.654876,
    longitude: 66.975765,
    description: 'Samarqanddagi ilk zamonaviy AI qo‘llab-quvvatlangan til laboratoriyasi.',
    working_hours: 'Dushanba – Shanba: 09:00 – 20:00',
    contact: '+998 66 230 11 22',
    available_courses: ['A1-C1 General English', 'Tourist English & Cultural Exchange', 'IELTS Express'],
    image: 'https://images.unsplash.com/photo-1568792923760-d70635a89fa1?w=600&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-1',
    first_name: 'Jasur',
    last_name: 'Aliyev',
    age: 16,
    phone: '+998 90 123 45 67',
    email: 'jasur@oson.uz',
    password: 'password123',
    role: 'USER',
    is_verified: true,
    is_active: true,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    current_level: 'A2',
    total_xp: 850,
    streak: 5,
    created_at: '2026-08-01T10:00:00Z'
  },
  {
    id: 'admin-1',
    first_name: 'Admin',
    last_name: 'OSON',
    age: 28,
    phone: '+998 99 999 88 77',
    email: 'admin@oson.uz',
    password: 'password123',
    role: 'ADMIN',
    is_verified: true,
    is_active: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    current_level: 'C2',
    total_xp: 5000,
    streak: 30,
    created_at: '2026-06-01T08:00:00Z'
  },
  // Sample leaderboard students
  {
    id: 'user-2',
    first_name: 'Azizbek',
    last_name: 'Nazarov',
    age: 17,
    phone: '+998 91 111 22 33',
    email: 'aziz@oson.uz',
    password: 'password123',
    role: 'USER',
    is_verified: true,
    is_active: true,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
    current_level: 'B2',
    total_xp: 2450,
    streak: 18,
    created_at: '2026-07-10T12:00:00Z'
  },
  {
    id: 'user-3',
    first_name: 'Anvar',
    last_name: 'Karimov',
    age: 15,
    phone: '+998 93 444 55 66',
    email: 'anvar@oson.uz',
    password: 'password123',
    role: 'USER',
    is_verified: true,
    is_active: true,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    current_level: 'B1',
    total_xp: 2320,
    streak: 14,
    created_at: '2026-07-12T15:00:00Z'
  },
  {
    id: 'user-4',
    first_name: 'Malika',
    last_name: 'Rustamova',
    age: 16,
    phone: '+998 94 777 88 99',
    email: 'malika@oson.uz',
    password: 'password123',
    role: 'USER',
    is_verified: true,
    is_active: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    current_level: 'B2',
    total_xp: 2100,
    streak: 12,
    created_at: '2026-07-20T11:00:00Z'
  },
  {
    id: 'user-5',
    first_name: 'Sardor',
    last_name: 'Ikromov',
    age: 14,
    phone: '+998 90 999 11 22',
    email: 'sardor@oson.uz',
    password: 'password123',
    role: 'USER',
    is_verified: true,
    is_active: true,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    current_level: 'A2',
    total_xp: 1870,
    streak: 9,
    created_at: '2026-07-25T14:00:00Z'
  },
  {
    id: 'user-6',
    first_name: 'Madina',
    last_name: 'Yusupova',
    age: 17,
    phone: '+998 98 333 22 11',
    email: 'madina@oson.uz',
    password: 'password123',
    role: 'USER',
    is_verified: true,
    is_active: true,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    current_level: 'B1',
    total_xp: 1640,
    streak: 8,
    created_at: '2026-08-02T16:00:00Z'
  }
];

export const INITIAL_DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'dc-1',
    title: 'Daily Vocabulary Sprint',
    title_uz: 'Kunlik So‘z Boyligi Maroqli',
    description: 'Review 5 flashcards using spaced repetition today.',
    xp_reward: 50,
    target_type: 'vocab',
    target_count: 5,
    progress: 3,
    completed: false
  },
  {
    id: 'dc-2',
    title: 'Voice Explorer',
    title_uz: 'Ovozli Sinov',
    description: 'Complete 1 Speaking Challenge or AI Conversation session.',
    xp_reward: 50,
    target_type: 'speaking',
    target_count: 1,
    progress: 1,
    completed: true
  }
];
