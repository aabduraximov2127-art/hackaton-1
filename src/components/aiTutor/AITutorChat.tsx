import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, Send, Volume2, Sparkles, Mic, MicOff, RotateCcw, 
  Lightbulb, CheckCircle2, User as UserIcon, MessageSquare, ArrowRight 
} from 'lucide-react';
import { ConversationScenario, ConversationMessage, User } from '../../types';
import { CONVERSATION_SCENARIOS } from '../../data/mockData';
import { OsonStorageService } from '../../services/storage';
import { generateAITutorResponse } from '../../services/aiTutor';
import { soundFX, speakEnglish, SpeechRecognizer } from '../../services/audio';
import { fireConfetti } from '../common/ConfettiTrigger';

interface AITutorChatProps {
  currentUser: User;
}

export const AITutorChat: React.FC<AITutorChatProps> = ({ currentUser }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(CONVERSATION_SCENARIOS[0].id);
  const scenario = CONVERSATION_SCENARIOS.find(s => s.id === selectedScenarioId) || CONVERSATION_SCENARIOS[0];

  const conversationId = `convo-${currentUser.id}-${scenario.id}`;

  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [activeCorrection, setActiveCorrection] = useState<string | null>(null);

  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const recognizerRef = useRef<SpeechRecognizer | null>(null);

  // Load existing or initialize conversation
  useEffect(() => {
    const existing = OsonStorageService.getConversationMessages(conversationId);
    if (existing.length > 0) {
      setMessages(existing);
    } else {
      // Seed initial AI greeting
      const initialAiMsg: ConversationMessage = {
        id: 'msg-init-' + Date.now(),
        conversation_id: conversationId,
        sender: 'ai',
        message: scenario.initial_message,
        timestamp: new Date().toISOString()
      };
      OsonStorageService.saveConversationMessage(conversationId, initialAiMsg);
      setMessages([initialAiMsg]);
    }
  }, [selectedScenarioId]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    recognizerRef.current = new SpeechRecognizer(
      (res) => {
        if (res.transcript) {
          setInputText(res.transcript);
        }
      }
    );
  }, []);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text) return;

    soundFX.playClick();
    setInputText('');

    // Save user message
    const userMsg: ConversationMessage = {
      id: 'msg-u-' + Date.now(),
      conversation_id: conversationId,
      sender: 'user',
      message: text,
      timestamp: new Date().toISOString()
    };
    OsonStorageService.saveConversationMessage(conversationId, userMsg);
    setMessages(prev => [...prev, userMsg]);

    // AI typing & response
    setIsTyping(true);
    setTimeout(() => {
      const aiReply = generateAITutorResponse(text, scenario, currentUser.current_level);
      
      const aiMsg: ConversationMessage = {
        id: 'msg-ai-' + Date.now(),
        conversation_id: conversationId,
        sender: 'ai',
        message: aiReply.message,
        correction: aiReply.correction,
        timestamp: new Date().toISOString()
      };

      OsonStorageService.saveConversationMessage(conversationId, aiMsg);
      setMessages(prev => [...prev, aiMsg]);
      setIsTyping(false);

      if (aiReply.correction) {
        setActiveCorrection(aiReply.correction);
      }

      // Play audio TTS for AI message
      speakEnglish(aiReply.message);

      // Award conversational XP
      OsonStorageService.addXP(currentUser.id, 15, 'ai_conversation', `AI Tutor suhbati: ${scenario.title}`);
    }, 1000);
  };

  const handleToggleVoice = () => {
    if (isListening) {
      recognizerRef.current?.stop();
      setIsListening(false);
    } else {
      recognizerRef.current?.start();
      setIsListening(true);
    }
  };

  const handleFinishSession = () => {
    soundFX.playLevelUp();
    fireConfetti();
    OsonStorageService.addXP(currentUser.id, 30, 'ai_conversation', `AI Tutor sessiyasi yakunlandi: ${scenario.title}`);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold">
            <Bot className="w-3.5 h-3.5" />
            <span>AI Tutor Live Dialogue</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit']">
            Sun’iy Intellekt bilan Jonli Suhbat
          </h1>
        </div>

        <button
          onClick={handleFinishSession}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg shadow-purple-600/30 transition self-start sm:self-auto"
        >
          <Sparkles className="w-4 h-4" /> Suhbatni yakunlash (+30 XP)
        </button>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {CONVERSATION_SCENARIOS.map((sc) => {
          const isSelected = sc.id === selectedScenarioId;
          return (
            <button
              key={sc.id}
              onClick={() => setSelectedScenarioId(sc.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold shrink-0 transition flex items-center gap-2 ${
                isSelected
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 ring-2 ring-purple-400'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{sc.icon}</span>
              <span>{sc.title_uz}</span>
            </button>
          );
        })}
      </div>

      {/* Active Scenario Banner */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{scenario.icon}</span>
          <div>
            <div className="font-bold text-white">{scenario.title} ({scenario.title_uz})</div>
            <div className="text-slate-400">AI Roli: <strong className="text-purple-400">{scenario.ai_role}</strong> • Sizning rolingiz: <strong className="text-emerald-400">{scenario.user_role}</strong></div>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-bold self-start sm:self-auto">
          {scenario.level_min}+ Daraja
        </span>
      </div>

      {/* Chat Stream Box */}
      <div className="p-4 sm:p-6 rounded-3xl bg-slate-900/90 border border-slate-800 h-[480px] overflow-y-auto space-y-4">
        {messages.map((msg) => {
          const isAi = msg.sender === 'ai';
          return (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${isAi ? '' : 'flex-row-reverse'}`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm shrink-0 ${
                isAi 
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' 
                  : 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
              }`}>
                {isAi ? <Bot className="w-5 h-5" /> : <UserIcon className="w-5 h-5" />}
              </div>

              <div className={`max-w-[80%] space-y-2`}>
                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isAi
                    ? 'bg-slate-950 border border-slate-800 text-slate-100 rounded-tl-sm'
                    : 'bg-indigo-600 text-white rounded-tr-sm shadow-md shadow-indigo-600/20'
                }`}>
                  <p>{msg.message}</p>
                </div>

                {/* Speaker button on AI responses */}
                {isAi && (
                  <button
                    onClick={() => speakEnglish(msg.message)}
                    className="flex items-center gap-1 text-[11px] font-bold text-purple-400 hover:text-purple-300 transition"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Talaffuzni tinglash
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-purple-600/50 text-white flex items-center justify-center">
              <Bot className="w-5 h-5" />
            </div>
            <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-purple-400 animate-pulse">
              AI javob yozmoqda...
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </div>

      {/* Grammar Correction Tip Popup */}
      {activeCorrection && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs animate-fade-in">
          <div className="flex items-center gap-2 text-amber-300">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{activeCorrection}</span>
          </div>
          <button
            onClick={() => setActiveCorrection(null)}
            className="text-[11px] text-amber-400 hover:underline shrink-0"
          >
            Tushundim
          </button>
        </div>
      )}

      {/* Suggested Quick Replies Chips */}
      <div>
        <div className="text-[11px] font-bold text-slate-400 mb-2 uppercase tracking-wider">
          💡 Tezkor javob variantlari:
        </div>
        <div className="flex flex-wrap gap-2">
          {scenario.suggested_replies.map((reply, i) => (
            <button
              key={i}
              onClick={() => handleSendMessage(reply)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 text-xs text-slate-300 hover:text-white transition active:scale-95"
            >
              "{reply}"
            </button>
          ))}
        </div>
      </div>

      {/* Input Bar */}
      <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleToggleVoice}
          className={`p-3.5 rounded-2xl border transition shadow-lg ${
            isListening
              ? 'bg-rose-600 text-white border-rose-500 animate-pulse shadow-rose-600/30'
              : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white hover:border-purple-500'
          }`}
          title="Ovoz orqali kiritish"
        >
          {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Inglizcha xabaringizni yozing yoki mikrofondan foydalaning..."
          className="flex-1 px-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
        />

        <button
          type="submit"
          disabled={!inputText.trim()}
          className={`p-3.5 rounded-2xl font-bold transition shadow-lg ${
            inputText.trim()
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-purple-600/30 active:scale-95'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

    </div>
  );
};
