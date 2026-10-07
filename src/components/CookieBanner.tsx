"use client";

import { useEffect, useState } from "react";

export function CookieBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setShow(true);
    }
  }, []);

  const handleConsent = (level: "all" | "essential") => {
    localStorage.setItem("cookie-consent", level);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-ink border-t border-line-dark p-4 md:p-6 shadow-2xl">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="text-xs md:text-sm text-paper max-w-3xl">
          <p className="font-bold mb-2">We value your privacy</p>
          <p className="text-muted leading-relaxed">
            We use strictly necessary cookies to make our site work. We'd also like to set optional analytics cookies to help us improve it. We won't set optional cookies unless you enable them. Using this tool will set a cookie on your device to remember your preferences.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto mt-2 md:mt-0">
          <button
            onClick={() => handleConsent("essential")}
            className="w-full sm:w-auto px-4 py-3 md:py-2 text-xs font-bold uppercase tracking-wider text-muted border border-line-dark hover:text-paper hover:border-muted transition-colors text-center"
          >
            Essential Only
          </button>
          <button
            onClick={() => handleConsent("all")}
            className="w-full sm:w-auto px-4 py-3 md:py-2 text-xs font-bold uppercase tracking-wider bg-accent text-ink hover:bg-accent/90 transition-colors text-center"
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
