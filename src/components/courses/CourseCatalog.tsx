import React, { useState } from 'react';
import { BookOpen, Search, Clock, Layers, ArrowRight, Sparkles, Globe } from 'lucide-react';
import { Course, LevelCode, LanguageCode } from '../../types';
import { OsonStorageService } from '../../services/storage';
import { AVAILABLE_LANGUAGES } from '../../data/mockData';

interface CourseCatalogProps {
  activeLanguage?: LanguageCode;
  onSelectCourse: (course: Course) => void;
}

export const CourseCatalog: React.FC<CourseCatalogProps> = ({ activeLanguage = 'fr', onSelectCourse }) => {
  const [selectedLevel, setSelectedLevel] = useState<string>('ALL');
  const [selectedLang, setSelectedLang] = useState<string>(activeLanguage);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const levels = OsonStorageService.getLevels();
  const allCourses = OsonStorageService.getCourses();

  const filteredCourses = allCourses.filter(course => {
    const matchesLevel = selectedLevel === 'ALL' || course.level_code === selectedLevel;
    const matchesLang = selectedLang === 'ALL' || course.language_code === selectedLang || (!course.language_code && selectedLang === 'en');
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesLang && matchesSearch;
  });

  const currentLangObj = AVAILABLE_LANGUAGES.find(l => l.code === selectedLang) || AVAILABLE_LANGUAGES[0];

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      
      {/* Header */}
      <div className="space-y-2">
        <div className="eyebrow-pill">
          <span className="dot" />
          <span>INTERAKTIV KURSLAR VA DARSLIKLAR</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white font-['Space_Grotesk'] flex items-center gap-2">
          <span>{currentLangObj.flag} {currentLangObj.name} Kurslari</span>
        </h1>
        <p className="text-xs sm:text-sm text-[#8f8f96] max-w-2xl">
          Har bir mavzu 45 daqiqalik qiziqarli darslarga bo‘lingan: yangi so‘zlar, sodda grammatika, audio dialoglar, test va speaking mashqi.
        </p>
      </div>

      {/* Language & Level Tabs */}
      <div className="flex flex-col gap-3">
        
        {/* Language Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <span className="text-xs font-bold text-[#8f8f96] flex items-center gap-1 shrink-0">
            <Globe className="w-3.5 h-3.5 text-[#ff6b4a]" /> Tilni tanlang:
          </span>
          {AVAILABLE_LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setSelectedLang(lang.code)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition flex items-center gap-1.5 cursor-pointer ${
                selectedLang === lang.code
                  ? 'bg-[#ff6b4a] text-[#170d08] shadow-md shadow-[#ff6b4a]/20'
                  : 'bg-[#161920] text-[#8f8f96] hover:text-white border border-white/5'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </button>
          ))}
          <button
            onClick={() => setSelectedLang('ALL')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition cursor-pointer ${
              selectedLang === 'ALL'
                ? 'bg-white text-black'
                : 'bg-[#161920] text-[#8f8f96] hover:text-white border border-white/5'
            }`}
          >
            Barcha Tillar
          </button>
        </div>

        {/* Level Pills & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <button
              onClick={() => setSelectedLevel('ALL')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition cursor-pointer ${
                selectedLevel === 'ALL'
                  ? 'bg-white text-black'
                  : 'bg-[#161920] text-[#8f8f96] hover:text-white border border-white/5'
              }`}
            >
              Barcha Darajalar ({allCourses.length})
            </button>
            {levels.map((lvl) => (
              <button
                key={lvl.code}
                onClick={() => setSelectedLevel(lvl.code)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold shrink-0 transition flex items-center gap-1 cursor-pointer ${
                  selectedLevel === lvl.code
                    ? 'bg-white text-black'
                    : 'bg-[#161920] text-[#8f8f96] hover:text-white border border-white/5'
                }`}
              >
                <span>{lvl.badge_icon}</span>
                <span>{lvl.code}</span>
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
              placeholder="Kurs nomini qidirish..."
              className="w-full pl-9 pr-4 py-2 rounded-full bg-[#161920] border border-white/10 text-xs text-white placeholder-[#8f8f96] focus:outline-none focus:border-[#ff6b4a]"
            />
          </div>
        </div>

      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            onClick={() => onSelectCourse(course)}
            className="group rounded-3xl bg-[#161920] border border-white/10 overflow-hidden hover:border-[#ff6b4a]/60 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer flex flex-col justify-between"
          >
            <div>
              {/* Course Thumbnail Image */}
              <div className="relative h-44 overflow-hidden bg-black/40">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161920] via-transparent to-black/30" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-[#0b0c10]/80 backdrop-blur-md text-[#ff6b4a] font-mono text-[11px] font-bold border border-white/10">
                    {course.level_code} · {course.language_code?.toUpperCase() || 'FR'}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#0b0c10]/80 backdrop-blur-md text-amber-300 font-mono text-[11px] font-bold border border-white/10 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" /> {course.duration}
                  </span>
                </div>
              </div>

              {/* Course Info */}
              <div className="p-5 space-y-2">
                <h3 className="text-base font-bold text-white font-['Space_Grotesk'] group-hover:text-[#ff6b4a] transition leading-snug">
                  {course.title}
                </h3>
                <p className="text-xs text-[#8f8f96] leading-relaxed line-clamp-2">
                  {course.description}
                </p>
              </div>
            </div>

            {/* Bottom metadata */}
            <div className="px-5 pb-5 pt-2 flex items-center justify-between border-t border-white/5 text-xs text-[#8f8f96]">
              <div className="flex items-center gap-1.5 font-mono">
                <Layers className="w-3.5 h-3.5 text-[#ff6b4a]" />
                <span>{course.topics_count} ta dars mavzusi</span>
              </div>

              <div className="flex items-center gap-1 text-[#ff6b4a] font-bold group-hover:translate-x-1 transition">
                <span>Darsga kirish</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
