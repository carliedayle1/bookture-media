import type { Metadata } from "next";
import { Fraunces, Inter, Space_Mono } from "next/font/google";
import "./globals.css";

import { AppProviders } from "@/components/providers/AppProviders";
import { GrainOverlay } from "@/components/ui/GrainOverlay";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-space-mono",
  display: "swap",
});

const SITE_DESCRIPTION =
  "A boutique literary publisher. We shape manuscripts into books made to last — cinematic craft, editorial rigour, and a legacy worth keeping.";

export const metadata: Metadata = {
  // TODO: set to the real production origin before launch.
  metadataBase: new URL("https://bookture.media"),
  title: {
    default: "Bookture Media — Empowering Stories for Future Generations",
    template: "%s · Bookture Media",
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    title: "Bookture Media — Empowering Stories for Future Generations",
    description: SITE_DESCRIPTION,
    siteName: "Bookture Media",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bookture Media",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-motion="full"
      className={`${fraunces.variable} ${inter.variable} ${spaceMono.variable} h-full antialiased`}
    >
      <body className="bg-surface text-foreground min-h-full">
        <a
          href="#main"
          className="bg-accent text-ink-950 sr-only z-[130] rounded-full px-5 py-2 font-mono text-xs uppercase focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <AppProviders>{children}</AppProviders>
        <GrainOverlay />
      </body>
    </html>
  );
}
