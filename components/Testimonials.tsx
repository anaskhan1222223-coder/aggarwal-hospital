"use client";
import { useEffect, useRef, useState } from "react";
import { GOOGLE_REVIEWS, waLink } from "@/lib/hospital";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import TiltCard from "@/components/TiltCard";

const AVATAR_COLORS = ["#4285F4", "#EA4335", "#FBBC05", "#34A853", "#0F766E", "#7B3FF2"];

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
    </svg>
  );
}

function GoogleWord() {
  return (
    <span className="text-2xl font-semibold tracking-tight" aria-label="Google">
      <span style={{ color: "#4285F4" }}>G</span>
      <span style={{ color: "#EA4335" }}>o</span>
      <span style={{ color: "#FBBC05" }}>o</span>
      <span style={{ color: "#4285F4" }}>g</span>
      <span style={{ color: "#34A853" }}>l</span>
      <span style={{ color: "#EA4335" }}>e</span>
    </span>
  );
}

function Verified() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="#4285F4" aria-label="Verified review">
      <path d="M12 1l2.4 2.1 3.1-.5 1 3 3 1-.5 3.1L23 12l-2 2.3.5 3.1-3 1-1 3-3.1-.5L12 23l-2.4-2.1-3.1.5-1-3-3-1 .5-3.1L1 12l2-2.3-.5-3.1 3-1 1-3 3.1.5z" />
      <path d="M10.6 15.6l-3-3 1.2-1.2 1.8 1.8 4.6-4.6 1.2 1.2z" fill="#fff" />
    </svg>
  );
}

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const resumeTimer = useRef<number | undefined>(undefined);

  const pause = () => {
    setPaused(true);
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => setPaused(false), 8000);
  };

  const r = GOOGLE_REVIEWS.rating;
  const quotes = GOOGLE_REVIEWS.quotes;
  const word = r >= 4.5 ? "Excellent" : r >= 4 ? "Great" : r >= 3.5 ? "Good" : r > 0 ? "Rated by patients" : "";

  const cardStep = () => {
    const el = trackRef.current;
    if (!el || !el.firstElementChild) return 0;
    return (el.firstElementChild as HTMLElement).clientWidth + 20;
  };

  const onScroll = () => {
    const el = trackRef.current;
    const w = cardStep();
    if (!el || !w) return;
    setActiveIdx(Math.round(el.scrollLeft / w));
  };

  const slide = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * cardStep(), behavior: "smooth" });
  };

  const scrollToIdx = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * cardStep(), behavior: "smooth" });
  };

  /* Continuous sliding — pauses 8s after user touch/hover */
  useEffect(() => {
    if (paused || quotes.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => {
      const el = trackRef.current;
      if (!el) return;
      const next = (Math.round(el.scrollLeft / cardStep()) + 1) % quotes.length;
      scrollToIdx(next);
    }, 4500);
    return () => window.clearInterval(t);
  }, [paused, quotes.length]);

  return (
        <section id="reviews" className="bg-white bg-premium-light fx-light py-20 md:py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center">
          <h2 className={`text-3xl font-bold text-[#0E3A35] md:text-5xl ${isVisible ? "anim-fade-up" : "opacity-0"}`}>
            Our reviews on Google
          </h2>
          <p
            className={`mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#5A6B7C] md:text-base ${isVisible ? "anim-fade-up" : "opacity-0"}`}
            style={{ animationDelay: "0.08s" }}
          >
            Our patients' stories reflect the trust and care we strive for every day.
            Read their experiences — exactly as they wrote them, unedited.
          </p>
          <svg
            width="160"
            height="20"
            viewBox="0 0 26 16"
            className={`mx-auto mt-5 ${isVisible ? "anim-fade" : "opacity-0"}`}
            fill="none"
            stroke="#0F766E"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ animationDelay: "0.15s" }}
          >
            <path d="M0 8h6l2-5 3 10 2.5-7L15 8h11" />
          </svg>
        </div>

        <div className="mt-12 grid items-center gap-10 lg:grid-cols-[0.75fr_2.25fr] [&>*]:min-w-0">
          {/* Rating summary */}
          <div className={`text-center ${isVisible ? "anim-fade" : "opacity-0"}`} style={{ animationDelay: "0.1s" }}>
            {r > 0 ? (
              <>
                <p className="text-2xl font-bold uppercase tracking-[0.14em] text-[#0E3A35]">{word}</p>
                <div className="mt-3 flex justify-center gap-1">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg
                      key={i}
                      width="30"
                      height="30"
                      viewBox="0 0 24 24"
                      fill={i < Math.round(r) ? "#F59E0B" : "none"}
                      stroke="#F59E0B"
                      strokeWidth="1.6"
                      className="star-pop"
                      style={{ animationDelay: `${0.3 + i * 0.12}s` }}
                      aria-hidden="true"
                    >
                      <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z" />
                    </svg>
                  ))}
                </div>
                <p className="mt-3 text-sm font-semibold text-[#334155]">
                  Based on <span className="tabular-nums">{GOOGLE_REVIEWS.count}</span> reviews
                </p>
              </>
            ) : (
              <>
                <p className="text-2xl font-bold text-[#0E3A35]">Our patients' voices</p>
                <p className="mx-auto mt-2 max-w-[220px] text-sm text-[#5A6B7C]">Live from our public Google profile</p>
              </>
            )}
            <div className="mt-4 flex justify-center">
              <GoogleWord />
            </div>
          </div>

          {/* 3D review blocks — one complete review per slide on mobile */}
          <div className="relative min-w-0">
            {quotes.length > 0 ? (
              <>
                <button
                  onClick={() => slide(-1)}
                  aria-label="Previous reviews"
                  className="absolute -left-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#DCE4EC] bg-white text-[#0E3A35] shadow-lg transition hover:border-[#0F766E]/50 md:flex"
                >
                  ❮
                </button>
                <button
                  onClick={() => slide(1)}
                  aria-label="Next reviews"
                  className="absolute -right-3 top-1/2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#DCE4EC] bg-white text-[#0E3A35] shadow-lg transition hover:border-[#0F766E]/50 md:flex"
                >
                  ❯
                </button>

                <div
                  ref={trackRef}
                  onScroll={onScroll}
                  onTouchStart={pause}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                  className="no-scrollbar flex w-full snap-x snap-mandatory scroll-px-4 gap-5 overflow-x-auto scroll-smooth pb-3"
                >
                  {quotes.map((q, i) => (
                    <TiltCard
                      key={`${q.name}-${i}`}
                      delay={0.1 * i + 0.15}
                      className={`relative w-[calc(100vw-2rem)] min-w-[calc(100vw-2rem)] snap-center sm:w-[48%] sm:min-w-[48%] lg:w-[31.5%] lg:min-w-[31.5%] ${isVisible ? "anim-fade-up" : "opacity-0"}`}
                    >
                      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#DCE4EC] bg-white shadow-[0_18px_40px_-18px_rgba(14,58,53,0.28)]">
                        <span className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-[#0F766E] to-[#9FE8D9]" aria-hidden="true" />
                        <span
                          className="pointer-events-none absolute -right-1 top-5 select-none font-serif text-[92px] font-bold leading-none text-[#0F766E]/10"
                          aria-hidden="true"
                        >
                          "
                        </span>

                        <div className="flex flex-1 flex-col p-6 pt-7">
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex min-w-0 items-center gap-3">
                              <span
                                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base font-bold text-white shadow-md"
                                style={{ background: AVATAR_COLORS[i % AVATAR_COLORS.length] }}
                              >
                                {q.name.charAt(0)}
                              </span>
                              <div className="min-w-0">
                                <p className="truncate text-sm font-bold text-[#0E3A35]">{q.name}</p>
                                <p className="text-[11px] font-medium text-[#5A6B7C]">{q.when}</p>
                              </div>
                            </div>
                            <GoogleG className="h-5 w-5 shrink-0" />
                          </div>

                          <div className="mt-3 flex items-center gap-1.5">
                            <span className="flex gap-0.5">
                              {[0, 1, 2, 3, 4].map((s) => (
                                <svg
                                  key={s}
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill={s < (q.stars ?? 5) ? "#F59E0B" : "none"}
                                  stroke="#F59E0B"
                                  strokeWidth="1.6"
                                  aria-hidden="true"
                                >
                                  <path d="M12 2l2.9 6.6 7.1.6-5.4 4.7 1.6 7-6.2-3.7-6.2 3.7 1.6-7L2 9.2l7.1-.6z" />
                                </svg>
                              ))}
                            </span>
                            <Verified />
                          </div>

                          {q.text ? (
                            <blockquote className="mt-4 flex-1 break-words whitespace-pre-line text-sm leading-relaxed text-[#334155]">
                              {q.text}
                            </blockquote>
                          ) : (
                            <p className="mt-4 flex-1 text-sm italic leading-relaxed text-[#5A6B7C]">
                              Rated us on Google without a written comment.
                            </p>
                          )}

                          <div className="mt-5 flex items-center justify-between border-t border-[#DCE4EC] pt-3">
                            <span className="text-[11px] font-medium text-[#5A6B7C]">Posted on Google</span>
                            <GoogleG className="h-4 w-4" />
                          </div>
                        </div>
                      </div>
                    </TiltCard>
                  ))}
                </div>

                {/* Mobile slide dots */}
                <div className="mt-5 flex justify-center gap-1.5 lg:hidden">
                  {quotes.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => scrollToIdx(i)}
                      aria-label={`Go to review ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all ${i === activeIdx ? "w-6 bg-[#0F766E]" : "w-1.5 bg-[#DCE4EC]"}`}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className={`rounded-xl border border-dashed border-[#DCE4EC] bg-[#F7F9FB] p-10 text-center ${isVisible ? "anim-fade" : "opacity-0"}`}>
                <GoogleG className="mx-auto h-8 w-8" />
                <p className="mt-3 text-sm font-semibold text-[#334155]">Patient reviews appear here straight from our Google profile.</p>
              </div>
            )}
          </div>
        </div>

        {/* View more */}
        <div className={`mt-10 text-center ${isVisible ? "anim-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.3s" }}>
          <a
            href={GOOGLE_REVIEWS.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-[#0F766E] px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0B5D57]"
          >
            View more on Google →
          </a>
        </div>

        {/* Promise strip */}
        <div
          className={`mt-12 flex flex-col items-center justify-between gap-5 rounded-xl bg-[#0E3A35] p-6 text-center md:flex-row md:text-left ${isVisible ? "anim-fade-up" : "opacity-0"}`}
          style={{ animationDelay: "0.35s" }}
        >
          <div>
            <p className="text-lg font-bold text-white">Every review is read. Every voice matters.</p>
            <p className="mt-1 text-sm text-white/70">What went right, we continue. What went wrong, we fix.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={waLink("Hello, I would like to share feedback about my experience at the hospital.")}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#0F766E] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0B5D57]"
            >
              Share your experience
            </a>
            <a
              href={GOOGLE_REVIEWS.link}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Rate us on Google
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}