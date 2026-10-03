export const siteConfig = {
  name: "BRAND NAME",
  tagline: "Repairs & CCTV in Milton Keynes",
  description:
    "Laptop repair, mobile phone repair, and CCTV camera installation across Milton Keynes and surrounding areas.",
  url: "https://example.com",
  area: "Milton Keynes",
  nearbyAreas: [
    "Bletchley",
    "Wolverton",
    "Newport Pagnell",
    "Stony Stratford",
    "Olney",
    "Woburn Sands",
    "Leighton Buzzard",
    "Buckingham",
    "Towcester",
    "Bedford",
  ],
  phone: "01908 000 000",
  email: "hello@example.com",
  address: {
    street: "1 Example Street",
    locality: "Milton Keynes",
    region: "Buckinghamshire",
    postalCode: "MK1 1AA",
    country: "GB",
  },
  social: {
    // Add social links when ready
  },
} as const;

export type SiteConfig = typeof siteConfig;
