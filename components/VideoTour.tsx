"use client";
import { useRef, useState } from "react";
import { VIDEO } from "@/lib/hospital";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function VideoTour() {
  const { ref, isVisible } = useScrollAnimation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    setPlaying(true);
    v.play().catch(() => setPlaying(false));
  };

  return (
    <section id="video" className="bg-[#0E3A35] bg-premium-dark fx-dark py-20 md:py-24">
      <div ref={ref} className="mx-auto max-w-5xl px-4 text-center">
        <p className={`text-xs font-semibold uppercase tracking-[0.25em] text-[#9FE8D9] ${isVisible ? "anim-fade" : "opacity-0"}`}>Video tour</p>
        <h2 className={`mt-3 text-3xl font-bold text-white md:text-4xl ${isVisible ? "anim-fade-up" : "opacity-0"}`}>
          Walk through our hospital
        </h2>
        <p className={`mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/70 md:text-base ${isVisible ? "anim-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.08s" }}>
          Ninety seconds inside Aggarwal Multispeciality Hospital — real rooms, real people, real care.
        </p>

        <div className={`group relative mt-10 overflow-hidden rounded-xl border border-white/10 shadow-2xl ${isVisible ? "anim-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.15s" }}>
          <video
            ref={videoRef}
            src={VIDEO.src}
            poster={VIDEO.poster}
            preload="none"
            controls={playing}
            playsInline
            onEnded={() => setPlaying(false)}
            className="aspect-video w-full bg-black object-cover"
          >
            Your browser does not support embedded video.
          </video>

          {!playing && (
            <button
              onClick={play}
              aria-label="Play hospital tour video"
              className="absolute inset-0 flex items-center justify-center bg-[#06231F]/30 transition-colors hover:bg-[#06231F]/10"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0F766E] text-white shadow-xl transition-transform duration-300 group-hover:scale-110 md:h-24 md:w-24">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
            </button>
          )}
        </div>

        <p className="mt-4 text-xs font-medium text-white/50">Tap to play · no autoplay · your data stays yours</p>
      </div>
    </section>
  );
}