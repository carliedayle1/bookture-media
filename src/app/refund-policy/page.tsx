import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Refund & Returns Policy",
  description: "Bookture Media's refund, returns, and work-termination policy.",
};

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Refund & Returns Policy">
      <h2>Refunds and Work Termination</h2>
      <p>
        Bookture Media shall issue refunds under specific circumstances where the Author elects to
        terminate the Agreement, including:
      </p>
      <ul>
        <li>A material breach of contract by Bookture Media;</li>
        <li>
          Termination after submission of the manuscript but prior to the commencement of interior
          design; or
        </li>
        <li>
          Termination after the start of interior design but before completion of the Digital
          Preview Approval Form.
        </li>
      </ul>
      <p>
        In the event of a verified breach of contract by Bookture Media, the Author shall be
        entitled to a full refund, less a $100 administrative fee to cover initial setup costs.
      </p>
      <p>
        If the Agreement is terminated after manuscript submission but before interior design begins,
        the Author shall be eligible for a partial refund equal to twenty-five percent (25%) of the
        total purchase price. Likewise, if termination occurs after interior design has commenced but
        prior to completion of the Digital Preview Approval Form, the Author shall be entitled to a
        refund of twenty-five percent (25%) of the purchase price.
      </p>
      <p>
        The Author&rsquo;s eligibility for any refund shall be forfeited if all required publishing
        materials are not submitted within six (6) months from the date of the service order.
      </p>

      <h2>Non-Refundable Services</h2>
      <p>
        Refunds are not available for fees associated with pre-publication and post-publication
        services, including but not limited to copyediting, revisions, and book sales-related
        services. Additionally, no refunds shall be issued for the publication of second or
        subsequent editions of the Work.
      </p>

      <h2>Termination by Bookture Media</h2>
      <p>
        If Bookture Media terminates the Agreement due to a breach of contract by the Author, no
        refund shall be issued.
      </p>
      <p>
        Bookture Media reserves the right to discontinue or terminate publication of the Work at its
        discretion. In such cases, all rights granted by the Author for the marketing and publication
        of the Work shall revert to the Author.
      </p>
      <p>
        Bookture Media may also terminate publication if it reasonably determines that the Work
        presents potential commercial risk or exposure to legal liability. In such instances, the
        Author shall receive written notice at least thirty (30) days prior to termination.
      </p>
      <p>
        If termination occurs prior to publication under these conditions, Bookture Media shall
        refund all amounts paid by the Author, less a $100 administrative fee to cover setup costs.
        This refund shall constitute full settlement of all obligations between the Parties.
      </p>
    </LegalPage>
  );
}
