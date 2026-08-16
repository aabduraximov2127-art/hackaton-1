import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useI18n } from '../../services/i18n';
import { Language } from '../../data/translations';
import { soundFX } from '../../services/audio';

interface LanguageSwitcherProps {
  compact?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ compact = false }) => {
  const { lang, changeLanguage, languages, currentLanguageOption } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code: Language) => {
    soundFX.playClick();
    changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-200 transition active:scale-95 shadow-sm"
        title="Tilni tanlash / Выберите язык / Select language / Choisir la langue"
      >
        <span className="text-base leading-none">{currentLanguageOption.flag}</span>
        {!compact && <span className="font-extrabold uppercase tracking-wider">{lang}</span>}
        <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-1.5 z-50 animate-fade-in space-y-1">
          <div className="px-2.5 py-1 text-[10px] uppercase font-extrabold text-slate-500 flex items-center gap-1.5">
            <Globe className="w-3 h-3" /> Til / Язык / Language
          </div>
          {languages.map((l) => {
            const isSelected = l.code === lang;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => handleSelect(l.code)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition ${
                  isSelected
                    ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-sm'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-lg leading-none">{l.flag}</span>
                  <span>{l.nativeName}</span>
                </div>
                <span className="text-[10px] uppercase text-slate-500 font-mono font-black">{l.code}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
