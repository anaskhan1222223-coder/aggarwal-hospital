"use client";
import Image from "next/image";
import { DOCTOR, HOSPITAL } from "@/lib/hospital";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import TiltCard from "@/components/TiltCard";

export default function HeadDoctor() {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="doctors" className="bg-white py-20 md:py-24">
      <div ref={ref} className="mx-auto grid max-w-6xl items-center gap-12 px-4 lg:grid-cols-[2fr_3fr] lg:gap-16">
                <TiltCard className={`relative pb-10 ${isVisible ? "anim-fade" : "opacity-0"}`}>
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-[#DCE4EC] shadow-lg">
            <Image
              src={DOCTOR.photo}
              alt={`${DOCTOR.name}, ${DOCTOR.role}, ${HOSPITAL.name}`}
              fill
              sizes="(max-width: 1024px) 90vw, 40vw"
              className="object-cover object-[center_25%]"
            />
          </div>
          <div className="absolute bottom-0 right-0 w-32 overflow-hidden rounded-lg border-4 border-white shadow-xl md:-right-4 md:w-44">
            <div className="relative aspect-square">
              <Image
                src={DOCTOR.photo2}
                alt={`${DOCTOR.name} at his consultation desk`}
                fill
                sizes="180px"
                className="object-cover object-[center_20%]"
              />
            </div>
          </div>
          <div className="absolute bottom-0 left-0 rounded-lg bg-[#0E3A35] px-5 py-2.5 shadow-lg">
            <p className="text-sm font-bold text-white">{DOCTOR.name}</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#9FE8D9]">{DOCTOR.role}</p>
          </div>
        </TiltCard>

        <div className={isVisible ? "anim-fade-up" : "opacity-0"} style={{ animationDelay: "0.12s" }}>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0F766E]">From the Director&apos;s desk</p>
          <h2 className="mt-3 text-3xl font-bold text-[#0E3A35] md:text-4xl">{DOCTOR.name}</h2>
          <p className="mt-2 text-sm font-semibold text-[#0F766E]">
            {DOCTOR.qualifications} · Leading the hospital since {HOSPITAL.since}
          </p>
          <blockquote className="mt-6 border-l-4 border-[#0F766E] pl-5 text-lg leading-relaxed text-[#334155]">
            &ldquo;{DOCTOR.message}&rdquo;
          </blockquote>
          <p className="mt-4 text-sm font-semibold text-[#0E3A35]">— {DOCTOR.name}, {DOCTOR.role}</p>
          <a
            href="#appointment"
            className="mt-7 inline-block rounded-lg bg-[#0F766E] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#0B5D57]"
          >
            Book an appointment with Dr. Gupta
          </a>
        </div>
      </div>
    </section>
  );
}