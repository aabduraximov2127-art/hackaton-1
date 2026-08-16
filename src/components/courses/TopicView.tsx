import React, { useState } from 'react';
import { 
  ArrowLeft, Volume2, CheckCircle2, ChevronRight, BookOpen, 
  HelpCircle, Mic, Play, Sparkles, Award, RotateCcw, AlertCircle 
} from 'lucide-react';
import { Topic, Word, Lesson, Question, Quiz } from '../../types';
import { OsonStorageService } from '../../services/storage';
import { speakEnglish, soundFX } from '../../services/audio';
import { fireConfetti } from '../common/ConfettiTrigger';

interface TopicViewProps {
  topic: Topic;
  onBack: () => void;
  onOpenSpeakingStudio: (topicTitle: string) => void;
  onOpenQuizPlayer: (quizId: string) => void;
}

export const TopicView: React.FC<TopicViewProps> = ({
  topic,
  onBack,
  onOpenSpeakingStudio,
  onOpenQuizPlayer
}) => {
  const [activeTab, setActiveTab] = useState<'vocab' | 'grammar' | 'listening' | 'quiz' | 'speaking'>('vocab');
  
  const words = OsonStorageService.getWords(topic.level_code, topic.id).length > 0
    ? OsonStorageService.getWords(topic.level_code, topic.id)
    : OsonStorageService.getWords(topic.level_code);

  const lessons = OsonStorageService.getLessons(topic.id);
  const grammarLesson = lessons.find(l => l.type === 'grammar') || lessons[1];
  const listeningLesson = lessons.find(l => l.type === 'listening') || lessons[2];
  
  // Quizzes
  const quizzes = OsonStorageService.getQuizzes(topic.level_code);
  const currentQuiz = quizzes[0];

  const handleSpeak = (text: string) => {
    soundFX.playClick();
    speakEnglish(text);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white transition"
        >
          <ArrowLeft className="w-4 h-4" /> Mavzular ro‘yxatiga qaytish
        </button>

        <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-black self-start sm:self-auto">
          {topic.level_code} Daraja • {topic.duration_minutes} daqiqa
        </span>
      </div>

      {/* Topic Title Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/20 space-y-2">
        <div className="text-3xl">{topic.icon || '📖'}</div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
          {topic.title}
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
          {topic.description}
        </p>
      </div>

      {/* 5-Step Tab Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 rounded-2xl bg-slate-900/90 border border-slate-800">
        <button
          onClick={() => setActiveTab('vocab')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition ${
            activeTab === 'vocab'
              ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <span>1. So‘zlar ({words.length})</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30">+10 XP</span>
        </button>

        <button
          onClick={() => setActiveTab('grammar')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition ${
            activeTab === 'grammar'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <span>2. Grammatika</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30">+15 XP</span>
        </button>

        <button
          onClick={() => setActiveTab('listening')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition ${
            activeTab === 'listening'
              ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <span>3. Tinglash (Audio)</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30">+20 XP</span>
        </button>

        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition ${
            activeTab === 'quiz'
              ? 'bg-amber-600 text-white shadow-md shadow-amber-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <span>4. Interaktiv Test</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30">+30 XP</span>
        </button>

        <button
          onClick={() => setActiveTab('speaking')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold shrink-0 transition ${
            activeTab === 'speaking'
              ? 'bg-pink-600 text-white shadow-md shadow-pink-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Mic className="w-3.5 h-3.5" />
          <span>5. Speaking Sinovi</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/30">+40 XP</span>
        </button>
      </div>

      {/* STEP 1: VOCABULARY */}
      {activeTab === 'vocab' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white font-['Outfit']">
              Mavzuga Oid Asosiy Lug‘at So‘zlari
            </h2>
            <span className="text-xs text-teal-400">Audio talaffuzni eshitish uchun dinamikni bosing</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {words.map((w) => (
              <div
                key={w.id}
                className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-black text-white font-['Outfit']">{w.word}</h3>
                      <span className="text-xs font-mono text-teal-400">{w.phonetic}</span>
                    </div>
                    <div className="text-sm font-bold text-teal-300 mt-0.5">{w.translation}</div>
                  </div>

                  <button
                    onClick={() => handleSpeak(w.word)}
                    className="p-2.5 rounded-xl bg-teal-500/20 text-teal-300 hover:bg-teal-500 hover:text-white transition cursor-pointer"
                    title="Talaffuzni eshitish"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                  <div className="text-xs text-slate-200 font-medium">"{w.example}"</div>
                  <div className="text-[11px] text-slate-400 italic">{w.example_uz}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex justify-end">
            <button
              onClick={() => setActiveTab('grammar')}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition"
            >
              <span>Keyingi: Grammatika</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: GRAMMAR */}
      {activeTab === 'grammar' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <BookOpen className="w-4 h-4" />
              <span>{grammarLesson?.title || 'Grammar Rules & Structure'}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {grammarLesson?.content.summary}
            </p>

            {/* Rules list */}
            {grammarLesson?.content.rules && (
              <div className="space-y-4 pt-2">
                {grammarLesson.content.rules.map((rule, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <h4 className="text-xs font-black text-indigo-300 uppercase tracking-wider">
                      Qoida #{idx + 1}: {rule.title}
                    </h4>
                    <p className="text-xs text-slate-300">{rule.explanation}</p>
                    
                    <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/20 flex items-center justify-between">
                      <span className="text-xs font-semibold text-emerald-300 font-mono">
                        {rule.example}
                      </span>
                      <button
                        onClick={() => handleSpeak(rule.example)}
                        className="p-1.5 rounded-lg bg-indigo-500/20 text-indigo-300 hover:bg-indigo-500 hover:text-white transition"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setActiveTab('vocab')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold"
            >
              Orqaga: So‘zlar
            </button>
            <button
              onClick={() => setActiveTab('listening')}
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition"
            >
              <span>Keyingi: Tinglash (Audio)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: LISTENING */}
      {activeTab === 'listening' && (
        <div className="space-y-6">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white font-['Outfit']">
                  {listeningLesson?.title || 'Audio Dialogue Practice'}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Jonli suhbatni tinglang va intonatsiyaga e’tibor bering.
                </p>
              </div>

              {listeningLesson?.content.listening_audio_text && (
                <button
                  onClick={() => handleSpeak(listeningLesson.content.listening_audio_text || '')}
                  className="px-4 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-600/30 transition shrink-0"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>To‘liq Dialogni Tinglash</span>
                </button>
              )}
            </div>

            {/* Dialogue stream */}
            {listeningLesson?.content.dialogue && (
              <div className="space-y-3 pt-2">
                {listeningLesson.content.dialogue.map((line, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 text-[11px] font-bold">
                          {line.speaker}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-white font-['Outfit']">
                        "{line.text}"
                      </div>
                      {line.translation && (
                        <div className="text-[11px] text-slate-400 italic">
                          {line.translation}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => handleSpeak(line.text)}
                      className="p-2 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500 hover:text-white transition shrink-0"
                      title="Ushbu gapni tinglash"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              onClick={() => setActiveTab('grammar')}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold"
            >
              Orqaga: Grammatika
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-amber-600/20 transition"
            >
              <span>Keyingi: Interaktiv Test</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: QUIZ LAUNCHER */}
      {activeTab === 'quiz' && (
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto text-2xl font-black">
            ⚡
          </div>
          <h3 className="text-xl font-bold text-white font-['Outfit']">
            {currentQuiz?.title || 'Mavzu bo‘yicha interaktiv test'}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Grammatika, so‘zlar va tinglash bo‘yicha bilimlaringizni sinovdan o‘tkazing va <span className="text-amber-400 font-bold">+{currentQuiz?.xp_reward || 30} XP</span> ishlang!
          </p>

          <button
            onClick={() => onOpenQuizPlayer(currentQuiz?.id || 'quiz-a1-1')}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-black shadow-lg shadow-amber-600/30 transition active:scale-98"
          >
            Testni Boshlash ({currentQuiz?.question_count || 5} ta savol)
          </button>
        </div>
      )}

      {/* STEP 5: SPEAKING CHALLENGE LAUNCHER */}
      {activeTab === 'speaking' && (
        <div className="p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-pink-500/20 text-pink-400 flex items-center justify-center mx-auto text-2xl">
            🎙️
          </div>
          <h3 className="text-xl font-bold text-white font-['Outfit']">
            Ovozli Speaking Sinovi: {topic.title}
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Mikrofoningizni yoqing, mavzu bo‘yicha ingliz tilida gapiring va sun’iy intellekt orqali talaffuz, ravonlik va grammatikangizni darhol tekshiring!
          </p>

          <button
            onClick={() => onOpenSpeakingStudio(topic.title)}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white text-xs font-black shadow-lg shadow-pink-600/30 transition active:scale-98"
          >
            Speaking Studio ni Ochish (+40 XP)
          </button>
        </div>
      )}

    </div>
  );
};
