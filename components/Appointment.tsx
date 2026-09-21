"use client";
import { useState } from "react";
import { DEPARTMENTS, DOCTORS, HOSPITAL, callLink } from "@/lib/hospital";
import WhatsAppIcon from "@/components/icons/WhatsAppIcon";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const TIME_SLOTS = ["09:00 – 11:00 AM", "11:00 – 01:00 PM", "05:00 – 07:00 PM", "07:00 – 09:00 PM"];

const inputCls =
  "w-full rounded-lg border border-[#DCE4EC] bg-white px-4 py-3 text-sm font-medium text-[#0E3A35] outline-none transition focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/15";

export default function Appointment() {
  const { ref, isVisible } = useScrollAnimation();
  const [form, setForm] = useState({
    name: "", phone: "", department: DEPARTMENTS[0].name, doctor: "No preference",
    date: "", time: TIME_SLOTS[0], note: "",
  });
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const set = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    if (form.name.trim().length < 2) return setError("Please enter the patient's full name.");
    if (!/^[6-9]\d{9}$/.test(form.phone)) return setError("Please enter a valid 10-digit mobile number.");
    if (!form.date) return setError("Please choose an appointment date.");
    setError("");
    setStatus("sending");

    const msg = [
      "🏥 *NEW APPOINTMENT REQUEST*",
      `👤 Patient: ${form.name}`,
      `📞 Phone: ${form.phone}`,
      `🩺 Department: ${form.department}`,
      `👨⚕️ Doctor: ${form.doctor}`,
      `📅 Date: ${form.date}`,
      `🕗 Time: ${form.time}`,
      form.note ? `📝 Note: ${form.note}` : "",
    ].filter(Boolean).join("\n");

    window.setTimeout(() => {
      window.open(`https://wa.me/${HOSPITAL.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank");
      setStatus("success");
    }, 400);
  };

  return (
    <section id="appointment" className="bg-[#0E3A35] bg-premium-dark fx-dark py-20 md:py-24">
      <div ref={ref} className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-[1fr_1.2fr]">
        <div className={isVisible ? "anim-fade" : "opacity-0"}>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#9FE8D9]">Appointments</p>
          <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">Ready to take the next step?</h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/75">
            Request an appointment with our medical team. Your request is sent directly to the
            hospital on WhatsApp — our team will contact you to confirm the slot.
          </p>
          <div className="mt-8 rounded-xl border border-white/15 bg-white/5 p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Prefer to talk?</p>
            <a href={callLink()} className="mt-2 block text-2xl font-bold text-white hover:underline">{HOSPITAL.phoneDisplay}</a>
            <p className="mt-1 text-sm text-white/60">{HOSPITAL.hours}</p>
          </div>
        </div>

        <form onSubmit={submit} className={`rounded-xl bg-white p-7 md:p-9 ${isVisible ? "anim-fade-up" : "opacity-0"}`}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="ap-name" className="mb-1.5 block text-sm font-semibold text-[#0E3A35]">Patient name *</label>
              <input id="ap-name" className={inputCls} placeholder="Full name" value={form.name} onChange={(e) => set("name", e.target.value)} />
            </div>
            <div>
              <label htmlFor="ap-phone" className="mb-1.5 block text-sm font-semibold text-[#0E3A35]">Mobile number *</label>
              <input id="ap-phone" className={inputCls} placeholder="10-digit number" inputMode="numeric" maxLength={10} value={form.phone} onChange={(e) => set("phone", e.target.value.replace(/\D/g, ""))} />
            </div>
            <div>
              <label htmlFor="ap-dept" className="mb-1.5 block text-sm font-semibold text-[#0E3A35]">Department</label>
              <select id="ap-dept" className={inputCls} value={form.department} onChange={(e) => set("department", e.target.value)}>
                {DEPARTMENTS.map((d) => <option key={d.name}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="ap-doc" className="mb-1.5 block text-sm font-semibold text-[#0E3A35]">Doctor</label>
              <select id="ap-doc" className={inputCls} value={form.doctor} onChange={(e) => set("doctor", e.target.value)}>
                <option>No preference</option>
                {DOCTORS.map((d) => <option key={d.name}>{d.name}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="ap-date" className="mb-1.5 block text-sm font-semibold text-[#0E3A35]">Preferred date *</label>
              <input id="ap-date" type="date" className={inputCls} min={new Date().toISOString().split("T")[0]} value={form.date} onChange={(e) => set("date", e.target.value)} />
            </div>
            <div>
              <label htmlFor="ap-time" className="mb-1.5 block text-sm font-semibold text-[#0E3A35]">Time slot</label>
              <select id="ap-time" className={inputCls} value={form.time} onChange={(e) => set("time", e.target.value)}>
                {TIME_SLOTS.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-5">
            <label htmlFor="ap-note" className="mb-1.5 block text-sm font-semibold text-[#0E3A35]">Message (optional)</label>
            <textarea id="ap-note" className={inputCls} rows={3} placeholder="Briefly describe your concern…" value={form.note} onChange={(e) => set("note", e.target.value)} />
          </div>

          {error && <p role="alert" className="mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-[#C0362C]">{error}</p>}

          {status === "success" && (
            <div className="mt-4 rounded-lg bg-[#0F766E]/10 px-4 py-3 text-sm font-semibold text-[#0F766E]" role="status">
              Appointment request received. WhatsApp has opened with your details — press send there,
              and the hospital team will contact you to confirm.
            </div>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-6 flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#0F766E] px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-[#0B5D57] disabled:opacity-60"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {status === "sending" ? "Opening WhatsApp…" : "Send Appointment Request"}
          </button>
          <p className="mt-3 text-center text-xs text-[#5A6B7C]">
            We only use these details to coordinate your appointment.
          </p>
        </form>
      </div>
    </section>
  );
}