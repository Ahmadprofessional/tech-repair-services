"use client";

import { siteConfig } from "@/config/site";
import { Reveal } from "@/components/Reveal";
import { Marker } from "@/components/Marker";

export function ServiceArea() {
  return (
    <section className="section-paper py-20 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: text */}
          <div>
            <Reveal>
              <span className="font-mono-label text-muted block mb-4">
                SERVICE AREA
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-headline text-[clamp(1.75rem,4vw,3.5rem)] text-ink mb-6">
                Based in {siteConfig.area}.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-base text-muted leading-relaxed max-w-md">
                Our workshop is in {siteConfig.area}. We cover the whole MK area
                and regularly work in the surrounding towns. CCTV installations
                are available across {siteConfig.area} and a 20-mile radius.
              </p>
            </Reveal>
          </div>

          {/* Right: area list */}
          <div>
            <Reveal delay={0.15}>
              <Marker variant="brackets" dark className="p-6">
                <span className="font-mono-label text-muted block mb-4">
                  AREAS WE COVER
                </span>
                <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                  <span className="font-mono-label text-ink text-xs">
                    ● {siteConfig.area.toUpperCase()}
                  </span>
                  {siteConfig.nearbyAreas.map((area) => (
                    <span
                      key={area}
                      className="font-mono-label text-muted text-xs"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              </Marker>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
