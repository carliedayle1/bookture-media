"use client";

import { useActionState, useRef, useState } from "react";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { OrnamentDivider } from "@/components/ui/OrnamentDivider";
import { ThemedBackground } from "@/components/ui/ThemedBackground";
import { submitManuscript, type SubmitState } from "@/lib/actions";
import { ctaContent as c } from "@/lib/content";
import { cn } from "@/lib/utils";

const inputClass =
  "border-border text-parchment-100 placeholder:text-parchment-500/50 focus:border-gold-500 w-full rounded-xl border bg-foreground/[0.05] px-4 py-3.5 text-sm outline-none transition-colors";

const initialState: SubmitState = { status: "idle" };

/**
 * Begin Your Book — a two-step submission form backed by a server action.
 * Step 1 gathers name + email (client-gated), step 2 the pitch; the whole form
 * posts to submitManuscript. Success swaps in a gold ornamental confirmation.
 */
export function BeginYourBook() {
  const [state, formAction, pending] = useActionState(submitManuscript, initialState);
  const [step, setStep] = useState<0 | 1>(0);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const advance = () => {
    if (nameRef.current?.value.trim() && emailRef.current?.checkValidity()) {
      setStep(1);
    } else {
      nameRef.current?.reportValidity?.();
      emailRef.current?.reportValidity?.();
    }
  };

  const done = state.status === "success";

  return (
    <Section id="begin" chapter={c.chapter} theme="ink-900">
      <ThemedBackground name="begin" scrim="center" />
      <Container size="narrow" className="relative">
        <h2 className="font-display text-parchment-100 text-center text-4xl leading-tight font-light text-balance sm:text-5xl md:text-6xl">
          {c.headline.map((run, i) =>
            run.emphasis ? (
              <em key={i} className="text-accent italic">
                {run.text}
              </em>
            ) : (
              <span key={i}>{run.text}</span>
            ),
          )}
        </h2>
        <p className="text-parchment-300 mx-auto mt-8 max-w-xl text-center leading-relaxed">
          {c.intro}
        </p>

        <OrnamentDivider className="my-12" />

        <div className="mx-auto max-w-lg">
          {done ? (
            <div className="text-center" role="status">
              <svg width="40" height="40" viewBox="0 0 14 14" className="text-accent mx-auto mb-6">
                <path d="M7 0 L9 5 L14 7 L9 9 L7 14 L5 9 L0 7 L5 5 Z" fill="currentColor" />
              </svg>
              <h3 className="font-display text-parchment-100 text-2xl font-light">
                {c.success.title}
              </h3>
              <p className="text-parchment-300 mx-auto mt-4 max-w-md text-sm leading-relaxed">
                {c.success.body}
              </p>
            </div>
          ) : (
            <form action={formAction} className="flex flex-col gap-4">
              {/* step 0 — kept mounted (hidden) in step 1 so values still submit */}
              <div className={cn("flex flex-col gap-4", step === 1 && "hidden")}>
                <input ref={nameRef} name="name" className={inputClass} placeholder="Your name" required autoComplete="name" />
                <input
                  ref={emailRef}
                  name="email"
                  type="email"
                  className={inputClass}
                  placeholder="Your email"
                  required
                  autoComplete="email"
                />
                <div className="mt-2 flex justify-center">
                  <Button variant="solid" size="lg" magnetic onClick={advance}>
                    Continue
                  </Button>
                </div>
              </div>

              {/* step 1 */}
              <div className={cn("flex flex-col gap-4", step === 0 && "hidden")}>
                <textarea
                  name="pitch"
                  className={`${inputClass} min-h-40 resize-none`}
                  placeholder="Tell us about your book — genre, length, and what it's trying to become."
                  required
                />
                {state.status === "error" ? (
                  <p className="text-center text-sm text-red-300" role="alert">
                    {state.message}
                  </p>
                ) : null}
                <div className="mt-2 flex items-center justify-center gap-4">
                  <Button variant="ghost" size="md" onClick={() => setStep(0)}>
                    Back
                  </Button>
                  <Button
                    variant="solid"
                    size="lg"
                    magnetic
                    type="submit"
                    loading={pending}
                    loadingLabel={c.loadingLabel}
                  >
                    Send to the editor
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      </Container>
    </Section>
  );
}
