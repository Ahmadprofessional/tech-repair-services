import dynamic from "next/dynamic";

const HeroSection = dynamic(
  () => import("@/components/HeroSection").then((mod) => mod.HeroSection),
  { ssr: true }
);
const ServicesStrip = dynamic(
  () => import("@/components/ServicesStrip").then((mod) => mod.ServicesStrip),
  { ssr: true }
);
const HowItWorks = dynamic(
  () => import("@/components/HowItWorks").then((mod) => mod.HowItWorks),
  { ssr: true }
);
const ServiceArea = dynamic(
  () => import("@/components/ServiceArea").then((mod) => mod.ServiceArea),
  { ssr: true }
);
const ContactSection = dynamic(
  () => import("@/components/ContactSection").then((mod) => mod.ContactSection),
  { ssr: true }
);

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesStrip />
      <HowItWorks />
      <ServiceArea />
      <ContactSection />
    </>
  );
}
