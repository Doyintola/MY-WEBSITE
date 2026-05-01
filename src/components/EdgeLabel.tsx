"use client";

/**
 * EdgeLabel — sticky vertical text running down the page gutter.
 * Renders only on >=lg viewports. Pure decoration.
 */
export default function EdgeLabel({
  text = "ISSUE Nº 01 — VOLUME I — 2026",
  side = "left",
}: {
  text?: string;
  side?: "left" | "right";
}) {
  const pos = side === "left" ? "left-3" : "right-3";
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed bottom-12 ${pos} z-20 hidden select-none lg:block`}
    >
      <div className="flex flex-col items-center gap-3">
        <span className="h-24 w-px bg-ink/30" />
        <span className="vertical-tag text-ink/55">{text}</span>
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold" />
      </div>
    </div>
  );
}
