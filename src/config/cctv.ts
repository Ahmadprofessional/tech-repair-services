export interface CameraTypeItem {
  id: string;
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
  };
}

export interface CctvFaqItem {
  question: string;
  answer: string;
}

// Price anchor: client requested no price allowed. Empty string prevents price block from rendering.
export const TYPICAL_2_CAM_HOME_FROM: string = "";

export const cameraTypes: CameraTypeItem[] = [
  {
    id: "dome-cameras",
    title: "Dome Cameras",
    description:
      "Discreet, weatherproof dome cameras ideal for residential entryways, soffits, and commercial interiors. Features infrared night vision and smart motion detection with wide-angle coverage.",
    image: {
      src: "/cctv/dome-cctv.webp",
      alt: "Discreet weatherproof dome security camera mounted under soffit",
    },
  },
  {
    id: "bullet-cameras",
    title: "Bullet Cameras",
    description:
      "High-visibility deterrent cameras designed for monitoring driveways, rear gardens, and building perimeters. Delivers crisp 2K or 4K resolution with extended night vision range.",
    image: {
      src: "/cctv/bullet-cctv.webp",
      alt: "Long-range bullet security camera for outdoor driveway and perimeter monitoring",
    },
  },
  {
    id: "doorbell-camera",
    title: "Doorbell Camera",
    description:
      "Compact front door video solution providing two-way audio, instant motion alerts, and live video streaming directly to your smartphone or tablet.",
    image: {
      src: "/cctv/doorbell-cctv.webp",
      alt: "Smart video doorbell camera at front door with smartphone connectivity",
    },
  },
  {
    id: "remote-viewing",
    title: "Remote Viewing on Phone & Tablet",
    description:
      "Secure live streaming and playback configured on your iOS or Android devices. Check camera feeds, review motion events, and receive alerts from anywhere, anytime.",
    image: {
      src: "/cctv/remote-view-cctv.webp",
      alt: "Smartphone interface displaying multi-camera live CCTV remote viewing",
    },
  },
];

export const cctvFaqs: CctvFaqItem[] = [
  {
    question: "How does the free site survey work?",
    answer:
      "We visit your property in Milton Keynes or within our 20-mile radius, evaluate your layout, blind spots, entry points, and cable routing options, then provide a clear, no-obligation quote tailored to your property.",
  },
  {
    question: "How many cameras does a typical home need?",
    answer:
      "Most homes require between 2 and 8 cameras depending on the size of the property, driveway, garden access, and vulnerability points. We will recommend the exact camera count during your free survey.",
  },
  {
    question: "Can I view the CCTV cameras on my smartphone or tablet?",
    answer:
      "Yes. As part of every installation, we configure remote viewing on your iOS or Android phones and tablets, set up notifications, and guide you through how to use the app before handover.",
  },
  {
    question: "Do you cover my area?",
    answer:
      "We cover Milton Keynes and a 20-mile radius, including Bletchley, Wolverton, Newport Pagnell, Stony Stratford, Olney, Woburn Sands, Leighton Buzzard, Buckingham, Towcester, and Bedford.",
  },
  {
    question: "Can you upgrade or expand an existing CCTV system?",
    answer:
      "Yes. We upgrade older analogue or low-resolution systems with modern 2K or 4K cameras, replace faulty recorders, add extra cameras to existing setups, and upgrade storage options.",
  },
  {
    question: "Do you offer annual maintenance plans?",
    answer:
      "Yes, we offer annual maintenance plans to inspect cameras, clean lenses, check cable integrity, update recorder firmware, and ensure remote viewing connectivity remains fully functional. For pricing and scheduling, call 07777168239 or message us on WhatsApp.",
  },
];

export const cctvServiceAreas = [
  "Milton Keynes",
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
] as const;

