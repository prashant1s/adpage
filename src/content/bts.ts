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
 * Keep them light for phones: 720×1280, 30fps H.264 (CRF 25, capped at
 * ~2.1 Mbps), no audio, faststart, ~1–2 MB each (4K/60fps originals made the
 * carousel stutter on mobile). iPhone HDR clips need tone-mapping to SDR or
 * they look washed out. Poster = first frame, so nothing downloads until the
 * clip reaches the front.
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
    video: "/video/bts-7.mp4",
    poster: "/video/bts-7.jpg",
    alt: "Behind-the-scenes clip: filming an interview on a café sofa.",
  },
  {
    video: "/video/bts-8.mp4",
    poster: "/video/bts-8.jpg",
    alt: "Behind-the-scenes clip: an interview on a sofa lit with red light.",
  },
  {
    src: planning,
    title: "Planning the shoot",
    caption: "Product, props and angles",
    alt: "Two team members planning a product shoot at a table covered with products and equipment.",
  },
  {
    video: "/video/bts-5.mp4",
    poster: "/video/bts-5.jpg",
    alt: "Behind-the-scenes clip: camera, laptop and headphones laid out on a table before a shoot.",
  },
  {
    video: "/video/bts-4.mp4",
    poster: "/video/bts-4.jpg",
    alt: "Behind-the-scenes clip: a team member taking test shots beside a light stand.",
  },
  {
    src: studio,
    title: "In the studio",
    caption: "Setting up lights",
    alt: "A team member adjusting lighting stands in a dark studio.",
  },
  {
    video: "/video/bts-6.mp4",
    poster: "/video/bts-6.jpg",
    alt: "Behind-the-scenes clip: a team member carrying a studio light into place.",
  },
  {
    video: "/video/bts-9.mp4",
    poster: "/video/bts-9.jpg",
    alt: "Behind-the-scenes clip: filming at home with a softbox light and a camera on a tripod.",
  },
  {
    src: review,
    title: "Reviewing footage",
    caption: "Straight from camera to laptop",
    alt: "Hands on laptops next to a mirrorless camera and a phone, reviewing footage.",
  },
  {
    video: "/video/bts-10.mp4",
    poster: "/video/bts-10.jpg",
    alt: "Behind-the-scenes clip: a team member mounting a phone on a gimbal.",
  },
  {
    video: "/video/bts-1.mp4",
    poster: "/video/bts-1.jpg",
    alt: "Behind-the-scenes video clip from one of our shoots.",
  },
  {
    src: edit,
    title: "In the edit",
    caption: "Cutting the next round of ads",
    alt: "A dark editing suite with a video timeline across two monitors and a laptop.",
  },
  {
    video: "/video/bts-2.mp4",
    poster: "/video/bts-2.jpg",
    alt: "Behind-the-scenes video clip from one of our shoots.",
  },
  {
    video: "/video/bts-3.mp4",
    poster: "/video/bts-3.jpg",
    alt: "Behind-the-scenes video clip from one of our shoots.",
  },
];
