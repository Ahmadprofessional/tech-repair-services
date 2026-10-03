"use client";

import { useEffect, useRef } from "react";

export function CctvSvg({ className = "" }: { className?: string }) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const paths = svg.querySelectorAll<SVGElement>("path, rect, line, circle, polyline, ellipse");

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
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="CCTV camera installation diagram"
      role="img"
    >
      {/* Camera body — bullet style */}
      <rect x="120" y="80" width="160" height="80" rx="8" stroke="currentColor" strokeWidth="1" />
      {/* Lens barrel */}
      <circle cx="120" cy="120" r="30" stroke="currentColor" strokeWidth="1" />
      <circle cx="120" cy="120" r="20" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="120" cy="120" r="10" stroke="currentColor" strokeWidth="0.5" />
      <circle cx="120" cy="120" r="4" stroke="currentColor" strokeWidth="0.3" />
      {/* IR LEDs ring */}
      <circle cx="100" cy="108" r="2" stroke="currentColor" strokeWidth="0.3" />
      <circle cx="100" cy="132" r="2" stroke="currentColor" strokeWidth="0.3" />
      <circle cx="140" cy="108" r="2" stroke="currentColor" strokeWidth="0.3" />
      <circle cx="140" cy="132" r="2" stroke="currentColor" strokeWidth="0.3" />
      {/* Status LED */}
      <circle cx="270" cy="92" r="2" stroke="currentColor" strokeWidth="0.3" />
      {/* Cable exit */}
      <line x1="280" y1="120" x2="320" y2="120" stroke="currentColor" strokeWidth="0.5" />
      {/* Mounting bracket — exploded above */}
      <rect x="180" y="30" width="40" height="20" rx="2" stroke="currentColor" strokeWidth="0.5" />
      <line x1="200" y1="50" x2="200" y2="80" stroke="currentColor" strokeWidth="0.3" strokeDasharray="3 3" />
      {/* Mounting screws */}
      <circle cx="188" cy="40" r="2" stroke="currentColor" strokeWidth="0.3" />
      <circle cx="212" cy="40" r="2" stroke="currentColor" strokeWidth="0.3" />
      {/* Wall surface line */}
      <line x1="160" y1="18" x2="240" y2="18" stroke="currentColor" strokeWidth="0.3" />
      {/* Cable route — exploded to the right */}
      <polyline
        points="320,120 340,120 340,200 300,200"
        stroke="currentColor"
        strokeWidth="0.5"
        fill="none"
      />
      {/* DVR / NVR box — exploded below */}
      <rect x="200" y="210" width="100" height="60" rx="4" stroke="currentColor" strokeWidth="1" />
      {/* DVR detail lines */}
      <line x1="210" y1="225" x2="240" y2="225" stroke="currentColor" strokeWidth="0.3" />
      <line x1="210" y1="235" x2="290" y2="235" stroke="currentColor" strokeWidth="0.3" />
      <line x1="210" y1="245" x2="260" y2="245" stroke="currentColor" strokeWidth="0.3" />
      {/* HDD inside DVR — small rect */}
      <rect x="260" y="250" width="30" height="12" rx="1" stroke="currentColor" strokeWidth="0.3" />
      {/* Connection line from cable to DVR */}
      <line x1="300" y1="200" x2="300" y2="210" stroke="currentColor" strokeWidth="0.3" strokeDasharray="3 3" />
      {/* Field of view cone */}
      <path
        d="M90 120 L20 70 L20 170 Z"
        stroke="currentColor"
        strokeWidth="0.3"
        strokeDasharray="4 4"
        fill="none"
      />
      {/* Dimension annotation */}
      <line x1="370" y1="80" x2="370" y2="160" stroke="currentColor" strokeWidth="0.3" />
      <line x1="365" y1="80" x2="375" y2="80" stroke="currentColor" strokeWidth="0.3" />
      <line x1="365" y1="160" x2="375" y2="160" stroke="currentColor" strokeWidth="0.3" />
    </svg>
  );
}
