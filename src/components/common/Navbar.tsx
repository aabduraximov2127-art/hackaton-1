import React, { useState } from 'react';
import { 
  Flame, BookOpen, Mic, Bot, BrainCircuit, Trophy, MapPin, 
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
  const [isLight, setIsLight] = useState(false);

  const handleTabClick = (tab: string) => {
    soundFX.playClick();
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.setAttribute('data-theme', next ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-[#0b0c10]/80 backdrop-blur-xl transition-all">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          
          {/* Logo & Brand matching message.txt */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleTabClick('dashboard')}>
            <div className="w-7 h-7 rounded-lg bg-[#ff6b4a] flex items-center justify-center font-bold text-sm text-[#170d08] shadow-md shadow-[#ff6b4a]/20">
              語
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold font-['Space_Grotesk'] text-[#f1f0ee] tracking-tight">
                OSON
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded-full border border-white/10 font-mono text-[10px] text-[#8f8f96]">
                v2.0
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          {currentUser && (
            <nav className="hidden lg:flex items-center gap-1 bg-[#111318] p-1 rounded-full border border-white/5">
              <button
                onClick={() => handleTabClick('dashboard')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  activeTab === 'dashboard'
                    ? 'bg-[#ff6b4a] text-[#170d08] font-bold shadow-md shadow-[#ff6b4a]/20'
                    : 'text-[#8f8f96] hover:text-[#f1f0ee]'
                }`}
              >
                Dashboard
              </button>

              <button
                onClick={() => handleTabClick('courses')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  activeTab === 'courses' || activeTab === 'course-detail' || activeTab === 'topic-view'
                    ? 'bg-[#ff6b4a] text-[#170d08] font-bold shadow-md shadow-[#ff6b4a]/20'
                    : 'text-[#8f8f96] hover:text-[#f1f0ee]'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Kurslar</span>
              </button>

              <button
                onClick={() => handleTabClick('quizzes')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  activeTab === 'quizzes' || activeTab === 'quiz-player'
                    ? 'bg-[#ff6b4a] text-[#170d08] font-bold shadow-md shadow-[#ff6b4a]/20'
                    : 'text-[#8f8f96] hover:text-[#f1f0ee]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Testlar</span>
              </button>

              <button
                onClick={() => handleTabClick('speaking')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  activeTab === 'speaking'
                    ? 'bg-[#ff6b4a] text-[#170d08] font-bold shadow-md shadow-[#ff6b4a]/20'
                    : 'text-[#8f8f96] hover:text-[#f1f0ee]'
                }`}
              >
                <Mic className="w-3.5 h-3.5" />
                <span>Speaking</span>
              </button>

              <button
                onClick={() => handleTabClick('ai-tutor')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  activeTab === 'ai-tutor'
                    ? 'bg-[#ff6b4a] text-[#170d08] font-bold shadow-md shadow-[#ff6b4a]/20'
                    : 'text-[#8f8f96] hover:text-[#f1f0ee]'
                }`}
              >
                <Bot className="w-3.5 h-3.5" />
                <span>AI Tutor</span>
              </button>

              <button
                onClick={() => handleTabClick('vocabulary')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  activeTab === 'vocabulary'
                    ? 'bg-[#ff6b4a] text-[#170d08] font-bold shadow-md shadow-[#ff6b4a]/20'
                    : 'text-[#8f8f96] hover:text-[#f1f0ee]'
                }`}
              >
                <BrainCircuit className="w-3.5 h-3.5" />
                <span>So‘zlar</span>
              </button>

              <button
                onClick={() => handleTabClick('leaderboard')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  activeTab === 'leaderboard'
                    ? 'bg-[#ff6b4a] text-[#170d08] font-bold shadow-md shadow-[#ff6b4a]/20'
                    : 'text-[#8f8f96] hover:text-[#f1f0ee]'
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Reyting</span>
              </button>

              <button
                onClick={() => handleTabClick('map')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
                  activeTab === 'map'
                    ? 'bg-[#ff6b4a] text-[#170d08] font-bold shadow-md shadow-[#ff6b4a]/20'
                    : 'text-[#8f8f96] hover:text-[#f1f0ee]'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Xarita</span>
              </button>
            </nav>
          )}

          {/* Right Header Controls */}
          <div className="flex items-center gap-2.5">
            
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-xs hover:border-[#ff6b4a] hover:bg-[#ff6b4a]/10 transition cursor-pointer"
              title="Mavzuni almashtirish (Dark / Light)"
            >
              {isLight ? '🌙' : '☀️'}
            </button>

            {currentUser ? (
              <>
                {/* Gamification Stats (Streak & XP) */}
                <div className="hidden sm:flex items-center gap-2">
                  <button
                    onClick={onOpenStreakModal}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#161920] border border-white/10 hover:border-[#ff6b4a] text-xs font-mono font-bold text-[#ff6b4a] transition cursor-pointer"
                  >
                    <Flame className="w-3.5 h-3.5 fill-[#ff6b4a]" />
                    <span>{currentUser.streak} kun</span>
                  </button>

                  <button
                    onClick={onOpenXPModal}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#161920] border border-white/10 hover:border-amber-500 text-xs font-mono font-bold text-amber-300 transition cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>{currentUser.total_xp} XP</span>
                  </button>
                </div>

                {/* Role Switcher Pill */}
                <div className="relative">
                  <button
                    onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-[#161920] text-xs font-bold text-[#f1f0ee] hover:border-[#ff6b4a] transition cursor-pointer"
                  >
                    {currentUser.role === 'ADMIN' && <Shield className="w-3.5 h-3.5 text-rose-400" />}
                    {currentUser.role === 'USER' && <UserIcon className="w-3.5 h-3.5 text-indigo-400" />}
                    <span className="hidden md:inline">{currentUser.role}</span>
                  </button>

                  {roleDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-[#161920] border border-white/10 shadow-2xl p-1.5 z-50 animate-fade-in text-xs">
                      <div className="px-3 py-2 text-[10px] font-mono text-[#8f8f96] uppercase border-b border-white/5">
                        Rolni tanlash
                      </div>
                      <button
                        onClick={() => { onSwitchRole('USER'); setRoleDropdownOpen(false); }}
                        className="w-full px-3 py-2 rounded-xl text-left hover:bg-white/5 flex items-center gap-2 text-white font-medium"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-indigo-400" />
                        <span>O‘quvchi (USER)</span>
                      </button>
                      <button
                        onClick={() => { onSwitchRole('ADMIN'); setRoleDropdownOpen(false); }}
                        className="w-full px-3 py-2 rounded-xl text-left hover:bg-white/5 flex items-center gap-2 text-rose-300 font-medium"
                      >
                        <Shield className="w-3.5 h-3.5 text-rose-400" />
                        <span>Boshqaruv (ADMIN)</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Profile Avatar / Logout */}
                <button
                  onClick={() => handleTabClick('profile')}
                  className="w-8 h-8 rounded-full border border-white/10 overflow-hidden hover:border-[#ff6b4a] transition cursor-pointer"
                >
                  <img src={currentUser.avatar} alt={currentUser.first_name} className="w-full h-full object-cover" />
                </button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={onOpenAuth}
                  className="btn-accent px-4 py-2 text-xs font-bold"
                >
                  Kirish
                </button>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-white/10 text-[#8f8f96] hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-white/5 bg-[#0b0c10] px-4 py-4 space-y-2 animate-fade-in">
          {currentUser && (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => handleTabClick('dashboard')}
                className="p-2.5 rounded-xl bg-[#161920] text-left text-white font-medium"
              >
                Dashboard
              </button>
              <button
                onClick={() => handleTabClick('courses')}
                className="p-2.5 rounded-xl bg-[#161920] text-left text-white font-medium"
              >
                Kurslar
              </button>
              <button
                onClick={() => handleTabClick('quizzes')}
                className="p-2.5 rounded-xl bg-[#161920] text-left text-white font-medium"
              >
                Testlar (Quiz)
              </button>
              <button
                onClick={() => handleTabClick('speaking')}
                className="p-2.5 rounded-xl bg-[#161920] text-left text-white font-medium"
              >
                Speaking Studio
              </button>
              <button
                onClick={() => handleTabClick('ai-tutor')}
                className="p-2.5 rounded-xl bg-[#161920] text-left text-white font-medium"
              >
                AI Tutor
              </button>
              <button
                onClick={() => handleTabClick('vocabulary')}
                className="p-2.5 rounded-xl bg-[#161920] text-left text-white font-medium"
              >
                So‘zlar (SRS)
              </button>
              <button
                onClick={() => handleTabClick('leaderboard')}
                className="p-2.5 rounded-xl bg-[#161920] text-left text-white font-medium"
              >
                Reyting
              </button>
              <button
                onClick={() => handleTabClick('map')}
                className="p-2.5 rounded-xl bg-[#161920] text-left text-white font-medium"
              >
                Xarita
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
