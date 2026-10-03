"use client";

import { useEffect, useRef, useState } from "react";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Delay in seconds */
  delay?: number;
  /** Direction for the slide */
  direction?: "up" | "left" | "right" | "none";
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -5% 0px", // Trigger slightly before it comes fully into view
        threshold: 0,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const getTransform = () => {
    if (isVisible || direction === "none") return "translate3d(0,0,0)";
    switch (direction) {
      case "up":
        return "translate3d(0, 40px, 0)";
      case "left":
        return "translate3d(-40px, 0, 0)";
      case "right":
        return "translate3d(40px, 0, 0)";
      default:
        return "translate3d(0,0,0)";
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s, transform 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
