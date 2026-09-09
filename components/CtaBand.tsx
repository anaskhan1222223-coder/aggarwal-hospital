"use client";
import { callLink } from "@/lib/hospital";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function CtaBand() {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section ref={ref} className="bg-[#F5F8FB] py-16">
      <div className={`mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6 px-4 ${isVisible ? "anim-fade-up" : "opacity-0"}`}>
        <div>
          <h2 className="text-2xl font-bold text-[#0E3A35] md:text-3xl">Need help choosing the right department?</h2>
          <p className="mt-2 text-base text-[#5A6B7C]">Call the hospital — our team will guide you to the right specialist.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="#appointment" className="rounded-lg bg-[#0F766E] px-7 py-3.5 text-sm font-semibold text-white hover:bg-[#0B5D57]">Book an Appointment</a>
          <a href={callLink()} className="rounded-lg border border-[#0E3A35]/25 px-7 py-3.5 text-sm font-semibold text-[#0E3A35] hover:bg-white">Call Hospital</a>
        </div>
      </div>
    </section>
  );
}