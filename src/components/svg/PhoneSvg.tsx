"use client";

import { useEffect, useRef } from "react";

export function PhoneSvg({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const paths = svg.querySelectorAll<SVGElement>("path, rect, line, circle, polyline");

    if (prefersReduced) {
      paths.forEach((p) => {
        p.style.opacity = "1";
        if (p instanceof SVGGeometryElement) p.style.strokeDasharray = "none";
      });
      return;
    }

    paths.forEach((p) => {
      if (p instanceof SVGGeometryElement) {
        const length = p.getTotalLength();
        p.style.strokeDasharray = `${length}`;
        p.style.strokeDashoffset = `${length}`;
      }
      p.style.opacity = "1";
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          paths.forEach((p, i) => {
            if (p instanceof SVGGeometryElement) {
              // Trigger reflow to ensure transition works
              p.getBoundingClientRect();
              p.style.transition = `stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.04}s`;
              p.style.strokeDashoffset = "0";
            }
          });
          observer.unobserve(svg);
        }
      },
      { rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(svg);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 300 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Exploded view of a mobile phone"
      role="img"
    >
      {/* Phone body */}
      <rect x="80" y="20" width="140" height="280" rx="16" stroke="currentColor" strokeWidth="1" />
      {/* Screen */}
      <rect x="88" y="36" width="124" height="248" rx="8" stroke="currentColor" strokeWidth="0.5" />
      {/* Notch / camera cutout */}
      <circle cx="150" cy="48" r="4" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="165" cy="48" r="2" stroke="currentColor" strokeWidth="0.3" />
      {/* Screen content lines */}
      <line x1="100" y1="80" x2="180" y2="80" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
      <line x1="100" y1="95" x2="200" y2="95" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
      <line x1="100" y1="110" x2="160" y2="110" stroke="currentColor" strokeWidth="0.4" opacity="0.4" />
      {/* Volume buttons */}
      <line x1="76" y1="100" x2="76" y2="130" stroke="currentColor" strokeWidth="1" />
      <line x1="76" y1="140" x2="76" y2="170" stroke="currentColor" strokeWidth="1" />
      {/* Power button */}
      <line x1="224" y1="120" x2="224" y2="160" stroke="currentColor" strokeWidth="1" />
      {/* Charging port — exploded below */}
      <rect x="137" y="320" width="26" height="8" rx="2" stroke="currentColor" strokeWidth="0.5" />
      <line x1="150" y1="300" x2="150" y2="320" stroke="currentColor" strokeWidth="0.3" strokeDasharray="3 3" />
      {/* Battery — exploded further */}
      <rect x="95" y="345" width="110" height="40" rx="4" stroke="currentColor" strokeWidth="0.5" />
      <line x1="150" y1="328" x2="150" y2="345" stroke="currentColor" strokeWidth="0.3" strokeDasharray="3 3" />
      {/* Battery label */}
      <line x1="105" y1="360" x2="130" y2="360" stroke="currentColor" strokeWidth="0.3" />
      <line x1="105" y1="370" x2="195" y2="370" stroke="currentColor" strokeWidth="0.3" />
      {/* Rear camera module — exploded to the side */}
      <rect x="240" y="40" width="40" height="50" rx="6" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="252" cy="55" r="6" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="268" cy="55" r="6" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="260" cy="75" r="4" stroke="currentColor" strokeWidth="0.5" />
      {/* Exploded guide line to camera */}
      <line x1="220" y1="65" x2="240" y2="65" stroke="currentColor" strokeWidth="0.3" strokeDasharray="3 3" />
      {/* Dimension line */}
      <line x1="60" y1="20" x2="60" y2="300" stroke="currentColor" strokeWidth="0.3" />
      <line x1="55" y1="20" x2="65" y2="20" stroke="currentColor" strokeWidth="0.3" />
      <line x1="55" y1="300" x2="65" y2="300" stroke="currentColor" strokeWidth="0.3" />
    </svg>
  );
}
