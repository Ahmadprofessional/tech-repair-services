"use client";

import { useEffect, useRef } from "react";

interface SplitTextProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function SplitText({
  children,
  className = "",
  as: Tag = "p",
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      el.style.opacity = "1";
      return;
    }

    el.style.opacity = "0";

    let cancelled = false;

    const run = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (cancelled || !el) return;

      // Split text into lines using a temporary wrapper
      const text = el.textContent || "";
      const words = text.split(" ");

      // Create word spans
      el.innerHTML = "";
      const wordSpans: HTMLSpanElement[] = [];
      words.forEach((word, i) => {
        const span = document.createElement("span");
        span.style.display = "inline-block";
        span.style.overflow = "hidden";
        const inner = document.createElement("span");
        inner.style.display = "inline-block";
        inner.textContent = word;
        span.appendChild(inner);
        el.appendChild(span);
        wordSpans.push(inner);
        if (i < words.length - 1) {
          el.appendChild(document.createTextNode(" "));
        }
      });

      el.style.opacity = "1";

      gsap.fromTo(
        wordSpans,
        { y: "110%" },
        {
          y: "0%",
          duration: 0.7,
          stagger: 0.03,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            once: true,
          },
        }
      );
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [children]);

  return (
    // @ts-expect-error dynamic tag type
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
