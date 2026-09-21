"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const FACILITIES = [
  { image: "/images/hospital-pharmacy.jpg", title: "In-house pharmacy", text: "Medicines available at the hospital, so you never have to run around." },
  { image: "/images/hospital-ot-2.jpg", title: "Operation theatre", text: "A clean, equipped OT for general and laparoscopic procedures." },
  { image: "/images/hospital-patient-room-2.jpg", title: "Comfortable patient wards", text: "Clean, calm rooms for rest and recovery." },
  { image: "/images/hospital-lab.jpg", title: "Computerised lab & diagnostics", text: "Digital X-ray, ECG and lab tests on-site." },
  { image: "/images/hospital-waiting-4.jpg", title: "Calm waiting halls", text: "Airy, clean spaces for patients and their families." },
  { image: "/images/hospital-dental-entrance.jpg", title: "Dental clinic", text: "RCT, laser dentistry and complete dental care." },
];

export default function Facilities() {
  const { ref, isVisible } = useScrollAnimation();
  const trackRef = useRef<HTMLDivElement>(null);
  const [styles, setStyles] = useState<{ r: number; s: number }[]>([]);
  const [progress, setProgress] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const update = () => {
    const el = trackRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    const cards = Array.from(el.children) as HTMLElement[];
    setStyles(
      cards.map((c) => {
        const d = (c.offsetLeft + c.offsetWidth / 2 - center) / el.clientWidth;
        return {
          r: Math.max(-16, Math.min(16, d * -32)),          // 3D arc rotation
          s: 1 - Math.min(Math.abs(d), 0.6) * 0.12,         // center card slightly bigger
        };
      })
    );
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
    const w = card ? card.clientWidth + 24 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <section id="facilities" className="bg-white bg-premium-light fx-light py-20 md:py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4">
        <div className={`flex flex-wrap items-end justify-between gap-4 ${isVisible ? "anim-fade" : "opacity-0"}`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0F766E]">Facilities</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0E3A35] md:text-4xl">Built around patient comfort</h2>
            <p className="mt-2 text-sm font-medium text-[#5A6B7C] md:hidden">Swipe to explore →</p>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => slide(-1)}
              disabled={!canPrev}
              aria-label="Previous facilities"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#DCE4EC] bg-white text-[#0E3A35] transition hover:border-[#0F766E]/50 disabled:opacity-40"
            >
              ❮
            </button>
            <button
              onClick={() => slide(1)}
              disabled={!canNext}
              aria-label="Next facilities"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#DCE4EC] bg-white text-[#0E3A35] transition hover:border-[#0F766E]/50 disabled:opacity-40"
            >
              ❯
            </button>
          </div>
        </div>
      </div>

      <div className={`relative mt-10 ${isVisible ? "anim-fade-up" : "opacity-0"}`}>
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-white to-transparent md:w-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-white to-transparent md:w-10" />

        <div
          ref={trackRef}
          onScroll={update}
          className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth px-4 pb-4 md:px-[max(1rem,calc((100vw-80rem)/2+1rem))]"
        >
          {FACILITIES.map((f, i) => (
            <article
              key={f.title}
              className="group relative min-w-[82%] snap-center overflow-hidden rounded-xl border border-[#DCE4EC] bg-white shadow-sm sm:min-w-[58%] lg:min-w-[40%]"
              style={{
                transform: `perspective(1100px) rotateY(${styles[i]?.r ?? 0}deg) scale(${styles[i]?.s ?? 1})`,
                transition: "transform 0.35s ease-out",
              }}
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  sizes="(max-width: 640px) 82vw, (max-width: 1024px) 58vw, 40vw"
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06231F]/85 via-[#06231F]/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <h3 className="text-lg font-semibold text-white">{f.title}</h3>
                  <p className="mt-1 text-sm text-white/80">{f.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mx-4 mt-4 h-1 overflow-hidden rounded-full bg-[#DCE4EC] md:mx-[max(1rem,calc((100vw-80rem)/2+1rem))]">
          <div
            className="h-full rounded-full bg-[#0F766E] transition-all duration-150"
            style={{ width: `${Math.max(10, progress * 100)}%` }}
          />
        </div>
      </div>
    </section>
  );
}