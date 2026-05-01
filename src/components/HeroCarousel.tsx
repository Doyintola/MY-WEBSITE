"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
  src: string;
  alt: string;
  tint: "gold" | "moss" | "rust" | "ink";
  label: string;
  caption: string;
  /** CSS object-position; defaults to "right center" (subject sits to the right). */
  position?: string;
}

const slides: Slide[] = [
  {
    src: "/portraits/doyin-hero-1.jpg",
    alt: "Oladoyin Akintola — outside a contemporary research building",
    tint: "gold",
    label: "Plate / 01",
    caption: "Oladoyin A. Akintola · Researcher & Consultant",
  },
  {
    src: "/portraits/doyin-hero-3.jpg",
    alt: "Oladoyin Akintola delivering a keynote on net-zero infrastructure",
    tint: "ink",
    label: "Plate / 02",
    caption: "Keynote · Net-Zero Infrastructure Forum",
  },
  {
    src: "/portraits/doyin-hero-2.jpg",
    alt: "Oladoyin Akintola — editorial portrait",
    tint: "rust",
    label: "Plate / 03",
    caption: "Field convening · Pan-Atlantic University",
  },
  {
    src: "/portraits/doyin-research.jpg",
    alt: "Oladoyin Akintola — studio portrait, warm interior",
    tint: "moss",
    label: "Plate / 04",
    caption: "B.Tech (1ˢᵗ Class) Quantity Surveying · FUTA",
    position: "55% 22%",
  },
];

const tintGradient: Record<Slide["tint"], string> = {
  gold: "from-ink/50 via-transparent to-transparent",
  moss: "from-ink/55 via-transparent to-transparent",
  rust: "from-ink/55 via-transparent to-transparent",
  ink: "from-ink/60 via-ink/30 to-transparent",
};

const tintBar: Record<Slide["tint"], string> = {
  gold: "bg-gold",
  moss: "bg-moss",
  rust: "bg-rust",
  ink: "bg-cream-50",
};

export default function HeroCarousel({ children }: { children: React.ReactNode }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  const active = slides[idx];

  return (
    <div className="relative h-[100svh] min-h-[680px] w-full overflow-hidden bg-ink">
      {/* slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src={active.src}
            alt={active.alt}
            fill
            priority={idx === 0}
            sizes="100vw"
            style={{ objectPosition: active.position ?? "right center" }}
            className="object-cover saturate-[1.1]"
          />
          {/* tinted gradient overlay (left-side darken so headline stays legible) */}
          <div
            aria-hidden
            className={`absolute inset-0 bg-gradient-to-r ${tintGradient[active.tint]}`}
          />
          {/* color band stripe for energy */}
          <div
            aria-hidden
            className={`absolute left-0 top-0 h-2 w-1/3 ${tintBar[active.tint]}`}
          />
          <div
            aria-hidden
            className={`absolute bottom-0 right-0 h-2 w-1/2 ${tintBar[active.tint]}`}
          />
        </motion.div>
      </AnimatePresence>

      {/* scrim for readability — left side only */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-r from-ink/40 via-ink/15 to-transparent"
      />

      {/* content */}
      <div className="relative z-10 flex h-full flex-col">
        {children}

        {/* slide indicator + caption */}
        <div className="container-x mt-auto pb-10">
          <div className="flex flex-wrap items-end justify-between gap-6 border-t border-cream-50/20 pt-6 font-mono text-[0.7rem] uppercase tracking-wider2 text-cream-50/80">
            <div className="flex items-center gap-4">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setIdx(i)}
                  aria-label={`Slide ${i + 1}`}
                  className="group flex items-center gap-2"
                >
                  <span
                    className={`h-px transition-all duration-500 ${
                      i === idx ? "w-12 bg-gold" : "w-6 bg-cream-50/40"
                    }`}
                  />
                  <span
                    className={`text-[0.6rem] ${
                      i === idx ? "text-gold" : "text-cream-50/50"
                    }`}
                  >
                    0{i + 1}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gold">●</span>
              <span>{active.label}</span>
              <span className="text-cream-50/40">/</span>
              <span className="text-cream-50/70">{active.caption}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
