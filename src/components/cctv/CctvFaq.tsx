"use client";

import { useState } from "react";
import { cctvFaqs } from "@/config/cctv";
import { Reveal } from "@/components/Reveal";
import { Marker } from "@/components/Marker";

export function CctvFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cctvFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section className="my-20 lg:my-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Heading */}
          <div className="lg:col-span-4">
            <Reveal>
              <span className="font-mono-label text-muted block mb-3">
                COMMON QUESTIONS
              </span>
              <h2 className="font-headline text-3xl md:text-4xl text-ink mb-6">
                Frequently Asked <span className="accent-highlight">Questions</span>
              </h2>
              <p className="text-sm text-muted leading-relaxed mb-6">
                Have questions about our CCTV installations or survey process? Here are factual answers based on our service capabilities.
              </p>
              <div className="p-4 bg-paper border border-line-light space-y-2">
                <p className="text-xs font-mono uppercase tracking-wider text-ink font-bold">
                  Need a custom quote?
                </p>
                <p className="text-xs text-muted">
                  Call us 24/7 on{" "}
                  <a
                    href="tel:+447777168239"
                    className="text-ink font-bold hover:text-accent underline"
                  >
                    07777168239
                  </a>{" "}
                  or send a message on WhatsApp.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Accordion */}
          <div className="lg:col-span-8 space-y-4">
            {cctvFaqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <Reveal key={faq.question} delay={i * 0.05}>
                  <Marker variant="brackets" dark className="bg-paper border border-line-light">
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${i}`}
                      className="w-full p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus-visible:outline-2 focus-visible:outline-accent"
                    >
                      <span className="font-headline text-lg md:text-xl text-ink pr-2">
                        {faq.question}
                      </span>
                      <span
                        className={`h-6 w-6 shrink-0 flex items-center justify-center border border-line-dark font-mono text-xs transition-transform duration-200 ${
                          isOpen ? "rotate-45 bg-accent text-ink" : "bg-paper text-ink"
                        }`}
                        aria-hidden="true"
                      >
                        +
                      </span>
                    </button>
                    {isOpen && (
                      <div
                        id={`faq-answer-${i}`}
                        className="px-6 pb-6 pt-0 text-sm text-muted leading-relaxed border-t border-line-light/50 mt-2"
                      >
                        <p className="pt-3">{faq.answer}</p>
                      </div>
                    )}
                  </Marker>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

