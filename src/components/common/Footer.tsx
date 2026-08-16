import React from 'react';
import { Send, Video, MessageSquare, MapPin, Shield, Stethoscope } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onSelectTab }) => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 text-slate-400 text-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                <span className="text-2xl">🚀</span>
              </div>
              <span className="text-2xl font-black font-['Outfit'] text-white">OSON</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              13–18 yoshdagi o‘smirlar uchun ingliz tilini qiziqarli, gamifikatsiya va sun’iy intellekt orqali o‘rganish platformasi.
            </p>
            <div className="text-xs text-indigo-400 font-semibold">
              “Learn. Play. Speak. Level up.”
            </div>
          </div>

          {/* Col 2: Learning Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Ta’lim Bo‘limlari</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab('courses')} className="hover:text-indigo-400 transition">
                  A1–C2 Kurslar & Darslar
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('speaking')} className="hover:text-pink-400 transition">
                  Speaking Studio
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('ai-tutor')} className="hover:text-purple-400 transition">
                  AI Tutor
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('vocabulary')} className="hover:text-teal-400 transition">
                  Spaced Repetition So‘zlar
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('leaderboard')} className="hover:text-amber-400 transition">
                  Leaderboard & Yutuqlar
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Campuses & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Markazlar & Yordam</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab('map')} className="flex items-center gap-1.5 hover:text-emerald-400 transition">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                  OSON Lokatsiyalari (Xarita)
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="flex items-center gap-1.5 hover:text-indigo-400 transition">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                  Administratorga murojaat
                </button>
              </li>
              <li>
                <a href="https://t.me/oson_english" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-cyan-400 hover:underline">
                  <Send className="w-3.5 h-3.5" />
                  OSON Telegram Kanal
                </a>
              </li>
              <li>
                <a href="https://youtube.com/@oson_english" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-rose-400 hover:underline">
                  <Video className="w-3.5 h-3.5" />
                  OSON YouTube darslari
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform Roles */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200 mb-4">Maxsus Rollar</h4>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-cyan-400 font-bold mb-1">
                  <Stethoscope className="w-4 h-4" /> DOCTOR / Psixolog
                </div>
                <p className="text-[11px] text-slate-400">
                  O‘smirlarning o‘rganish psixologiyasi va nutq to‘siqlarini tahlil qilish moduli.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="flex items-center gap-2 text-rose-400 font-bold mb-1">
                  <Shield className="w-4 h-4" /> ADMIN Boshqaruv
                </div>
                <p className="text-[11px] text-slate-400">
                  Foydalanuvchilar, kurslar, savollar va xaritani boshqarish paneli.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 OSON Platformasi. Barcha huquqlar himoyalangan.</p>
          <div className="flex items-center gap-4 text-slate-500">
            <span>Maxfiylik siyosati</span>
            <span>•</span>
            <span>Foydalanish qoidalari</span>
            <span>•</span>
            <span className="text-indigo-400 font-semibold">Hackathon 1.0 Release</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
