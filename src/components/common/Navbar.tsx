import React, { useState } from 'react';
import { 
  Flame, Sparkles, User as UserIcon, Shield, Stethoscope, 
  Menu, MessageCircle, ChevronDown, PanelLeftOpen, PanelLeftClose
} from 'lucide-react';
import { User, UserRole } from '../../types';
import { soundFX } from '../../services/audio';
import { useI18n } from '../../services/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';

interface NavbarProps {
  currentUser: User | null;
  activeTab: string;
  isSidebarCollapsed: boolean;
  onToggleDesktopSidebar: () => void;
  onToggleMobileSidebar: () => void;
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
  isSidebarCollapsed,
  onToggleDesktopSidebar,
  onToggleMobileSidebar,
  onSelectTab,
  onOpenAuth,
  onOpenContact,
  onOpenXPModal,
  onOpenStreakModal,
  onSwitchRole,
  onLogout: _onLogout
}) => {
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const { t } = useI18n();

  const getTabTitle = (tab: string) => {
    switch (tab) {
      case 'dashboard': return t.dashboard;
      case 'courses':
      case 'course-detail':
      case 'topic-view': return t.courses;
      case 'quizzes':
      case 'quiz-player': return t.quizzes;
      case 'speaking': return t.speaking;
      case 'ai-tutor': return t.aiTutor;
      case 'vocabulary': return t.vocabulary;
      case 'leaderboard': return t.leaderboard;
      case 'map': return t.map;
      case 'profile': return t.profile;
      case 'doctor': return t.doctorPanel;
      case 'admin': return t.adminPanel;
      default: return 'OSON';
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-800/80 bg-[#0b0f19]/80 backdrop-blur-xl transition-all">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          
          {/* Left: Sidebar Toggle & Page Title */}
          <div className="flex items-center gap-3">
            
            {/* Mobile Sidebar Toggle Button */}
            <button
              onClick={() => {
                soundFX.playClick();
                onToggleMobileSidebar();
              }}
              className="lg:hidden p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
              title={t.menu}
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Desktop Sidebar Toggle Button */}
            <button
              onClick={() => {
                soundFX.playClick();
                onToggleDesktopSidebar();
              }}
              className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition text-xs font-bold"
              title={isSidebarCollapsed ? t.menu : t.close}
            >
              {isSidebarCollapsed ? (
                <>
                  <PanelLeftOpen className="w-4 h-4 text-indigo-400" />
                  <span>{t.menu}</span>
                </>
              ) : (
                <>
                  <PanelLeftClose className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400">{t.close}</span>
                </>
              )}
            </button>

            {/* Current Section Title */}
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-slate-700">/</span>
              <h2 className="text-sm font-extrabold text-white font-['Outfit'] tracking-wide">
                {getTabTitle(activeTab)}
              </h2>
            </div>
          </div>

          {/* Right Action Bar: Stats, Language & Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* 4-Language Switcher with flags */}
            <LanguageSwitcher />

            {/* Quick Role Switcher for Hackathon Demo */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-300 transition"
                title={t.switchRole}
              >
                {currentUser?.role === 'ADMIN' ? (
                  <Shield className="w-3.5 h-3.5 text-rose-400" />
                ) : currentUser?.role === 'DOCTOR' ? (
                  <Stethoscope className="w-3.5 h-3.5 text-cyan-400" />
                ) : (
                  <UserIcon className="w-3.5 h-3.5 text-emerald-400" />
                )}
                <span className="hidden sm:inline font-bold">
                  {currentUser?.role || t.guest}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 p-1.5 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl z-50 animate-fade-in text-xs space-y-1">
                  <div className="px-3 py-1.5 text-[10px] uppercase font-extrabold text-slate-500">
                    {t.switchRole} (Demo)
                  </div>
                  <button
                    onClick={() => { onSwitchRole('USER'); setRoleDropdownOpen(false); }}
                    className={`w-full px-3 py-2 rounded-xl flex items-center gap-2 text-left transition ${
                      currentUser?.role === 'USER' ? 'bg-emerald-500/20 text-emerald-400 font-bold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <UserIcon className="w-4 h-4 text-emerald-400" /> USER
                  </button>
                  <button
                    onClick={() => { onSwitchRole('DOCTOR'); setRoleDropdownOpen(false); }}
                    className={`w-full px-3 py-2 rounded-xl flex items-center gap-2 text-left transition ${
                      currentUser?.role === 'DOCTOR' ? 'bg-cyan-500/20 text-cyan-400 font-bold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Stethoscope className="w-4 h-4 text-cyan-400" /> DOCTOR
                  </button>
                  <button
                    onClick={() => { onSwitchRole('ADMIN'); setRoleDropdownOpen(false); }}
                    className={`w-full px-3 py-2 rounded-xl flex items-center gap-2 text-left transition ${
                      currentUser?.role === 'ADMIN' ? 'bg-rose-500/20 text-rose-400 font-bold' : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <Shield className="w-4 h-4 text-rose-400" /> ADMIN
                  </button>
                </div>
              )}
            </div>

            {currentUser ? (
              <>
                {/* Streak Badge */}
                <button
                  onClick={onOpenStreakModal}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold hover:bg-amber-500/20 transition cursor-pointer"
                  title={t.streakTracker}
                >
                  <Flame className="w-4 h-4 fill-amber-400 text-amber-500 animate-pulse" />
                  <span className="hidden sm:inline">{currentUser.streak} {t.streak}</span>
                </button>

                {/* XP Pill */}
                <button
                  onClick={onOpenXPModal}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold hover:bg-indigo-500/20 transition cursor-pointer"
                  title="XP"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{currentUser.total_xp} XP</span>
                </button>

                {/* Level Badge */}
                <span className="hidden md:flex items-center justify-center px-3 py-1.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black">
                  {currentUser.current_level}
                </span>

                {/* Contact Modal Trigger */}
                <button
                  onClick={onOpenContact}
                  className="hidden sm:flex p-2.5 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
                  title={t.contactAdmin}
                >
                  <MessageCircle className="w-4 h-4 text-cyan-400" />
                </button>

                {/* Profile Avatar */}
                <button
                  onClick={() => onSelectTab('profile')}
                  className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-indigo-500/40 hover:border-indigo-400 transition"
                  title={t.profile}
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
                className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition"
              >
                {t.login} / {t.register}
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
};
