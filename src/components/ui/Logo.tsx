import Image from "next/image";

import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/content";

import markSrc from "../../../public/brand/bookture-mark.png";
import logoSrc from "../../../public/images/new-logo.png";

type LogoProps = {
  /** "mark" = emblem only (header); "full" = full lockup with tagline (footer). */
  variant?: "mark" | "full";
  /** Rendered height in px; width derives from the asset aspect ratio. */
  height?: number;
  /** Pair the mark with a Fraunces wordmark (header use). */
  withWordmark?: boolean;
  className?: string;
  priority?: boolean;
};

export function Logo({
  variant = "mark",
  height = 40,
  withWordmark = false,
  className,
  priority = false,
}: LogoProps) {
  if (variant === "full") {
    return (
      <Image
        src={logoSrc}
        alt={`${siteConfig.name} — ${siteConfig.tagline}`}
        height={height}
        width={Math.round((logoSrc.width / logoSrc.height) * height)}
        priority={priority}
        unoptimized
        className={className}
      />
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image
        src={markSrc}
        alt={withWordmark ? "" : siteConfig.name}
        height={height}
        width={Math.round((markSrc.width / markSrc.height) * height)}
        priority={priority}
        unoptimized
      />
      {withWordmark ? (
        <span className="font-display text-parchment-100 text-lg leading-none font-medium tracking-wide">
          Bookture <span className="text-accent">Media</span>
        </span>
      ) : null}
    </span>
  );
}
