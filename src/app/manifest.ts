import type { MetadataRoute } from "next";

import { siteConfig } from "@/lib/content";

/**
 * Web app manifest — drives the Android home-screen / installed-PWA icon, which
 * the favicon/icon file conventions do not cover. Icons live in `public/` rather
 * than as `app/icon.*` files so they keep stable, unhashed URLs; the manifest
 * spec wants concrete sizes, and maskable entries need the safe-zone padding
 * baked in.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} — ${siteConfig.tagline}`,
    short_name: siteConfig.name,
    description:
      "A boutique literary publisher. We shape manuscripts into books made to last.",
    start_url: "/",
    display: "standalone",
    // Matches --color-ink-950, the dark-theme page ground.
    background_color: "#080b14",
    theme_color: "#080b14",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
