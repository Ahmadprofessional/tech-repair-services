"use client";

import { usePathname } from "next/navigation";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { trackConversion } from "@/lib/tracking";
import { Marker } from "@/components/Marker";
import { Reveal } from "@/components/Reveal";

const PHONE_NUMBER = "+447777168239";
const PHONE_DISPLAY = "07777168239";

export function CctvFinalCta() {
  const pathname = usePathname() || "/services/cctv-installation";

  const handleCallClick = () => {
    trackConversion({
      event: "call_click",
      location: "final_cta",
      service: "cctv",
      page_path: pathname,
    });
  };

  return (
    <section className="my-20 lg:my-28">
      <Reveal>
        <Marker variant="brackets" dark className="p-8 md:p-14 bg-[#111111] text-[#F5F3EC]">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <span className="font-mono-label text-accent tracking-widest block">
              BOOK YOUR SURVEY TODAY
            </span>
            <h2 className="font-headline text-3xl md:text-5xl text-[#F5F3EC] leading-tight">
              Ready to secure your home or business?
            </h2>
            <p className="text-sm md:text-base text-[#D6D3C9] max-w-xl mx-auto leading-relaxed">
              Book your free site survey in Milton Keynes and a 20-mile radius. We supply, install, and configure your complete CCTV setup with tidy cabling and mobile phone viewing.
            </p>

            {/* 3 Action Buttons */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              {/* Call Now */}
              <a
                href={`tel:${PHONE_NUMBER}`}
                onClick={handleCallClick}
                aria-label={`Call ${PHONE_DISPLAY}`}
                className="inline-flex items-center gap-2 border border-[#F5F3EC] hover:border-accent hover:text-accent px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#F5F3EC] transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
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

              {/* WhatsApp */}
              <WhatsAppButton
                message="Hi, I'm interested in CCTV installation. Can you help? (via website)"
                location="final_cta"
                service="cctv"
                className="py-3.5 px-6 text-xs"
              >
                WhatsApp
              </WhatsAppButton>

              {/* Get a free quote */}
              <a
                href="#quote"
                className="inline-flex items-center gap-2 bg-[#222222] hover:bg-[#2A2A2A] border border-line-dark px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-[#F5F3EC] transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
              >
                Get a free quote
              </a>
            </div>

            {/* Underline note */}
            <p className="pt-2 text-xs font-mono text-[#BDBAB0]">
              Call or text 24/7 · {PHONE_DISPLAY}
            </p>
          </div>
        </Marker>
      </Reveal>
    </section>
  );
}

