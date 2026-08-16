import React, { useState } from 'react';
import { User as UserIcon, Plus } from 'lucide-react';
import { User, DoctorNote } from '../../types';
import { OsonStorageService } from '../../services/storage';
import { soundFX } from '../../services/audio';

interface DoctorDashboardProps {
  currentUser: User;
}

export const DoctorDashboard: React.FC<DoctorDashboardProps> = ({ currentUser }) => {
  const doctorProfile = OsonStorageService.getDoctorProfile(currentUser.id) || {
    id: 'doc-1',
    user_id: currentUser.id,
    specialization: 'Educational Psychologist & Language Development Specialist',
    bio: 'O‘smirlarda til o‘rganishdagi psixologik to‘siqlarni yengish, motivatsiyani mustahkamlash va kundalik intizomni shakllantirish bo‘yicha mutaxassis.',
    assigned_student_ids: ['user-1', 'user-2', 'user-3', 'user-4', 'user-5', 'user-6']
  };

  const allUsers = OsonStorageService.getAllUsers();
  const assignedStudents = allUsers.filter(u => u.role === 'USER');
  const [notes, setNotes] = useState<DoctorNote[]>(OsonStorageService.getDoctorNotes());

  const [selectedStudent, setSelectedStudent] = useState<User | null>(assignedStudents[0] || null);
  const [noteText, setNoteText] = useState('');
  const [recommendationText, setRecommendationText] = useState('');
  const [category, setCategory] = useState<'motivation' | 'study_habit' | 'exam_stress' | 'speech_barrier'>('speech_barrier');
  const [isAddingNote, setIsAddingNote] = useState(false);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !noteText.trim()) return;

    soundFX.playCorrect();
    const newNote = OsonStorageService.addDoctorNote({
      doctor_id: currentUser.id,
      doctor_name: `${currentUser.first_name} ${currentUser.last_name}`,
      student_id: selectedStudent.id,
      student_name: `${selectedStudent.first_name} ${selectedStudent.last_name}`,
      note: noteText,
      recommendation: recommendationText,
      category: category
    });

    setNotes(prev => [newNote, ...prev]);
    setNoteText('');
    setRecommendationText('');
    setIsAddingNote(false);
  };

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-cyan-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-3xl shadow-xl shadow-cyan-500/20">
            👩‍⚕️
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
                {currentUser.first_name} {currentUser.last_name}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400 text-xs font-bold">
                DOCTOR / Psixolog
              </span>
            </div>
            <p className="text-xs text-cyan-300 font-semibold">{doctorProfile.specialization}</p>
            <p className="text-xs text-slate-400 max-w-xl">{doctorProfile.bio}</p>
          </div>
        </div>

        <button
          onClick={() => setIsAddingNote(true)}
          className="px-5 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-600/30 transition shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi Konsultatsiya Xulosasi</span>
        </button>
      </div>

      {/* Main Grid: Students & Consultation Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Assigned Students List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
              <UserIcon className="w-4 h-4 text-cyan-400" />
              <span>Biriktirilgan O‘quvchilar ({assignedStudents.length})</span>
            </h2>
          </div>

          <div className="space-y-2.5">
            {assignedStudents.map((student) => {
              const isSelected = selectedStudent?.id === student.id;
              return (
                <div
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`p-4 rounded-2xl border cursor-pointer transition flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-500 shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img src={student.avatar} alt={student.first_name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <div className="text-xs font-bold text-white">{student.first_name} {student.last_name}</div>
                      <div className="text-[11px] text-slate-400">{student.current_level} • {student.age} yosh</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-black text-amber-400">{student.total_xp} XP</div>
                    <div className="text-[10px] text-slate-400">🔥 {student.streak} kun</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Notes & Add Note Form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Add note modal / box */}
          {isAddingNote && selectedStudent && (
            <form onSubmit={handleAddNote} className="p-6 rounded-3xl bg-slate-900 border border-cyan-500/50 space-y-4 animate-fade-in shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white font-['Outfit']">
                  Konsultatsiya qaydnomasi: <span className="text-cyan-400">{selectedStudent.first_name} {selectedStudent.last_name}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setIsAddingNote(false)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  Bekor qilish
                </button>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Kategoriya</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as any)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="speech_barrier">Nutq va gapirishdagi tortinchoqlik (Speech Barrier)</option>
                  <option value="motivation">O‘qish motivatsiyasi va intizom (Motivation)</option>
                  <option value="study_habit">Kunlik takrorlash odatlari (Study Habit)</option>
                  <option value="exam_stress">Imtihon hayajoni va stress (Exam Stress)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Kuzatuv va Izoh</label>
                <textarea
                  value={noteText}
                  onChange={(e) => setNoteText(e.target.value)}
                  placeholder="O‘quvchining psixologik holati, diqqati va intizomi bo‘yicha xulosangiz..."
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Tavsiya va Mashqlar</label>
                <textarea
                  value={recommendationText}
                  onChange={(e) => setRecommendationText(e.target.value)}
                  placeholder="O‘quvchiga beriladigan aniq amaliy tavsiyalar..."
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500 resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold transition shadow-lg shadow-cyan-600/30"
              >
                Qaydnomani Saqlash
              </button>
            </form>
          )}

          {/* Notes Journal */}
          <div className="space-y-4">
            <h3 className="text-base font-bold text-white font-['Outfit']">
              Psixologik Konsultatsiya Tarixi ({notes.length})
            </h3>

            <div className="space-y-3">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{note.student_name}</span>
                      <span className="px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                        {note.category === 'speech_barrier' ? '🎙️ Nutq to‘sig‘i' : note.category === 'motivation' ? '⚡ Motivatsiya' : note.category === 'study_habit' ? '📚 O‘qish odati' : '🧠 Stress'}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {new Date(note.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {note.note}
                  </p>

                  <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200">
                    <strong className="text-cyan-400">Tavsiya:</strong> {note.recommendation}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
