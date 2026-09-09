import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://aggarwal-hospital-peach.vercel.app"),
  title: "Aggarwal Multispeciality Hospital | Hospital in Shastri Nagar, Delhi",
  description:
    "Trusted multispeciality hospital in Shastri Nagar for 24 years — dentistry, surgery, gynaecology, orthopaedics, physiotherapy & diagnostics. Book on WhatsApp or call.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}