import React, { useMemo, useState } from 'react';
import { 
  HelpCircle, Clock, Sparkles, Play, 
  Search, CheckCircle2, Zap, Trophy 
} from 'lucide-react';
import { LevelCode, User } from '../../types';
import { OsonStorageService } from '../../services/storage';

interface QuizArenaProps {
  currentUser: User;
  onStartQuiz: (quizId: string) => void;
  refreshKey?: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const QuizArena: React.FC<QuizArenaProps> = ({ currentUser, onStartQuiz, refreshKey = 0 }) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const levels = OsonStorageService.getLevels();

  const { availableQuizzes, completedQuizzes } = useMemo(() => {
    void refreshKey;
    const all = OsonStorageService.getQuizzes().filter(q => !q.id.startsWith('level-test-'));
    const attempts = OsonStorageService.getQuizAttempts(currentUser.id);
    const completedIds = new Set(attempts.map(a => a.quiz_id));

    const best: Record<string, number> = {};
    attempts.forEach(a => {
      best[a.quiz_id] = Math.max(best[a.quiz_id] ?? 0, a.score_percentage);
    });

    const available = shuffle(all.filter(q => !completedIds.has(q.id)));
    const completed = all
      .filter(q => completedIds.has(q.id))
      .map(q => ({ quiz: q, score: best[q.id] ?? 0 }));

    return {
      availableQuizzes: available,
      completedQuizzes: completed,
    };
  }, [currentUser.id, refreshKey]);

  const filteredAvailable = availableQuizzes.filter(q => {
    const matchesLevel = selectedLevel === 'ALL' || q.level_code === selectedLevel;
    const matchesSearch =
      q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const getDifficultyBadge = (lvl: LevelCode) => {
    switch (lvl) {
      case 'A1': return { label: 'Boshlang‘ich', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' };
      case 'A2': return { label: 'Elementar', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' };
      case 'B1': return { label: 'O‘rta', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' };
      case 'B2': return { label: 'Yuqori O‘rta', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' };
      case 'C1': return { label: 'Ilg‘or', color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' };
      case 'C2': return { label: 'Mukammal', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' };
      default: return { label: lvl, color: 'bg-slate-800 text-slate-300 border-slate-700' };
    }
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Interaktiv Quiz & Testlar</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
          Ingliz Tili Testlari
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Har bir testni yakunlagach u ro‘yxatdan yo‘qoladi — qolgan testlar yangilanadi. XP yig‘ing va darajangizni oshiring.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 text-xs">
        <span className="px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 font-bold">
          Mavjud: {availableQuizzes.length}
        </span>
        <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 font-bold">
          Bajarilgan: {completedQuizzes.length}
        </span>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          <button
            type="button"
            onClick={() => setSelectedLevel('ALL')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition ${
              selectedLevel === 'ALL'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            Barchasi ({filteredAvailable.length})
          </button>
          {levels.map((lvl) => (
            <button
              key={lvl.code}
              type="button"
              onClick={() => setSelectedLevel(lvl.code)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-1 ${
                selectedLevel === lvl.code
                  ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{lvl.badge_icon}</span>
              <span>{lvl.code}</span>
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Testlarni qidirish..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {filteredAvailable.length === 0 ? (
        <div className="p-10 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-3">
          <Trophy className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white font-['Outfit']">
            {availableQuizzes.length === 0
              ? 'Barcha testlar bajarildi! 🎉'
              : 'Bu filtr bo‘yicha ochiq test yo‘q'}
          </h3>
          <p className="text-xs text-slate-400">
            {availableQuizzes.length === 0
              ? 'Yangi testlar admin panelidan qo‘shilishi mumkin.'
              : 'Boshqa darajani tanlang yoki qidiruvni tozalang.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAvailable.map((quiz) => {
            const badge = getDifficultyBadge(quiz.level_code);
            return (
              <div
                key={`${quiz.id}-${refreshKey}`}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`px-2.5 py-0.5 rounded-lg border text-[11px] font-black ${badge.color}`}>
                      {quiz.level_code} • {badge.label}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> +{quiz.xp_reward} XP
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white font-['Outfit']">{quiz.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">{quiz.description}</p>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-800/80">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-indigo-400" /> {quiz.question_count} savol
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-amber-400" /> {Math.round(quiz.time_limit_seconds / 60)} daq
                    </span>
                    <span className="text-emerald-400 font-bold">{quiz.passing_score}% o‘tish</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onStartQuiz(quiz.id)}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-black shadow-lg shadow-amber-600/30 transition flex items-center justify-center gap-2 active:scale-95"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>Testni Boshlash</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {completedQuizzes.length > 0 && (
        <section className="space-y-4 pt-4">
          <h2 className="text-sm font-bold text-slate-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            Bajarilgan testlar ({completedQuizzes.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {completedQuizzes.map(({ quiz, score }) => (
              <div
                key={quiz.id}
                className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 opacity-70 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-xs font-bold text-slate-300 truncate">{quiz.title}</div>
                  <div className="text-[11px] text-slate-500">{quiz.level_code}</div>
                </div>
                <span className="shrink-0 text-xs font-black text-emerald-400">{score}%</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
