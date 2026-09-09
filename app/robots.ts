import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://aggarwal-hospital-peach.vercel.app/sitemap.xml",
  };
}