// ════════════════════════════════════════════════════════
// AGGARWAL MULTISPECIALITY HOSPITAL — MASTER CONFIG
// Every fact verified from the hospital's own sign board,
// visiting card and public JustDial listing.
// ════════════════════════════════════════════════════════

export const HOSPITAL = {
  name: "Aggarwal Multispeciality Hospital",
  since: 2002,
  address: "1607-B, Shastri Nagar, Near Shastri Butt, Delhi-110052",
  landmark: "Near Shastri Butt",
  phoneDisplay: "+91 98117 28813",
  phone: "919811728813",
  phone2Display: "+91 85959 98343",
  phone2: "918595998343",
  whatsapp: "919811728813", // test this; if WhatsApp lives on the other number, swap to phone2
  emergency24x7: true, // verified on visiting card & sign board
  hours: "OPD timings on call · Emergency: 24×7",
  mapsLink:
    "https://www.google.com/maps/search/?api=1&query=Aggarwal+Multispeciality+Hospital+Shastri+Nagar+Delhi",
  about:
    "Aggarwal Multispeciality Hospital has served Shastri Nagar since 2002 from 1607-B, near Shastri Butt. Led by Dr. S.C Gupta — MBBS (MAMC), FCGP (Gold Medalist) — the hospital brings eight specialities under one roof, including general medicine, general surgery, laparoscopic (keyhole) surgery, gynaecology, paediatrics, orthopaedics, ENT and dentistry, supported by an in-house pharmacy and 24×7 emergency care. For over two decades, families across North Delhi have trusted us for one simple reason: we treat every patient like our own.",
};

export const DOCTOR = {
  name: "Dr. S.C Gupta",
  role: "Director & Head Doctor",
  qualifications: "MBBS (MAMC), FCGP (Gold Medalist)",
  photo: "/images/doctor-gupta.jpg",
  photo2: "/images/doctor-gupta-clinic.jpg",
  // ⚠️ DRAFT — send to Doctor Sahab on WhatsApp for approval/edits before going live:
  message:
    "For more than twenty years, this hospital has belonged to the families of Shastri Nagar. Our promise is simple — honest advice, careful treatment, and care that treats every patient like family. From a fever at midnight to a planned surgery, our doors and our phones are open for you, twenty-four hours a day.",
};
export const DOCTORS = [DOCTOR];
export const DEPARTMENTS = [
  { icon: "🩺", name: "General Medicine", hindi: "फिजिशियन", points: ["Physician consultations", "Chronic & seasonal illness care"] },
  { icon: "🩹", name: "General Surgery", hindi: "जनरल सर्जरी", points: ["Surgical procedures", "Pre & post-operative care"] },
  { icon: "🔬", name: "Laparoscopic Surgery", hindi: "दूरबीन आपरेशन", points: ["Minimally invasive (keyhole) surgery", "Faster recovery"] },
  { icon: "🤰", name: "Gynaecology & Obstetrics", hindi: "स्त्री रोग", points: ["Women's health", "Pregnancy care"] },
  { icon: "🧒", name: "Paediatrics", hindi: "बाल रोग", points: ["Child health & growth", "Newborn care"] },
  { icon: "🦴", name: "Orthopaedics", hindi: "हड्डी रोग", points: ["Bone & joint treatment", "Fracture care"] },
  { icon: "👂", name: "ENT", hindi: "कान, नाक, गला", points: ["Ear, nose & throat care"] },
  { icon: "🦷", name: "Dentistry", hindi: "दंत चिकित्सा", points: ["RCT & laser dentistry", "Dental procedures"] },
];

export const waLink = (msg: string) =>
  `https://wa.me/${HOSPITAL.whatsapp}?text=${encodeURIComponent(msg)}`;
export const callLink = () => `tel:+${HOSPITAL.phone}`;