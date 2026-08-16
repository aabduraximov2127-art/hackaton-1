import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import {
  ArrowLeft, Clock, Volume2, CheckCircle2, XCircle,
  HelpCircle, ChevronRight
} from 'lucide-react';
import { Question, QuizAttempt, User } from '../../types';
import { OsonStorageService } from '../../services/storage';
import { soundFX, speakEnglish } from '../../services/audio';
import { QuizResultModal } from './QuizResultModal';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface QuizPlayerProps {
  quizId: string;
  currentUser: User;
  onBack: () => void;
  onUserUpdate?: (user: User) => void;
}

export const QuizPlayer: React.FC<QuizPlayerProps> = ({ quizId, currentUser, onBack, onUserUpdate }) => {
  const quizzes = OsonStorageService.getQuizzes();
  const quiz = quizzes.find(q => q.id === quizId) || quizzes[0];

  const questions = useMemo(() => {
    const raw = OsonStorageService.getQuestions(quiz.id, quiz.level_code);
    const base = raw.length > 0 ? raw : OsonStorageService.getQuestions();
    return shuffle(base).map((q) => ({
      ...q,
      options: shuffle([...q.options]),
    }));
  }, [quiz.id, quiz.level_code]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quiz.time_limit_seconds || 180);
  const [weakTopics, setWeakTopics] = useState<string[]>([]);
  const finishingRef = useRef(false);

  const [completedAttempt, setCompletedAttempt] = useState<QuizAttempt | null>(null);
  const [isResultOpen, setIsResultOpen] = useState(false);

  const currentQ = questions[currentIndex] as Question | undefined;

  const finishQuiz = useCallback(() => {
    if (finishingRef.current) return;
    finishingRef.current = true;

    const total = Math.max(1, questions.length);
    const q = questions[currentIndex];
    let correct = correctAnswersCount;
    if (q && selectedOption && selectedOption.trim() === q.correct_answer.trim() && !isAnswerSubmitted) {
      correct += 1;
    }

    const percentage = Math.round((correct / total) * 100);
    const xpReward = percentage >= 80 ? quiz.xp_reward : Math.round(quiz.xp_reward * 0.5);

    const savedAttempt = OsonStorageService.saveQuizAttempt({
      user_id: currentUser.id,
      quiz_id: quiz.id,
      quiz_title: quiz.title,
      score_percentage: percentage,
      correct_answers: correct,
      total_questions: total,
      xp_earned: xpReward,
      time_spent_seconds: Math.max(0, (quiz.time_limit_seconds || 180) - timeLeft),
      weak_topics: weakTopics,
    });

    const refreshed = OsonStorageService.getCurrentUser();
    if (refreshed && onUserUpdate) onUserUpdate(refreshed);

    setCompletedAttempt(savedAttempt);
    setIsResultOpen(true);
  }, [questions, currentIndex, correctAnswersCount, selectedOption, isAnswerSubmitted, quiz, currentUser.id, timeLeft, weakTopics, onUserUpdate]);

  useEffect(() => {
    if (timeLeft <= 0 || isResultOpen) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, isResultOpen]);

  useEffect(() => {
    if (timeLeft === 0 && !isResultOpen && !finishingRef.current) {
      finishQuiz();
    }
  }, [timeLeft, isResultOpen, finishQuiz]);

  const handleSelectOption = (option: string) => {
    if (isAnswerSubmitted) return;
    soundFX.playClick();
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || isAnswerSubmitted || !currentQ) return;
    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption.trim() === currentQ.correct_answer.trim();
    if (isCorrect) {
      soundFX.playCorrect();
      setCorrectAnswersCount((prev) => prev + 1);
    } else {
      soundFX.playWrong();
      if (!weakTopics.includes(currentQ.question_type)) {
        setWeakTopics((prev) => [...prev, currentQ.question_type]);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      finishQuiz();
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!currentQ) {
    return (
      <div className="p-8 text-center text-slate-400 text-sm space-y-3">
        <p>Bu test uchun savollar topilmadi.</p>
        <button type="button" onClick={onBack} className="text-indigo-400 font-bold">
          Orqaga
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-fade-in pb-16">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Chiqish
        </button>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono font-bold text-amber-400">
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTime(timeLeft)}</span>
          </div>
          <span className="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-black">
            +{quiz.xp_reward} XP
          </span>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex justify-between text-xs font-bold text-slate-400">
          <span>Savol {currentIndex + 1} / {questions.length}</span>
          <span>{Math.round(((currentIndex + 1) / questions.length) * 100)}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
          {currentQ.question_type === 'listening'
            ? '🎧 Tinglab toping'
            : currentQ.question_type === 'fill_blank'
              ? '✍️ Bo‘sh joyni to‘ldiring'
              : '📝 To‘g‘ri variantni tanlang'}
        </span>

        {currentQ.audio_phrase && (
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center gap-3">
            <button
              type="button"
              onClick={() => speakEnglish(currentQ.audio_phrase || '')}
              className="w-12 h-12 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center hover:bg-cyan-400 transition shadow-lg shadow-cyan-500/30"
            >
              <Volume2 className="w-6 h-6" />
            </button>
            <span className="text-xs text-cyan-300 font-semibold">Audio gapni eshitish</span>
          </div>
        )}

        <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed font-['Outfit']">
          {currentQ.question}
        </h2>

        <div className="space-y-3 pt-2">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrectOption = option.trim() === currentQ.correct_answer.trim();
            let btnStyle = 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700';

            if (isAnswerSubmitted) {
              if (isCorrectOption) {
                btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold';
              } else if (isSelected) {
                btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
              } else {
                btnStyle = 'bg-slate-950/60 border-slate-900 text-slate-500 opacity-60';
              }
            } else if (isSelected) {
              btnStyle = 'bg-indigo-600/30 border-indigo-500 text-white font-bold ring-2 ring-indigo-500/40';
            }

            return (
              <button
                key={`${option}-${idx}`}
                type="button"
                disabled={isAnswerSubmitted}
                onClick={() => handleSelectOption(option)}
                className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between ${btnStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-xs font-bold text-slate-400">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>
                {isAnswerSubmitted && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                {isAnswerSubmitted && isSelected && !isCorrectOption && <XCircle className="w-5 h-5 text-rose-400 shrink-0" />}
              </button>
            );
          })}
        </div>

        {isAnswerSubmitted && (
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-1.5">
            <div className="flex items-center gap-1.5 text-indigo-300 font-bold">
              <HelpCircle className="w-4 h-4" />
              <span>Izoh:</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">{currentQ.explanation}</p>
          </div>
        )}

        <div className="pt-4 border-t border-slate-800 flex justify-end">
          {!isAnswerSubmitted ? (
            <button
              type="button"
              disabled={!selectedOption}
              onClick={handleCheckAnswer}
              className={`px-6 py-3 rounded-xl text-xs font-bold transition shadow-lg ${
                selectedOption
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Javobni Tekshirish
            </button>
          ) : (
            <button
              type="button"
              onClick={handleNextQuestion}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30"
            >
              <span>{currentIndex < questions.length - 1 ? 'Keyingi Savol' : 'Natijani Ko‘rish'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <QuizResultModal
        isOpen={isResultOpen}
        attempt={completedAttempt}
        onClose={() => {
          setIsResultOpen(false);
          onBack();
        }}
      />
    </div>
  );
};
