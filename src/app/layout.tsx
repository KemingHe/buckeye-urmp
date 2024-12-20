// ./src/app/layout.tsx
//
// Mixed/dynamic root layout component for the app,
// where pages are hot-swapped as {children} in the layout.

// NextJS and Firebase essential imports.
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import type { Metadata, MetadataRoute } from "next";
import Script from "next/script";

// Local stylesheet imports.
import "./globals.css";

// Local manifest module import.
import manifest from "@app/manifest";

// Local static/mixed component imports.
import Footer from "@components/Footer";
import HelpAndSupport from "@components/HelpAndSupport";
import Header from "@components/header/Header";

export const metadata: Metadata = {
  title: "Research Mentorship Program",
  description:
    "Research Mentorship Program at The Ohio State University, a peer mentoring program for undergraduate students.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>): JSX.Element {
  // Use app manifest to load icons.
  const appManifest: MetadataRoute.Manifest = manifest();

  return (
    <html lang="en">
      <head>
        {appManifest.icons?.map((icon) => (
          <link
            key={icon.src}
            rel="icon"
            href={icon.src}
            type={icon.type}
            sizes={icon.sizes}
          />
        ))}
        {/* Official bux styles placement, with access min map. DO NOT TOUCH. */}
        <link rel="stylesheet" href="/css/bux-styles.min.css" />
      </head>
      <GoogleAnalytics gaId="G-BYL4W66J4W" />
      <GoogleTagManager gtmId="GT-PLWXLBMH" />
      <body className="overflow-x-hidden">
        <main className="flex flex-col min-h-screen">
          <Header />
          {children}
          <HelpAndSupport />
          <Footer />
        </main>
        {/* Official bux script placement, with access to min map. DO NOT TOUCH. */}
        <Script src="/js/bux.min.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
