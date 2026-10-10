"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackEvent } from "@/lib/tracking";

export function RouteChangeListener() {
  const pathname = usePathname();
  const isInitialLoad = useRef(true);

  useEffect(() => {
    // Skip initial load since GTM "All Pages" trigger fires automatically on initial page load
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    
    if (pathname) {
      trackEvent({
        event: "page_view",
        page_path: pathname,
        page_title: document.title,
      });
    }
  }, [pathname]);

  return null;
}
