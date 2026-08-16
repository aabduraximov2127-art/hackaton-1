import React, { useState } from 'react';
import { 
  HelpCircle, Clock, Sparkles, Play, Search, Zap, Globe 
} from 'lucide-react';
import { Quiz, LevelCode, LanguageCode } from '../../types';
import { OsonStorageService } from '../../services/storage';

interface QuizArenaProps {
  activeLanguage?: LanguageCode;
  onStartQuiz: (quizId: string) => void;
}

export const QuizArena: React.FC<QuizArenaProps> = ({ activeLanguage = 'fr', onStartQuiz }) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [selectedLang, setSelectedLang] = useState<string>(activeLanguage);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Update when parent language changes
  React.useEffect(() => {
    if (activeLanguage) {
      setSelectedLang(activeLanguage);
    }
  }, [activeLanguage]);

  const quizzes = OsonStorageService.getQuizzes();
  const levels = OsonStorageService.getLevels();

  const filteredQuizzes = quizzes.filter(q => {
    const matchesLevel = selectedLevel === 'ALL' || q.level_code === selectedLevel;
    const matchesLang = selectedLang === 'ALL' || q.language_code === selectedLang || (!q.language_code && selectedLang === 'en');
    const matchesSearch = q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          q.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesLang && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="eyebrow-pill">
          <span className="dot" />
          <span>INTERAKTIV QUIZ & TESTLAR MARKAZI</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk']">
          Ko‘p Tillik Testlar & Viktorinalar
        </h1>
        <p className="text-xs sm:text-sm text-[#8f8f96] max-w-2xl">
          Ingliz, rus va fransuz tillarida testlar yeching, har bir to‘g‘ri javob uchun XP oling va reytingda ko‘tariling.
        </p>
      </div>

      {/* Language & Level Filters */}
      <div className="flex flex-col gap-3">
        
        {/* Language Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-[#8f8f96] flex items-center gap-1 shrink-0">
            <Globe className="w-3.5 h-3.5 text-[#ff6b4a]" /> Til:
          </span>
          <button
            onClick={() => setSelectedLang('ALL')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition cursor-pointer ${
              selectedLang === 'ALL'
                ? 'bg-[#ff6b4a] text-[#170d08]'
                : 'bg-[#161920] text-[#8f8f96] hover:text-white border border-white/5'
            }`}
          >
            Barchasi
          </button>
          <button
            onClick={() => setSelectedLang('en')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition flex items-center gap-1.5 cursor-pointer ${
              selectedLang === 'en'
                ? 'bg-[#ff6b4a] text-[#170d08]'
                : 'bg-[#161920] text-[#8f8f96] hover:text-white border border-white/5'
            }`}
          >
            <span>🇬🇧</span>
            <span>English (Ingliz)</span>
          </button>
          <button
            onClick={() => setSelectedLang('ru')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition flex items-center gap-1.5 cursor-pointer ${
              selectedLang === 'ru'
                ? 'bg-[#ff6b4a] text-[#170d08]'
                : 'bg-[#161920] text-[#8f8f96] hover:text-white border border-white/5'
            }`}
          >
            <span>🇷🇺</span>
            <span>Русский (Rus)</span>
          </button>
          <button
            onClick={() => setSelectedLang('fr')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition flex items-center gap-1.5 cursor-pointer ${
              selectedLang === 'fr'
                ? 'bg-[#ff6b4a] text-[#170d08]'
                : 'bg-[#161920] text-[#8f8f96] hover:text-white border border-white/5'
            }`}
          >
            <span>🇫🇷</span>
            <span>Français (Fransuz)</span>
          </button>
        </div>

        {/* Level Pills & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedLevel('ALL')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition cursor-pointer ${
                selectedLevel === 'ALL'
                  ? 'bg-white text-black'
                  : 'bg-[#161920] text-[#8f8f96] hover:text-white border border-white/5'
              }`}
            >
              Darajalar (All)
            </button>
            {levels.map((lvl) => (
              <button
                key={lvl.code}
                onClick={() => setSelectedLevel(lvl.code)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition flex items-center gap-1 cursor-pointer ${
                  selectedLevel === lvl.code
                    ? 'bg-white text-black'
                    : 'bg-[#161920] text-[#8f8f96] hover:text-white border border-white/5'
                }`}
              >
                <span>{lvl.badge_icon}</span>
                <span>{lvl.code}</span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-[#8f8f96] absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Test nomini qidirish..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-[#161920] border border-white/10 text-xs text-white placeholder-[#8f8f96] focus:outline-none focus:border-[#ff6b4a]"
            />
          </div>
        </div>

      </div>

      {/* Quizzes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="p-5 rounded-2xl bg-[#161920] border border-white/10 hover:border-[#ff6b4a]/50 transition flex flex-col justify-between space-y-4 shadow-lg hover:-translate-y-1"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-[#ff6b4a]/10 border border-[#ff6b4a]/20 text-[#ff6b4a] font-mono text-[11px] font-bold">
                  {quiz.level_code} · {quiz.language_code ? quiz.language_code.toUpperCase() : 'EN'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 font-mono text-xs font-bold flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-400" /> +{quiz.xp_reward} XP
                </span>
              </div>

              <h3 className="text-base font-bold text-white font-['Space_Grotesk'] leading-snug">
                {quiz.title}
              </h3>
              <p className="text-xs text-[#8f8f96] leading-relaxed line-clamp-2">
                {quiz.description}
              </p>
            </div>

            <div className="space-y-3 pt-3 border-t border-white/5">
              <div className="flex items-center justify-between text-xs text-[#8f8f96] font-mono">
                <span className="flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5 text-indigo-400" /> {quiz.question_count} ta savol
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> {Math.round(quiz.time_limit_seconds / 60)} daqiqa
                </span>
                <span className="text-emerald-400 font-bold">
                  {quiz.passing_score}% o‘tish
                </span>
              </div>

              <button
                onClick={() => onStartQuiz(quiz.id)}
                className="btn-accent w-full py-2.5 text-xs font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-[#170d08]" />
                <span>Testni Boshlash</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
