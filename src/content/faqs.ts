/**
 * Shared by the visible FAQ accordion and the FAQPage JSON-LD in the layout.
 * Google requires schema FAQ text to match what the user can actually see, so
 * both must read from this one array.
 */
export const FAQS: { q: string; a: string }[] = [
  {
    q: "Is the call really free?",
    a: "Yes. 30 minutes, no strings.",
  },
  {
    q: "Should I just increase my budget?",
    a: "Not yet. Fix what’s broken first, then scale.",
  },
  {
    q: "My ads look good. Why aren’t they selling?",
    a: "Good-looking ads don’t always sell. We check what’s actually working in your numbers.",
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
