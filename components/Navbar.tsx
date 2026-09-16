"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { HOSPITAL, callLink } from "@/lib/hospital";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#departments", label: "Departments" },
  { href: "#doctors", label: "Doctors" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Desktop utility bar — HIDDEN on mobile (bottom bar already covers these actions) */}
      <div className="hidden bg-[#0E3A35] px-4 py-1.5 md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-xs font-medium text-white/80">
          <span>📍 {HOSPITAL.landmark}, Shastri Nagar, New Delhi</span>
          <span className="flex items-center gap-4">
            <span className="font-semibold text-[#9FE8D9]">🚑 24×7 Emergency</span>
            <a href={callLink()} className="hover:text-white">📞 {HOSPITAL.phoneDisplay}</a>
          </span>
        </div>
      </div>

      {/* Main bar — compact 64px on mobile, original padding on desktop */}
      <nav className={`transition-all duration-300 ${scrolled ? "border-b border-[#DCE4EC] bg-white/95 backdrop-blur" : "bg-transparent"}`}>
        <div className={`mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:h-auto ${scrolled ? "md:py-2.5" : "md:py-4"}`}>
          <Link href="#home" className="flex items-center gap-2.5">
            <span className="relative h-9 w-9 overflow-hidden rounded-lg border border-white/20 shadow-md">
              <Image src="/images/hospital-front.jpg" alt="Aggarwal Multispeciality Hospital" fill sizes="36px" className="object-cover" />
            </span>
            <span className="leading-tight">
              <span className={`block text-base font-bold ${scrolled ? "text-[#0E3A35]" : "text-white"}`}>Aggarwal</span>
              <span className={`block text-[10px] font-semibold uppercase tracking-[0.16em] ${scrolled ? "text-[#0F766E]" : "text-white/70"}`}>Multispeciality Hospital</span>
            </span>
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={`text-sm font-medium transition-colors ${scrolled ? "text-[#334155] hover:text-[#0F766E]" : "text-white/85 hover:text-white"}`}>
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <a href="#appointment" className="hidden rounded-lg bg-[#0F766E] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0B5D57] sm:inline-block">
              Book Appointment
            </a>
            <a
              href={callLink()}
              aria-label="Call the hospital"
              className={`flex h-11 w-11 items-center justify-center rounded-lg border lg:hidden ${scrolled ? "border-[#DCE4EC] text-[#0E3A35]" : "border-white/30 text-white"}`}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </a>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Menu"
              aria-expanded={open}
              className={`flex h-11 w-11 items-center justify-center rounded-lg border lg:hidden ${scrolled ? "border-[#DCE4EC] text-[#0E3A35]" : "border-white/30 text-white"}`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu — full screen, scroll-safe, safe-area aware */}
      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-white lg:hidden" style={{ paddingTop: "env(safe-area-inset-top)" }}>
          <div className="flex items-center justify-between border-b border-[#DCE4EC] px-5 py-4">
            <span className="text-lg font-bold text-[#0E3A35]">Aggarwal Hospital</span>
            <button onClick={() => setOpen(false)} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center rounded-lg border border-[#DCE4EC] text-[#0E3A35]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4l10 10M4 14L14 4" /></svg>
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-5 py-2">
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block border-b border-[#EEF2F6] py-4 text-lg font-semibold text-[#0E3A35]">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="grid grid-cols-2 gap-3 border-t border-[#DCE4EC] px-5 py-4" style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}>
            <a href={callLink()} className="rounded-lg border border-[#0F766E] px-4 py-3.5 text-center text-sm font-semibold text-[#0F766E]">Call Hospital</a>
            <a href="#appointment" onClick={() => setOpen(false)} className="rounded-lg bg-[#0F766E] px-4 py-3.5 text-center text-sm font-semibold text-white">Book Appointment</a>
          </div>
        </div>
      )}
    </header>
  );
}