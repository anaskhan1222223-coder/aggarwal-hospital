"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { VIDEO } from "@/lib/hospital";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function VideoTour() {
  const { ref, isVisible } = useScrollAnimation();
  const [open, setOpen] = useState(false);
  const hasVideo = Boolean(VIDEO.youtubeId || VIDEO.mp4);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <section id="video" className="bg-[#0E3A35] bg-premium-dark fx-dark py-20 md:py-24">
      <div ref={ref} className="mx-auto max-w-5xl px-4 text-center">
        <p className={`text-xs font-semibold uppercase tracking-[0.25em] text-[#9FE8D9] ${isVisible ? "anim-fade" : "opacity-0"}`}>Hospital film</p>
        <h2 className={`mt-3 text-3xl font-bold text-white md:text-4xl ${isVisible ? "anim-fade" : "opacity-0"}`}>{VIDEO.title}</h2>
        <p className={`mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/70 ${isVisible ? "anim-fade" : "opacity-0"}`}>
          Take a quick look inside our hospital — from the reception and waiting areas to consultation
          rooms, facilities and the team that cares for you.
        </p>

        <div className={`relative mt-10 overflow-hidden rounded-xl border border-white/10 shadow-2xl ${isVisible ? "anim-fade-up" : "opacity-0"}`}>
          <div className="relative aspect-video w-full">
            <Image src={VIDEO.poster} alt="Inside Aggarwal Multispeciality Hospital" fill sizes="(max-width: 1024px) 92vw, 960px" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06231F]/80 via-[#06231F]/20 to-transparent" />

            {hasVideo ? (
              <button onClick={() => setOpen(true)} aria-label="Play hospital introduction video" className="group absolute inset-0 flex items-center justify-center">
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/95 shadow-xl transition-transform duration-300 group-hover:scale-110">
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="#0E3A35"><path d="M8 5v14l11-7z" /></svg>
                </span>
              </button>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="rounded-full bg-white/15 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur">
                  🎬 Hospital film — coming soon
                </span>
              </div>
            )}

            <p className="absolute bottom-4 left-5 right-5 text-left text-sm font-semibold text-white/85">
              Exterior · Reception · Departments · Facilities · Our team
            </p>
          </div>
        </div>
      </div>

      {open && hasVideo && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <button className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-white hover:bg-white/25" aria-label="Close video">✕</button>
          <div className="w-full max-w-4xl overflow-hidden rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative aspect-video w-full bg-black">
              {VIDEO.youtubeId ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${VIDEO.youtubeId}?autoplay=1&rel=0`}
                  title="Aggarwal Multispeciality Hospital introduction video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <video src={VIDEO.mp4} controls autoPlay playsInline poster={VIDEO.poster} className="absolute inset-0 h-full w-full" />
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}