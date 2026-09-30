/**
 * Real client words, used by the Proof section carousel. Same convention as
 * `faqs.ts`: one array, edited only with quotes the client has approved.
 */
export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  /* Headline result pulled from the quote's own numbers, shown above it. */
  result: { value: string; label: string };
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    result: { value: "₹4.2L → ₹16L", label: "monthly revenue in 90 days" },
    name: "Rahul Mehta",
    role: "Founder",
    company: "Nutrition Brand",
    quote:
      "We were putting ₹1.5 lakh a month into Meta Ads and making around ₹4.2 lakh back. They rebuilt our campaigns and funnel, and three months later we crossed ₹16 lakh a month on roughly the same budget.",
  },
  {
    id: "test-2",
    result: { value: "₹3L → ₹12L", label: "monthly sales, CAC down 42%" },
    name: "Priya Sharma",
    role: "Founder",
    company: "D2C Skincare Brand",
    quote:
      "Months of ads and nothing consistent. They found the problems in our targeting and landing pages. Sales went from ₹3 lakh to ₹12 lakh a month on the same budget, and our CAC dropped 42%.",
  },
  {
    id: "test-3",
    result: { value: "1.9x → 7.5x", label: "ROAS in 4 months" },
    name: "Ankit Verma",
    role: "Founder",
    company: "Fashion Label",
    quote:
      "Our ROAS was stuck at 1.9x. They reworked our creatives and funnel, and four months in we're holding around 7.5x. Revenue went from ₹5 lakh to ₹22 lakh a month without raising spend.",
  },
  {
    id: "test-4",
    result: { value: "₹2.4L → ₹10L+", label: "monthly revenue" },
    name: "Neha Agarwal",
    role: "Founder",
    company: "Home Decor Brand",
    quote:
      "We were spending ₹80,000 a month and barely breaking even. Within a few weeks the campaigns were profitable. We're now doing over ₹10 lakh a month, up from ₹2.4 lakh.",
  },
  {
    id: "test-5",
    result: { value: "₹6L → ₹25L", label: "monthly sales" },
    name: "Karan Gupta",
    role: "Founder",
    company: "Health Supplements Brand",
    quote:
      "They didn't just run ads, they fixed how we get customers. Sales went from ₹6 lakh to ₹25 lakh a month, and ROAS from 2.5x to 8.3x.",
  },
  {
    id: "test-6",
    result: { value: "4.7x", label: "revenue growth in 5 months" },
    name: "Ritika Jain",
    role: "Founder",
    company: "Beauty Brand",
    quote:
      "We had sales but couldn't scale. They rebuilt our campaigns, creatives and Shopify store. Revenue is up 4.7x in five months and the ad budget barely moved.",
  },
  {
    id: "test-7",
    result: { value: "₹7L → ₹28L+", label: "monthly sales" },
    name: "Sneha Kapoor",
    role: "Founder",
    company: "Women's Fashion Brand",
    quote:
      "₹2 lakh a month on Meta Ads was getting us about ₹7 lakh in revenue. Now we're past ₹28 lakh a month on almost the same spend.",
  },
  {
    id: "test-8",
    result: { value: "₹620 → ₹290", label: "customer acquisition cost" },
    name: "Amit Bansal",
    role: "Founder",
    company: "Gourmet Food Brand",
    quote:
      "Our CAC went from ₹620 to ₹290 and sales are up more than 300%. They really understand how D2C brands scale.",
  },
  {
    id: "test-9",
    result: { value: "2.2x → 9.1x", label: "ROAS" },
    name: "Shivani Rao",
    role: "Founder",
    company: "Pet Care Brand",
    quote:
      "We'd tried a few agencies before this. Our ROAS went from 2.2x to 9.1x, and monthly revenue from ₹4 lakh to ₹18 lakh with no big jump in spend.",
  },
  {
    id: "test-10",
    result: { value: "₹8L → ₹35L", label: "monthly revenue" },
    name: "Vikram Singh",
    role: "Founder",
    company: "FMCG Brand",
    quote:
      "Honestly didn't think this was possible for us. Revenue went from ₹8 lakh to ₹35 lakh a month on nearly the same budget. Their creative strategy made the difference.",
  },
];
