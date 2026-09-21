"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { DEPARTMENTS, waLink } from "@/lib/hospital";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Departments() {
  const { ref, isVisible } = useScrollAnimation();
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft < max - 8);
  };

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const slide = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector("article");
    const w = card ? card.clientWidth + 20 : el.clientWidth * 0.85;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <section id="departments" className="bg-[#F5F8FB] bg-premium-light fx-light py-20 md:py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4">
        <div className={`flex flex-wrap items-end justify-between gap-4 ${isVisible ? "anim-fade" : "opacity-0"}`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0F766E]">Departments</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0E3A35] md:text-4xl">Find the care you need</h2>
            <p className="mt-2 text-sm font-medium text-[#5A6B7C] md:hidden">Swipe to explore →</p>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => slide(-1)}
              disabled={!canPrev}
              aria-label="Previous departments"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#DCE4EC] bg-white text-[#0E3A35] transition hover:border-[#0F766E]/50 disabled:opacity-40"
            >
              ❮
            </button>
            <button
              onClick={() => slide(1)}
              disabled={!canNext}
              aria-label="Next departments"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#DCE4EC] bg-white text-[#0E3A35] transition hover:border-[#0F766E]/50 disabled:opacity-40"
            >
              ❯
            </button>
          </div>
        </div>
      </div>

      <div className={`relative mt-10 ${isVisible ? "anim-fade-up" : "opacity-0"}`}>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-[#F5F8FB] to-transparent md:w-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-[#F5F8FB] to-transparent md:w-10" />

        <div
          ref={trackRef}
          onScroll={update}
          className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 md:px-[max(1rem,calc((100vw-80rem)/2+1rem))]"
        >
          {DEPARTMENTS.map((dept, i) => (
            <article
              key={dept.name}
              className={`group flex min-w-[85%] snap-start flex-col overflow-hidden rounded-xl border border-[#DCE4EC] bg-white transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl sm:min-w-[46%] lg:min-w-[31%] xl:min-w-[23.5%] ${isVisible ? "anim-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {dept.image ? (
                  <>
                    <Image
                      src={dept.image}
                      alt={`${dept.name} at Aggarwal Multispeciality Hospital`}
                      fill
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 46vw, 24vw"
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#06231F]/70 via-[#06231F]/10 to-transparent" />
                  </>
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#0F766E] to-[#134E4A]">
                    <span className="text-5xl transition-transform duration-500 group-hover:scale-125">{dept.icon}</span>
                  </div>
                )}
                <span className="absolute bottom-3 left-4 rounded-md bg-white/15 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur">
                  {dept.hindi}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold text-[#0E3A35]">{dept.name}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5A6B7C]">{dept.points.join(" · ")}</p>
                <a
                  href={waLink(`Hello, I would like to book an appointment for ${dept.name}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-sm font-semibold text-[#0F766E] hover:underline"
                >
                  Book this department →
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-4 mt-6 h-1 overflow-hidden rounded-full bg-[#DCE4EC] md:mx-[max(1rem,calc((100vw-80rem)/2+1rem))]">
          <div
            className="h-full rounded-full bg-[#0F766E] transition-all duration-150"
            style={{ width: `${Math.max(10, progress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}