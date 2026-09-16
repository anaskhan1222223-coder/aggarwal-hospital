"use client";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { HOSPITAL, callLink } from "@/lib/hospital";

/* pos = where the photo crops on MOBILE vs desktop (md:) */
const SLIDES = [
  {
    image: "/images/hospital-front.jpg",
    eyebrow: "Aggarwal Multispeciality Hospital · Since 2002",
    title: "Trusted multispeciality care in Shastri Nagar",
    subtitle: "Your neighbourhood hospital with experienced doctors, modern facilities and 24×7 emergency care.",
    pos: "object-[center_45%] md:object-center",
  },
  {
    image: "/images/hospital-trust.jpg",
    eyebrow: "Welcome",
    title: "Trusted multispeciality care in Shastri Nagar",
    subtitle: "Experienced medical professionals, modern facilities and patient-focused care — all under one roof.",
    pos: "object-[center_45%] md:object-center",
  },
  {
    image: "/images/doctor-gupta.jpg",
    eyebrow: "Director & Head Doctor",
    title: "Led by Dr. S.C Gupta",
    subtitle: "MBBS (MAMC), FCGP (Gold Medalist) — over two decades of medical leadership for your family.",
    pos: "object-[center_20%]",
  },
  {
    image: "/images/hospital-dental.jpg",
    eyebrow: "Dentistry",
    title: "Modern dental care under one roof",
    subtitle: "RCT, laser dentistry and complete dental procedures for your whole family.",
    pos: "object-[35%_50%] md:object-center",
  },
  {
    image: "/images/hospital-family.jpg",
    eyebrow: "Family care",
    title: "Care for every generation",
    subtitle: "Gynaecology, paediatrics, medicine and orthopaedics — one hospital for your whole family.",
    pos: "object-[center_40%] md:object-[center_35%]",
  },
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [key, setKey] = useState(0);

  const goTo = useCallback((i: number) => {
    setCurrent(i);
    setKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % SLIDES.length), 6000);
    return () => clearInterval(timer);
  }, [current, goTo]);

  const slide = SLIDES[current];

  return (
    <section id="home" className="relative h-[78svh] min-h-[520px] overflow-hidden md:h-[92svh] md:min-h-[560px]">
      {SLIDES.map((s, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={s.image}
            alt={s.title}
            fill
            priority={i === 0}
            loading={i === 0 ? "eager" : "lazy"}
            sizes="100vw"
            quality={75}
            className={`${i === current ? "kenburns " : ""}object-cover ${s.pos ?? "object-center"}`}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[#06231F]/90 via-[#06231F]/65 to-[#06231F]/25" />
      <div className="absolute inset-0 bg-[#06231F]/45 md:hidden" />

      <div className="relative z-10 flex h-full items-center pt-16 md:pt-0">
        <div className="mx-auto w-full max-w-7xl px-4 pb-6">
          <div className="max-w-2xl">
            <p key={`e-${key}`} className="anim-fade text-xs font-semibold uppercase tracking-[0.28em] text-[#9FE8D9]">
              {slide.eyebrow}
            </p>
            <h1
              key={`t-${key}`}
              className="anim-fade-up mt-4 text-[2rem] font-bold leading-[1.15] text-white min-[400px]:text-4xl md:text-5xl md:leading-tight"
            >
              {slide.title}
            </h1>
            <p
              key={`s-${key}`}
              className="anim-fade-up mt-4 max-w-xl text-base leading-relaxed text-white/80 md:text-lg"
              style={{ animationDelay: "0.12s" }}
            >
              {slide.subtitle}
            </p>

            <div
              key={`c-${key}`}
              className="anim-fade-up mt-6 flex flex-wrap items-center gap-3 md:mt-8 md:gap-4"
              style={{ animationDelay: "0.24s" }}
            >
              <a
                href="#appointment"
                className="rounded-lg bg-[#0F766E] px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#0B5D57] md:text-base"
              >
                Book an Appointment
              </a>
              <a
                href="#doctors"
                className="rounded-lg border border-white/50 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10 md:text-base"
              >
                Find a Doctor
              </a>
              <a href={callLink()} className="text-sm font-medium text-white/80 underline underline-offset-4 hover:text-white">
                or call {HOSPITAL.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-2 md:mt-12">
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