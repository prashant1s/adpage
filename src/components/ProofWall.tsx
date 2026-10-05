import Image from "next/image";

import DepthCarousel from "@/components/DepthCarousel";
import {
  AD_ACCOUNT_SHOTS,
  INSIGHT_SHOTS,
  SALES_TABLE_SHOTS,
} from "@/content/proof";
import { CARD } from "@/lib/ui";

export default function ProofWall() {
  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Ad account tables: two wide cards. */}
      <div className="grid gap-5 sm:gap-6 md:grid-cols-2">
        {AD_ACCOUNT_SHOTS.map((shot) => (
          <figure key={shot.alt} className={`reveal ${CARD} p-4 sm:p-5`}>
            <div className="overflow-hidden rounded-xl border border-line bg-white">
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

      {/* Sales campaign tables: one card, each screenshot in its own white
          box with a gap between, so they read as two shots rather than one
          long table. Never wider than their native 930px so the numbers stay
          sharp; phones scroll each table sideways instead of shrinking the
          text past readable. */}
      <figure className={`reveal ${CARD} mx-auto max-w-243 space-y-3 p-4 sm:space-y-4 sm:p-5`}>
        {SALES_TABLE_SHOTS.map((shot, index) => (
          <div
            key={shot.alt}
            role="region"
            aria-label={`Sales campaigns, table ${index + 1}`}
            tabIndex={0}
            className="no-scrollbar overflow-x-auto rounded-xl border border-line bg-white"
          >
            <Image
              src={shot.src}
              alt={shot.alt}
              quality={85}
              placeholder="blur"
              sizes="(min-width: 1024px) 930px, 640px"
              className="block h-auto w-full min-w-160"
            />
          </div>
        ))}
      </figure>

      {/* Instagram Insights: phone screenshots in a 3D depth carousel.
          Drag, swipe, use the arrows/dots, or arrow keys when focused.
          Phones: height follows the width-scaled card (plus room for the
          dots), so narrow screens don't get a gap under it. */}
      <div className="relative h-[min(calc(133vw+36px),620px)] overflow-x-clip sm:h-175 md:h-190">
        <DepthCarousel
          label="Instagram Insights results"
          items={INSIGHT_SHOTS.map((shot) => ({
            image: shot.src,
            alt: shot.alt,
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
          /* No blur: re-blurring every card on each frame of a slide
             change made page scrolling stutter. The tint does the depth. */
          blur={0}
          tint="#05060a"
          /* 1.3s with a long ease-out tail felt sluggish. */
          duration={800}
          ease="power3.out"
          autoplay
          /* Counts from when a slide starts moving: 0.8s move + ~1.5s rest. */
          autoplayDelay={2300}
          loop
          showControls
          showIndicators
        />
      </div>
    </div>
  );
}
