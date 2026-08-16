import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Clock, Volume2, CheckCircle2, XCircle, 
  HelpCircle, ChevronRight, Sparkles, Award 
} from 'lucide-react';
import { Quiz, Question, QuizAttempt, User } from '../../types';
import { OsonStorageService } from '../../services/storage';
import { soundFX, speakEnglish } from '../../services/audio';
import { QuizResultModal } from './QuizResultModal';

interface QuizPlayerProps {
  quizId: string;
  currentUser: User;
  onBack: () => void;
}

export const QuizPlayer: React.FC<QuizPlayerProps> = ({ quizId, currentUser, onBack }) => {
  const quizzes = OsonStorageService.getQuizzes();
  const quiz = quizzes.find(q => q.id === quizId) || quizzes[0];
  
  const allQuestions = OsonStorageService.getQuestions(quiz.id, quiz.level_code);
  const questions = allQuestions.length > 0 ? allQuestions : OsonStorageService.getQuestions();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(quiz.time_limit_seconds || 180);
  const [weakTopics, setWeakTopics] = useState<string[]>([]);
  
  const [completedAttempt, setCompletedAttempt] = useState<QuizAttempt | null>(null);
  const [isResultOpen, setIsResultOpen] = useState(false);

  const currentQ = questions[currentIndex];

  // Countdown timer
  useEffect(() => {
    if (timeLeft <= 0 || isResultOpen) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          finishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isResultOpen]);

  const handleSelectOption = (option: string) => {
    if (isAnswerSubmitted) return;
    soundFX.playClick();
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (!selectedOption || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption.trim() === currentQ.correct_answer.trim();

    if (isCorrect) {
      soundFX.playCorrect();
      setCorrectAnswersCount(prev => prev + 1);
    } else {
      soundFX.playWrong();
      if (!weakTopics.includes(currentQ.question_type)) {
        setWeakTopics(prev => [...prev, currentQ.question_type]);
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const total = questions.length;
    const correct = selectedOption && selectedOption.trim() === currentQ.correct_answer.trim() 
      ? correctAnswersCount + (isAnswerSubmitted ? 0 : 1) 
      : correctAnswersCount;

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
      time_spent_seconds: (quiz.time_limit_seconds || 180) - timeLeft,
      weak_topics: weakTopics
    });

    setCompletedAttempt(savedAttempt);
    setIsResultOpen(true);
  };

  const handleRetry = () => {
    setIsResultOpen(false);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setCorrectAnswersCount(0);
    setTimeLeft(quiz.time_limit_seconds || 180);
    setWeakTopics([]);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto animate-fade-in pb-16">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
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

      {/* Progress Bar */}
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

      {/* Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
        
        {/* Question Header & Type */}
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {currentQ.question_type === 'listening' ? '🎧 Tinglab toping' : currentQ.question_type === 'fill_blank' ? '✍️ Bo‘sh joyni to‘ldiring' : '📝 To‘g‘ri variantni tanlang'}
          </span>
        </div>

        {/* Audio phrase if listening question */}
        {currentQ.audio_phrase && (
          <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => speakEnglish(currentQ.audio_phrase || '')}
                className="w-12 h-12 rounded-xl bg-cyan-500 text-slate-950 flex items-center justify-center hover:bg-cyan-400 transition cursor-pointer shadow-lg shadow-cyan-500/30"
              >
                <Volume2 className="w-6 h-6" />
              </button>
              <span className="text-xs text-cyan-300 font-semibold">Audio gapni eshitish uchun bosing</span>
            </div>
          </div>
        )}

        {/* Question text */}
        <h2 className="text-lg sm:text-xl font-bold text-white leading-relaxed font-['Outfit']">
          {currentQ.question}
        </h2>

        {/* Options list */}
        <div className="space-y-3 pt-2">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedOption === option;
            const isCorrectOption = option.trim() === currentQ.correct_answer.trim();
            
            let btnStyle = "bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700";

            if (isAnswerSubmitted) {
              if (isCorrectOption) {
                btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
              } else if (isSelected && !isCorrectOption) {
                btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300";
              } else {
                btnStyle = "bg-slate-950/60 border-slate-900 text-slate-500 opacity-60";
              }
            } else if (isSelected) {
              btnStyle = "bg-indigo-600/30 border-indigo-500 text-white font-bold ring-2 ring-indigo-500/40";
            }

            return (
              <button
                key={idx}
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

                {isAnswerSubmitted && isCorrectOption && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                )}
                {isAnswerSubmitted && isSelected && !isCorrectOption && (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Alert upon submitting answer */}
        {isAnswerSubmitted && (
          <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-xs space-y-1.5 animate-fade-in">
            <div className="flex items-center gap-1.5 text-indigo-300 font-bold">
              <HelpCircle className="w-4 h-4" />
              <span>Izoh va Grammatika tahlili:</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              {currentQ.explanation}
            </p>
          </div>
        )}

        {/* Bottom Action buttons */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          {!isAnswerSubmitted ? (
            <button
              disabled={!selectedOption}
              onClick={handleCheckAnswer}
              className={`px-6 py-3 rounded-xl text-xs font-bold transition shadow-lg ${
                selectedOption
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/30 cursor-pointer active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              Javobni Tekshirish
            </button>
          ) : (
            <button
              onClick={handleNextQuestion}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition active:scale-95 cursor-pointer"
            >
              <span>{currentIndex < questions.length - 1 ? 'Keyingi Savol' : 'Natijani Ko‘rish'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          )}
        </div>

      </div>

      {/* Result Modal */}
      <QuizResultModal
        isOpen={isResultOpen}
        attempt={completedAttempt}
        onClose={() => {
          setIsResultOpen(false);
          onBack();
        }}
        onRetry={handleRetry}
      />
    </div>
  );
};
