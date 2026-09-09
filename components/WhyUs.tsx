"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const POINTS = [
  { title: "Experienced medical professionals", text: "Four senior specialists led by Dr. S.C Gupta, serving since 2002." },
  { title: "Multiple specialities under one roof", text: "Eight departments — from dentistry and surgery to diagnostics." },
  { title: "Convenient patient access", text: "Near Shastri Statue, with simple WhatsApp and phone appointments." },
  { title: "Comprehensive diagnostics on-site", text: "CT Scan, MRI and HRCT imaging for accurate, timely reports." },
];
const FACILITIES = [
  { icon: "🏥", title: "24 Years of Trust", text: "Serving Shastri Nagar families since 2002." },
  { icon: "🚑", title: "24×7 Emergency", text: "Round-the-clock emergency assistance." },
  { icon: "🔬", title: "Laparoscopic Surgery", text: "Minimally invasive procedures on-site." },
  { icon: "💊", title: "In-House Pharmacy", text: "Medicines available at the hospital." },
  { icon: "🦷", title: "Laser & RCT Dentistry", text: "Modern dental treatments." },
  { icon: "🩺", title: "Eight Specialities", text: "From medicine to orthopaedics, one roof." },
];

export default function WhyUs() {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="why" className="bg-white py-20 md:py-24">
      <div ref={ref} className="mx-auto grid max-w-7xl gap-14 px-4 lg:grid-cols-2 lg:gap-20">
        <div className={isVisible ? "anim-fade" : "opacity-0"}>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0F766E]">Why choose us</p>
          <h2 className="mt-4 text-3xl font-bold leading-snug text-[#0E3A35] md:text-4xl">
            Healthcare centred around people.
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-[#5A6B7C]">
            For over two decades, families in Shastri Nagar have trusted us for honest advice,
            careful treatment and care that treats every patient as a person — not a case number.
          </p>
          <a href="#about" className="mt-7 inline-block text-sm font-semibold text-[#0F766E] hover:underline">
            Discover our hospital →
          </a>
        </div>

        <ul className={isVisible ? "anim-fade-up" : "opacity-0"} style={{ animationDelay: "0.15s" }}>
          {POINTS.map((p) => (
            <li key={p.title} className="flex gap-4 border-b border-[#EEF2F6] py-5 first:pt-0 last:border-0">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#0F766E]/10 text-xs font-bold text-[#0F766E]">✓</span>
              <div>
                <h3 className="text-base font-semibold text-[#0E3A35]">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-[#5A6B7C]">{p.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}