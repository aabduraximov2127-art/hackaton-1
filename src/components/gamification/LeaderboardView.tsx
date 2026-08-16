import React, { useState } from 'react';
import { Trophy, Crown } from 'lucide-react';
import { User } from '../../types';
import { OsonStorageService } from '../../services/storage';

interface LeaderboardViewProps {
  currentUser: User;
}

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<'weekly' | 'alltime'>('weekly');

  const allUsers = OsonStorageService.getAllUsers();
  const sortedUsers = [...allUsers].sort((a, b) => b.total_xp - a.total_xp);

  const top1 = sortedUsers[0];
  const top2 = sortedUsers[1];
  const top3 = sortedUsers[2];
  const restUsers = sortedUsers.slice(3);

  const currentUserRank = sortedUsers.findIndex(u => u.id === currentUser.id) + 1;

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold">
          <Trophy className="w-3.5 h-3.5 text-amber-400" />
          <span>Global Leaderboard</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
          O‘quvchilar Reytingi (Top XP)
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Darslar, testlar, speaking va AI muloqotlar orqali XP yig‘ing va haftalik yetakchiga aylaning!
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center">
        <div className="flex p-1 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'weekly' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Haftalik Reyting
          </button>
          <button
            onClick={() => setActiveTab('alltime')}
            className={`px-6 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'alltime' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            Umumiy (All-Time)
          </button>
        </div>
      </div>

      {/* TOP 3 PODIUM */}
      <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end pt-6 pb-2">
        
        {/* 2nd Place */}
        {top2 && (
          <div className="flex flex-col items-center space-y-3 p-4 rounded-3xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="relative">
              <img
                src={top2.avatar}
                alt={top2.first_name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-slate-400 shadow-xl"
              />
              <span className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-slate-400 text-slate-950 flex items-center justify-center font-black text-xs shadow">
                2
              </span>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white font-['Outfit'] line-clamp-1">{top2.first_name}</h3>
              <div className="text-[11px] font-black text-slate-400">{top2.total_xp} XP</div>
            </div>
          </div>
        )}

        {/* 1st Place (Crown) */}
        {top1 && (
          <div className="flex flex-col items-center space-y-3 p-5 sm:p-6 rounded-3xl bg-gradient-to-b from-amber-500/20 via-slate-900 to-slate-900 border-2 border-amber-500/50 text-center shadow-2xl shadow-amber-500/10">
            <Crown className="w-8 h-8 text-amber-400 animate-bounce" />
            <div className="relative">
              <img
                src={top1.avatar}
                alt={top1.first_name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-amber-400 shadow-2xl ring-4 ring-amber-400/20"
              />
              <span className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-sm shadow-lg">
                1
              </span>
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-white font-['Outfit']">{top1.first_name} {top1.last_name}</h3>
              <div className="text-xs sm:text-sm font-black text-amber-400">{top1.total_xp} XP</div>
            </div>
          </div>
        )}

        {/* 3rd Place */}
        {top3 && (
          <div className="flex flex-col items-center space-y-3 p-4 rounded-3xl bg-slate-900/80 border border-slate-800 text-center">
            <div className="relative">
              <img
                src={top3.avatar}
                alt={top3.first_name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-4 border-amber-700 shadow-xl"
              />
              <span className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-amber-700 text-white flex items-center justify-center font-black text-xs shadow">
                3
              </span>
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-bold text-white font-['Outfit'] line-clamp-1">{top3.first_name}</h3>
              <div className="text-[11px] font-black text-amber-600">{top3.total_xp} XP</div>
            </div>
          </div>
        )}

      </div>

      {/* CURRENT USER RANK BAR */}
      <div className="p-4 rounded-2xl bg-indigo-600 text-white flex items-center justify-between shadow-xl shadow-indigo-600/20">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center font-black text-xs">
            #{currentUserRank}
          </span>
          <img src={currentUser.avatar} alt={currentUser.first_name} className="w-10 h-10 rounded-full object-cover border-2 border-white" />
          <div>
            <div className="text-xs font-bold">Sizning o‘rningiz ({currentUser.first_name} {currentUser.last_name})</div>
            <div className="text-[11px] text-indigo-200">{currentUser.current_level} Daraja • {currentUser.streak} kun streak 🔥</div>
          </div>
        </div>

        <span className="text-base font-black font-['Outfit']">{currentUser.total_xp} XP</span>
      </div>

      {/* Rest of the table */}
      <div className="space-y-2.5">
        {restUsers.map((user, idx) => (
          <div
            key={user.id}
            className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-slate-950 border border-slate-800 text-slate-400 flex items-center justify-center font-bold text-xs">
                {idx + 4}
              </span>
              <img src={user.avatar} alt={user.first_name} className="w-9 h-9 rounded-full object-cover" />
              <div>
                <div className="text-xs font-bold text-white">{user.first_name} {user.last_name}</div>
                <div className="text-[10px] text-slate-400">{user.current_level} Daraja • {user.streak} kun streak 🔥</div>
              </div>
            </div>

            <span className="text-xs font-black text-amber-400 font-['Outfit']">{user.total_xp} XP</span>
          </div>
        ))}
      </div>

    </div>
  );
};
