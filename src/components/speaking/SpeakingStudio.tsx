import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Volume2, Sparkles, Award, RotateCcw, 
  CheckCircle2, ArrowRight, Play, Square, Activity, HelpCircle, ChevronRight 
} from 'lucide-react';
import { SpeakingAttempt, User } from '../../types';
import { SPEAKING_TOPICS } from '../../data/mockData';
import { OsonStorageService } from '../../services/storage';
import { soundFX, speakEnglish, SpeechRecognizer } from '../../services/audio';
import { evaluateSpeech, EvaluationResult } from '../../services/speakingEvaluator';
import { fireConfetti } from '../common/ConfettiTrigger';

interface SpeakingStudioProps {
  currentUser: User;
  initialTopicTitle?: string;
  onBack?: () => void;
}

export const SpeakingStudio: React.FC<SpeakingStudioProps> = ({
  currentUser,
  initialTopicTitle,
  onBack
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(
    SPEAKING_TOPICS.find(t => t.title === initialTopicTitle)?.id || SPEAKING_TOPICS[0].id
  );

  const selectedTopic = SPEAKING_TOPICS.find(t => t.id === selectedTopicId) || SPEAKING_TOPICS[0];

  const [isRecording, setIsRecording] = useState(false);
  const [recordTimer, setRecordTimer] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<EvaluationResult | null>(null);

  const recognizerRef = useRef<SpeechRecognizer | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timerIntervalRef = useRef<any>(null);

  useEffect(() => {
    // Initialize speech recognizer
    recognizerRef.current = new SpeechRecognizer(
      (result) => {
        if (result.isFinal) {
          setTranscript(prev => (prev ? prev + ' ' : '') + result.transcript);
          setInterimTranscript('');
        } else {
          setInterimTranscript(result.transcript);
        }
      },
      (error) => {
        console.warn('Speech error:', error);
      }
    );

    return () => {
      if (recognizerRef.current) {
        recognizerRef.current.stop();
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const handleStartRecording = () => {
    soundFX.playClick();
    setTranscript('');
    setInterimTranscript('');
    setEvaluationResult(null);
    setIsRecording(true);
    setRecordTimer(0);

    if (recognizerRef.current && recognizerRef.current.isSupported()) {
      recognizerRef.current.start();
    }

    timerIntervalRef.current = setInterval(() => {
      setRecordTimer(prev => prev + 1);
    }, 1000);
  };

  const handleStopRecording = () => {
    soundFX.playClick();
    setIsRecording(false);
    
    if (recognizerRef.current) {
      recognizerRef.current.stop();
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }

    // Process evaluation
    runEvaluation();
  };

  const runEvaluation = (textToEvaluate?: string) => {
    setIsEvaluating(true);
    
    const finalSpeechText = textToEvaluate || transcript || interimTranscript || selectedTopic.sample_text;

    setTimeout(() => {
      const result = evaluateSpeech(
        finalSpeechText,
        selectedTopic.title,
        selectedTopic.keywords,
        selectedTopic.sample_text
      );

      // Save speaking attempt to storage
      OsonStorageService.saveSpeakingAttempt({
        user_id: currentUser.id,
        topic_id: selectedTopic.id,
        topic_title: selectedTopic.title,
        transcript: finalSpeechText,
        overall_score: result.overall_score,
        pronunciation: result.pronunciation,
        fluency: result.fluency,
        grammar: result.grammar,
        vocabulary: result.vocabulary,
        xp_earned: result.xp_earned,
        feedback: result.feedback,
        better_version: result.better_version
      });

      setEvaluationResult(result);
      setIsEvaluating(false);

      if (result.overall_score >= 80) {
        soundFX.playLevelUp();
        fireConfetti();
      } else {
        soundFX.playCorrect();
      }
    }, 1200);
  };

  const handleUseSampleAndEvaluate = () => {
    setTranscript(selectedTopic.sample_text);
    runEvaluation(selectedTopic.sample_text);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-bold">
          <Mic className="w-3.5 h-3.5" />
          <span>AI Speaking Studio (WOW Feature)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
          Inglizcha Nutq & Talaffuz Laboratoriyasi
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
          Mavzuni tanlang, mikrofon orqali inglizcha gapiring va AI orqali talaffuz, ravonlik, grammatika va so‘z boyligingiz bo‘yicha batafsil ball oling.
        </p>
      </div>

      {/* Topic Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {SPEAKING_TOPICS.map((topic) => {
          const isSelected = topic.id === selectedTopicId;
          return (
            <button
              key={topic.id}
              onClick={() => {
                setSelectedTopicId(topic.id);
                setEvaluationResult(null);
                setTranscript('');
              }}
              className={`p-4 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 ${
                isSelected
                  ? 'bg-pink-950/40 border-pink-500 ring-2 ring-pink-500/30 shadow-lg shadow-pink-500/10'
                  : 'bg-slate-900 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300">
                  {topic.level_code}
                </span>
                <span className="text-[10px] text-slate-400">{topic.duration_suggested}</span>
              </div>
              <h3 className="text-xs font-bold text-white font-['Outfit'] line-clamp-1">
                {topic.title}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Speaking Active Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Topic Prompt & Recording Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
            
            {/* Prompt details */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
                  Topshiriq Vazifasi:
                </span>
              </div>
              <h2 className="text-xl font-bold text-white font-['Outfit']">
                {selectedTopic.prompt}
              </h2>
              <p className="text-xs text-slate-400 italic">
                {selectedTopic.prompt_uz}
              </p>
            </div>

            {/* Suggested Keywords */}
            <div>
              <div className="text-[11px] font-bold uppercase text-slate-400 mb-2">
                Tavsiya etilgan kalit so‘zlar:
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedTopic.keywords.map((kw, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 font-semibold"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>

            {/* Model Audio Listen Bar */}
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-indigo-300">Namunaviy Model Javob:</span>
                <p className="text-xs text-slate-300 mt-0.5 line-clamp-2">"{selectedTopic.sample_text}"</p>
              </div>
              <button
                onClick={() => speakEnglish(selectedTopic.sample_text)}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shrink-0 transition"
              >
                <Volume2 className="w-4 h-4" /> Namunani eshitish
              </button>
            </div>

            {/* Live Recording Area */}
            <div className="p-6 sm:p-8 rounded-3xl bg-slate-950 border border-slate-800/90 text-center space-y-4">
              
              {/* Waveform animation if recording */}
              {isRecording ? (
                <div className="flex items-center justify-center gap-1.5 h-12">
                  {[40, 75, 90, 60, 100, 80, 50, 95, 70, 85, 45, 90].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-pink-500 rounded-full animate-pulse"
                      style={{
                        height: `${h}%`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: '0.6s'
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-xs text-slate-500 font-medium">
                  Gapirishni boshlash uchun pastdagi mikrofon tugmasini bosing
                </div>
              )}

              {/* Big Glow Microphone Button */}
              <div className="flex flex-col items-center justify-center gap-3">
                <button
                  onClick={isRecording ? handleStopRecording : handleStartRecording}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 shadow-2xl active:scale-90 cursor-pointer ${
                    isRecording
                      ? 'bg-rose-600 text-white animate-pulse ring-8 ring-rose-600/30 shadow-rose-600/50'
                      : 'bg-gradient-to-tr from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white ring-4 ring-pink-500/20 hover:scale-105 shadow-pink-600/40'
                  }`}
                >
                  {isRecording ? <Square className="w-8 h-8 fill-white" /> : <Mic className="w-10 h-10" />}
                </button>

                <div className="text-xs font-mono font-bold text-slate-400">
                  {isRecording ? `Yozilmoqda: ${formatTimer(recordTimer)}` : 'Mikrofonni yoqish'}
                </div>
              </div>

              {/* Live Transcript Stream */}
              {(transcript || interimTranscript) && (
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-left space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Sizning nutqingiz (Real-time Transcript):
                  </span>
                  <p className="text-sm font-semibold text-white">
                    {transcript} <span className="text-pink-400 italic">{interimTranscript}</span>
                  </p>
                </div>
              )}

              {/* Demo Helper Button for testing without mic */}
              <div className="pt-2">
                <button
                  onClick={handleUseSampleAndEvaluate}
                  className="text-xs text-slate-500 hover:text-slate-300 underline transition"
                >
                  (Demo testi uchun namunaviy nutq matnini kiritish va baholash)
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Right: AI Score Analysis Radar */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 space-y-6 shadow-xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pink-400" />
              <h3 className="text-base font-bold text-white font-['Outfit']">
                AI Tahlil Natijasi
              </h3>
            </div>

            {isEvaluating ? (
              <div className="py-12 text-center space-y-3">
                <Activity className="w-10 h-10 text-pink-400 animate-spin mx-auto" />
                <p className="text-xs text-slate-300 font-bold">AI ovoz va talaffuzni tekshirmoqda...</p>
              </div>
            ) : evaluationResult ? (
              <div className="space-y-6 animate-fade-in">
                
                {/* Overall Score Circle */}
                <div className="text-center p-6 rounded-2xl bg-gradient-to-b from-pink-950/50 to-slate-950 border border-pink-500/30 space-y-1">
                  <div className="text-4xl font-black text-white font-['Outfit']">
                    {evaluationResult.overall_score} <span className="text-lg text-pink-400">/ 100</span>
                  </div>
                  <span className="text-xs font-bold text-pink-300">
                    {evaluationResult.overall_score >= 85 ? '🌟 Zo‘r nutq!' : '👍 Yaxshi natija'}
                  </span>
                  <div className="pt-2">
                    <span className="px-2.5 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold">
                      +{evaluationResult.xp_earned} XP berildi
                    </span>
                  </div>
                </div>

                {/* Score breakdown metrics */}
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">Talaffuz (Pronunciation)</span>
                      <span className="text-pink-400">{evaluationResult.pronunciation}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-pink-500" style={{ width: `${evaluationResult.pronunciation}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">Nutq Ravonligi (Fluency)</span>
                      <span className="text-cyan-400">{evaluationResult.fluency}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-cyan-500" style={{ width: `${evaluationResult.fluency}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">Grammatika (Grammar)</span>
                      <span className="text-indigo-400">{evaluationResult.grammar}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-indigo-500" style={{ width: `${evaluationResult.grammar}%` }} />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-bold mb-1">
                      <span className="text-slate-300">So‘z Boyligi (Vocabulary)</span>
                      <span className="text-emerald-400">{evaluationResult.vocabulary}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${evaluationResult.vocabulary}%` }} />
                    </div>
                  </div>
                </div>

                {/* Feedback Bullets */}
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <span className="font-bold text-slate-300">Ustoz Tavsiyalari:</span>
                  <ul className="space-y-1.5 text-slate-400 text-[11px] list-disc list-inside">
                    {evaluationResult.feedback.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>

              </div>
            ) : (
              <div className="py-12 text-center text-xs text-slate-500 space-y-2">
                <Mic className="w-8 h-8 mx-auto text-slate-600" />
                <p>Natijani ko‘rish uchun nutqni yozib oling</p>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
