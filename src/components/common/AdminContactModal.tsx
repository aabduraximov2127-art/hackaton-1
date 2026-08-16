import React, { useState } from 'react';
import { Send, CheckCircle2, MessageSquare, ExternalLink, HelpCircle, Phone, X } from 'lucide-react';
import { soundFX } from '../../services/audio';

interface AdminContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail?: string;
}

export const AdminContactModal: React.FC<AdminContactModalProps> = ({ isOpen, onClose, userEmail }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    soundFX.playXP();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setMessage('');
      setSubject('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl text-slate-100">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-['Outfit']">OSON Qo‘llab-quvvatlash</h3>
            <p className="text-xs text-slate-400">Platforma ma’muriyati va ustozlarga murojaat qilish</p>
          </div>
        </div>

        {submitted ? (
          <div className="py-8 text-center">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-3 animate-bounce" />
            <h4 className="text-lg font-bold text-emerald-300">Xabaringiz qabul qilindi!</h4>
            <p className="text-sm text-slate-400 mt-1">Administrator tez orada siz bilan bog‘lanadi.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Mavzu / Yo‘nalish</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:border-indigo-500"
                required
              >
                <option value="">Tanlang...</option>
                <option value="course_question">Kurs darslari bo‘yicha savol</option>
                <option value="speaking_ai">Speaking yoki AI Tutor ishlashi</option>
                <option value="doctor_consultation">Psixolog/Doctor konsultatsiyasi</option>
                <option value="bug_report">Texnik xatolik haqida xabar</option>
                <option value="offline_branch">Offline markazlarga tashrif buyurish</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Xabaringiz</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Savol yoki taklifingizni batafsil yozing..."
                rows={4}
                className="w-full px-3 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-sm focus:outline-none focus:border-indigo-500 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition active:scale-[0.98]"
            >
              <Send className="w-4 h-4" /> Xabarni yuborish
            </button>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <a 
                href="https://t.me/oson_english" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 text-cyan-400 hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Telegram Kanal
              </a>
              <a 
                href="https://youtube.com/@oson_english" 
                target="_blank" 
                rel="noreferrer"
                className="flex items-center gap-1.5 text-rose-400 hover:underline"
              >
                <ExternalLink className="w-3.5 h-3.5" /> YouTube
              </a>
              <span className="flex items-center gap-1 text-slate-400">
                <Phone className="w-3.5 h-3.5" /> +998 71 200 45 45
              </span>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
