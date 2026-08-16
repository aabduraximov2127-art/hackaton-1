import React from 'react';
import { X, ShieldCheck } from 'lucide-react';
import { User } from '../../types';
import { OsonStorageService } from '../../services/storage';

interface StreakModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
}

export const StreakModal: React.FC<StreakModalProps> = ({
  isOpen,
  onClose,
  currentUser
}) => {
  if (!isOpen) return null;

  const streakData = OsonStorageService.getStreakData(currentUser.id);
  const daysOfWeek = ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'];
  const todayDayIndex = (new Date().getDay() + 6) % 7;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-slate-100 text-center space-y-6">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Flame Graphic */}
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center mx-auto text-4xl shadow-2xl shadow-amber-500/30 animate-pulse">
          🔥
        </div>

        <div className="space-y-1">
          <h3 className="text-3xl font-black text-white font-['Outfit']">
            {currentUser.streak} Kunlik O‘qish Ketma-ketligi!
          </h3>
          <p className="text-xs text-slate-400">
            Siz ajoyib intizom ko‘rsatmoqdasiz. Eng uzun ketma-ketligingiz: <strong className="text-amber-400">{streakData.longest_streak} kun</strong>
          </p>
        </div>

        {/* 7 Days tracker */}
        <div className="grid grid-cols-7 gap-2 p-4 rounded-2xl bg-slate-950 border border-slate-800">
          {daysOfWeek.map((day, idx) => {
            const isPassed = idx <= todayDayIndex;
            const isToday = idx === todayDayIndex;
            return (
              <div key={day} className="flex flex-col items-center gap-1.5">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold ${
                  isToday
                    ? 'bg-amber-500 text-slate-950 font-black ring-2 ring-amber-400 shadow'
                    : isPassed
                    ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                    : 'bg-slate-900 text-slate-600'
                }`}>
                  {isPassed ? '🔥' : '•'}
                </div>
                <span className={`text-[10px] ${isToday ? 'font-bold text-amber-400' : 'text-slate-500'}`}>{day}</span>
              </div>
            );
          })}
        </div>

        {/* Streak benefits card */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-left text-xs space-y-2">
          <div className="flex items-center gap-2 text-amber-300 font-bold">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Streak Qoidalari & Mukofotlari:</span>
          </div>
          <p className="text-slate-300 text-[11px]">
            Har kuni kamida 1 ta dars, test yoki speaking sinovini bajaring. 7 kunga yetganda <strong className="text-amber-400">+150 XP</strong> va "7 Day Warrior" medali ochiladi!
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs shadow-lg shadow-amber-600/30 transition"
        >
          O‘qishni Davom Ettirish
        </button>

      </div>
    </div>
  );
};
