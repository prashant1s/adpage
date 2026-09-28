'use client';

/* Adapted from React Bits "DepthCarousel" (reactbits.dev/components/depth-carousel).
   Changes for this page:
   - items can carry a title + caption, rendered above the image
   - images go through next/image (accepts static imports)
   - the wheel handler only reacts to horizontal scrolling, so vertical page
     scroll never gets trapped while the cursor is over the carousel
   - a drag no longer counts as a click on the card under the pointer
   - performance: darkening uses a cheap overlay instead of a brightness()
     filter, blur is desktop-only, hidden cards are taken out of rendering,
     and autoplay pauses while the carousel is off screen
   - colours follow the site's card / accent tokens */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  PointerEvent as ReactPointerEvent,
  KeyboardEvent as ReactKeyboardEvent
} from 'react';
import Image, { type StaticImageData } from 'next/image';
import gsap from 'gsap';

export type DepthCarouselItem = {
  image: string | StaticImageData;
  alt?: string;
  title?: string;
  caption?: string;
};
type TiltDirection = 'left' | 'right';

export interface DepthCarouselProps {
  items: DepthCarouselItem[];
  cardWidth?: number;
  cardHeight?: number;
  radius?: number;
  tint?: string;
  depth?: number;
  spread?: number;
  tilt?: number;
  tiltDirection?: TiltDirection;
  perspective?: number;
  visibleCards?: number;
  falloff?: number;
  blur?: number;
  duration?: number;
  ease?: string;
  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  showControls?: boolean;
  showIndicators?: boolean;
  label?: string;
  /* 'top': title/caption above the image (proof screenshots).
     'overlay': full-bleed image with the text over a bottom fade (photos). */
  captionPlacement?: 'top' | 'overlay';
  onChange?: (index: number, item: DepthCarouselItem) => void;
  className?: string;
}

interface CarouselConfig {
  count: number;
  depth: number;
  spread: number;
  tilt: number;
  tiltDirection: TiltDirection;
  visibleCards: number;
  falloff: number;
  blur: number;
  duration: number;
  ease: string;
  loop: boolean;
  cardWidth: number;
  cardHeight: number;
  autoplayDelay: number;
}

interface DragState {
  x: number;
  startPos: number;
  lastX: number;
  lastT: number;
  v: number;
  moved: boolean;
  id: number;
}

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);

const DepthCarousel = ({
  items,
  cardWidth = 300,
  cardHeight = 380,
  radius = 18,
  tint = '#05060a',
  depth = 220,
  spread = 90,
  tilt = 22,
  tiltDirection = 'right',
  perspective = 1400,
  visibleCards = 4,
  falloff = 0.2,
  blur = 6,
  duration = 700,
  ease = 'power3.out',
  autoplay = false,
  autoplayDelay = 3200,
  loop = true,
  showControls = true,
  showIndicators = true,
  label = 'Carousel',
  captionPlacement = 'top',
  onChange,
  className = ''
}: DepthCarouselProps) => {
  const data = useMemo(() => (Array.isArray(items) ? items : []), [items]);
  const count = data.length;

  const rootRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const overlayRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const posRef = useRef(0);
  const focusRef = useRef(0);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const scaleRef = useRef(1);
  const cfgRef = useRef<CarouselConfig>({} as CarouselConfig);
  const onChangeRef = useRef(onChange);

  const dragRef = useRef<DragState | null>(null);
  /* Set when a drag ends, so the click that follows pointerup is ignored. */
  const suppressClickRef = useRef(false);
  const wheelTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const reducedRef = useRef(false);
  /* Phones / touch devices: no blur filter, fewer cards stacked behind.
     Per-frame CSS filters on 10+ large layers is what makes mobile lag. */
  const liteRef = useRef(false);
  /* Autoplay only runs while the carousel is actually on screen. */
  const inViewRef = useRef(false);
  const widthRef = useRef(0);
  const heightRef = useRef(0);

  /* Scale cards to fit the container. On phones the card gets most of the
     width (a small peek of the next one); on desktop room is left for the
     full fan of cards on the side. */
  const fitScale = useCallback(() => {
    const cfg = cfgRef.current;
    const spread = Math.abs(cfg.spread);
    const needed = liteRef.current ? cfg.cardWidth + spread * 0.6 + 24 : cfg.cardWidth + spread * 2 + 120;
    const byWidth = widthRef.current / needed;
    // Leave ~88px for the dots below the card so they never overlap it.
    const byHeight = heightRef.current > 0 ? (heightRef.current - 88) / cfg.cardHeight : 1;
    scaleRef.current = clamp(Math.min(byWidth, byHeight), 0.4, 1);
  }, []);

  const [active, setActive] = useState(0);

  useEffect(() => {
    onChangeRef.current = onChange;
    cfgRef.current = {
      count,
      depth,
      spread,
      tilt,
      tiltDirection,
      visibleCards,
      falloff,
      blur,
      duration,
      ease,
      loop,
      cardWidth,
      cardHeight,
      autoplayDelay
    };
  });

  const layout = useCallback((pos: number) => {
    const cfg = cfgRef.current;
    const n = cfg.count;
    if (!n) return;
    const dir = cfg.tiltDirection === 'left' ? -1 : 1;
    const sc = scaleRef.current;

    for (let i = 0; i < n; i++) {
      const el = cardRefs.current[i];
      if (!el) continue;

      let d = i - pos;
      if (cfg.loop && n > 1) {
        d = ((d % n) + n) % n;
        if (d > n / 2) d -= n;
      }

      const back = Math.max(0, d);
      const az = Math.abs(d);
      const lite = liteRef.current;
      const maxVisible = lite ? Math.min(cfg.visibleCards, 2) : cfg.visibleCards;
      const shown = az <= maxVisible + 0.5;

      const tz = -cfg.depth * d;
      const tx = dir * cfg.spread * d;
      const ry = dir * cfg.tilt * clamp(d, 0, 1);

      let opacity = d < 0 ? Math.max(0, 1 + d) : 1;
      if (!shown) opacity = 0;

      const blurPx =
        !lite && cfg.blur > 0 ? Math.min(cfg.blur, (back / Math.max(1, cfg.visibleCards)) * cfg.blur) : 0;
      const zi = Math.round(2000 - d * 20);

      el.style.transform = `translate(-50%, -50%) scale(${sc}) translateX(${tx.toFixed(2)}px) translateZ(${tz.toFixed(2)}px) rotateY(${ry.toFixed(3)}deg)`;
      el.style.opacity = opacity.toFixed(3);
      el.style.filter = blurPx > 0.05 ? `blur(${blurPx.toFixed(2)}px)` : 'none';
      el.style.visibility = opacity > 0.001 ? 'visible' : 'hidden';
      el.style.zIndex = String(zi);
      el.style.pointerEvents = shown && opacity > 0.05 ? 'auto' : 'none';

      // Darkening for cards further back. A plain opacity change on the
      // overlay is cheap; the old brightness() filter was not.
      const ov = overlayRefs.current[i];
      if (ov) ov.style.opacity = clamp(back * cfg.falloff * 1.6, 0, 0.9).toFixed(3);
    }
  }, []);

  const notify = useCallback(
    (idx: number) => {
      setActive(idx);
      onChangeRef.current?.(idx, data[idx]);
    },
    [data]
  );

  const tweenTo = useCallback(
    (target: number, animate: boolean) => {
      tweenRef.current?.kill();
      const cfg = cfgRef.current;
      const proxy = { p: posRef.current };
      const dur = animate && !reducedRef.current ? cfg.duration / 1000 : 0;
      tweenRef.current = gsap.to(proxy, {
        p: target,
        duration: dur,
        ease: cfg.ease,
        onUpdate: () => {
          posRef.current = proxy.p;
          layout(proxy.p);
        },
        onComplete: () => {
          const n = cfg.count;
          if (n > 0) posRef.current = ((posRef.current % n) + n) % n;
          layout(posRef.current);
        }
      });
    },
    [layout]
  );

  const setFocus = useCallback(
    (rawIndex: number, animate = true) => {
      const cfg = cfgRef.current;
      const n = cfg.count;
      if (!n) return;
      const idx = cfg.loop ? ((rawIndex % n) + n) % n : clamp(rawIndex, 0, n - 1);
      let delta = idx - posRef.current;
      if (cfg.loop && n > 1) {
        delta = ((delta % n) + n) % n;
        if (delta > n / 2) delta -= n;
      }
      tweenTo(posRef.current + delta, animate);
      if (idx !== focusRef.current) {
        focusRef.current = idx;
        notify(idx);
      }
    },
    [tweenTo, notify]
  );

  const navigateBy = useCallback((step: number) => setFocus(focusRef.current + step, true), [setFocus]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const media = window.matchMedia('(max-width: 767px), (pointer: coarse)');
    const syncLite = () => {
      liteRef.current = media.matches;
      fitScale();
      layout(posRef.current);
    };
    syncLite();
    media.addEventListener('change', syncLite);

    const io = new IntersectionObserver(([entry]) => {
      inViewRef.current = entry.isIntersecting;
    });
    io.observe(root);

    return () => {
      media.removeEventListener('change', syncLite);
      io.disconnect();
    };
  }, [layout, fitScale]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver(entries => {
      widthRef.current = entries[0].contentRect.width;
      heightRef.current = entries[0].contentRect.height;
      fitScale();
      layout(posRef.current);
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [layout, fitScale]);

  /* Horizontal wheel / trackpad swipes only. Vertical wheel is left alone
     so the page keeps scrolling normally over the carousel. */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      const cfg = cfgRef.current;
      if (cfg.count < 2) return;
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      tweenRef.current?.kill();
      const delta = e.deltaMode === 1 ? e.deltaX * 24 : e.deltaX;
      const step = clamp(delta / (cfg.cardWidth * 0.9), -0.6, 0.6);
      posRef.current += step;
      layout(posRef.current);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      wheelTimerRef.current = setTimeout(() => setFocus(Math.round(posRef.current), true), 130);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
    };
  }, [layout, setFocus]);

  const onPointerDown = useCallback((e: ReactPointerEvent<HTMLDivElement>) => {
    const cfg = cfgRef.current;
    if (cfg.count < 2) return;
    tweenRef.current?.kill();
    suppressClickRef.current = false;
    dragRef.current = {
      x: e.clientX,
      startPos: posRef.current,
      lastX: e.clientX,
      lastT: performance.now(),
      v: 0,
      moved: false,
      id: e.pointerId
    };
  }, []);

  const onPointerMove = useCallback(
    (e: ReactPointerEvent<HTMLDivElement>) => {
      const drag = dragRef.current;
      if (!drag) return;
      const cfg = cfgRef.current;
      const stepPx = Math.max(cfg.cardWidth * 0.55 * scaleRef.current, 40);
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 4) {
        drag.moved = true;
        rootRef.current?.setPointerCapture(drag.id);
      }
      if (!drag.moved) return;
      const now = performance.now();
      const dt = Math.max(now - drag.lastT, 1);
      drag.v = (e.clientX - drag.lastX) / dt;
      drag.lastX = e.clientX;
      drag.lastT = now;
      posRef.current = drag.startPos - dx / stepPx;
      layout(posRef.current);
    },
    [layout]
  );

  const onPointerEnd = useCallback(() => {
    const drag = dragRef.current;
    if (!drag) return;
    dragRef.current = null;
    if (!drag.moved) {
      // Nothing moved: let the click through, but still settle on a card
      // in case a tween was interrupted by this press.
      setFocus(Math.round(posRef.current), true);
      return;
    }
    suppressClickRef.current = true;
    const cfg = cfgRef.current;
    const stepPx = Math.max(cfg.cardWidth * 0.55 * scaleRef.current, 40);
    const projected = posRef.current - (drag.v * 180) / stepPx;
    setFocus(Math.round(projected), true);
  }, [setFocus]);

  const onKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        navigateBy(-1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        navigateBy(1);
      }
    },
    [navigateBy]
  );

  const onCardClick = useCallback(
    (index: number) => {
      if (suppressClickRef.current) {
        suppressClickRef.current = false;
        return;
      }
      setFocus(index, true);
    },
    [setFocus]
  );

  useEffect(() => {
    reducedRef.current = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!autoplay || reducedRef.current || count < 2) return;
    const root = rootRef.current;
    let hovered = false;
    let focused = false;
    const stop = () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      autoTimerRef.current = null;
    };
    const start = () => {
      stop();
      autoTimerRef.current = setInterval(
        () => {
          if (!hovered && !focused && !document.hidden && inViewRef.current) navigateBy(1);
        },
        Math.max(cfgRef.current.autoplayDelay, 600)
      );
    };
    const onEnter = () => {
      hovered = true;
    };
    const onLeave = () => {
      hovered = false;
    };
    const onFocusIn = () => {
      focused = true;
    };
    const onFocusOut = () => {
      focused = false;
    };
    root?.addEventListener('mouseenter', onEnter);
    root?.addEventListener('mouseleave', onLeave);
    root?.addEventListener('focusin', onFocusIn);
    root?.addEventListener('focusout', onFocusOut);
    start();
    return () => {
      stop();
      root?.removeEventListener('mouseenter', onEnter);
      root?.removeEventListener('mouseleave', onLeave);
      root?.removeEventListener('focusin', onFocusIn);
      root?.removeEventListener('focusout', onFocusOut);
    };
  }, [autoplay, autoplayDelay, count, navigateBy]);

  useEffect(() => {
    layout(posRef.current);
  }, [layout, depth, spread, tilt, tiltDirection, visibleCards, falloff, blur, cardWidth, cardHeight, radius, count]);

  useEffect(
    () => () => {
      tweenRef.current?.kill();
      if (wheelTimerRef.current) clearTimeout(wheelTimerRef.current);
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    },
    []
  );

  return (
    <div
      ref={rootRef}
      className={`relative flex h-full min-h-80 w-full cursor-grab touch-pan-y select-none items-center justify-center outline-none [perspective-origin:50%_50%] active:cursor-grabbing focus-visible:rounded-xl focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-4 ${className}`.trim()}
      style={{ perspective: `${perspective}px` }}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerEnd}
      onPointerCancel={onPointerEnd}
      onKeyDown={onKeyDown}
    >
      <div className="absolute inset-0 transform-3d">
        {data.map((item, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 flex cursor-pointer flex-col overflow-hidden border border-line bg-raised shadow-[0_30px_60px_-20px_rgba(0,0,0,0.65),0_8px_20px_-10px_rgba(0,0,0,0.5)] [transform:translate(-50%,-50%)] origin-center will-change-[transform,opacity]"
            ref={el => {
              cardRefs.current[i] = el;
            }}
            style={{ width: cardWidth, height: cardHeight, borderRadius: radius }}
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}${item.title ? `: ${item.title}` : ''}`}
            aria-hidden={active !== i}
            onClick={() => onCardClick(i)}
          >
            {captionPlacement === 'top' && (item.title || item.caption) && (
              <div className="shrink-0 px-4 pt-5 pb-4 text-center">
                {item.title && (
                  <p className="text-h3 font-bold text-accent-soft text-balance">{item.title}</p>
                )}
                {item.caption && <p className="mt-1 text-micro text-subtle">{item.caption}</p>}
              </div>
            )}
            <div
              className={`relative min-h-0 flex-1 overflow-hidden ${
                captionPlacement === 'top' && (item.title || item.caption)
                  ? 'mx-3 mb-3 rounded-xl border border-line'
                  : ''
              }`}
            >
              <Image
                src={item.image}
                alt={item.alt || ''}
                fill
                sizes={`${cardWidth}px`}
                draggable={false}
                className={`pointer-events-none select-none object-cover [-webkit-user-drag:none] ${
                  captionPlacement === 'top' ? 'object-top' : 'object-center'
                }`}
              />
              {/* Overlay captions: full-bleed photo, text on a bottom fade. */}
              {captionPlacement === 'overlay' && (item.title || item.caption) && (
                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/40 to-transparent px-5 pt-16 pb-5">
                  {item.title && <p className="text-h3 font-bold text-white">{item.title}</p>}
                  {item.caption && <p className="mt-0.5 text-micro text-white/75">{item.caption}</p>}
                </div>
              )}
            </div>
            <span
              className="pointer-events-none absolute inset-0 opacity-0"
              ref={el => {
                overlayRefs.current[i] = el;
              }}
              style={{ background: tint }}
            />
          </div>
        ))}
      </div>

      {showControls && count > 1 && (
        <>
          <button
            type="button"
            className="absolute top-1/2 left-2 z-3000 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-[rgba(18,20,26,0.85)] text-white md:backdrop-blur-md transition-[background,border-color,transform] duration-200 hover:border-accent hover:bg-[rgba(28,31,40,0.9)] active:scale-95 sm:left-4"
            aria-label="Previous slide"
            onClick={() => navigateBy(-1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            className="absolute top-1/2 right-2 z-3000 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full border border-white/20 bg-[rgba(18,20,26,0.85)] text-white md:backdrop-blur-md transition-[background,border-color,transform] duration-200 hover:border-accent hover:bg-[rgba(28,31,40,0.9)] active:scale-95 sm:right-4"
            aria-label="Next slide"
            onClick={() => navigateBy(1)}
          >
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {showIndicators && count > 1 && (
        <div
          className="absolute bottom-0 left-1/2 z-3000 flex -translate-x-1/2 gap-2 rounded-full bg-[rgba(14,16,22,0.8)] px-3 py-2 md:backdrop-blur-sm"
          role="tablist"
          aria-label="Slides"
        >
          {data.map((item, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={active === i}
              aria-label={`Go to slide ${i + 1}${item.title ? `: ${item.title}` : ''}`}
              className={`h-1.75 cursor-pointer rounded-full transition-[width,background] duration-250 ${
                active === i ? 'w-5 bg-accent' : 'w-1.75 bg-white/30'
              }`}
              onClick={() => setFocus(i, true)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default DepthCarousel;
