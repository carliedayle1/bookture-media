"use client";

import type { ReactNode } from "react";

import { MotionProvider } from "./MotionProvider";
import { SmoothScrollProvider } from "./SmoothScrollProvider";

/**
 * Client composition root, mounted once by the server RootLayout.
 *
 * Order matters: MotionProvider is outermost so both SmoothScrollProvider and
 * every descendant can read the reduced-motion preference.
 *
 * Phase 3 slots PreloaderGate around {children}; Phase 7 adds <CustomCursor />
 * as the last child inside SmoothScrollProvider.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <SmoothScrollProvider>{children}</SmoothScrollProvider>
    </MotionProvider>
  );
}
