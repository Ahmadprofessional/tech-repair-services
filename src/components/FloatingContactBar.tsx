"use client";

import { usePathname } from "next/navigation";
import { getWhatsAppUrl } from "@/lib/utils";
import {
  trackConversion,
  getServiceFromPath,
} from "@/lib/tracking";

const PHONE_NUMBER = "+447777168239";
const PHONE_DISPLAY = "07777168239";

export function FloatingContactBar() {
  const pathname = usePathname() || "";
  const isCctv = pathname.includes("cctv-installation");

  const whatsappMessage = isCctv
    ? "Hi, I'm interested in CCTV installation. Can you help? (via website)"
    : "Hi, I'd like to enquire about your services. (via website)";

  const whatsappUrl = getWhatsAppUrl(whatsappMessage);
  const service = getServiceFromPath(pathname);

  const handleCallClick = () => {
    trackConversion({
      event: "call_click",
      location: "floating",
      service,
      page_path: pathname,
    });
  };

  const handleWhatsAppClick = () => {
    trackConversion({
      event: "whatsapp_click",
      location: "floating",
      service,
      page_path: pathname,
    });
  };

  return (
    <>
      {/* ── Mobile: Fixed bottom bar (respecting safe-area) ── */}
      <nav
        aria-label="Quick contact bar"
        className="fixed bottom-0 left-0 right-0 z-40 bg-[#111111]/95 backdrop-blur-md border-t border-line-dark px-3 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom,0px))] md:hidden shadow-2xl"
      >
        <div className="mx-auto max-w-md grid grid-cols-2 gap-2.5">
          {/* Call button */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            onClick={handleCallClick}
            aria-label={`Call ${PHONE_DISPLAY} (Available 24/7)`}
            className="flex items-center justify-center gap-2 min-h-[48px] px-3 py-2 bg-[#1A1A1A] hover:bg-[#222222] text-[#F5F3EC] border border-line-dark rounded-none transition-colors focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent shrink-0"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <div className="flex flex-col items-start leading-tight">
              <span className="text-[10px] text-accent font-mono uppercase tracking-wider font-semibold">
                Call 24/7
              </span>
              <span className="text-xs font-bold uppercase tracking-wider">
                Call now
              </span>
            </div>
          </a>

          {/* WhatsApp button */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            aria-label="Chat with us on WhatsApp"
            className="flex items-center justify-center gap-2 min-h-[48px] px-3 py-2 bg-accent hover:bg-accent/90 text-ink rounded-none transition-colors focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="shrink-0"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-wider">
              WhatsApp
            </span>
          </a>
        </div>
      </nav>

      {/* ── Desktop: Floating stacked buttons bottom-right ── */}
      <aside
        aria-label="Persistent contact shortcuts"
        className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col items-end gap-3 pointer-events-none"
      >
        {/* Call button */}
        <div className="flex items-center gap-2 pointer-events-auto group">
          <span className="bg-[#111111]/90 backdrop-blur-sm border border-line-dark text-paper text-xs font-mono px-3 py-1.5 shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
            Call 24/7 · {PHONE_DISPLAY}
          </span>
          <a
            href={`tel:${PHONE_NUMBER}`}
            onClick={handleCallClick}
            aria-label={`Call 24/7 on ${PHONE_DISPLAY}`}
            className="flex items-center justify-center h-12 min-w-12 px-4 bg-[#111111] hover:bg-[#1A1A1A] text-paper border border-line-dark hover:border-accent shadow-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent shrink-0 mr-2"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="font-mono-label text-xs tracking-wider">
              Call 24/7
            </span>
          </a>
        </div>

        {/* WhatsApp button */}
        <div className="flex items-center gap-2 pointer-events-auto group">
          <span className="bg-[#111111]/90 backdrop-blur-sm border border-line-dark text-paper text-xs font-mono px-3 py-1.5 shadow-lg opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
            Chat on WhatsApp
          </span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            aria-label="Chat on WhatsApp"
            className="flex items-center justify-center h-12 min-w-12 px-4 bg-accent hover:bg-accent/90 text-ink font-bold shadow-xl transition-all duration-200 focus-visible:outline-2 focus-visible:outline-ink focus-visible:outline-offset-2"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
              className="shrink-0 mr-2"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            <span className="font-mono-label text-xs tracking-wider">
              WhatsApp
            </span>
          </a>
        </div>
      </aside>
    </>
  );
}

