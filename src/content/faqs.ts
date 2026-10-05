/**
 * Shared by the visible FAQ accordion and the FAQPage JSON-LD in the layout.
 * Google requires schema FAQ text to match what the user can actually see, so
 * both must read from this one array.
 */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Why Whizoid?",
    a: "We’ve run Meta ads for 50+ D2C brands across industries. We already know what works and what wastes money, so we don’t experiment with your budget. We start with what’s proven.",
  },
  {
    q: "Can any brand work with you?",
    a: "We take on a maximum of 5 new brands a month. That’s how every account gets hands-on attention instead of being spread thin. Once this month’s slots are gone, the next opening is next month.",
  },
  {
    q: "My ads look good. Why aren’t they selling?",
    a: "Good-looking ads don’t always sell. We check what’s actually working in your numbers.",
  },
  {
    q: "Is the call really free?",
    a: "Yes. 30 minutes, no strings.",
  },
  {
    q: "What happens on the strategy call?",
    a: "We open your ad account with you, live, and audit it. You’ll see the 2–3 biggest places you’re losing money, what we’d change first, and how we’d work together. Even if you don’t hire us, you leave with a clear plan.",
  },
  {
    q: "Should I just increase my budget?",
    a: "Not yet. Fix what’s broken first, then scale.",
  },
  {
    q: "Is ROAS the only number you look at?",
    a: "No. A good ROAS can hide a business that’s losing money: customers cost more to win, orders stay small, margins stay thin. So we track CAC, revenue, average order value, conversion rate and profit alongside ROAS, and optimise for profitable growth, not just a better-looking number.",
  },
  {
    q: "I already have an agency.",
    a: "Take the call anyway. You’ll know exactly what’s being missed.",
  },
  {
    q: "How soon will I see changes?",
    a: "First fixes go live in week one. We’ll tell you honestly on the call what to expect for your account.",
  },
  {
    q: "What if I don’t see results in 90 days?",
    a: "You don’t pay our fee. We agree on one clear target on day one. Ad spend goes to Meta, so that’s not covered.",
  },
];

/* How many FAQs show up front. The rest stay in the page (so the JSON-LD
   still matches it) but are hidden behind a "View more" button. */
export const FAQ_PREVIEW_COUNT = 5;
