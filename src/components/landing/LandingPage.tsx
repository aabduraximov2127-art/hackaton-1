import React from 'react';
import { 
  Sparkles, ArrowRight, Mic, Bot, BrainCircuit, 
  CheckCircle2, Volume2 
} from 'lucide-react';
import { speakEnglish, soundFX } from '../../services/audio';

interface LandingPageProps {
  onStart: () => void;
  onOpenAuth: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStart,
  onOpenAuth: _onOpenAuth
}) => {
  const handleTestAudio = (text: string) => {
    soundFX.playClick();
    speakEnglish(text);
  };

  return (
    <div className="space-y-20 animate-fade-in pb-20 overflow-hidden">
      
      {/* HERO */}
      <section className="relative pt-12 sm:pt-20 pb-12 text-center max-w-5xl mx-auto px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/20 to-pink-600/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-black shadow-lg shadow-indigo-500/10">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>13–18 Yoshli O‘smirlar Uchun Gamifikatsiya & AI Platformasi</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight font-['Outfit'] leading-[1.1]">
            OSON
            <span className="block mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-200">
              Ingliz tilini o‘rganish endi zerikarli vazifa emas.
            </span>
            <span className="block mt-3 bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent text-3xl sm:text-5xl">
              Learn. Play. Speak.
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Har kuni 5–10 daqiqada AI bilan mashq qiling, talaffuzingizni tekshiring, XP to‘plang va yangi darajalarni oching.
          </p>

          <div className="flex justify-center pt-4">
            <button
              onClick={onStart}
              className="px-10 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:to-pink-500 text-white font-black text-sm shadow-xl shadow-indigo-600/30 transition transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
            >
              <span>Bepul Boshlash</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 font-semibold">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> CEFR A1–C2</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI Speaking & Tutor</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Spaced Repetition</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> 5 Offline Hub</span>
          </div>
        </div>
      </section>

      {/* FEATURE PREVIEWS (info only — bitta asosiy CTA yuqorida) */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Asosiy imkoniyatlar</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
              Bitta platformada — o‘rganish, gapirish, o‘sish
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-['Outfit']">So‘zlar & Audio</h3>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-base font-black text-white font-['Outfit']">Eloquent</span>
                  <button
                    type="button"
                    onClick={() => handleTestAudio('Eloquent')}
                    className="p-1.5 rounded-lg bg-teal-500/20 text-teal-300 hover:bg-teal-500 hover:text-white transition"
                    aria-label="Talaffuzni eshitish"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-teal-400 font-mono">/ˈeləkwənt/</span>
                <div className="text-xs text-slate-400 pt-1">Fasohatchi, chiroyli gapiruvchi</div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-300 flex items-center justify-center">
                <Mic className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-['Outfit']">Speaking Studio</h3>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">Talaffuz natijasi</span>
                  <span className="text-sm font-black text-pink-400">92 / 100</span>
                </div>
                <div className="space-y-1 text-[11px] text-slate-400">
                  <div>• Pronunciation: <strong className="text-white">94%</strong></div>
                  <div>• Fluency: <strong className="text-white">89%</strong></div>
                  <div>• Grammar: <strong className="text-white">95%</strong></div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-white font-['Outfit']">AI Tutor</h3>
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5 text-xs">
                <div className="text-purple-300 font-bold">James (London Cafe):</div>
                <p className="text-slate-300 text-[11px]">"Welcome to Big Ben Cafe! What can I get started for you?"</p>
                <div className="text-[10px] text-amber-300 bg-amber-500/10 p-1.5 rounded-lg border border-amber-500/20">
                  Tip: "Could I have..." deb muloyim so‘rang
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY OSON */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">Nega aynan OSON?</span>
          <h2 className="text-3xl font-black text-white font-['Outfit']">
            Oddiy kurslardan samaraliroq
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: '🎮', title: 'Gamifikatsiya', text: 'XP, streak, yutuqlar va leaderboard — motivatsiya har kuni.' },
            { icon: '🤖', title: 'AI Ustoz', text: 'Real stsenariylar: kafe, aeroport, suhbat — xatolar darhol tuzatiladi.' },
            { icon: '🧠', title: 'Spaced Repetition', text: 'So‘zlar 10 daqiqa, 1 kun, 3 kundan so‘ng eslatiladi.' },
            { icon: '👩‍⚕️', title: 'Psixolog moduli', text: 'Nutq to‘sig‘i va stressni yengish uchun mutaxassis nazorati.' },
          ].map((item) => (
            <div key={item.title} className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="text-3xl">{item.icon}</div>
              <h3 className="text-base font-bold text-white font-['Outfit']">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CEFR */}
      <section className="max-w-6xl mx-auto px-4 p-8 sm:p-12 rounded-3xl bg-slate-900/60 border border-slate-800 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
          A1 dan C2 gacha bosqichma-bosqich
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

      {/* FINAL CTA — bitta tugma */}
      <section className="max-w-4xl mx-auto px-4 text-center p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 border border-indigo-500/30 shadow-2xl space-y-6">
        <h2 className="text-3xl sm:text-4xl font-black text-white font-['Outfit']">
          Learn. Play. Speak. Level up.
        </h2>
        <p className="text-sm text-slate-200 max-w-xl mx-auto">
          Ro‘yxatdan o‘ting va ingliz tilida erkin so‘zlashishni boshlang.
        </p>
        <button
          onClick={onStart}
          className="px-8 py-4 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-black text-sm shadow-xl transition transform hover:scale-105"
        >
          Hoziroq Boshlash
        </button>
      </section>

    </div>
  );
};
