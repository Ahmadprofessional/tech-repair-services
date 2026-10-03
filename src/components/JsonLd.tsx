import { siteConfig } from "@/config/site";

interface JsonLdProps {
  type?: "LocalBusiness" | "Service";
  serviceName?: string;
  serviceDescription?: string;
}

export function JsonLd({ type = "LocalBusiness", serviceName, serviceDescription }: JsonLdProps) {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: siteConfig.name,
    description: siteConfig.description,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.locality,
      addressRegion: siteConfig.address.region,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    areaServed: [
      siteConfig.area,
      ...siteConfig.nearbyAreas,
    ].map((area) => ({
      "@type": "City",
      name: area,
    })),
  };

  if (type === "Service" && serviceName) {
    const serviceSchema = {
      ...localBusiness,
      "@type": ["LocalBusiness", "Service"],
      serviceType: serviceName,
      ...(serviceDescription ? { description: serviceDescription } : {}),
    };

    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
    );
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
    />
  );
}
