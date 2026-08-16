import { callGeminiJson, isGeminiConfigured } from './gemini';

export interface EvaluationResult {
  overall_score: number;
  pronunciation: number;
  fluency: number;
  grammar: number;
  vocabulary: number;
  xp_earned: number;
  feedback: string[];
  better_version: string;
}

function clamp(n: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, Math.round(n)));
}

function localEvaluate(
  transcript: string,
  keywords: string[],
  sampleText: string
): EvaluationResult {
  const cleanTranscript = transcript.trim().toLowerCase();
  const words = cleanTranscript.split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  if (wordCount < 3) {
    return {
      overall_score: 45,
      pronunciation: 50,
      fluency: 40,
      grammar: 50,
      vocabulary: 45,
      xp_earned: 10,
      feedback: [
        'Nutq juda qisqa bo‘ldi. Kamida 1–2 ta to‘liq gap aytishga harakat qiling.',
        'Mavzuga oid ko‘proq so‘zlardan foydalaning.',
      ],
      better_version: sampleText,
    };
  }

  let matchedKeywords = 0;
  keywords.forEach((kw) => {
    if (cleanTranscript.includes(kw.toLowerCase())) matchedKeywords++;
  });
  const keywordRatio = keywords.length > 0 ? matchedKeywords / keywords.length : 0.8;

  const fluency = clamp(60 + wordCount * 2, 65, 95);
  const uniqueWords = new Set(words).size;
  const vocabDiversity = Math.min(1, uniqueWords / Math.max(1, wordCount * 0.8));
  const vocabulary = clamp(70 + keywordRatio * 20 + vocabDiversity * 10, 68, 96);
  let grammar = 85;
  if (words.length > 15) grammar = Math.min(96, grammar + 8);
  const pronunciation = clamp(80 + Math.random() * 15, 70, 97);
  const overall = clamp(pronunciation * 0.3 + fluency * 0.25 + grammar * 0.25 + vocabulary * 0.2);

  const feedback: string[] = [];
  if (keywordRatio >= 0.6) {
    feedback.push(`Ajoyib! Kalit so‘zlardan (${matchedKeywords}/${keywords.length}) yaxshi foydalandingiz.`);
  } else {
    feedback.push(`Maslahat: (${keywords.slice(0, 3).join(', ')}) kabi so‘zlarni ko‘proq ishlating.`);
  }
  feedback.push(
    fluency >= 85
      ? 'Nutq tezligi va uzluksizligi yaxshi.'
      : 'Pauzalarni kamaytirib, and / because / also bilan bog‘lang.'
  );

  return {
    overall_score: overall,
    pronunciation,
    fluency,
    grammar,
    vocabulary,
    xp_earned: overall >= 85 ? 40 : overall >= 70 ? 30 : 20,
    feedback,
    better_version: sampleText,
  };
}

export async function evaluateSpeech(
  transcript: string,
  topicTitle: string,
  keywords: string[],
  sampleText: string
): Promise<EvaluationResult> {
  if (!isGeminiConfigured() || transcript.trim().split(/\s+/).length < 3) {
    return localEvaluate(transcript, keywords, sampleText);
  }

  try {
    const data = await callGeminiJson<{
      overall_score?: number;
      pronunciation?: number;
      fluency?: number;
      grammar?: number;
      vocabulary?: number;
      feedback?: string[];
      better_version?: string;
    }>(
      `You are an English speaking examiner for teenagers on OSON platform.
Evaluate this spoken English transcript for the topic "${topicTitle}".
Expected keywords: ${keywords.join(', ')}
Model answer example: "${sampleText}"

Student transcript:
"${transcript}"

Score each category 0–100 (teen-friendly, encouraging but honest).
Return JSON only:
{
  "overall_score": number,
  "pronunciation": number,
  "fluency": number,
  "grammar": number,
  "vocabulary": number,
  "feedback": ["Uzbek or English tip 1", "tip 2"],
  "better_version": "improved English version of what they said"
}`,
      { temperature: 0.3 }
    );

    const overall = clamp(data.overall_score ?? 70);
    const pronunciation = clamp(data.pronunciation ?? overall);
    const fluency = clamp(data.fluency ?? overall);
    const grammar = clamp(data.grammar ?? overall);
    const vocabulary = clamp(data.vocabulary ?? overall);

    return {
      overall_score: overall,
      pronunciation,
      fluency,
      grammar,
      vocabulary,
      xp_earned: overall >= 85 ? 40 : overall >= 70 ? 30 : 20,
      feedback:
        Array.isArray(data.feedback) && data.feedback.length
          ? data.feedback.slice(0, 4)
          : ['Yaxshi urinish! Davom eting.'],
      better_version: data.better_version?.trim() || sampleText,
    };
  } catch (err) {
    console.warn('Gemini speaking fallback:', err);
    return localEvaluate(transcript, keywords, sampleText);
  }
}
