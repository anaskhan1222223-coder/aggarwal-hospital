"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { HOSPITAL, callLink } from "@/lib/hospital";

/* Art-directed slides: `mobile` = portrait crop for phones (optional) */
const SLIDES = [
  {
    image: "/images/hospital-front.jpg",
    mobile: "/images/hospital-front-mobile.jpg",
    eyebrow: "Aggarwal Multispeciality Hospital · Since 2002",
    title: "Trusted multispeciality care in Shastri Nagar",
    subtitle: "Your neighbourhood hospital with experienced doctors, modern facilities and 24×7 emergency care.",
    pos: "object-[center_35%] md:object-center",
  },
  {
    image: "/images/hospital-interior.jpg",
    eyebrow: "Welcome",
    title: "A hospital your family can rely on",
    subtitle: "Experienced medical professionals, modern facilities and patient-focused care — all under one roof.",
    pos: "object-[center_60%] md:object-center",
  },
  {
    image: "/images/doctor-gupta.jpg",
    eyebrow: "Director & Head Doctor",
    title: "Led by Dr. S.C Gupta",
    subtitle: "MBBS (MAMC), FCGP (Gold Medalist) — over two decades of medical leadership for your family.",
    pos: "object-[center_45%]",
  },
  {
    image: "/images/hospital-surgery.jpg",
    eyebrow: "Surgery & laparoscopy",
    title: "An operation theatre you can trust",
    subtitle: "General and laparoscopic (keyhole) surgery performed with experienced hands.",
    pos: "object-[center_55%] md:object-center",
  },
  {
    image: "/images/hospital-trust.jpg",
    eyebrow: "Our promise",
    title: "Care you can feel",
    subtitle: "Every patient is family — behind every consultation, procedure and recovery.",
    pos: "object-[center_50%]",
  },
];

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return m;
}

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [key, setKey] = useState(0);
  const [sy, setSy] = useState(0);
  const [imgFail, setImgFail] = useState<Record<number, boolean>>({});
  const isMobile = useIsMobile();

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    setKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % SLIDES.length), 6000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setSy(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const slide = SLIDES[current];
  const srcFor = (s: (typeof SLIDES)[number], i: number) =>
    isMobile && s.mobile && !imgFail[i] ? s.mobile : s.image;

  return (
    <section id="home" className="relative h-[72svh] min-h-[500px] overflow-hidden md:h-[92svh] md:min-h-[560px]">
      {/* Slides + parallax depth layer */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{ transform: `translate3d(0, ${sy * 0.22}px, 0) scale(1.06)` }}
      >
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
          >
            <Image
              src={srcFor(s, i)}
              alt={s.title}
              fill
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              sizes="100vw"
              quality={75}
              onError={() => setImgFail((f) => ({ ...f, [i]: true }))}
              className={`${i === current ? "kenburns " : ""}object-cover brightness-[1.12] saturate-[1.05] ${
                isMobile && s.mobile && !imgFail[i] ? "object-center" : s.pos ?? "object-center"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Desktop veil */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#06231F]/80 via-[#06231F]/35 to-transparent" />
      {/* Mobile: invisible radial scrim behind text (no box, no edges) + soft base for dots */}
            <div className="absolute inset-0 bg-[radial-gradient(140%_90%_at_20%_82%,rgba(6,35,31,0.66),rgba(6,35,31,0.3)_48%,transparent_80%)] md:hidden" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#06231F]/50 to-transparent md:hidden" />

      {/* Content */}
      <div
                className="relative z-10 flex h-full items-end pt-16 will-change-transform md:items-center"
        style={{ transform: `translate3d(0, ${sy * -0.06}px, 0)`, opacity: Math.max(0, 1 - sy / 520) }}
      >
                <div className="mx-auto w-full max-w-7xl px-4 pb-8 md:pb-6">
          <div className="max-w-2xl">
            <p
              key={`e-${key}`}
              className="anim-fade text-[10px] font-semibold uppercase tracking-[0.24em] text-[#9FE8D9] [text-shadow:0_1px_6px_rgba(6,35,31,0.55)] md:text-xs md:tracking-[0.28em]"
            >
              {slide.eyebrow}
            </p>
            <h1
              key={`t-${key}`}
              className="anim-fade-up mt-3 text-[1.75rem] font-bold leading-[1.2] text-white [text-shadow:0_1px_10px_rgba(6,35,31,0.5)] min-[400px]:text-[2.15rem] md:text-5xl md:leading-tight md:[text-shadow:0_2px_16px_rgba(6,35,31,0.4)]"
            >
              {slide.title}
            </h1>
            <p
              key={`s-${key}`}
              className="anim-fade-up mt-3 line-clamp-2 max-w-xl text-[15px] leading-relaxed text-white/85 [text-shadow:0_1px_6px_rgba(6,35,31,0.5)] md:line-clamp-none md:text-lg"
              style={{ animationDelay: "0.12s" }}
            >
              {slide.subtitle}
            </p>

            <p className="mt-4 md:hidden">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#C0362C]/90 px-3.5 py-1.5 text-xs font-bold text-white">
                🚑 24×7 Emergency · {HOSPITAL.phoneDisplay}
              </span>
            </p>

            <div
              key={`c-${key}`}
              className="anim-fade-up mt-5 flex flex-wrap items-center gap-2.5 md:mt-8 md:gap-4"
              style={{ animationDelay: "0.24s" }}
            >
              <a
                href="#appointment"
                className="rounded-lg bg-[#0F766E] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#0B5D57] md:px-7 md:py-3.5 md:text-base"
              >
                Book an Appointment
              </a>
              <a
                href="#doctors"
                className="rounded-lg border border-white/50 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 md:px-7 md:py-3.5 md:text-base"
              >
                Find a Doctor
              </a>
              <a
                href={callLink()}
                className="hidden text-sm font-medium text-white/80 underline underline-offset-4 hover:text-white md:inline"
              >
                or call {HOSPITAL.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-2 drop-shadow md:mt-12">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${i === current ? "w-8 bg-[#9FE8D9]" : "w-2 bg-white/40 hover:bg-white/70"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}