import type { Metadata } from "next";

import { LegalPage } from "@/components/legal/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Bookture Media collects, uses, and discloses personal information.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      lastUpdated="June 20, 2019"
      intro="Bookture Media (“we,” “us,” or “our”) operates its website (the “Site”). This Privacy Policy outlines how we collect, use, and disclose personal information obtained from users of the Site."
    >
      <h2>Information Collection and Use</h2>
      <p>
        While accessing or using our Site, you may be asked to provide certain personally
        identifiable information that can be used to contact or identify you (&ldquo;Personal
        Information&rdquo;). This may include, but is not limited to:
      </p>
      <ul>
        <li>Full name</li>
        <li>Email address</li>
        <li>Mailing address</li>
        <li>Telephone number</li>
      </ul>
      <p>
        We do not share mobile information with third parties or affiliates for marketing or
        promotional purposes. This exclusion includes text messaging originator opt-in data and
        consent, which will not be disclosed to any third parties.
      </p>

      <h2>Log Data</h2>
      <p>
        Like many website operators, Bookture Media collects information that your browser
        automatically sends when you visit the Site (&ldquo;Log Data&rdquo;). This may include:
      </p>
      <ul>
        <li>Internet Protocol (IP) address</li>
        <li>Browser type and version</li>
        <li>Pages visited on the Site</li>
        <li>Date and time of visit</li>
        <li>Time spent on pages</li>
        <li>Other analytical data</li>
      </ul>

      <h2>Cookies</h2>
      <p>
        Cookies are small data files that may include an anonymous unique identifier. These files
        are sent to your browser and stored on your device.
      </p>
      <p>
        Bookture Media uses cookies to collect information and improve user experience. You may
        configure your browser to refuse cookies or to notify you when cookies are being sent.
        Please note that disabling cookies may limit your ability to access certain features of the
        Site.
      </p>

      <h2>Data Security</h2>
      <p>
        We prioritize the protection of your Personal Information and implement commercially
        reasonable safeguards to maintain its security. However, no method of transmission over the
        Internet or electronic storage is entirely secure, and we cannot guarantee absolute
        protection.
      </p>

      <h2>Changes to This Privacy Policy</h2>
      <p>
        This Privacy Policy is effective as of June 20, 2019, and will remain in effect unless
        updated. Any changes will take effect immediately upon posting on this page.
      </p>
      <p>
        Bookture Media reserves the right to modify this Privacy Policy at any time. Users are
        encouraged to review this page periodically. Continued use of the Site following any updates
        constitutes acknowledgment and acceptance of the revised terms.
      </p>

      <h2>Contact Information</h2>
      <p>
        For questions or concerns regarding this Privacy Policy, please contact us at:{" "}
        <a href="mailto:Support@bookturemedia.com">Support@bookturemedia.com</a>
      </p>
    </LegalPage>
  );
}
