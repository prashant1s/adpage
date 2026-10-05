import Image from "next/image";

import { CLIENTS } from "@/content/clients";
import { CARD } from "@/lib/ui";

/* One list of logo cards. The marquee renders it twice back to back and
   slides the pair left by half its width, so the loop has no seam. The
   trailing padding equals the gap, keeping both halves exactly equal. */
function LogoList({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 gap-4 pr-4 sm:gap-5 sm:pr-5"
    >
      {CLIENTS.map((client) => (
        <li
          key={client.name}
          className={`group ${CARD} flex h-20 w-44 shrink-0 items-center justify-center px-6 transition-colors duration-300 hover:border-line-strong sm:h-25 sm:w-55`}
        >
          {/* Every logo as one white silhouette (brightness-0 + invert),
              dimmed to the muted text tone until its card is hovered. */}
          <Image
            src={client.logo}
            alt={hidden ? "" : client.name}
            sizes="(min-width: 640px) 172px, 128px"
            className="h-auto max-h-12 w-auto max-w-full object-contain opacity-60 brightness-0 invert transition-opacity duration-300 group-hover:opacity-100 sm:max-h-16"
          />
        </li>
      ))}
    </ul>
  );
}

/* "Trusted by leading brands": a band right under the hero with client
   logos scrolling past, even on hover. With reduced motion it stands
   still and scrolls sideways by hand instead (globals.css). */
export default function ClientLogos() {
  return (
    <section
      aria-labelledby="clients-heading"
      className="border-t border-line bg-ink py-12 sm:py-16"
    >
      <h2
        id="clients-heading"
        className="px-5 text-center text-eyebrow font-semibold text-subtle uppercase"
      >
        Trusted by leading brands
      </h2>

      <div className="client-marquee no-scrollbar mt-8 sm:mt-10">
        <div className="client-marquee__track flex w-max">
          <LogoList />
          <LogoList hidden />
        </div>
      </div>
    </section>
  );
}
