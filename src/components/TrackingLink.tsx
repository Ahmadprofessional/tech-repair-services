"use client";

import { usePathname } from "next/navigation";
import { trackEvent, getServiceFromPath } from "@/lib/tracking";

interface TrackingLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  eventType: "phone_click" | "email_click";
}

export function TrackingLink({ eventType, children, ...props }: TrackingLinkProps) {
  const pathname = usePathname();
  
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    trackEvent({
      event: eventType,
      page_path: pathname || "",
      service: getServiceFromPath(pathname || ""),
    });
    if (props.onClick) props.onClick(e);
  };

  return (
    <a {...props} onClick={handleClick}>
      {children}
    </a>
  );
}
