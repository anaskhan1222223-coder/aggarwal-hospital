"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const STATS = [
  { value: "2002", label: "Serving since" },
  { value: "24+", label: "Years of service" },
  { value: "8", label: "Departments" },
  { value: "24×7", label: "Emergency care" },
];

export default function StatsBar() {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section ref={ref} className="border-b border-[#DCE4EC] bg-white">
      <div className={`mx-auto grid max-w-7xl grid-cols-2 divide-[#DCE4EC] px-4 py-10 max-md:divide-y md:grid-cols-4 md:divide-x ${isVisible ? "anim-fade" : "opacity-0"}`}>
        {STATS.map((s) => (
          <div key={s.label} className="py-3 text-center md:py-0">
            <p className="text-3xl font-bold text-[#0E3A35]">{s.value}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#5A6B7C]">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}