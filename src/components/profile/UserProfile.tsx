import React, { useState } from 'react';
import { 
  Edit2, Save 
} from 'lucide-react';
import { User } from '../../types';
import { OsonStorageService } from '../../services/storage';
import { soundFX } from '../../services/audio';

interface UserProfileProps {
  currentUser: User;
  onUpdateUser: (user: User) => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ currentUser, onUpdateUser }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [firstName, setFirstName] = useState(currentUser.first_name);
  const [lastName, setLastName] = useState(currentUser.last_name);
  const [age, setAge] = useState(currentUser.age);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  const quizAttempts = OsonStorageService.getQuizAttempts(currentUser.id);
  const speakingAttempts = OsonStorageService.getSpeakingAttempts(currentUser.id);
  const userAchs = OsonStorageService.getUserAchievements(currentUser.id);

  const avatarOptions = [
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80'
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playCorrect();
    const updatedUser: User = {
      ...currentUser,
      first_name: firstName,
      last_name: lastName,
      age: Number(age),
      avatar: avatar
    };

    OsonStorageService.updateUser(updatedUser);
    onUpdateUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16 max-w-4xl mx-auto">
      
      {/* Profile Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.first_name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-indigo-500 shadow-xl"
            />
            <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-lg bg-indigo-600 text-white font-black text-[11px] shadow">
              {currentUser.current_level}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
                {currentUser.first_name} {currentUser.last_name}
              </h1>
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                {currentUser.role}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">{currentUser.email} • {currentUser.phone}</p>
            <div className="flex items-center gap-3 pt-1 text-xs text-slate-300 font-semibold">
              <span>Yosh: {currentUser.age}</span>
              <span>•</span>
              <span className="text-amber-400">🔥 {currentUser.streak} kun streak</span>
              <span>•</span>
              <span className="text-indigo-400">✨ {currentUser.total_xp} XP</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 transition self-start md:self-center"
        >
          <Edit2 className="w-3.5 h-3.5" />
          <span>{isEditing ? 'Bekor qilish' : 'Profilni tahrirlash'}</span>
        </button>
      </div>

      {/* Edit Form */}
      {isEditing && (
        <form onSubmit={handleSave} className="p-6 rounded-3xl bg-slate-900 border border-indigo-500/40 space-y-4 animate-fade-in shadow-xl">
          <h3 className="text-sm font-bold text-white font-['Outfit']">Shaxsiy ma’lumotlarni tahrirlash</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Ism</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Familiya</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Yosh</label>
              <input
                type="number"
                min={10}
                max={99}
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-indigo-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Avatarni tanlang</label>
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {avatarOptions.map((av, idx) => (
                <img
                  key={idx}
                  src={av}
                  alt="avatar option"
                  onClick={() => setAvatar(av)}
                  className={`w-12 h-12 rounded-2xl object-cover cursor-pointer border-2 transition ${
                    avatar === av ? 'border-indigo-500 ring-2 ring-indigo-400 scale-105' : 'border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-indigo-600/30 transition"
          >
            <Save className="w-3.5 h-3.5" /> Saqlash
          </button>
        </form>
      )}

      {/* Stats Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 text-center">
          <div className="text-xs font-bold text-slate-400">Ishlangan Testlar</div>
          <div className="text-3xl font-black text-amber-400 font-['Outfit']">{quizAttempts.length} ta</div>
          <div className="text-[11px] text-slate-500">Muvaffaqiyatli yakunlangan</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 text-center">
          <div className="text-xs font-bold text-slate-400">Speaking Sinovlari</div>
          <div className="text-3xl font-black text-pink-400 font-['Outfit']">{speakingAttempts.length} ta</div>
          <div className="text-[11px] text-slate-500">AI audio tahlillari</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-1 text-center">
          <div className="text-xs font-bold text-slate-400">Ochilgan Yutuqlar</div>
          <div className="text-3xl font-black text-emerald-400 font-['Outfit']">{userAchs.length} ta</div>
          <div className="text-[11px] text-slate-500">Medallar to‘plami</div>
        </div>

      </div>

    </div>
  );
};
