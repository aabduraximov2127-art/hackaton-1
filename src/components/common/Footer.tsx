import React from 'react';
import { Send, MessageSquare, MapPin, Shield, Bot, UserCheck } from 'lucide-react';
import { useI18n } from '../../services/i18n';

interface FooterProps {
  onOpenContact: () => void;
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onSelectTab }) => {
  const { t } = useI18n();

  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/95 text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand & Telegram Bot */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <span className="text-2xl">🚀</span>
              </div>
              <span className="text-2xl font-black font-['Outfit'] text-white">OSON</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              13–18 yoshdagi o‘smirlar uchun ingliz tilini qiziqarli, gamifikatsiya va sun’iy intellekt orqali o‘rganish platformasi.
            </p>
            <div className="text-xs text-indigo-400 font-semibold font-['Outfit']">
              “{t.brandTagline}”
            </div>

            {/* Quick Telegram Bot Badge */}
            <div className="pt-2">
              <a
                href="https://t.me/oson_til_organamiz_bot"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 text-cyan-300 hover:border-cyan-400 text-xs font-bold transition shadow-sm"
              >
                <Bot className="w-4 h-4 text-cyan-400" />
                <span>@oson_til_organamiz_bot</span>
              </a>
            </div>
          </div>

          {/* Col 2: Learning Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Ta’lim Bo‘limlari</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab('courses')} className="hover:text-indigo-400 transition">
                  {t.courses}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('speaking')} className="hover:text-pink-400 transition">
                  {t.speaking}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('ai-tutor')} className="hover:text-purple-400 transition">
                  {t.aiTutor}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('vocabulary')} className="hover:text-teal-400 transition">
                  {t.vocabulary}
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('leaderboard')} className="hover:text-amber-400 transition">
                  {t.leaderboard}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Campuses, Bot & Admin Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Aloqa & Telegram</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a 
                  href="https://t.me/oson_til_organamiz_bot" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 text-cyan-400 hover:underline font-bold"
                >
                  <Bot className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Telegram Bot: @oson_til_organamiz_bot</span>
                </a>
              </li>
              <li>
                <a 
                  href="https://t.me/abduraximov_uz1" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="flex items-center gap-2 text-emerald-400 hover:underline font-bold"
                >
                  <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Admin bilan aloqa: @abduraximov_uz1</span>
                </a>
              </li>
              <li>
                <button onClick={() => onSelectTab('map')} className="flex items-center gap-2 hover:text-slate-200 transition">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>{t.map}</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="flex items-center gap-2 hover:text-indigo-400 transition">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                  <span>{t.contactAdmin}</span>
                </button>
              </li>
              <li>
                <a href="https://t.me/oson_til_organamiz_bot" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-slate-400 hover:text-white transition">
                  <Send className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Rasmiy Telegram Kanal</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Roles */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">{t.rolesGroup}</h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-rose-400 font-bold mb-1">
                  <Shield className="w-4 h-4" /> {t.adminPanel}
                </div>
                <p className="text-[11px] text-slate-400">
                  Foydalanuvchilar, kurslar, savollar va xaritani boshqarish paneli.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-indigo-400 font-bold mb-1">
                  🚀 OSON AI Platform
                </div>
                <p className="text-[11px] text-slate-400">
                  Zamonaviy nutq tahlili, Spaced Repetition va interaktiv kurslar.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & Telegram links */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <p>© 2026 OSON Platformasi. Barcha huquqlar himoyalangan.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <a 
              href="https://t.me/oson_til_organamiz_bot" 
              target="_blank" 
              rel="noreferrer"
              className="px-2.5 py-1 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 font-bold transition"
            >
              🤖 Bot: @oson_til_organamiz_bot
            </a>
            <a 
              href="https://t.me/abduraximov_uz1" 
              target="_blank" 
              rel="noreferrer"
              className="px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/20 font-bold transition"
            >
              👤 Admin: @abduraximov_uz1
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
