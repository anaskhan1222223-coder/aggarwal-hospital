import type { Metadata } from "next";
import { Manrope, Inter } from "next/font/google";
import "./globals.css";
import "./background.css";
import { HOSPITAL, DEPARTMENTS } from "@/lib/hospital";
import IntroOverlay from "@/components/IntroOverlay";


const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://aggarwal-hospital-peach.vercel.app"),
  title: "Aggarwal Multispeciality Hospital | Multispeciality Hospital in Shastri Nagar, Delhi",
  description:
    "Aggarwal Multispeciality Hospital in Shastri Nagar, Delhi. 24x7 Emergency & trusted care since 2002.",
  openGraph: {
    title: "Aggarwal Multispeciality Hospital — Shastri Nagar, Delhi",
    description:
      "Aggarwal Multispeciality Hospital in Shastri Nagar, Delhi. 24x7 Emergency & trusted care since 2002.",
    type: "website",
    locale: "en_IN",
    images: [
      {
        url: "/images/hospital-signboard.jpg",
        width: 1200,
        height: 630,
        alt: "Aggarwal Multispeciality Hospital, Shastri Nagar, Delhi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Aggarwal Multispeciality Hospital — Shastri Nagar, Delhi",
    description:
      "Aggarwal Multispeciality Hospital in Shastri Nagar, Delhi. 24x7 Emergency & trusted care since 2002.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const phoneReady = /^\d{12}$/.test(HOSPITAL.phone);
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Hospital",
    name: HOSPITAL.name,
    foundingDate: String(HOSPITAL.since),
    address: {
      "@type": "PostalAddress",
      streetAddress: "1607-B, Shastri Nagar, Near Shastri Butt",
      addressLocality: "New Delhi",
      postalCode: "110052",
      addressCountry: "IN",
    },
    medicalSpecialty: DEPARTMENTS.map((d) => d.name),
    ...(phoneReady ? { telephone: `+${HOSPITAL.phone}` } : {}),
  };

  return (
    <html lang="en">
      <body className={`${manrope.variable} ${inter.variable}`}>
        <IntroOverlay />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}