"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { services } from "@/data/services";
import { LogoMark } from "@/components/svg/LogoMark";
import { trackConversion, getServiceFromPath } from "@/lib/tracking";

const PHONE_NUMBER = "+447777168239";
const PHONE_DISPLAY = "07777168239";

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

  const handleHeaderCallClick = () => {
    trackConversion({
      event: "call_click",
      location: "header",
      page_path: pathname || "",
      service: getServiceFromPath(pathname || ""),
    });
  };

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
          {/* Logo */}
          <div className="flex items-center z-50 relative">
            <Link
              href="/"
              className={`flex items-center gap-3 transition-colors duration-300 ${textColor} hover:opacity-80`}
              aria-label="Gadget Repair home"
              onClick={() => setMenuOpen(false)}
            >
              <LogoMark className="h-[44px] w-auto shrink-0" />
              <span className="font-headline text-[26px] tracking-tight mt-1">
                REPAIR
              </span>
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 md:flex" aria-label="Main navigation">
            {/* Services Dropdown */}
            <div className="relative group py-4">
              <button
                type="button"
                className={`font-mono-label ${textColor} transition-colors hover:text-accent flex items-center gap-1 cursor-pointer`}
              >
                Services
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  className="opacity-50 transition-transform group-hover:rotate-180"
                  aria-hidden="true"
                >
                  <path
                    d="M2 3.5L5 6.5L8 3.5"
                    stroke="currentColor"
                    fill="none"
                    strokeWidth="1.5"
                  />
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

            {/* Tap-to-call button */}
            <a
              href={`tel:${PHONE_NUMBER}`}
              onClick={handleHeaderCallClick}
              aria-label={`Call ${PHONE_DISPLAY} (Available 24/7)`}
              className={`inline-flex items-center gap-2 border border-current px-3 py-2 text-xs font-bold uppercase tracking-wider font-mono transition-colors hover:text-accent hover:border-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 ${textColor}`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="shrink-0"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <span>{PHONE_DISPLAY}</span>
            </a>

            {/* WhatsApp button */}
            <WhatsAppButton location="header" className="py-2 px-4 text-xs" />
          </nav>

          {/* Mobile: Hamburger */}
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
              <span className="font-mono-label text-sm text-[#BDBAB0] block mb-4">
                Services
              </span>
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
            <li className="mt-2">
              <span className="font-mono-label text-sm text-[#F5F3EC] opacity-60 tracking-widest">
                [ 24/7 AVAILABILITY ]
              </span>
            </li>
            <li className="pt-6 mt-2 border-t border-line-dark flex flex-col gap-3">
              <a
                href={`tel:${PHONE_NUMBER}`}
                onClick={handleHeaderCallClick}
                aria-label={`Call ${PHONE_DISPLAY}`}
                className="w-full flex items-center justify-center gap-2 border border-line-dark py-4 text-[#F5F3EC] hover:border-accent hover:text-accent font-bold uppercase tracking-wider text-sm transition-colors"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="text-accent"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                Call {PHONE_DISPLAY}
              </a>
              <WhatsAppButton
                location="header"
                className="w-full justify-center py-4"
              />
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
