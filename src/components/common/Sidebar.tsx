import React from 'react';
import { 
  Flame, BookOpen, Mic, Bot, BrainCircuit, Trophy, MapPin, 
  User as UserIcon, Shield, LogOut, ChevronLeft, ChevronRight, 
  Sparkles, Home, HelpCircle, X
} from 'lucide-react';
import { User, UserRole } from '../../types';
import { soundFX } from '../../services/audio';
import { useI18n } from '../../services/i18n';
import { LanguageSwitcher } from './LanguageSwitcher';

interface SidebarProps {
  currentUser: User | null;
  activeTab: string;
  isOpen: boolean;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  onCloseMobile: () => void;
  onSelectTab: (tab: string) => void;
  onOpenXPModal: () => void;
  onOpenStreakModal: () => void;
  onSwitchRole: (role: UserRole) => void;
  onLogout: () => void;
  onOpenAuth: () => void;
}

interface NavItem {
  id: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
  badge: string | null;
  highlight?: 'pink' | 'purple';
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  activeTab,
  isOpen,
  isCollapsed,
  onToggleCollapse,
  onCloseMobile,
  onSelectTab,
  onOpenXPModal,
  onOpenStreakModal,
  onSwitchRole,
  onLogout,
  onOpenAuth
}) => {
  const { t } = useI18n();

  const handleNavClick = (tab: string) => {
    soundFX.playClick();
    onSelectTab(tab);
    onCloseMobile();
  };

  const navItems: NavGroup[] = [
    {
      group: t.mainGroup,
      items: [
        { id: 'dashboard', label: t.dashboard, icon: Home, badge: null },
        { id: 'courses', label: t.courses, icon: BookOpen, badge: 'A1–C2' },
        { id: 'quizzes', label: t.quizzes, icon: HelpCircle, badge: '+30 XP' },
        { id: 'vocabulary', label: t.vocabulary, icon: BrainCircuit, badge: '+10 XP' },
      ]
    },
    {
      group: t.practiceGroup,
      items: [
        { id: 'speaking', label: t.speaking, icon: Mic, badge: 'WOW', highlight: 'pink' },
        { id: 'ai-tutor', label: t.aiTutor, icon: Bot, badge: 'AI', highlight: 'purple' },
      ]
    },
    {
      group: t.communityGroup,
      items: [
        { id: 'leaderboard', label: t.leaderboard, icon: Trophy, badge: 'Top' },
        { id: 'map', label: t.map, icon: MapPin, badge: '5' },
        { id: 'profile', label: t.profile, icon: UserIcon, badge: null },
      ]
    }
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div 
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 flex flex-col bg-[#090d16] border-r border-slate-800/80 transition-all duration-300 ease-in-out shadow-2xl lg:shadow-none ${
          // Mobile state
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } ${
          // Desktop collapse state
          isCollapsed ? 'lg:w-20' : 'lg:w-64'
        } w-72`}
      >
        
        {/* Top Header / Logo */}
        <div className="h-16 sm:h-20 flex items-center justify-between px-4 border-b border-slate-800/80 shrink-0">
          <div 
            onClick={() => handleNavClick('dashboard')}
            className="flex items-center gap-3 cursor-pointer overflow-hidden"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 shrink-0 transform hover:scale-105 transition">
              <span className="text-xl">🚀</span>
            </div>
            {(!isCollapsed || isOpen) && (
              <div className="transition-opacity duration-200">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl font-black tracking-tight font-['Outfit'] bg-gradient-to-r from-white via-slate-100 to-indigo-300 bg-clip-text text-transparent">
                    OSON
                  </span>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                    2026
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium tracking-wide">{t.brandTagline}</p>
              </div>
            )}
          </div>

          {/* Close on Mobile / Collapse on Desktop */}
          <div className="flex items-center">
            {/* Mobile close button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
              title={t.close}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Desktop collapse toggle */}
            <button
              onClick={onToggleCollapse}
              className="hidden lg:flex p-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition"
              title={isCollapsed ? "Expand" : "Collapse"}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* User Mini Card in Sidebar if Logged In */}
        {currentUser && (!isCollapsed || isOpen) && (
          <div className="p-4 border-b border-slate-800/80 bg-slate-950/40 shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.first_name}
                  className="w-10 h-10 rounded-2xl object-cover border-2 border-indigo-500/40"
                />
                <span className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded-md bg-emerald-500 text-slate-950 text-[9px] font-black shadow">
                  {currentUser.current_level}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white truncate font-['Outfit']">
                  {currentUser.first_name} {currentUser.last_name}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <button
                    onClick={onOpenStreakModal}
                    className="flex items-center gap-1 text-[10px] font-bold text-amber-400 hover:underline"
                  >
                    <Flame className="w-3 h-3 fill-amber-400 text-amber-500" />
                    <span>{currentUser.streak} {t.streak}</span>
                  </button>
                  <span className="text-slate-700">•</span>
                  <button
                    onClick={onOpenXPModal}
                    className="flex items-center gap-1 text-[10px] font-bold text-indigo-400 hover:underline"
                  >
                    <Sparkles className="w-3 h-3 text-indigo-400" />
                    <span>{currentUser.total_xp} XP</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Navigation Items */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-800">
          {navItems.map((group, gIdx) => (
            <div key={gIdx} className="space-y-1">
              {(!isCollapsed || isOpen) && (
                <div className="px-3 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  {group.group}
                </div>
              )}

              {group.items.map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id || 
                  (item.id === 'courses' && (activeTab === 'course-detail' || activeTab === 'topic-view')) ||
                  (item.id === 'quizzes' && activeTab === 'quiz-player');

                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full group flex items-center justify-between p-2.5 sm:p-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                      isActive
                        ? item.highlight === 'pink'
                          ? 'bg-gradient-to-r from-pink-600 to-rose-600 text-white shadow-lg shadow-rose-600/30'
                          : item.highlight === 'purple'
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-600/30'
                          : 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`p-1.5 rounded-xl transition ${
                        isActive 
                          ? 'text-white' 
                          : item.highlight === 'pink'
                          ? 'text-pink-400 group-hover:text-pink-300'
                          : item.highlight === 'purple'
                          ? 'text-purple-400 group-hover:text-purple-300'
                          : 'text-slate-400 group-hover:text-slate-200'
                      }`}>
                        <IconComponent className="w-4 h-4" />
                      </div>
                      {(!isCollapsed || isOpen) && (
                        <span className="truncate">{item.label}</span>
                      )}
                    </div>

                    {(!isCollapsed || isOpen) && item.badge && (
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        isActive
                          ? 'bg-black/30 text-white'
                          : item.highlight === 'pink'
                          ? 'bg-pink-500/20 text-pink-300'
                          : item.highlight === 'purple'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          ))}

          {/* Special Role Panels Section */}
          {currentUser && (
            <div className="space-y-1 pt-2 border-t border-slate-800/80">
              {(!isCollapsed || isOpen) && (
                <div className="px-3 pb-1 text-[10px] font-extrabold uppercase tracking-wider text-slate-500">
                  {t.rolesGroup}
                </div>
              )}

              {/* Admin Panel */}
              <button
                onClick={() => {
                  onSwitchRole('ADMIN');
                  handleNavClick('admin');
                }}
                title={isCollapsed ? t.adminPanel : undefined}
                className={`w-full flex items-center justify-between p-2.5 sm:p-3 rounded-2xl text-xs font-bold transition ${
                  activeTab === 'admin'
                    ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                    : 'text-rose-400/90 hover:text-rose-300 hover:bg-rose-500/10'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-xl text-rose-400">
                    <Shield className="w-4 h-4" />
                  </div>
                  {(!isCollapsed || isOpen) && <span>{t.adminPanel}</span>}
                </div>
                {(!isCollapsed || isOpen) && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300">Admin</span>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Footer actions in sidebar */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/60 shrink-0 space-y-2">
          {(!isCollapsed || isOpen) && (
            <div className="flex items-center justify-between px-1">
              <span className="text-[10px] font-bold text-slate-500">Til / Язык / Lang</span>
              <LanguageSwitcher compact />
            </div>
          )}

          {currentUser ? (
            <button
              onClick={() => {
                soundFX.playClick();
                onLogout();
                onCloseMobile();
              }}
              className={`w-full flex items-center ${isCollapsed && !isOpen ? 'justify-center' : 'justify-start gap-3'} p-2.5 rounded-2xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition`}
              title={t.logout}
            >
              <LogOut className="w-4 h-4 shrink-0" />
              {(!isCollapsed || isOpen) && <span>{t.logout}</span>}
            </button>
          ) : (
            <button
              onClick={() => {
                onOpenAuth();
                onCloseMobile();
              }}
              className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition text-center"
            >
              {(!isCollapsed || isOpen) ? `${t.login} / ${t.register}` : t.login}
            </button>
          )}
        </div>

      </aside>
    </>
  );
};
