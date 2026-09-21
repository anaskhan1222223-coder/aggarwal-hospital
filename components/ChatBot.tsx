"use client";
import { useEffect, useRef, useState } from "react";
import { waLink } from "@/lib/hospital";

type Msg = { role: "user" | "bot"; text: string };
const CHIPS = ["Book appointment", "OPD timings", "Location & directions", "Departments", "Emergency"];

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sessionStorage.getItem("amh-chat-teaser")) return;
    const t = window.setTimeout(() => {
      setTeaser(true);
      sessionStorage.setItem("amh-chat-teaser", "1");
    }, 6000);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, typing, open]);

  const greet = () => {
    if (msgs.length === 0)
      setMsgs([{ role: "bot", text: "Hello! 🙏 I'm the Aggarwal Hospital care assistant. Ask me about appointments, timings, departments or directions — in Hindi or English." }]);
  };

    const send = async (text: string) => {
    const clean = text.trim();
    if (!clean || typing) return;
    setInput("");
    const next = [...msgs, { role: "user" as const, text: clean }];
    setMsgs(next);
    setTyping(true);
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: clean, history: next.slice(-6) }),
        signal: controller.signal,
      });
      const data = await res.json();
      setMsgs((m) => [...m, { role: "bot", text: data.reply || "Please call the hospital for help." }]);
    } catch {
      setMsgs((m) => [
        ...m,
        { role: "bot", text: "Connection is slow right now — please call +91 98117 28813 or continue on WhatsApp. I'll be back in a moment." },
      ]);
    } finally {
      window.clearTimeout(timer);
      setTyping(false);
    }
  };
  const handoff = () => {
    const last = [...msgs].reverse().find((m) => m.role === "user")?.text || "general enquiry";
    window.open(waLink(`Hello, I was chatting on the website about: ${last}`), "_blank");
  };

  return (
    <>
      {!open && (
        <div className="fixed right-4 bottom-36 z-[65] flex flex-col items-end gap-2 md:right-6 md:bottom-24">
          {teaser && (
            <button
              onClick={() => { setTeaser(false); setOpen(true); greet(); }}
              className="anim-fade max-w-[220px] rounded-xl rounded-br-none border border-[#DCE4EC] bg-white px-4 py-2.5 text-left text-xs font-semibold text-[#0E3A35] shadow-xl"
            >
              Need help? Ask me anything 👋
            </button>
          )}
          <button
            onClick={() => { setOpen(true); greet(); setTeaser(false); }}
            aria-label="Open hospital assistant chat"
            className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#0E3A35] text-white shadow-xl transition-transform hover:scale-105"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#25D366]" />
          </button>
        </div>
      )}

      {open && (
        <div
          className="fixed right-4 bottom-36 z-[70] flex h-[min(560px,65vh)] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-xl border border-[#DCE4EC] bg-white shadow-2xl md:right-6 md:bottom-24"
          role="dialog"
          aria-label="Hospital assistant"
        >
          <div className="flex items-center justify-between bg-[#0E3A35] px-4 py-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0F766E] text-white">✚</span>
              <div>
                <p className="text-sm font-bold text-white">Care Assistant</p>
                <p className="flex items-center gap-1.5 text-[11px] text-[#9FE8D9]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#25D366]" /> Online · replies instantly
                </p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} aria-label="Close chat" className="flex h-9 w-9 items-center justify-center rounded-lg text-white/80 hover:bg-white/10">✕</button>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto bg-[#F5F8FB] p-4">
            {msgs.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <p className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${m.role === "user" ? "rounded-br-none bg-[#0F766E] text-white" : "rounded-bl-none border border-[#DCE4EC] bg-white text-[#334155]"}`}>
                  {m.text}
                </p>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <span className="flex gap-1 rounded-xl rounded-bl-none border border-[#DCE4EC] bg-white px-4 py-3">
                  <span className="chat-dot h-1.5 w-1.5 rounded-full bg-[#5A6B7C]" />
                  <span className="chat-dot h-1.5 w-1.5 rounded-full bg-[#5A6B7C]" style={{ animationDelay: "0.15s" }} />
                  <span className="chat-dot h-1.5 w-1.5 rounded-full bg-[#5A6B7C]" style={{ animationDelay: "0.3s" }} />
                </span>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="flex gap-2 overflow-x-auto border-t border-[#DCE4EC] bg-white px-3 py-2">
            {CHIPS.map((c) => (
              <button key={c} onClick={() => send(c)} className="whitespace-nowrap rounded-full border border-[#DCE4EC] px-3 py-1.5 text-xs font-semibold text-[#0F766E] hover:bg-[#F5F8FB]">
                {c}
              </button>
            ))}
          </div>

          <div className="border-t border-[#DCE4EC] bg-white p-3">
            <form onSubmit={(e) => { e.preventDefault(); send(input); }} className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type in Hindi or English…"
                maxLength={500}
                aria-label="Message"
                className="flex-1 rounded-lg border border-[#DCE4EC] px-3.5 py-2.5 text-sm outline-none focus:border-[#0F766E]"
              />
              <button type="submit" aria-label="Send message" className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0F766E] text-white hover:bg-[#0B5D57]">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></svg>
              </button>
            </form>
            <div className="mt-2 flex items-center justify-between gap-2">
              <p className="text-[10px] leading-snug text-[#5A6B7C]">Assistant for hospital info only — not medical advice.</p>
              <button onClick={handoff} className="whitespace-nowrap text-[11px] font-bold text-[#1EBE5B] hover:underline">
                Continue on WhatsApp →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}