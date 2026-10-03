import { Service } from "@/types/service";

export const services: Service[] = [
  {
    slug: "laptop-repair",
    label: "SERVICE 01 / LAPTOP",
    title: "Laptop Repair",
    description:
      "Screen replacements, battery swaps, data recovery, and general diagnostics for all major brands.",
    longDescription:
      "Cracked screen, dead battery, or a machine that won't start — we deal with it daily. Bring your laptop to our Milton Keynes workshop and we'll diagnose the fault, quote a fixed price, and get it back to you fast. No hourly rates, no surprises.",
    scope: [
      "Screen replacement (LCD & OLED)",
      "Battery replacement",
      "Keyboard and trackpad repair",
      "Charging port and DC jack repair",
      "SSD / RAM upgrades",
      "Data recovery",
      "Virus and malware removal",
      "Hinge repair",
      "Motherboard-level repair",
      "Fan cleaning and thermal paste",
    ],
    process: [
      {
        step: "Drop off or post in",
        detail:
          "Bring your laptop to our Milton Keynes workshop or send it via tracked post.",
      },
      {
        step: "Free diagnostic",
        detail:
          "We inspect the machine and confirm the fault within 24 hours. No charge if you decide not to go ahead.",
      },
      {
        step: "Fixed-price repair",
        detail:
          "We quote once, fix it, test it, and notify you when it's ready for collection.",
      },
    ],
    whatsappMessage:
      "Hi, I need a laptop repair. Can you help? (via website)",
    metaTitle: "Laptop Repair",
  },
  {
    slug: "mobile-repair",
    label: "SERVICE 02 / MOBILE",
    title: "Mobile Phone Repair",
    description:
      "Same-day screen, battery, and port repairs for iPhone, Samsung, and most Android devices.",
    longDescription:
      "Smashed screen? Battery draining by noon? We repair iPhones, Samsung Galaxy, Pixel, and most Android phones — often while you wait. We use quality parts and every repair comes with a warranty.",
    scope: [
      "Screen replacement (OLED & LCD)",
      "Battery replacement",
      "Charging port repair",
      "Rear glass replacement",
      "Camera lens replacement",
      "Water damage treatment",
      "Speaker and microphone repair",
      "Software troubleshooting",
      "SIM tray and button repair",
      "Data transfer to a new device",
    ],
    process: [
      {
        step: "Walk in or book ahead",
        detail:
          "Visit our Milton Keynes workshop or message us on WhatsApp to book a slot.",
      },
      {
        step: "Quick assessment",
        detail:
          "We check the phone, confirm the issue, and give you a firm price — usually within 15 minutes.",
      },
      {
        step: "Same-day repair",
        detail:
          "Most repairs are done in under an hour. We test everything before handing it back.",
      },
    ],
    whatsappMessage:
      "Hi, I need a mobile phone repair. Can you help? (via website)",
    metaTitle: "Mobile Phone Repair",
  },
  {
    slug: "cctv-installation",
    label: "SERVICE 03 / CCTV",
    title: "CCTV Installation",
    description:
      "Professional CCTV camera setup for homes and small businesses across Milton Keynes.",
    longDescription:
      "We supply and install CCTV systems for homes and small businesses in Milton Keynes. From a single doorbell camera to a full multi-camera setup with remote viewing — we handle the survey, cabling, install, and handover.",
    scope: [
      "Home CCTV systems (2–8 cameras)",
      "Small business CCTV",
      "4K and 2K camera supply",
      "DVR / NVR setup and configuration",
      "Remote viewing on phone and tablet",
      "Night vision and motion detection",
      "Existing system upgrades",
      "Cable routing and tidy install",
      "Cloud and local storage options",
      "Annual maintenance plans",
    ],
    process: [
      {
        step: "Free site survey",
        detail:
          "We visit your property in Milton Keynes, assess the layout, and recommend the right cameras and positions.",
      },
      {
        step: "Supply and install",
        detail:
          "We supply the equipment, run the cables neatly, mount the cameras, and configure the recorder.",
      },
      {
        step: "Handover and training",
        detail:
          "We set up remote viewing on your phone, walk you through the system, and make sure you're comfortable using it.",
      },
    ],
    whatsappMessage:
      "Hi, I'm interested in CCTV installation. Can you help? (via website)",
    metaTitle: "CCTV Installation",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((s) => s.slug);
}
