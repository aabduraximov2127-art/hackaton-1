import { 
  User, Level, Course, Topic, Lesson, Word, Question, Quiz, QuizAttempt,
  SpeakingAttempt, ConversationMessage, XPTransaction, Achievement, UserAchievement,
  StreakData, LocationItem, DoctorProfile, DoctorNote, DailyChallenge, EmailVerification, LevelCode, XPSource
} from '../types';
import { 
  INITIAL_LEVELS, INITIAL_COURSES, INITIAL_TOPICS, INITIAL_LESSONS, 
  INITIAL_WORDS, INITIAL_QUESTIONS, INITIAL_QUIZZES, INITIAL_ACHIEVEMENTS, 
  INITIAL_LOCATIONS, INITIAL_USERS, INITIAL_DOCTOR_PROFILE, INITIAL_DOCTOR_NOTES, 
  INITIAL_DAILY_CHALLENGES 
} from '../data/mockData';

const KEYS = {
  USERS: 'oson_users_v2',
  CURRENT_USER: 'oson_current_user_v2',
  VERIFICATIONS: 'oson_verifications_v2',
  LEVELS: 'oson_levels_v2',
  COURSES: 'oson_courses_v2',
  TOPICS: 'oson_topics_v2',
  LESSONS: 'oson_lessons_v2',
  WORDS: 'oson_words_v2',
  QUESTIONS: 'oson_questions_v2',
  QUIZZES: 'oson_quizzes_v2',
  QUIZ_ATTEMPTS: 'oson_quiz_attempts_v2',
  SPEAKING_ATTEMPTS: 'oson_speaking_attempts_v2',
  CONVERSATIONS: 'oson_conversations_v2',
  XP_TRANSACTIONS: 'oson_xp_transactions_v2',
  ACHIEVEMENTS: 'oson_achievements_v2',
  USER_ACHIEVEMENTS: 'oson_user_achievements_v2',
  STREAKS: 'oson_streaks_v2',
  LOCATIONS: 'oson_locations_v2',
  DOCTOR_PROFILES: 'oson_doctor_profiles_v2',
  DOCTOR_NOTES: 'oson_doctor_notes_v2',
  DAILY_CHALLENGES: 'oson_daily_challenges_v2',
  SRS_PROGRESS: 'oson_srs_progress_v2',
};

function getStorage<T>(key: string, defaultVal: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultVal;
  } catch (e) {
    console.error(`Error reading ${key} from storage`, e);
    return defaultVal;
  }
}

function setStorage<T>(key: string, val: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error(`Error saving ${key} to storage`, e);
  }
}

export class OsonStorageService {
  // Initialize default data if not present
  static init(): void {
    if (!localStorage.getItem(KEYS.USERS)) {
      setStorage(KEYS.USERS, INITIAL_USERS);
    }
    if (!localStorage.getItem(KEYS.CURRENT_USER)) {
      setStorage(KEYS.CURRENT_USER, INITIAL_USERS[0]); // Default to student Jasur
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
    if (!localStorage.getItem(KEYS.DOCTOR_PROFILES)) {
      setStorage(KEYS.DOCTOR_PROFILES, [INITIAL_DOCTOR_PROFILE]);
    }
    if (!localStorage.getItem(KEYS.DOCTOR_NOTES)) {
      setStorage(KEYS.DOCTOR_NOTES, INITIAL_DOCTOR_NOTES);
    }
    if (!localStorage.getItem(KEYS.DAILY_CHALLENGES)) {
      setStorage(KEYS.DAILY_CHALLENGES, INITIAL_DAILY_CHALLENGES);
    }
    if (!localStorage.getItem(KEYS.USER_ACHIEVEMENTS)) {
      // Seed initial user with First Step unlocked
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

  // Auth & Current User
  static getCurrentUser(): User | null {
    return getStorage<User | null>(KEYS.CURRENT_USER, null);
  }

  static setCurrentUser(user: User | null): void {
    setStorage(KEYS.CURRENT_USER, user);
    if (user) {
      this.updateUser(user);
    }
  }

  static getAllUsers(): User[] {
    return getStorage<User[]>(KEYS.USERS, INITIAL_USERS);
  }

  static updateUser(updated: User): void {
    const users = this.getAllUsers();
    const idx = users.findIndex(u => u.id === updated.id);
    if (idx >= 0) {
      users[idx] = updated;
    } else {
      users.push(updated);
    }
    setStorage(KEYS.USERS, users);
    
    // If updating current user, refresh current user state too
    const cur = this.getCurrentUser();
    if (cur && cur.id === updated.id) {
      setStorage(KEYS.CURRENT_USER, updated);
    }
  }

  static registerUser(userData: Omit<User, 'id' | 'is_verified' | 'is_active' | 'created_at' | 'total_xp' | 'streak'>): { user: User; verificationCode: string } {
    const users = this.getAllUsers();
    const newUser: User = {
      ...userData,
      id: 'user-' + Date.now(),
      is_verified: false,
      is_active: true,
      created_at: new Date().toISOString(),
      total_xp: 0,
      streak: 1,
      current_level: 'A1',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80'
    };

    users.push(newUser);
    setStorage(KEYS.USERS, users);

    // Generate 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const verifications = getStorage<EmailVerification[]>(KEYS.VERIFICATIONS, []);
    verifications.push({
      email: newUser.email,
      code: code,
      expires_at: Date.now() + 15 * 60 * 1000, // 15 mins
      is_used: false
    });
    setStorage(KEYS.VERIFICATIONS, verifications);

    return { user: newUser, verificationCode: code };
  }

  static verifyEmailCode(email: string, code: string): boolean {
    const verifications = getStorage<EmailVerification[]>(KEYS.VERIFICATIONS, []);
    const record = verifications.find(v => v.email.toLowerCase() === email.toLowerCase() && v.code === code && !v.is_used);
    
    if (record) {
      record.is_used = true;
      setStorage(KEYS.VERIFICATIONS, verifications);

      // Mark user as verified
      const users = this.getAllUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (user) {
        user.is_verified = true;
        this.updateUser(user);
        this.setCurrentUser(user);
      }
      return true;
    }
    return false;
  }

  static getPendingVerificationCode(email: string): string | null {
    const verifications = getStorage<EmailVerification[]>(KEYS.VERIFICATIONS, []);
    const record = verifications.find(v => v.email.toLowerCase() === email.toLowerCase() && !v.is_used);
    return record ? record.code : null;
  }

  // XP & Gamification Engine
  static addXP(userId: string, amount: number, source: XPSource, description: string): User | null {
    const users = this.getAllUsers();
    const user = users.find(u => u.id === userId);
    if (!user) return null;

    user.total_xp += amount;
    this.updateUser(user);

    // Record XP Transaction
    const transactions = getStorage<XPTransaction[]>(KEYS.XP_TRANSACTIONS, []);
    const newTx: XPTransaction = {
      id: 'xp-tx-' + Date.now(),
      user_id: userId,
      source: source,
      amount: amount,
      description: description,
      created_at: new Date().toISOString()
    };
    transactions.unshift(newTx);
    setStorage(KEYS.XP_TRANSACTIONS, transactions.slice(0, 100)); // keep last 100

    // Check achievement triggers
    this.checkAchievements(user);

    return user;
  }

  static getXPTransactions(userId: string): XPTransaction[] {
    const txs = getStorage<XPTransaction[]>(KEYS.XP_TRANSACTIONS, []);
    return txs.filter(t => t.user_id === userId);
  }

  // Daily Streak
  static getStreakData(userId: string): StreakData {
    const streaks = getStorage<{ [key: string]: StreakData }>(KEYS.STREAKS, {});
    if (streaks[userId]) {
      return streaks[userId];
    }
    const defaultStreak: StreakData = {
      user_id: userId,
      current_streak: 5,
      longest_streak: 12,
      last_activity_date: new Date().toISOString(),
      weekly_activity: { 0: true, 1: true, 2: true, 3: true, 4: true, 5: false, 6: false }
    };
    streaks[userId] = defaultStreak;
    setStorage(KEYS.STREAKS, streaks);
    return defaultStreak;
  }

  static recordDailyActivity(userId: string): StreakData {
    const streaks = getStorage<{ [key: string]: StreakData }>(KEYS.STREAKS, {});
    const streak = this.getStreakData(userId);
    
    const today = new Date();
    const dayOfWeek = (today.getDay() + 6) % 7; // 0 = Mon, 6 = Sun
    streak.weekly_activity[dayOfWeek] = true;
    streak.last_activity_date = today.toISOString();
    
    streaks[userId] = streak;
    setStorage(KEYS.STREAKS, streaks);
    return streak;
  }

  // Achievements
  static getAchievements(): Achievement[] {
    return getStorage<Achievement[]>(KEYS.ACHIEVEMENTS, INITIAL_ACHIEVEMENTS);
  }

  static getUserAchievements(userId: string): UserAchievement[] {
    const userAchs = getStorage<UserAchievement[]>(KEYS.USER_ACHIEVEMENTS, []);
    return userAchs.filter(ua => ua.user_id === userId);
  }

  static unlockAchievement(userId: string, achievementId: string): boolean {
    const userAchs = getStorage<UserAchievement[]>(KEYS.USER_ACHIEVEMENTS, []);
    const exists = userAchs.find(ua => ua.user_id === userId && ua.achievement_id === achievementId);
    if (!exists) {
      const ach = this.getAchievements().find(a => a.id === achievementId);
      userAchs.push({
        id: 'ua-' + Date.now(),
        user_id: userId,
        achievement_id: achievementId,
        unlocked_at: new Date().toISOString(),
        claimed_xp: false
      });
      setStorage(KEYS.USER_ACHIEVEMENTS, userAchs);
      
      if (ach) {
        this.addXP(userId, ach.xp_reward, 'achievement', `Yutuq ochildi: ${ach.title_uz}`);
      }
      return true;
    }
    return false;
  }

  static checkAchievements(user: User): void {
    const speakingAttempts = this.getSpeakingAttempts(user.id);
    const quizAttempts = this.getQuizAttempts(user.id);

    if (quizAttempts.length >= 1) {
      this.unlockAchievement(user.id, 'ach-1'); // First Step
    }
    if (user.streak >= 7) {
      this.unlockAchievement(user.id, 'ach-2'); // 7 Day Warrior
    }
    if (speakingAttempts.filter(s => s.overall_score >= 80).length >= 5) {
      this.unlockAchievement(user.id, 'ach-3'); // Confident Speaker
    }
    if (quizAttempts.some(q => q.score_percentage === 100 && q.time_spent_seconds < 60)) {
      this.unlockAchievement(user.id, 'ach-4'); // Speed Master
    }
  }

  // Levels & Course Content
  static getLevels(): Level[] {
    return getStorage<Level[]>(KEYS.LEVELS, INITIAL_LEVELS);
  }

  static getCourses(levelCode?: LevelCode): Course[] {
    const courses = getStorage<Course[]>(KEYS.COURSES, INITIAL_COURSES);
    return levelCode ? courses.filter(c => c.level_code === levelCode) : courses;
  }

  static getTopics(courseId?: string): Topic[] {
    const topics = getStorage<Topic[]>(KEYS.TOPICS, INITIAL_TOPICS);
    return courseId ? topics.filter(t => t.course_id === courseId) : topics;
  }

  static getLessons(topicId?: string): Lesson[] {
    const lessons = getStorage<Lesson[]>(KEYS.LESSONS, INITIAL_LESSONS);
    return topicId ? lessons.filter(l => l.topic_id === topicId) : lessons;
  }

  static getWords(levelCode?: LevelCode, topicId?: string): Word[] {
    const words = getStorage<Word[]>(KEYS.WORDS, INITIAL_WORDS);
    return words.filter(w => {
      if (levelCode && w.level_code !== levelCode) return false;
      if (topicId && w.topic_id !== topicId) return false;
      return true;
    });
  }

  // Quizzes & Attempts
  static getQuizzes(levelCode?: LevelCode): Quiz[] {
    const quizzes = getStorage<Quiz[]>(KEYS.QUIZZES, INITIAL_QUIZZES);
    return levelCode ? quizzes.filter(q => q.level_code === levelCode) : quizzes;
  }

  static getQuestions(quizId?: string, levelCode?: LevelCode): Question[] {
    const questions = getStorage<Question[]>(KEYS.QUESTIONS, INITIAL_QUESTIONS);
    return questions.filter(q => {
      if (quizId && q.quiz_id !== quizId) return false;
      if (levelCode && q.level_code !== levelCode) return false;
      return true;
    });
  }

  static saveQuizAttempt(attempt: Omit<QuizAttempt, 'id' | 'completed_at'>): QuizAttempt {
    const attempts = getStorage<QuizAttempt[]>(KEYS.QUIZ_ATTEMPTS, []);
    const fullAttempt: QuizAttempt = {
      ...attempt,
      id: 'attempt-' + Date.now(),
      completed_at: new Date().toISOString()
    };
    attempts.unshift(fullAttempt);
    setStorage(KEYS.QUIZ_ATTEMPTS, attempts);

    // Award XP
    if (attempt.xp_earned > 0) {
      this.addXP(attempt.user_id, attempt.xp_earned, 'quiz', `Quiz topshirildi: ${attempt.quiz_title} (${attempt.score_percentage}%)`);
    }

    return fullAttempt;
  }

  static getQuizAttempts(userId: string): QuizAttempt[] {
    const attempts = getStorage<QuizAttempt[]>(KEYS.QUIZ_ATTEMPTS, []);
    return attempts.filter(a => a.user_id === userId);
  }

  // Speaking Studio
  static saveSpeakingAttempt(attempt: Omit<SpeakingAttempt, 'id' | 'created_at'>): SpeakingAttempt {
    const attempts = getStorage<SpeakingAttempt[]>(KEYS.SPEAKING_ATTEMPTS, []);
    const fullAttempt: SpeakingAttempt = {
      ...attempt,
      id: 'spk-att-' + Date.now(),
      created_at: new Date().toISOString()
    };
    attempts.unshift(fullAttempt);
    setStorage(KEYS.SPEAKING_ATTEMPTS, attempts);

    if (attempt.xp_earned > 0) {
      this.addXP(attempt.user_id, attempt.xp_earned, 'speaking', `Speaking challenge: ${attempt.topic_title} (${attempt.overall_score}/100)`);
    }

    return fullAttempt;
  }

  static getSpeakingAttempts(userId: string): SpeakingAttempt[] {
    const attempts = getStorage<SpeakingAttempt[]>(KEYS.SPEAKING_ATTEMPTS, []);
    return attempts.filter(a => a.user_id === userId);
  }

  // AI Tutor Conversations
  static getConversationMessages(conversationId: string): ConversationMessage[] {
    const messages = getStorage<{ [convoId: string]: ConversationMessage[] }>(KEYS.CONVERSATIONS, {});
    return messages[conversationId] || [];
  }

  static saveConversationMessage(conversationId: string, msg: Omit<ConversationMessage, 'id' | 'timestamp'>): ConversationMessage {
    const conversations = getStorage<{ [convoId: string]: ConversationMessage[] }>(KEYS.CONVERSATIONS, {});
    if (!conversations[conversationId]) {
      conversations[conversationId] = [];
    }
    const fullMsg: ConversationMessage = {
      ...msg,
      id: 'msg-' + Date.now(),
      timestamp: new Date().toISOString()
    };
    conversations[conversationId].push(fullMsg);
    setStorage(KEYS.CONVERSATIONS, conversations);
    return fullMsg;
  }

  // Locations & Map
  static getLocations(): LocationItem[] {
    return getStorage<LocationItem[]>(KEYS.LOCATIONS, INITIAL_LOCATIONS);
  }

  static saveLocation(loc: LocationItem): void {
    const locs = this.getLocations();
    const idx = locs.findIndex(l => l.id === loc.id);
    if (idx >= 0) {
      locs[idx] = loc;
    } else {
      locs.push(loc);
    }
    setStorage(KEYS.LOCATIONS, locs);
  }

  static deleteLocation(id: string): void {
    const locs = this.getLocations().filter(l => l.id !== id);
    setStorage(KEYS.LOCATIONS, locs);
  }

  // Doctor Module
  static getDoctorProfile(doctorId: string): DoctorProfile | null {
    const profiles = getStorage<DoctorProfile[]>(KEYS.DOCTOR_PROFILES, [INITIAL_DOCTOR_PROFILE]);
    return profiles.find(p => p.user_id === doctorId) || null;
  }

  static getDoctorNotes(doctorId?: string, studentId?: string): DoctorNote[] {
    const notes = getStorage<DoctorNote[]>(KEYS.DOCTOR_NOTES, INITIAL_DOCTOR_NOTES);
    return notes.filter(n => {
      if (doctorId && n.doctor_id !== doctorId) return false;
      if (studentId && n.student_id !== studentId) return false;
      return true;
    });
  }

  static addDoctorNote(note: Omit<DoctorNote, 'id' | 'created_at'>): DoctorNote {
    const notes = getStorage<DoctorNote[]>(KEYS.DOCTOR_NOTES, INITIAL_DOCTOR_NOTES);
    const newNote: DoctorNote = {
      ...note,
      id: 'note-' + Date.now(),
      created_at: new Date().toISOString()
    };
    notes.unshift(newNote);
    setStorage(KEYS.DOCTOR_NOTES, notes);
    return newNote;
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

  static saveWord(word: Word): void {
    const words = this.getWords();
    const idx = words.findIndex(w => w.id === word.id);
    if (idx >= 0) {
      words[idx] = word;
    } else {
      words.push(word);
    }
    setStorage(KEYS.WORDS, words);
  }

  static deleteWord(id: string): void {
    const words = this.getWords().filter(w => w.id !== id);
    setStorage(KEYS.WORDS, words);
  }

  static saveQuestion(question: Question): void {
    const questions = this.getQuestions();
    const idx = questions.findIndex(q => q.id === question.id);
    if (idx >= 0) {
      questions[idx] = question;
    } else {
      questions.push(question);
    }
    setStorage(KEYS.QUESTIONS, questions);
  }

  static deleteQuestion(id: string): void {
    const questions = this.getQuestions().filter(q => q.id !== id);
    setStorage(KEYS.QUESTIONS, questions);
  }
}
