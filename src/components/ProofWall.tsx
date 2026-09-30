import Image from "next/image";

import DepthCarousel from "@/components/DepthCarousel";
import { AD_ACCOUNT_SHOTS, INSIGHT_SHOTS, type ProofShot } from "@/content/proof";
import { CARD } from "@/lib/ui";

function ShotHeader({ shot }: { shot: ProofShot }) {
  return (
    <div className="px-2 text-center">
      <h3 className="text-h3 font-bold text-accent-soft text-balance">
        {shot.headline}
      </h3>
      <p className="mt-1 text-micro text-muted">{shot.caption}</p>
    </div>
  );
}

export default function ProofWall() {
  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Ad account tables: two wide cards. */}
      <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
        {AD_ACCOUNT_SHOTS.map((shot) => (
          <figure key={shot.headline} className={`reveal ${CARD} p-4 sm:p-5`}>
            <ShotHeader shot={shot} />
            <div className="mt-4 overflow-hidden rounded-xl border border-line bg-white">
              <Image
                src={shot.src}
                alt={shot.alt}
                placeholder="blur"
                sizes="(min-width: 768px) 560px, 100vw"
                className="h-auto w-full"
              />
            </div>
          </figure>
        ))}
      </div>

      {/* Instagram Insights: phone screenshots in a 3D depth carousel.
          Drag, swipe, use the arrows/dots, or arrow keys when focused.
          Phones: height follows the width-scaled card (plus room for the
          dots), so narrow screens don't get a gap under it. */}
      <div className="reveal relative h-[min(calc(133vw+36px),620px)] overflow-x-clip sm:h-175 md:h-190">
        <DepthCarousel
          label="Instagram Insights results"
          items={INSIGHT_SHOTS.map((shot) => ({
            image: shot.src,
            alt: shot.alt,
            title: shot.headline,
            caption: shot.caption,
          }))}
          cardWidth={340}
          cardHeight={660}
          radius={18}
          depth={220}
          spread={110}
          tilt={22}
          tiltDirection="right"
          perspective={1400}
          visibleCards={3}
          symmetric
          falloff={0.2}
          blur={6}
          tint="#05060a"
          duration={1300}
          ease="power3.out"
          autoplay
          autoplayDelay={1500}
          loop
          showControls
          showIndicators
        />
      </div>
    </div>
  );
}
