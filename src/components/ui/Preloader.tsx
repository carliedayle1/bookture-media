"use client";

import { useCallback, useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";

type PreloaderProps = {
  onComplete: () => void;
  videoSrc?: string;
};

/**
 * Cinematic intro: plays the brand film full-screen (muted, so autoplay is
 * allowed), then an ink curtain lifts to reveal the hero. A Skip button ends it
 * at any time. Plays on every page load/reload (no session skip — that caused a
 * one-frame flash). Not mounted under reduced motion (see PreloaderGate).
 *
 * Robustness: completes on the video's `ended`/`error`, on a blocked autoplay,
 * and on an absolute time cap — so the site can never get stuck behind it.
 */
export function Preloader({ onComplete, videoSrc = "/video/intro.mp4" }: PreloaderProps) {
  const root = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) {
      return;
    }
    finished.current = true;
    const el = root.current;
    if (el) {
      gsap.to(el, { yPercent: -100, duration: 0.9, ease: "inOutBook", onComplete });
    } else {
      onComplete();
    }
  }, [onComplete]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      finish();
      return;
    }

    const onEnded = () => finish();
    const onError = () => finish();
    const onTime = () => {
      if (barRef.current && video.duration) {
        barRef.current.style.transform = `scaleX(${video.currentTime / video.duration})`;
      }
    };
    video.addEventListener("ended", onEnded);
    video.addEventListener("error", onError);
    video.addEventListener("timeupdate", onTime);

    let blockedTimer = 0;
    video.play().catch(() => {
      // Autoplay blocked → don't trap the user behind a paused video.
      blockedTimer = window.setTimeout(finish, 1200);
    });
    const cap = window.setTimeout(finish, 15000);

    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("error", onError);
      video.removeEventListener("timeupdate", onTime);
      if (blockedTimer) clearTimeout(blockedTimer);
      clearTimeout(cap);
    };
  }, [finish, onComplete]);

  return (
    <div
      ref={root}
      className="bg-ink-950 fixed inset-0 z-[100] overflow-hidden"
      aria-label="Intro"
    >
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        muted
        playsInline
        autoPlay
        preload="auto"
      />
      {/* legibility scrim for the controls */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ backgroundImage: "linear-gradient(to top, rgba(8,11,20,0.6), transparent 30%)" }}
      />

      <span className="text-parchment-300 absolute bottom-8 left-8 font-mono text-[0.6rem] tracking-[0.35em] uppercase">
        Bookture Media
      </span>

      <button
        type="button"
        onClick={finish}
        className="text-parchment-100 hover:text-accent hover:border-gold-500/60 border-foreground/25 absolute bottom-8 right-8 flex items-center gap-2 rounded-full border px-5 py-2.5 font-mono text-[0.65rem] tracking-[0.2em] uppercase backdrop-blur-sm transition-colors"
      >
        Skip intro
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
          <path d="M3 3l5 5-5 5M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* video progress */}
      <span className="absolute inset-x-0 bottom-0 h-px overflow-hidden bg-foreground/15">
        <span ref={barRef} className="bg-accent block h-full w-full origin-left scale-x-0" />
      </span>
    </div>
  );
}
