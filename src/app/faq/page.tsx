import type { Metadata } from "next";
import type { ReactNode } from "react";

import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description: "Answers to common questions about Bookture Media's services, refunds, and support.",
};

const FAQS: { q: string; a: ReactNode }[] = [
  {
    q: "What is your refund policy?",
    a: (
      <>
        Please refer to the{" "}
        <a href="/refund-policy" className="text-accent underline underline-offset-2">
          Refund Policy
        </a>{" "}
        for comprehensive details regarding eligibility and conditions for refunds.
      </>
    ),
  },
  {
    q: "Can I cancel a service and receive a refund?",
    a: "Cancellation and refund eligibility depend on the specific service purchased. We recommend reviewing the Refund Policy for detailed terms and conditions.",
  },
  {
    q: "Are shipping costs refundable for returned items?",
    a: "In most cases, return shipping costs are the responsibility of the customer unless otherwise specified by Bookture Media.",
  },
  {
    q: "What should I do if I cannot access a digital product after purchase?",
    a: "If you encounter any issues accessing a digital product, please contact our customer support team for prompt assistance. We are committed to resolving technical concerns efficiently.",
  },
  {
    q: "Is there a refund policy for digital products?",
    a: "Digital products are non-refundable once the order has been confirmed and the product has been delivered. However, support is available for any technical issues encountered.",
  },
  {
    q: "How do I cancel a service and request a refund?",
    a: "To cancel a service and submit a refund request, please contact customer support within five (5) days prior to the scheduled service date. Additional assistance is available through the Contact Us page.",
  },
  {
    q: "How long does it take to process a refund?",
    a: "Refunds are generally processed within five (5) business days after the returned item has been received and inspected. Processing times may vary depending on the payment method and other factors.",
  },
  {
    q: "I have a question not addressed here. How can I get assistance?",
    a: (
      <>
        For further inquiries regarding refunds or related concerns, please contact us at{" "}
        <a href="mailto:Support@bookturemedia.com" className="text-accent underline underline-offset-2">
          Support@bookturemedia.com
        </a>
        . Our customer support team will be glad to assist you.
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <LegalPage
      title="Frequently Asked Questions"
      intro="Answers to the questions we hear most. If yours isn't here, we're an email away."
    >
      <div className="divide-foreground/15 mt-2 divide-y">
        {FAQS.map((item, i) => (
          <details key={i} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
              <span className="font-display text-parchment-100 text-lg font-light">
                {i + 1}. {item.q}
              </span>
              <span className="text-accent shrink-0 transition-transform duration-300 group-open:rotate-45">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </span>
            </summary>
            <p className="text-parchment-300 mt-3 max-w-2xl leading-relaxed">{item.a}</p>
          </details>
        ))}
      </div>
    </LegalPage>
  );
}
