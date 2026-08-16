import { useState, useEffect } from 'react';
import { Language, LANGUAGES, TRANSLATIONS } from '../data/translations';

const LANG_KEY = 'oson_language_v1';

export class I18nService {
  private static currentLang: Language = 'uz';
  private static listeners: Array<(lang: Language) => void> = [];

  static init(): Language {
    try {
      const saved = localStorage.getItem(LANG_KEY) as Language;
      if (saved && (saved === 'uz' || saved === 'ru' || saved === 'en' || saved === 'fr')) {
        this.currentLang = saved;
      } else {
        this.currentLang = 'uz';
      }
    } catch {
      this.currentLang = 'uz';
    }
    return this.currentLang;
  }

  static getLanguage(): Language {
    return this.currentLang;
  }

  static setLanguage(lang: Language): void {
    this.currentLang = lang;
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch (e) {
      console.error(e);
    }
    this.listeners.forEach(fn => fn(lang));
  }

  static getTranslations() {
    return TRANSLATIONS[this.currentLang] || TRANSLATIONS.uz;
  }

  static subscribe(listener: (lang: Language) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }
}

export function useI18n() {
  const [lang, setLang] = useState<Language>(() => I18nService.init());

  useEffect(() => {
    const unsub = I18nService.subscribe((newLang) => {
      setLang(newLang);
    });
    return unsub;
  }, []);

  const changeLanguage = (newLang: Language) => {
    I18nService.setLanguage(newLang);
  };

  const t = TRANSLATIONS[lang] || TRANSLATIONS.uz;

  return {
    lang,
    changeLanguage,
    t,
    languages: LANGUAGES,
    currentLanguageOption: LANGUAGES.find(l => l.code === lang) || LANGUAGES[0]
  };
}
