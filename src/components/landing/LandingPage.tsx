import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Sparkles, Volume2, Mic, Bot, BrainCircuit, 
  CheckCircle2, Compass, Zap, Flame, Heart 
} from 'lucide-react';
import { GlobeHero } from '../common/GlobeHero';
import { speakEnglish, soundFX } from '../../services/audio';

interface LandingPageProps {
  onStart: () => void;
  onOpenAuth: () => void;
  onTrySpeaking: () => void;
  onTryAI: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStart,
  onOpenAuth,
  onTrySpeaking,
  onTryAI
}) => {
  const [progressWidth, setProgressWidth] = useState<string>('0%');

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressWidth('72%');
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const handleTestAudio = (text: string) => {
    soundFX.playClick();
    speakEnglish(text);
  };

  return (
    <div className="space-y-16 animate-fade-in pb-20 overflow-hidden">
      
      {/* HERO SECTION WITH 3D PROCEDURAL GLOBE & STARFIELD */}
      <section className="relative pt-12 sm:pt-20 pb-16 min-h-[640px] md:min-h-[720px] flex items-center">
        
        {/* Procedural Canvas Globe & Twinkling Starfield */}
        <GlobeHero />

        <div className="max-w-[1140px] mx-auto px-4 sm:px-8 w-full relative z-20">
          <div className="max-w-2xl space-y-6">
            
            {/* Eyebrow Pill */}
            <div className="eyebrow-pill">
              <span className="dot" />
              <span>HACKATHON 2026 · TIL O‘RGANISH PLATFORMASI</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#f1f0ee] tracking-tight leading-[1.12]">
              Dunyoning har bir <em className="not-italic text-[#ff6b4a]">tilini</em> uyingizdan o‘rganing
            </h1>

            {/* Lead text */}
            <p className="text-sm sm:text-base text-[#8f8f96] max-w-lg leading-relaxed">
              OSON sun’iy intellekt yordamida sizga mos tezlikda til o‘rgatadi: kunlik audio mashqlar, jonli AI suhbat va o‘yin kabi qiziqarli progress bilan.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onStart}
                className="btn-accent px-7 py-3.5 text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-lg shadow-[#ff6b4a]/20"
              >
                <span>Hoziroq Boshlash</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onTryAI}
                className="btn-ghost-pill px-6 py-3.5 text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
              >
                <Bot className="w-4 h-4 text-[#ff6b4a]" />
                <span>AI Tutor bilan Suhbat</span>
              </button>
            </div>

            {/* Floating Live Preview Card */}
            <div className="pt-4 max-w-sm">
              <div className="p-5 rounded-2xl bg-[#161920]/95 border border-white/10 shadow-2xl space-y-3.5 backdrop-blur-md">
                
                {/* Card Top: Streak & Lives */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-mono font-bold text-xs text-[#ff6b4a]">
                    <Flame className="w-4 h-4 fill-[#ff6b4a]" />
                    <span>14 kunlik seriya</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-rose-400">
                    <span>❤️❤️❤️❤️❤️</span>
                  </div>
                </div>

                {/* Word rows */}
                <div className="divide-y divide-white/5 text-xs">
                  <div className="py-2 flex items-center justify-between">
                    <span className="font-medium text-[#f1f0ee]">Eloquent</span>
                    <span className="px-2 py-0.5 rounded bg-[#ff6b4a]/10 text-[#ff6b4a] font-mono text-[10px] font-bold">
                      C1 · ADVANCED
                    </span>
                  </div>
                  <div className="py-2 flex items-center justify-between">
                    <span className="font-medium text-[#f1f0ee]">Destination</span>
                    <span className="px-2 py-0.5 rounded bg-[#ff6b4a]/10 text-[#ff6b4a] font-mono text-[10px] font-bold">
                      A2 · TRAVEL
                    </span>
                  </div>
                  <div className="py-2 flex items-center justify-between">
                    <span className="font-medium text-[#f1f0ee]">Artificial Intelligence</span>
                    <span className="px-2 py-0.5 rounded bg-[#ff6b4a]/10 text-[#ff6b4a] font-mono text-[10px] font-bold">
                      B1 · TECH
                    </span>
                  </div>
                </div>

                {/* Progress Track */}
                <div className="space-y-1.5 pt-1">
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#ff6b4a] rounded-full transition-all duration-1000 ease-out"
                      style={{ width: progressWidth }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#57575e]">
                    <span>Bugungi maqsad</span>
                    <span className="text-[#ff6b4a] font-bold">{progressWidth}</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="border-y border-white/5 bg-[#111318]">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-8 py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="space-y-1">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-white">12,400+</div>
            <div className="text-xs text-[#8f8f96]">Faol o‘quvchi</div>
          </div>
          <div className="space-y-1">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-white">6 ta</div>
            <div className="text-xs text-[#8f8f96]">CEFR Darajasi (A1–C2)</div>
          </div>
          <div className="space-y-1">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-white">980,000+</div>
            <div className="text-xs text-[#8f8f96]">Bajarilgan mashq</div>
          </div>
          <div className="space-y-1">
            <div className="font-mono text-2xl sm:text-3xl font-bold text-[#ff6b4a]">98%</div>
            <div className="text-xs text-[#8f8f96]">Mamnun foydalanuvchilar</div>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="max-w-[1140px] mx-auto px-4 sm:px-8 space-y-10">
        <div className="max-w-xl space-y-2">
          <span className="font-mono text-xs text-[#ff6b4a] font-bold tracking-wider uppercase">
            IMKONIYATLAR
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Zerikarli darslik emas, jonli mashq
          </h2>
          <p className="text-xs sm:text-sm text-[#8f8f96]">
            Har bir funksiya bitta maqsadga xizmat qiladi: sizni har kuni qaytarib kelishga va tilni haqiqatan eslab qolishga undash.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="panel-dark panel-dark-hover p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#ff6b4a]/10 text-[#ff6b4a] flex items-center justify-center text-xl">
              🧠
            </div>
            <h3 className="text-base font-bold text-white">AI Repetitor & Tutor</h3>
            <p className="text-xs text-[#8f8f96] leading-relaxed">
              Xatolaringizni tahlil qilib, aynan sizga zarur bo‘lgan mavzularni real-time qayta taklif qiladi.
            </p>
          </div>

          <div className="panel-dark panel-dark-hover p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#ff6b4a]/10 text-[#ff6b4a] flex items-center justify-center text-xl">
              🎮
            </div>
            <h3 className="text-base font-bold text-white">O‘yin Kabi Progress</h3>
            <p className="text-xs text-[#8f8f96] leading-relaxed">
              Streak, XP balansi, jonlar (lives) va yutuq medallari orqali o‘rganish kundalik odatga aylanadi.
            </p>
          </div>

          <div className="panel-dark panel-dark-hover p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#ff6b4a]/10 text-[#ff6b4a] flex items-center justify-center text-xl">
              🗣️
            </div>
            <h3 className="text-base font-bold text-white">Jonli Suhbat Mashqi</h3>
            <p className="text-xs text-[#8f8f96] leading-relaxed">
              Ovozli xabarlar va Web Speech API orqali talaffuzingizni real vaqtda tekshiring.
            </p>
          </div>

          <div className="panel-dark panel-dark-hover p-6 space-y-4">
            <div className="w-10 h-10 rounded-xl bg-[#ff6b4a]/10 text-[#ff6b4a] flex items-center justify-center text-xl">
              🗺️
            </div>
            <h3 className="text-base font-bold text-white">Xarita & Speaking Hub</h3>
            <p className="text-xs text-[#8f8f96] leading-relaxed">
              Toshkent va Samarqanddagi 5 ta OSON kampusida offline speaking uchrashuvlariga qatnashing.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (3 STEPS) */}
      <section className="max-w-[1140px] mx-auto px-4 sm:px-8 space-y-10">
        <div className="max-w-xl space-y-2">
          <span className="font-mono text-xs text-[#ff6b4a] font-bold tracking-wider uppercase">
            JARAYON
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Uch qadamda boshlang
          </h2>
          <p className="text-xs sm:text-sm text-[#8f8f96]">
            Ro‘yxatdan o‘tishdan birinchi natijagacha — atigi bir necha daqiqa.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="p-6 rounded-2xl bg-[#111318] border border-white/5 space-y-3 relative">
            <span className="font-mono text-xs font-bold text-[#ff6b4a]">01</span>
            <h3 className="text-base font-bold text-white">Ro‘yxatdan o‘ting</h3>
            <p className="text-xs text-[#8f8f96] leading-relaxed">
              Email yoki 1-bosishda demo profillar orqali platformaga kiring.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111318] border border-white/5 space-y-3 relative">
            <span className="font-mono text-xs font-bold text-[#ff6b4a]">02</span>
            <h3 className="text-base font-bold text-white">Darajangizni aniqlang</h3>
            <p className="text-xs text-[#8f8f96] leading-relaxed">
              Qisqa test yoki A1–C2 darslari orqali o‘zingizga mos boshlang‘ich darajani tanlang.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-[#111318] border border-white/5 space-y-3 relative">
            <span className="font-mono text-xs font-bold text-[#ff6b4a]">03</span>
            <h3 className="text-base font-bold text-white">Har kuni mashq qiling</h3>
            <p className="text-xs text-[#8f8f96] leading-relaxed">
              Kuniga 10 daqiqa — va bir oyda birinchi erkin suhbatingizni boshlaysiz.
            </p>
          </div>
        </div>

        {/* Level & Topic Chips */}
        <div className="flex flex-wrap gap-2.5 justify-center pt-4">
          <div className="px-4 py-2 rounded-full border border-white/10 bg-[#111318] font-mono text-xs text-[#8f8f96] hover:text-[#ff6b4a] hover:border-[#ff6b4a] transition cursor-pointer">
            🌱 A1 Beginner
          </div>
          <div className="px-4 py-2 rounded-full border border-white/10 bg-[#111318] font-mono text-xs text-[#8f8f96] hover:text-[#ff6b4a] hover:border-[#ff6b4a] transition cursor-pointer">
            🌿 A2 Elementary
          </div>
          <div className="px-4 py-2 rounded-full border border-white/10 bg-[#111318] font-mono text-xs text-[#8f8f96] hover:text-[#ff6b4a] hover:border-[#ff6b4a] transition cursor-pointer">
            ⚡ B1 Intermediate
          </div>
          <div className="px-4 py-2 rounded-full border border-white/10 bg-[#111318] font-mono text-xs text-[#8f8f96] hover:text-[#ff6b4a] hover:border-[#ff6b4a] transition cursor-pointer">
            🔥 B2 Upper-Int
          </div>
          <div className="px-4 py-2 rounded-full border border-white/10 bg-[#111318] font-mono text-xs text-[#8f8f96] hover:text-[#ff6b4a] hover:border-[#ff6b4a] transition cursor-pointer">
            💎 C1 Academic IELTS
          </div>
          <div className="px-4 py-2 rounded-full border border-white/10 bg-[#111318] font-mono text-xs text-[#8f8f96] hover:text-[#ff6b4a] hover:border-[#ff6b4a] transition cursor-pointer">
            👑 C2 Proficiency
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="max-w-[1140px] mx-auto px-4 sm:px-8 pt-6">
        <div className="p-10 sm:p-14 rounded-3xl bg-[#161920] border border-white/10 text-center relative overflow-hidden space-y-6">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#ff6b4a]/10 rounded-full blur-3xl pointer-events-none" />
          
          <h2 className="text-2xl sm:text-4xl font-bold text-white relative z-10">
            Bugun birinchi so‘zingizni o‘rganing
          </h2>
          <p className="text-xs sm:text-sm text-[#8f8f96] max-w-md mx-auto relative z-10">
            Kredit karta shart emas. 60 soniyada boshlang va darajangizni oshiring.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2 relative z-10">
            <button
              onClick={onStart}
              className="btn-accent px-8 py-3.5 text-xs sm:text-sm font-bold shadow-lg shadow-[#ff6b4a]/20"
            >
              Bepul Boshlash 🚀
            </button>
            <button
              onClick={onOpenAuth}
              className="btn-ghost-pill px-6 py-3.5 text-xs sm:text-sm font-bold"
            >
              Hisobga Kirish
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
