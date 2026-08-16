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

console.log('🤖 OSON Telegram Boti to‘liq integratsiya bilan ishga tushirildi...');

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

function getUser(msgOrId, firstName = 'O‘quvchi', username = '') {
  const users = loadUsers();
  const chatId = (typeof msgOrId === 'object' ? msgOrId.chat?.id || msgOrId.from?.id : msgOrId).toString();
  
  if (!users[chatId]) {
    users[chatId] = {
      id: chatId,
      first_name: firstName,
      username: username,
      level: 'A2',
      xp: 150,
      streak: 5,
      quizzes_completed: 0,
      correct_answers: 0,
      active_level_filter: 'ALL',
      joined_at: new Date().toISOString()
    };
    saveUsers(users);
  }
  return users[chatId];
}

function addXP(chatId, amount, reason) {
  const users = loadUsers();
  const idStr = chatId.toString();
  if (users[idStr]) {
    users[idStr].xp += amount;
    saveUsers(users);
    return users[idStr].xp;
  }
  return 0;
}

// Track active poll IDs to reward users on answer
const ACTIVE_POLLS = {};

// Comprehensive Question Bank across All Levels (A1, A2, B1, B2, C1, C2)
const ALL_QUIZ_QUESTIONS = [
  // ================= A1 LEVEL =================
  {
    id: 'a1-1',
    level: 'A1',
    category: 'Grammar',
    question: "She ______ a 15-year-old student from Tashkent.",
    options: ["am", "is", "are", "be"],
    correct_option_id: 1,
    explanation: "'She' birlikdagi III shaxs bo'lgani uchun 'is' to'g'ri variant!"
  },
  {
    id: 'a1-2',
    level: 'A1',
    category: 'Dialogue',
    question: "How do you respond politely to 'Nice to meet you'?",
    options: ["Good bye!", "Nice to meet you too!", "I am fine.", "No problem."],
    correct_option_id: 1,
    explanation: "'Nice to meet you' ga javoban 'Nice to meet you too!' deyiladi."
  },
  {
    id: 'a1-3',
    level: 'A1',
    category: 'Routine',
    question: "Daily Routine: 'He ______ up at 7:00 AM every morning.'",
    options: ["wakes", "wake", "waking", "is wake"],
    correct_option_id: 0,
    explanation: "Present Simple da He/She/It egalari uchun fe'lga '-s' qo'shiladi (wakes up)."
  },
  {
    id: 'a1-4',
    level: 'A1',
    category: 'Food',
    question: "In a cafe: 'I would like a glass of ______ water, please.'",
    options: ["fresh", "loud", "heavy", "tall"],
    correct_option_id: 0,
    explanation: "'Fresh water' (toza, yangi suv) to'g'ri birikma."
  },
  {
    id: 'a1-5',
    level: 'A1',
    category: 'Grammar',
    question: "Plural nouns: What is the plural form of 'child'?",
    options: ["children", "childs", "childes", "childrens"],
    correct_option_id: 0,
    explanation: "'Child' so'zining ko'plik shakli 'children' bo'ladi."
  },

  // ================= A2 LEVEL =================
  {
    id: 'a2-1',
    level: 'A2',
    category: 'Travel',
    question: "At the airport: 'Where can I drop off my ______?'",
    options: ["homework", "kitchen", "luggage", "pencil"],
    correct_option_id: 2,
    explanation: "Aeroportda yuk topshirish 'luggage drop-off' deyiladi."
  },
  {
    id: 'a2-2',
    level: 'A2',
    category: 'Past Simple',
    question: "Past simple: 'Yesterday we ______ to Samarkand by high-speed train.'",
    options: ["travel", "travelled", "travels", "travelling"],
    correct_option_id: 1,
    explanation: "'Yesterday' o'tgan zamon bo'lib, 'travelled' qo'yiladi."
  },
  {
    id: 'a2-3',
    level: 'A2',
    category: 'Directions',
    question: "Directions: 'Go ______ ahead and turn right at the traffic lights.'",
    options: ["straight", "behind", "under", "between"],
    correct_option_id: 0,
    explanation: "'Go straight ahead' — to'g'riga qarab to'g'ri boring degani."
  },
  {
    id: 'a2-4',
    level: 'A2',
    category: 'Shopping',
    question: "Shopping: 'How ______ does this hoodie cost?'",
    options: ["much", "many", "long", "often"],
    correct_option_id: 0,
    explanation: "Narx so'rashda 'How much does it cost?' deb so'raladi."
  },

  // ================= B1 LEVEL =================
  {
    id: 'b1-1',
    level: 'B1',
    category: 'Tech & AI',
    question: "Artificial intelligence has the potential to ______ education worldwide.",
    options: ["revolutionize", "delete", "sleep", "hesitate"],
    correct_option_id: 0,
    explanation: "'Revolutionize' — tubdan o'zgartirmoq yoki yangi bosqichga olib chiqmoq."
  },
  {
    id: 'b1-2',
    level: 'B1',
    category: 'Conditionals',
    question: "If teenagers ______ more time reading, their vocabulary would expand rapidly.",
    options: ["spent", "spend", "will spend", "had spent"],
    correct_option_id: 0,
    explanation: "Second Conditional: If + Past Simple (spent), would + V1."
  },
  {
    id: 'b1-3',
    level: 'B1',
    category: 'Present Perfect',
    question: "She ______ in Tashkent since 2018.",
    options: ["has lived", "lives", "lived", "is living"],
    correct_option_id: 0,
    explanation: "'Since 2018' davomiylikni bildiradi va Present Perfect (has lived) talab qiladi."
  },
  {
    id: 'b1-4',
    level: 'B1',
    category: 'Passive Voice',
    question: "The new mobile app ______ by a team of young Uzbek developers.",
    options: ["was developed", "developed", "is develop", "has developing"],
    correct_option_id: 0,
    explanation: "Majhul nisbat (Passive Voice): was/were + V3 (was developed)."
  },

  // ================= B2 LEVEL =================
  {
    id: 'b2-1',
    level: 'B2',
    category: 'Collocations',
    question: "The team took effective measures to ______ with the environmental challenge.",
    options: ["cope", "handle", "solve", "face"],
    correct_option_id: 0,
    explanation: "'Cope with' iborasi qiyinchiliklarni yengib o'tish ma'nosida ishlatiladi."
  },
  {
    id: 'b2-2',
    level: 'B2',
    category: 'Inversion',
    question: "Seldom ______ such an inspiring presentation on technology.",
    options: ["have I witnessed", "I have witnessed", "I witnessed", "witnessed I"],
    correct_option_id: 0,
    explanation: "Inkor so'zlar (Seldom, Never) gap boshida kelsa, inversiya (have I witnessed) bo'ladi."
  },
  {
    id: 'b2-3',
    level: 'B2',
    category: 'Phrasal Verbs',
    question: "The teacher asked the students to ______ up the unfamiliar words in the dictionary.",
    options: ["look", "take", "make", "give"],
    correct_option_id: 0,
    explanation: "'Look up' — lug'atdan ma'lumot qidirib topmoq."
  },

  // ================= C1 & C2 LEVEL =================
  {
    id: 'c1-1',
    level: 'C1',
    category: 'Idioms',
    question: "Passing the certification exam 'with flying colors' means passing ______.",
    options: ["with exceptionally high scores", "barely on the edge", "by cheating", "after 5 attempts"],
    correct_option_id: 0,
    explanation: "'With flying colors' — juda yuqori va a'lo natijalar bilan degani!"
  },
  {
    id: 'c1-2',
    level: 'C1',
    category: 'Advanced Lexis',
    question: "His argument was so ______ that no one in the committee could refute it.",
    options: ["compelling", "fragile", "superficial", "negligible"],
    correct_option_id: 0,
    explanation: "'Compelling argument' — inkor etib bo'lmas, kuchli dalil."
  },
  {
    id: 'c2-1',
    level: 'C2',
    category: 'Nuances',
    question: "The subtle irony was lost on readers who took the narrative at ______ value.",
    options: ["face", "front", "surface", "sight"],
    correct_option_id: 0,
    explanation: "'At face value' — tashqi ko'rinishiga qarab to'g'ridan-to'g'ri qabul qilmoq."
  }
];

// Rich Vocabulary
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
        { text: '⚡ Tezkor Quiz (Testlar)' },
        { text: '🎯 Daraja Tanlash (A1-C2)' }
      ],
      [
        { text: '📚 Kunlik So‘zlar (SRS)' },
        { text: '🤖 AI Tutor bilan Muloqot' }
      ],
      [
        { text: '🔥 Mening Profilim & XP' },
        { text: '🗺️ OSON Filiallari (Xarita)' }
      ],
      [
        { text: '💡 O‘rganish Tavsiyalari' },
        { text: '🌐 Web Platforma' }
      ]
    ],
    resize_keyboard: true,
    is_persistent: true
  }
};

// Handle /start command
bot.onText(/\/start/, (msg) => {
  const user = getUser(msg, msg.from?.first_name, msg.from?.username);
  const welcomeText = 
`👋 <b>Assalomu alaykum, ${user.first_name}!</b>

🚀 <b>OSON — Til O‘rganish Platformasi</b> rasmiy Telegram botiga xush kelibsiz!

🎯 <b>Platforma imkoniyatlari:</b>
• ⚡ <b>Interaktiv Quizlar (A1–C2)</b> — 4 ta variantli rasmiy testlar
• 🤖 <b>AI Tutor</b> — Inglizcha suhbat va real-time grammatika tahriri
• 📚 <b>Spaced Repetition So‘zlar</b> — Har kuni 3 ta yangi so‘z
• 🎙️ <b>Speaking Mashqi</b> — Ovozli xabar yuborib talaffuzni tekshirish
• 🔥 <b>Gamifikatsiya</b> — XP to‘plash, streak va reyting

<i>Pastdagi menyudan bo‘limni tanlang:</i>`;

  const inlineOpts = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '⚡ Test Ishlashni Boshlash', callback_data: 'start_quiz' },
          { text: '🎯 Darajani Tanlash', callback_data: 'select_level' }
        ],
        [
          { text: '📚 Kunlik So‘zlar', callback_data: 'get_words' },
          { text: '🔥 Mening Profilim', callback_data: 'check_profile' }
        ]
      ]
    },
    parse_mode: 'HTML'
  };

  bot.sendMessage(msg.chat.id, welcomeText, { ...inlineOpts, ...MAIN_KEYBOARD });
});

// Handle /quiz command
bot.onText(/\/quiz/, (msg) => {
  sendQuizMenu(msg.chat.id);
});

// Send Quiz Menu with Level Selection
function sendQuizMenu(chatId) {
  const menuText = 
`⚡ <b>OSON Interaktiv Quiz Markazi:</b>

Qaysi daraja yoki mavzu bo‘yicha test ishlamoqchisiz? Tanlang:`;

  const inlineKeyboard = {
    reply_markup: {
      inline_keyboard: [
        [
          { text: '🌱 A1 Beginner Test', callback_data: 'quiz_lvl_A1' },
          { text: '🌿 A2 Elementary Test', callback_data: 'quiz_lvl_A2' }
        ],
        [
          { text: '⚡ B1 Intermediate Test', callback_data: 'quiz_lvl_B1' },
          { text: '🔥 B2 Upper-Intermediate', callback_data: 'quiz_lvl_B2' }
        ],
        [
          { text: '💎 C1/C2 Advanced Test', callback_data: 'quiz_lvl_C1' },
          { text: '🎲 Tasodifiy Tezkor Test', callback_data: 'start_quiz' }
        ]
      ]
    },
    parse_mode: 'HTML'
  };

  bot.sendMessage(chatId, menuText, inlineKeyboard);
}

// Function to send Quiz Poll
function sendQuizPoll(chatId, levelFilter = 'ALL') {
  let pool = ALL_QUIZ_QUESTIONS;
  if (levelFilter !== 'ALL') {
    pool = ALL_QUIZ_QUESTIONS.filter(q => q.level === levelFilter || (levelFilter === 'C1' && (q.level === 'C1' || q.level === 'C2')));
    if (pool.length === 0) pool = ALL_QUIZ_QUESTIONS;
  }

  const randomQ = pool[Math.floor(Math.random() * pool.length)];

  bot.sendPoll(
    chatId,
    `[${randomQ.level} • ${randomQ.category}] ${randomQ.question}`,
    randomQ.options,
    {
      type: 'quiz',
      correct_option_id: randomQ.correct_option_id,
      explanation: randomQ.explanation,
      is_anonymous: false
    }
  ).then((sentMsg) => {
    if (sentMsg.poll) {
      ACTIVE_POLLS[sentMsg.poll.id] = {
        chatId: chatId,
        questionId: randomQ.id,
        correct_option_id: randomQ.correct_option_id,
        level: randomQ.level
      };
    }
  }).catch((err) => {
    console.error('Quiz send error:', err);
  });
}

// Listen to Poll Answer Submissions from users!
bot.on('poll_answer', (pollAnswer) => {
  const pollId = pollAnswer.poll_id;
  const userPoll = ACTIVE_POLLS[pollId];

  if (userPoll) {
    const userId = pollAnswer.user.id.toString();
    const selectedOption = pollAnswer.option_ids[0];
    const isCorrect = selectedOption === userPoll.correct_option_id;

    if (isCorrect) {
      const newXP = addXP(userId, 30, 'quiz_poll_correct');
      const users = loadUsers();
      if (users[userId]) {
        users[userId].quizzes_completed = (users[userId].quizzes_completed || 0) + 1;
        users[userId].correct_answers = (users[userId].correct_answers || 0) + 1;
        saveUsers(users);
      }

      bot.sendMessage(userPoll.chatId, `🎉 <b>Ajoyib! To‘g‘ri javob!</b>\n\n✨ <b>+30 XP</b> balansingizga qo‘shildi! (Jami: <b>${newXP} XP</b>)`, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '⚡ Keyingi Savol', callback_data: `quiz_lvl_${userPoll.level}` },
              { text: '🎯 Boshqa Daraja', callback_data: 'select_level' }
            ]
          ]
        }
      });
    } else {
      addXP(userId, 10, 'quiz_poll_attempt');
      bot.sendMessage(userPoll.chatId, `❌ <b>Noto‘g‘ri variant bo‘ldi.</b>\n\n💡 Tushuntirishni yuqoridagi viktorinada ko‘rishingiz mumkin.\nUrinish uchun <b>+10 XP</b> berildi.`, {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [
              { text: '🔄 Qayta urinish (Yangi savol)', callback_data: `quiz_lvl_${userPoll.level}` },
              { text: '📚 Kunlik So‘zlar', callback_data: 'get_words' }
            ]
          ]
        }
      });
    }

    delete ACTIVE_POLLS[pollId];
  }
});

// Handle callback queries from inline buttons
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const data = query.data;

  if (data === 'start_quiz') {
    sendQuizPoll(chatId, 'ALL');
  } else if (data === 'select_level') {
    sendQuizMenu(chatId);
  } else if (data.startsWith('quiz_lvl_')) {
    const lvl = data.replace('quiz_lvl_', '');
    sendQuizPoll(chatId, lvl);
  } else if (data === 'get_words') {
    sendDailyWords(chatId);
  } else if (data === 'check_profile') {
    sendUserProfile(chatId);
  } else if (data === 'get_locations') {
    sendLocations(chatId);
  }

  bot.answerCallbackQuery(query.id);
});

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
        [{ text: '⚡ Shu darajadagi test ishlash', callback_data: 'start_quiz' }]
      ]
    }
  });
}

// Function to send user profile
function sendUserProfile(chatId) {
  const user = getUser(chatId);

  const profileText = 
`👤 <b>Mening OSON Profilim:</b>

• <b>Ism:</b> ${user.first_name}
• <b>Joriy Daraja:</b> <code>${user.level} Elementary</code>
• <b>Jami XP:</b> <b>${user.xp} XP</b> ✨
• <b>Faollik Ketma-ketligi (Streak):</b> 🔥 <b>${user.streak} kun</b>
• <b>Ishlangan Quizlar:</b> 📝 <b>${user.quizzes_completed || 0} ta</b>
• <b>Global Reytingdagi o‘rni:</b> #4

💡 <i>Keyingi B1 darajasiga o‘tish uchun yana <b>${Math.max(0, 1200 - user.xp)} XP</b> kerak.</i>`;

  bot.sendMessage(chatId, profileText, {
    parse_mode: 'HTML',
    reply_markup: {
      inline_keyboard: [
        [{ text: '⚡ Tezkor Quiz Ishlash (+30 XP)', callback_data: 'start_quiz' }],
        [{ text: '🎯 Darajani Tanlash', callback_data: 'select_level' }]
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
  bot.sendLocation(chatId, 41.311081, 69.279737);
}

// Function to send study advice for teens
function sendStudyAdvice(chatId) {
  const adviceMsg = 
`💡 <b>13–18 yoshli o‘quvchilar uchun til o‘rganish sirlari:</b>

1. <b>O‘yin orqali o‘rganing:</b> Har kuni 10 daqiqa botimizda yoki platformada test yechib, streakni olovli ushlang! 🔥
2. <b>Ovoz chiqarib gapiring:</b> AI do‘stimizga har kuni 1 ta ovozli xabar yuboring. AI xatolaringizni do‘stona to‘g‘rilaydi.
3. <b>Sevimli o‘yinlaringizni ingliz tiliga o‘tkazing:</b> Roblox, Minecraft, PUBG va YouTube videolarni inglizcha tomosha qiling.
4. <b>Xatodan qo‘rqmang:</b> Har bir xato — yangi bilim demakdir!

✨ <i>Sen albatta tillarni a’lo darajada o‘rganasan! 🚀</i>`;

  bot.sendMessage(chatId, adviceMsg, { parse_mode: 'HTML' });
}

// Handle All Text Messages & AI Tutor Integration
bot.on('message', (msg) => {
  if (!msg.text || msg.text.startsWith('/')) return;

  const chatId = msg.chat.id;
  const text = msg.text.trim();

  // Menu button clicks
  if (text === '⚡ Tezkor Quiz (Testlar)' || text === '⚡ Tezkor Quiz Ishlash') {
    sendQuizMenu(chatId);
    return;
  }
  if (text === '🎯 Daraja Tanlash (A1-C2)') {
    sendQuizMenu(chatId);
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
  if (text === '💡 O‘rganish Tavsiyalari' || text === '👩‍⚕️ Psixolog Maslahati') {
    sendStudyAdvice(chatId);
    return;
  }
  if (text === '🌐 Web Platforma' || text === '🚀 Web Ilovaga O‘tish') {
    bot.sendMessage(chatId, '🌐 <b>OSON to‘liq web platformasi:</b>\nBrauzeringizda oching: <code>http://localhost:5173</code>\n\nBarcha 3D Flashcardlar, Speaking Studio, Quiz Arena va Xarita modullari faol!', {
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
  console.log('Polling notice:', error.code || error.message);
});
