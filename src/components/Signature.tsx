/**
 * Signature — handwriting-styled "Oladoyin" mark, rendered as an inline
 * Playfair italic with a hand-drawn underline scribble. Decorative.
 */
export default function Signature({
  className = "",
  size = "text-4xl md:text-5xl",
}: {
  className?: string;
  size?: string;
}) {
  return (
    <span className={`inline-block ${className}`}>
      <span className={`font-display italic ${size} leading-none text-ink`}>
        Oladoyin<span className="text-gold">.</span>
      </span>
      <svg
        aria-hidden
        viewBox="0 0 220 18"
        className="mt-1 block h-3 w-44 text-gold"
        preserveAspectRatio="none"
      >
        <path
          d="M2 10 Q 30 2, 60 8 T 120 8 T 180 7 Q 200 7, 215 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
