"use client";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const TESTIMONIALS = [
  { name: "Rajesh Kumar", text: "Excellent care and very professional staff. Dr. Gupta is very experienced.", rating: 5 },
  { name: "Priya Sharma", text: "Got my dental treatment done here. Very clean and hygienic. Highly recommend.", rating: 5 },
  { name: "Amit Verma", text: "Good hospital with all facilities. Doctors are supportive and caring.", rating: 4 },
];

export default function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="reviews" className="bg-white py-20">
      <div ref={ref} className="mx-auto max-w-7xl px-4">
        <div className={`text-center ${isVisible ? "animate-fade-in" : "opacity-0"}`}>
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#0F766E]">Patient Reviews</p>
          <h2 className="mt-3 text-3xl font-extrabold text-[#134E4A] md:text-5xl">
            What Our Patients Say
          </h2>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className={`card-hover rounded-2xl border border-[#D7E7E2] bg-gradient-to-b from-[#F0FDFA] to-white p-6 shadow-md ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              <div className="flex gap-1 text-[#F59E0B]">
                {"★".repeat(t.rating)}
                {"☆".repeat(5 - t.rating)}
              </div>
              <p className="mt-4 text-[#33554F]">&ldquo;{t.text}&rdquo;</p>
              <p className="mt-4 text-sm font-bold text-[#134E4A]">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}