import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllServiceSlugs, getServiceBySlug } from "@/data/services";
import { Marker } from "@/components/Marker";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { JsonLd } from "@/components/JsonLd";
import { LaptopSvg } from "@/components/svg/LaptopSvg";
import { PhoneSvg } from "@/components/svg/PhoneSvg";
import { Reveal } from "@/components/Reveal";
import { CctvLandingContent } from "@/components/cctv/CctvLandingContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  if (resolvedParams.slug === "cctv-installation") {
    const title = "CCTV Installation Milton Keynes | Free Site Survey | Gadget Repair";
    const description =
      "Professional CCTV installation for homes and businesses in Milton Keynes & 20-mile radius. 4K/2K cameras, phone viewing & free site survey. Call 24/7.";
    const url = "https://gadgetrepair.uk/services/cctv-installation";

    return {
      title: {
        absolute: title,
      },
      description,
      alternates: {
        canonical: url,
      },
      openGraph: {
        title,
        description,
        url,
        type: "website",
        images: [
          {
            url: "/icon-512.png",
            width: 512,
            height: 512,
            alt: "Gadget Repair CCTV Installation Milton Keynes",
          },
        ],
      },
    };
  }

  return {
    title: service.metaTitle,
    description: service.description,
    alternates: {
      canonical: `/services/${resolvedParams.slug}`,
    },
    openGraph: {
      title: `${service.metaTitle} · Gadget Repair`,
      description: service.description,
      url: `https://gadgetrepair.uk/services/${resolvedParams.slug}`,
      type: "website",
    },
  };
}

export default async function ServicePage({ params }: Props) {
  const resolvedParams = await params;
  const service = getServiceBySlug(resolvedParams.slug);

  if (!service) {
    notFound();
  }

  // Specialized landing page for CCTV Installation
  if (service.slug === "cctv-installation") {
    return (
      <>
        <JsonLd
          type="Service"
          serviceName="CCTV Installation"
          serviceDescription="Professional CCTV camera setup for homes and small businesses across Milton Keynes and a 20-mile radius. Free site survey, 4K/2K cameras, local and cloud recording, and remote phone viewing."
        />
        <CctvLandingContent service={service} />
      </>
    );
  }

  // Generic service page for laptop and mobile phone repair
  let SvgComponent = LaptopSvg;
  if (service.slug === "mobile-repair") SvgComponent = PhoneSvg;

  return (
    <>
      <JsonLd
        type="Service"
        serviceName={service.title}
        serviceDescription={service.description}
      />
      <div className="section-paper min-h-screen pt-24 lg:pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          {/* Header */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <span className="font-mono-label text-muted block mb-4">
                {service.label}
              </span>
              <h1 className="font-headline text-[clamp(2.5rem,6vw,5rem)] text-ink mb-8 leading-[0.92]">
                {service.title}
              </h1>
              <p className="text-lg text-ink font-medium mb-6">
                {service.description}
              </p>
              <p className="text-base text-muted leading-relaxed max-w-xl">
                {service.longDescription}
              </p>

              <div className="mt-10">
                <WhatsAppButton
                  message={service.whatsappMessage}
                  location="hero"
                  service={service.slug === "laptop-repair" ? "laptop" : "mobile"}
                />
              </div>
            </div>

            {/* SVG Illustration */}
            <div className="flex items-center justify-center lg:justify-end">
              <SvgComponent className="w-full max-w-md text-ink opacity-90" />
            </div>
          </div>

          <hr className="my-20 border-t border-line-light" />

          {/* Details */}
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
            {/* Scope */}
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

            {/* Process */}
            <div>
              <Reveal>
                <h2 className="font-headline text-3xl text-ink mb-8">
                  How it <span className="accent-highlight">works</span>
                </h2>
              </Reveal>
              <div className="space-y-8">
                {service.process.map((step, i) => (
                  <Reveal key={i} delay={i * 0.1}>
                    <Marker variant="brackets" dark className="p-6 relative">
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
        </div>
      </div>
    </>
  );
}
