import type { StaticImageData } from "next/image";

import adsInr from "../../public/1.png";
import adsUsd from "../../public/2.png";
import ig0 from "../../public/Image.jpg";
import ig1 from "../../public/Image (1).jpg";
import ig2 from "../../public/Image (2).jpg";
import ig3 from "../../public/Image (3).jpg";
import ig4 from "../../public/Image (4).jpg";
import ig5 from "../../public/Image (5).jpg";
import ig7 from "../../public/Image (7).jpg";
import ig8 from "../../public/Image (8).jpg";
import ig9 from "../../public/Image (9).jpg";
import ig10 from "../../public/Image (10).jpg";

/**
 * Screenshots for the proof wall, shown without captions. Each alt states
 * only what is visible in its own screenshot — if you swap an image, update
 * its alt too.
 */
export type ProofShot = {
  src: StaticImageData;
  alt: string;
};

/* Meta Ads Manager tables — wide, shown as two large cards. */
export const AD_ACCOUNT_SHOTS: ProofShot[] = [
  {
    src: adsInr,
    alt: "Meta Ads Manager table showing ₹148,161.42 total spent, 7,293,842 impressions and 5,031,151 accounts reached.",
  },
  {
    src: adsUsd,
    alt: "Meta Ads Manager table showing $7,665.42 total spent, 511,612 impressions and 179,733 accounts reached.",
  },
];

/* Instagram Insights — tall phone screenshots, shown in a grid. */
export const INSIGHT_SHOTS: ProofShot[] = [
  {
    src: ig7,
    alt: "Instagram Insights: 43,836,152 views and 9,915 net followers over 90 days.",
  },
  {
    src: ig10,
    alt: "Instagram Insights: 20,784,465 views, 74.0% from ads, 10,005,402 accounts reached.",
  },
  {
    src: ig4,
    alt: "Instagram Insights: 11,449,334 views and 1,923 net followers in 30 days.",
  },
  {
    src: ig2,
    alt: "Instagram Insights: 5,496,760 views in 30 days, 93.7% from non-followers.",
  },
  {
    src: ig3,
    alt: "Instagram professional dashboard: 5.5M views and 2.4K new followers between 22 July and 20 August.",
  },
  {
    src: ig5,
    alt: "Instagram Insights: 2,638,374 views and 1,476,225 accounts reached in 30 days.",
  },
  {
    src: ig9,
    alt: "Instagram content list with boosted posts reaching 1.4M, 776.5K and 645.6K views.",
  },
  {
    src: ig8,
    alt: "Instagram Insights: 68,138 followers, up 17.0% over 90 days.",
  },
  {
    src: ig0,
    alt: "Instagram Insights: 191,799 followers.",
  },
  {
    src: ig1,
    alt: "Instagram Insights: 191,805 followers with a follower growth chart.",
  },
];

/* Headline numbers for the stat row — all read straight off the shots above. */
export const PROOF_STATS = [
  { value: "₹1.48L+", label: "Ad spend managed" },
  { value: "72.9L+", label: "Impressions" },
  { value: "50.3L+", label: "Accounts reached" },
  { value: "4.38Cr+", label: "Views in 90 days" },
  { value: "74%", label: "Views from ads" },
];
