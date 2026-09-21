import { HOSPITAL, DOCTOR, DEPARTMENTS } from "@/lib/hospital";

export const FACTS = `HOSPITAL: ${HOSPITAL.name}, ${HOSPITAL.address}. Since ${HOSPITAL.since}. Phones: ${HOSPITAL.phoneDisplay}, ${HOSPITAL.phone2Display}. Emergency: 24x7. OPD timings: confirm on call.
DOCTOR: ${DOCTOR.name}, ${DOCTOR.qualifications}, ${DOCTOR.role}.
DEPARTMENTS: ${DEPARTMENTS.map((d) => d.name).join(", ")}.
BOOKING: Use the Book Appointment form on the website or WhatsApp; the team confirms the slot.`;

export const SYSTEM = `You are "Aggarwal Care Assistant", official virtual assistant of ${HOSPITAL.name}, Shastri Nagar, New Delhi.
RULES:
1. Answer ONLY from these verified facts: ${FACTS}
2. NEVER give medical advice, diagnosis, medicine names or doses. If asked, say please consult our doctors and offer to book an appointment.
3. For fees, insurance/TPA or anything not in the facts: say "For exact details please call ${HOSPITAL.phoneDisplay} — our team will confirm."
4. Emergencies: tell them to call ${HOSPITAL.phoneDisplay} immediately, or 112.
5. Reply in the SAME language the patient writes (Hindi or English). Under 80 words, warm and simple.
6. For bookings: guide to the Book Appointment button or WhatsApp; ask name, department, preferred date.`;

const isHindi = (s: string) =>
  /[\u0900-\u097F]/.test(s) ||
  /\b(kaha|kab|kaise|kitna|samay|timing|booking|book karna|appointment lena|ilaj|dawa|milenge)\b/i.test(s);

export function localAnswer(raw: string): string {
  const m = raw.toLowerCase();
  const H = isHindi(raw);
  if (/(hello|hi\b|namaste|hey)/.test(m)) return H ? "Namaste! 🙏 Main Aggarwal Hospital ka assistant hoon. Boliye, main kya madad karoon?" : "Hello! 🙏 I'm the Aggarwal Hospital assistant. How can I help you today?";
  if (/(emergency|112|urgent)/.test(m)) return H ? `Emergency mein turant call karein: ${HOSPITAL.phoneDisplay} ya 112. Hamari emergency seva 24×7 khuli hai.` : `In an emergency call ${HOSPITAL.phoneDisplay} or 112 immediately. Our emergency services are open 24×7.`;
  if (/(time|timing|samay|kab|open|hours|opd)/.test(m)) return H ? `OPD timing department ke anusaar hoti hai — please call karein ${HOSPITAL.phoneDisplay}. Emergency 24×7 available hai.` : `OPD timings vary by department — please call ${HOSPITAL.phoneDisplay} to confirm. Emergency care is available 24×7.`;
  if (/(address|kahan|where|location|direction|map)/.test(m)) return H ? `Hamara pata: ${HOSPITAL.address}. Contact section mein "Get Directions" dabaiye.` : `We are at ${HOSPITAL.address}. Use the "Get Directions" button in the Contact section.`;
  if (/(book|appointment|slot|buki)/.test(m)) return H ? "Appointment ke liye 'Book Appointment' button dabaiye ya WhatsApp karein. Naam, department aur date bataiye — team confirm karegi." : "Tap 'Book Appointment' on the website or message us on WhatsApp. Share your name, department and preferred date — our team will confirm.";
  if (/(department|speciality|vibhag|seva)/.test(m)) return H ? `Hamare 8 departments: ${DEPARTMENTS.map((d) => d.hindi).join(", ")}.` : `Our 8 departments: ${DEPARTMENTS.map((d) => d.name).join(", ")}.`;
  if (/(doctor|gupta)/.test(m)) return H ? `${DOCTOR.name} (${DOCTOR.qualifications}) hamare Director aur Head Doctor hain.` : `${DOCTOR.name} (${DOCTOR.qualifications}) is our Director & Head Doctor.`;
  if (/(phone|call|number|contact|whatsapp)/.test(m)) return H ? `Call karein: ${HOSPITAL.phoneDisplay} ya ${HOSPITAL.phone2Display}. WhatsApp button bhi available hai.` : `Call us: ${HOSPITAL.phoneDisplay} or ${HOSPITAL.phone2Display}. You can also use the WhatsApp button.`;
  if (/(fee|charge|price|paisa|insurance|tpa)/.test(m)) return H ? `Fees aur insurance ki sahi jaankari ke liye call karein ${HOSPITAL.phoneDisplay} — team turant batayegi.` : `For exact fees or insurance/TPA details please call ${HOSPITAL.phoneDisplay} — our team will confirm instantly.`;
  return H ? "Main aapki madad ke liye yahan hoon — appointment, timing, location ya departments poochhiye. Ya WhatsApp par baat karein." : "I'm here to help — ask me about appointments, timings, location or departments. Or continue on WhatsApp anytime.";
}