import React, { useEffect } from 'react';
import { Trophy, CheckCircle2, XCircle, Clock, Sparkles, RotateCcw, ArrowRight, X } from 'lucide-react';
import { QuizAttempt } from '../../types';
import { fireConfetti } from '../common/ConfettiTrigger';
import { soundFX } from '../../services/audio';

interface QuizResultModalProps {
  isOpen: boolean;
  attempt: QuizAttempt | null;
  onClose: () => void;
  onRetry: () => void;
}

export const QuizResultModal: React.FC<QuizResultModalProps> = ({
  isOpen,
  attempt,
  onClose,
  onRetry
}) => {
  useEffect(() => {
    if (isOpen && attempt) {
      if (attempt.score_percentage >= 80) {
        soundFX.playLevelUp();
        fireConfetti();
      } else {
        soundFX.playCorrect();
      }
    }
  }, [isOpen, attempt]);

  if (!isOpen || !attempt) return null;

  const isPassed = attempt.score_percentage >= 80;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-slate-100 text-center space-y-6">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge Icon */}
        <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mx-auto text-3xl shadow-xl ${
          isPassed 
            ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-amber-500/30 ring-4 ring-amber-500/20' 
            : 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
        }`}>
          {isPassed ? '🏆' : '🎯'}
        </div>

        {/* Title & Score */}
        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            {attempt.quiz_title}
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
            {isPassed ? 'Ajoyib Natija!' : 'Yaxshi Urinish!'}
          </h3>
          <p className="text-xs text-slate-400">
            {isPassed 
              ? 'Siz ushbu testdan muvaffaqiyatli o‘tdingiz va XP to‘pladingiz!' 
              : 'Qaytadan urinib ko‘rib, 100% natijaga erishishingiz mumkin.'}
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-950 border border-slate-800/80">
          <div>
            <div className="text-[11px] text-slate-400 font-semibold mb-0.5">Natija</div>
            <div className={`text-xl font-black font-['Outfit'] ${isPassed ? 'text-emerald-400' : 'text-amber-400'}`}>
              {attempt.score_percentage}%
            </div>
          </div>

          <div>
            <div className="text-[11px] text-slate-400 font-semibold mb-0.5">To‘g‘ri javob</div>
            <div className="text-xl font-black text-white font-['Outfit']">
              {attempt.correct_answers}/{attempt.total_questions}
            </div>
          </div>

          <div>
            <div className="text-[11px] text-slate-400 font-semibold mb-0.5">Olingan XP</div>
            <div className="text-xl font-black text-indigo-400 font-['Outfit'] flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4" /> +{attempt.xp_earned}
            </div>
          </div>
        </div>

        {/* Weak Topics Analysis */}
        {attempt.weak_topics.length > 0 && (
          <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-left text-xs space-y-1">
            <span className="font-bold text-indigo-300">💡 Tavsiya:</span>
            <p className="text-slate-300 text-[11px]">
              Quyidagi mavzularni takrorlash tavsiya etiladi: <strong className="text-indigo-200">{attempt.weak_topics.join(', ')}</strong>
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={onRetry}
            className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Qayta ishlash
          </button>
          
          <button
            onClick={onClose}
            className="flex-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/30 transition"
          >
            Davom etish <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
