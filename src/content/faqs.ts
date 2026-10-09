/**
 * Shared by the visible FAQ accordion and the FAQPage JSON-LD in the layout.
 * Google requires schema FAQ text to match what the user can actually see, so
 * both must read from this one array.
 *
 * Answers run problem → solution, and only repeat promises made elsewhere on
 * the page — if a promise changes there, change it here too.
 */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "What happens on the strategy call?",
    a: "It’s 30 minutes on your actual account, in three parts. Audit: we open your Meta ad account with you, live, and check your ads, tracking and landing page to find the 2–3 biggest places you’re losing money. Strategy: we show you what to fix first and how we’d grow the account from there. How we work: new ads tested every week, losing ads off within 72 hours, careful scaling and one WhatsApp update a week. Even if you don’t hire us, you leave with the plan.",
  },
  {
    q: "Isn’t ROAS all that matters?",
    a: "No. ROAS isn’t everything. A good ROAS can still hide a business that’s losing money: each new customer costs more to win, orders stay small, or margins get eaten. So we track the full picture alongside it: CAC (what each customer costs you), revenue, AOV (average order value), conversion rate and profit. The goal is growth that makes you money, not just a better-looking ROAS.",
  },
  {
    q: "Why Whizoid?",
    a: "Most agencies learn on your budget: they try ideas and hope one sticks. We’ve run Meta ads for 50+ D2C brands across industries, so we already know what works and what wastes money. We start from what’s proven, then test new ads every week to find your winners.",
  },
  {
    q: "My ads look good. Why aren’t they selling?",
    a: "Good-looking ads don’t always sell. Usually one of five leaks is to blame: tired ads, no real testing, tracking that feeds Meta the wrong numbers, a landing page that doesn’t match the ad, or budget pushed up too fast. In your first 7 days we find which ones are hitting your account and fix those first.",
  },
  {
    q: "Is the call really free?",
    a: "Yes. 30 minutes, no pitch, no strings. Booking takes under a minute: pick a time that suits you on the calendar.",
  },
  {
    q: "Should I just increase my budget?",
    a: "Not yet. More budget on a leaking account only makes the leak bigger. We fix what’s broken first, then scale: budget goes up only on ads that are already selling, and slowly enough that they don’t break.",
  },
  {
    q: "How soon will I see changes?",
    a: "The audit is done in your first 7 days, and the first fixes go live in week one. From then on, new ads are tested every week and losing ones are switched off within 72 hours. Every account is different, so we’ll tell you honestly on the call what to expect for yours.",
  },
  {
    q: "Do you make the ads too?",
    a: "Yes. Most accounts stall because the same 2–3 ads run for weeks until people scroll straight past. So our own team plans, shoots and edits fresh hooks and angles every week, and we test them in your account.",
  },
  {
    q: "How will I know what’s happening in my account?",
    a: "Most agencies send long reports and nothing changes. You get one WhatsApp update a week instead: what we tested, what’s winning, what we switched off and what’s next.",
  },
  {
    q: "I already have an agency. Should I still book?",
    a: "Yes. If you’re getting reports but your numbers aren’t moving, a second look at your account will show you exactly what’s being missed. There’s no pressure to switch.",
  },
  {
    q: "Who do you work with?",
    a: "D2C brands that already sell online and spend ₹1–3L a month on Meta ads. If you’re just starting and have no sales yet, it’s too early for us. We also take on a maximum of 5 new brands a month, so every account gets hands-on attention. Once this month’s slots are gone, the next opening is next month.",
  },
  {
    q: "Why only 5 new brands a month?",
    a: "Most agencies keep signing clients until each account gets a few minutes a week. We don’t. Every brand gets new ads tested weekly, losing ads switched off within 72 hours and a WhatsApp update every week, and that takes real hands-on time. So we cap it at 5 new brands a month. Once this month’s spots are gone, the next opening is next month.",
  },
  {
    q: "What if I don’t see results in 90 days?",
    a: "You don’t pay our fee. We agree on one clear target with you on day one, and if we miss it inside 90 days, our fee is waived. Ad spend goes straight to Meta, so that part isn’t covered.",
  },
];

/* How many FAQs show up front. The rest stay in the page (so the JSON-LD
   still matches it) but are hidden behind a "View more" button. */
export const FAQ_PREVIEW_COUNT = 5;
