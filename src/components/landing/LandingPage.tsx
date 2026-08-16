import React from 'react';
import { 
  Sparkles, ArrowRight, Mic, Bot, BrainCircuit, Trophy, 
  CheckCircle2, Play, Volume2, Star, Shield, Heart, Zap, Globe, Compass 
} from 'lucide-react';
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
  const handleTestAudio = (text: string) => {
    soundFX.playClick();
    speakEnglish(text);
  };

  return (
    <div className="space-y-20 animate-fade-in pb-20 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 pb-12 text-center max-w-5xl mx-auto px-4">
        {/* Background glow halos */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-black shadow-lg shadow-indigo-500/10 animate-pulse">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>13–18 Yoshli O‘smirlar Uchun Maxsus Gamifikatsiya & AI Platformasi</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight font-['Outfit'] leading-[1.1]">
            Ingliz tilini o‘rganish endi zerikarli vazifa emas. <br/>
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              Learn. Play. Speak.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            OSON — har kuni 5–10 daqiqada sun’iy intellekt bilan real suhbat quring, talaffuzingizni tekshiring, XP to‘plang va yangi darajalarni oching!
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={onStart}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-sm shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Bepul Boshlash</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onTryAI}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700 text-white font-bold text-sm transition flex items-center justify-center gap-2 shadow-lg"
            >
              <Bot className="w-4 h-4 text-purple-400" />
              <span>AI Tutor bilan Suhbatlashish</span>
            </button>
          </div>

          {/* Trust stats pill */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-semibold">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> CEFR A1 dan C2 gacha</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI Ovozli Tahlil</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Spaced Repetition So‘zlar</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 5 ta Offline Hub</span>
          </div>
        </div>
      </section>

      {/* INTERACTIVE DEMO PREVIEW SECTION */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Jonli Demo Namunasi</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
              Platformaning Asosiy WOW Funksiyalarini Hozir Sinab Ko‘ring
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Demo Card 1: Audio Pronunciation */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                  <BrainCircuit className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-['Outfit']">Native Audio & So‘zlar</h3>
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-black text-white font-['Outfit']">Eloquent</span>
                    <button
                      onClick={() => handleTestAudio('Eloquent')}
                      className="p-1.5 rounded-lg bg-teal-500/20 text-teal-300 hover:bg-teal-500 hover:text-white transition"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                  <span className="text-xs text-teal-400 font-mono">/ˈeləkwənt/</span>
                  <div className="text-xs text-slate-400 pt-1">Fasohatchi, chiroyli gapiruvchi</div>
                </div>
              </div>

              <button
                onClick={onStart}
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition"
              >
                Flashcardlarni ochish
              </button>
            </div>

            {/* Demo Card 2: Speaking Assessment */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-300 flex items-center justify-center">
                  <Mic className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-['Outfit']">AI Speaking Score</h3>
                
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300">Talaffuz Natijasi:</span>
                    <span className="text-sm font-black text-pink-400">92 / 100</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-slate-400">
                    <div>• Pronunciation: <strong className="text-white">94%</strong></div>
                    <div>• Fluency: <strong className="text-white">89%</strong></div>
                    <div>• Grammar: <strong className="text-white">95%</strong></div>
                  </div>
                </div>
              </div>

              <button
                onClick={onTrySpeaking}
                className="w-full py-2.5 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold transition"
              >
                Nutqni sinab ko‘rish
              </button>
            </div>

            {/* Demo Card 3: AI Dialogue */}
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-['Outfit']">AI Tutor Dialogue</h3>
                
                <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
                  <div className="text-purple-300 font-bold">🤖 James (London Cafe):</div>
                  <p className="text-slate-300 text-[11px]">"Welcome to Big Ben Cafe! What can I get started for you?"</p>
                  <div className="text-[10px] text-amber-300 bg-amber-500/10 p-1.5 rounded-lg border border-amber-500/20">
                    💡 Tip: Say "Could I have..." politely!
                  </div>
                </div>
              </div>

              <button
                onClick={onTryAI}
                className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition"
              >
                Suhbatga kirish
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* CORE ADVANTAGES GRID */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Nega aynan OSON?</span>
          <h2 className="text-3xl font-black text-white font-['Outfit']">
            Oddiy Kurslardan 5 Baravar Samaraliroq
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="text-3xl">🎮</div>
            <h3 className="text-base font-bold text-white font-['Outfit']">To‘liq Gamifikatsiya</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              XP ballari, yutuq medallari, 7 kunlik streak va do‘stlar bilan haftalik Leaderboard poygasi.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="text-3xl">🤖</div>
            <h3 className="text-base font-bold text-white font-['Outfit']">Sun’iy Intellekt Ustoz</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Darajangizga moslashuvchan real hayotiy dialog stsenariylari va xatolarni darhol to‘g‘rilash.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="text-3xl">🧠</div>
            <h3 className="text-base font-bold text-white font-['Outfit']">Spaced Repetition</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Ilmiy asoslangan interval takrorlash algoritmi so‘zlarni 10 daqiqa, 1 kun, 3 kundan so‘ng eslatadi.
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
            <div className="text-3xl">👩‍⚕️</div>
            <h3 className="text-base font-bold text-white font-['Outfit']">Doctor / Psixolog Nazorati</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Nutq to‘sig‘i va o‘rganishdagi stressni yengish uchun maxsus mutaxassis maslahatlari moduli.
            </p>
          </div>
        </div>
      </section>

      {/* CEFR LEVELS ROADMAP */}
      <section className="max-w-6xl mx-auto px-4 p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
          A1 dan C2 gacha Bosqichma-bosqich
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { code: 'A1', name: 'Beginner', icon: '🌱' },
            { code: 'A2', name: 'Elementary', icon: '🌿' },
            { code: 'B1', name: 'Intermediate', icon: '⚡' },
            { code: 'B2', name: 'Upper-Int', icon: '🔥' },
            { code: 'C1', name: 'Advanced', icon: '💎' },
            { code: 'C2', name: 'Proficiency', icon: '👑' }
          ].map(lvl => (
            <div key={lvl.code} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-2xl">{lvl.icon}</div>
              <div className="text-base font-black text-white">{lvl.code}</div>
              <div className="text-[11px] text-slate-400">{lvl.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-4 text-center p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 border border-indigo-500/30 shadow-2xl space-y-6">
        <h2 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
          “Learn. Play. Speak. Level up.”
        </h2>
        <p className="text-sm text-slate-200 max-w-xl mx-auto">
          Bugunoq ro‘yxatdan o‘ting va ingliz tilida erkin so‘zlashishni boshlang!
        </p>

        <button
          onClick={onStart}
          className="px-8 py-4 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-black text-sm shadow-xl transition transform hover:scale-105"
        >
          Hoziroq Boshlash (Bepul) 🚀
        </button>
      </section>

    </div>
  );
};
