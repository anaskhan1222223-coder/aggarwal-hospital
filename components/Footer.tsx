import { HOSPITAL, waLink, callLink } from "@/lib/hospital";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import Image from "next/image";
const COLS = [
  {
    title: "Hospital",
    links: [
      { href: "#about", label: "About" },
      { href: "#departments", label: "Departments" },
      { href: "#doctors", label: "Doctors" },
      { href: "#gallery", label: "Facilities & Gallery" },
      { href: "#facilities", label: "Facilities" },
      { href: "#video", label: "Hospital film" },
    ],
  },
  {
    title: "Patients",
    links: [
      { href: "#appointment", label: "Appointments" },
      { href: "#faq", label: "FAQs" },
      { href: "#reviews", label: "Patient ratings" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#0A2B27] text-white">
      <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 md:pb-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5">
                <span className="relative h-9 w-9 overflow-hidden rounded-lg border border-white/10">
                <Image src="/images/hospital-front.jpg" alt="Aggarwal Multispeciality Hospital" fill sizes="36px" className="object-cover" />
              </span>
              <div>
                <p className="text-base font-bold">Aggarwal</p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#9FE8D9]">Multispeciality Hospital</p>
              </div>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Multispeciality hospital serving Shastri Nagar, New Delhi since 2002 —
              experienced doctors, modern diagnostics and patient-first care.
            </p>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9FE8D9]">{col.title}</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}><a href={l.href} className="text-white/70 hover:text-white">{l.label}</a></li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9FE8D9]">Contact</h4>
            <ul className="mt-4 space-y-2.5 text-sm text-white/70">
              <li>{HOSPITAL.address}</li>
              <li><a href={callLink()} className="hover:text-white">📞 {HOSPITAL.phoneDisplay}</a></li>
              <li><a href={`tel:+${HOSPITAL.phone2}`} className="hover:text-white">📞 {HOSPITAL.phone2Display}</a></li>
              <li>
                <a href={waLink("Hello, I would like to book an appointment.")} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-white">
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </a>
              </li>
              <li><a href={HOSPITAL.mapsLink} target="_blank" rel="noopener noreferrer" className="hover:text-white">Get Directions →</a></li>
            </ul>
          </div>
        </div>

                <div className="mt-12 rounded-lg border border-[#C0362C]/40 bg-[#C0362C]/10 px-5 py-4 text-center text-xs font-medium text-red-200">
          In case of a life-threatening emergency, please call{" "}
          <a href="tel:112" className="font-bold underline underline-offset-2">112</a> or visit the hospital directly.
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/45 md:flex-row">
          <p>© {new Date().getFullYear()} Aggarwal Multispeciality Hospital. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="/privacy" className="hover:text-white/80">Privacy Policy</a>
            <a href="/terms" className="hover:text-white/80">Terms</a>
            <a href="/disclaimer" className="hover:text-white/80">Disclaimer</a>
          </div>
          <p>Designed & developed by Anas Khan · +91 98995 53880</p>
        </div>
      </div>
    </footer>
  );
}