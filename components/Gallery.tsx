"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const SHOTS = [
  { src: "/images/hospital-front.jpg", caption: "Hospital front · 1607-B Shastri Nagar", cat: "Exterior" },
  { src: "/images/hospital-interior.jpg", caption: "Main hall & lobby", cat: "Reception & Interiors" },
  { src: "/images/hospital-reception-2.jpg", caption: "OPD counter in motion", cat: "Reception & Interiors" },
  { src: "/images/hospital-waiting.jpg", caption: "Waiting hall", cat: "Reception & Interiors" },
  { src: "/images/hospital-waiting-2.jpg", caption: "Waiting area · OT side", cat: "Reception & Interiors" },
  { src: "/images/hospital-waiting-4.jpg", caption: "Quiet waiting room", cat: "Reception & Interiors" },
  { src: "/images/hospital-patient-room-1.jpg", caption: "Patient room", cat: "Patient Rooms" },
  { src: "/images/hospital-patient-room-2.jpg", caption: "Clean recovery ward", cat: "Patient Rooms" },
  { src: "/images/hospital-consultation.jpg", caption: "Consultation cabin", cat: "Departments" },
  { src: "/images/hospital-surgery.jpg", caption: "Procedure room", cat: "Departments" },
  { src: "/images/hospital-ot-1.jpg", caption: "Operation theatre", cat: "Departments" },
  { src: "/images/hospital-lab.jpg", caption: "Computerised lab", cat: "Departments" },
  { src: "/images/hospital-diagnostics.jpg", caption: "Digital X-ray room", cat: "Departments" },
  { src: "/images/hospital-xray-2.jpg", caption: "X-ray suite", cat: "Departments" },
  { src: "/images/hospital-dental-entrance.jpg", caption: "Dental clinic entrance", cat: "Departments" },
  { src: "/images/hospital-pharmacy.jpg", caption: "In-house pharmacy", cat: "Facilities" },
  { src: "/images/hospital-pharmacy-2.jpg", caption: "Pharmacy & nutrition corner", cat: "Facilities" },
  { src: "/images/doctor-gupta.jpg", caption: "Dr. S.C Gupta · Director", cat: "Our Team" },
  { src: "/images/doctor-gupta-2.jpg", caption: "Dr. Gupta at his desk", cat: "Our Team" },
  { src: "/images/doctor-gupta-clinic.jpg", caption: "Consultation hours", cat: "Our Team" },
  { src: "/images/hospital-ot-2.jpg", caption: "OT team at work", cat: "Our Team" },
  { src: "/images/hospital-trust.jpg", caption: "Care in every touch", cat: "Care in Motion" },
  { src: "/images/hospital-family.jpg", caption: "Little patients, big care", cat: "Care in Motion" },
  { src: "/images/hospital-dental-service-1.jpg", caption: "Dental care in progress", cat: "Care in Motion" },
  { src: "/images/hospital-treatment.jpg", caption: "Dressing & wound care", cat: "Care in Motion" },
];

const CATS = ["All", "Exterior", "Reception & Interiors", "Patient Rooms", "Departments", "Facilities", "Our Team", "Care in Motion"];

export default function Gallery() {
  const { ref, isVisible } = useScrollAnimation();
  const [cat, setCat] = useState("All");
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightbox, setLightbox] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [touchX, setTouchX] = useState(0);

  const shots = cat === "All" ? SHOTS : SHOTS.filter((s) => s.cat === cat);
  const n = shots.length;

  useEffect(() => { setActive(0); }, [cat]);

  useEffect(() => {
    if (paused || lightbox) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setActive((a) => (a + 1) % n), 4000);
    return () => window.clearInterval(t);
  }, [paused, lightbox, n]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(false);
      if (e.key === "ArrowRight") setActive((a) => (a + 1) % n);
      if (e.key === "ArrowLeft") setActive((a) => (a - 1 + n) % n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox, n]);

  const offset = (i: number) => {
    let o = i - active;
    if (o > n / 2) o -= n;
    if (o < -n / 2) o += n;
    return o;
  };

  return (
    <section id="gallery" className="overflow-hidden bg-[#0E3A35] bg-premium-dark fx-dark py-20 md:py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4 text-center">
        <p className={`text-xs font-semibold uppercase tracking-[0.25em] text-[#9FE8D9] ${isVisible ? "anim-fade" : "opacity-0"}`}>Gallery</p>
        <h2 className={`mt-3 text-3xl font-bold text-white md:text-4xl ${isVisible ? "anim-fade" : "opacity-0"}`}>Explore our hospital</h2>
        <p className={`mx-auto mt-4 max-w-xl text-sm text-white/70 ${isVisible ? "anim-fade" : "opacity-0"}`}>
          Every frame below is our own hospital, our own team. Glide the 3D stage or pick from the photo wall.
        </p>
      </div>

      <div className={`mt-8 flex flex-wrap justify-center gap-2 px-4 ${isVisible ? "anim-fade" : "opacity-0"}`}>
        {CATS.map((c) => (
          <button
            key={c}
            onClick={() => { setCat(c); setShowAll(false); }}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              cat === c ? "bg-[#9FE8D9] text-[#06231F]" : "border border-white/20 text-white/70 hover:border-[#9FE8D9]/60 hover:text-white"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* 3D stage */}
      <div
        className={`perspective-1200 relative mx-auto mt-10 h-[260px] max-w-5xl md:h-[380px] ${isVisible ? "anim-fade-up" : "opacity-0"}`}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const dx = e.changedTouches[0].clientX - touchX;
          if (dx > 45) setActive((a) => (a - 1 + n) % n);
          if (dx < -45) setActive((a) => (a + 1) % n);
        }}
      >
        {shots.map((s, i) => {
          const o = offset(i);
          const hidden = Math.abs(o) > 2;
          return (
            <button
              key={s.src}
              onClick={() => { setActive(i); setLightbox(true); }}
              aria-label={`View ${s.caption}`}
              tabIndex={hidden ? -1 : 0}
              className="absolute left-1/2 top-0 h-full w-[72%] max-w-[430px] overflow-hidden rounded-xl border border-white/10 shadow-2xl transition-all duration-[600ms] ease-[cubic-bezier(.22,.61,.36,1)]"
              style={{
                transform: `translateX(calc(-50% + ${o * 56}%)) rotateY(${o * -38}deg) translateZ(${Math.abs(o) * -170}px)`,
                opacity: hidden ? 0 : 1 - Math.abs(o) * 0.25,
                zIndex: 10 - Math.abs(o),
                pointerEvents: hidden ? "none" : "auto",
              }}
            >
              <Image src={s.src} alt={s.caption} fill sizes="(max-width: 768px) 72vw, 430px" loading="lazy" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#06231F]/60 via-transparent to-transparent" />
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 px-4">
        <button onClick={() => setActive((a) => (a - 1 + n) % n)} aria-label="Previous photo" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/20 text-white hover:bg-white/10">❮</button>
        <p className="min-w-0 flex-1 text-center text-sm font-semibold text-white/85 md:min-w-[320px] md:flex-none">{shots[active]?.caption}</p>
        <button onClick={() => setActive((a) => (a + 1) % n)} aria-label="Next photo" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-white/20 text-white hover:bg-white/10">❯</button>
      </div>

            {/* photo wall — top 6 by default */}
      <div className="mx-auto mt-10 grid max-w-7xl grid-cols-3 gap-2 px-4 sm:grid-cols-4 md:grid-cols-6 md:gap-3">
        {(showAll ? shots : shots.slice(0, 6)).map((s, i) => (
          <button
            key={s.src}
            onClick={() => setActive(i)}
            aria-label={`Show ${s.caption} on stage`}
            className={`relative aspect-square overflow-hidden rounded-lg border transition-all ${
              i === active ? "border-[#9FE8D9] opacity-100 ring-2 ring-[#9FE8D9]" : "border-white/10 opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={s.src} alt={s.caption} fill sizes="(max-width: 768px) 33vw, 16vw" loading="lazy" className="object-cover" />
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-center">
        {shots.length > 6 && (
          <button
            onClick={() => setShowAll((v) => !v)}
            className="rounded-full border border-white/25 px-5 py-2 text-xs font-semibold text-white/80 transition hover:border-[#9FE8D9]/60 hover:text-white"
          >
            {showAll ? "Show top 6 only" : `Show all ${shots.length} photos`}
          </button>
        )}
      </div>

      <p className="mt-3 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">Tap any tile · swipe or use arrows on the stage</p>

      {/* lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(false)}
          onTouchStart={(e) => setTouchX(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchX;
            if (dx > 50) setActive((active - 1 + n) % n);
            if (dx < -50) setActive((active + 1) % n);
          }}
        >
          <button className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/25" aria-label="Close photo">✕</button>
          <button className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/25" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); setActive((active - 1 + n) % n); }}>❮</button>
          <button className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/25" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); setActive((active + 1) % n); }}>❯</button>
          <div className="w-full max-w-3xl overflow-hidden rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video w-full bg-black">
              <Image src={shots[active].src} alt={shots[active].caption} fill sizes="(max-width: 1024px) 90vw, 768px" className="object-contain" />
            </div>
            <div className="flex items-center justify-between bg-white px-5 py-3">
              <p className="text-sm font-semibold text-[#0E3A35]">{shots[active].caption}</p>
              <p className="text-xs font-medium text-[#5A6B7C]">{active + 1} / {n}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}