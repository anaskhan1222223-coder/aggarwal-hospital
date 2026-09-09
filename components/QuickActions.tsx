"use client";
import { HOSPITAL, callLink } from "@/lib/hospital";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ACTIONS = [
  { href: "#appointment", label: "Book Appointment", sub: "Request a slot online", icon: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" },
  { href: "#doctors", label: "Find a Doctor", sub: "Browse our specialists", icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" },
  { href: "#departments", label: "Departments", sub: "Eight specialities", icon: "M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" },
  { href: callLink(), label: "Emergency Call", sub: "Speak to the hospital", icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z", emergency: true },
  { href: HOSPITAL.mapsLink, label: "Get Directions", sub: "Near Shastri Statue", icon: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6z", external: true },
];

export default function QuickActions() {
  const { ref, isVisible } = useScrollAnimation();
  return (
    <section ref={ref} className="bg-white py-10">
      <div className={`mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#DCE4EC] bg-[#DCE4EC] md:grid-cols-5 ${isVisible ? "anim-fade-up" : "opacity-0"}`}>
        {ACTIONS.map((a) => (
          <a
            key={a.label}
            href={a.href}
            {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="group flex flex-col gap-1.5 bg-white p-5 transition-colors hover:bg-[#F5F8FB]"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={a.emergency ? "#C0362C" : "#0F766E"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d={a.icon} />
            </svg>
            <p className={`text-sm font-semibold ${a.emergency ? "text-[#C0362C]" : "text-[#0E3A35]"}`}>{a.label}</p>
            <p className="text-xs text-[#5A6B7C]">{a.sub}</p>
          </a>
        ))}
      </div>
    </section>
  );
}