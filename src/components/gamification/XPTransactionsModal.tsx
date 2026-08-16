import React from 'react';
import { X, Sparkles, Plus } from 'lucide-react';
import { User } from '../../types';
import { OsonStorageService } from '../../services/storage';

interface XPTransactionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
}

export const XPTransactionsModal: React.FC<XPTransactionsModalProps> = ({
  isOpen,
  onClose,
  currentUser
}) => {
  if (!isOpen) return null;

  const transactions = OsonStorageService.getXPTransactions(currentUser.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl text-slate-100 space-y-6">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold font-['Outfit']">XP Tarixi & Balans</h3>
            <p className="text-xs text-slate-400">Jami to‘plangan tajriba ballari: <strong className="text-indigo-400">{currentUser.total_xp} XP</strong></p>
          </div>
        </div>

        {/* Transactions List */}
        <div className="max-h-80 overflow-y-auto space-y-2.5 pr-1">
          {transactions.length > 0 ? (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-center justify-between"
              >
                <div className="space-y-0.5">
                  <div className="text-xs font-bold text-white">{tx.description}</div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    {new Date(tx.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(tx.created_at).toLocaleDateString()}
                  </div>
                </div>

                <span className="text-xs font-black text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-xl border border-indigo-500/20 flex items-center gap-0.5">
                  <Plus className="w-3 h-3" /> {tx.amount} XP
                </span>
              </div>
            ))
          ) : (
            <div className="text-center py-8 text-xs text-slate-500">
              Hali XP tranzaksiyalari mavjud emas
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition"
        >
          Yopish
        </button>

      </div>
    </div>
  );
};
