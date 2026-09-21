"use client";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const REASONS = [
  {
    title: "Experienced Doctors",
    text: "Skilled, compassionate specialists led by Dr. S.C Gupta since 2002.",
    icon: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" /></>,
  },
  {
    title: "Modern Infrastructure",
    text: "Equipped OT, digital X-ray and computerised lab for accurate diagnosis.",
    icon: <><path d="M3 7v11" /><path d="M3 14h18" /><path d="M21 18v-5a3 3 0 0 0-3-3h-7" /><circle cx="7" cy="10.5" r="1.5" /></>,
  },
  {
    title: "Safe & Hygienic Environment",
    text: "Clean, secure premises maintained carefully for patient safety.",
    icon: <><path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6z" /><path d="M12 9v6M9 12h6" /></>,
  },
  {
    title: "Personalized Care",
    text: "Every patient is unique — treatment planned around their needs.",
    icon: <><path d="M12 8s-1.5-3-4-3-4 2-4 4c0 3 4 5.5 8 8.5 4-3 8-5.5 8-8.5 0-2-1.5-4-4-4s-4 3-4 3z" /><path d="M4 21c3-1.5 13-1.5 16 0" /></>,
  },
  {
    title: "24/7 Emergency Support",
    text: "Round-the-clock care when you need it the most.",
    icon: <><circle cx="12" cy="12" r="8" /><path d="M12 8v4l2.5 2.5" /></>,
  },
  {
    title: "Convenient Location",
    text: "1607-B Shastri Nagar, near Shastri Butt — easy to reach.",
    icon: <><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  },
];

export default function WhyUs() {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="why-us" className="bg-white bg-premium-light fx-light py-20 md:py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4">
                <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Infographic side */}
          <div className="order-2">
            <div className={`flex items-center gap-3 ${isVisible ? "anim-fade" : "opacity-0"}`}>
              <span className="h-px w-10 bg-[#0F766E]" aria-hidden="true" />
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0F766E]">Why choose us</p>
              <span className="h-px w-10 bg-[#0F766E]" aria-hidden="true" />
            </div>
            <h2 className={`mt-4 text-3xl font-bold leading-tight text-[#0E3A35] md:text-5xl ${isVisible ? "anim-fade-up" : "opacity-0"}`}>
              Your health, our<br className="hidden md:block" /> top priority
            </h2>
            <p className={`mt-4 max-w-xl text-base leading-relaxed text-[#5A6B7C] ${isVisible ? "anim-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
              At Aggarwal Multispeciality Hospital, we combine experienced care, modern facilities
              and a compassionate approach to give you the best possible treatment — always.
            </p>

            <div className="mt-9 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {REASONS.map((r, i) => (
                <div
                  key={r.title}
                  className={`group rounded-xl bg-[#F5F8FB] p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-[#0F766E]/5 hover:shadow-lg ${isVisible ? "anim-fade-up" : "opacity-0"}`}
                  style={{ animationDelay: `${0.08 * i + 0.15}s` }}
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0F766E] text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      {r.icon}
                    </svg>
                  </span>
                  <h3 className="mt-3.5 text-base font-bold text-[#0E3A35]">{r.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#5A6B7C]">{r.text}</p>
                </div>
              ))}
            </div>

            <div className={`mt-9 flex items-center gap-3 ${isVisible ? "anim-fade" : "opacity-0"}`} style={{ animationDelay: "0.6s" }}>
              <svg width="26" height="16" viewBox="0 0 26 16" fill="none" stroke="#0F766E" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M0 8h6l2-5 3 10 2.5-7L15 8h11" />
              </svg>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#0F766E]">
                Better care&ensp;·&ensp;Healthier tomorrows
              </p>
            </div>
          </div>

                    {/* Real photo + handwritten soul */}
          <div className={`relative order-1 ${isVisible ? "anim-fade" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
            <div className="group relative aspect-[4/5] overflow-hidden rounded-xl shadow-xl md:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="/images/why-us-care.jpg"
                alt="Care in motion at Aggarwal Multispeciality Hospital"
                fill
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06231F]/55 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}