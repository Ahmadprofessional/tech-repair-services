import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { ContactForm } from "@/components/ContactForm";
import { Marker } from "@/components/Marker";

export const metadata: Metadata = {
  title: "Get in Touch",
  description: `Contact ${siteConfig.name} for laptop repair, phone repair, and CCTV installation in ${siteConfig.area}.`,
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="section-paper min-h-screen pt-24 lg:pt-32 pb-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Left: Info */}
          <div>
            <span className="font-mono-label text-muted block mb-4">CONTACT</span>
            <h1 className="font-headline text-[clamp(2.5rem,6vw,4.5rem)] text-ink mb-6">
              Let&apos;s get it sorted.
            </h1>
            <p className="text-lg text-muted mb-12 max-w-md">
              Drop us a message below, or contact us directly. We aim to reply to all enquiries within a few hours.
            </p>

            <div className="space-y-8">
              <Marker variant="brackets" dark className="p-6">
                <span className="font-mono-label text-line-dark block mb-2">ADDRESS</span>
                <p className="text-ink">
                  {siteConfig.address.street}
                  <br />
                  {siteConfig.address.locality}
                  <br />
                  {siteConfig.address.postalCode}
                </p>
                <p className="text-sm text-muted mt-2">
                  Please call ahead to arrange a visit.
                </p>
              </Marker>
              
              <div className="grid gap-4 sm:grid-cols-2">
                <Marker variant="brackets" dark className="p-6">
                  <span className="font-mono-label text-line-dark block mb-2">PHONE</span>
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                    className="text-ink text-lg transition-colors hover:text-accent"
                  >
                    {siteConfig.phone}
                  </a>
                </Marker>
                
                <Marker variant="brackets" dark className="p-6">
                  <span className="font-mono-label text-line-dark block mb-2">EMAIL</span>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-ink text-lg transition-colors hover:text-accent"
                  >
                    {siteConfig.email}
                  </a>
                </Marker>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:pt-16">
            <Marker variant="brackets" dark className="p-6 md:p-10 bg-white">
              <ContactForm />
            </Marker>
          </div>
        </div>
      </div>
    </div>
  );
}
