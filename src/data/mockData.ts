import { 
  Level, Course, Topic, Lesson, Word, Question, Quiz, 
  ConversationScenario, Achievement, LocationItem, User, DailyChallenge, Language 
} from '../types';

export const AVAILABLE_LANGUAGES: Language[] = [
  {
    code: 'en',
    name: 'Ingliz tili',
    native_name: 'English',
    flag: '🇬🇧',
    voice_lang: 'en-US',
    description: 'Xalqaro muloqot, IELTS, IT va sayohat tili.'
  },
  {
    code: 'ru',
    name: 'Rus tili',
    native_name: 'Русский',
    flag: '🇷🇺',
    voice_lang: 'ru-RU',
    description: 'Grammatika, boy leksika va erkin so‘zlashuv.'
  },
  {
    code: 'fr',
    name: 'Fransuz tili',
    native_name: 'Français',
    flag: '🇫🇷',
    voice_lang: 'fr-FR',
    description: 'San’at, madaniyat, nozik talaffuz va DELF imtihonlari.'
  },
  {
    code: 'uz',
    name: 'O‘zbek tili',
    native_name: 'O‘zbekcha',
    flag: '🇺🇿',
    voice_lang: 'uz-UZ',
    description: 'Ona tili fundamenti va adabiy so‘z boyligi.'
  }
];

export const INITIAL_LEVELS: Level[] = [
  {
    code: 'A1',
    name: 'Boshlang‘ich (Starter)',
    order: 1,
    passing_score: 80,
    description: 'Eng oddiy iboralar, tanishuv, kundalik so‘zlar va asosiy qoidalar.',
    color: 'from-emerald-500 to-teal-700',
    badge_icon: '🌱'
  },
  {
    code: 'A2',
    name: 'Elementar (Elementary)',
    order: 2,
    passing_score: 80,
    description: 'Sayohat, do‘konda xarid, qiziqishlar va oddiy hikoyalar.',
    color: 'from-blue-500 to-indigo-700',
    badge_icon: '🌿'
  },
  {
    code: 'B1',
    name: 'O‘rta (Intermediate)',
    order: 3,
    passing_score: 85,
    description: 'Texnologiyalar, fikr bildirish va erkin suhbatlashish.',
    color: 'from-indigo-500 to-purple-700',
    badge_icon: '⚡'
  },
  {
    code: 'B2',
    name: 'Yuqori O‘rta (Upper-Int)',
    order: 4,
    passing_score: 85,
    description: 'Tezkor nutq, munozaralar va boy so‘z zaxirasi.',
    color: 'from-purple-500 to-pink-700',
    badge_icon: '🔥'
  },
  {
    code: 'C1',
    name: 'Ilg‘or (Advanced)',
    order: 5,
    passing_score: 90,
    description: 'Akademik insho, idiomalar va professional muloqot.',
    color: 'from-pink-500 to-rose-700',
    badge_icon: '💎'
  },
  {
    code: 'C2',
    name: 'Mukammal (Proficiency)',
    order: 6,
    passing_score: 90,
    description: 'Ona tilidek erkin va chuqur daraja.',
    color: 'from-amber-500 to-yellow-700',
    badge_icon: '👑'
  }
];

export const INITIAL_COURSES: Course[] = [
  // English Courses
  {
    id: 'course-a1-1',
    level_code: 'A1',
    language_code: 'en',
    title: 'Introducing Yourself & Family',
    description: 'O‘zingizni tanishtirish, oila a’zolari, yosh va kasblar haqida gapirish.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&auto=format&fit=crop&q=80',
    duration: '4 soat (6 mavzu)',
    is_active: true,
    topics_count: 6,
    color_gradient: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30'
  },
  {
    id: 'course-a2-1',
    level_code: 'A2',
    language_code: 'en',
    title: 'Travel, Airports & Navigation',
    description: 'Sayohat qilish, aeroportda suhbat va shaharda yo‘l so‘rash.',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&auto=format&fit=crop&q=80',
    duration: '5 soat (6 mavzu)',
    is_active: true,
    topics_count: 6,
    color_gradient: 'from-blue-500/20 to-indigo-500/10 border-blue-500/30'
  },
  // Russian Courses
  {
    id: 'course-ru-a1',
    level_code: 'A1',
    language_code: 'ru',
    title: 'Русский язык для начинающих (A1)',
    description: 'Знакомство, простые фразы, семья и базовые глаголы.',
    image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=600&auto=format&fit=crop&q=80',
    duration: '4 soat (5 mavzu)',
    is_active: true,
    topics_count: 5,
    color_gradient: 'from-blue-500/20 to-cyan-500/10 border-blue-500/30'
  },
  // French Courses
  {
    id: 'course-fr-a1',
    level_code: 'A1',
    language_code: 'fr',
    title: 'Français Débutant: Bonjour Paris! (A1)',
    description: 'Salutations, café, nombres et premiers mots en français.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&auto=format&fit=crop&q=80',
    duration: '4 soat (5 mavzu)',
    is_active: true,
    topics_count: 5,
    color_gradient: 'from-purple-500/20 to-pink-500/10 border-purple-500/30'
  }
];

export const INITIAL_TOPICS: Topic[] = [
  {
    id: 'topic-a1-1',
    course_id: 'course-a1-1',
    level_code: 'A1',
    language_code: 'en',
    title: 'Introducing Yourself & Greetings',
    description: 'Salomlashish, ism-familiyani aytish va to be fe’lini ishlatish.',
    order: 1,
    duration_minutes: 45,
    icon: '👋'
  },
  {
    id: 'topic-a2-1',
    course_id: 'course-a2-1',
    level_code: 'A2',
    language_code: 'en',
    title: 'At the Airport & Checking In',
    description: 'Pasport nazorati, yuk topshirish va reys haqida ma’lumot olish.',
    order: 1,
    duration_minutes: 55,
    icon: '✈️'
  },
  {
    id: 'topic-ru-1',
    course_id: 'course-ru-a1',
    level_code: 'A1',
    language_code: 'ru',
    title: 'Приветствие и Знакомство (Salomlashuv)',
    description: 'Как тебя зовут, откуда ты и простые фразы.',
    order: 1,
    duration_minutes: 45,
    icon: '🇷🇺'
  },
  {
    id: 'topic-fr-1',
    course_id: 'course-fr-a1',
    level_code: 'A1',
    language_code: 'fr',
    title: 'Bonjour et Présentation (Fransuzcha tanishuv)',
    description: 'Comment vous vous appelez va chiroyli talaffuz.',
    order: 1,
    duration_minutes: 45,
    icon: '🇫🇷'
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
          example: 'I am a student. She is ready. We are friends.'
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
        { speaker: 'Alex', text: 'Hello! What is your name?', translation: 'Salom! Ismingiz nima?' },
        { speaker: 'Jasur', text: 'Hi! My name is Jasur. Nice to meet you.', translation: 'Salom! Mening ismim Jasur.' }
      ]
    }
  },
  {
    id: 'lesson-a1-1-quiz',
    topic_id: 'topic-a1-1',
    title: 'A1 Greetings Quick Check',
    type: 'quiz',
    order: 4,
    xp_reward: 30,
    content: {
      summary: 'Tezkor test orqali bilimlaringizni sinab ko‘ring!'
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
      summary: 'Mikrofonni yoqing va o‘zingizni tanishtiring.'
    }
  }
];

export const INITIAL_WORDS: Word[] = [
  // ENGLISH WORDS
  {
    id: 'w-en-1',
    level_code: 'A1',
    language_code: 'en',
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
    id: 'w-en-2',
    level_code: 'A1',
    language_code: 'en',
    topic_id: 'topic-a1-1',
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
    id: 'w-en-4',
    level_code: 'B1',
    language_code: 'en',
    topic_id: 'topic-a1-1',
    word: 'Artificial',
    phonetic: '/ˌɑːtɪˈfɪʃl/',
    translation: 'Sun’iy',
    example: 'Artificial intelligence helps teens learn languages faster.',
    example_uz: 'Sun’iy intellekt o‘smirlarga tilni tezroq o‘rganishga yordam beradi.',
    difficulty: 'medium',
    part_of_speech: 'adjective'
  },

  // RUSSIAN WORDS
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
  },

  // FRENCH WORDS
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
    part_of_speech: 'greeting'
  },
  {
    id: 'w-fr-2',
    level_code: 'A1',
    language_code: 'fr',
    topic_id: 'topic-fr-1',
    word: 'Merci',
    phonetic: '/mɛʁ.si/',
    translation: 'Rahmat',
    example: 'Merci beaucoup pour votre aide!',
    example_uz: 'Yordamingiz uchun katta rahmat!',
    difficulty: 'easy',
    part_of_speech: 'interjection'
  },
  {
    id: 'w-fr-3',
    level_code: 'A2',
    language_code: 'fr',
    topic_id: 'topic-fr-1',
    word: 'Voyage',
    phonetic: '/vwa.jaʒ/',
    translation: 'Sayohat',
    example: 'Bon voyage et à bientôt!',
    example_uz: 'Oq yo‘l va ko‘rishguncha!',
    difficulty: 'medium',
    part_of_speech: 'noun'
  }
];

export const INITIAL_QUESTIONS: Question[] = [
  // ENGLISH QUESTIONS
  {
    id: 'q-en-1',
    level_code: 'A1',
    language_code: 'en',
    quiz_id: 'quiz-a1-1',
    question: 'Choose the correct form: "She ______ a 15-year-old student."',
    question_type: 'multiple_choice',
    options: ['am', 'is', 'are', 'be'],
    correct_answer: 'is',
    explanation: '"She" uchun "is" yordamchi fe’li ishlatiladi.'
  },
  {
    id: 'q-en-2',
    level_code: 'A1',
    language_code: 'en',
    quiz_id: 'quiz-a1-1',
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
    quiz_id: 'quiz-a2-1',
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
    quiz_id: 'quiz-b1-1',
    question: 'Conditionals: "If teenagers ______ more time reading, their vocabulary would expand."',
    question_type: 'multiple_choice',
    options: ['spent', 'spend', 'will spend', 'had spent'],
    correct_answer: 'spent',
    explanation: 'Second Conditional: If + Past Simple (spent), would + V1.'
  },

  // RUSSIAN QUESTIONS
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
  },

  // FRENCH QUESTIONS
  {
    id: 'q-fr-1',
    level_code: 'A1',
    language_code: 'fr',
    quiz_id: 'quiz-fr-1',
    question: 'Comment dit-on "Xayrli tong / Salom" en français?',
    question_type: 'multiple_choice',
    options: ['Bonjour', 'Bonsoir', 'Merci', 'Au revoir'],
    correct_answer: 'Bonjour',
    explanation: '"Bonjour" — fransuz tilida kunduzgi umumiy salomlashuv.'
  },
  {
    id: 'q-fr-2',
    level_code: 'A1',
    language_code: 'fr',
    quiz_id: 'quiz-fr-1',
    question: 'Complétez la phrase: "Je ______ un étudiant de 15 ans."',
    question_type: 'multiple_choice',
    options: ['suis', 'es', 'est', 'sommes'],
    correct_answer: 'suis',
    explanation: 'Fransuz tilida "Je" (Men) uchun être fe’lining "suis" shakli ishlatiladi.'
  },
  {
    id: 'q-fr-3',
    level_code: 'A2',
    language_code: 'fr',
    quiz_id: 'quiz-fr-1',
    question: 'Au café: "Un croissant et un café, s\'il vous ______."',
    question_type: 'multiple_choice',
    options: ['plaît', 'merci', 'va', 'est'],
    correct_answer: 'plaît',
    explanation: '"S\'il vous plaît" — iltimos degan muloyim ibora.'
  }
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz-a1-1',
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
    id: 'quiz-a2-1',
    level_code: 'A2',
    language_code: 'en',
    title: '🇬🇧 English A2: Travel & Past Simple',
    description: 'Aeroport, sayohat va o‘tgan zamon bo‘yicha test.',
    question_count: 2,
    xp_reward: 35,
    passing_score: 80,
    time_limit_seconds: 120
  },
  {
    id: 'quiz-b1-1',
    level_code: 'B1',
    language_code: 'en',
    title: '🇬🇧 English B1: Conditionals & Fluency',
    description: 'Shart mayli, leksika va murakkab gaplar.',
    question_count: 2,
    xp_reward: 40,
    passing_score: 80,
    time_limit_seconds: 120
  },
  {
    id: 'quiz-ru-1',
    level_code: 'A1',
    language_code: 'ru',
    title: '🇷🇺 Русский язык: Тест для начинающих (A1)',
    description: 'Знакомство, вежливые фразы и прошедшее время.',
    question_count: 3,
    xp_reward: 35,
    passing_score: 80,
    time_limit_seconds: 150
  },
  {
    id: 'quiz-fr-1',
    level_code: 'A1',
    language_code: 'fr',
    title: '🇫🇷 Français: Quiz Débutant & Salutations (A1)',
    description: 'Bonjour, verbe être et phrases du quotidien.',
    question_count: 3,
    xp_reward: 35,
    passing_score: 80,
    time_limit_seconds: 150
  }
];

export const SPEAKING_TOPICS = [
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
  },
  {
    id: 'spk-fr-1',
    level_code: 'A1',
    language_code: 'fr',
    title: '🇫🇷 Français: Présentez-vous à Paris',
    prompt: 'Dites votre nom, votre âge et ce que vous aimez faire.',
    prompt_uz: 'Fransuz tilida ismingiz, yoshingiz va sevimli mashg‘ulotingizni ayting.',
    sample_text: 'Bonjour! Je m\'appelle Jasur. J\'ai 14 ans et j\'habite à Tachkent. J\'aime la musique et les voyages.',
    keywords: ['bonjour', 'je m\'appelle', 'j\'ai', 'j\'aime'],
    duration_suggested: '30 soniya'
  }
];

export const CONVERSATION_SCENARIOS: ConversationScenario[] = [
  {
    id: 'sc-freechat',
    title: 'Free Conversation AI Coach (English)',
    title_uz: 'Erkin Suhbat (Ingliz tili)',
    icon: '🌟',
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
  },
  {
    id: 'sc-fr-chat',
    title: 'Ami Parisien (Français débutant)',
    title_uz: 'Fransuz do‘st bilan suhbat',
    icon: '🇫🇷',
    description: 'Pratiquez le français simplement: commander au café, salutations.',
    level_min: 'A1',
    ai_role: 'Ami parisien (Lucas)',
    user_role: 'Élève',
    initial_message: "Bonjour mon ami! Je m'appelle Lucas. Bienvenue à Paris! Comment vas-tu aujourd'hui?",
    suggested_replies: [
      "Bonjour Lucas! Je vais très bien, merci!",
      "Je voudrais commander un croissant, s'il vous plaît.",
      "Quel est ton endroit préféré à Paris?"
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
    available_courses: ['Ingliz tili', 'Rus tili', 'Fransuz tili', 'AI Speaking Club'],
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
    available_courses: ['Speaking Lab', 'Grammar Fun', 'English for Coders'],
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
  },
  {
    id: 'user-3',
    first_name: 'Malika',
    last_name: 'Rustamova',
    age: 13,
    phone: '+998 94 777 88 99',
    email: 'malika@oson.uz',
    role: 'USER',
    is_verified: true,
    is_active: true,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    current_level: 'B1',
    total_xp: 2100,
    streak: 12,
    created_at: '2026-07-20T11:00:00Z'
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
    title_uz: 'AI Tutor bilan 1 ta audio suhbat',
    description: 'Complete 1 Speaking session.',
    xp_reward: 50,
    target_type: 'speaking',
    target_count: 1,
    progress: 1,
    completed: true
  }
];
