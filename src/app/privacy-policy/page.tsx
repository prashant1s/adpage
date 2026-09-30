import type { Metadata } from "next";

import LegalPage from "@/components/LegalPage";
import { PRIVACY } from "@/content/legal";

export const metadata: Metadata = {
  title: PRIVACY.title,
  description: PRIVACY.intro,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPage() {
  return <LegalPage doc={PRIVACY} current="/privacy-policy" />;
}
