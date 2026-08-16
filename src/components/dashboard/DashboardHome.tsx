import React from 'react';
import { 
  Flame, Sparkles, BookOpen, Mic, Bot, BrainCircuit, Trophy, 
  MapPin, ArrowRight, CheckCircle2, Play, Star, Award, Zap, Compass 
} from 'lucide-react';
import { User, Course, Level, DailyChallenge } from '../../types';
import { OsonStorageService } from '../../services/storage';
import { soundFX } from '../../services/audio';

interface DashboardHomeProps {
  currentUser: User;
  onSelectTab: (tab: string, extraData?: unknown) => void;
  onOpenLevelTest: (levelCode: string) => void;
  onOpenXPModal: () => void;
  onOpenStreakModal: () => void;
}

export const DashboardHome: React.FC<DashboardHomeProps> = ({
  currentUser,
  onSelectTab,
  onOpenLevelTest,
  onOpenXPModal,
  onOpenStreakModal
}) => {
  const levels = OsonStorageService.getLevels();
  const currentCourses = OsonStorageService.getCourses(currentUser.current_level);
  const allCourses = OsonStorageService.getCourses();
  const streakData = OsonStorageService.getStreakData(currentUser.id);
  const dailyChallenges = OsonStorageService.getDailyChallenges();
  const quizAttempts = OsonStorageService.getQuizAttempts(currentUser.id);
  const speakingAttempts = OsonStorageService.getSpeakingAttempts(currentUser.id);
  const allUsers = OsonStorageService.getAllUsers().sort((a, b) => b.total_xp - a.total_xp);
  const topUsers = allUsers.slice(0, 3);

  const daysOfWeek = ['Dush', 'Sesh', 'Chor', 'Pay', 'Jum', 'Shan', 'Yak'];
  const todayDayIndex = (new Date().getDay() + 6) % 7; // 0: Mon, 6: Sun

  const currentLevelObj = levels.find(l => l.code === currentUser.current_level) || levels[0];
  const nextLevelXP = 1200;
  const currentProgressXP = Math.min(100, Math.round((currentUser.total_xp / nextLevelXP) * 100));

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 border border-indigo-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 rounded-full bg-indigo-600/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-8 w-64 h-64 rounded-full bg-pink-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                <span>Bugungi maqsad: 10 daqiqa ingliz tili</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-black">
                {currentLevelObj.code} • {currentLevelObj.name}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight font-['Outfit']">
              Xush kelibsiz, <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">{currentUser.first_name}</span>! 🚀
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Bugun so‘z boyligingizni oshiring, AI Tutor bilan suhbatlashing va speaking balingizni ko‘taring.
            </p>
          </div>

          {/* User XP & Level Card */}
          <div className="w-full md:w-auto min-w-[280px] p-5 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/20 flex items-center justify-center text-lg">
                  {currentLevelObj.badge_icon}
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400">Joriy Daraja</div>
                  <div className="text-sm font-black text-white">{currentLevelObj.code} {currentLevelObj.name}</div>
                </div>
              </div>
              <button 
                onClick={onOpenXPModal}
                className="text-xs font-black text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20"
              >
                {currentUser.total_xp} XP
              </button>
            </div>

            {/* Progress bar to next level */}
            <div>
              <div className="flex justify-between text-[11px] font-semibold text-slate-400 mb-1">
                <span>Keyingi darajaga:</span>
                <span className="text-indigo-400">{currentUser.total_xp} / {nextLevelXP} XP ({currentProgressXP}%)</span>
              </div>
              <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500"
                  style={{ width: `${currentProgressXP}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => onOpenLevelTest(currentUser.current_level)}
              className="w-full py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/50 border border-indigo-500/40 text-indigo-200 text-xs font-bold flex items-center justify-center gap-1.5 transition"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>{currentUser.current_level} Imtihonini Topshirish</span>
            </button>
          </div>
        </div>
      </section>

      {/* QUICK ACTIONS GRID */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
            <Zap className="w-5 h-5 text-amber-400" />
            <span>Tezkor Mashqlar (Quick Actions)</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Speaking Studio */}
          <div
            onClick={() => onSelectTab('speaking')}
            className="group relative p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-pink-500/50 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-pink-500/10"
          >
            <div className="w-12 h-12 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <Mic className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white font-['Outfit']">Speaking Studio</h3>
              <span className="text-[10px] font-black text-pink-400 px-2 py-0.5 rounded-full bg-pink-500/10">
                +40 XP
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              AI yordamida talaffuz va erkinlikni mikrofon orqali sinang.
            </p>
            <span className="inline-flex items-center text-xs font-bold text-pink-400 group-hover:translate-x-1 transition">
              Boshlash <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </span>
          </div>

          {/* Card 2: AI Tutor */}
          <div
            onClick={() => onSelectTab('ai-tutor')}
            className="group relative p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-purple-500/50 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <Bot className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white font-['Outfit']">AI Tutor Muloqot</h3>
              <span className="text-[10px] font-black text-purple-400 px-2 py-0.5 rounded-full bg-purple-500/10">
                +30 XP
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Kafeda, aeroportda yoki ish suhbatida AI bilan suhbatlashing.
            </p>
            <span className="inline-flex items-center text-xs font-bold text-purple-400 group-hover:translate-x-1 transition">
              Suhbatga kirish <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </span>
          </div>

          {/* Card 3: Spaced Repetition Words */}
          <div
            onClick={() => onSelectTab('vocabulary')}
            className="group relative p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-teal-500/50 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/10"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white font-['Outfit']">So‘z Kartochkalari</h3>
              <span className="text-[10px] font-black text-teal-400 px-2 py-0.5 rounded-full bg-teal-500/10">
                +10 XP
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Interval takrorlash (SRS) orqali so‘zlarni uzoq muddatga yodlang.
            </p>
            <span className="inline-flex items-center text-xs font-bold text-teal-400 group-hover:translate-x-1 transition">
              Kartochkalar <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </span>
          </div>

          {/* Card 4: Daily Quiz */}
          <div
            onClick={() => onSelectTab('courses')}
            className="group relative p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-3 group-hover:scale-110 transition">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-bold text-white font-['Outfit']">Kurslar & Darslar</h3>
              <span className="text-[10px] font-black text-indigo-400 px-2 py-0.5 rounded-full bg-indigo-500/10">
                +30 XP
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Grammatika, tinglash va interaktiv mashqlarni bajaring.
            </p>
            <span className="inline-flex items-center text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition">
              Darslarga o‘tish <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </span>
          </div>

        </div>
      </section>

      {/* STREAK & DAILY CHALLENGES ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Streak Tracker */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 fill-amber-400 text-amber-500 animate-pulse" />
              <div>
                <h3 className="text-sm font-bold text-white font-['Outfit']">7 Kunlik O‘qish Ketma-ketligi</h3>
                <p className="text-xs text-slate-400">Har kuni 5 daqiqa kiring</p>
              </div>
            </div>
            <span className="text-xl font-black text-amber-400 font-['Outfit']">{currentUser.streak} kun</span>
          </div>

          {/* Weekly Days Bar */}
          <div className="grid grid-cols-7 gap-2 pt-2">
            {daysOfWeek.map((day, idx) => {
              const isPassed = idx <= todayDayIndex;
              const isToday = idx === todayDayIndex;
              return (
                <div key={day} className="flex flex-col items-center gap-1.5">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs font-bold transition ${
                    isToday
                      ? 'bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/30 ring-2 ring-amber-400'
                      : isPassed
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-slate-800 text-slate-500'
                  }`}>
                    {isPassed ? '🔥' : '•'}
                  </div>
                  <span className={`text-[10px] ${isToday ? 'font-bold text-amber-400' : 'text-slate-500'}`}>{day}</span>
                </div>
              );
            })}
          </div>

          <p className="text-xs text-slate-400 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            💡 <strong className="text-slate-300">Streak Maslahati:</strong> 7 kunlik ketma-ketlikka erishganingizda <span className="text-amber-400 font-bold">+150 XP bonus</span> beriladi!
          </p>
        </div>

        {/* Today's Daily Challenges */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-indigo-400" />
              <div>
                <h3 className="text-sm font-bold text-white font-['Outfit']">Bugungi Sinovlar (Daily Challenges)</h3>
                <p className="text-xs text-slate-400">Vazifalarni bajarib qo‘shimcha XP yig‘ing</p>
              </div>
            </div>
            <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
              2 ta vazifa
            </span>
          </div>

          <div className="space-y-3">
            {dailyChallenges.map((ch) => (
              <div 
                key={ch.id}
                className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white">{ch.title_uz}</h4>
                    <span className="text-[10px] font-black text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                      +{ch.xp_reward} XP
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{ch.description}</p>
                  
                  {/* Progress bar */}
                  <div className="w-48 h-1.5 rounded-full bg-slate-800 overflow-hidden mt-1.5">
                    <div 
                      className={`h-full ${ch.completed ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                      style={{ width: `${Math.min(100, (ch.progress / ch.target_count) * 100)}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">
                    {ch.progress}/{ch.target_count}
                  </span>
                  {ch.completed ? (
                    <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Bajarildi
                    </span>
                  ) : (
                    <button
                      onClick={() => onSelectTab(ch.target_type === 'vocab' ? 'vocabulary' : 'speaking')}
                      className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition"
                    >
                      Bajarish
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* RECOMMENDED COURSES SECTION */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-indigo-400" />
              <span>Sizning Darajangizdagi Kurslar ({currentUser.current_level})</span>
            </h2>
            <p className="text-xs text-slate-400">O‘smirlar uchun maxsus tayyorlangan mavzular</p>
          </div>

          <button
            onClick={() => onSelectTab('courses')}
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
          >
            Barcha kurslar <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentCourses.map((course) => (
            <div
              key={course.id}
              onClick={() => onSelectTab('course-detail', course)}
              className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col sm:flex-row"
            >
              <div className="sm:w-44 h-36 sm:h-auto overflow-hidden relative shrink-0">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-sm text-white font-black text-[10px]">
                  {course.level_code}
                </div>
              </div>

              <div className="p-5 flex flex-col justify-between space-y-2 flex-1">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition font-['Outfit']">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {course.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                  <span className="text-slate-400">{course.duration}</span>
                  <span className="font-bold text-indigo-400 flex items-center gap-1 group-hover:translate-x-1 transition">
                    Davom ettirish <Play className="w-3 h-3 fill-indigo-400" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CEFR LEVEL ROADMAP */}
      <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            <span>Til O‘rganish Yo‘l Xaritasi (CEFR Level Roadmap)</span>
          </h2>
          <p className="text-xs text-slate-400">A1 Boshlang‘ichdan C2 Mukammal darajagacha bosqichma-bosqich rivojlaning</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {levels.map((lvl) => {
            const isCurrent = lvl.code === currentUser.current_level;
            const isPassed = lvl.order < (levels.find(l => l.code === currentUser.current_level)?.order || 1);
            return (
              <div
                key={lvl.code}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  isCurrent
                    ? 'bg-indigo-600/20 border-indigo-500 shadow-lg shadow-indigo-500/20 ring-2 ring-indigo-400'
                    : isPassed
                    ? 'bg-emerald-500/10 border-emerald-500/30'
                    : 'bg-slate-950/60 border-slate-800 opacity-60'
                }`}
              >
                <div className="text-2xl mb-1">{lvl.badge_icon}</div>
                <div className="text-sm font-black text-white">{lvl.code}</div>
                <div className="text-[11px] font-semibold text-slate-400 mb-2">{lvl.name}</div>
                
                {isPassed ? (
                  <span className="inline-block px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    ✓ O‘tildi
                  </span>
                ) : isCurrent ? (
                  <button
                    onClick={() => onOpenLevelTest(lvl.code)}
                    className="w-full py-1 rounded-lg bg-indigo-600 text-white text-[10px] font-bold shadow hover:bg-indigo-500 transition"
                  >
                    Imtihon
                  </button>
                ) : (
                  <span className="text-[10px] text-slate-500 font-medium">Qulflangan</span>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* LEADERBOARD & MAP PREVIEW ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Top 3 Leaderboard snippet */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold text-white font-['Outfit']">Leaderboard Peshqadamlari</h3>
            </div>
            <button
              onClick={() => onSelectTab('leaderboard')}
              className="text-xs font-bold text-indigo-400 hover:underline"
            >
              To‘liq reyting
            </button>
          </div>

          <div className="space-y-2.5">
            {topUsers.map((u, index) => (
              <div
                key={u.id}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    index === 0 ? 'bg-amber-400 text-slate-950' : index === 1 ? 'bg-slate-300 text-slate-950' : 'bg-amber-700 text-white'
                  }`}>
                    {index + 1}
                  </span>
                  <img src={u.avatar} alt={u.first_name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <div className="text-xs font-bold text-white">{u.first_name} {u.last_name}</div>
                    <div className="text-[10px] text-slate-400">{u.current_level} Daraja</div>
                  </div>
                </div>

                <span className="text-xs font-black text-amber-400">{u.total_xp} XP</span>
              </div>
            ))}
          </div>
        </div>

        {/* Offline Campuses Map Trigger */}
        <div 
          onClick={() => onSelectTab('map')}
          className="lg:col-span-2 relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950/80 to-slate-900 border border-emerald-500/30 p-6 flex flex-col justify-between cursor-pointer group hover:border-emerald-400 transition"
        >
          <div className="space-y-2">
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 text-xs font-bold inline-flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              <span>5 ta Offline OSON Markazlari</span>
            </span>
            <h3 className="text-xl font-bold text-white font-['Outfit']">
              Toshkent va Samarqanddagi OSON Speaking Hublariga tashrif buyuring!
            </h3>
            <p className="text-xs text-slate-300 max-w-lg">
              VR Speaking Lab, Native Speaker suhbat klublari va qulay coworking maydonlari sizni kutmoqda.
            </p>
          </div>

          <div className="pt-4 flex items-center text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition">
            Xaritada barcha manzillarni ko‘rish <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>

      </div>

    </div>
  );
};
