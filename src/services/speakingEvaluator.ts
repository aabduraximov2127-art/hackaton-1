import { SpeakingAttempt } from '../types';

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

export function evaluateSpeech(
  transcript: string, 
  topicTitle: string, 
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
        "Nutq juda qisqa bo‘ldi. Kamida 1-2 ta to‘liq gap aytishga harakat qiling.",
        "Mavzuga oid ko‘proq so‘zlardan foydalaning."
      ],
      better_version: sampleText
    };
  }

  // Keyword match analysis
  let matchedKeywords = 0;
  keywords.forEach(kw => {
    if (cleanTranscript.includes(kw.toLowerCase())) {
      matchedKeywords++;
    }
  });
  const keywordRatio = keywords.length > 0 ? matchedKeywords / keywords.length : 0.8;

  // Fluency calculation based on length and flow
  let fluency = Math.min(95, Math.max(65, 60 + wordCount * 2));
  
  // Vocabulary score based on unique words and keyword coverage
  const uniqueWords = new Set(words).size;
  const vocabDiversity = Math.min(1, uniqueWords / Math.max(1, wordCount * 0.8));
  let vocabulary = Math.min(96, Math.max(68, Math.round(70 + keywordRatio * 20 + vocabDiversity * 10)));

  // Grammar heuristics
  let grammar = 85;
  if (!cleanTranscript.includes(' i ') && !cleanTranscript.startsWith('i ') && !cleanTranscript.includes('my') && !cleanTranscript.includes('is') && !cleanTranscript.includes('are')) {
    grammar -= 10;
  }
  if (words.length > 15) {
    grammar = Math.min(96, grammar + 8);
  }

  // Pronunciation score simulation
  let pronunciation = Math.min(97, Math.max(70, Math.round(80 + Math.random() * 15)));

  // Overall weighted score
  const overall = Math.round(pronunciation * 0.3 + fluency * 0.25 + grammar * 0.25 + vocabulary * 0.2);

  // Generate dynamic feedback
  const feedback: string[] = [];
  if (keywordRatio >= 0.6) {
    feedback.push(`Ajoyib! Mavzuga oid asosiy kalit so‘zlardan (${matchedKeywords}/${keywords.length}) juda yaxshi foydalandingiz.`);
  } else {
    feedback.push(`Maslahat: Mavzuga doir kalit so‘zlardan (${keywords.slice(0, 3).join(', ')}) ko‘proq foydalanish nutqingizni boyitadi.`);
  }

  if (fluency >= 85) {
    feedback.push("Nutq tezligi va uzluksizligi o‘smirlar uchun juda yaxshi darajada!");
  } else {
    feedback.push("Pauzalarni kamaytirib, gaplarni bir-biriga bog‘lovchi so‘zlar (and, because, also) bilan boyiting.");
  }

  if (grammar >= 88) {
    feedback.push("Grammatik tuzilmalar to‘g‘ri va tushunarli qo‘llanilgan.");
  }

  const xpEarned = overall >= 85 ? 40 : overall >= 70 ? 30 : 20;

  return {
    overall_score: overall,
    pronunciation,
    fluency,
    grammar,
    vocabulary,
    xp_earned: xpEarned,
    feedback,
    better_version: sampleText
  };
}
