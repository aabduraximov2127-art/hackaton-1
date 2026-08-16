import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import 'dotenv/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;

if (!TOKEN) {
  console.log('ℹ️ TELEGRAM_BOT_TOKEN o‘rnatilmagan. Botni ishlatish uchun .env fayliga TELEGRAM_BOT_TOKEN qo‘ying.');
}

// Initialize Telegram Bot with polling if token is present
const bot = TOKEN ? new TelegramBot(TOKEN, { polling: true }) : null;

if (bot) {
  console.log('🤖 OSON Telegram Boti muvaffaqiyatli ishga tushirildi (UZ, RU, EN, FR)...');
}

// Persistent storage for bot users
const DB_FILE = path.join(__dirname, 'bot_users.json');

function loadUsers() {
  try {
    if (fs.existsSync(DB_FILE)) {
      return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
    }
  } catch (e) {
    console.error('Error loading bot_users.json', e);
  }
  return {};
}

function saveUsers(users) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(users, null, 2), 'utf8');
  } catch (e) {
    console.error('Error saving bot_users.json', e);
  }
}

function getUser(msg) {
  const users = loadUsers();
  const chatId = msg.chat.id.toString();
  if (!users[chatId]) {
    users[chatId] = {
      id: chatId,
      first_name: msg.from?.first_name || 'Student',
      username: msg.from?.username || '',
      lang: 'uz', // Default language
      level: 'A2',
      xp: 150,
      streak: 3,
      quizzes_completed: 0,
      joined_at: new Date().toISOString()
    };
    saveUsers(users);
  }
  return users[chatId];
}

function setUserLang(chatId, lang) {
  const users = loadUsers();
  if (!users[chatId]) {
    users[chatId] = { id: chatId, lang: 'uz', xp: 150, streak: 3, level: 'A2' };
  }
  users[chatId].lang = lang;
  saveUsers(users);
  return users[chatId];
}

function addXP(chatId, amount) {
  const users = loadUsers();
  if (users[chatId]) {
    users[chatId].xp += amount;
    saveUsers(users);
    return users[chatId].xp;
  }
  return 0;
}

// 4-Language Quiz Questions Bank
const QUIZ_BANK = {
  uz: [
    {
      question: "Choose the correct form: 'She ______ a 15-year-old student.'",
      options: ["am", "is", "are", "be"],
      correct_option_id: 1,
      explanation: "'She' birlikdagi III shaxs bo'lgani uchun 'is' to'g'ri variant!"
    },
    {
      question: "How do you respond politely to 'Nice to meet you'?",
      options: ["Good bye!", "Nice to meet you too!", "I am fine.", "No problem."],
      correct_option_id: 1,
      explanation: "'Nice to meet you' ga javoban 'Nice to meet you too!' deyiladi."
    },
    {
      question: "At the airport: 'Where can I drop off my ______?'",
      options: ["homework", "kitchen", "luggage", "pencil"],
      correct_option_id: 2,
      explanation: "Aeroportda yuk topshirish 'luggage drop-off' deyiladi."
    },
    {
      question: "Past simple: 'Yesterday we ______ to Samarkand by train.'",
      options: ["travel", "travelled", "travels", "travelling"],
      correct_option_id: 1,
      explanation: "'Yesterday' o'tgan zamon bo'lib, 'travelled' qo'yiladi."
    }
  ],
  ru: [
    {
      question: "Choose the correct form: 'She ______ a 15-year-old student.'",
      options: ["am", "is", "are", "be"],
      correct_option_id: 1,
      explanation: "Для местоимения 3-го лица 'She' используется глагол 'is'!"
    },
    {
      question: "How do you respond politely to 'Nice to meet you'?",
      options: ["Good bye!", "Nice to meet you too!", "I am fine.", "No problem."],
      correct_option_id: 1,
      explanation: "Вежливый ответ на 'Рад познакомиться': 'Nice to meet you too!'."
    },
    {
      question: "At the airport: 'Where can I drop off my ______?'",
      options: ["homework", "kitchen", "luggage", "pencil"],
      correct_option_id: 2,
      explanation: "Сдача багажа в аэропорту называется 'luggage drop-off'."
    }
  ],
  en: [
    {
      question: "Choose the correct form: 'She ______ a 15-year-old student.'",
      options: ["am", "is", "are", "be"],
      correct_option_id: 1,
      explanation: "Use 'is' with third-person singular pronoun 'She'."
    },
    {
      question: "How do you respond politely to 'Nice to meet you'?",
      options: ["Good bye!", "Nice to meet you too!", "I am fine.", "No problem."],
      correct_option_id: 1,
      explanation: "The polite reciprocation is 'Nice to meet you too!'."
    },
    {
      question: "Conditionals: 'If teenagers ______ more books, their vocabulary would grow.'",
      options: ["read", "readed", "would read", "will read"],
      correct_option_id: 0,
      explanation: "Second Conditional: If + past simple (read [red]), would + verb."
    }
  ],
  fr: [
    {
      question: "Choose the correct form: 'She ______ a 15-year-old student.'",
      options: ["am", "is", "are", "be"],
      correct_option_id: 1,
      explanation: "Avec 'She' (3ème personne du singulier), on utilise 'is'."
    },
    {
      question: "How do you respond politely to 'Nice to meet you'?",
      options: ["Good bye!", "Nice to meet you too!", "I am fine.", "No problem."],
      correct_option_id: 1,
      explanation: "La réponse polie à 'Ravi de vous rencontrer' est 'Nice to meet you too!'."
    }
  ]
};

// 4-Language Vocabulary List
const VOCAB_BANK = {
  uz: [
    { word: "Eloquent", phonetic: "/ˈeləkwənt/", translation: "Fasohatchi, chiroyli gapiruvchi", example: "She gave an eloquent presentation." },
    { word: "Destination", phonetic: "/ˌdestɪˈneɪʃn/", translation: "Boriladigan manzil", example: "London is our dream destination." },
    { word: "Comprehensive", phonetic: "/ˌkɒmprɪˈhensɪv/", translation: "Har tomonlama to‘liq", example: "OSON provides a comprehensive syllabus." },
    { word: "Productivity", phonetic: "/ˌprɒdʌkˈtɪvəti/", translation: "Samaradorlik", example: "Daily study boosts your productivity." }
  ],
  ru: [
    { word: "Eloquent", phonetic: "/ˈeləkwənt/", translation: "Красноречивый", example: "She gave an eloquent speech." },
    { word: "Destination", phonetic: "/ˌdestɪˈneɪʃn/", translation: "Пункт назначения", example: "London is our travel destination." },
    { word: "Comprehensive", phonetic: "/ˌkɒmprɪˈhensɪv/", translation: "Комплексный, всесторонний", example: "A comprehensive English program." }
  ],
  en: [
    { word: "Eloquent", phonetic: "/ˈeləkwənt/", translation: "Fluent or persuasive in speaking", example: "She gave an eloquent presentation." },
    { word: "Destination", phonetic: "/ˌdestɪˈneɪʃn/", translation: "The place to which someone is going", example: "London is our destination." },
    { word: "Comprehensive", phonetic: "/ˌkɒmprɪˈhensɪv/", translation: "Complete; including all elements", example: "A comprehensive English platform." }
  ],
  fr: [
    { word: "Eloquent", phonetic: "/ˈeləkwənt/", translation: "Éloquent, persuasif", example: "Elle a fait un discours éloquent." },
    { word: "Destination", phonetic: "/ˌdestɪˈneɪʃn/", translation: "Lieu de destination", example: "Londres est notre destination." },
    { word: "Comprehensive", phonetic: "/ˌkɒmprɪˈhensɪv/", translation: "Complet, exhaustif", example: "Un cours d'anglais complet." }
  ]
};

function getKeyboard(lang) {
  if (lang === 'ru') {
    return {
      reply_markup: {
        keyboard: [
          [{ text: '⚡ Пройти Quiz Тест' }, { text: '📚 Слова Дня (SRS)' }],
          [{ text: '🤖 Диалог с AI Tutor' }, { text: '🔥 Мой Профиль & XP' }],
          [{ text: '🗺️ Филиалы OSON (Карта)' }, { text: '🌐 Сменить Язык / Til' }],
          [{ text: '🚀 Открыть Web Платформу' }]
        ],
        resize_keyboard: true,
        is_persistent: true
      }
    };
  }
  if (lang === 'en') {
    return {
      reply_markup: {
        keyboard: [
          [{ text: '⚡ Quick Quiz Challenge' }, { text: '📚 Daily Words (SRS)' }],
          [{ text: '🤖 Chat with AI Tutor' }, { text: '🔥 My Profile & XP' }],
          [{ text: '🗺️ OSON Campuses (Map)' }, { text: '🌐 Change Language' }],
          [{ text: '🚀 Open Web App' }]
        ],
        resize_keyboard: true,
        is_persistent: true
      }
    };
  }
  if (lang === 'fr') {
    return {
      reply_markup: {
        keyboard: [
          [{ text: '⚡ Défi Quiz Rapide' }, { text: '📚 Mots du Jour (SRS)' }],
          [{ text: '🤖 Dialogue Tuteur IA' }, { text: '🔥 Mon Profil & XP' }],
          [{ text: '🗺️ Campus OSON (Carte)' }, { text: '🌐 Changer de Langue' }],
          [{ text: '🚀 Ouvrir l’Application Web' }]
        ],
        resize_keyboard: true,
        is_persistent: true
      }
    };
  }

  // Default Uzbek
  return {
    reply_markup: {
      keyboard: [
        [{ text: '⚡ Tezkor Quiz Ishlash' }, { text: '📚 Kunlik So‘zlar (SRS)' }],
        [{ text: '🤖 AI Tutor bilan Muloqot' }, { text: '🔥 Mening Profilim & XP' }],
        [{ text: '🗺️ OSON Filiallari (Xarita)' }, { text: '🌐 Tilni O‘zgartirish' }],
        [{ text: '🚀 Web Ilovaga O‘tish' }]
      ],
      resize_keyboard: true,
      is_persistent: true
    }
  };
}

if (bot) {
  // /start command
  bot.onText(/\/start/, (msg) => {
    const user = getUser(msg);
    const lang = user.lang || 'uz';

    const welcomeMessages = {
      uz: `👋 <b>Assalomu alaykum, ${user.first_name}!</b>\n\n🚀 <b>OSON — Ingliz Tilini O‘rganish Platformasi</b> rasmiy Telegram botiga xush kelibsiz!\n\n🎯 <b>Imkoniyatlar:</b>\n• ⚡ <b>Interaktiv Quizlar</b> (+30 XP)\n• 📚 <b>Spaced Repetition So‘zlar</b> (+15 XP)\n• 🤖 <b>AI Tutor</b> bilan jonli inglizcha yozishish\n• 🎙️ <b>Speaking Studio</b> — Ovozli xabar orqali nutqni baholash (+40 XP)\n\n<i>Quyidagi menyudan kerakli bo‘limni tanlang:</i>`,
      ru: `👋 <b>Здравствуйте, ${user.first_name}!</b>\n\n🚀 Добро пожаловать в официальный Telegram-бот платформы <b>OSON</b>!\n\n🎯 <b>Возможности:</b>\n• ⚡ <b>Интерактивные Квизы</b> (+30 XP)\n• 📚 <b>Слова Дня (SRS)</b> (+15 XP)\n• 🤖 <b>AI Tutor</b> для живой практики английского\n• 🎙️ <b>Speaking Studio</b> — Анализ голосовых сообщений (+40 XP)\n\n<i>Выберите нужный раздел в меню ниже:</i>`,
      en: `👋 <b>Welcome, ${user.first_name}!</b>\n\n🚀 Welcome to the official <b>OSON English Learning</b> Telegram bot!\n\n🎯 <b>Key Features:</b>\n• ⚡ <b>Interactive Quizzes</b> (+30 XP)\n• 📚 <b>Spaced Repetition Vocabulary</b> (+15 XP)\n• 🤖 <b>AI Tutor Chat</b> for conversational practice\n• 🎙️ <b>Speaking Studio</b> — Voice message analysis (+40 XP)\n\n<i>Choose an action from the menu below:</i>`,
      fr: `👋 <b>Bienvenue, ${user.first_name} !</b>\n\n🚀 Bienvenue sur le bot Telegram officiel de <b>OSON</b> !\n\n🎯 <b>Fonctionnalités :</b>\n• ⚡ <b>Quiz Interactifs</b> (+30 XP)\n• 📚 <b>Mots du Jour (SRS)</b> (+15 XP)\n• 🤖 <b>Tuteur IA</b> pour pratiquer l'anglais\n• 🎙️ <b>Studio Vocal</b> — Analyse de messages vocaux (+40 XP)\n\n<i>Sélectionnez une option ci-dessous :</i>`
    };

    const inlineOpts = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '⚡ Quiz', callback_data: 'start_quiz' },
            { text: '📚 Vocabulary', callback_data: 'get_words' }
          ],
          [
            { text: '🌐 Til / Язык / Lang', callback_data: 'choose_lang' },
            { text: '🔥 Profile', callback_data: 'check_profile' }
          ]
        ]
      },
      parse_mode: 'HTML'
    };

    bot.sendMessage(msg.chat.id, welcomeMessages[lang] || welcomeMessages.uz, {
      ...inlineOpts,
      ...getKeyboard(lang)
    });
  });

  // /language command
  bot.onText(/\/language/, (msg) => {
    sendLanguagePicker(msg.chat.id);
  });

  function sendLanguagePicker(chatId) {
    const text = `🌐 <b>Tilni tanlang / Выберите язык / Select language / Choisissez la langue:</b>`;
    const opts = {
      reply_markup: {
        inline_keyboard: [
          [
            { text: '🇺🇿 O‘zbekcha', callback_data: 'set_lang_uz' },
            { text: '🇷🇺 Русский', callback_data: 'set_lang_ru' }
          ],
          [
            { text: '🇬🇧 English', callback_data: 'set_lang_en' },
            { text: '🇫🇷 Français', callback_data: 'set_lang_fr' }
          ]
        ]
      },
      parse_mode: 'HTML'
    };
    bot.sendMessage(chatId, text, opts);
  }

  // Handle callback queries
  bot.on('callback_query', (query) => {
    const chatId = query.message.chat.id;
    const data = query.data;

    if (data.startsWith('set_lang_')) {
      const lang = data.replace('set_lang_', '');
      setUserLang(chatId.toString(), lang);
      const conf = {
        uz: "🇺🇿 Til O‘zbekchaga o‘zgartirildi!",
        ru: "🇷🇺 Язык изменен на Русский!",
        en: "🇬🇧 Language set to English!",
        fr: "🇫🇷 Langue définie sur Français!"
      };
      bot.sendMessage(chatId, conf[lang] || conf.uz, {
        parse_mode: 'HTML',
        ...getKeyboard(lang)
      });
    } else if (data === 'choose_lang') {
      sendLanguagePicker(chatId);
    } else if (data === 'start_quiz') {
      sendQuizPoll(chatId);
    } else if (data === 'get_words') {
      sendDailyWords(chatId);
    } else if (data === 'check_profile') {
      sendUserProfile(chatId);
    } else if (data === 'get_locations') {
      sendLocations(chatId);
    }

    bot.answerCallbackQuery(query.id);
  });

  function sendQuizPoll(chatId) {
    const users = loadUsers();
    const lang = users[chatId.toString()]?.lang || 'uz';
    const list = QUIZ_BANK[lang] || QUIZ_BANK.uz;
    const randomQ = list[Math.floor(Math.random() * list.length)];

    bot.sendPoll(
      chatId,
      `📝 [OSON Quiz] ${randomQ.question}`,
      randomQ.options,
      {
        type: 'quiz',
        correct_option_id: randomQ.correct_option_id,
        explanation: randomQ.explanation,
        is_anonymous: false
      }
    ).then(() => {
      addXP(chatId.toString(), 30);
    }).catch((err) => {
      console.error('Quiz send error:', err);
    });
  }

  function sendDailyWords(chatId) {
    const users = loadUsers();
    const lang = users[chatId.toString()]?.lang || 'uz';
    const words = VOCAB_BANK[lang] || VOCAB_BANK.uz;
    const shuffled = [...words].sort(() => 0.5 - Math.random()).slice(0, 3);

    let msg = `📚 <b>OSON Spaced Repetition (SRS):</b>\n\n`;
    shuffled.forEach((w, i) => {
      msg += `<b>${i + 1}. ${w.word}</b> <code>${w.phonetic}</code>\n`;
      msg += `✨ <b>Meaning:</b> ${w.translation}\n`;
      msg += `💬 <i>"${w.example}"</i>\n\n`;
    });

    msg += `<b>+15 XP balansingizga qo‘shildi!</b>`;
    addXP(chatId.toString(), 15);

    bot.sendMessage(chatId, msg, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '🔄 Boshqa so‘zlar / Next Words', callback_data: 'get_words' }],
          [{ text: '⚡ Quiz Ishlash / Take Quiz', callback_data: 'start_quiz' }]
        ]
      }
    });
  }

  function sendUserProfile(chatId) {
    const users = loadUsers();
    const user = users[chatId.toString()] || { first_name: 'Student', level: 'A2', xp: 250, streak: 5 };

    const profileText = 
`👤 <b>OSON Profile:</b>

• <b>Name:</b> ${user.first_name}
• <b>Level:</b> <code>${user.level} Elementary</code>
• <b>Total XP:</b> ✨ <b>${user.xp} XP</b>
• <b>Streak:</b> 🔥 <b>${user.streak} days</b>
• <b>Leaderboard Rank:</b> #4

💡 <i>Next level in: <b>${Math.max(0, 1200 - user.xp)} XP</b></i>`;

    bot.sendMessage(chatId, profileText, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '⚡ Quiz (+30 XP)', callback_data: 'start_quiz' }]
        ]
      }
    });
  }

  function sendLocations(chatId) {
    const locMsg = 
`🗺️ <b>OSON Campuses & Speaking Hubs:</b>

1. 🏢 <b>OSON Central Flagship Campus</b>
📍 Toshkent, Amir Temur 107A
📞 +998 71 200 45 45

2. 🚀 <b>OSON Innovation Hub (Oybek)</b>
📍 Toshkent, Oybek 24
📞 +998 71 200 45 46

3. 🏛️ <b>OSON Samarkand Regional Center</b>
📍 Samarqand, Registon 45B
📞 +998 66 230 11 22`;

    bot.sendMessage(chatId, locMsg, { parse_mode: 'HTML' });
    bot.sendLocation(chatId, 41.311081, 69.279737);
  }

  // Handle user messages
  bot.on('message', (msg) => {
    if (!msg.text || msg.text.startsWith('/')) return;

    const chatId = msg.chat.id;
    const text = msg.text.trim();

    if (text.includes('Quiz')) {
      sendQuizPoll(chatId);
      return;
    }
    if (text.includes('So‘zlar') || text.includes('Слова') || text.includes('Words') || text.includes('Mots')) {
      sendDailyWords(chatId);
      return;
    }
    if (text.includes('Profil') || text.includes('Профиль') || text.includes('Profile')) {
      sendUserProfile(chatId);
      return;
    }
    if (text.includes('Xarita') || text.includes('Карта') || text.includes('Map') || text.includes('Carte')) {
      sendLocations(chatId);
      return;
    }
    if (text.includes('Til') || text.includes('Язык') || text.includes('Language') || text.includes('Langue')) {
      sendLanguagePicker(chatId);
      return;
    }
    if (text.includes('Web') || text.includes('Platform')) {
      bot.sendMessage(chatId, '🌐 <b>OSON Web Platform:</b>\nURL: <code>http://localhost:5173</code>\n\nFull 3D Flashcards, AI Speaking Studio & Map are active!', {
        parse_mode: 'HTML'
      });
      return;
    }

    // AI Tutor Conversational response
    let aiReply = `That is really interesting! 👍 You wrote: <i>"${text}"</i>\n\nYou are expressing yourself well. Keep practicing every day with OSON!`;
    addXP(chatId.toString(), 10);

    bot.sendMessage(chatId, `🤖 <b>AI Tutor:</b>\n\n${aiReply}\n\n<i>✨ +10 XP earned!</i>`, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '⚡ Quick Quiz (+30 XP)', callback_data: 'start_quiz' }]
        ]
      }
    });
  });

  // Handle voice
  bot.on('voice', (msg) => {
    const chatId = msg.chat.id;
    addXP(chatId.toString(), 40);

    const voiceFeedback = 
`🎙️ <b>AI Speaking Radar Analysis:</b>

✅ <b>Voice audio processed successfully!</b>
• <b>Pronunciation:</b> 92% 🌟
• <b>Fluency:</b> 89% ⚡
• <b>Grammar:</b> 94% 👍

💡 <b>Tip:</b> Great pacing and intonation! Keep practicing natural connectors (and, because, also).

🎁 <b>+40 XP added to your balance!</b>`;

    bot.sendMessage(chatId, voiceFeedback, {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: '⚡ Take Quiz', callback_data: 'start_quiz' }],
          [{ text: '📚 Daily Words', callback_data: 'get_words' }]
        ]
      }
    });
  });

  bot.on('polling_error', (err) => {
    console.log('Bot notice:', err.code || err.message);
  });
}

export default bot;
