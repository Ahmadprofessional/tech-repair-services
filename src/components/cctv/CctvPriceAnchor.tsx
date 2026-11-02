import { TYPICAL_2_CAM_HOME_FROM } from "@/config/cctv";
import { Reveal } from "@/components/Reveal";
import { Marker } from "@/components/Marker";

export function CctvPriceAnchor() {
  const price = TYPICAL_2_CAM_HOME_FROM.trim();
  if (!price) {
    return null;
  }

  return (
    <section className="my-12 lg:my-16">
      <Reveal>
        <Marker variant="brackets" dark className="p-6 md:p-8 bg-[#111111] text-[#F5F3EC]">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="font-mono-label text-accent block">
                PRICE ESTIMATE
              </span>
              <p className="font-headline text-xl md:text-2xl text-[#F5F3EC]">
                Typical 2-camera home systems from approx. £
                <span className="text-accent underline underline-offset-4 decoration-accent">
                  {TYPICAL_2_CAM_HOME_FROM}
                </span>
                . Exact price confirmed after your free survey.
              </p>
              <p className="text-xs text-[#BDBAB0]">
                Includes equipment supply, cabling, mounting, DVR/NVR configuration, and mobile remote viewing setup.
              </p>
            </div>
            <a
              href="#quote"
              className="shrink-0 inline-flex items-center gap-2 bg-accent px-5 py-3 text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-accent/90 focus-visible:outline-2 focus-visible:outline-paper focus-visible:outline-offset-2"
            >
              Book Free Survey
            </a>
          </div>
        </Marker>
      </Reveal>
    </section>
  );
}

