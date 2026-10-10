"use client";

import { siteConfig } from "@/config/site";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Reveal } from "@/components/Reveal";
import { Marker } from "@/components/Marker";
import Link from "next/link";
import { TrackingLink } from "@/components/TrackingLink";

export function ContactSection() {
  return (
    <section className="section-ink py-20 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <div>
            <Reveal>
              <span className="font-mono-label text-muted block mb-4">
                GET IN TOUCH
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-headline text-[clamp(1.75rem,4vw,3.5rem)] text-paper mb-6">
                Need a repair?{" "}
                <span className="accent-highlight">Message us.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-base text-muted leading-relaxed max-w-md mb-8">
                WhatsApp is the fastest way to reach us. Send a photo of the problem. We will reply with a fixed quote within the hour.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mb-8 flex items-center gap-3 bg-paper/5 w-fit px-4 py-2 border border-line-dark">
                <div className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent"></span>
                </div>
                <span className="font-mono-label text-paper text-xs tracking-widest">
                  AVAILABLE 24/7 FOR CALLS & TEXTS
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.4}>
              <div className="flex flex-wrap items-center gap-4">
                <WhatsAppButton />
                <Link
                  href="/contact"
                  className="font-mono-label text-muted underline underline-offset-4 decoration-line-dark transition-colors hover:text-paper hover:decoration-accent"
                >
                  Or use the contact form →
                </Link>
              </div>
            </Reveal>
          </div>

          {/* Right: contact details */}
          <div className="flex items-end">
            <Reveal delay={0.2}>
              <Marker variant="brackets" className="p-6">
                <div className="space-y-4">
                  <div>
                    <span className="font-mono-label text-line-dark block mb-1">
                      PHONE
                    </span>
                    <TrackingLink
                      eventType="phone_click"
                      href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                      className="text-paper text-lg transition-colors hover:text-accent"
                    >
                      {siteConfig.phone}
                    </TrackingLink>
                  </div>
                  <div>
                    <span className="font-mono-label text-line-dark block mb-1">
                      EMAIL
                    </span>
                    <TrackingLink
                      eventType="email_click"
                      href={`mailto:${siteConfig.email}`}
                      className="text-paper text-lg transition-colors hover:text-accent"
                    >
                      {siteConfig.email}
                    </TrackingLink>
                  </div>
                  <div>
                    <span className="font-mono-label text-line-dark block mb-1">
                      LOCATION
                    </span>
                    <p className="text-paper">
                      {siteConfig.address.street}
                      <br />
                      {siteConfig.address.locality},{" "}
                      {siteConfig.address.postalCode}
                    </p>
                  </div>
                </div>
              </Marker>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
