"use client";
import { useState } from "react";
import { HOSPITAL } from "@/lib/hospital";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FAQS = [
  { q: "How do I book an appointment?", a: "Use the appointment form on this website or message us on WhatsApp. Choose your department, preferred date and time — our team will confirm your slot on WhatsApp or phone." },
  { q: "Where is the hospital located?", a: `${HOSPITAL.address}. Use the “Get Directions” button in the contact section for turn-by-turn navigation.` },
  { q: "Which departments can I visit?", a: "Eight departments: Dentistry, General Surgery, Gynaecology & Obstetrics, Orthopaedics & Spine, Physiotherapy, Diagnostics & Imaging, Eye Care and Child Care." },
  { q: "What are the OPD timings?", a: "OPD hours vary by department and doctor. Please call the hospital or send a WhatsApp message to confirm today's schedule before visiting." },
  { q: "How do I reach the hospital in an emergency?", a: "Call the hospital number immediately — the team on duty will guide you on the fastest way to receive care." },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="faq" className="bg-white py-20 md:py-24">
      <div ref={ref} className={`mx-auto max-w-3xl px-4 ${isVisible ? "anim-fade" : "opacity-0"}`}>
        <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-[#0F766E]">FAQs</p>
        <h2 className="mt-3 text-center text-3xl font-bold text-[#0E3A35] md:text-4xl">Common questions</h2>

        <div className="mt-10 border-t border-[#DCE4EC]">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} className="border-b border-[#DCE4EC]">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-base font-semibold text-[#0E3A35]">{f.q}</span>
                  <span className={`text-lg font-medium text-[#0F766E] transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>+</span>
                </button>
                {isOpen && (
                  <div id={`faq-panel-${i}`} className="anim-fade pb-5">
                    <p className="text-sm leading-relaxed text-[#5A6B7C]">{f.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}