"use client";

import { useState } from "react";

import { Button } from "@/components/ui/Button";

/**
 * Footer newsletter capture. Phase 1: visual + optimistic success state, no
 * network. Phase 6 wires this to a server action alongside the main CTA form.
 */
export function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  if (submitted) {
    return (
      <p className="text-accent font-display text-lg italic" role="status">
        Thank you — we&rsquo;ll write when there&rsquo;s something worth reading.
      </p>
    );
  }

  return (
    <form
      className="flex w-full max-w-md items-center gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        if (email.trim()) setSubmitted(true);
      }}
    >
      <label className="sr-only" htmlFor="newsletter-email">
        Email address
      </label>
      <div className="relative flex-1">
        <span aria-hidden className="text-accent absolute left-4 top-1/2 -translate-y-1/2">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M2 4h12v8H2z M2 4l6 4 6-4"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          className="border-border text-parchment-100 placeholder:text-parchment-500/60 focus:border-gold-500 w-full rounded-full border bg-white/[0.03] py-3 pl-11 pr-4 font-mono text-sm outline-none transition-colors"
        />
      </div>
      <Button variant="solid" size="md" type="submit">
        Join
      </Button>
    </form>
  );
}
