"use client";
import Image from "next/image";
import { HOSPITAL } from "@/lib/hospital";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const CHECKLIST = [
  "Eight specialities including laparoscopic (keyhole) surgery",
  "24×7 emergency services",
  "In-house pharmacy for your convenience",
  "Led by Dr. S.C Gupta — MBBS (MAMC), FCGP (Gold Medalist)",
];

export default function About() {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="about" className="bg-white py-20 md:py-24">
      <div ref={ref} className="mx-auto grid max-w-7xl items-center gap-14 px-4 lg:grid-cols-2">
        <div className={`relative pb-10 ${isVisible ? "anim-fade" : "opacity-0"}`}>
          <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-lg">
            <Image
              src="/images/hospital-front.jpg"
              alt="Aggarwal Multispeciality Hospital building front, 1607-B Shastri Nagar"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 left-4 w-40 overflow-hidden rounded-lg border-4 border-white shadow-xl md:-left-6 md:w-56">
            <div className="relative aspect-video">
               <Image
                src="/images/doctor-gupta-2.jpg"
                alt="Hospital entrance and lobby"
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute -top-5 right-5 rounded-lg bg-[#0F766E] px-6 py-4 text-white shadow-xl">
            <p className="text-3xl font-bold">24</p>
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9FE8D9]">Years of Care</p>
          </div>
        </div>

        <div className={isVisible ? "anim-fade-up" : "opacity-0"}>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0F766E]">About the hospital</p>
          <h2 className="mt-3 text-3xl font-bold text-[#0E3A35] md:text-4xl">Shastri Nagar&apos;s hospital since 2002</h2>
          <p className="mt-5 text-base leading-relaxed text-[#5A6B7C]">{HOSPITAL.about}</p>
                    <p className="mt-4 border-l-4 border-[#0F766E]/30 pl-4 text-base font-medium italic text-[#334155]">
            Our mission is simple: honest advice, careful treatment and dignified care for every family that walks in.
          </p>
          <ul className="mt-6 space-y-3">
            {CHECKLIST.map((item) => (
              <li key={item} className="flex items-start gap-3 font-medium text-[#334155]">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0F766E]/10 text-xs font-bold text-[#0F766E]">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <a href="#doctors" className="mt-7 inline-block text-sm font-semibold text-[#0F766E] hover:underline">
            Meet our head doctor →
          </a>
        </div>
      </div>
    </section>
  );
}