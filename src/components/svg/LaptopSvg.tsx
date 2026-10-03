"use client";

import { useEffect, useRef } from "react";

export function LaptopSvg({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paths = svg.querySelectorAll<SVGPathElement | SVGRectElement | SVGLineElement>(
      "path, rect, line, circle, polyline"
    );

    if (prefersReduced) {
      paths.forEach((p) => {
        p.style.opacity = "1";
        if (p instanceof SVGGeometryElement) {
          p.style.strokeDasharray = "none";
        }
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
              p.style.transition = `stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.05}s`;
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
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Exploded view of a laptop"
      role="img"
    >
      {/* Screen / lid */}
      <rect x="80" y="20" width="240" height="150" rx="4" stroke="currentColor" strokeWidth="1" />
      <rect x="95" y="32" width="210" height="126" stroke="currentColor" strokeWidth="0.5" />
      {/* Screen content lines */}
      <line x1="110" y1="60" x2="220" y2="60" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="110" y1="75" x2="260" y2="75" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      <line x1="110" y1="90" x2="180" y2="90" stroke="currentColor" strokeWidth="0.5" opacity="0.4" />
      {/* Webcam */}
      <circle cx="200" cy="26" r="2" stroke="currentColor" strokeWidth="0.5" />
      {/* Hinge area */}
      <line x1="80" y1="170" x2="320" y2="170" stroke="currentColor" strokeWidth="0.5" />
      {/* Keyboard base — exploded offset */}
      <rect x="70" y="190" width="260" height="20" rx="2" stroke="currentColor" strokeWidth="1" />
      {/* Keyboard keys grid */}
      <line x1="90" y1="195" x2="90" y2="205" stroke="currentColor" strokeWidth="0.3" />
      <line x1="110" y1="195" x2="110" y2="205" stroke="currentColor" strokeWidth="0.3" />
      <line x1="130" y1="195" x2="130" y2="205" stroke="currentColor" strokeWidth="0.3" />
      <line x1="150" y1="195" x2="150" y2="205" stroke="currentColor" strokeWidth="0.3" />
      <line x1="170" y1="195" x2="170" y2="205" stroke="currentColor" strokeWidth="0.3" />
      <line x1="190" y1="195" x2="190" y2="205" stroke="currentColor" strokeWidth="0.3" />
      <line x1="210" y1="195" x2="210" y2="205" stroke="currentColor" strokeWidth="0.3" />
      <line x1="230" y1="195" x2="230" y2="205" stroke="currentColor" strokeWidth="0.3" />
      <line x1="250" y1="195" x2="250" y2="205" stroke="currentColor" strokeWidth="0.3" />
      <line x1="270" y1="195" x2="270" y2="205" stroke="currentColor" strokeWidth="0.3" />
      <line x1="290" y1="195" x2="290" y2="205" stroke="currentColor" strokeWidth="0.3" />
      {/* Trackpad — exploded offset */}
      <rect x="155" y="225" width="90" height="50" rx="3" stroke="currentColor" strokeWidth="1" />
      {/* Exploded guide lines */}
      <line x1="200" y1="170" x2="200" y2="190" stroke="currentColor" strokeWidth="0.3" strokeDasharray="3 3" />
      <line x1="200" y1="210" x2="200" y2="225" stroke="currentColor" strokeWidth="0.3" strokeDasharray="3 3" />
      {/* Dimension annotations */}
      <line x1="340" y1="20" x2="340" y2="170" stroke="currentColor" strokeWidth="0.3" />
      <line x1="335" y1="20" x2="345" y2="20" stroke="currentColor" strokeWidth="0.3" />
      <line x1="335" y1="170" x2="345" y2="170" stroke="currentColor" strokeWidth="0.3" />
      {/* Battery — exploded further */}
      <rect x="115" y="285" width="170" height="12" rx="2" stroke="currentColor" strokeWidth="0.5" />
      <line x1="200" y1="275" x2="200" y2="285" stroke="currentColor" strokeWidth="0.3" strokeDasharray="3 3" />
    </svg>
  );
}
