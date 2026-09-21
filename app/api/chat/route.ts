import { NextResponse } from "next/server";
import { SYSTEM, localAnswer } from "@/lib/chat";

async function gemini(message: string, history: { role: string; text: string }[]) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return null; // no key → offline brain handles it

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000); // 8s max wait

  try {
    const contents = [
      ...history.slice(-6).map((h) => ({
        role: h.role === "bot" ? "model" : "user",
        parts: [{ text: h.text }],
      })),
      { role: "user", parts: [{ text: message }] },
    ];

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${key}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: SYSTEM }] },
          contents,
          generationConfig: { temperature: 0.4, maxOutputTokens: 220 },
        }),
        signal: controller.signal,
      }
    );

    if (!res.ok) return null;
    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || null;
  } catch {
    return null; // any AI failure → offline brain
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(req: Request) {
  try {
    const { message, history = [] } = await req.json();
    if (typeof message !== "string" || !message.trim() || message.length > 500) {
      return NextResponse.json({ reply: localAnswer(String(message || "")) });
    }
    const ai = await gemini(message, history);
    return NextResponse.json({ reply: ai || localAnswer(message) });
  } catch {
    return NextResponse.json({ reply: localAnswer("help") });
  }
}