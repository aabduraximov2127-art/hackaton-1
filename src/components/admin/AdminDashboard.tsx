import React, { useState } from 'react';
import { 
  Shield, Users, BookOpen, BrainCircuit, HelpCircle, 
  MapPin, Plus, Trash2, Edit2, CheckCircle2, XCircle, Search, Sparkles, BarChart2 
} from 'lucide-react';
import { User, Course, Word, Question, LocationItem, UserRole, LevelCode } from '../../types';
import { OsonStorageService } from '../../services/storage';
import { soundFX } from '../../services/audio';

interface AdminDashboardProps {
  currentUser: User;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentUser }) => {
  const [activeTab, setActiveTab] = useState<'users' | 'courses' | 'words' | 'questions' | 'locations' | 'stats'>('users');
  
  const [users, setUsers] = useState<User[]>(OsonStorageService.getAllUsers());
  const [courses, setCourses] = useState<Course[]>(OsonStorageService.getCourses());
  const [words, setWords] = useState<Word[]>(OsonStorageService.getWords());
  const [questions, setQuestions] = useState<Question[]>(OsonStorageService.getQuestions());
  const [locations, setLocations] = useState<LocationItem[]>(OsonStorageService.getLocations());

  const [searchUser, setSearchUser] = useState('');

  // Add word modal state
  const [isAddingWord, setIsAddingWord] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [newTranslation, setNewTranslation] = useState('');
  const [newPhonetic, setNewPhonetic] = useState('');
  const [newExample, setNewExample] = useState('');
  const [newLevel, setNewLevel] = useState<LevelCode>('A1');

  // Add question modal state
  const [isAddingQuestion, setIsAddingQuestion] = useState(false);
  const [newQText, setNewQText] = useState('');
  const [newQLevel, setNewQLevel] = useState<LevelCode>('A1');
  const [newQOpt1, setNewQOpt1] = useState('');
  const [newQOpt2, setNewQOpt2] = useState('');
  const [newQOpt3, setNewQOpt3] = useState('');
  const [newQOpt4, setNewQOpt4] = useState('');
  const [newQCorrect, setNewQCorrect] = useState('');
  const [newQExplanation, setNewQExplanation] = useState('');

  // Toggle user active/blocked
  const handleToggleBlockUser = (u: User) => {
    soundFX.playClick();
    const updated = { ...u, is_active: !u.is_active };
    OsonStorageService.updateUser(updated);
    setUsers(OsonStorageService.getAllUsers());
  };

  // Change user role
  const handleChangeRole = (u: User, role: UserRole) => {
    soundFX.playClick();
    const updated = { ...u, role: role };
    OsonStorageService.updateUser(updated);
    setUsers(OsonStorageService.getAllUsers());
  };

  // Add word handler
  const handleAddWordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWord || !newTranslation) return;

    soundFX.playCorrect();
    const wordObj: Word = {
      id: 'w-' + Date.now(),
      level_code: newLevel,
      topic_id: 'topic-a1-1',
      word: newWord,
      translation: newTranslation,
      phonetic: newPhonetic || '/.../',
      example: newExample || 'Example sentence in English.',
      example_uz: 'O‘zbekcha tarjima misoli.',
      difficulty: 'easy',
      part_of_speech: 'noun'
    };

    OsonStorageService.saveWord(wordObj);
    setWords(OsonStorageService.getWords());
    setIsAddingWord(false);
    setNewWord('');
    setNewTranslation('');
  };

  const handleDeleteWord = (id: string) => {
    soundFX.playClick();
    OsonStorageService.deleteWord(id);
    setWords(OsonStorageService.getWords());
  };

  // Add question handler
  const handleAddQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQText || !newQCorrect) return;

    soundFX.playCorrect();
    const qObj: Question = {
      id: 'q-' + Date.now(),
      level_code: newQLevel,
      question: newQText,
      question_type: 'multiple_choice',
      options: [newQOpt1, newQOpt2, newQOpt3, newQOpt4].filter(Boolean),
      correct_answer: newQCorrect,
      explanation: newQExplanation || 'To‘g‘ri javob tahlili.'
    };

    OsonStorageService.saveQuestion(qObj);
    setQuestions(OsonStorageService.getQuestions());
    setIsAddingQuestion(false);
    setNewQText('');
  };

  const handleDeleteQuestion = (id: string) => {
    soundFX.playClick();
    OsonStorageService.deleteQuestion(id);
    setQuestions(OsonStorageService.getQuestions());
  };

  const filteredUsers = users.filter(u => 
    u.first_name.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.last_name.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.email.toLowerCase().includes(searchUser.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      
      {/* Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-rose-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center text-3xl shadow-xl shadow-rose-500/20">
            🛡️
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white font-['Outfit']">
                OSON Administrator Paneli
              </h1>
              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold">
                SUPER ADMIN
              </span>
            </div>
            <p className="text-xs text-slate-400">Platforma foydalanuvchilari, darslar, savollar va xaritani boshqarish markazi</p>
          </div>
        </div>

        {/* Global stats pills */}
        <div className="flex gap-2">
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 font-bold">Jami Userlar</div>
            <div className="text-lg font-black text-white">{users.length} ta</div>
          </div>
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-center">
            <div className="text-[10px] text-slate-400 font-bold">Kurslar</div>
            <div className="text-lg font-black text-indigo-400">{courses.length} ta</div>
          </div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition ${
            activeTab === 'users' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Users className="w-4 h-4" /> Foydalanuvchilar ({users.length})
        </button>

        <button
          onClick={() => setActiveTab('words')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition ${
            activeTab === 'words' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <BrainCircuit className="w-4 h-4" /> So‘zlar Bazasi ({words.length})
        </button>

        <button
          onClick={() => setActiveTab('questions')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition ${
            activeTab === 'questions' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <HelpCircle className="w-4 h-4" /> Savollar & Testlar ({questions.length})
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition ${
            activeTab === 'courses' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <BookOpen className="w-4 h-4" /> Kurslar CMS ({courses.length})
        </button>

        <button
          onClick={() => setActiveTab('locations')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition ${
            activeTab === 'locations' ? 'bg-rose-600 text-white shadow' : 'text-slate-400 hover:text-white'
          }`}
        >
          <MapPin className="w-4 h-4" /> Lokatsiyalar ({locations.length})
        </button>
      </div>

      {/* 1. USERS CMS */}
      {activeTab === 'users' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="text"
                value={searchUser}
                onChange={(e) => setSearchUser(e.target.value)}
                placeholder="Foydalanuvchini qidirish..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:border-rose-500"
              />
            </div>
          </div>

          <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-semibold border-b border-slate-800">
                  <tr>
                    <th className="p-4">Foydalanuvchi</th>
                    <th className="p-4">Email / Telefon</th>
                    <th className="p-4">Rol</th>
                    <th className="p-4">Daraja & XP</th>
                    <th className="p-4">Holat</th>
                    <th className="p-4 text-right">Amallar</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-800/40 transition">
                      <td className="p-4 flex items-center gap-3">
                        <img src={u.avatar} alt={u.first_name} className="w-9 h-9 rounded-full object-cover" />
                        <div>
                          <div className="font-bold text-white">{u.first_name} {u.last_name}</div>
                          <div className="text-[10px] text-slate-500">Yosh: {u.age}</div>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-[11px]">
                        <div>{u.email}</div>
                        <div className="text-slate-500">{u.phone}</div>
                      </td>
                      <td className="p-4">
                        <select
                          value={u.role}
                          onChange={(e) => handleChangeRole(u, e.target.value as UserRole)}
                          className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs font-bold text-slate-200"
                        >
                          <option value="USER">USER</option>
                          <option value="DOCTOR">DOCTOR</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                      </td>
                      <td className="p-4 font-semibold">
                        <span className="text-indigo-400 font-bold">{u.current_level}</span> • <span className="text-amber-400">{u.total_xp} XP</span>
                      </td>
                      <td className="p-4">
                        {u.is_active ? (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                            Faol
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-[10px] font-bold">
                            Bloklangan
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleToggleBlockUser(u)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                            u.is_active ? 'bg-rose-500/20 text-rose-400 hover:bg-rose-500/30' : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                          }`}
                        >
                          {u.is_active ? 'Bloklash' : 'Faollashtirish'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 2. WORDS CMS */}
      {activeTab === 'words' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-['Outfit']">Lug‘at So‘zlari Boshqaruvi</h3>
            <button
              onClick={() => setIsAddingWord(true)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" /> Yangi So‘z Qo‘shish
            </button>
          </div>

          {/* Add Word Form */}
          {isAddingWord && (
            <form onSubmit={handleAddWordSubmit} className="p-6 rounded-3xl bg-slate-900 border border-rose-500/50 space-y-4 animate-fade-in shadow-xl">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase">Yangi Inglizcha So‘z Kiritish</h4>
                <button type="button" onClick={() => setIsAddingWord(false)} className="text-xs text-slate-400">Bekor qilish</button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Inglizcha so‘z (e.g. Breakthrough)"
                  value={newWord}
                  onChange={(e) => setNewWord(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="O‘zbekcha tarjimasi"
                  value={newTranslation}
                  onChange={(e) => setNewTranslation(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  required
                />
                <select
                  value={newLevel}
                  onChange={(e) => setNewLevel(e.target.value as LevelCode)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                >
                  <option value="A1">A1 Beginner</option>
                  <option value="A2">A2 Elementary</option>
                  <option value="B1">B1 Intermediate</option>
                  <option value="B2">B2 Upper</option>
                  <option value="C1">C1 Advanced</option>
                </select>
              </div>

              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow"
              >
                Saqlash
              </button>
            </form>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {words.map((w) => (
              <div key={w.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.2 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-black">{w.level_code}</span>
                    <h4 className="text-sm font-bold text-white">{w.word}</h4>
                  </div>
                  <div className="text-xs text-teal-400 font-semibold mt-0.5">{w.translation}</div>
                </div>

                <button
                  onClick={() => handleDeleteWord(w.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition"
                  title="O‘chirish"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. QUESTIONS CMS */}
      {activeTab === 'questions' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white font-['Outfit']">Test Savollari Bazasi</h3>
            <button
              onClick={() => setIsAddingQuestion(true)}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" /> Yangi Savol Qo‘shish
            </button>
          </div>

          {/* Add Question Form */}
          {isAddingQuestion && (
            <form onSubmit={handleAddQuestionSubmit} className="p-6 rounded-3xl bg-slate-900 border border-rose-500/50 space-y-4 animate-fade-in shadow-xl">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase">Yangi Test Savoli</h4>
                <button type="button" onClick={() => setIsAddingQuestion(false)} className="text-xs text-slate-400">Bekor qilish</button>
              </div>

              <textarea
                placeholder="Savol matni..."
                value={newQText}
                onChange={(e) => setNewQText(e.target.value)}
                rows={2}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                required
              />

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Variant A"
                  value={newQOpt1}
                  onChange={(e) => setNewQOpt1(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Variant B"
                  value={newQOpt2}
                  onChange={(e) => setNewQOpt2(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Variant C"
                  value={newQOpt3}
                  onChange={(e) => setNewQOpt3(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white"
                />
                <input
                  type="text"
                  placeholder="To‘g‘ri javob matni"
                  value={newQCorrect}
                  onChange={(e) => setNewQCorrect(e.target.value)}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-800 border border-emerald-500/40 text-xs text-emerald-300 font-bold"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow"
              >
                Savolni Saqlash
              </button>
            </form>
          )}

          <div className="space-y-2.5">
            {questions.map((q) => (
              <div key={q.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">{q.level_code}</span>
                    <h4 className="text-xs font-bold text-white">{q.question}</h4>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-semibold">To‘g‘ri javob: {q.correct_answer}</div>
                </div>

                <button
                  onClick={() => handleDeleteQuestion(q.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. COURSES CMS */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {courses.map((c) => (
            <div key={c.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
              <img src={c.image} alt={c.title} className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <span className="text-[10px] font-bold text-indigo-400">{c.level_code} Daraja</span>
                <h4 className="text-xs font-bold text-white">{c.title}</h4>
                <p className="text-[11px] text-slate-400">{c.duration} • {c.topics_count} mavzu</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 5. LOCATIONS CMS */}
      {activeTab === 'locations' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {locations.map((loc) => (
            <div key={loc.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-4">
              <img src={loc.image} alt={loc.name} className="w-16 h-16 rounded-xl object-cover" />
              <div>
                <h4 className="text-xs font-bold text-white">{loc.name}</h4>
                <p className="text-[11px] text-slate-400">{loc.address}</p>
                <div className="text-[10px] text-emerald-400 font-bold mt-1">{loc.contact}</div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
