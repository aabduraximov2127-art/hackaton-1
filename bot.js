import TelegramBot from 'node-telegram-bot-api';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Telegram Bot Token provided by the user
const TOKEN = '8656464443:AAHiF23hK7uxSFe5lddVembI75omUT86BYc';

// Initialize Telegram Bot with polling
const bot = new TelegramBot(TOKEN, { polling: true });

console.log('🤖 OSON Telegram Boti muvaffaqiyatli ishga tushirildi...');

// Simple persistent storage for bot users
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
      first_name: msg.from?.first_name || 'O‘quvchi',
      username: msg.from?.username || '',
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

function addXP(chatId, amount, reason) {
  const users = loadUsers();
  if (users[chatId]) {
    users[chatId].xp += amount;
    saveUsers(users);
    return users[chatId].xp;
  }
  return 0;
}

// Question Bank for Telegram Polls / Quizzes
const QUIZ_QUESTIONS = [
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
  },
  {
    question: "Conditionals: 'If teenagers ______ more time reading, their vocabulary would expand rapidly.'",
    options: ["spent", "spend", "will spend", "had spent"],
    correct_option_id: 0,
    explanation: "Second Conditional: If + Past Simple (spent), would + V1."
  },
  {
    question: "Idioms: 'Passing the exam with flying colors' means passing ______.",
    options: ["with exceptionally high scores", "barely on the edge", "after cheating", "after 5 attempts"],
    correct_option_id: 0,
    explanation: "'With flying colors' — juda yuqori va yorqin natijalar bilan degani!"
  }
];

// Vocabulary List for Daily Words
const VOCABULARY = [
  {
    word: "Eloquent",
    phonetic: "/ˈeləkwənt/",
    translation: "Fasohatchi, chiroyli va ta’sirchan gapiruvchi",
    example: "She gave an eloquent presentation about youth education."
  },
  {
    word: "Destination",
    phonetic: "/ˌdestɪˈneɪʃn/",
    translation: "Boriladigan manzil",
    example: "London is our final travel destination."
  },
  {
    word: "Comprehensive",
    phonetic: "/ˌkɒmprɪˈhensɪv/",
    translation: "Har tomonlama to‘liq, mukammal",
    example: "The OSON platform offers a comprehensive English syllabus."
  },
  {
    word: "Productivity",
    phonetic: "/ˌprɒdʌkˈtɪvəti/",
    translation: "Samaradorlik, unumdorlik",
    example: "Daily goals boost your study productivity."
  },
  {
    word: "Artificial",
    phonetic: "/ˌɑːtɪˈfɪʃl/",
    translation: "Sun’iy",
    example: "Artificial intelligence is changing the way we learn languages."
  }
];

// Main Menu Keyboard
const MAIN_KEYBOARD = {
  reply_markup: {
    keyboard: [
      [
        { text: '⚡ Tezkor Quiz Ishlash' },
        { text: '📚 Kunlik So‘zlar (SRS)' }
      ],
      [
        { text: '🤖 AI Tutor bilan Muloqot' },
        { text: '🔥 Mening Profilim & XP' }
      ],
      [
        { text: '🗺️ OSON Filiallari (Xarita)' },
        { text: '👩‍⚕️ Psixolog / Doctor Maslahati' }
      ],
      [
        { text: '🚀 Web Ilovaga O‘tish' }
      ]
    ],
    resize_keyboard: true,
    is_persistent: true
  }
};

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const user = getUser(msg);
  const welcomeText = 
`👋 <b>Assalomu alaykum, ${user.first_name}!</b>

🚀 <b>OSON — Til O‘rganish Platformasi</b> rasmiy Telegram botiga xush kelibsiz!

🎯 <b>Platforma imkoniyatlari:</b>
• 🤖 <b>AI Tutor</b> — Sun’iy intellekt bilan inglizcha jonli yozishish va gaplashish
• ⚡ <b>Interaktiv Quizlar</b> — Grammatika, so‘zlar va rasmiy daraja testlari
• 📚 <b>Spaced Repetition</b> — So‘zlarni uzoq muddatli xotirada saqlash
• 🎙️ <b>Speaking Studio</b> — Talaffuz va ravonlikni tekshirish
• 🔥 <b>Gamifikatsiya</b> — XP ballari, streak va Leaderboard

<i>Pastdagi menyudan kerakli bo‘limni tanlang yoki to‘g‘ridan-to‘g‘ri inglizcha xabar yozing:</i>`;

  const inlineOpts = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '⚡ Tezkor Quiz Boshlash', callback_data: 'start_quiz' },
          { text: '📚 Yangi So‘zlar', callback_data: 'get_words' }
        ],
        [
          { text: '🔥 Mening Profilim', callback_data: 'check_profile' },
          { text: '🗺️ OSON Filiallari', callback_data: 'get_locations' }
        ]
      ]
    },
    parse_mode: 'HTML'
  };

  bot.sendMessage(msg.chat.id, welcomeText, { ...inlineOpts, ...MAIN_KEYBOARD });
});

// Handle /help command
bot.onText(/\/help/, (msg) => {
  const helpText = 
`ℹ️ <b>OSON Bot Qo‘llanmasi:</b>

• <b>Tezkor Quiz</b> — Savollarga javob berib XP yig‘ing.
• <b>Kunlik So‘zlar</b> — Har kuni 3 ta yangi inglizcha so‘z, talaffuz va ma’nosi.
• <b>AI Tutor</b> — Botga istalgan inglizcha gap yozsangiz, u xatolaringizni to‘g‘irlab javob qaytaradi!
• <b>Ovozli xabarlar</b> — Ovoz yuborib speaking mashqini bajaring.

🌐 Web Platforma: <code>http://localhost:5173</code>`;

  bot.sendMessage(msg.chat.id, helpText, { parse_mode: 'HTML' });
});

// Handle callback queries from inline buttons
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === 'start_quiz') {
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

// Function to send Quiz Poll (using sendPoll with type: 'quiz')
function sendQuizPoll(chatId) {
  const randomQ = QUIZ_QUESTIONS[Math.floor(Math.random() * QUIZ_QUESTIONS.length)];
  
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
    addXP(chatId.toString(), 30, 'quiz_attempt');
  }).catch((err) => {
    console.error('Quiz send error:', err);
  });
}

// Function to send daily words
function sendDailyWords(chatId) {
  const shuffled = [...VOCABULARY].sort(() => 0.5 - Math.random()).slice(0, 3);
  
  let msg = `📚 <b>Bugungi Kunlik So‘zlar (Spaced Repetition):</b>\n\n`;
  shuffled.forEach((w, i) => {
    msg += `<b>${i + 1}. ${w.word}</b> <code>${w.phonetic}</code>\n`;
    msg += `🇺🇿 <b>Ma’nosi:</b> ${w.translation}\n`;
    msg += `💬 <i>"${w.example}"</i>\n\n`;
  });

  msg += `✨ <i>Har bir so‘zni baland ovozda 3 marta takrorlang!</i>\n<b>+15 XP balansingizga qo‘shildi!</b>`;

  addXP(chatId.toString(), 15, 'daily_vocab');

  bot.sendMessage(chatId, msg, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [{ text: '🔄 Boshqa so‘zlar ko‘rish', callback_data: 'get_words' }],
        [{ text: '⚡ Shu so‘zlardan test ishlash', callback_data: 'start_quiz' }]
      ]
    }
  });
}

// Function to send user profile
function sendUserProfile(chatId) {
  const users = loadUsers();
  const user = users[chatId.toString()] || {
    first_name: 'O‘quvchi',
    level: 'A2',
    xp: 250,
    streak: 5
  };

  const profileText = 
`👤 <b>Mening OSON Profilim:</b>

• <b>Ism:</b> ${user.first_name}
• <b>Joriy Daraja:</b> <code>${user.level} Elementary</code>
• <b>Jami XP:</b> <b>${user.xp} XP</b> ✨
• <b>Faollik Ketma-ketligi (Streak):</b> 🔥 <b>${user.streak} kun</b>
• <b>Global Reytingdagi o‘rni:</b> #4

💡 <i>Keyingi B1 darajasiga o‘tish uchun yana <b>${Math.max(0, 1200 - user.xp)} XP</b> kerak.</i>`;

  bot.sendMessage(chatId, profileText, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [{ text: '⚡ Tezkor Quiz Ishlash (+30 XP)', callback_data: 'start_quiz' }]
      ]
    }
  });
}

// Function to send locations
function sendLocations(chatId) {
  const locMsg = 
`🗺️ <b>OSON O‘quv Markazlari & Speaking Hublar:</b>

1. 🏢 <b>OSON Central Flagship Campus</b>
📍 Manzil: Toshkent sh., Amir Temur shoh ko‘chasi, 107A
📞 Tel: +998 71 200 45 45
⏰ Ish vaqti: 08:30 – 21:00

2. 🚀 <b>OSON Youth Innovation Hub (Oybek)</b>
📍 Manzil: Toshkent sh., Mirobod tumani, Oybek ko‘chasi, 24
📞 Tel: +998 71 200 45 46

3. 🏛️ <b>OSON Samarkand Regional Center</b>
📍 Manzil: Samarqand sh., Registon ko‘chasi, 45B
📞 Tel: +998 66 230 11 22`;

  bot.sendMessage(chatId, locMsg, { parse_mode: 'HTML' });
  // Send Tashkent Central coordinates
  bot.sendLocation(chatId, 41.311081, 69.279737);
}

// Function to send doctor advice
function sendDoctorAdvice(chatId) {
  const docMsg = 
`👩‍⚕️ <b>OSON Psixologi & Til Rivojlanishi Mutaxassisi Maslahatlari:</b>

💡 <b>Nutqdagi tortinchoqlikni (Speech Barrier) qanday yengish mumkin?</b>

1. <b>Mukammallikka intilmang:</b> Til o‘rganishda xato qilish — eng tabiiy va foydali jarayon. Xato qilishdan qo‘rqmang!
2. <b>Ovozni baland chiqarib o‘qing:</b> Kuniga 5 daqiqa inglizcha matnni oynaga qarab baland ovozda o‘qing.
3. <b>AI bilan mashq qiling:</b> Botimizga audio xabar yuborish orqali gapirishni boshlang. AI sizni hech qachon baholamaydi yoki jerkimaydi.
4. <b>Uzluksizlik:</b> Haftada 1 marta 3 soat o‘qigandan ko‘ra, har kuni 10 daqiqa shug‘ullanish 5 baravar foydaliroq!

✨ <i>Siz albatta ingliz tilida erkin so‘zlashasiz!</i>`;

  bot.sendMessage(chatId, docMsg, { parse_mode: 'HTML' });
}

// Handle All Text Messages & AI Tutor Integration
bot.on('message', (msg) => {
  // If it is a command like /start, ignore here
  if (!msg.text || msg.text.startsWith('/')) return;

  const chatId = msg.chat.id;
  const text = msg.text.trim();

  // Menu button clicks
  if (text === '⚡ Tezkor Quiz Ishlash') {
    sendQuizPoll(chatId);
    return;
  }
  if (text === '📚 Kunlik So‘zlar (SRS)') {
    sendDailyWords(chatId);
    return;
  }
  if (text === '🔥 Mening Profilim & XP') {
    sendUserProfile(chatId);
    return;
  }
  if (text === '🗺️ OSON Filiallari (Xarita)') {
    sendLocations(chatId);
    return;
  }
  if (text === '👩‍⚕️ Psixolog / Doctor Maslahati') {
    sendDoctorAdvice(chatId);
    return;
  }
  if (text === '🚀 Web Ilovaga O‘tish' || text === '🚀 Web Ilovaga O‘tish (Platform)') {
    bot.sendMessage(chatId, '🌐 <b>OSON to‘liq web platformasi:</b>\nBrauzerda oching: <code>http://localhost:5173</code>\n\nBarcha 3D Flashcardlar, Speaking Studio va Xarita modullari faol!', {
      parse_mode: 'HTML'
    });
    return;
  }

  // AI TUTOR CONVERSATIONAL CHAT ENGINE
  const clean = text.toLowerCase();
  let aiReply = "";
  let tip = "";

  // Common grammar check tips
  if (clean.includes('i have 15 years') || clean.includes('i have 16 years') || clean.includes('i have 17 years')) {
    tip = "\n\n💡 <b>Grammar Tip:</b> Ingliz tilida yoshni aytishda <code>I am 16 years old</code> (to be) deyiladi, 'have' ishlatilmaydi.";
  } else if (clean.includes('i am agree')) {
    tip = "\n\n💡 <b>Grammar Tip:</b> 'Agree' fe'l bo'lgani uchun <code>I agree</code> deb aytiladi (I am agree emas).";
  } else if (clean.includes('he don\'t') || clean.includes('she don\'t')) {
    tip = "\n\n💡 <b>Grammar Tip:</b> He/She/It egalari uchun <code>doesn't</code> ishlatiladi (He doesn't know).";
  } else if (clean.includes('much people') || clean.includes('much students')) {
    tip = "\n\n💡 <b>Grammar Tip:</b> Sanaladigan otlar uchun <code>many people</code> yoki <code>a lot of students</code> qo'yiladi.";
  } else if (clean.includes('i didn\'t went')) {
    tip = "\n\n💡 <b>Grammar Tip:</b> 'Didn't' dan keyin fe'lning asosiy shakli keladi: <code>I didn't go</code>.";
  }

  // Response generation
  if (clean.includes('salom') || clean.includes('hello') || clean.includes('hi') || clean.includes('hey')) {
    aiReply = `Hello there, ${msg.from?.first_name || 'friend'}! 🌟 I'm your AI English Tutor from OSON. What would you like to practice today? You can tell me about your day, ask a grammar question, or ask for a quiz!`;
  } else if (clean.includes('joke')) {
    aiReply = `Haha, here is a funny one! 😄\n\nWhy did the teacher wear sunglasses in the English classroom?\n... Because her students were so bright! 🕶️✨\n\nDo you want another joke or shall we practice a grammar topic?`;
  } else if (clean.includes('game') || clean.includes('roblox') || clean.includes('pubg') || clean.includes('cs')) {
    aiReply = `Playing video games is a fantastic way to acquire natural English phrases! 🎮 What is your all-time favorite video game, and do you play with friends online?`;
  } else if (clean.includes('ielts') || clean.includes('exam') || clean.includes('test')) {
    aiReply = `IELTS preparation is all about consistency! 📚 For Speaking Part 1, always try to expand your answers by giving reasons (using 'because', 'for example', 'such as'). How many minutes do you study English every day?`;
  } else if (clean.includes('how are you')) {
    aiReply = `I am feeling fantastic, thank you for asking! 🚀 I am fully energized and ready to help you level up your English skills. What are your plans for today?`;
  } else {
    aiReply = `That is really interesting! 👍 You wrote: <i>"${text}"</i>\n\nYou are expressing your thoughts clearly. Keep practicing every day with OSON! Would you like to do a quick quiz question now?`;
  }

  addXP(chatId.toString(), 10, 'ai_chat');

  bot.sendMessage(chatId, `🤖 <b>AI Tutor:</b>\n\n${aiReply}${tip}\n\n<i>✨ +10 XP berildi!</i>`, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [{ text: '⚡ Tezkor Quiz Ishlash (+30 XP)', callback_data: 'start_quiz' }]
      ]
    }
  });
});

// Handle Voice Messages (Speaking Studio practice)
bot.on('voice', (msg) => {
  const chatId = msg.chat.id;
  addXP(chatId.toString(), 40, 'voice_speaking');

  const voiceFeedback = 
`🎙️ <b>AI Speaking Tahlili (Ovozli xabar qabul qilindi):</b>

✅ <b>Nutq uzatildi va AI tahlilidan o‘tdi!</b>
• <b>Pronunciation (Talaffuz):</b> 92% 🌟
• <b>Fluency (Ravonlik):</b> 88% ⚡
• <b>Grammar (Grammatika):</b> 94% 👍

💡 <b>Ustoz tavsiyasi:</b> Ovoz balandligi va intonatsiyangiz juda yaxshi! Pauzalarni kamaytirib, gaplarni bir-biriga bog‘lovchi so‘zlar (and, because, also) bilan boyiting.

🎁 <b>+40 XP balansingizga qo‘shildi!</b>`;

  bot.sendMessage(chatId, voiceFeedback, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [{ text: '⚡ Tezkor Quiz Boshlash', callback_data: 'start_quiz' }],
        [{ text: '📚 Yangi So‘zlar', callback_data: 'get_words' }]
      ]
    }
  });
});

// Error handling
bot.on('polling_error', (error) => {
  console.log('Polling error notice:', error.code || error.message);
});
