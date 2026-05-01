import Image from "next/image";

interface FigurePlateProps {
  src: string;
  alt: string;
  fig?: string;
  caption?: string;
  aspect?: string;
  className?: string;
  priority?: boolean;
  /** color accent shown on overlay & caption tag */
  accent?: "gold" | "moss" | "rust" | "ink";
  /** clip-path style — sharp bezel cuts */
  shape?: "bezel" | "bezel-alt" | "slash" | "none";
  /** CSS object-position value (e.g. "30% 25%") to keep subject in frame */
  position?: string;
}

const accentMap = {
  gold: { bar: "bg-gold", text: "text-gold", glow: "from-gold/50" },
  moss: { bar: "bg-moss", text: "text-moss", glow: "from-moss/50" },
  rust: { bar: "bg-rust", text: "text-rust", glow: "from-rust/50" },
  ink: { bar: "bg-ink", text: "text-ink", glow: "from-ink/50" },
};

const shapeMap = {
  bezel: "clip-bezel",
  "bezel-alt": "clip-bezel-alt",
  slash: "clip-slash",
  none: "",
};

export default function FigurePlate({
  src,
  alt,
  fig = "Fig.",
  caption,
  aspect = "aspect-[4/5]",
  className = "",
  priority = false,
  accent = "gold",
  shape = "bezel",
  position = "center top",
}: FigurePlateProps) {
  const a = accentMap[accent];
  const s = shapeMap[shape];

  return (
    <figure className={`group ${className}`}>
      <div
        className={`relative w-full overflow-hidden bg-ink ring-bold ${aspect} ${s}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={priority}
          style={{ objectPosition: position }}
          className="object-cover saturate-[1.2] transition-transform duration-[1.4s] group-hover:scale-[1.06]"
        />
        <div
          aria-hidden
          className={`pointer-events-none absolute inset-0 bg-gradient-to-tr ${a.glow} via-transparent to-transparent opacity-70 mix-blend-soft-light transition-opacity duration-700 group-hover:opacity-30`}
        />
        <div aria-hidden className={`absolute left-0 top-0 h-1.5 w-24 ${a.bar}`} />
        <div aria-hidden className={`absolute bottom-0 right-0 h-1.5 w-24 ${a.bar}`} />
      </div>
      {(fig || caption) && (
        <figcaption className="mt-4 flex items-baseline justify-between gap-4 font-mono text-[0.65rem] uppercase tracking-wider2 text-ink/70">
          {fig && (
            <span className="inline-block bg-ink px-3 py-1 text-cream-50 clip-tag font-medium">
              <span className={a.text}>●</span> {fig}
            </span>
          )}
          {caption && <span className="text-right text-ink/65">{caption}</span>}
        </figcaption>
      )}
    </figure>
  );
}

