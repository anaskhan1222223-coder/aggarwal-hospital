import type { Metadata } from "next";
export const metadata: Metadata = { title: "Medical Disclaimer | Aggarwal Multispeciality Hospital" };
export default function Disclaimer() {
  return (
    <main className="mx-auto max-w-3xl px-4 pb-24 pt-32 md:pb-28">
      <h1 className="text-3xl font-bold text-[#0E3A35]">Medical Disclaimer</h1>
      <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#5A6B7C]">
        <p>Information on this website is educational and informational only. It is not medical advice and should not be used for self-diagnosis or self-treatment.</p>
        <p>Always consult a qualified doctor for personal medical concerns. In an emergency, call the hospital immediately or visit the nearest emergency facility.</p>
      </div>
    </main>
  );
}