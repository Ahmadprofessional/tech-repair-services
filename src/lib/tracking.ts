declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export type GTMEvent = 
  | { event: 'generate_lead', form_name: string, page_path: string, service: string }
  | { event: 'phone_click', page_path: string, service: string }
  | { event: 'email_click', page_path: string, service: string }
  | { event: 'whatsapp_click', page_path: string, service: string }
  | { event: 'page_view', page_path: string, page_title: string };

export const getServiceFromPath = (path: string): string => {
  if (path.includes('laptop-repair')) return 'laptop_repair';
  if (path.includes('mobile-repair')) return 'mobile_repair';
  if (path.includes('cctv-installation')) return 'cctv_installation';
  return 'general';
};

export const trackEvent = (data: GTMEvent) => {
  if (typeof window !== 'undefined' && window.dataLayer) {
    window.dataLayer.push(data);
  }
};
