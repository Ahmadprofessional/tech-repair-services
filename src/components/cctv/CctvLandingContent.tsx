"use client";

import { usePathname } from "next/navigation";
import { type Service } from "@/types/service";
import { siteConfig } from "@/config/site";
import { Marker } from "@/components/Marker";
import { Reveal } from "@/components/Reveal";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { CctvSvg } from "@/components/svg/CctvSvg";
import { CctvWhyChooseUs } from "@/components/cctv/CctvWhyChooseUs";
import { CctvPriceAnchor } from "@/components/cctv/CctvPriceAnchor";
import { CctvCameraTypes } from "@/components/cctv/CctvCameraTypes";
import { CctvFaq } from "@/components/cctv/CctvFaq";
import { CctvFinalCta } from "@/components/cctv/CctvFinalCta";
import { ContactForm } from "@/components/ContactForm";
import { cctvServiceAreas } from "@/config/cctv";
import { trackConversion } from "@/lib/tracking";

const PHONE_NUMBER = "+447777168239";
const PHONE_DISPLAY = "07777168239";

interface CctvLandingContentProps {
  service: Service;
}

export function CctvLandingContent({ service }: CctvLandingContentProps) {
  const pathname = usePathname() || "/services/cctv-installation";

  const handleHeroCallClick = () => {
    trackConversion({
      event: "call_click",
      location: "hero",
      service: "cctv",
      page_path: pathname,
    });
  };

  return (
    <div className="section-paper min-h-screen pt-24 lg:pt-32 pb-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* ── 1. Hero ── */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div>
            {/* Free site survey badge */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="font-mono-label text-muted block">
                {service.label}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-accent text-ink px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider font-bold">
                <span className="h-1.5 w-1.5 rounded-full bg-ink animate-pulse" />
                Free site survey
              </span>
            </div>

            {/* H1 Headline */}
            <h1 className="font-headline text-[clamp(2.5rem,6vw,5rem)] text-ink mb-4 leading-[0.92]">
              {service.title}
            </h1>

            {/* Subline */}
            <p className="text-lg md:text-xl text-ink font-semibold mb-4 leading-snug">
              Homes and small businesses in Milton Keynes and a 20-mile radius
            </p>

            <p className="text-base text-muted leading-relaxed max-w-xl mb-8">
              {service.longDescription}
            </p>

            {/* Hero 3 Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 mb-3">
              {/* Call now button */}
              <a
                href={`tel:${PHONE_NUMBER}`}
                onClick={handleHeroCallClick}
                aria-label={`Call ${PHONE_DISPLAY}`}
                className="inline-flex items-center gap-2 border border-ink bg-ink text-[#F5F3EC] hover:bg-ink/90 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="text-accent shrink-0"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call now
              </a>

              {/* WhatsApp button */}
              <WhatsAppButton
                message={service.whatsappMessage}
                location="hero"
                service="cctv"
                className="py-3 px-5 text-xs"
              >
                WhatsApp
              </WhatsAppButton>

              {/* Get a free quote button */}
              <a
                href="#quote"
                className="inline-flex items-center gap-2 border border-line-light bg-paper hover:border-ink hover:text-ink px-5 py-3 text-xs font-bold uppercase tracking-wider text-ink transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                Get a free quote
              </a>
            </div>

            {/* One line under */}
            <p className="text-xs font-mono text-muted tracking-wide">
              Call or text 24/7
            </p>
          </div>

          {/* CCTV Hero Illustration */}
          <div className="flex items-center justify-center lg:justify-end">
            <CctvSvg className="w-full max-w-md text-ink opacity-90" />
          </div>
        </div>

        {/* ── 2. "Why choose us" strip ── */}
        <div className="mt-16">
          <CctvWhyChooseUs />
        </div>

        {/* ── 3. Price anchor block ── */}
        <CctvPriceAnchor />

        {/* ── 4. Camera types we install ── */}
        <CctvCameraTypes />

        {/* ── 5. Existing Content: Scope & Process ── */}
        <hr className="my-16 border-t border-line-light" />
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Scope ("What we do") */}
          <div>
            <Reveal>
              <h2 className="font-headline text-3xl text-ink mb-8">
                What we <span className="accent-highlight">do</span>
              </h2>
            </Reveal>
            <ul className="grid gap-4 sm:grid-cols-2">
              {service.scope.map((item, i) => (
                <Reveal key={i} delay={i * 0.05} direction="left">
                  <li className="flex items-start gap-3">
                    <Marker
                      variant="registration"
                      dark
                      className="mt-1 shrink-0 opacity-50"
                    />
                    <span className="text-sm text-ink">{item}</span>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          {/* Process ("How it works") */}
          <div>
            <Reveal>
              <h2 className="font-headline text-3xl text-ink mb-8">
                How it <span className="accent-highlight">works</span>
              </h2>
            </Reveal>
            <div className="space-y-6">
              {service.process.map((step, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <Marker variant="brackets" dark className="p-6 relative bg-paper">
                    <span className="font-mono-label text-line-dark absolute top-6 right-6">
                      0{i + 1}
                    </span>
                    <h3 className="font-headline text-xl text-ink mb-2 pr-8">
                      {step.step}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {step.detail}
                    </p>
                  </Marker>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        {/* ── 6. Quote Form Section (id="quote") ── */}
        <section id="quote" className="my-20 lg:my-28 scroll-mt-24">
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-8">
                <span className="font-mono-label text-muted block mb-2">
                  FREE SITE SURVEY
                </span>
                <h2 className="font-headline text-3xl md:text-4xl text-ink mb-3">
                  Get your free <span className="accent-highlight">CCTV quote</span>
                </h2>
                <p className="text-sm md:text-base text-muted max-w-lg mx-auto">
                  Tell us a bit about your property in Milton Keynes or surrounding areas. We will recommend the right setup and confirm your survey slot.
                </p>
              </div>

              <Marker variant="brackets" dark className="p-6 md:p-10 bg-white">
                <ContactForm
                  source="cctv-page"
                  defaultService="cctv-installation"
                  id="quote-form"
                />
              </Marker>
            </div>
          </Reveal>
        </section>

        {/* ── 7. FAQ Section ── */}
        <CctvFaq />

        {/* ── 8. Service Area Section ── */}
        <section className="my-20 lg:my-28 border-t border-line-light pt-16">
          <Reveal>
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
              <div>
                <span className="font-mono-label text-muted block mb-3">
                  COVERAGE RADIUS
                </span>
                <h2 className="font-headline text-3xl md:text-4xl text-ink mb-4">
                  Covering {siteConfig.area} &amp; 20-mile radius
                </h2>
                <p className="text-sm md:text-base text-muted leading-relaxed mb-6">
                  We supply and install domestic and commercial CCTV across Milton Keynes and all nearby towns. Free site surveys are available throughout our entire service territory.
                </p>
                <div className="flex items-center gap-3">
                  <a
                    href={`tel:${PHONE_NUMBER}`}
                    onClick={() =>
                      trackConversion({
                        event: "call_click",
                        location: "hero",
                        service: "cctv",
                        page_path: pathname,
                      })
                    }
                    className="font-mono text-xs font-bold text-ink hover:text-accent underline"
                  >
                    Call {PHONE_DISPLAY} to check your postcode
                  </a>
                </div>
              </div>

              <Marker variant="brackets" dark className="p-6 bg-paper">
                <span className="font-mono-label text-line-dark block mb-4">
                  AREAS COVERED
                </span>
                <div className="grid grid-cols-2 gap-x-6 gap-y-2.5">
                  <span className="font-mono-label text-ink text-xs font-bold">
                    ● MILTON KEYNES
                  </span>
                  {cctvServiceAreas
                    .filter((area) => area !== "Milton Keynes")
                    .map((area) => (
                      <span
                        key={area}
                        className="font-mono-label text-muted text-xs"
                      >
                        ● {area}
                      </span>
                    ))}
                </div>
              </Marker>
            </div>
          </Reveal>
        </section>

        {/* ── 9. Final CTA Block ── */}
        <CctvFinalCta />
      </div>
    </div>
  );
}

