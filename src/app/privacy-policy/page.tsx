import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Akarsh Interiors handles information you share through this website.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy">
      <div>
        <h2>Information you share</h2>
        <p>
          When you submit an enquiry or message us on WhatsApp, you may share your name, phone number, city, email address and details
          about your project. We use this information only to respond to your enquiry and to discuss your interior project.
        </p>
      </div>
      <div>
        <h2>How enquiries are sent</h2>
        <ul>
          <li>Enquiries sent via WhatsApp are handled through WhatsApp and are subject to WhatsApp&apos;s own privacy policy.</li>
          <li>If the online form is connected, your enquiry is forwarded securely to our enquiry inbox or customer records.</li>
        </ul>
      </div>
      <div>
        <h2>Sharing</h2>
        <p>We do not sell your personal information. We do not share it with third parties except where needed to provide our services or where required by law.</p>
      </div>
      <div>
        <h2>Your choices</h2>
        <p>
          You can ask us to update or delete the information you have shared by contacting us on {site.phone}.
        </p>
      </div>
    </LegalPage>
  );
}
