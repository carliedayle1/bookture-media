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

export const metadata: Metadata = {
  title: {
    default: "Bookture Media — Empowering Stories for Future Generations",
    template: "%s · Bookture Media",
  },
  description:
    "A boutique literary publisher. We shape manuscripts into books made to last — cinematic craft, editorial rigour, and a legacy worth keeping.",
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
        <AppProviders>{children}</AppProviders>
        <GrainOverlay />
      </body>
    </html>
  );
}
