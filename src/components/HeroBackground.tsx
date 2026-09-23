"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const GhostFibers = dynamic(() => import("@/components/GhostFibers"), {
  ssr: false,
});

/**
 * The GhostFibers shader is a full-viewport fragment shader running every
 * frame. On phones that costs real LCP, INP and battery for a decorative
 * background, so we only mount it on wider screens with a pointer and no
 * reduced-motion preference. Everything else gets the CSS gradient, which is
 * also what renders during SSR.
 */
export default function HeroBackground() {
  const [useShader, setUseShader] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const sync = () => setUseShader(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  if (!useShader) {
    return <div aria-hidden className="hero-fallback absolute inset-0" />;
  }

  return (
    <div aria-hidden className="absolute inset-0">
      <GhostFibers
        lineColor="#1a1040"
        glowColor="#3b82f6"
        speed={0.18}
        scale={2.2}
        rotation={-15}
        rotationSpeed={0.12}
        layers={6}
        waveAmplitude={0.018}
        waveFrequency={3.5}
        waveSpeed={0.12}
        layerSpeed={0.06}
        twist={0.12}
        twistFrequency={5}
        twistSpeed={1.0}
        lineFrequency={5}
        lineSpacing={2}
        lineSharpness={18}
        glowFalloff={8}
        glowIntensity={2.0}
        brightness={2.2}
        blueBoost={1.4}
        vignette={0.6}
        grain={0.03}
        dpr={1}
        fps={60}
      />
    </div>
  );
}
