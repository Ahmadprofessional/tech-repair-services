declare global {
  interface Window {
    dataLayer: Array<Record<string, unknown>>;
    gtag: (...args: unknown[]) => void;
  }
}

export type TrackingLocation =
  | 'header'
  | 'floating'
  | 'hero'
  | 'footer'
  | 'final_cta'
  | 'form';

export type TrackingService = 'cctv' | 'laptop' | 'mobile' | 'general';

export type ConversionEvent =
  | {
      event: 'call_click';
      page_path: string;
      location: TrackingLocation;
      service: TrackingService;
    }
  | {
      event: 'whatsapp_click';
      page_path: string;
      location: TrackingLocation;
      service: TrackingService;
    }
  | {
      event: 'quote_form_submit';
      page_path: string;
      location: TrackingLocation;
      service: TrackingService;
    };

export type GTMEvent =
  | ConversionEvent
  | { event: 'email_click'; page_path: string; service: string }
  | { event: 'page_view'; page_path: string; page_title: string };

export const getServiceFromPath = (path: string): TrackingService => {
  if (path.includes('cctv-installation') || path.includes('cctv')) return 'cctv';
  if (path.includes('laptop-repair') || path.includes('laptop')) return 'laptop';
  if (path.includes('mobile-repair') || path.includes('mobile')) return 'mobile';
  return 'general';
};

/**
 * Pushes conversion events to the existing GTM dataLayer.
 * Supports: 'call_click', 'whatsapp_click', 'quote_form_submit'.
 * Parameters: page_path, location, service.
 */
export const trackConversion = (params: {
  event: 'call_click' | 'whatsapp_click' | 'quote_form_submit';
  location: TrackingLocation;
  service?: TrackingService;
  page_path?: string;
}) => {
  if (typeof window === 'undefined') return;

  const page_path = params.page_path ?? window.location.pathname;
  const service = params.service ?? getServiceFromPath(page_path);

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: params.event,
    page_path,
    location: params.location,
    service,
  });
};

export const trackEvent = (data: GTMEvent) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data as Record<string, unknown>);
  }
};
