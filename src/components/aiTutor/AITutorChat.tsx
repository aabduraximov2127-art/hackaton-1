import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, Volume2, Mic, MicOff, Lightbulb, User as UserIcon, Wifi } from 'lucide-react';
import { ConversationMessage, User } from '../../types';
import { CONVERSATION_SCENARIOS } from '../../data/mockData';
import { OsonStorageService } from '../../services/storage';
import { generateAITutorResponse } from '../../services/aiTutor';
import { soundFX, speakEnglish, SpeechRecognizer } from '../../services/audio';
import { isGeminiConfigured } from '../../services/gemini';

interface AITutorChatProps {
  currentUser: User;
  onUserUpdate?: (user: User) => void;
}

export const AITutorChat: React.FC<AITutorChatProps> = ({ currentUser, onUserUpdate }) => {
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>(CONVERSATION_SCENARIOS[0].id);
  const scenario = CONVERSATION_SCENARIOS.find(s => s.id === selectedScenarioId) || CONVERSATION_SCENARIOS[0];
  const conversationId = `convo-${currentUser.id}-${scenario.id}`;

  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [activeCorrection, setActiveCorrection] = useState<string | null>(null);
  const [sessionBonusGiven, setSessionBonusGiven] = useState(false);
  const [liveSuggestions, setLiveSuggestions] = useState<string[]>(() =>
    CONVERSATION_SCENARIOS[0].suggested_replies
  );

  const chatBottomRef = useRef<HTMLDivElement | null>(null);
  const recognizerRef = useRef<SpeechRecognizer | null>(null);
  const userMsgCountRef = useRef(0);

  useEffect(() => {
    userMsgCountRef.current = 0;
    setSessionBonusGiven(false);
    setActiveCorrection(null);
    setLiveSuggestions(scenario.suggested_replies);

    const existing = OsonStorageService.getConversationMessages(conversationId);
    if (existing.length > 0) {
      setMessages(existing);
      userMsgCountRef.current = existing.filter(m => m.sender === 'user').length;
    } else {
      const initialAiMsg = OsonStorageService.saveConversationMessage(conversationId, {
        conversation_id: conversationId,
        sender: 'ai',
        message: scenario.initial_message,
      });
      setMessages([initialAiMsg]);
    }
  }, [selectedScenarioId, conversationId, scenario.initial_message, scenario.suggested_replies]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    recognizerRef.current = new SpeechRecognizer((res) => {
      if (res.transcript) setInputText(res.transcript);
    });
    return () => {
      recognizerRef.current?.stop();
    };
  }, []);

  const syncUser = () => {
    const refreshed = OsonStorageService.getCurrentUser();
    if (refreshed && onUserUpdate) onUserUpdate(refreshed);
  };

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isTyping) return;

    soundFX.playClick();
    setInputText('');
    if (isListening) {
      recognizerRef.current?.stop();
      setIsListening(false);
    }

    const userMsg = OsonStorageService.saveConversationMessage(conversationId, {
      conversation_id: conversationId,
      sender: 'user',
      message: text,
    });
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    userMsgCountRef.current += 1;

    setIsTyping(true);
    try {
      const aiReply = await generateAITutorResponse(
        text,
        scenario,
        currentUser.current_level,
        nextMessages.map(m => ({ sender: m.sender, message: m.message }))
      );

      const aiMsg = OsonStorageService.saveConversationMessage(conversationId, {
        conversation_id: conversationId,
        sender: 'ai',
        message: aiReply.message,
        correction: aiReply.correction,
      });

      setMessages(prev => [...prev, aiMsg]);

      if (aiReply.correction) {
        setActiveCorrection(aiReply.correction);
      }

      // Update quick replies from AI
      if (aiReply.suggested_replies?.length) {
        setLiveSuggestions(aiReply.suggested_replies);
      }

      OsonStorageService.addXP(
        currentUser.id,
        15,
        'ai_conversation',
        `AI Tutor: ${scenario.title}`
      );

      if (!sessionBonusGiven && userMsgCountRef.current >= 3) {
        OsonStorageService.addXP(
          currentUser.id,
          30,
          'ai_conversation',
          `AI Tutor sessiyasi: ${scenario.title}`
        );
        setSessionBonusGiven(true);
        soundFX.playLevelUp();
      }

      syncUser();
    } catch (err) {
      console.error(err);
      setActiveCorrection('AI vaqtincha javob bera olmadi. Qayta urinib ko‘ring.');
    } finally {
      setIsTyping(false);
    }
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

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold">
          <Bot className="w-3.5 h-3.5" />
          <span>AI Tutor</span>
        </div>
        {isGeminiConfigured() && (
          <div className="inline-flex items-center gap-1.5 ml-2 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[11px] font-bold">
            <Wifi className="w-3 h-3" /> Gemini ulangan
          </div>
        )}
        <h1 className="text-2xl sm:text-3xl font-black text-white font-['Outfit'] mt-2">
          Sun’iy intellekt bilan jonli suhbat
        </h1>
        <p className="text-xs text-slate-400 max-w-2xl">
          Stsenariy tanlang, inglizcha yozing yoki gapiring. Har javob +15 XP; 3 ta xabardan so‘ng +30 XP bonus avtomatik.
        </p>
      </div>

      {/* Scenario tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {CONVERSATION_SCENARIOS.map((sc) => {
          const isSelected = sc.id === selectedScenarioId;
          return (
            <button
              key={sc.id}
              type="button"
              onClick={() => setSelectedScenarioId(sc.id)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold shrink-0 transition flex items-center gap-2 ${
                isSelected
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              <span>{sc.icon}</span>
              <span>{sc.title_uz}</span>
            </button>
          );
        })}
      </div>

      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{scenario.icon}</span>
          <div>
            <div className="font-bold text-white">{scenario.title}</div>
            <div className="text-slate-400">
              AI: <strong className="text-purple-400">{scenario.ai_role}</strong>
              {' · '}
              Siz: <strong className="text-emerald-400">{scenario.user_role}</strong>
            </div>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-300 font-bold self-start sm:self-auto">
          {scenario.level_min}+
        </span>
      </div>

      {/* Chat */}
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

              <div className="max-w-[80%] space-y-1.5">
                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isAi
                    ? 'bg-slate-950 border border-slate-800 text-slate-100 rounded-tl-sm'
                    : 'bg-indigo-600 text-white rounded-tr-sm shadow-md shadow-indigo-600/20'
                }`}>
                  <p>{msg.message}</p>
                </div>
                {isAi && (
                  <button
                    type="button"
                    onClick={() => speakEnglish(msg.message)}
                    className="flex items-center gap-1 text-[11px] font-bold text-purple-400 hover:text-purple-300 transition"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> Tinglash
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

      {activeCorrection && (
        <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-amber-300">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{activeCorrection}</span>
          </div>
          <button
            type="button"
            onClick={() => setActiveCorrection(null)}
            className="text-[11px] text-amber-400 hover:underline shrink-0"
          >
            Tushundim
          </button>
        </div>
      )}

      {/* Quick replies */}
      <div className="flex flex-wrap gap-2">
        {(liveSuggestions.length ? liveSuggestions : scenario.suggested_replies).map((reply, i) => (
          <button
            key={i}
            type="button"
            disabled={isTyping}
            onClick={() => handleSendMessage(reply)}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-purple-500/50 text-xs text-slate-300 hover:text-white transition disabled:opacity-50"
          >
            {reply}
          </button>
        ))}
      </div>

      {/* Single input row: mic + text + send */}
      <form
        onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
        className="flex items-center gap-2"
      >
        <button
          type="button"
          onClick={handleToggleVoice}
          className={`p-3.5 rounded-2xl border transition ${
            isListening
              ? 'bg-rose-600 text-white border-rose-500 animate-pulse'
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
          placeholder="Inglizcha xabar yozing..."
          className="flex-1 px-4 py-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-xs sm:text-sm text-white focus:outline-none focus:border-purple-500"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isTyping}
          className={`p-3.5 rounded-2xl font-bold transition ${
            inputText.trim() && !isTyping
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};
