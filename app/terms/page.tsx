import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Use | Aggarwal Multispeciality Hospital" };
export default function Terms() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 md:pb-28">
      <h1 className="text-3xl font-bold text-[#0E3A35]">Terms of Use</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#5A6B7C]">
        <p>This website is provided by Aggarwal Multispeciality Hospital to help patients find information about departments, doctors and appointments.</p>
        <p>Appointment requests submitted online are not confirmed until the hospital team contacts you. In an emergency, always call the hospital directly.</p>
        <p>Content on this website is for general information and does not replace professional medical advice, diagnosis or treatment.</p>
      </div>
    </main>
  );
}