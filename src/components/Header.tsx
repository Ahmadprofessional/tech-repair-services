"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { services } from "@/data/services";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  const isHomePage = pathname === "/";
  const isDarkHeader = isScrolled || menuOpen;
  const textColor = isDarkHeader || isHomePage ? "text-[#F5F3EC]" : "text-[#111111]";
  const hamburgerColor = isDarkHeader || isHomePage ? "bg-[#F5F3EC]" : "bg-[#111111]";

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
    <header 
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
        isHidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
      } ${
        isScrolled || menuOpen 
          ? "bg-[#111111] border-b border-line-dark" 
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-16">
        {/* Wordmark */}
        <Link
          href="/"
          className={`font-headline text-lg tracking-tight ${textColor} z-50 relative transition-colors duration-300`}
          aria-label={`${siteConfig.name} home`}
          onClick={() => setMenuOpen(false)}
        >
          {siteConfig.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
          {/* Services Dropdown */}
          <div className="relative group py-4">
            <button className={`font-mono-label ${textColor} transition-colors hover:text-accent flex items-center gap-1`}>
              Services
              <svg width="10" height="10" viewBox="0 0 10 10" className="opacity-50 transition-transform group-hover:rotate-180">
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" fill="none" strokeWidth="1.5" />
              </svg>
            </button>
            <div className="absolute top-full left-0 hidden group-hover:block pt-4">
              <div className="bg-[#111111] border border-line-dark p-6 flex flex-col gap-4 shadow-xl min-w-[240px]">
                {services.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    className="font-mono-label text-[#F5F3EC] transition-colors hover:text-accent block"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/contact"
            className={`font-mono-label ${textColor} transition-colors hover:text-accent`}
          >
            Contact
          </Link>
          <WhatsAppButton className="ml-2 py-2 px-4 text-xs" />
        </nav>

        {/* Mobile: Hamburger only (WhatsApp moved to menu) */}
        <div className="flex items-center gap-3 md:hidden z-50 relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex flex-col gap-1 p-2"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span
              className={`block h-px w-5 ${hamburgerColor} transition-all duration-300 ${
                menuOpen ? "translate-y-[5px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-px w-5 ${hamburgerColor} transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-px w-5 ${hamburgerColor} transition-all duration-300 ${
                menuOpen ? "-translate-y-[5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>
    </header>

      {/* Mobile menu - full screen, solid ink */}
      <div
        className={`fixed inset-0 z-40 bg-[#111111] pt-[96px] transition-transform duration-300 md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav
          className="flex h-full flex-col px-5 py-8"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-8">
            <li>
              <span className="font-mono-label text-sm text-[#BDBAB0] block mb-4">Services</span>
              <ul className="flex flex-col gap-6 pl-4 border-l border-line-dark">
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="font-mono-label text-xl text-[#F5F3EC] transition-colors hover:text-accent"
                      onClick={() => setMenuOpen(false)}
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link
                href="/contact"
                className="font-mono-label text-xl text-[#F5F3EC] transition-colors hover:text-accent"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li className="pt-8 mt-4 border-t border-line-dark">
              <WhatsAppButton className="w-full justify-center py-4" />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
