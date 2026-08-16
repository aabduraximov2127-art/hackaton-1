export type UserRole = 'USER' | 'ADMIN';

export type LanguageCode = 'en' | 'ru' | 'fr' | 'uz';

export interface Language {
  code: LanguageCode;
  name: string;
  native_name: string;
  flag: string;
  voice_lang: string; // e.g. en-US, ru-RU, fr-FR
  description: string;
}

export type LevelCode = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  age: number;
  phone: string;
  email: string;
  password?: string;
  role: UserRole;
  is_verified: boolean;
  is_active: boolean;
  avatar: string;
  current_level: LevelCode;
  total_xp: number;
  streak: number;
  created_at: string;
}

export interface EmailVerification {
  email: string;
  code: string;
  expires_at: number;
  is_used: boolean;
}

export interface Level {
  code: LevelCode;
  name: string;
  order: number;
  passing_score: number; // e.g. 80%
  description: string;
  color: string;
  badge_icon: string;
}

export interface Course {
  id: string;
  level_code: LevelCode;
  language_code?: LanguageCode;
  title: string;
  description: string;
  image: string;
  duration: string;
  is_active: boolean;
  topics_count: number;
  color_gradient: string;
}

export interface Topic {
  id: string;
  course_id: string;
  level_code: LevelCode;
  language_code?: LanguageCode;
  title: string;
  description: string;
  order: number;
  duration_minutes: number;
  icon: string;
}

export type LessonType = 'vocabulary' | 'grammar' | 'listening' | 'quiz' | 'word_practice' | 'speaking';

export interface Lesson {
  id: string;
  topic_id: string;
  title: string;
  type: LessonType;
  order: number;
  xp_reward: number;
  content: {
    summary?: string;
    rules?: { title: string; explanation: string; example: string }[];
    listening_audio_text?: string;
    dialogue?: { speaker: string; text: string; translation?: string }[];
  };
}

export interface Word {
  id: string;
  level_code: LevelCode;
  language_code?: LanguageCode;
  topic_id: string;
  word: string;
  phonetic: string;
  translation: string;
  example: string;
  example_uz: string;
  difficulty: 'easy' | 'medium' | 'hard';
  part_of_speech: string;
}

export interface UserWordProgress {
  id: string;
  user_id: string;
  word_id: string;
  review_count: number;
  next_review_at: string;
  mastery: number; // 0 to 100%
  last_reviewed_at?: string;
}

export type QuestionType = 'multiple_choice' | 'fill_blank' | 'listening' | 'sentence_order';

export interface Question {
  id: string;
  level_code: LevelCode;
  language_code?: LanguageCode;
  topic_id?: string;
  quiz_id?: string;
  question: string;
  question_type: QuestionType;
  options: string[];
  correct_answer: string;
  explanation: string;
  audio_phrase?: string;
}

export interface Quiz {
  id: string;
  level_code: LevelCode;
  language_code?: LanguageCode;
  topic_id?: string;
  title: string;
  description: string;
  question_count: number;
  xp_reward: number;
  passing_score: number;
  time_limit_seconds: number;
  is_level_test?: boolean;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  quiz_id: string;
  quiz_title: string;
  score_percentage: number;
  correct_answers: number;
  total_questions: number;
  xp_earned: number;
  time_spent_seconds: number;
  completed_at: string;
  weak_topics: string[];
}

export interface SpeakingAttempt {
  id: string;
  user_id: string;
  topic_id: string;
  topic_title: string;
  transcript: string;
  overall_score: number;
  pronunciation: number;
  fluency: number;
  grammar: number;
  vocabulary: number;
  xp_earned: number;
  feedback: string[];
  better_version?: string;
  created_at: string;
}

export interface ConversationScenario {
  id: string;
  title: string;
  title_uz: string;
  icon: string;
  description: string;
  level_min: LevelCode;
  ai_role: string;
  user_role: string;
  initial_message: string;
  suggested_replies: string[];
}

export interface ConversationMessage {
  id: string;
  conversation_id: string;
  sender: 'user' | 'ai';
  message: string;
  correction?: string;
  timestamp: string;
}

export type XPSource = 
  | 'vocabulary' 
  | 'grammar' 
  | 'listening' 
  | 'quiz' 
  | 'speaking' 
  | 'ai_conversation' 
  | 'daily_challenge' 
  | 'level_test' 
  | 'achievement';

export interface XPTransaction {
  id: string;
  user_id: string;
  source: XPSource;
  amount: number;
  description: string;
  created_at: string;
}

export interface Achievement {
  id: string;
  title: string;
  title_uz: string;
  description: string;
  description_uz: string;
  icon: string;
  xp_reward: number;
  category: 'streak' | 'speaking' | 'quiz' | 'general' | 'level' | 'vocab';
  condition_type: string;
  condition_target: number;
}

export interface UserAchievement {
  id: string;
  user_id: string;
  achievement_id: string;
  unlocked_at: string;
  claimed_xp: boolean;
}

export interface StreakData {
  user_id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
  weekly_activity: { [dayIndex: number]: boolean }; // 0: Mon, 6: Sun
}

export interface LocationItem {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  working_hours: string;
  contact: string;
  available_courses: string[];
  image: string;
}

export interface DoctorProfile {
  id: string;
  user_id: string;
  specialization: string;
  bio: string;
  assigned_student_ids: string[];
}

export interface DoctorNote {
  id: string;
  doctor_id: string;
  doctor_name: string;
  student_id: string;
  student_name: string;
  note: string;
  recommendation: string;
  category: 'motivation' | 'study_habit' | 'exam_stress' | 'speech_barrier';
  created_at: string;
}

export interface DailyChallenge {
  id: string;
  title: string;
  title_uz: string;
  description: string;
  xp_reward: number;
  target_type: 'quiz' | 'speaking' | 'vocab' | 'ai_chat';
  target_count: number;
  progress: number;
  completed: boolean;
}
