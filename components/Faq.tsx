"use client";
import { useState } from "react";
import { HOSPITAL, callLink, waLink } from "@/lib/hospital";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FAQS = [
  { q: "How do I book an appointment?", a: `Tap "Book an Appointment" anywhere on this website, message us on WhatsApp, or call ${HOSPITAL.phoneDisplay} — our team will confirm your slot.` },
  { q: "Is the emergency service really open 24×7?", a: `Yes. Day or night, call ${HOSPITAL.phoneDisplay} and our emergency team will guide you immediately.` },
  { q: "What are the OPD timings?", a: "OPD timings vary by department. Please call us and our team will confirm the exact timing for the specialist you need." },
  { q: "Where is the hospital located?", a: `${HOSPITAL.address}. Use the "Get Directions" button in the Contact section for Google Maps.` },
  { q: "Which specialities are available?", a: "Eight departments: General Medicine, General Surgery, Laparoscopic Surgery, Gynaecology & Obstetrics, Paediatrics, Orthopaedics, ENT and Dentistry." },
  { q: "Do you have pharmacy and lab facilities on-site?", a: "Yes — an in-house pharmacy plus a computerised lab and digital X-ray, so most diagnostics happen under one roof." },
];

export default function Faq() {
  const { ref, isVisible } = useScrollAnimation();
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-[#F5F8FB] py-20 md:py-24">
      <div ref={ref} className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Sticky editorial header */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className={`text-xs font-semibold uppercase tracking-[0.25em] text-[#0F766E] ${isVisible ? "anim-fade" : "opacity-0"}`}>FAQ</p>
          <h2 className={`mt-3 text-3xl font-bold text-[#0E3A35] md:text-4xl ${isVisible ? "anim-fade-up" : "opacity-0"}`}>
            Questions families ask us every day
          </h2>
          <p className={`mt-4 max-w-md text-base leading-relaxed text-[#5A6B7C] ${isVisible ? "anim-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            Straight answers, no jargon. If your question isn't here, our team is one call away.
          </p>

          <div className={`mt-8 rounded-xl bg-[#0E3A35] p-6 shadow-lg ${isVisible ? "anim-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <p className="text-lg font-bold text-white">Still have a question?</p>
            <p className="mt-1 text-sm text-white/70">Our reception answers within minutes, 24×7.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={callLink()} className="rounded-lg bg-[#0F766E] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0B5D57]">
                Call now
              </a>
              <a href={waLink("Hello, I have a question about the hospital.")} target="_blank" rel="noopener noreferrer" className="rounded-lg border border-white/30 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10">
                WhatsApp us
              </a>
            </div>
          </div>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQS.map((f, i) => (
            <div
              key={f.q}
              className={`overflow-hidden rounded-xl border bg-white transition-all duration-300 ${
                open === i ? "border-[#0F766E]/50 shadow-md" : "border-[#DCE4EC] hover:border-[#0F766E]/30"
              } ${isVisible ? "anim-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="flex w-full items-center gap-4 px-5 py-4 text-left"
              >
                <span className={`text-xs font-bold tabular-nums transition-colors ${open === i ? "text-[#0F766E]" : "text-[#5A6B7C]/50"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`flex-1 text-base font-semibold transition-colors ${open === i ? "text-[#0F766E]" : "text-[#0E3A35]"}`}>
                  {f.q}
                </span>
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                    open === i ? "rotate-45 border-[#0F766E] bg-[#0F766E] text-white" : "border-[#DCE4EC] text-[#0F766E]"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M7 1v12M1 7h12" /></svg>
                </span>
              </button>
              <div className={`acc-panel ${open === i ? "open" : ""}`}>
                <div>
                  <p className="px-5 pb-5 pl-[3.75rem] text-sm leading-relaxed text-[#5A6B7C]">{f.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}