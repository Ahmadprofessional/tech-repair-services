"use client";

import { usePathname } from "next/navigation";
import {
  trackConversion,
  trackEvent,
  getServiceFromPath,
  type TrackingLocation,
} from "@/lib/tracking";

interface TrackingLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  eventType: "phone_click" | "email_click" | "call_click";
  location?: TrackingLocation;
}

export function TrackingLink({
  eventType,
  location = "footer",
  children,
  ...props
}: TrackingLinkProps) {
  const pathname = usePathname();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (eventType === "phone_click" || eventType === "call_click") {
      trackConversion({
        event: "call_click",
        location,
        page_path: pathname || "",
        service: getServiceFromPath(pathname || ""),
      });
    } else {
      trackEvent({
        event: "email_click",
        page_path: pathname || "",
        service: getServiceFromPath(pathname || ""),
      });
    }
    if (props.onClick) props.onClick(e);
  };

  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
