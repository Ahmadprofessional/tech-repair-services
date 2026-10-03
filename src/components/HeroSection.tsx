"use client";

import { useEffect, useRef } from "react";
import { RecDot } from "@/components/RecDot";
import { Marker } from "@/components/Marker";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const headline = headlineRef.current;
    const scanLine = scanLineRef.current;
    if (!headline || !scanLine) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      headline.style.opacity = "1";
      headline.style.clipPath = "none";
      scanLine.style.display = "none";
      return;
    }

    headline.style.opacity = "0";

    let cancelled = false;

    const animate = async () => {
      const { gsap } = await import("gsap");

      if (cancelled) return;

      const tl = gsap.timeline({ delay: 0.3 });

      // Scan line sweep
      tl.fromTo(
        scanLine,
        { y: "-100%", opacity: 1 },
        { y: "100%", opacity: 0.6, duration: 1.2, ease: "power2.inOut" }
      );

      // Headline reveal with clip-path
      tl.fromTo(
        headline,
        {
          opacity: 0,
          clipPath: "inset(0 100% 0 0)",
        },
        {
          opacity: 1,
          clipPath: "inset(0 0% 0 0)",
          duration: 1,
          ease: "power3.out",
        },
        "-=0.8"
      );
    };

    animate();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="section-ink relative min-h-screen overflow-hidden pt-[72px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-ink/55 z-10 mix-blend-multiply" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop" 
          alt="Circuit board background" 
          className="w-full h-full object-cover grayscale opacity-40 mix-blend-luminosity" 
        />
      </div>

      {/* Scan line */}
      <div
        ref={scanLineRef}
        className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px bg-accent opacity-0"
        aria-hidden="true"
      />

      <div className="relative z-20 mx-auto flex min-h-[calc(100svh-72px)] max-w-[1440px] flex-col justify-center px-5 py-16 md:px-10 lg:px-16">
        {/* Row 1: Top bar */}
        <div className="flex items-center justify-between mb-12 w-full">
          <span className="font-mono-label text-[#BDBAB0]">
            {siteConfig.area.toUpperCase()}, UK
          </span>
          <RecDot />
        </div>

        {/* Row 2: Main grid 7/5 */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left: 7 cols */}
          <div ref={headlineRef} className="col-span-1 lg:col-span-7 flex flex-col">
            <h1 className="font-headline-condensed text-[#F5F3EC] text-[clamp(3rem,7vw,7.5rem)] leading-[0.95]">
              <span className="block">We fix</span>
              <span className="block">
                your <span className="inline-block bg-accent text-ink px-[0.18em] py-[0.08em] whitespace-nowrap">tech</span>.
              </span>
              <span className="mt-2 block text-[clamp(1.5rem,4vw,3.5rem)] font-headline leading-[1]">
                We watch your property.
              </span>
            </h1>

            <p className="mt-6 max-w-[520px] text-base text-[#D6D3C9] leading-relaxed lg:text-lg">
              Laptop repair, phone repair, and CCTV installation
              across {siteConfig.area} and surrounding areas.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4 relative">
              {/* Corner brackets attached strictly to CTA focus area */}
              <div className="absolute -left-3 -top-3 w-2 h-2 border-t border-l border-accent opacity-50" />
              <div className="absolute -right-3 -bottom-3 w-2 h-2 border-b border-r border-accent opacity-50" />
              <WhatsAppButton />
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="font-mono-label text-[#F5F3EC] transition-colors hover:text-accent"
              >
                or call {siteConfig.phone}
              </a>
            </div>
          </div>

          {/* Right: 5 cols (Service Index) */}
          <div className="col-span-1 lg:col-span-5">
            <div className="relative w-full">
              {/* Attached Accent brackets */}
              <div className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-accent" />
              <div className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-accent" />
              
              <div className="flex flex-col border-t border-line-dark">
                {[
                  { id: "01", name: "LAPTOP REPAIR", slug: "laptop-repair" },
                  { id: "02", name: "MOBILE PHONE REPAIR", slug: "mobile-repair" },
                  { id: "03", name: "CCTV INSTALLATION", slug: "cctv-installation" }
                ].map((s) => (
                  <a 
                    key={s.id}
                    href={`/services/${s.slug}`}
                    className="group flex items-center justify-between border-b border-line-dark py-[20px] font-mono-label text-lg text-[#F5F3EC] transition-colors hover:text-accent"
                  >
                    <span>{s.id} / {s.name}</span>
                    <span className="transition-transform duration-300 group-hover:translate-x-[8px]">→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
