import React, { useState } from 'react';
import { 
  X, Award, CheckCircle2, XCircle, Clock, 
  Sparkles, ArrowRight, RotateCcw, Volume2 
} from 'lucide-react';
import { User, LevelCode, Question } from '../../types';
import { OsonStorageService } from '../../services/storage';
import { soundFX, speakEnglish } from '../../services/audio';
import { fireLevelUpConfetti } from '../common/ConfettiTrigger';

interface LevelTestModalProps {
  isOpen: boolean;
  onClose: () => void;
  levelCode: LevelCode;
  currentUser: User;
  onLevelPassed: (newLevel: LevelCode) => void;
}

export const LevelTestModal: React.FC<LevelTestModalProps> = ({
  isOpen,
  onClose,
  levelCode,
  currentUser,
  onLevelPassed
}) => {
  if (!isOpen) return null;

  const allQuestions = OsonStorageService.getQuestions(undefined, levelCode);
  const questions: Question[] = allQuestions.length > 0 ? allQuestions : OsonStorageService.getQuestions();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [submittedAnswers, setSubmittedAnswers] = useState<{ [qId: string]: string }>({});
  const [isFinished, setIsFinished] = useState(false);
  const [scorePercentage, setScorePercentage] = useState(0);

  const currentQ = questions[currentIndex];

  const handleSelect = (opt: string) => {
    soundFX.playClick();
    setSelectedOption(opt);
    setSubmittedAnswers(prev => ({ ...prev, [currentQ.id]: opt }));
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(submittedAnswers[questions[currentIndex + 1]?.id] || null);
    } else {
      finishTest();
    }
  };

  const finishTest = () => {
    let correct = 0;
    questions.forEach(q => {
      if (submittedAnswers[q.id]?.trim() === q.correct_answer.trim()) {
        correct++;
      }
    });

    const percent = Math.round((correct / questions.length) * 100);
    setScorePercentage(percent);
    setIsFinished(true);

    if (percent >= 80) {
      soundFX.playLevelUp();
      fireLevelUpConfetti();

      // Upgrade level in user profile
      const levelsOrder: LevelCode[] = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
      const curIdx = levelsOrder.indexOf(levelCode);
      const nextLevel = curIdx < levelsOrder.length - 1 ? levelsOrder[curIdx + 1] : levelCode;

      currentUser.current_level = nextLevel;
      OsonStorageService.addXP(currentUser.id, 100, 'level_test', `${levelCode} Daraja Imtihonidan Muvaffaqiyatli O‘tildi!`);
      OsonStorageService.updateUser(currentUser);
      onLevelPassed(nextLevel);
    } else {
      soundFX.playWrong();
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setSubmittedAnswers({});
    setIsFinished(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-slate-100 space-y-6">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {!isFinished ? (
          <div className="space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black">
                  🎓
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white font-['Outfit']">
                    {levelCode} Daraja Yakuniy Imtihoni (Certification)
                  </h3>
                  <p className="text-xs text-slate-400">O‘tish bali: 80% • Savol {currentIndex + 1} / {questions.length}</p>
                </div>
              </div>

              <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20">
                +100 XP
              </span>
            </div>

            {/* Progress */}
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-500 transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Box */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              {currentQ.audio_phrase && (
                <button
                  onClick={() => speakEnglish(currentQ.audio_phrase || '')}
                  className="px-3.5 py-1.5 rounded-xl bg-cyan-600/20 text-cyan-300 text-xs font-bold flex items-center gap-2"
                >
                  <Volume2 className="w-4 h-4" /> Gapni tinglash
                </button>
              )}

              <h2 className="text-base sm:text-lg font-bold text-white font-['Outfit']">
                {currentQ.question}
              </h2>

              <div className="space-y-2.5 pt-2">
                {currentQ.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelect(opt)}
                    className={`w-full p-3.5 rounded-xl border text-left text-xs font-semibold transition ${
                      selectedOption === opt
                        ? 'bg-indigo-600 text-white border-indigo-500 shadow'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="mr-2 font-bold text-slate-400">{String.fromCharCode(65 + idx)})</span>
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Action */}
            <div className="flex justify-end pt-2">
              <button
                disabled={!selectedOption}
                onClick={handleNext}
                className={`px-6 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition ${
                  selectedOption
                    ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/30 cursor-pointer'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <span>{currentIndex < questions.length - 1 ? 'Keyingi Savol' : 'Imtihonni Yakunlash'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        ) : (
          <div className="text-center py-6 space-y-6">
            
            <div className={`w-24 h-24 rounded-3xl flex items-center justify-center mx-auto text-4xl shadow-2xl ${
              scorePercentage >= 80 
                ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white ring-4 ring-amber-400/30' 
                : 'bg-slate-800 text-slate-400'
            }`}>
              {scorePercentage >= 80 ? '👑' : '📚'}
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
                {scorePercentage >= 80 ? 'TABRIKLAYMIZ! IMTIHON TOPSHIRILDI!' : 'BALL YETARLI BO‘LMADI'}
              </h3>
              <p className="text-xs text-slate-400">
                {scorePercentage >= 80 
                  ? `Siz ${scorePercentage}% to‘pladingiz va keyingi yangi darajani ochdingiz!` 
                  : `Siz ${scorePercentage}% to‘pladingiz. O‘tish uchun kamida 80% kerak. Mavzularni takrorlab yana topshiring.`}
              </p>
            </div>

            {scorePercentage >= 80 && (
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 max-w-md mx-auto space-y-1 text-xs text-amber-300 font-bold">
                <div>🎖️ Yangi Sertifikatlangan Daraja: {currentUser.current_level}</div>
                <div className="text-slate-300 font-normal text-[11px]">+100 XP balansingizga qo‘shildi!</div>
              </div>
            )}

            <div className="flex justify-center gap-3 pt-2">
              {scorePercentage < 80 ? (
                <button
                  onClick={handleRetry}
                  className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" /> Qayta topshirish
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 text-white font-bold text-xs shadow-lg shadow-amber-600/30"
                >
                  Dashboardga Qaytish
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
