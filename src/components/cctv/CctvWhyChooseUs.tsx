import { Reveal } from "@/components/Reveal";
import { Marker } from "@/components/Marker";

const items = [
  {
    title: "Free site survey",
    description:
      "We visit your property, inspect angles, and recommend camera positions with zero obligation.",
  },
  {
    title: "Supply and install",
    description:
      "Full end-to-end service: we provide reliable hardware, mounting, cabling, and recording setup.",
  },
  {
    title: "Remote viewing set up on your phone",
    description:
      "Live streams and motion alerts configured on iOS and Android before we leave your site.",
  },
  {
    title: "Neat cable routing",
    description:
      "Cables clipped cleanly and discreetly routed along walls and soffits for a tidy installation.",
  },
];

export function CctvWhyChooseUs() {
  return (
    <section className="border-y border-line-light py-12 lg:py-16 bg-paper">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <Reveal>
          <div className="flex items-center gap-2 mb-8">
            <span className="h-2 w-2 bg-accent inline-block" />
            <span className="font-mono-label text-muted">WHY CHOOSE US</span>
          </div>
        </Reveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <Marker variant="brackets" dark className="p-6 h-full bg-paper">
                <span className="font-mono-label text-line-dark block mb-3 text-xs">
                  0{i + 1}
                </span>
                <h3 className="font-headline text-lg text-ink mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </Marker>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

