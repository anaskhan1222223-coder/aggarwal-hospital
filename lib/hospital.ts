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
  {
    icon: "🩺",
    image: "/images/general-medicine.jpg",
    name: "General Medicine",
    hindi: "फिजिशियन",
    points: ["Physician consultations", "Chronic & seasonal illness care"],
  },
  {
    icon: "🩹",
    image: "/images/general-surgery.jpg",
    name: "General Surgery",
    hindi: "जनरल सर्जरी",
    points: ["Surgical procedures", "Pre & post-operative care"],
  },
  {
    icon: "🔬",
    image: "/images/laparoscopic-surgery.jpg",
    name: "Laparoscopic Surgery",
    hindi: "दूरबीन आपरेशन",
    points: ["Minimally invasive (keyhole) surgery", "Faster recovery"],
  },
  {
    icon: "🤰",
    image: "/images/gynaecology-obstetrics.jpg",
    name: "Gynaecology & Obstetrics",
    hindi: "स्त्री रोग",
    points: ["Women's health", "Pregnancy care"],
  },
  {
    icon: "🧒",
    image: "/images/pediatrics.jpg",
    name: "Paediatrics",
    hindi: "बाल रोग",
    points: ["Child health & growth", "Newborn care"],
  },
  {
    icon: "🦴",
    image: "/images/orthopaedics.jpg",
    name: "Orthopaedics",
    hindi: "हड्डी रोग",
    points: ["Bone & joint treatment", "Fracture care"],
  },
  {
    icon: "👂",
    image: "/images/ent.jpg",
    name: "ENT",
    hindi: "कान, नाक, गला",
    points: ["Ear, nose & throat care"],
  },
  {
    icon: "🦷",
    image: "/images/dentistry.jpg",
    name: "Dentistry",
    hindi: "दंत चिकित्सा",
    points: ["RCT & laser dentistry", "Dental procedures"],
  },
];
export const waLink = (msg: string) =>
  `https://wa.me/${HOSPITAL.whatsapp}?text=${encodeURIComponent(msg)}`;
export const callLink = () => `tel:+${HOSPITAL.phone}`;

// ── Hospital introduction film ──
// When the shoot video is ready:
//   Option A (recommended): upload to YouTube → paste the video ID below
//   Option B: put the file at public/video/hospital-tour.mp4 → set mp4 below
// Until then the section shows a clean "coming soon" poster card.
export const VIDEO = {
  src: "/video/hospital-tour.mp4",
  poster: "/images/hospital-front.jpg",
};
// ── Google reviews (public profile) ──
// 1) Google Maps → search "Aggarwal Multispeciality Hospital Shastri Nagar"
// 2) Copy the rating number + review count into rating / count
// 3) Maps → hospital → "Share" → copy link → paste into link (perfect deep link)
// 4) Copy 2–3 REAL reviews word-for-word into quotes (name, text, time label)
export const GOOGLE_REVIEWS = {
  rating: 4.0,
  count: 31,
  link: "https://www.google.com/maps/search/?api=1&query=Aggarwal+Multispeciality+Hospital,+1607-B+Shastri+Nagar,+New+Delhi+110052",
  quotes: [
    {
      name: "Himanshu Vohra",
      when: "5 years ago",
      stars: 5,
      text: "Great service and doctors have every niche knowledge of thier field. Also the staff is great especially i had a very good personal experience with one of their members. The lady with one hand, single handedly organized stuffs in a effective manner, great to see that. Kudos to her service and attitude towards her duty.",
    },
    {
      name: "Srd. Jagvinder Singh",
      when: "7 years ago",
      stars: 5,
      text: "Good nursing hospital of the area. Old and famous amongst nearby by residents.",
    },
    { name: "Vikram Parkash Kamal thakur", when: "Google review", stars: 5, text: " Modern, well-equipped, and clean facilities combined with respectful treatment contribute to smooth recoveries." },
    { name: "Khushi Rathi", when: "Google review", stars: 5, text: "Continuous emotional support and reassuring attitudes from obstetrics teams help alleviate anxiety during pregnancy." },
  ],
};