import React from 'react';
import { Award, CheckCircle2 } from 'lucide-react';
import { User, Achievement } from '../../types';
import { OsonStorageService } from '../../services/storage';
import { soundFX } from '../../services/audio';
import { fireConfetti } from '../common/ConfettiTrigger';

interface AchievementsGridProps {
  currentUser: User;
}

export const AchievementsGrid: React.FC<AchievementsGridProps> = ({ currentUser }) => {
  const achievements = OsonStorageService.getAchievements();
  const userAchs = OsonStorageService.getUserAchievements(currentUser.id);

  const isUnlocked = (achId: string) => {
    return userAchs.some(ua => ua.achievement_id === achId);
  };

  const handleUnlockDemo = (ach: Achievement) => {
    OsonStorageService.unlockAchievement(currentUser.id, ach.id);
    soundFX.playLevelUp();
    fireConfetti();
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold">
          <Award className="w-3.5 h-3.5 text-indigo-400" />
          <span>Yutuqlar & Medallar</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
          Erishilgan Yutuqlar ({userAchs.length}/{achievements.length})
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Maxsus vazifalarni bajarib nishonlarni oching va qo‘shimcha XP to‘plang!
        </p>
      </div>

      {/* Grid of Achievements */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {achievements.map((ach) => {
          const unlocked = isUnlocked(ach.id);
          return (
            <div
              key={ach.id}
              className={`p-5 rounded-3xl border transition flex flex-col justify-between space-y-4 ${
                unlocked
                  ? 'bg-gradient-to-b from-indigo-950/40 via-slate-900 to-slate-900 border-indigo-500/40 shadow-xl shadow-indigo-500/10 ring-1 ring-indigo-500/20'
                  : 'bg-slate-900/60 border-slate-800/80 opacity-60'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${
                  unlocked ? 'bg-indigo-500/20 border border-indigo-500/30' : 'bg-slate-800'
                }`}>
                  {ach.icon}
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black ${
                  unlocked ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-500'
                }`}>
                  +{ach.xp_reward} XP
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-sm font-bold text-white font-['Outfit']">
                  {ach.title_uz}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {ach.description_uz}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs">
                {unlocked ? (
                  <span className="flex items-center gap-1 text-emerald-400 font-bold">
                    <CheckCircle2 className="w-4 h-4" /> Ochilgan
                  </span>
                ) : (
                  <button
                    onClick={() => handleUnlockDemo(ach)}
                    className="text-[11px] text-indigo-400 hover:text-indigo-300 font-bold underline"
                  >
                    (Demo: Ochish)
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
