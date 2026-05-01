"use client";

import { motion } from "framer-motion";

/**
 * Editorial hero visual — pure SVG/CSS composition.
 * Stacked architectural forms + animated gold/moss blobs + paper grain.
 * No external assets required.
 */
export default function HeroVisual() {
  return (
    <div className="relative aspect-[4/5] w-full overflow-hidden border border-ink/15 bg-cream-50 ring-paper">
      {/* Animated colour blobs */}
      <motion.div
        aria-hidden
        className="absolute -left-10 -top-10 h-72 w-72 rounded-full bg-gold/30 blur-3xl"
        animate={{ x: [0, 30, -10, 0], y: [0, -20, 20, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-12 -right-8 h-80 w-80 rounded-full bg-moss/30 blur-3xl"
        animate={{ x: [0, -25, 15, 0], y: [0, 25, -15, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute left-1/3 top-1/2 h-56 w-56 rounded-full bg-rust/20 blur-3xl"
        animate={{ scale: [1, 1.15, 0.95, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Architectural SVG composition */}
      <svg
        viewBox="0 0 400 500"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          <linearGradient id="goldFade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9a961" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#8a6a32" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="mossFade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#5a7a5e" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#3f5a44" stopOpacity="0.85" />
          </linearGradient>
          <pattern
            id="lines"
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
          >
            <path d="M0 6 L6 0" stroke="#0e0e0c" strokeOpacity="0.18" strokeWidth="0.6" />
          </pattern>
        </defs>

        {/* Tall ink column */}
        <rect x="58" y="120" width="78" height="320" fill="#0e0e0c" />
        {/* Hatched panel */}
        <rect x="146" y="170" width="120" height="270" fill="url(#lines)" />
        {/* Gold tower */}
        <rect x="276" y="60" width="60" height="380" fill="url(#goldFade)" />
        {/* Moss block */}
        <rect x="146" y="330" width="120" height="110" fill="url(#mossFade)" />
        {/* Cream stripe across */}
        <rect x="0" y="260" width="400" height="14" fill="#fbf8f1" />
        {/* Gold dot orbit */}
        <circle cx="320" cy="92" r="6" fill="#c9a961" />
        <circle cx="100" cy="160" r="4" fill="#a85a3a" />
        {/* Plinth shadow */}
        <rect x="0" y="438" width="400" height="62" fill="#0e0e0c" fillOpacity="0.05" />
      </svg>

      {/* Index labels */}
      <div className="absolute left-6 top-6 font-mono text-[0.65rem] uppercase tracking-wider2 text-ink/70">
        Fig. 01 — Composition
      </div>
      <div className="absolute right-6 top-6 font-mono text-[0.65rem] uppercase tracking-wider2 text-ink/70">
        2026 / I
      </div>

      {/* "Currently" badge */}
      <div className="absolute bottom-6 left-6 right-6 border border-ink/20 bg-cream-50/90 p-5 backdrop-blur">
        <p className="font-mono text-[0.65rem] uppercase tracking-wider2 text-gold">
          ⟶ Currently
        </p>
        <p className="mt-2 font-display text-lg leading-snug text-ink">
          Graduate Research Assistant — RG-SIM+
        </p>
        <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-wider2 text-ink/60">
          Akure · Nigeria
        </p>
      </div>

      {/* Corner registration marks */}
      {[
        "left-3 top-3",
        "right-3 top-3 rotate-90",
        "right-3 bottom-3 rotate-180",
        "left-3 bottom-3 -rotate-90",
      ].map((c, i) => (
        <span
          key={i}
          className={`absolute h-3 w-3 ${c}`}
          aria-hidden
          style={{
            borderTop: "1px solid rgba(14,14,12,0.5)",
            borderLeft: "1px solid rgba(14,14,12,0.5)",
          }}
        />
      ))}
    </div>
  );
}
