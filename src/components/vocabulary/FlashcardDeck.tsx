import React, { useState } from 'react';
import { 
  BrainCircuit, Volume2, RotateCcw, Check, Sparkles, 
  ArrowLeft, ArrowRight, Search, Layers, CheckCircle2, Bookmark 
} from 'lucide-react';
import { Word, LevelCode, LanguageCode } from '../../types';
import { OsonStorageService } from '../../services/storage';
import { soundFX, speakText } from '../../services/audio';
import { fireConfetti } from '../common/ConfettiTrigger';

interface FlashcardDeckProps {
  activeLanguage?: LanguageCode;
}

export const FlashcardDeck: React.FC<FlashcardDeckProps> = ({ activeLanguage = 'fr' }) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [selectedLang, setSelectedLang] = useState<string>(activeLanguage);
  const [viewMode, setViewMode] = useState<'flashcards' | 'list'>('flashcards');
  const [searchQuery, setSearchQuery] = useState('');

  // Sync when parent language changes
  React.useEffect(() => {
    if (activeLanguage) {
      setSelectedLang(activeLanguage);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [activeLanguage]);

  const allWords = OsonStorageService.getWords();
  const filteredWords = allWords.filter(w => {
    const matchesLevel = selectedLevel === 'ALL' || w.level_code === selectedLevel;
    const matchesLang = selectedLang === 'ALL' || w.language_code === selectedLang || (!w.language_code && selectedLang === 'en');
    const matchesSearch = w.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          w.translation.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesLang && matchesSearch;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredWords, setMasteredWords] = useState<string[]>([]);

  const currentWord = filteredWords[currentIndex] || filteredWords[0];

  const handleFlip = () => {
    soundFX.playClick();
    setIsFlipped(!isFlipped);
  };

  const handleRate = (rating: 'again' | 'hard' | 'good' | 'easy') => {
    soundFX.playXP();
    setIsFlipped(false);

    if (rating === 'good' || rating === 'easy') {
      if (!masteredWords.includes(currentWord.id)) {
        setMasteredWords(prev => [...prev, currentWord.id]);
      }
    }

    if (currentIndex < filteredWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      soundFX.playLevelUp();
      fireConfetti();
      setCurrentIndex(0);
    }
  };

  const handleSpeak = (text: string, langCode: string = 'en', e?: React.MouseEvent) => {
    e?.stopPropagation();
    soundFX.playClick();
    speakText(text, langCode);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16 max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="eyebrow-pill">
            <span className="dot" />
            <span>SPACED REPETITION (SRS LUG‘AT)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk']">
            3D So‘z Kartochkalari & Talaffuz
          </h1>
        </div>

        {/* Mode Switcher */}
        <div className="flex p-1 rounded-full bg-[#161920] border border-white/10 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('flashcards')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
              viewMode === 'flashcards' ? 'bg-[#ff6b4a] text-[#170d08]' : 'text-[#8f8f96] hover:text-white'
            }`}
          >
            3D Flashcard
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition cursor-pointer ${
              viewMode === 'list' ? 'bg-[#ff6b4a] text-[#170d08]' : 'text-[#8f8f96] hover:text-white'
            }`}
          >
            Lug‘at Ro‘yxati
          </button>
        </div>
      </div>

      {/* Language filter pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-[#8f8f96]">Til:</span>
        <button
          onClick={() => { setSelectedLang('fr'); setCurrentIndex(0); }}
          className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 cursor-pointer ${
            selectedLang === 'fr' ? 'bg-[#ff6b4a] text-[#170d08]' : 'bg-[#161920] text-[#8f8f96] border border-white/5'
          }`}
        >
          <span>🇫🇷</span> <span>Français</span>
        </button>
        <button
          onClick={() => { setSelectedLang('en'); setCurrentIndex(0); }}
          className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 cursor-pointer ${
            selectedLang === 'en' ? 'bg-[#ff6b4a] text-[#170d08]' : 'bg-[#161920] text-[#8f8f96] border border-white/5'
          }`}
        >
          <span>🇬🇧</span> <span>English</span>
        </button>
        <button
          onClick={() => { setSelectedLang('ru'); setCurrentIndex(0); }}
          className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 cursor-pointer ${
            selectedLang === 'ru' ? 'bg-[#ff6b4a] text-[#170d08]' : 'bg-[#161920] text-[#8f8f96] border border-white/5'
          }`}
        >
          <span>🇷🇺</span> <span>Русский</span>
        </button>
        <button
          onClick={() => { setSelectedLang('ALL'); setCurrentIndex(0); }}
          className={`px-3 py-1 rounded-full text-xs font-bold cursor-pointer ${
            selectedLang === 'ALL' ? 'bg-white text-black' : 'bg-[#161920] text-[#8f8f96] border border-white/5'
          }`}
        >
          Barchasi ({allWords.length})
        </button>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1">
          {['ALL', 'A1', 'A2', 'B1', 'B2', 'C1'].map(lvl => (
            <button
              key={lvl}
              onClick={() => {
                setSelectedLevel(lvl);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition cursor-pointer ${
                selectedLevel === lvl
                  ? 'bg-white text-black'
                  : 'bg-[#161920] text-[#8f8f96] hover:text-white border border-white/5'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-[#8f8f96] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="So‘zlarni qidirish..."
            className="w-full pl-9 pr-4 py-2 rounded-full bg-[#161920] border border-white/10 text-xs text-white placeholder-[#8f8f96] focus:outline-none focus:border-[#ff6b4a]"
          />
        </div>
      </div>

      {/* FLASHCARD MODE */}
      {viewMode === 'flashcards' && currentWord && (
        <div className="space-y-6">
          
          {/* Progress */}
          <div className="flex items-center justify-between text-xs font-bold text-slate-400">
            <span>So‘z {currentIndex + 1} / {filteredWords.length}</span>
            <span className="text-teal-400">O‘zlashtirilgan: {masteredWords.length} ta</span>
          </div>

          {/* 3D Perspective Flashcard Container */}
          <div
            onClick={handleFlip}
            className="relative w-full h-80 sm:h-96 rounded-3xl cursor-pointer perspective-1000 select-none group"
          >
            <div
              className={`relative w-full h-full duration-500 transform-style-preserve-3d transition-transform ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              
              {/* FRONT SIDE */}
              <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950/40 border border-slate-800 backface-hidden p-8 flex flex-col justify-between shadow-2xl group-hover:border-teal-500/50 transition">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-black">
                    {currentWord.level_code} • {currentWord.part_of_speech}
                  </span>
                  <button
                    onClick={(e) => handleSpeak(currentWord.word, currentWord.language_code || 'en', e)}
                    className="p-3 rounded-2xl bg-teal-500/20 text-teal-300 hover:bg-teal-500 hover:text-white transition shadow-lg"
                    title="Talaffuzni eshitish"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="text-center space-y-2">
                  <h2 className="text-4xl sm:text-5xl font-black text-white font-['Outfit'] tracking-tight">
                    {currentWord.word}
                  </h2>
                  <p className="text-lg font-mono text-teal-400 font-semibold">
                    {currentWord.phonetic}
                  </p>
                </div>

                <div className="text-center text-xs text-slate-500 font-semibold">
                  Tarjimani ko‘rish uchun kartochkani bosing 👆
                </div>
              </div>

              {/* BACK SIDE */}
              <div className="absolute inset-0 w-full h-full rounded-3xl bg-gradient-to-br from-teal-950/60 via-slate-900 to-slate-900 border border-teal-500/40 backface-hidden rotate-y-180 p-8 flex flex-col justify-between shadow-2xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                    O‘zbekcha Ma’nosi:
                  </span>
                  <button
                    onClick={(e) => handleSpeak(currentWord.example, currentWord.language_code || 'en', e)}
                    className="p-2.5 rounded-xl bg-teal-500/20 text-teal-300 hover:bg-teal-500 hover:text-white transition"
                    title="Misolni eshitish"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-center space-y-4">
                  <h3 className="text-2xl sm:text-3xl font-black text-teal-300 font-['Outfit']">
                    {currentWord.translation}
                  </h3>
                  
                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 text-left space-y-1 max-w-lg mx-auto">
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      "{currentWord.example}"
                    </p>
                    <p className="text-xs text-slate-400 italic">
                      "{currentWord.example_uz}"
                    </p>
                  </div>
                </div>

                <div className="text-center text-xs text-slate-400 font-medium">
                  Spaced Repetition intervalini tanlang 👇
                </div>
              </div>

            </div>
          </div>

          {/* Leitner Rating Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <button
              onClick={() => handleRate('again')}
              className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-300 text-xs font-bold transition flex flex-col items-center gap-1 active:scale-95"
            >
              <span>🔄 Qayta</span>
              <span className="text-[10px] text-slate-500">10 daqiqadan so‘ng</span>
            </button>

            <button
              onClick={() => handleRate('hard')}
              className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-300 text-xs font-bold transition flex flex-col items-center gap-1 active:scale-95"
            >
              <span>⚡ Qiyin</span>
              <span className="text-[10px] text-slate-500">1 kundan so‘ng</span>
            </button>

            <button
              onClick={() => handleRate('good')}
              className="p-3.5 rounded-2xl bg-teal-500/10 border border-teal-500/30 hover:bg-teal-500/20 text-teal-300 text-xs font-bold transition flex flex-col items-center gap-1 active:scale-95"
            >
              <span>👍 Yaxshi</span>
              <span className="text-[10px] text-slate-500">3 kundan so‘ng</span>
            </button>

            <button
              onClick={() => handleRate('easy')}
              className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-300 text-xs font-bold transition flex flex-col items-center gap-1 active:scale-95"
            >
              <span>🌟 Oson</span>
              <span className="text-[10px] text-slate-500">7 kundan so‘ng</span>
            </button>
          </div>

        </div>
      )}

      {/* LIST VIEW MODE */}
      {viewMode === 'list' && (
        <div className="space-y-3">
          {filteredWords.map((w) => (
            <div
              key={w.id}
              className="p-4 rounded-2xl bg-slate-900 border border-slate-800 hover:border-teal-500/40 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-teal-500/20 text-teal-300 text-[10px] font-black">
                    {w.level_code}
                  </span>
                  <h3 className="text-base font-black text-white font-['Outfit']">{w.word}</h3>
                  <span className="text-xs font-mono text-slate-400">{w.phonetic}</span>
                </div>
                <div className="text-xs font-bold text-teal-400">{w.translation}</div>
                <p className="text-xs text-slate-400">"{w.example}"</p>
              </div>

              <button
                onClick={() => handleSpeak(w.word)}
                className="p-2.5 rounded-xl bg-teal-500/10 text-teal-300 hover:bg-teal-500 hover:text-white transition self-end sm:self-center shrink-0"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
