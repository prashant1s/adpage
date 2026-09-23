import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Spending lakhs on Meta ads. Still stuck at 1.5x ROAS? | Whizoid Studio",
  description:
    "For D2C brands spending ₹1–3L a month on Meta ads. Your product isn't the problem. Your budget isn't the problem. The way your ads are being run is. Book a free 30-min strategy call.",
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
