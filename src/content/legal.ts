/* Legal pages, copied word-for-word from whizoid.com/terms-and-conditions
   and whizoid.com/privacy-policy. Keep them in sync with the main site —
   edit there first, then here. */

export type LegalItem = string | { label: string; text: string };

export type LegalSection = {
  id: string;
  title: string;
  body?: string;
  items?: LegalItem[];
  after?: string;
  /** Renders the email + website links under the body. */
  contact?: boolean;
};

export type LegalDoc = {
  title: string;
  intro: string;
  sections: LegalSection[];
};

export const LEGAL_EMAIL = "hello@whizoid.com";
export const LEGAL_WEBSITE = "https://www.whizoid.com";

export const TERMS: LegalDoc = {
  title: "Terms & Conditions",
  intro:
    "Please read these terms and conditions carefully before using our services.",
  sections: [
    {
      id: "acceptance",
      title: "Acceptance of Terms",
      body: "By accessing and using Whizoid Studio's website and services, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you must not use our services.",
    },
    {
      id: "services",
      title: "Description of Services",
      body: "Whizoid Studio provides the following services:",
      items: [
        "Software Development & Web Design",
        "AI Agents & Automation Solutions",
        "Social Media Management",
        "Ad Production & Marketing",
        "Influencer Marketing Campaigns",
        "UI/UX Design Services",
      ],
      after:
        "We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without prior notice.",
    },
    {
      id: "client-obligations",
      title: "Client Obligations",
      body: "As a client, you agree to:",
      items: [
        "Provide accurate, complete, and current information",
        "Respond promptly to requests for feedback and approvals",
        "Supply necessary materials (assets, content, access) in a timely manner",
        "Obtain all necessary rights and permissions for materials you provide",
        "Maintain the confidentiality of any proprietary information shared",
      ],
      after:
        "Delays in client responses may extend project timelines and incur additional costs.",
    },
    {
      id: "payment",
      title: "Payment Terms",
      body: "Payment terms are specified in individual project agreements or proposals:",
      items: [
        { label: "Deposit", text: "A non-refundable deposit is required to commence work" },
        { label: "Milestone Payments", text: "Payments are due at specified project milestones" },
        { label: "Final Payment", text: "Final deliverables are released upon full payment" },
        { label: "Late Payments", text: "Late payments may incur interest and pause work" },
      ],
    },
    {
      id: "timeline",
      title: "Project Timeline & Delivery",
      body: "Project timelines are estimates based on information available at project commencement. Factors affecting timelines include:",
      items: [
        "Client response time for feedback and approvals",
        "Availability of required materials and assets",
        "Third-party dependencies and integrations",
        "Scope changes requested during the project",
      ],
    },
    {
      id: "ip",
      title: "Intellectual Property Rights",
      body: "Upon full payment, clients receive ownership of custom deliverables created specifically for their project. However:",
      items: [
        "Whizoid Studio retains rights to pre-existing frameworks, libraries, and tools",
        "We reserve the right to showcase completed work in our portfolio",
        "Third-party assets (fonts, stock images, etc.) remain subject to their respective licenses",
        "Source code may be provided based on the specific project agreement",
      ],
    },
    {
      id: "revisions",
      title: "Revisions & Modifications",
      body: "Revision policies are outlined in project agreements:",
      items: [
        "A specified number of revision rounds are included",
        "Additional revisions may incur extra charges",
        "Major scope changes require amended agreements",
        "Revisions must be requested within the specified timeframe",
      ],
    },
    {
      id: "client-materials",
      title: "Client-Provided Materials",
      body: "You warrant that you have the right to use any materials, content, or data you provide. You are responsible for ensuring that materials do not infringe on third-party rights. We are not liable for any claims arising from client-provided materials.",
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      body: "To the fullest extent permitted by law:",
      items: [
        "Our liability is limited to the amount paid for the specific service",
        "We are not liable for indirect, incidental, or consequential damages",
        "We are not responsible for business losses or lost profits",
        "We do not guarantee specific results, rankings, or outcomes",
      ],
    },
    {
      id: "warranty",
      title: "Warranty Disclaimer",
      body: 'Services are provided "as is" and "as available." We do not warrant that:',
      items: [
        "Services will be uninterrupted or error-free",
        "Defects will be corrected immediately",
        "Our services will meet your specific requirements",
        "Any results will be achieved from using our services",
      ],
    },
    {
      id: "termination",
      title: "Termination",
      body: "Either party may terminate the agreement:",
      items: [
        "With written notice to the other party",
        "Client must pay for all work completed up to termination date",
        "We may terminate immediately for breach of terms or non-payment",
        "Upon termination, client licenses for proprietary materials cease",
      ],
    },
    {
      id: "confidentiality",
      title: "Confidentiality",
      body: "Both parties agree to maintain the confidentiality of proprietary information shared during the project. This includes but is not limited to trade secrets, business strategies, and technical information. This obligation survives the termination of the agreement.",
    },
    {
      id: "indemnification",
      title: "Indemnification",
      body: "You agree to indemnify and hold harmless Whizoid Studio from any claims, damages, or expenses arising from:",
      items: [
        "Your use of our services",
        "Your violation of these terms",
        "Your violation of any third-party rights",
        "Materials or content you provide",
      ],
    },
    {
      id: "governing-law",
      title: "Governing Law",
      body: "These terms are governed by the laws of India. Any disputes shall be resolved in the courts of Indore, Madhya Pradesh, India.",
    },
    {
      id: "changes",
      title: "Modifications to Terms",
      body: "We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date. Your continued use of our services after changes constitutes acceptance of the new terms.",
    },
    {
      id: "severability",
      title: "Severability",
      body: "If any provision of these terms is found to be unenforceable, the remaining provisions will remain in full force and effect.",
    },
    {
      id: "entire-agreement",
      title: "Entire Agreement",
      body: "These Terms & Conditions, along with any specific project agreements, constitute the entire agreement between you and Whizoid Studio regarding our services.",
    },
    {
      id: "contact",
      title: "Contact Information",
      body: "For questions about these Terms & Conditions, please contact us:",
      contact: true,
    },
  ],
};

export const PRIVACY: LegalDoc = {
  title: "Privacy Policy",
  intro:
    "Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.",
  sections: [
    {
      id: "information-we-collect",
      title: "Information We Collect",
      body: "At Whizoid Studio, we collect information you provide directly to us when you interact with our services. This includes:",
      items: [
        { label: "Contact information", text: "name, email address, phone number" },
        { label: "Business information", text: "company name, industry, project requirements" },
        { label: "Communication data", text: "messages, inquiries, and feedback" },
        { label: "Technical data", text: "IP address, browser type, device information" },
      ],
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      body: "We use the collected information for the following purposes:",
      items: [
        "To respond to your inquiries and provide requested services",
        "To send you quotes, proposals, and project updates",
        "To improve our website, services, and user experience",
        "To communicate about new services, special offers, or updates",
        "To comply with legal obligations and protect our rights",
      ],
    },
    {
      id: "sharing",
      title: "Data Sharing & Disclosure",
      body: "We may share your information only in the following circumstances:",
      items: [
        {
          label: "Service Providers",
          text: "Third-party companies that perform services on our behalf (e.g., hosting, analytics)",
        },
        {
          label: "Business Transfers",
          text: "In connection with any merger, sale of company assets, or acquisition",
        },
        {
          label: "Legal Requirements",
          text: "When required by law or to protect our rights, property, or safety",
        },
      ],
    },
    {
      id: "security",
      title: "Data Security",
      body: "We implement industry-standard security measures to protect your personal data, including:",
      items: [
        "Secure SSL/TLS encryption for data transmission",
        "Access controls and authentication systems",
        "Regular security audits and updates",
      ],
    },
    {
      id: "cookies",
      title: "Cookies & Tracking Technologies",
      body: "Our website uses cookies and similar technologies to remember your preferences and analyze website traffic. You can control cookie settings through your browser preferences.",
    },
    {
      id: "your-rights",
      title: "Your Privacy Rights",
      body: "Depending on your location, you may have rights regarding your personal information, including access, correction, deletion, and portability. To exercise these rights, contact us at hello@whizoid.com.",
    },
    {
      id: "contact",
      title: "Contact Us",
      body: "If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:",
      contact: true,
    },
  ],
};
