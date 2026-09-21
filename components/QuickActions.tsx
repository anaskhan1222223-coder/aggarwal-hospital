"use client";
import { callLink } from "@/lib/hospital";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const ACTIONS = [
  {
    href: "#appointment",
    title: "Book Appointment",
    sub: "Request a slot online",
    icon: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M8 3v4M16 3v4M3 10h18" /></>,
  },
  {
    href: "#doctors",
    title: "Find a Doctor",
    sub: "Browse our specialists",
    icon: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20c0-3.5 3-6 7-6s7 2.5 7 6" /></>,
  },
  {
    href: "#departments",
    title: "Departments",
    sub: "Eight specialities",
    icon: <><rect x="4" y="4" width="7" height="7" rx="1.5" /><rect x="13" y="4" width="7" height="7" rx="1.5" /><rect x="4" y="13" width="7" height="7" rx="1.5" /><rect x="13" y="13" width="7" height="7" rx="1.5" /></>,
  },
  {
    href: callLink(),
    title: "Emergency Call",
    sub: "Speak to the hospital",
    icon: <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />,
    danger: true,
  },
  {
    href: "https://www.google.com/maps/search/?api=1&query=Aggarwal+Multispeciality+Hospital+Shastri+Nagar",
    title: "Get Directions",
    sub: "Near Shastri Butt",
    icon: <><path d="M12 21s-7-5.5-7-11a7 7 0 0 1 14 0c0 5.5-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></>,
  },
];

export default function QuickActions() {
  const { ref, isVisible } = useScrollAnimation();
  return (
        <section className="relative z-10 px-4 pt-8 md:pt-10">
      <div
        ref={ref}
        className="no-scrollbar mx-auto flex max-w-7xl snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible"
      >
        {ACTIONS.map((a, i) => (
          <a
            key={a.title}
            href={a.href}
            className={`group relative min-w-[62%] snap-start overflow-hidden rounded-xl border border-[#DCE4EC] bg-white p-5 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl sm:min-w-[42%] lg:min-w-0 ${isVisible ? "anim-fade-up" : "opacity-0"}`}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            <span
              className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#0F766E] to-[#9FE8D9] transition-transform duration-300 group-hover:scale-x-100"
              aria-hidden="true"
            />
            <span
              className={`flex h-11 w-11 items-center justify-center rounded-lg transition-colors duration-300 ${
                a.danger
                  ? "bg-[#C0362C]/10 text-[#C0362C] group-hover:bg-[#C0362C] group-hover:text-white"
                  : "bg-[#0F766E]/10 text-[#0F766E] group-hover:bg-[#0F766E] group-hover:text-white"
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                {a.icon}
              </svg>
            </span>
            <p className="mt-3 text-base font-bold text-[#0E3A35]">{a.title}</p>
            <p className="mt-1 text-xs text-[#5A6B7C]">{a.sub}</p>
            <span
              className={`absolute right-4 top-5 -translate-x-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 ${a.danger ? "text-[#C0362C]" : "text-[#0F766E]"}`}
              aria-hidden="true"
            >
              →
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}