const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
const MODEL = (import.meta.env.VITE_GEMINI_MODEL as string) || 'gemini-flash-latest';

export function isGeminiConfigured(): boolean {
  return Boolean(API_KEY && API_KEY.length > 10);
}

function extractJson(text: string): unknown {
  let t = text.trim();
  if (t.startsWith('```')) {
    t = t.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '');
  }
  const start = t.indexOf('{');
  const end = t.lastIndexOf('}');
  if (start >= 0 && end > start) {
    t = t.slice(start, end + 1);
  }
  return JSON.parse(t);
}

export async function callGemini(prompt: string, opts?: { temperature?: number }): Promise<string> {
  if (!API_KEY) {
    throw new Error('Gemini API kaliti sozlanmagan (VITE_GEMINI_API_KEY)');
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': API_KEY,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: opts?.temperature ?? 0.7,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    const msg = (err as { error?: { message?: string } })?.error?.message || `Gemini xato (${res.status})`;
    throw new Error(msg);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text || typeof text !== 'string') {
    throw new Error('Gemini bo‘sh javob qaytardi');
  }
  return text.trim();
}

export async function callGeminiJson<T>(prompt: string, opts?: { temperature?: number }): Promise<T> {
  const raw = await callGemini(
    `${prompt}\n\nIMPORTANT: Reply with valid JSON only. No markdown fences.`,
    { temperature: opts?.temperature ?? 0.4 }
  );
  return extractJson(raw) as T;
}
