export const siteConfig = {
  name: "Gadget Repair",
  tagline: "Repairs & CCTV in Milton Keynes",
  description:
    "Gadget Repair provides professional laptop repair, mobile phone repair, and CCTV camera installation across Milton Keynes and surrounding areas.",
  url: "https://gadgetrepair.uk",
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
  phone: "07777168239",
  email: "info@gadgetrepair.uk",
  address: {
    street: "49 Westhill Stantonbury",
    locality: "Milton Keynes",
    region: "Buckinghamshire",
    postalCode: "MK14 6BG",
    country: "GB",
  },
  social: {
    // Add social links when ready
  },
} as const;

export type SiteConfig = typeof siteConfig;
