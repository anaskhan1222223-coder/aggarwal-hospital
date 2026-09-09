"use client";
import { DEPARTMENTS, waLink } from "@/lib/hospital";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function Departments() {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section id="departments" className="bg-[#F5F8FB] py-20 md:py-24">
      <div ref={ref} className="mx-auto max-w-7xl px-4">
        <div className={`flex flex-wrap items-end justify-between gap-4 ${isVisible ? "anim-fade" : "opacity-0"}`}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0F766E]">Departments</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0E3A35] md:text-4xl">Find the care you need</h2>
          </div>
          <p className="max-w-sm text-sm text-[#5A6B7C]">
            Not sure which department to choose? Call us and our team will guide you to the right specialist.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {DEPARTMENTS.map((dept, i) => (
            <div
              key={dept.name}
              className={`flex flex-col rounded-xl border border-[#DCE4EC] bg-white p-6 transition-colors hover:border-[#0F766E]/50 ${isVisible ? "anim-fade-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.06}s` }}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#0F766E]/10 text-xl">{dept.icon}</span>
                            <h3 className="mt-4 text-lg font-semibold text-[#0E3A35]">
                {dept.name} <span className="text-sm font-medium text-[#5A6B7C]">· {dept.hindi}</span>
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-[#5A6B7C]">{dept.points.join(" · ")}</p>
              <a
                href={waLink(`Hello, I would like to book an appointment for ${dept.name}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-sm font-semibold text-[#0F766E] hover:underline"
              >
                Book this department →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}