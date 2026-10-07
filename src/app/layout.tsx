import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Cursor } from "@/components/Cursor";
import { LenisProvider } from "@/components/LenisProvider";
import { JsonLd } from "@/components/JsonLd";

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo-var",
  display: "swap",
  axes: ["wdth"],
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-ibm-plex-mono-var",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} · ${siteConfig.tagline}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL("https://grepair.com"),
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "/",
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: "/icon-512.png",
        width: 512,
        height: 512,
        alt: `${siteConfig.name} Logo`,
      },
    ],
  },
  verification: {
    google: "ADD_YOUR_GOOGLE_SEARCH_CONSOLE_TAG_HERE",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${ibmPlexMono.variable}`} suppressHydrationWarning>
      <body className="antialiased selection:bg-accent selection:text-ink" suppressHydrationWarning>
        <LenisProvider>
          <Cursor />
          <Header />
          <main>{children}</main>
          <Footer />
        </LenisProvider>
        <JsonLd />
      </body>
    </html>
  );
}
