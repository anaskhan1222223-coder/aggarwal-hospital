import { HOSPITAL, waLink, callLink } from "@/lib/hospital";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";

export default function Contact() {
  return (
    <section id="contact" className="bg-[#F5F8FB] py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0F766E]">Contact & location</p>
          <h2 className="mt-3 text-3xl font-bold text-[#0E3A35] md:text-4xl">Visit us today</h2>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="rounded-xl border border-[#DCE4EC] bg-white p-6">
              <h3 className="text-lg font-semibold text-[#0E3A35]">Address</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5A6B7C]">{HOSPITAL.address}</p>
              <a href={HOSPITAL.mapsLink} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block text-sm font-semibold text-[#0F766E] hover:underline">
                Get Directions →
              </a>
            </div>

            <div className="rounded-xl border border-[#DCE4EC] bg-white p-6">
              <h3 className="text-lg font-semibold text-[#0E3A35]">Phone & WhatsApp</h3>
              <p className="mt-2 text-sm text-[#5A6B7C]">
                <a href={callLink()} className="font-semibold text-[#0E3A35] hover:underline">{HOSPITAL.phoneDisplay}</a>
                {"  ·  "}
                <a href={`tel:+${HOSPITAL.phone2}`} className="font-semibold text-[#0E3A35] hover:underline">{HOSPITAL.phone2Display}</a>
              </p>
              <p className="mt-2 text-sm text-[#5A6B7C]">{HOSPITAL.hours}</p>
              <p className="mt-2 text-sm font-semibold text-[#C0362C]">🚑 24×7 Emergency available</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={callLink()} className="rounded-lg bg-[#0E3A35] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0A2B27]">
                  Call Now
                </a>
                <a
                  href={waLink("Hello, I would like to book an appointment.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#1EBE5B]"
                >
                  <WhatsAppIcon className="h-4 w-4" /> WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-[#DCE4EC] shadow-lg">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(HOSPITAL.address)}&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "420px" }}
              loading="lazy"
              title="Aggarwal Multispeciality Hospital on Google Maps"
            />
          </div>
        </div>
      </div>
    </section>
  );
}