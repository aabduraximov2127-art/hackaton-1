import { ConversationScenario, LevelCode } from '../types';
import { callGeminiJson, isGeminiConfigured } from './gemini';

export interface AIResponse {
  message: string;
  correction?: string;
  suggested_replies: string[];
}

function localFallback(
  userText: string,
  scenario: ConversationScenario
): AIResponse {
  const clean = userText.trim().toLowerCase();
  let correction: string | undefined;

  if (/i have \d+ years/.test(clean)) {
    correction = "💡 Tip: Say 'I am 16 years old' (not 'I have 16 years').";
  } else if (clean.includes('i am agree')) {
    correction = "💡 Tip: Say 'I agree' (not 'I am agree').";
  }

  return {
    message: `Got it! As your ${scenario.ai_role}, thanks for saying that. Tell me a bit more — what would you like to practice next in this "${scenario.title}" situation?`,
    correction,
    suggested_replies: scenario.suggested_replies.slice(0, 3),
  };
}

export async function generateAITutorResponse(
  userText: string,
  scenario: ConversationScenario,
  studentLevel: LevelCode,
  history: { sender: string; message: string }[] = []
): Promise<AIResponse> {
  if (!isGeminiConfigured()) {
    return localFallback(userText, scenario);
  }

  try {
    const recent = history.slice(-8).map(h => `${h.sender.toUpperCase()}: ${h.message}`).join('\n');

    const data = await callGeminiJson<{
      message?: string;
      correction?: string | null;
      suggested_replies?: string[];
    }>(
      `You are an English conversation tutor for teenagers (ages 13–18) on the OSON platform.
Role-play as: ${scenario.ai_role}
Student role: ${scenario.user_role}
Scenario: ${scenario.title} — ${scenario.description}
Student CEFR level: ${studentLevel}

Rules:
- Reply in natural English (1–3 short sentences), stay in character.
- Gently correct major grammar mistakes; put tip in "correction" (or null if fine).
- Give exactly 3 short suggested English replies the student could say next.
- Keep language suitable for ${studentLevel} level.
- Be encouraging and teen-friendly.

Recent dialogue:
${recent || '(start of conversation)'}

Student just said: "${userText}"

Return JSON:
{
  "message": "your reply as the AI role",
  "correction": "💡 Tip: ..." or null,
  "suggested_replies": ["...", "...", "..."]
}`,
      { temperature: 0.75 }
    );

    const message = (data.message || '').trim();
    if (!message) return localFallback(userText, scenario);

    return {
      message,
      correction: data.correction || undefined,
      suggested_replies:
        Array.isArray(data.suggested_replies) && data.suggested_replies.length > 0
          ? data.suggested_replies.slice(0, 3)
          : scenario.suggested_replies.slice(0, 3),
    };
  } catch (err) {
    console.warn('Gemini AI Tutor fallback:', err);
    return localFallback(userText, scenario);
  }
}
