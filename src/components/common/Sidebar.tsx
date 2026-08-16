import React, { useState } from 'react';
import { 
  Home, BookOpen, Sparkles, Mic, Bot, BrainCircuit, Trophy, 
  MapPin, Shield, LogOut, Globe, Flame, Moon, Sun, Menu, X, Check
} from 'lucide-react';
import { User, LanguageCode } from '../../types';
import { AVAILABLE_LANGUAGES } from '../../data/mockData';
import { soundFX } from '../../services/audio';

interface SidebarProps {
  currentUser: User | null;
  activeTab: string;
  activeLanguage: LanguageCode;
  onSelectTab: (tab: string) => void;
  onSelectLanguage: (lang: LanguageCode) => void;
  onOpenAuth: () => void;
  onOpenStreakModal: () => void;
  onOpenXPModal: () => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  activeTab,
  activeLanguage,
  onSelectTab,
  onSelectLanguage,
  onOpenAuth,
  onOpenStreakModal,
  onOpenXPModal,
  onLogout
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const handleNav = (tab: string) => {
    soundFX.playClick();
    onSelectTab(tab);
    setMobileOpen(false);
  };

  const toggleTheme = () => {
    const next = !isLight;
    setIsLight(next);
    document.documentElement.setAttribute('data-theme', next ? 'light' : 'dark');
  };

  const currentLangObj = AVAILABLE_LANGUAGES.find(l => l.code === activeLanguage) || AVAILABLE_LANGUAGES[0];

  return (
    <>
      {/* MOBILE TOP BAR */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#0b0c10]/95 border-b border-white/10 backdrop-blur-xl z-40 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => handleNav('dashboard')}>
          <div className="w-8 h-8 rounded-xl bg-[#ff6b4a] flex items-center justify-center font-bold text-sm text-[#170d08]">
            語
          </div>
          <span className="text-xl font-bold font-['Space_Grotesk'] text-white">OSON</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Active Language Chip */}
          <button
            onClick={() => setLangDropdownOpen(!langDropdownOpen)}
            className="px-2.5 py-1 rounded-full bg-[#161920] border border-white/10 text-xs font-bold flex items-center gap-1 text-white"
          >
            <span>{currentLangObj.flag}</span>
            <span className="uppercase">{currentLangObj.code}</span>
          </button>

          {/* Hamburger toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-xl border border-white/10 text-white hover:bg-white/5"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* BACKDROP FOR MOBILE */}
      {mobileOpen && (
        <div 
          onClick={() => setMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
        />
      )}

      {/* SIDEBAR MAIN CONTAINER */}
      <aside
        className={`fixed top-0 bottom-0 left-0 w-72 bg-[#111318] border-r border-white/10 z-50 flex flex-col justify-between p-4 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* TOP SECTION: BRAND & MULTI-LANGUAGE SELECTOR */}
        <div className="space-y-4">
          
          {/* Logo & Tagline */}
          <div 
            onClick={() => handleNav('dashboard')}
            className="flex items-center gap-3 px-2 py-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#ff6b4a] flex items-center justify-center font-bold text-lg text-[#170d08] shadow-lg shadow-[#ff6b4a]/20 group-hover:scale-105 transition">
              語
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold font-['Space_Grotesk'] text-white">OSON</span>
                <span className="px-1.5 py-0.2 rounded-md bg-[#ff6b4a]/10 text-[#ff6b4a] font-mono text-[10px] font-bold">
                  Teen App
                </span>
              </div>
              <p className="text-[11px] text-[#8f8f96] font-medium">O‘rgan · O‘yna · Gapir</p>
            </div>
          </div>

          {/* LANGUAGE PICKER ROW (English, Russian, French, Uzbek) */}
          <div className="p-2.5 rounded-2xl bg-[#161920] border border-white/5 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-[#8f8f96] px-1">
              <span className="flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#ff6b4a]" /> O‘rganish tili:
              </span>
              <span className="text-[#ff6b4a] font-mono uppercase">{currentLangObj.name}</span>
            </div>

            <div className="grid grid-cols-4 gap-1">
              {AVAILABLE_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    soundFX.playClick();
                    onSelectLanguage(lang.code);
                  }}
                  className={`py-1.5 rounded-xl text-xs font-bold flex flex-col items-center justify-center gap-0.5 transition cursor-pointer ${
                    activeLanguage === lang.code
                      ? 'bg-[#ff6b4a] text-[#170d08] shadow-md shadow-[#ff6b4a]/30'
                      : 'bg-[#111318] text-[#8f8f96] hover:text-white border border-white/5'
                  }`}
                  title={lang.name}
                >
                  <span className="text-base">{lang.flag}</span>
                  <span className="text-[10px] uppercase font-mono">{lang.code}</span>
                </button>
              ))}
            </div>
          </div>

          {/* NAVIGATION LINKS */}
          <nav className="space-y-1 pt-1">
            <button
              onClick={() => handleNav('dashboard')}
              className={`w-full px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-3 transition cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-[#ff6b4a] text-[#170d08] shadow-lg shadow-[#ff6b4a]/20'
                  : 'text-[#8f8f96] hover:text-white hover:bg-[#161920]'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Bosh Sahifa (Asosiy)</span>
            </button>

            <button
              onClick={() => handleNav('courses')}
              className={`w-full px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-3 transition cursor-pointer ${
                activeTab === 'courses' || activeTab === 'course-detail' || activeTab === 'topic-view'
                  ? 'bg-[#ff6b4a] text-[#170d08] shadow-lg shadow-[#ff6b4a]/20'
                  : 'text-[#8f8f96] hover:text-white hover:bg-[#161920]'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Darslar & Mavzular</span>
            </button>

            <button
              onClick={() => handleNav('quizzes')}
              className={`w-full px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-3 transition cursor-pointer ${
                activeTab === 'quizzes' || activeTab === 'quiz-player'
                  ? 'bg-[#ff6b4a] text-[#170d08] shadow-lg shadow-[#ff6b4a]/20'
                  : 'text-[#8f8f96] hover:text-white hover:bg-[#161920]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Testlar & Viktorina</span>
            </button>

            <button
              onClick={() => handleNav('speaking')}
              className={`w-full px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-3 transition cursor-pointer ${
                activeTab === 'speaking'
                  ? 'bg-[#ff6b4a] text-[#170d08] shadow-lg shadow-[#ff6b4a]/20'
                  : 'text-[#8f8f96] hover:text-white hover:bg-[#161920]'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>Ovozli Mashq (Speaking)</span>
            </button>

            <button
              onClick={() => handleNav('ai-tutor')}
              className={`w-full px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-3 transition cursor-pointer ${
                activeTab === 'ai-tutor'
                  ? 'bg-[#ff6b4a] text-[#170d08] shadow-lg shadow-[#ff6b4a]/20'
                  : 'text-[#8f8f96] hover:text-white hover:bg-[#161920]'
              }`}
            >
              <Bot className="w-4 h-4" />
              <span>AI Do‘stim (Suhbat)</span>
            </button>

            <button
              onClick={() => handleNav('vocabulary')}
              className={`w-full px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-3 transition cursor-pointer ${
                activeTab === 'vocabulary'
                  ? 'bg-[#ff6b4a] text-[#170d08] shadow-lg shadow-[#ff6b4a]/20'
                  : 'text-[#8f8f96] hover:text-white hover:bg-[#161920]'
              }`}
            >
              <BrainCircuit className="w-4 h-4" />
              <span>So‘z Kartochkalari</span>
            </button>

            <button
              onClick={() => handleNav('leaderboard')}
              className={`w-full px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-3 transition cursor-pointer ${
                activeTab === 'leaderboard'
                  ? 'bg-[#ff6b4a] text-[#170d08] shadow-lg shadow-[#ff6b4a]/20'
                  : 'text-[#8f8f96] hover:text-white hover:bg-[#161920]'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Peshqadamlar (Reyting)</span>
            </button>

            <button
              onClick={() => handleNav('map')}
              className={`w-full px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-3 transition cursor-pointer ${
                activeTab === 'map'
                  ? 'bg-[#ff6b4a] text-[#170d08] shadow-lg shadow-[#ff6b4a]/20'
                  : 'text-[#8f8f96] hover:text-white hover:bg-[#161920]'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>OSON Xaritasi</span>
            </button>

            {currentUser?.role === 'ADMIN' && (
              <button
                onClick={() => handleNav('admin')}
                className={`w-full px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-3 transition cursor-pointer ${
                  activeTab === 'admin'
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                    : 'text-rose-400 hover:text-white hover:bg-[#161920]'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Admin Boshqaruv</span>
              </button>
            )}
          </nav>
        </div>

        {/* BOTTOM SECTION: USER PROFILE & LOGOUT */}
        <div className="space-y-3 pt-3 border-t border-white/10">
          
          {currentUser ? (
            <div className="space-y-2.5">
              
              {/* Gamification Stats Row */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={onOpenStreakModal}
                  className="p-2 rounded-xl bg-[#161920] border border-white/5 hover:border-[#ff6b4a] flex items-center justify-center gap-1 text-xs font-mono font-bold text-[#ff6b4a] cursor-pointer"
                >
                  <Flame className="w-3.5 h-3.5 fill-[#ff6b4a]" />
                  <span>{currentUser.streak} kun</span>
                </button>

                <button
                  onClick={onOpenXPModal}
                  className="p-2 rounded-xl bg-[#161920] border border-white/5 hover:border-amber-400 flex items-center justify-center gap-1 text-xs font-mono font-bold text-amber-300 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{currentUser.total_xp} XP</span>
                </button>
              </div>

              {/* User Identity Card */}
              <div 
                onClick={() => handleNav('profile')}
                className="p-2.5 rounded-2xl bg-[#161920] border border-white/5 hover:border-white/20 transition flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.first_name}
                    className="w-8 h-8 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <div className="text-xs font-bold text-white leading-none">
                      {currentUser.first_name} {currentUser.last_name}
                    </div>
                    <div className="text-[10px] text-[#8f8f96] mt-0.5">
                      {currentUser.current_level} Daraja (13 yosh)
                    </div>
                  </div>
                </div>
              </div>

              {/* CLEAR LOGOUT BUTTON (CHIQISH) */}
              <button
                onClick={() => {
                  soundFX.playClick();
                  onLogout();
                }}
                className="w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 hover:text-rose-300 border border-rose-500/20 text-xs font-bold flex items-center justify-center gap-2 transition cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Hisobdan Chiqish (Logout)</span>
              </button>

            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="btn-accent w-full py-3 text-xs font-bold flex items-center justify-center gap-2"
            >
              <span>Hisobga Kirish / Ro‘yxatdan o‘tish</span>
            </button>
          )}

          {/* Theme Switcher Toggle */}
          <div className="flex items-center justify-between text-[11px] text-[#8f8f96] px-1">
            <span>Rejim:</span>
            <button
              onClick={toggleTheme}
              className="px-2.5 py-1 rounded-full border border-white/10 hover:border-white/30 text-xs flex items-center gap-1"
            >
              {isLight ? <Moon className="w-3 h-3 text-amber-400" /> : <Sun className="w-3 h-3 text-amber-400" />}
              <span>{isLight ? 'Oq format' : 'Qorong‘i format'}</span>
            </button>
          </div>

        </div>

      </aside>
    </>
  );
};
