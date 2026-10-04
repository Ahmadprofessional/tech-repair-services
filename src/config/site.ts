export const siteConfig = {
  name: "G Repair",
  tagline: "Repairs & CCTV in Milton Keynes",
  description:
    "Laptop repair, mobile phone repair, and CCTV camera installation across Milton Keynes and surrounding areas.",
  url: "https://grepair.com",
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
  email: "grepair90@gmail.com",
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
