import { 
  Level, Course, Topic, Lesson, Word, Question, Quiz, 
  ConversationScenario, Achievement, LocationItem, User, DailyChallenge, Language 
} from '../types';

export const AVAILABLE_LANGUAGES: Language[] = [
  {
    code: 'fr',
    name: 'Fransuz tili',
    native_name: 'Français',
    flag: '🇫🇷',
    voice_lang: 'fr-FR',
    description: 'Parij sayohati, yoqimli talaffuz, san’at va qahvaxonalar tili.'
  },
  {
    code: 'en',
    name: 'Ingliz tili',
    native_name: 'English',
    flag: '🇬🇧',
    voice_lang: 'en-US',
    description: 'Xalqaro muloqot, IELTS, IT va video o‘yinlar tili.'
  },
  {
    code: 'ru',
    name: 'Rus tili',
    native_name: 'Русский',
    flag: '🇷🇺',
    voice_lang: 'ru-RU',
    description: 'Do‘stlar bilan suhbat, grammatika va boy adabiyot.'
  },
  {
    code: 'uz',
    name: 'O‘zbek tili',
    native_name: 'O‘zbekcha',
    flag: '🇺🇿',
    voice_lang: 'uz-UZ',
    description: 'Ona tili adabiyoti va so‘z boyligi.'
  }
];

export const INITIAL_LEVELS: Level[] = [
  {
    code: 'A1',
    name: 'Boshlang‘ich (Débutant / Starter)',
    order: 1,
    passing_score: 80,
    description: 'Oddiy salomlashuv, tanishuv, kundalik so‘zlar va asosiy iboralar.',
    color: 'from-emerald-500 to-teal-700',
    badge_icon: '🌱'
  },
  {
    code: 'A2',
    name: 'Elementar (Élémentaire / Elementary)',
    order: 2,
    passing_score: 80,
    description: 'Sayohat, kafe, qiziqishlar va o‘tgan zamon hikoyalari.',
    color: 'from-blue-500 to-indigo-700',
    badge_icon: '🌿'
  },
  {
    code: 'B1',
    name: 'O‘rta (Intermédiaire / Intermediate)',
    order: 3,
    passing_score: 85,
    description: 'Erkin suhbat, texnologiya, fikr bildirish va bahslar.',
    color: 'from-indigo-500 to-purple-700',
    badge_icon: '⚡'
  },
  {
    code: 'B2',
    name: 'Yuqori O‘rta (Avancé débutant / Upper-Int)',
    order: 4,
    passing_score: 85,
    description: 'Tezkor nutq, maqolalar va boy so‘z zaxirasi.',
    color: 'from-purple-500 to-pink-700',
    badge_icon: '🔥'
  },
  {
    code: 'C1',
    name: 'Ilg‘or (Avancé / Advanced)',
    order: 5,
    passing_score: 90,
    description: 'Akademik muloqot, insholar va professional bilim.',
    color: 'from-pink-500 to-rose-700',
    badge_icon: '💎'
  },
  {
    code: 'C2',
    name: 'Mukammal (Maîtrise / Proficiency)',
    order: 6,
    passing_score: 90,
    description: 'Ona tilidek erkin va chuqur daraja.',
    color: 'from-amber-500 to-yellow-700',
    badge_icon: '👑'
  }
];

export const INITIAL_COURSES: Course[] = [
  // ================= FRENCH COURSES (🇫🇷) =================
  {
    id: 'course-fr-1',
    level_code: 'A1',
    language_code: 'fr',
    title: '🇫🇷 Français Débutant: Bonjour Paris!',
    description: 'Parijda tanishuv, salomlashish, sonlar va asosiy fransuzcha iboralar.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80',
    duration: '3.5 soat (5 mavzu)',
    is_active: true,
    topics_count: 5,
    color_gradient: 'from-purple-500/20 to-pink-500/10 border-purple-500/30'
  },
  {
    id: 'course-fr-2',
    level_code: 'A2',
    language_code: 'fr',
    title: '🇫🇷 Au Café Parisien & Voyages',
    description: 'Fransuz kafesida kruassan buyurtma qilish, yo‘l so‘rash va sayohat.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop&q=80',
    duration: '4 soat (4 mavzu)',
    is_active: true,
    topics_count: 4,
    color_gradient: 'from-pink-500/20 to-rose-500/10 border-pink-500/30'
  },

  // ================= ENGLISH COURSES (🇬🇧) =================
  {
    id: 'course-en-1',
    level_code: 'A1',
    language_code: 'en',
    title: '🇬🇧 English Starter: Self & Family',
    description: 'O‘zingizni tanishtirish, oila a’zolari, yosh va sevimli mashg‘ulotlar.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
    duration: '4 soat (6 mavzu)',
    is_active: true,
    topics_count: 6,
    color_gradient: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30'
  },
  {
    id: 'course-en-2',
    level_code: 'A2',
    language_code: 'en',
    title: '🇬🇧 English Travel & City Navigation',
    description: 'Aeroportda suhbat, mehmonxona va shaharda erkin yo‘l so‘rash.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80',
    duration: '5 soat (6 mavzu)',
    is_active: true,
    topics_count: 6,
    color_gradient: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30'
  },

  // ================= RUSSIAN COURSES (🇷🇺) =================
  {
    id: 'course-ru-1',
    level_code: 'A1',
    language_code: 'ru',
    title: '🇷🇺 Русский язык: Привет и Знакомство',
    description: 'Tanishuv, maktab hayoti, do‘stlar va kundalik so‘zlashuv.',
    image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=600&auto=format&fit=crop&q=80',
    duration: '4 soat (5 mavzu)',
    is_active: true,
    topics_count: 5,
    color_gradient: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30'
  }
];

export const INITIAL_TOPICS: Topic[] = [
  // French Topics
  {
    id: 'topic-fr-1',
    course_id: 'course-fr-1',
    level_code: 'A1',
    language_code: 'fr',
    title: 'Bonjour et Présentation (Fransuzcha tanishuv)',
    description: 'Salomlashish (Bonjour, Salut), ism aytish va être fe’li.',
    order: 1,
    duration_minutes: 45,
    icon: '🇫🇷'
  },
  {
    id: 'topic-fr-2',
    course_id: 'course-fr-2',
    level_code: 'A2',
    language_code: 'fr',
    title: 'Au Café & Restaurant (Kafeda buyurtma)',
    description: 'Un croissant, s\'il vous plaît va hisob so‘rash.',
    order: 1,
    duration_minutes: 45,
    icon: '☕'
  },

  // English Topics
  {
    id: 'topic-en-1',
    course_id: 'course-en-1',
    level_code: 'A1',
    language_code: 'en',
    title: 'Introducing Yourself & Greetings',
    description: 'Salomlashish, ism-familiyani aytish va to be fe’lini ishlatish.',
    order: 1,
    duration_minutes: 45,
    icon: '👋'
  },
  {
    id: 'topic-en-2',
    course_id: 'course-en-2',
    level_code: 'A2',
    language_code: 'en',
    title: 'At the Airport & Checking In',
    description: 'Pasport nazorati, yuk topshirish va reys haqida ma’lumot olish.',
    order: 1,
    duration_minutes: 55,
    icon: '✈️'
  },

  // Russian Topics
  {
    id: 'topic-ru-1',
    course_id: 'course-ru-1',
    level_code: 'A1',
    language_code: 'ru',
    title: 'Приветствие и Знакомство',
    description: 'Как тебя зовут, сколько тебе лет va oddiy gaplar.',
    order: 1,
    duration_minutes: 45,
    icon: '🇷🇺'
  }
];

export const INITIAL_LESSONS: Lesson[] = [
  {
    id: 'lesson-fr-1-vocab',
    topic_id: 'topic-fr-1',
    title: 'Mots essentiels: Bonjour & Salutations',
    type: 'vocabulary',
    order: 1,
    xp_reward: 10,
    content: {
      summary: 'Fransuz tilida ilk tanishuvda kerak bo‘ladigan asosiy so‘zlar.'
    }
  },
  {
    id: 'lesson-fr-1-grammar',
    topic_id: 'topic-fr-1',
    title: 'Le verbe Être (Je suis, Tu es, Il est)',
    type: 'grammar',
    order: 2,
    xp_reward: 15,
    content: {
      summary: 'Être fe’li fransuz tilining asosi (bo‘lmoq).',
      rules: [
        {
          title: 'Je suis / Tu es / Il, Elle est',
          explanation: 'Egalarga qarab être fe’lining to‘g‘ri shakli qo‘yiladi.',
          example: 'Je suis Jasur. Tu es étudiant. Il est ami.'
        }
      ]
    }
  },
  {
    id: 'lesson-fr-1-listening',
    topic_id: 'topic-fr-1',
    title: 'Dialogue à Paris: Rencontre',
    type: 'listening',
    order: 3,
    xp_reward: 20,
    content: {
      listening_audio_text: "Bonjour! Je m'appelle Lucas. J'ai 14 ans et j'habite à Paris. Enchanté de faire votre connaissance!",
      dialogue: [
        { speaker: 'Lucas', text: 'Bonjour! Comment tu t\'appelles?', translation: 'Salom! Isming nima?' },
        { speaker: 'Jasur', text: 'Bonjour! Je m\'appelle Jasur. Enchanté!', translation: 'Salom! Mening ismim Jasur. Tanishganimdan xursandman!' }
      ]
    }
  },
  {
    id: 'lesson-fr-1-quiz',
    topic_id: 'topic-fr-1',
    title: 'Quiz Rapide: Français Débutant',
    type: 'quiz',
    order: 4,
    xp_reward: 30,
    content: {
      summary: 'O‘rgangan fransuzcha so‘zlaringizni test orqali sinang!'
    }
  },
  {
    id: 'lesson-fr-1-speaking',
    topic_id: 'topic-fr-1',
    title: 'Pratique Orale: Parlez en Français',
    type: 'speaking',
    order: 5,
    xp_reward: 40,
    content: {
      summary: 'Mikrofonda fransuzcha gapiring va AI bahosini oling.'
    }
  }
];

export const INITIAL_WORDS: Word[] = [
  // ================= FRENCH WORDS (🇫🇷) =================
  {
    id: 'w-fr-1',
    level_code: 'A1',
    language_code: 'fr',
    topic_id: 'topic-fr-1',
    word: 'Bonjour',
    phonetic: '/bɔ̃.ʒuʁ/',
    translation: 'Salom / Xayrli kun',
    example: 'Bonjour, comment allez-vous aujourd\'hui?',
    example_uz: 'Salom, bugun ahvollaringiz qanday?',
    difficulty: 'easy',
    part_of_speech: 'salutation'
  },
  {
    id: 'w-fr-2',
    level_code: 'A1',
    language_code: 'fr',
    topic_id: 'topic-fr-1',
    word: 'Merci',
    phonetic: '/mɛʁ.si/',
    translation: 'Rahmat',
    example: 'Merci beaucoup pour votre gentillesse!',
    example_uz: 'Mehribonligingiz uchun katta rahmat!',
    difficulty: 'easy',
    part_of_speech: 'interjection'
  },
  {
    id: 'w-fr-3',
    level_code: 'A1',
    language_code: 'fr',
    topic_id: 'topic-fr-1',
    word: 'S\'il vous plaît',
    phonetic: '/sil vu plɛ/',
    translation: 'Iltimos',
    example: 'Un croissant chaud, s\'il vous plaît!',
    example_uz: 'Bitta issiq kruassan bering, iltimos!',
    difficulty: 'easy',
    part_of_speech: 'phrase'
  },
  {
    id: 'w-fr-4',
    level_code: 'A1',
    language_code: 'fr',
    topic_id: 'topic-fr-1',
    word: 'Ami',
    phonetic: '/a.mi/',
    translation: 'Do‘st, o‘rtoq',
    example: 'Lucas est mon meilleur ami à l\'école.',
    example_uz: 'Lucas maktabdagi eng yaxshi do‘stim.',
    difficulty: 'easy',
    part_of_speech: 'noun'
  },
  {
    id: 'w-fr-5',
    level_code: 'A2',
    language_code: 'fr',
    topic_id: 'topic-fr-2',
    word: 'Voyage',
    phonetic: '/vwa.jaʒ/',
    translation: 'Sayohat',
    example: 'Nous préparons un voyage formidable à Paris.',
    example_uz: 'Biz Parijga ajoyib sayohat tayyorlayapmiz.',
    difficulty: 'medium',
    part_of_speech: 'noun'
  },
  {
    id: 'w-fr-6',
    level_code: 'A2',
    language_code: 'fr',
    topic_id: 'topic-fr-2',
    word: 'Délicieux',
    phonetic: '/de.li.sjø/',
    translation: 'Juda mazali',
    example: 'Ce chocolat chaud français est délicieux!',
    example_uz: 'Bu fransuzcha issiq shokolad juda mazali!',
    difficulty: 'easy',
    part_of_speech: 'adjective'
  },

  // ================= ENGLISH WORDS (🇬🇧) =================
  {
    id: 'w-en-1',
    level_code: 'A1',
    language_code: 'en',
    topic_id: 'topic-en-1',
    word: 'Greeting',
    phonetic: '/ˈɡriːtɪŋ/',
    translation: 'Salomlashish',
    example: 'A friendly greeting makes everyone smile.',
    example_uz: 'Samimiy salomlashish har kimni jilmaytiradi.',
    difficulty: 'easy',
    part_of_speech: 'noun'
  },
  {
    id: 'w-en-2',
    level_code: 'A1',
    language_code: 'en',
    topic_id: 'topic-en-1',
    word: 'Delicious',
    phonetic: '/dɪˈlɪʃəs/',
    translation: 'Juda mazali',
    example: 'Traditional Uzbek plov is absolutely delicious.',
    example_uz: 'Milliy o‘zbek palovi juda mazali.',
    difficulty: 'easy',
    part_of_speech: 'adjective'
  },
  {
    id: 'w-en-3',
    level_code: 'A2',
    language_code: 'en',
    topic_id: 'topic-en-2',
    word: 'Destination',
    phonetic: '/ˌdestɪˈneɪʃn/',
    translation: 'Boriladigan manzil',
    example: 'London is our final travel destination.',
    example_uz: 'London — bizning yakuniy sayohat manzilimiz.',
    difficulty: 'medium',
    part_of_speech: 'noun'
  },
  {
    id: 'w-en-4',
    level_code: 'B1',
    language_code: 'en',
    topic_id: 'topic-en-1',
    word: 'Artificial',
    phonetic: '/ˌɑːtɪˈfɪʃl/',
    translation: 'Sun’iy',
    example: 'Artificial intelligence helps teens learn languages faster.',
    example_uz: 'Sun’iy intellekt o‘smirlarga tilni tezroq o‘rganishga yordam beradi.',
    difficulty: 'medium',
    part_of_speech: 'adjective'
  },

  // ================= RUSSIAN WORDS (🇷🇺) =================
  {
    id: 'w-ru-1',
    level_code: 'A1',
    language_code: 'ru',
    topic_id: 'topic-ru-1',
    word: 'Приветствие',
    phonetic: '[Privetstviye]',
    translation: 'Salomlashish',
    example: 'Приветствие с улыбкой всегда приятно.',
    example_uz: 'Tabassum bilan salomlashish doim yoqimli.',
    difficulty: 'easy',
    part_of_speech: 'noun'
  },
  {
    id: 'w-ru-2',
    level_code: 'A1',
    language_code: 'ru',
    topic_id: 'topic-ru-1',
    word: 'Дружба',
    phonetic: '[Druzhba]',
    translation: 'Do‘stlik',
    example: 'Крепкая дружба помогает в учебе.',
    example_uz: 'Mustahkam do‘stlik o‘qishda yordam beradi.',
    difficulty: 'easy',
    part_of_speech: 'noun'
  },
  {
    id: 'w-ru-3',
    level_code: 'A2',
    language_code: 'ru',
    topic_id: 'topic-ru-1',
    word: 'Путешествие',
    phonetic: '[Puteshestviye]',
    translation: 'Sayohat',
    example: 'Летнее путешествие в горы было прекрасным.',
    example_uz: 'Tog‘larga yozgi sayohat ajoyib o‘tdi.',
    difficulty: 'medium',
    part_of_speech: 'noun'
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  // ================= FRENCH QUESTIONS (🇫🇷) =================
  {
    id: 'q-fr-1',
    level_code: 'A1',
    language_code: 'fr',
    quiz_id: 'quiz-fr-1',
    question: 'Comment dit-on "Salom / Xayrli kun" en français?',
    question_type: 'multiple_choice',
    options: ['Bonjour', 'Bonsoir', 'Merci', 'Au revoir'],
    correct_answer: 'Bonjour',
    explanation: '"Bonjour" — fransuz tilida kunduzgi eng mashhur salomlashuv.'
  },
  {
    id: 'q-fr-2',
    level_code: 'A1',
    language_code: 'fr',
    quiz_id: 'quiz-fr-1',
    question: 'Complétez la phrase: "Je ______ un élève de 14 ans."',
    question_type: 'multiple_choice',
    options: ['suis', 'es', 'est', 'sommes'],
    correct_answer: 'suis',
    explanation: '"Je" (Men) uchun être fe’lining shakli "suis" (Je suis).'
  },
  {
    id: 'q-fr-3',
    level_code: 'A1',
    language_code: 'fr',
    quiz_id: 'quiz-fr-1',
    question: 'Au café de Paris: "Un croissant et un jus, s\'il vous ______."',
    question_type: 'multiple_choice',
    options: ['plaît', 'merci', 'va', 'est'],
    correct_answer: 'plaît',
    explanation: '"S\'il vous plaît" — fransuzcha muloyim "iltimos" degani.'
  },
  {
    id: 'q-fr-4',
    level_code: 'A2',
    language_code: 'fr',
    quiz_id: 'quiz-fr-2',
    question: 'Passé composé: "Hier, nous ______ visité la Tour Eiffel."',
    question_type: 'multiple_choice',
    options: ['avons', 'sommes', 'avez', 'sont'],
    correct_answer: 'avons',
    explanation: 'Visiter fe’li o‘tgan zamonda avoir bilan tuslanadi: "nous avons visité".'
  },
  {
    id: 'q-fr-5',
    level_code: 'A2',
    language_code: 'fr',
    quiz_id: 'quiz-fr-2',
    question: 'Comment demande-t-on l\'heure? "Quelle ______ est-il?"',
    question_type: 'multiple_choice',
    options: ['heure', 'temps', 'minute', 'montre'],
    correct_answer: 'heure',
    explanation: 'Fransuzcha soatni so‘rash: "Quelle heure est-il?" (Soat necha bo‘ldi?).'
  },

  // ================= ENGLISH QUESTIONS (🇬🇧) =================
  {
    id: 'q-en-1',
    level_code: 'A1',
    language_code: 'en',
    quiz_id: 'quiz-en-1',
    question: 'Choose the correct form: "She ______ a 14-year-old student."',
    question_type: 'multiple_choice',
    options: ['am', 'is', 'are', 'be'],
    correct_answer: 'is',
    explanation: '"She" uchun "is" yordamchi fe’li ishlatiladi.'
  },
  {
    id: 'q-en-2',
    level_code: 'A1',
    language_code: 'en',
    quiz_id: 'quiz-en-1',
    question: 'How do you respond politely to "Nice to meet you"?',
    question_type: 'multiple_choice',
    options: ['Nice to meet you too!', 'Good bye!', 'I am fine.', 'No problem.'],
    correct_answer: 'Nice to meet you too!',
    explanation: '"Nice to meet you" ga javoban "Nice to meet you too!" deyiladi.'
  },
  {
    id: 'q-en-3',
    level_code: 'A2',
    language_code: 'en',
    quiz_id: 'quiz-en-2',
    question: 'Past simple: "Yesterday we ______ to Samarkand by train."',
    question_type: 'multiple_choice',
    options: ['travelled', 'travels', 'travel', 'travelling'],
    correct_answer: 'travelled',
    explanation: '"Yesterday" o‘tgan zamon bo‘lgani uchun "travelled" to‘g‘ri.'
  },
  {
    id: 'q-en-4',
    level_code: 'B1',
    language_code: 'en',
    quiz_id: 'quiz-en-2',
    question: 'Conditionals: "If teenagers ______ more time reading, their vocabulary would expand."',
    question_type: 'multiple_choice',
    options: ['spent', 'spend', 'will spend', 'had spent'],
    correct_answer: 'spent',
    explanation: 'Second Conditional: If + Past Simple (spent), would + V1.'
  },

  // ================= RUSSIAN QUESTIONS (🇷🇺) =================
  {
    id: 'q-ru-1',
    level_code: 'A1',
    language_code: 'ru',
    quiz_id: 'quiz-ru-1',
    question: 'Выберите правильный ответ: "Меня ______ Тимур, мне 14 лет."',
    question_type: 'multiple_choice',
    options: ['зовут', 'имя', 'называют', 'сказать'],
    correct_answer: 'зовут',
    explanation: 'Rus tilida ismni aytishda "Меня зовут..." iborasi qo‘llaniladi.'
  },
  {
    id: 'q-ru-2',
    level_code: 'A1',
    language_code: 'ru',
    quiz_id: 'quiz-ru-1',
    question: 'Как ответить на вежливое "Спасибо большое"?',
    question_type: 'multiple_choice',
    options: ['Пожалуйста!', 'До свидания.', 'Привет.', 'Ничего.'],
    correct_answer: 'Пожалуйста!',
    explanation: '"Спасибо" ga javoban "Пожалуйста!" (Arzimaydi) deyiladi.'
  },
  {
    id: 'q-ru-3',
    level_code: 'A2',
    language_code: 'ru',
    quiz_id: 'quiz-ru-1',
    question: 'Вставьте пропущенное слово: "Вчера мы ______ интересный фильм."',
    question_type: 'multiple_choice',
    options: ['смотрели', 'смотрим', 'будем смотреть', 'посмотреть'],
    correct_answer: 'смотрели',
    explanation: '"Вчера" (kecha) o‘tgan zamon bo‘lgani uchun "смотрели" to‘g‘ri.'
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  // French Quizzes (🇫🇷)
  {
    id: 'quiz-fr-1',
    level_code: 'A1',
    language_code: 'fr',
    title: '🇫🇷 Français A1: Bonjour Paris & Salutations',
    description: 'Fransuzcha salomlashish, être fe’li va kafeda buyurtma berish.',
    question_count: 3,
    xp_reward: 35,
    passing_score: 80,
    time_limit_seconds: 150
  },
  {
    id: 'quiz-fr-2',
    level_code: 'A2',
    language_code: 'fr',
    title: '🇫🇷 Français A2: Voyages & Passé Composé',
    description: 'Eyfel minorasi sayohati, o‘tgan zamon va soatni aytish.',
    question_count: 2,
    xp_reward: 40,
    passing_score: 80,
    time_limit_seconds: 120
  },

  // English Quizzes (🇬🇧)
  {
    id: 'quiz-en-1',
    level_code: 'A1',
    language_code: 'en',
    title: '🇬🇧 English A1: Starter Greetings & Basics',
    description: 'Salomlashish, to be fe’li va asosiy gap tuzilishi.',
    question_count: 2,
    xp_reward: 30,
    passing_score: 80,
    time_limit_seconds: 120
  },
  {
    id: 'quiz-en-2',
    level_code: 'A2',
    language_code: 'en',
    title: '🇬🇧 English A2: Travel & Conditionals',
    description: 'Aeroport, sayohat va o‘tgan zamon bo‘yicha test.',
    question_count: 2,
    xp_reward: 35,
    passing_score: 80,
    time_limit_seconds: 120
  },

  // Russian Quizzes (🇷🇺)
  {
    id: 'quiz-ru-1',
    level_code: 'A1',
    language_code: 'ru',
    title: '🇷🇺 Русский язык A1: Тест для начинающих',
    description: 'Знакомство, вежливые фразы и прошедшее время.',
    question_count: 3,
    xp_reward: 35,
    passing_score: 80,
    time_limit_seconds: 150
  }
];

export const SPEAKING_TOPICS = [
  // French Speaking
  {
    id: 'spk-fr-1',
    level_code: 'A1',
    language_code: 'fr',
    title: '🇫🇷 Français: Présentez-vous à Paris',
    prompt: 'Dites votre nom, votre âge et ce que vous aimez faire en français.',
    prompt_uz: 'Fransuz tilida ismingiz, yoshingiz va sevimli mashg‘ulotingizni ayting.',
    sample_text: 'Bonjour! Je m\'appelle Jasur. J\'ai 14 ans et j\'habite à Tachkent. J\'aime la musique et les voyages.',
    keywords: ['bonjour', 'je m\'appelle', 'j\'ai', 'j\'aime'],
    duration_suggested: '30 soniya'
  },
  {
    id: 'spk-fr-2',
    level_code: 'A2',
    language_code: 'fr',
    title: '🇫🇷 Au Café: Commander un Croissant et Café',
    prompt: 'Commandez votre petit-déjeuner préféré dans un café parisien.',
    prompt_uz: 'Parij kafesida kruassan va ichimlik buyurtma bering.',
    sample_text: 'Bonjour monsieur! Je voudrais un croissant chaud et un chocolat s\'il vous plaît. Merci beaucoup!',
    keywords: ['bonjour', 'je voudrais', 's\'il vous plaît', 'merci'],
    duration_suggested: '30 soniya'
  },

  // English Speaking
  {
    id: 'spk-en-1',
    level_code: 'A1',
    language_code: 'en',
    title: '🇬🇧 English: Introduce Yourself & Your Hobby',
    prompt: 'Tell us your name, age, city, and what you love doing in your free time.',
    prompt_uz: 'Ismingiz, yoshingiz, yashash shahringiz va sevimli mashg‘ulotingiz haqida gapiring.',
    sample_text: 'Hello, my name is Jasur. I am 14 years old and I live in Tashkent. In my free time, I love playing football and learning languages.',
    keywords: ['name', 'years old', 'live in', 'free time', 'hobby'],
    duration_suggested: '30 soniya'
  },

  // Russian Speaking
  {
    id: 'spk-ru-1',
    level_code: 'A1',
    language_code: 'ru',
    title: '🇷🇺 Русский: Расскажи о себе и друзьях',
    prompt: 'Как тебя зовут, сколько тебе лет и чем ты любишь заниматься?',
    prompt_uz: 'O‘zingiz, yoshingiz va qiziqishlaringiz haqida rus tilida gapiring.',
    sample_text: 'Привет! Меня зовут Тимур. Мне 14 лет, я живу в Ташкенте. Я люблю играть в футбол и учить новые языки.',
    keywords: ['меня зовут', 'мне лет', 'я живу', 'люблю'],
    duration_suggested: '30 soniya'
  }
];

export const CONVERSATION_SCENARIOS: ConversationScenario[] = [
  // French AI Scenario
  {
    id: 'sc-fr-chat',
    title: 'Ami Parisien (Français Débutant)',
    title_uz: 'Fransuz do‘st bilan suhbat (Parij)',
    icon: '🇫🇷',
    description: 'Pratiquez le français simplement: commander au café, salutations et école.',
    level_min: 'A1',
    ai_role: 'Ami Parisien (Lucas)',
    user_role: 'Élève',
    initial_message: "Bonjour mon ami! Je m'appelle Lucas, j'ai 15 ans et j'habite à Paris. Bienvenue en France! Comment vas-tu aujourd'hui?",
    suggested_replies: [
      "Bonjour Lucas! Je vais très bien, merci!",
      "Je voudrais commander un croissant et un café, s'il vous plaît.",
      "Quel est ton endroit préféré à Paris?"
    ]
  },

  // English AI Scenario
  {
    id: 'sc-freechat',
    title: 'Free Conversation AI Coach (English)',
    title_uz: 'Erkin Suhbat (Ingliz tili)',
    icon: '🇬🇧',
    description: 'Istalgan mavzuda (o‘yinlar, film, darslar) erkin gaplashing.',
    level_min: 'A1',
    ai_role: 'Friendly English Buddy (Alex)',
    user_role: 'Teen Student',
    initial_message: "Hey! I'm Alex, your AI study buddy. You can chat with me about games, school, movies, or daily life. What's on your mind today?",
    suggested_replies: [
      "Tell me a fun joke in English!",
      "What are your favorite video games?",
      "How can I practice speaking every day?"
    ]
  },

  // Russian AI Scenario
  {
    id: 'sc-ru-chat',
    title: 'Русский собеседник (Дружеский чат)',
    title_uz: 'Rus tilida jonli muloqot',
    icon: '🇷🇺',
    description: 'Поговори на русском языке на любую тему: школа, хобби, спорт.',
    level_min: 'A1',
    ai_role: 'Друг-помощник (Максим)',
    user_role: 'Ученик',
    initial_message: "Привет! Меня зовут Максим. Мы можем поговорить о твоих любимых играх, фильмах или уроках. Как у тебя дела?",
    suggested_replies: [
      "Привет, Максим! У меня всё отлично!",
      "Расскажи интересную историю или шутку.",
      "В какие игры ты любишь играть?"
    ]
  }
];

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'First Step',
    title_uz: 'Ilk Qadam',
    description: 'Complete your first lesson or quiz.',
    description_uz: 'Birinchi dars yoki testni yakunlang.',
    icon: '🎯',
    xp_reward: 50,
    category: 'general',
    condition_type: 'lessons_completed',
    condition_target: 1
  },
  {
    id: 'ach-2',
    title: '7 Day Warrior',
    title_uz: '7 Kunlik Olov (Streak)',
    description: 'Maintain a 7-day daily study streak.',
    description_uz: 'Ketma-ket 7 kun davomida o‘qing.',
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
    description: 'Complete 3 speaking challenges.',
    description_uz: '3 ta speaking mashqini muvaffaqiyatli bajaring.',
    icon: '🎙️',
    xp_reward: 200,
    category: 'speaking',
    condition_type: 'speaking_count',
    condition_target: 3
  }
];

export const INITIAL_LOCATIONS: LocationItem[] = [
  {
    id: 'loc-1',
    name: 'OSON Central Campus',
    address: 'Toshkent sh., Amir Temur shoh ko‘chasi, 107A',
    latitude: 41.311081,
    longitude: 69.279737,
    description: 'Speaking Club, interaktiv kompyuter xonasi va o‘smirlar coworking maydoni.',
    working_hours: '08:30 – 21:00',
    contact: '+998 71 200 45 45',
    available_courses: ['Fransuz tili (Français)', 'Ingliz tili (English)', 'Rus tili (Русский)'],
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'loc-2',
    name: 'OSON Youth Hub (Oybek)',
    address: 'Toshkent sh., Mirobod tumani, Oybek ko‘chasi, 24',
    latitude: 41.295289,
    longitude: 69.271512,
    description: 'O‘smirlar uchun robototexnika va til o‘rganish markazi.',
    working_hours: '09:00 – 20:00',
    contact: '+998 71 200 45 46',
    available_courses: ['French Speaking Lab', 'English Lab', 'Coders Club'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: 'user-1',
    first_name: 'Jasur',
    last_name: 'Aliyev',
    age: 13,
    phone: '+998 90 123 45 67',
    email: 'jasur@oson.uz',
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
    role: 'ADMIN',
    is_verified: true,
    is_active: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    current_level: 'C2',
    total_xp: 5000,
    streak: 30,
    created_at: '2026-06-01T08:00:00Z'
  },
  {
    id: 'user-2',
    first_name: 'Azizbek',
    last_name: 'Nazarov',
    age: 14,
    phone: '+998 91 111 22 33',
    email: 'aziz@oson.uz',
    role: 'USER',
    is_verified: true,
    is_active: true,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
    current_level: 'B1',
    total_xp: 2450,
    streak: 18,
    created_at: '2026-07-10T12:00:00Z'
  }
];

export const INITIAL_DAILY_CHALLENGES: DailyChallenge[] = [
  {
    id: 'dc-1',
    title: 'Kunlik 5 ta yangi so‘z',
    title_uz: '5 ta yangi so‘zni kartochkalarda takrorlang',
    description: 'Review 5 flashcards today.',
    xp_reward: 50,
    target_type: 'vocab',
    target_count: 5,
    progress: 3,
    completed: false
  },
  {
    id: 'dc-2',
    title: 'Ovozli suhbat',
    title_uz: 'AI Do‘stimiz bilan 1 ta audio suhbat',
    description: 'Complete 1 Speaking session.',
    xp_reward: 50,
    target_type: 'speaking',
    target_count: 1,
    progress: 1,
    completed: true
  }
];
