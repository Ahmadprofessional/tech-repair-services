"use client";

import Link from "next/link";
import { siteConfig } from "@/config/site";
import { services } from "@/data/services";
import { Marker } from "@/components/Marker";

export function Footer() {
  return (
    <footer className="section-ink border-t border-line-dark">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10 lg:px-16 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href="/" className="font-headline text-xl text-paper">
              {siteConfig.name}
            </Link>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              {siteConfig.description}
            </p>
            <p className="mt-4 font-mono-label text-muted">
              {siteConfig.area}, UK
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-mono-label text-line-light mb-4">Services</h3>
            <ul className="flex flex-col gap-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-muted transition-colors hover:text-paper"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-mono-label text-line-light mb-4">Contact</h3>
            <ul className="flex flex-col gap-2 text-sm text-muted">
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-paper"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="transition-colors hover:text-paper"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="transition-colors hover:text-paper"
                >
                  Contact form
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-line-dark pt-6 md:flex-row md:items-center text-xs">
          <p className="font-mono-label text-muted">
            &copy; {new Date().getFullYear()} {siteConfig.name}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-muted">
            <Link href="/privacy" className="hover:text-paper transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-paper transition-colors">Terms of Service</Link>
            <button 
              onClick={() => {
                localStorage.removeItem("cookie-consent");
                window.location.reload();
              }}
              className="hover:text-paper transition-colors cursor-pointer text-left"
            >
              Cookie Settings
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
