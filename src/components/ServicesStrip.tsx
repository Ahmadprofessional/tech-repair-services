"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { services } from "@/data/services";
import { Marker } from "@/components/Marker";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { LaptopSvg } from "@/components/svg/LaptopSvg";
import { PhoneSvg } from "@/components/svg/PhoneSvg";
import { CctvSvg } from "@/components/svg/CctvSvg";

const svgComponents = [LaptopSvg, PhoneSvg, CctvSvg];

export function ServicesStrip() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const cards = container.querySelectorAll<HTMLElement>(".service-card");
    
    // Set initial state
    cards.forEach((card) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(50px)";
      card.style.transition = "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            el.style.opacity = "1";
            el.style.transform = "translateY(0)";
            observer.unobserve(el);
          }
        });
      },
      {
        root: null,
        rootMargin: "0px 0px -10% 0px",
        threshold: 0,
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={containerRef} className="section-paper relative overflow-hidden py-20 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        {/* Section label */}
        <div className="mb-4">
          <span className="font-mono-label text-muted">WHAT WE DO</span>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-3 lg:gap-12">
          {services.map((service, i) => {
          const SvgComponent = svgComponents[i];
          return (
            <div
              key={service.slug}
              className="service-card flex flex-col justify-between"
            >
              {/* Top: info */}
              <div className="mb-12">
                <span className="font-mono-label text-muted block mb-4">
                  {service.label}
                </span>
                <Marker variant="brackets" dark className="inline-block p-2 mb-4">
                  <h2 className="font-headline text-4xl text-ink leading-[1] lg:text-5xl">
                    {service.title}
                  </h2>
                </Marker>
                <p className="mt-4 text-base text-muted leading-relaxed">
                  {service.description}
                </p>
                <div className="mt-8 flex flex-col items-start gap-4 xl:flex-row xl:items-center">
                  <WhatsAppButton
                    message={service.whatsappMessage}
                    className="text-xs"
                  />
                  <Link
                    href={`/services/${service.slug}`}
                    className="font-mono-label text-ink underline underline-offset-4 decoration-line-light transition-colors hover:decoration-accent"
                  >
                    Full details →
                  </Link>
                </div>
              </div>

              {/* Bottom: SVG */}
              <div className="mt-auto flex items-center justify-center p-4">
                <SvgComponent className="w-full max-w-[280px] text-ink lg:max-w-[320px]" />
              </div>
            </div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
