import React from 'react';
import { ArrowLeft, Clock, Layers, Play, CheckCircle2, Mic, Bot, BookOpen, BrainCircuit } from 'lucide-react';
import { Course, Topic } from '../../types';
import { OsonStorageService } from '../../services/storage';

interface CourseDetailProps {
  course: Course;
  onBack: () => void;
  onSelectTopic: (topic: Topic) => void;
}

export const CourseDetail: React.FC<CourseDetailProps> = ({ course, onBack, onSelectTopic }) => {
  const topics = OsonStorageService.getTopics(course.id);

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Back Button */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-300 hover:text-white hover:border-slate-700 transition"
      >
        <ArrowLeft className="w-4 h-4" /> Barcha kurslarga qaytish
      </button>

      {/* Course Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="space-y-3 max-w-2xl">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-xs font-black">
              {course.level_code} Daraja
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {course.duration}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white font-['Outfit']">
            {course.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {course.description}
          </p>
        </div>

        <div className="w-full md:w-60 h-40 rounded-2xl overflow-hidden shrink-0 border border-slate-700/60 shadow-xl">
          <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* Topics Syllabus */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white font-['Outfit'] flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-400" />
            <span>Kurs Mavzulari ({topics.length} ta mavzu)</span>
          </h2>
        </div>

        <div className="space-y-4">
          {topics.map((topic, index) => (
            <div
              key={topic.id}
              onClick={() => onSelectTopic(topic)}
              className="group p-5 sm:p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition">
                  {topic.icon || '📖'}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-indigo-400">Mavzu {index + 1}</span>
                    <span className="text-slate-600">•</span>
                    <span className="text-[11px] text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {topic.duration_minutes} daqiqa
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition font-['Outfit']">
                    {topic.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed max-w-xl">
                    {topic.description}
                  </p>

                  {/* Module pills inside topic */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 text-[10px] font-bold text-slate-400">
                    <span className="px-2 py-0.5 rounded-md bg-slate-800/80 text-teal-400 border border-slate-700/60">
                      So‘zlar
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800/80 text-indigo-400 border border-slate-700/60">
                      Grammatika
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800/80 text-cyan-400 border border-slate-700/60">
                      Tinglash
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800/80 text-amber-400 border border-slate-700/60">
                      Quiz
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800/80 text-pink-400 border border-slate-700/60">
                      Speaking
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-indigo-600 group-hover:bg-indigo-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition active:scale-95 shrink-0"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Mavzuni Boshlash</span>
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
