"use client";
import { useEffect, useLayoutEffect, useState } from "react";

/* Runs before paint on client, no-op on server (no SSR warning) */
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* Survives React StrictMode's double-effect in dev — intro starts only once per page load */
let introStarted = false;

export default function IntroOverlay() {
  const [phase, setPhase] = useState<"run" | "exit" | "done">("run");

  useIsomorphicLayoutEffect(() => {
    if (introStarted) return; // second StrictMode pass — leave the running intro alone

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("amh-intro");
    if (reduce || seen) {
      setPhase("done");
      return;
    }

    introStarted = true;
    sessionStorage.setItem("amh-intro", "1");
    setPhase("run");
    document.body.style.overflow = "hidden";

    window.setTimeout(() => setPhase("exit"), 2450);
    window.setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 3050);
  }, []);

  if (phase === "done") return null;

  const skip = () => {
    if (phase !== "run") return;
    setPhase("exit");
    window.setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 600);
  };

  return (
    <div
      className={`intro-root fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#06231F] px-6 ${phase === "exit" ? "intro-exit" : ""}`}
      role="status"
      aria-label="Loading Aggarwal Multispeciality Hospital"
      onClick={skip}
    >
      <noscript>
        <style>{`.intro-root{display:none!important}`}</style>
      </noscript>

      {/* ECG heartbeat line */}
      <svg viewBox="0 0 600 120" className="intro-ecg w-full max-w-xs md:max-w-lg" fill="none" aria-hidden="true">
        <path
          d="M0 60 H110 L126 60 L138 34 L150 86 L160 12 L172 102 L182 60 H250 L266 46 L282 74 L298 60 H600"
          pathLength={1}
          stroke="#9FE8D9"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 6px rgba(159,232,217,0.7))" }}
        />
      </svg>

      {/* Cross + pulse ring */}
      <div className="relative mt-8 flex h-16 w-16 items-center justify-center md:h-20 md:w-20">
        <span className="intro-ring absolute inset-0 rounded-2xl border-2 border-[#9FE8D9]" aria-hidden="true" />
        <span className="intro-pop flex h-16 w-16 items-center justify-center rounded-2xl bg-[#0F766E] shadow-xl md:h-20 md:w-20">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
            <path d="M9 3h6v6h6v6h-6v6H9v-6H3V9h6z" />
          </svg>
        </span>
      </div>

      {/* Name lockup */}
      <p className="intro-rise mt-6 text-center text-xl font-bold tracking-[0.08em] text-white md:text-3xl" style={{ animationDelay: "1.5s" }}>
        AGGARWAL
      </p>
      <p className="intro-rise mt-1 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-[#9FE8D9] md:text-xs" style={{ animationDelay: "1.7s" }}>
        Multispeciality Hospital · Shastri Nagar
      </p>
      <p className="intro-rise mt-8 text-[10px] font-medium uppercase tracking-[0.25em] text-white/40 md:text-[11px]" style={{ animationDelay: "2s" }}>
        Tap anywhere to skip
      </p>
    </div>
  );
}