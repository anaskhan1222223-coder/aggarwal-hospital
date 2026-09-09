"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const SHOTS = [
  { src: "/images/hospital-front.jpg", caption: "Front view of the hospital" },
  { src: "/images/hospital-pharmacy.jpg", caption: "In-house pharmacy" },
  { src: "/images/hospital-dental.jpg", caption: "Dental unit" },
  { src: "/images/hospital-waiting.jpg", caption: "Waiting area" },
  { src: "/images/hospital-signboard.jpg", caption: "1607-B Shastri Nagar — find us easily" },
  { src: "/images/hospital-family.jpg", caption: "Care for every generation" },
  { src: "/images/hospital-trust.jpg", caption: "Trust and Faith" },
];
const span = (i: number) =>
  i === 0 ? "col-span-2 row-span-2" : i === 3 ? "col-span-2" : "";

export default function Gallery() {
  const { ref, isVisible } = useScrollAnimation();
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((a) => (a === null ? a : (a + 1) % SHOTS.length));
      if (e.key === "ArrowLeft") setActive((a) => (a === null ? a : (a - 1 + SHOTS.length) % SHOTS.length));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  return (
    <section id="gallery" className="bg-[#F5F8FB] py-20 md:py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4">
        <div className={`flex flex-wrap items-end justify-between gap-4 ${isVisible ? "anim-fade" : "opacity-0"}`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0F766E]">Gallery</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0E3A35] md:text-4xl">A look inside the hospital</h2>
          </div>
          <p className="max-w-sm text-sm text-[#5A6B7C]">
            Photography will be updated with real hospital images as provided by the team.
          </p>
        </div>

        <div className="mt-10 grid grid-flow-dense grid-cols-2 gap-3 auto-rows-[150px] md:grid-cols-3 md:gap-4 md:auto-rows-[190px]">
          {SHOTS.map((shot, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`View photo: ${shot.caption}`}
              className={`group relative overflow-hidden rounded-xl border border-[#DCE4EC] bg-white ${span(i)} ${
                isVisible ? "anim-scale" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <Image
                src={shot.src}
                alt={shot.caption}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                loading="lazy"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06231F]/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <p className="absolute bottom-3 left-4 right-4 translate-y-2 text-left text-sm font-semibold text-white opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                {shot.caption}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {active !== null && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/25"
            aria-label="Close photo"
          >
            ✕
          </button>
          <button
            className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/25"
            aria-label="Previous photo"
            onClick={(e) => { e.stopPropagation(); setActive((active - 1 + SHOTS.length) % SHOTS.length); }}
          >
            ❮
          </button>
          <button
            className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/25"
            aria-label="Next photo"
            onClick={(e) => { e.stopPropagation(); setActive((active + 1) % SHOTS.length); }}
          >
            ❯
          </button>

          <div className="w-full max-w-3xl overflow-hidden rounded-xl shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video w-full bg-black">
              <Image
                src={SHOTS[active].src}
                alt={SHOTS[active].caption}
                fill
                sizes="(max-width: 1024px) 90vw, 768px"
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-between bg-white px-5 py-3">
              <p className="text-sm font-semibold text-[#0E3A35]">{SHOTS[active].caption}</p>
              <p className="text-xs font-medium text-[#5A6B7C]">{active + 1} / {SHOTS.length}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}