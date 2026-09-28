/* Scroll reveal with zero JavaScript: the `.reveal` class runs a CSS
   scroll-driven animation (see globals.css). Browsers without support, and
   visitors who prefer reduced motion, simply get the content as-is — it is
   never hidden waiting for hydration. */
export default function Reveal({
  children,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  return <Tag className={`reveal ${className}`}>{children}</Tag>;
}
