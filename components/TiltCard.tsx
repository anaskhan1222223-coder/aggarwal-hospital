"use client";
import { useTilt } from "@/hooks/useTilt";

export default function TiltCard({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, onMove, onLeave } = useTilt(7);
  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`tilt-glare relative will-change-transform ${className}`}
      style={{ animationDelay: `${delay}s`, transition: "transform 0.25s ease" }}
    >
      {children}
    </div>
  );
}