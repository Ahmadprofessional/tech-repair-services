"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Disable on touch devices
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isTouch || prefersReduced) return;

    document.documentElement.classList.add("cursor-viewfinder");

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    
    if (!cursor || !dot) return;

    // Use GSAP quickTo for highly performant tracking
    const xMoveCursor = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3" });
    const yMoveCursor = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3" });
    const xMoveDot = gsap.quickTo(dot, "x", { duration: 0.05, ease: "power3" });
    const yMoveDot = gsap.quickTo(dot, "y", { duration: 0.05, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      if (cursor.classList.contains("opacity-0")) {
        // Instant set on first move to prevent flying in from 0,0
        gsap.set([cursor, dot], { x: e.clientX, y: e.clientY });
        cursor.classList.remove("opacity-0");
        dot.classList.remove("opacity-0");
      }
      xMoveCursor(e.clientX);
      yMoveCursor(e.clientY);
      xMoveDot(e.clientX);
      yMoveDot(e.clientY);
    };

    const onMouseEnterInteractive = () => {
      cursor.classList.add("cursor-locked");
    };
    const onMouseLeaveInteractive = () => {
      cursor.classList.remove("cursor-locked");
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Attach hover effects to interactive elements
    const interactives = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, [data-cursor-lock]"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    return () => {
      document.documentElement.classList.remove("cursor-viewfinder");
      window.removeEventListener("mousemove", onMouseMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      {/* Crosshair ring */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden lg:block mix-blend-difference transition-opacity duration-300 opacity-0"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          className="-translate-x-1/2 -translate-y-1/2 transition-[width,height] duration-200"
          style={{ width: "40px", height: "40px" }}
        >
          {/* Corner brackets */}
          <path d="M0 8V0H8" stroke="white" strokeWidth="1" />
          <path d="M32 0H40V8" stroke="white" strokeWidth="1" />
          <path d="M40 32V40H32" stroke="white" strokeWidth="1" />
          <path d="M8 40H0V32" stroke="white" strokeWidth="1" />
          {/* Center crosshair */}
          <line x1="20" y1="14" x2="20" y2="18" stroke="white" strokeWidth="0.5" />
          <line x1="20" y1="22" x2="20" y2="26" stroke="white" strokeWidth="0.5" />
          <line x1="14" y1="20" x2="18" y2="20" stroke="white" strokeWidth="0.5" />
          <line x1="22" y1="20" x2="26" y2="20" stroke="white" strokeWidth="0.5" />
        </svg>
      </div>
      {/* Center dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] hidden lg:block mix-blend-difference transition-opacity duration-300 opacity-0"
        style={{ willChange: "transform" }}
        aria-hidden="true"
      >
        <span className="-translate-x-1/2 -translate-y-1/2 block h-1 w-1 rounded-full bg-white" />
      </div>
    </>
  );
}
