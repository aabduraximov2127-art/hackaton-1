import React from 'react';
import { Send, Video, MessageSquare, MapPin, Sparkles, Heart, Shield, Stethoscope } from 'lucide-react';

interface FooterProps {
  onOpenContact: () => void;
  onSelectTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenContact, onSelectTab }) => {
  return (
    <footer className="border-t border-white/5 bg-[#0b0c10] text-[#8f8f96] text-xs mt-auto">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-lg bg-[#ff6b4a] flex items-center justify-center font-bold text-xs text-[#170d08]">
                語
              </div>
              <span className="text-lg font-bold font-['Space_Grotesk'] text-white">OSON</span>
            </div>
            <p className="text-xs text-[#8f8f96] leading-relaxed">
              13–18 yoshdagi o‘smirlar uchun sun’iy intellekt va gamifikatsiya orqali ingliz tilini o‘rganish platformasi.
            </p>
            <div className="font-mono text-[11px] text-[#ff6b4a]">
              “Learn. Play. Speak. Level up.”
            </div>
          </div>

          {/* Col 2: Learning Modules */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Ta’lim Bo‘limlari</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab('courses')} className="hover:text-[#ff6b4a] transition">
                  A1–C2 Kurslar & Darslar
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('quizzes')} className="hover:text-[#ff6b4a] transition">
                  Interaktiv Testlar (Quiz Arena)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('speaking')} className="hover:text-[#ff6b4a] transition">
                  AI Speaking Studio (Ovozli tahlil)
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('ai-tutor')} className="hover:text-[#ff6b4a] transition">
                  AI Tutor bilan jonli muloqot
                </button>
              </li>
              <li>
                <button onClick={() => onSelectTab('vocabulary')} className="hover:text-[#ff6b4a] transition">
                  Spaced Repetition So‘zlar
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Campuses & Support */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Markazlar & Yordam</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onSelectTab('map')} className="flex items-center gap-1.5 hover:text-[#ff6b4a] transition">
                  <MapPin className="w-3.5 h-3.5 text-[#ff6b4a]" />
                  OSON Filiallari (Xarita)
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="flex items-center gap-1.5 hover:text-white transition">
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
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">Maxsus Rollar</h4>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-[#111318] border border-white/5">
                <div className="flex items-center gap-1.5 text-teal-400 font-bold mb-1">
                  <Stethoscope className="w-3.5 h-3.5" /> DOCTOR / Psixolog
                </div>
                <p className="text-[11px] text-[#8f8f96]">
                  Nutq to‘siqlari va o‘rganish psixologiyasi tahlili.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-[#111318] border border-white/5">
                <div className="flex items-center gap-1.5 text-rose-400 font-bold mb-1">
                  <Shield className="w-3.5 h-3.5" /> ADMIN Boshqaruv
                </div>
                <p className="text-[11px] text-[#8f8f96]">
                  Foydalanuvchilar, kurslar va CMS boshqaruv paneli.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#57575e]">
          <div className="flex items-center gap-2">
            <span className="w-4 h-4 rounded bg-[#ff6b4a] flex items-center justify-center font-bold text-[9px] text-[#170d08]">語</span>
            <span>OSON Platformasi · Hackathon 2026</span>
          </div>
          <div>Barcha huquqlar himoyalangan.</div>
        </div>
      </div>
    </footer>
  );
};
