import React, { useState } from 'react';
import { 
  Flame, Award, BookOpen, Mic, Bot, BrainCircuit, Trophy, MapPin, 
  User as UserIcon, Shield, Stethoscope, LogOut, Menu, X, Sparkles, MessageCircle 
} from 'lucide-react';
import { User, UserRole } from '../../types';
import { soundFX } from '../../services/audio';

interface NavbarProps {
  currentUser: User | null;
  activeTab: string;
  onSelectTab: (tab: string) => void;
  onOpenAuth: () => void;
  onOpenContact: () => void;
  onOpenXPModal: () => void;
  onOpenStreakModal: () => void;
  onSwitchRole: (role: UserRole) => void;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  activeTab,
  onSelectTab,
  onOpenAuth,
  onOpenContact,
  onOpenXPModal,
  onOpenStreakModal,
  onSwitchRole,
  onLogout
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const handleTabClick = (tab: string) => {
    soundFX.playClick();
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleTabClick('dashboard')}>
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 transform hover:scale-105 transition">
              <span className="text-2xl">🚀</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl sm:text-2xl font-black tracking-tight font-['Outfit'] bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                  OSON
                </span>
                <span className="text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                  Hackathon 2026
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400 hidden sm:block">Learn. Play. Speak.</p>
            </div>
          </div>

          {/* Desktop Nav Links */}
          {currentUser && (
            <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800/60">
              <button
                onClick={() => handleTabClick('dashboard')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'dashboard'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <span>Dashboard</span>
              </button>

              <button
                onClick={() => handleTabClick('courses')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'courses' || activeTab === 'course-detail' || activeTab === 'topic-view'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Kurslar</span>
              </button>

              <button
                onClick={() => handleTabClick('quizzes')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'quizzes' || activeTab === 'quiz-player'
                    ? 'bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-md shadow-amber-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Testlar (Quiz)</span>
              </button>

              <button
                onClick={() => handleTabClick('speaking')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'speaking'
                    ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-md shadow-rose-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Mic className="w-3.5 h-3.5 text-pink-400" />
                <span>Speaking Studio</span>
              </button>

              <button
                onClick={() => handleTabClick('ai-tutor')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'ai-tutor'
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Bot className="w-3.5 h-3.5 text-purple-400" />
                <span>AI Tutor</span>
              </button>

              <button
                onClick={() => handleTabClick('vocabulary')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'vocabulary'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>So‘zlar (SRS)</span>
              </button>

              <button
                onClick={() => handleTabClick('leaderboard')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'leaderboard'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>Reyting</span>
              </button>

              <button
                onClick={() => handleTabClick('map')}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'map'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>Xarita</span>
              </button>
            </nav>
          )}

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Quick Role Switcher for Hackathon Demo */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:border-slate-500 transition"
                title="Hackathon Demo Rolini Tanlash"
              >
                {currentUser?.role === 'ADMIN' ? (
                  <Shield className="w-3.5 h-3.5 text-rose-400" />
                ) : currentUser?.role === 'DOCTOR' ? (
                  <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
                ) : (
                  <UserIcon className="w-3.5 h-3.5 text-emerald-400" />
                )}
                <span className="hidden md:inline font-bold">
                  {currentUser?.role || 'Guest'}
                </span>
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 py-2 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl z-50 animate-fade-in text-xs">
                  <div className="px-3 py-1 text-[10px] uppercase font-bold text-slate-500">
                    Rolni o‘zgartirish (Demo)
                  </div>
                  <button
                    onClick={() => { onSwitchRole('USER'); setRoleDropdownOpen(false); }}
                    className={`w-full px-3 py-2 flex items-center gap-2 text-left hover:bg-slate-800 ${
                      currentUser?.role === 'USER' ? 'text-emerald-400 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <UserIcon className="w-4 h-4 text-emerald-400" /> USER (O‘quvchi)
                  </button>
                  <button
                    onClick={() => { onSwitchRole('DOCTOR'); setRoleDropdownOpen(false); }}
                    className={`w-full px-3 py-2 flex items-center gap-2 text-left hover:bg-slate-800 ${
                      currentUser?.role === 'DOCTOR' ? 'text-cyan-400 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <Stethoscope className="w-4 h-4 text-cyan-400" /> DOCTOR (Psixolog)
                  </button>
                  <button
                    onClick={() => { onSwitchRole('ADMIN'); setRoleDropdownOpen(false); }}
                    className={`w-full px-3 py-2 flex items-center gap-2 text-left hover:bg-slate-800 ${
                      currentUser?.role === 'ADMIN' ? 'text-rose-400 font-bold' : 'text-slate-300'
                    }`}
                  >
                    <Shield className="w-4 h-4 text-rose-400" /> ADMIN (Boshqaruv)
                  </button>
                </div>
              )}
            </div>

            {currentUser ? (
              <>
                {/* Streak Badge */}
                <button
                  onClick={onOpenStreakModal}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold hover:bg-amber-500/20 transition cursor-pointer"
                >
                  <Flame className="w-4 h-4 fill-amber-400 text-amber-500 animate-pulse" />
                  <span>{currentUser.streak} kun</span>
                </button>

                {/* XP Pill */}
                <button
                  onClick={onOpenXPModal}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold hover:bg-indigo-500/20 transition cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{currentUser.total_xp} XP</span>
                </button>

                {/* Level Badge */}
                <span className="hidden sm:flex items-center justify-center px-2.5 py-1 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black">
                  {currentUser.current_level}
                </span>

                {/* Profile Trigger */}
                <button
                  onClick={() => handleTabClick('profile')}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl overflow-hidden border-2 border-indigo-500/40 hover:border-indigo-400 transition"
                  title="Mening Profilim"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.first_name}
                    className="w-full h-full object-cover"
                  />
                </button>
              </>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition"
              >
                Kirish / Ro‘yxatdan o‘tish
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-4 pt-2 pb-6 bg-slate-950 border-b border-slate-800 space-y-2 animate-fade-in">
          {currentUser && (
            <div className="grid grid-cols-2 gap-2 pt-2 pb-4">
              <button
                onClick={() => handleTabClick('dashboard')}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-left flex items-center gap-2"
              >
                <span>🏠 Dashboard</span>
              </button>
              <button
                onClick={() => handleTabClick('courses')}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-left flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-indigo-400" /> Kurslar
              </button>
              <button
                onClick={() => handleTabClick('quizzes')}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-left flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-400" /> Testlar (Quiz)
              </button>
              <button
                onClick={() => handleTabClick('speaking')}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-left flex items-center gap-2"
              >
                <Mic className="w-4 h-4 text-pink-400" /> Speaking
              </button>
              <button
                onClick={() => handleTabClick('ai-tutor')}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-left flex items-center gap-2"
              >
                <Bot className="w-4 h-4 text-purple-400" /> AI Tutor
              </button>
              <button
                onClick={() => handleTabClick('vocabulary')}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-left flex items-center gap-2"
              >
                <BrainCircuit className="w-4 h-4 text-teal-400" /> So‘zlar
              </button>
              <button
                onClick={() => handleTabClick('leaderboard')}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-left flex items-center gap-2"
              >
                <Trophy className="w-4 h-4 text-amber-400" /> Reyting
              </button>
              <button
                onClick={() => handleTabClick('map')}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-left flex items-center gap-2"
              >
                <MapPin className="w-4 h-4 text-emerald-400" /> OSON Xarita
              </button>
              <button
                onClick={() => handleTabClick('profile')}
                className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-left flex items-center gap-2"
              >
                <UserIcon className="w-4 h-4 text-blue-400" /> Profil
              </button>
            </div>
          )}

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
            <button
              onClick={() => { onOpenContact(); setMobileMenuOpen(false); }}
              className="flex items-center gap-1.5 text-slate-400 hover:text-white"
            >
              <MessageCircle className="w-4 h-4 text-cyan-400" /> Bog‘lanish
            </button>
            {currentUser && (
              <button
                onClick={() => { onLogout(); setMobileMenuOpen(false); }}
                className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300"
              >
                <LogOut className="w-4 h-4" /> Chiqish
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
