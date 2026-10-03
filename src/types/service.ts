export interface Service {
  /** URL slug — used for routing */
  slug: string;
  /** Mono label e.g. "SERVICE 01 / LAPTOP" */
  label: string;
  /** Display title */
  title: string;
  /** Short description for cards / meta */
  description: string;
  /** Extended copy for the service page */
  longDescription: string;
  /** What we fix / install — bullet list */
  scope: string[];
  /** Typical process steps */
  process: { step: string; detail: string }[];
  /** Prefilled WhatsApp message */
  whatsappMessage: string;
  /** SEO page title suffix */
  metaTitle: string;
  /** Colour token for accent highlights on the service page */
  accentToken?: string;
}
