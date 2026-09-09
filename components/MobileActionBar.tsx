import { HOSPITAL, waLink, callLink } from "@/lib/hospital";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

const cls = "flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold";

export default function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-[#DCE4EC] bg-white/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a href={callLink()} className={`${cls} text-[#0E3A35]`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        Call
      </a>

      <a
        href={waLink("Hello, I would like to book an appointment.")}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cls} text-[#1EBE5B]`}
      >
        <WhatsAppIcon className="h-5 w-5" />
        WhatsApp
      </a>

      <a href="#appointment" className={`${cls} text-[#0F766E]`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
        Book
      </a>

      <a href={HOSPITAL.mapsLink} target="_blank" rel="noopener noreferrer" className={`${cls} text-[#0E3A35]`}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        Directions
      </a>
    </div>
  );
}