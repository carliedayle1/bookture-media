"use client";

import { useActionState } from "react";

import { Button } from "@/components/ui/Button";
import { submitContactMessage, type SubmitState } from "@/lib/actions";
import { contactContent as c } from "@/lib/content";

const inputClass =
  "border-border text-parchment-100 placeholder:text-parchment-500/50 focus:border-gold-500 w-full rounded-xl border bg-foreground/[0.05] px-4 py-3.5 text-sm outline-none transition-colors";

const initialState: SubmitState = { status: "idle" };

/**
 * Contact form backed by the submitContactMessage server action. Mirrors the
 * Begin Your Book styling; success swaps in a gold ornamental confirmation.
 */
export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContactMessage, initialState);

  if (state.status === "success") {
    return (
      <div className="border-foreground/10 bg-foreground/[0.03] flex flex-col items-start rounded-2xl border p-8 lg:p-10" role="status">
        <svg width="36" height="36" viewBox="0 0 14 14" className="text-accent mb-5">
          <path d="M7 0 L9 5 L14 7 L9 9 L7 14 L5 9 L0 7 L5 5 Z" fill="currentColor" />
        </svg>
        <h3 className="font-display text-parchment-100 text-2xl font-light">{c.success.title}</h3>
        <p className="text-parchment-300 mt-4 text-sm leading-relaxed">{c.success.body}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <input name="name" className={inputClass} placeholder="Your name" required autoComplete="name" />
        <input
          name="email"
          type="email"
          className={inputClass}
          placeholder="Your email"
          required
          autoComplete="email"
        />
      </div>
      <input name="subject" className={inputClass} placeholder="Subject (optional)" />
      <textarea
        name="message"
        className={`${inputClass} min-h-44 resize-none`}
        placeholder="How can we help?"
        required
      />
      {state.status === "error" ? (
        <p className="text-sm text-red-300" role="alert">
          {state.message}
        </p>
      ) : null}
      <p className="text-parchment-500 text-xs leading-relaxed">{c.formNote}</p>
      <div className="mt-1">
        <Button
          variant="solid"
          size="lg"
          magnetic
          type="submit"
          loading={pending}
          loadingLabel="Sending…"
        >
          Send message
        </Button>
      </div>
    </form>
  );
}
