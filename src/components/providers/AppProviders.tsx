"use client";

import type { ReactNode } from "react";

import { MotionProvider } from "./MotionProvider";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import { PreloaderGate } from "./PreloaderGate";

/**
 * Client composition root, mounted once by the server RootLayout.
 *
 * Order matters: MotionProvider is outermost so both SmoothScrollProvider and
 * every descendant can read the reduced-motion preference. PreloaderGate lives
 * inside SmoothScrollProvider so it can pause Lenis while the intro plays.
 *
 * Phase 7 adds <CustomCursor /> as the last child inside SmoothScrollProvider.
 */
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <SmoothScrollProvider>
        <PreloaderGate>{children}</PreloaderGate>
      </SmoothScrollProvider>
    </MotionProvider>
  );
}
