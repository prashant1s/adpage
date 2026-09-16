import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Stop Guessing Replace Bad ROAS with a System | Meta Ads Intelligence",
  description:
    "If you're spending ₹2–4 lakhs a month on Meta ads and guessing which creatives will work, you're already losing money. Book a free strategy call.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-neutral-950">{children}</body>
    </html>
  );
}
