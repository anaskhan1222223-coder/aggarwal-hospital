import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy | Aggarwal Multispeciality Hospital" };
export default function Privacy() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 md:pb-28">
      <h1 className="text-3xl font-bold text-[#0E3A35]">Privacy Policy</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#5A6B7C]">
        <p>We collect only the information you provide in the appointment form — your name, phone number, department, preferred date and any message you choose to share — solely to coordinate your appointment.</p>
        <p>Appointment requests are sent directly to the hospital via WhatsApp. We do not sell or share your information with third parties for marketing.</p>
        <p>This website does not store sensitive medical records. Please do not include detailed medical history in form messages.</p>
        <p>For any privacy question, call the hospital at the number listed in the contact section.</p>
      </div>
    </main>
  );
}