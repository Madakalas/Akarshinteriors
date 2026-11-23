import type { Metadata } from "next";
import { LegalPage } from "@/components/sections/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using the Akarsh Interiors website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use">
      <div>
        <h2>Website content</h2>
        <p>
          Content on this website is for general information. Photographs marked as samples are illustrative. Designs, materials,
          prices and timelines for your project are confirmed only in a written quotation from Akarsh Interiors.
        </p>
      </div>
      <div>
        <h2>Free site visit, quotation and 3D design</h2>
        <p>
          Free offers apply within our service locations. The scope of the free 3D design and any conditions are explained during your
          consultation.
        </p>
      </div>
      <div>
        <h2>Brands and trademarks</h2>
        <p>Brand names mentioned on this website belong to their respective owners. Their mention does not imply an official partnership.</p>
      </div>
      <div>
        <h2>Changes</h2>
        <p>We may update these terms from time to time. The latest version will always be available on this page.</p>
      </div>
    </LegalPage>
  );
}
