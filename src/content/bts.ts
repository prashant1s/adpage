import type { StaticImageData } from "next/image";

import edit from "../../public/img/IMG_4574.jpg";
import onSet from "../../public/img/IMG_5910.jpg";
import planning from "../../public/img/IMG_5933.jpg";
import review from "../../public/img/IMG_5938.jpg";
import studio from "../../public/img/IMG_6503.jpg";

/**
 * Behind-the-scenes photos and clips for the BTS carousel. Captions describe
 * only what's visible in each photo — update them if you swap an image.
 * Videos play muted and the carousel moves on once a clip has finished.
 * Keep them light for phones: 720×1280, 30fps H.264, no audio, ~1 MB each
 * (4K/60fps originals made the carousel stutter on mobile). Poster = first
 * frame, so nothing downloads until the clip reaches the front.
 */
export const BTS_SHOTS: {
  src?: StaticImageData;
  video?: string;
  poster?: string;
  title?: string;
  caption?: string;
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
    video: "/video/bts-1.mp4",
    poster: "/video/bts-1.jpg",
    alt: "Behind-the-scenes video clip from one of our shoots.",
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
    video: "/video/bts-2.mp4",
    poster: "/video/bts-2.jpg",
    alt: "Behind-the-scenes video clip from one of our shoots.",
  },
  {
    src: edit,
    title: "In the edit",
    caption: "Cutting the next round of ads",
    alt: "A dark editing suite with a video timeline across two monitors and a laptop.",
  },
  {
    video: "/video/bts-3.mp4",
    poster: "/video/bts-3.jpg",
    alt: "Behind-the-scenes video clip from one of our shoots.",
  },
];
