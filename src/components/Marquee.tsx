import { ReactNode } from "react";

export default function Marquee({
  items,
  reverse = false,
  className = "",
  separator = "✦",
}: {
  items: ReactNode[];
  reverse?: boolean;
  className?: string;
  separator?: string;
}) {
  const loop = [...items, ...items];
  return (
    <div className={`relative flex overflow-hidden ${className}`}>
      <div
        className={`flex shrink-0 items-center gap-10 whitespace-nowrap pr-10 ${
          reverse ? "animate-marquee-rev" : "animate-marquee"
        }`}
      >
        {loop.map((it, i) => (
          <span key={i} className="flex items-center gap-10">
            <span>{it}</span>
            <span className="text-gold/70">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
