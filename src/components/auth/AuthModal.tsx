import React, { useState } from 'react';
import { X, Lock, Mail, Phone, User as UserIcon, Calendar, ArrowRight, CheckCircle, Sparkles, KeyRound } from 'lucide-react';
import { User, UserRole } from '../../types';
import { OsonStorageService } from '../../services/storage';
import { soundFX } from '../../services/audio';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: User) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register' | 'verify'>('login');
  
  // Login fields
  const [loginIdentifier, setLoginIdentifier] = useState('jasur@oson.uz');
  const [loginPassword, setLoginPassword] = useState('password123');
  
  // Register fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState(16);
  const [phone, setPhone] = useState('+998 90 ');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Verification fields
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCodeHint, setGeneratedCodeHint] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    const users = OsonStorageService.getAllUsers();
    const user = users.find(u => 
      (u.email.toLowerCase() === loginIdentifier.toLowerCase() || u.phone === loginIdentifier)
    );

    if (user) {
      soundFX.playCorrect();
      OsonStorageService.setCurrentUser(user);
      onLoginSuccess(user);
      onClose();
    } else {
      soundFX.playWrong();
      setErrorMsg('Foydalanuvchi topilmadi. Iltimos tekshirib qaytadan urinib ko‘ring.');
    }
  };

  const handleQuickLogin = (role: UserRole) => {
    const users = OsonStorageService.getAllUsers();
    const target = users.find(u => u.role === role) || users[0];
    soundFX.playCorrect();
    OsonStorageService.setCurrentUser(target);
    onLoginSuccess(target);
    onClose();
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!firstName || !lastName || !email || !password) {
      setErrorMsg('Iltimos barcha majburiy maydonlarni to‘ldiring.');
      return;
    }

    try {
      const { user, verificationCode } = OsonStorageService.registerUser({
        first_name: firstName,
        last_name: lastName,
        age: Number(age),
        phone: phone,
        email: email,
        password: password,
        role: 'USER',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
        current_level: 'A1'
      });

      setGeneratedCodeHint(verificationCode);
      setMode('verify');
    } catch (e) {
      setErrorMsg('Ro‘yxatdan o‘tishda xatolik yuz berdi.');
    }
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const success = OsonStorageService.verifyEmailCode(email, verificationCode.trim());
    if (success) {
      soundFX.playLevelUp();
      const cur = OsonStorageService.getCurrentUser();
      if (cur) {
        onLoginSuccess(cur);
      }
      onClose();
    } else {
      soundFX.playWrong();
      setErrorMsg('Tasdiqlash kodi noto‘g‘ri yoki muddati tugagan.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-slate-100">
        
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 shadow-lg shadow-indigo-600/30 mb-3">
            <span className="text-2xl">🚀</span>
          </div>
          <h3 className="text-2xl font-black font-['Outfit']">OSON Platformasi</h3>
          <p className="text-xs text-slate-400 mt-1">13–18 yoshli yoshlar uchun zamonaviy til platformasi</p>
        </div>

        {/* Tab switchers */}
        {mode !== 'verify' && (
          <div className="flex p-1 rounded-2xl bg-slate-950 border border-slate-800 mb-6">
            <button
              onClick={() => { setMode('login'); setErrorMsg(null); }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                mode === 'login' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Kirish (Login)
            </button>
            <button
              onClick={() => { setMode('register'); setErrorMsg(null); }}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${
                mode === 'register' ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              Ro‘yxatdan o‘tish
            </button>
          </div>
        )}

        {/* Error message */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email yoki Telefon</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="jasur@oson.uz yoki +99890..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-sm focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Parol</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-800/80 border border-slate-700 text-sm focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 font-bold text-sm shadow-lg shadow-indigo-600/30 transition active:scale-[0.98]"
            >
              Tizimga kirish
            </button>

            {/* Quick Demo Logins for Hackathon Judges */}
            <div className="pt-4 border-t border-slate-800">
              <div className="text-[11px] font-bold text-slate-400 mb-2.5 text-center uppercase tracking-wider">
                ⚡ Hackathon Quick Demo Logins:
              </div>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => handleQuickLogin('USER')}
                  className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-400 text-xs font-bold transition flex flex-col items-center gap-1"
                >
                  <span>👦 O‘quvchi</span>
                  <span className="text-[10px] text-slate-400">Jasur (A2)</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('DOCTOR')}
                  className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 hover:bg-cyan-500/20 text-cyan-400 text-xs font-bold transition flex flex-col items-center gap-1"
                >
                  <span>👩‍⚕️ Doctor</span>
                  <span className="text-[10px] text-slate-400">Dr. Nilufar</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickLogin('ADMIN')}
                  className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 text-rose-400 text-xs font-bold transition flex flex-col items-center gap-1"
                >
                  <span>🛡️ Admin</span>
                  <span className="text-[10px] text-slate-400">OSON Admin</span>
                </button>
              </div>
            </div>
          </form>
        )}

        {/* REGISTER FORM */}
        {mode === 'register' && (
          <form onSubmit={handleRegister} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Ism</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Jasur"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Familiya</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Aliyev"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Yosh (13–18)</label>
                <input
                  type="number"
                  min={12}
                  max={25}
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Telefon</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+998 90 123 45 67"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Parol</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Kamida 6 ta belgi"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 text-sm focus:outline-none focus:border-indigo-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 mt-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-bold text-sm shadow-lg shadow-emerald-600/30 transition active:scale-[0.98]"
            >
              Tasdiqlash kodini olish
            </button>
          </form>
        )}

        {/* VERIFICATION CODE STEP */}
        {mode === 'verify' && (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div className="p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-center">
              <KeyRound className="w-8 h-8 text-indigo-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-indigo-300">Emailga 6 xonali kod yuborildi</h4>
              <p className="text-xs text-slate-400 mt-1">{email}</p>
              
              {generatedCodeHint && (
                <div className="mt-3 p-2 rounded-xl bg-slate-900 border border-slate-700 inline-block">
                  <span className="text-[11px] text-slate-400">Demo Tasdiqlash Kodi: </span>
                  <span className="text-sm font-mono font-bold text-amber-400 tracking-widest">{generatedCodeHint}</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">6 xonali kodni kiriting</label>
              <input
                type="text"
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="123456"
                className="w-full text-center tracking-[0.5em] font-mono text-xl py-3 rounded-xl bg-slate-800 border border-slate-700 focus:outline-none focus:border-indigo-500 font-bold text-white"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 font-bold text-sm shadow-lg shadow-emerald-600/30 transition active:scale-[0.98]"
            >
              Hisobni tasdiqlash va kirish
            </button>

            <button
              type="button"
              onClick={() => setMode('register')}
              className="w-full text-xs text-slate-400 hover:text-white py-1 transition"
            >
              Orqaga qaytish
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
