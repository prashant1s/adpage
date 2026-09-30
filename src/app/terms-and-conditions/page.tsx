import type { Metadata } from "next";

import LegalPage from "@/components/LegalPage";
import { TERMS } from "@/content/legal";

export const metadata: Metadata = {
  title: TERMS.title,
  description: TERMS.intro,
  alternates: { canonical: "/terms-and-conditions" },
};

export default function TermsPage() {
  return <LegalPage doc={TERMS} current="/terms-and-conditions" />;
}
