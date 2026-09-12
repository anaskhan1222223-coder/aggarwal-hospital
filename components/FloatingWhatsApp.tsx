import { waLink } from "@/lib/hospital";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function FloatingWhatsApp() {
  return (
    <a
      href={waLink("Hello, I would like to book an appointment at Aggarwal Hospital")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with the hospital on WhatsApp"
      className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 transition-transform hover:scale-105 hover:bg-[#1EBE5B] md:bottom-6 md:right-6"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}