"use client";

import { Reveal } from "@/components/Reveal";
import { Marker } from "@/components/Marker";

const steps = [
  {
    number: "01",
    title: "Drop off",
    detail:
      "Message us on WhatsApp or call us to arrange a repair.",
  },
  {
    number: "02",
    title: "Diagnose",
    detail:
      "We inspect the device, identify the fault, and quote a fixed price.",
  },
  {
    number: "03",
    title: "Fix",
    detail:
      "We repair it, test it, and let you know when it's ready. Most jobs done same day or next day.",
  },
];

export function HowItWorks() {
  return (
    <section className="section-ink py-20 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16">
        <Reveal>
          <span className="font-mono-label text-muted block mb-4">
            HOW IT WORKS
          </span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-headline text-[clamp(1.75rem,4vw,3.5rem)] text-paper mb-16">
            Three steps. No surprises.
          </h2>
        </Reveal>

        <div className="grid gap-12 md:grid-cols-3 md:gap-8">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.15}>
              <div className="relative">
                {/* Step number */}
                <span className="font-mono-label text-line-dark text-xs block mb-3">
                  STEP {step.number}
                </span>
                {/* Technical line connector */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-px bg-line-dark" aria-hidden="true" />
                )}
                <Marker variant="brackets" className="p-4 border-line-dark">
                  <h3 className="font-headline text-2xl text-paper mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {step.detail}
                  </p>
                </Marker>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
