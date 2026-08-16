import { 
  User, Level, Course, Topic, Lesson, Word, Question, Quiz, QuizAttempt,
  SpeakingAttempt, ConversationMessage, XPTransaction, Achievement, UserAchievement,
  StreakData, LocationItem, DailyChallenge, EmailVerification, LevelCode, XPSource, LanguageCode
} from '../types';
import { 
  INITIAL_LEVELS, INITIAL_COURSES, INITIAL_TOPICS, INITIAL_LESSONS, 
  INITIAL_WORDS, INITIAL_QUESTIONS, INITIAL_QUIZZES, INITIAL_ACHIEVEMENTS, 
  INITIAL_LOCATIONS, INITIAL_USERS, INITIAL_DAILY_CHALLENGES 
} from '../data/mockData';

const KEYS = {
  ACTIVE_LANG: 'oson_active_lang_v4',
  USERS: 'oson_users_v4',
  CURRENT_USER: 'oson_current_user_v4',
  VERIFICATIONS: 'oson_verifications_v4',
  LEVELS: 'oson_levels_v4',
  COURSES: 'oson_courses_v4',
  TOPICS: 'oson_topics_v4',
  LESSONS: 'oson_lessons_v4',
  WORDS: 'oson_words_v4',
  QUESTIONS: 'oson_questions_v4',
  QUIZZES: 'oson_quizzes_v4',
  QUIZ_ATTEMPTS: 'oson_quiz_attempts_v4',
  SPEAKING_ATTEMPTS: 'oson_speaking_attempts_v4',
  CONVERSATIONS: 'oson_conversations_v4',
  XP_TRANSACTIONS: 'oson_xp_transactions_v4',
  ACHIEVEMENTS: 'oson_achievements_v4',
  USER_ACHIEVEMENTS: 'oson_user_achievements_v4',
  STREAKS: 'oson_streaks_v4',
  LOCATIONS: 'oson_locations_v4',
  DAILY_CHALLENGES: 'oson_daily_challenges_v4',
  SRS_PROGRESS: 'oson_srs_progress_v4',
};

function getStorage<T>(key: string, defaultVal: T): T {
  if (typeof window === 'undefined') return defaultVal;
  try {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultVal;
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return defaultVal;
  }
}

function setStorage<T>(key: string, val: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error(`Error saving ${key} to storage:`, e);
  }
}

export class OsonStorageService {
  static init(): void {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem(KEYS.ACTIVE_LANG)) {
      setStorage(KEYS.ACTIVE_LANG, 'fr');
    }
    if (!localStorage.getItem(KEYS.USERS)) {
      setStorage(KEYS.USERS, INITIAL_USERS);
    }
    if (!localStorage.getItem(KEYS.CURRENT_USER)) {
      setStorage(KEYS.CURRENT_USER, INITIAL_USERS[0]);
    }
    if (!localStorage.getItem(KEYS.LEVELS)) {
      setStorage(KEYS.LEVELS, INITIAL_LEVELS);
    }
    if (!localStorage.getItem(KEYS.COURSES)) {
      setStorage(KEYS.COURSES, INITIAL_COURSES);
    }
    if (!localStorage.getItem(KEYS.TOPICS)) {
      setStorage(KEYS.TOPICS, INITIAL_TOPICS);
    }
    if (!localStorage.getItem(KEYS.LESSONS)) {
      setStorage(KEYS.LESSONS, INITIAL_LESSONS);
    }
    if (!localStorage.getItem(KEYS.WORDS)) {
      setStorage(KEYS.WORDS, INITIAL_WORDS);
    }
    if (!localStorage.getItem(KEYS.QUESTIONS)) {
      setStorage(KEYS.QUESTIONS, INITIAL_QUESTIONS);
    }
    if (!localStorage.getItem(KEYS.QUIZZES)) {
      setStorage(KEYS.QUIZZES, INITIAL_QUIZZES);
    }
    if (!localStorage.getItem(KEYS.ACHIEVEMENTS)) {
      setStorage(KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
    }
    if (!localStorage.getItem(KEYS.LOCATIONS)) {
      setStorage(KEYS.LOCATIONS, INITIAL_LOCATIONS);
    }
    if (!localStorage.getItem(KEYS.DAILY_CHALLENGES)) {
      setStorage(KEYS.DAILY_CHALLENGES, INITIAL_DAILY_CHALLENGES);
    }
    if (!localStorage.getItem(KEYS.USER_ACHIEVEMENTS)) {
      const initialUserAch: UserAchievement[] = [
        {
          id: 'ua-1',
          user_id: 'user-1',
          achievement_id: 'ach-1',
          unlocked_at: new Date().toISOString(),
          claimed_xp: true
        }
      ];
      setStorage(KEYS.USER_ACHIEVEMENTS, initialUserAch);
    }
  }

  // Active Language
  static getActiveLanguage(): LanguageCode {
    return getStorage<LanguageCode>(KEYS.ACTIVE_LANG, 'fr');
  }

  static setActiveLanguage(lang: LanguageCode): void {
    setStorage(KEYS.ACTIVE_LANG, lang);
  }

  // Users & Auth
  static getAllUsers(): User[] {
    return getStorage<User[]>(KEYS.USERS, INITIAL_USERS);
  }

  static getCurrentUser(): User | null {
    return getStorage<User | null>(KEYS.CURRENT_USER, INITIAL_USERS[0]);
  }

  static setCurrentUser(user: User | null): void {
    setStorage(KEYS.CURRENT_USER, user);
  }

  static saveUser(user: User): void {
    const users = this.getAllUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx >= 0) {
      users[idx] = user;
    } else {
      users.push(user);
    }
    setStorage(KEYS.USERS, users);

    const curr = this.getCurrentUser();
    if (curr && curr.id === user.id) {
      this.setCurrentUser(user);
    }
  }

  static updateUser(user: User): User {
    this.saveUser(user);
    return user;
  }

  static registerUser(userData: Partial<User> & { first_name: string; last_name: string; email: string }): { user: User; verificationCode: string } {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    this.saveVerification({
      email: userData.email,
      code: code,
      expires_at: Date.now() + 15 * 60 * 1000,
      is_used: false
    });

    const newUser: User = {
      id: 'user-' + Date.now(),
      first_name: userData.first_name,
      last_name: userData.last_name,
      age: userData.age || 14,
      phone: userData.phone || '',
      email: userData.email,
      password: userData.password,
      role: userData.role || 'USER',
      is_verified: false,
      is_active: true,
      avatar: userData.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      current_level: userData.current_level || 'A1',
      total_xp: 100,
      streak: 1,
      created_at: new Date().toISOString()
    };
    this.saveUser(newUser);
    return { user: newUser, verificationCode: code };
  }

  // Verification Codes
  static getVerifications(): EmailVerification[] {
    return getStorage<EmailVerification[]>(KEYS.VERIFICATIONS, []);
  }

  static saveVerification(code: EmailVerification): void {
    const list = this.getVerifications().filter(v => v.email !== code.email);
    list.push(code);
    setStorage(KEYS.VERIFICATIONS, list);
  }

  static getVerification(email: string): EmailVerification | null {
    const list = this.getVerifications();
    return list.find(v => v.email === email && !v.is_used && v.expires_at > Date.now()) || null;
  }

  static verifyEmailCode(email: string, code: string): boolean {
    const ver = this.getVerification(email);
    if (ver && ver.code === code) {
      this.markVerificationUsed(email);
      return true;
    }
    return false;
  }

  static markVerificationUsed(email: string): void {
    const list = this.getVerifications().map(v => v.email === email ? { ...v, is_used: true } : v);
    setStorage(KEYS.VERIFICATIONS, list);
  }

  // Levels
  static getLevels(): Level[] {
    return getStorage<Level[]>(KEYS.LEVELS, INITIAL_LEVELS);
  }

  // Courses
  static getCourses(levelCode?: string, langCode?: string): Course[] {
    const list = getStorage<Course[]>(KEYS.COURSES, INITIAL_COURSES);
    return list.filter(c => {
      if (levelCode && levelCode !== 'ALL' && c.level_code !== levelCode) return false;
      if (langCode && langCode !== 'ALL' && c.language_code && c.language_code !== langCode) return false;
      return true;
    });
  }

  static getCourseById(id: string): Course | null {
    const courses = this.getCourses();
    return courses.find(c => c.id === id) || null;
  }

  // Topics
  static getTopics(courseId?: string, langCode?: string): Topic[] {
    const list = getStorage<Topic[]>(KEYS.TOPICS, INITIAL_TOPICS);
    return list.filter(t => {
      if (courseId && t.course_id !== courseId) return false;
      if (langCode && langCode !== 'ALL' && t.language_code && t.language_code !== langCode) return false;
      return true;
    });
  }

  static getTopicById(id: string): Topic | null {
    const topics = this.getTopics();
    return topics.find(t => t.id === id) || null;
  }

  // Lessons
  static getLessons(topicId?: string): Lesson[] {
    const list = getStorage<Lesson[]>(KEYS.LESSONS, INITIAL_LESSONS);
    if (!topicId) return list;
    return list.filter(l => l.topic_id === topicId);
  }

  // Words & Spaced Repetition (SRS)
  static getWords(levelCode?: string, langCode?: string): Word[] {
    const list = getStorage<Word[]>(KEYS.WORDS, INITIAL_WORDS);
    return list.filter(w => {
      if (levelCode && levelCode !== 'ALL' && w.level_code !== levelCode) return false;
      if (langCode && langCode !== 'ALL' && w.language_code && w.language_code !== langCode) return false;
      return true;
    });
  }

  static addWord(word: Word): void {
    const words = this.getWords();
    words.unshift(word);
    setStorage(KEYS.WORDS, words);
  }

  static saveWord(word: Word): void {
    const words = this.getWords();
    const idx = words.findIndex(w => w.id === word.id);
    if (idx >= 0) words[idx] = word;
    else words.unshift(word);
    setStorage(KEYS.WORDS, words);
  }

  static deleteWord(id: string): void {
    const words = this.getWords().filter(w => w.id !== id);
    setStorage(KEYS.WORDS, words);
  }

  // Quizzes & Questions
  static getQuizzes(levelCode?: string, langCode?: string): Quiz[] {
    const list = getStorage<Quiz[]>(KEYS.QUIZZES, INITIAL_QUIZZES);
    return list.filter(q => {
      if (levelCode && levelCode !== 'ALL' && q.level_code !== levelCode) return false;
      if (langCode && langCode !== 'ALL' && q.language_code && q.language_code !== langCode) return false;
      return true;
    });
  }

  static getQuizById(id: string): Quiz | null {
    const quizzes = getStorage<Quiz[]>(KEYS.QUIZZES, INITIAL_QUIZZES);
    return quizzes.find(q => q.id === id) || null;
  }

  static getQuestions(quizId?: string, levelCode?: string, langCode?: string): Question[] {
    const list = getStorage<Question[]>(KEYS.QUESTIONS, INITIAL_QUESTIONS);
    return list.filter(q => {
      if (quizId && q.quiz_id !== quizId) return false;
      if (levelCode && levelCode !== 'ALL' && q.level_code !== levelCode) return false;
      if (langCode && langCode !== 'ALL' && q.language_code && q.language_code !== langCode) return false;
      return true;
    });
  }

  static addQuestion(question: Question): void {
    const questions = this.getQuestions();
    questions.unshift(question);
    setStorage(KEYS.QUESTIONS, questions);
  }

  static saveQuestion(question: Question): void {
    const questions = this.getQuestions();
    const idx = questions.findIndex(q => q.id === question.id);
    if (idx >= 0) questions[idx] = question;
    else questions.unshift(question);
    setStorage(KEYS.QUESTIONS, questions);
  }

  static deleteQuestion(id: string): void {
    const questions = this.getQuestions().filter(q => q.id !== id);
    setStorage(KEYS.QUESTIONS, questions);
  }

  // Quiz Attempts
  static getQuizAttempts(userId?: string): QuizAttempt[] {
    const attempts = getStorage<QuizAttempt[]>(KEYS.QUIZ_ATTEMPTS, []);
    if (!userId) return attempts;
    return attempts.filter(a => a.user_id === userId);
  }

  static recordQuizAttempt(attempt: Omit<QuizAttempt, 'id' | 'completed_at'>): QuizAttempt {
    const attempts = this.getQuizAttempts();
    const newAttempt: QuizAttempt = {
      ...attempt,
      id: 'qa-' + Date.now(),
      completed_at: new Date().toISOString()
    };
    attempts.unshift(newAttempt);
    setStorage(KEYS.QUIZ_ATTEMPTS, attempts);

    this.awardXP(attempt.user_id, attempt.xp_earned, 'quiz', `Viktorina: ${attempt.quiz_title}`);
    return newAttempt;
  }

  static saveQuizAttempt(attempt: Omit<QuizAttempt, 'id' | 'completed_at'>): QuizAttempt {
    return this.recordQuizAttempt(attempt);
  }

  // Speaking Attempts
  static getSpeakingAttempts(userId?: string): SpeakingAttempt[] {
    const attempts = getStorage<SpeakingAttempt[]>(KEYS.SPEAKING_ATTEMPTS, []);
    if (!userId) return attempts;
    return attempts.filter(a => a.user_id === userId);
  }

  static recordSpeakingAttempt(attempt: Omit<SpeakingAttempt, 'id' | 'created_at'>): SpeakingAttempt {
    const attempts = this.getSpeakingAttempts();
    const newAttempt: SpeakingAttempt = {
      ...attempt,
      id: 'sa-' + Date.now(),
      created_at: new Date().toISOString()
    };
    attempts.unshift(newAttempt);
    setStorage(KEYS.SPEAKING_ATTEMPTS, attempts);

    this.awardXP(attempt.user_id, attempt.xp_earned, 'speaking', `Speaking: ${attempt.topic_title}`);
    return newAttempt;
  }

  static saveSpeakingAttempt(attempt: Omit<SpeakingAttempt, 'id' | 'created_at'>): SpeakingAttempt {
    return this.recordSpeakingAttempt(attempt);
  }

  // Conversations
  static getConversations(userId?: string, scenarioId?: string): ConversationMessage[] {
    const list = getStorage<ConversationMessage[]>(KEYS.CONVERSATIONS, []);
    return list.filter(m => {
      if (userId && m.user_id !== userId) return false;
      if (scenarioId && m.scenario_id !== scenarioId) return false;
      return true;
    });
  }

  static addConversationMessage(msg: Omit<ConversationMessage, 'id' | 'timestamp'>): ConversationMessage {
    const list = getStorage<ConversationMessage[]>(KEYS.CONVERSATIONS, []);
    const newMsg: ConversationMessage = {
      ...msg,
      id: 'msg-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toISOString()
    };
    list.push(newMsg);
    setStorage(KEYS.CONVERSATIONS, list);
    return newMsg;
  }

  // Gamification: XP & Ledger
  static getXPTransactions(userId?: string): XPTransaction[] {
    const list = getStorage<XPTransaction[]>(KEYS.XP_TRANSACTIONS, []);
    if (!userId) return list;
    return list.filter(t => t.user_id === userId);
  }

  static awardXP(userId: string, amount: number, source: XPSource, reason: string): void {
    if (amount <= 0) return;

    const list = getStorage<XPTransaction[]>(KEYS.XP_TRANSACTIONS, []);
    const newTx: XPTransaction = {
      id: 'xp-' + Date.now(),
      user_id: userId,
      amount,
      source,
      description: reason,
      reason,
      created_at: new Date().toISOString()
    };
    list.unshift(newTx);
    setStorage(KEYS.XP_TRANSACTIONS, list);

    const users = this.getAllUsers();
    const u = users.find(user => user.id === userId);
    if (u) {
      u.total_xp += amount;
      this.saveUser(u);
    }
  }

  static addXP(userId: string, amount: number, source: XPSource, reason: string): void {
    this.awardXP(userId, amount, source, reason);
  }

  // Achievements
  static getAchievements(): Achievement[] {
    return getStorage<Achievement[]>(KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
  }

  static getUserAchievements(userId: string): UserAchievement[] {
    const list = getStorage<UserAchievement[]>(KEYS.USER_ACHIEVEMENTS, []);
    return list.filter(ua => ua.user_id === userId);
  }

  static unlockAchievement(userId: string, achievementId: string): void {
    const list = getStorage<UserAchievement[]>(KEYS.USER_ACHIEVEMENTS, []);
    const existing = list.find(ua => ua.user_id === userId && ua.achievement_id === achievementId);
    if (!existing) {
      const achs = this.getAchievements();
      const ach = achs.find(a => a.id === achievementId);
      list.push({
        id: 'ua-' + Date.now(),
        user_id: userId,
        achievement_id: achievementId,
        unlocked_at: new Date().toISOString(),
        claimed_xp: true
      });
      setStorage(KEYS.USER_ACHIEVEMENTS, list);

      if (ach) {
        this.awardXP(userId, ach.xp_reward, 'achievement', `Yutuq ochildi: ${ach.title_uz}`);
      }
    }
  }

  // Streak
  static getStreakData(userId: string): StreakData {
    const streaks = getStorage<Record<string, StreakData>>(KEYS.STREAKS, {});
    if (streaks[userId]) {
      return streaks[userId];
    }
    const defaultData: StreakData = {
      user_id: userId,
      current_streak: 5,
      longest_streak: 14,
      last_activity_date: new Date().toISOString().split('T')[0],
      last_active_date: new Date().toISOString().split('T')[0],
      active_days_this_month: [1, 2, 3, 4, 5, 8, 9, 10, 11, 12, 14, 15]
    };
    streaks[userId] = defaultData;
    setStorage(KEYS.STREAKS, streaks);
    return defaultData;
  }

  // Locations / Map
  static getLocations(): LocationItem[] {
    return getStorage<LocationItem[]>(KEYS.LOCATIONS, INITIAL_LOCATIONS);
  }

  // Daily Challenges
  static getDailyChallenges(): DailyChallenge[] {
    return getStorage<DailyChallenge[]>(KEYS.DAILY_CHALLENGES, INITIAL_DAILY_CHALLENGES);
  }

  // Admin CMS CRUD Operations
  static saveCourse(course: Course): void {
    const courses = this.getCourses();
    const idx = courses.findIndex(c => c.id === course.id);
    if (idx >= 0) {
      courses[idx] = course;
    } else {
      courses.push(course);
    }
    setStorage(KEYS.COURSES, courses);
  }

  static deleteCourse(id: string): void {
    const courses = this.getCourses().filter(c => c.id !== id);
    setStorage(KEYS.COURSES, courses);
  }
}
