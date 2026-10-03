"use client";

import { useEffect, useRef } from "react";

interface PinnedSectionProps {
  children: React.ReactNode;
  className?: string;
  /** Scroll distance as viewport heights (e.g. 2 = 200vh) */
  scrollDistance?: number;
}

export function PinnedSection({
  children,
  className = "",
  scrollDistance = 3,
}: PinnedSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const pin = pinRef.current;
    if (!container || !pin) return;

    // Only pin on desktop
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!isDesktop || prefersReduced) return;

    let ctx: { revert: () => void } | undefined;

    const setup = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: container,
          start: "top top",
          end: `+=${window.innerHeight * scrollDistance}`,
          pin: pin,
          pinSpacing: true,
        });
      }, container);
    };

    setup();

    return () => {
      ctx?.revert();
    };
  }, [scrollDistance]);

  return (
    <div ref={containerRef} className={className}>
      <div ref={pinRef}>{children}</div>
    </div>
  );
}
