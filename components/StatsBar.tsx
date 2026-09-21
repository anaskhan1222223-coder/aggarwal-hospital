"use client";
import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

function useCountUp(target: number, start: boolean, duration = 1200) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setVal(target); return; }
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [start, target, duration]);
  return val;
}

export default function StatsBar() {
  const { ref, isVisible } = useScrollAnimation();
  const years = useCountUp(24, isVisible);
  const depts = useCountUp(8, isVisible);

  const cells = [
    { big: "2002", suffix: "", label: "Serving since" },
    { big: String(years), suffix: "+", label: "Years of service" },
    { big: String(depts), suffix: "", label: "Departments" },
    { big: "24×7", suffix: "", label: "Emergency care", pulse: true },
  ];

  return (
    <section className="bg-white py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div ref={ref} className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#DCE4EC] bg-[#DCE4EC] md:grid-cols-4">
          {cells.map((c, i) => (
            <div
              key={c.label}
              className={`bg-white px-4 py-7 text-center ${isVisible ? "anim-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <p className="text-3xl font-bold tabular-nums text-[#0E3A35] md:text-4xl">
                {c.pulse && (
                  <span className="mr-2 inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-[#25D366] align-middle" aria-hidden="true" />
                )}
                {c.big}
                {c.suffix && <span className="text-[#0F766E]">{c.suffix}</span>}
              </p>
              <p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#5A6B7C] md:text-[11px]">
                {c.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}