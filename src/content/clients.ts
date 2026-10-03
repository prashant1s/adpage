import type { StaticImageData } from "next/image";

import threeMCarCare from "../../public/clients/3m-car-care.png";
import elvnElvn from "../../public/clients/11-11.svg";
import bramhaCorp from "../../public/clients/bramha-corp.png";
import bramhaRealty from "../../public/clients/bramha-realty.svg";
import chargeUp from "../../public/clients/charge-up.svg";
import ditra from "../../public/clients/ditra.webp";
import exicom from "../../public/clients/exicom.svg";
import hoppin from "../../public/clients/mono/hoppin.png";
import ihp from "../../public/clients/mono/ihp.png";
import jollySilks from "../../public/clients/mono/jolly-silks.png";
import joyalukkas from "../../public/clients/joyalukkas.png";
import kishandas from "../../public/clients/kishandas.svg";
import masoli from "../../public/clients/masoli-restaurant.webp";
import mesh from "../../public/clients/mono/mesh-exhibition.png";
import rhinoCult from "../../public/clients/rhino-cult.png";
import rsw from "../../public/clients/rsw.svg";
import snuzzles from "../../public/clients/snuzzles.svg";
import tejuMasala from "../../public/clients/mono/teju-masala.png";
import venkys from "../../public/clients/mono/venkys.png";
import whizoAi from "../../public/clients/whizo-ai.svg";

/**
 * Client logos for the "Trusted by leading brands" strip under the hero.
 * Order is the order they scroll past in. `name` is the alt text.
 *
 * The strip shows every logo as a single white silhouette (CSS filter), so
 * logos that sit on a filled shape — Teju's oval, Jolly Silks' purple box —
 * use the white-on-transparent cut-outs in clients/mono/ instead; the plain
 * filter would turn them into solid blobs. Full-colour originals are kept
 * alongside in clients/.
 */
export const CLIENTS: { name: string; logo: StaticImageData }[] = [
  { name: "Teju Masala", logo: tejuMasala },
  { name: "11:11 ELVN ELVN", logo: elvnElvn },
  { name: "Kishandas & Co.", logo: kishandas },
  { name: "Venky's", logo: venkys },
  { name: "Hoppin' Candy Toy", logo: hoppin },
  { name: "Mesh Exhibition", logo: mesh },
  { name: "Joyalukkas", logo: joyalukkas },
  { name: "Jolly Silks", logo: jollySilks },
  { name: "3M Car Care", logo: threeMCarCare },
  { name: "Bramha Realty & Infrastructure", logo: bramhaRealty },
  { name: "BramhaCorp", logo: bramhaCorp },
  { name: "Whizo AI", logo: whizoAi },
  { name: "Exicom", logo: exicom },
  { name: "Charge Up", logo: chargeUp },
  { name: "Rhino Cult", logo: rhinoCult },
  { name: "Snuzzles", logo: snuzzles },
  { name: "RSW Intsol", logo: rsw },
  { name: "Masoli Restaurant", logo: masoli },
  { name: "Ditra", logo: ditra },
  { name: "IHP Iyengars", logo: ihp },
];
