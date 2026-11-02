"use client";

import { useState } from "react";
import Image from "next/image";
import { cameraTypes, type CameraTypeItem } from "@/config/cctv";
import { Reveal } from "@/components/Reveal";
import { Marker } from "@/components/Marker";

function CameraCard({ item, index }: { item: CameraTypeItem; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="flex flex-col h-full bg-paper border border-line-light">
      {/* Illustrative Image container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#111111] border-b border-line-light flex items-center justify-center">
        {!imgError ? (
          <Image
            src={item.image.src}
            alt={item.image.alt}
            width={600}
            height={400}
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : (
          /* Graceful fallback if image is missing */
          <div className="flex flex-col items-center justify-center p-6 text-center text-[#F5F3EC]">
            <svg
              width="36"
              height="36"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-accent mb-2"
              aria-hidden="true"
            >
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
              <circle cx="12" cy="13" r="4" />
            </svg>
            <span className="font-mono text-xs uppercase tracking-wider text-[#BDBAB0]">
              {item.title}
            </span>
          </div>
        )}
        <span className="absolute top-3 left-3 bg-[#111111]/85 border border-line-dark px-2 py-0.5 font-mono text-[10px] text-accent uppercase tracking-wider">
          0{index + 1}
        </span>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1 justify-between">
        <div>
          <h3 className="font-headline text-xl text-ink mb-2">
            {item.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed">
            {item.description}
          </p>
        </div>
        <div className="mt-4 pt-4 border-t border-line-light/60 flex items-center justify-between">
          <span className="font-mono-label text-[10px] text-muted">
            GENERIC SPECIFICATION
          </span>
          <span className="text-accent text-xs">●</span>
        </div>
      </div>
    </div>
  );
}

export function CctvCameraTypes() {
  return (
    <section className="my-20 lg:my-28">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <span className="font-mono-label text-muted block mb-3">
              EQUIPMENT OPTIONS
            </span>
            <h2 className="font-headline text-3xl md:text-4xl text-ink">
              Camera types we <span className="accent-highlight">install</span>
            </h2>
          </div>
          <p className="text-sm text-muted max-w-md">
            We supply high-grade 4K and 2K cameras and mobile viewing setups suited to your layout.
          </p>
        </div>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cameraTypes.map((item, i) => (
          <Reveal key={item.id} delay={i * 0.08} className="h-full">
            <Marker variant="brackets" dark className="h-full">
              <CameraCard item={item} index={i} />
            </Marker>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

