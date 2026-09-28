import type { StaticImageData } from "next/image";

import edit from "../../public/img/IMG_4574.jpg";
import onSet from "../../public/img/IMG_5910.jpg";
import planning from "../../public/img/IMG_5933.jpg";
import review from "../../public/img/IMG_5938.jpg";
import studio from "../../public/img/IMG_6503.jpg";

/**
 * Behind-the-scenes photos for the BTS carousel. Captions describe only
 * what's visible in each photo — update them if you swap an image.
 */
export const BTS_SHOTS: {
  src: StaticImageData;
  title: string;
  caption: string;
  alt: string;
}[] = [
  {
    src: onSet,
    title: "On set",
    caption: "Filming a founder interview",
    alt: "Camera on a gimbal rig filming a man speaking on a sofa.",
  },
  {
    src: planning,
    title: "Planning the shoot",
    caption: "Product, props and angles",
    alt: "Two team members planning a product shoot at a table covered with products and equipment.",
  },
  {
    src: studio,
    title: "In the studio",
    caption: "Setting up lights",
    alt: "A team member adjusting lighting stands in a dark studio.",
  },
  {
    src: review,
    title: "Reviewing footage",
    caption: "Straight from camera to laptop",
    alt: "Hands on laptops next to a mirrorless camera and a phone, reviewing footage.",
  },
  {
    src: edit,
    title: "In the edit",
    caption: "Cutting the next round of ads",
    alt: "A dark editing suite with a video timeline across two monitors and a laptop.",
  },
];
