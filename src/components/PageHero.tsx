import Image from "next/image";
import Reveal, { RevealText } from "./Reveal";
import Marquee from "./Marquee";

interface MetaRow {
  k: string;
  v: string;
}

export default function PageHero({
  index,
  eyebrow,
  title,
  subtitle,
  marquee,
  portrait,
  portraitAlt = "Oladoyin Akintola",
  portraitPosition = "center 25%",
  meta,
  accent = "gold",
}: {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  marquee?: string[];
  portrait?: string;
  portraitAlt?: string;
  portraitPosition?: string;
  meta?: MetaRow[];
  accent?: "gold" | "moss" | "rust";
}) {
  const accentMap = {
    gold: { bar: "bg-gold", chip: "text-gold", glow: "bg-gold/20" },
    moss: { bar: "bg-moss", chip: "text-moss", glow: "bg-moss/25" },
    rust: { bar: "bg-rust", chip: "text-rust", glow: "bg-rust/20" },
  } as const;
  const a = accentMap[accent];

  return (
    <section className="relative overflow-hidden border-b border-ink/15 bg-paper-warm pt-36 pb-20 md:pt-44 md:pb-24">
      {/* color glows */}
      <div className={`pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full ${a.glow} blur-3xl animate-blob`} />
      <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-moss/15 blur-3xl animate-blob" />

      {/* decorative scaffolding */}
      <div aria-hidden className={`absolute left-0 top-32 h-1 w-1/3 ${a.bar} md:top-40`} />
      <div aria-hidden className="absolute right-0 bottom-20 h-1 w-1/4 bg-ink/30 hidden md:block" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 bg-ink/10 lg:block"
      />

      <span className={`corner-sticker right-6 top-32 md:right-12 md:top-40 ${a.chip}`}>
        ¶ {index} · {eyebrow}
      </span>

      <div className="container-x relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* COPY */}
          <div className={portrait ? "lg:col-span-8" : "lg:col-span-12"}>
            <Reveal>
              <div className="flex flex-wrap items-center gap-4 font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/60">
                <span className={a.chip}>[{index}]</span>
                <span className="h-px w-12 bg-ink/30" />
                <span>{eyebrow}</span>
                <span className="h-px w-12 bg-ink/30" />
                <span className="text-ink/40">MMXXVI · WAT</span>
              </div>
            </Reveal>

            <h1
              className={`display mt-8 text-ink ${
                portrait
                  ? "text-5xl md:text-7xl lg:text-[8rem]"
                  : "text-6xl md:text-8xl lg:text-[10rem]"
              }`}
            >
              <RevealText text={title} />
            </h1>

            {subtitle && (
              <Reveal delay={0.3}>
                <p className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-ink/70 md:text-xl">
                  {subtitle}
                </p>
              </Reveal>
            )}

            {meta && meta.length > 0 && (
              <Reveal delay={0.4}>
                <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-sm bg-ink/15 sm:max-w-2xl sm:grid-cols-3">
                  {meta.map(({ k, v }) => (
                    <div key={k} className="bg-cream-50/85 p-4 backdrop-blur-sm">
                      <p className="font-mono text-[0.6rem] uppercase tracking-wider2 text-ink/50">
                        {k}
                      </p>
                      <p className="mt-1.5 font-display text-base text-ink md:text-lg">
                        {v}
                      </p>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}
          </div>

          {/* PORTRAIT */}
          {portrait && (
            <Reveal delay={0.2} className="lg:col-span-4">
              <div className="relative mx-auto max-w-sm lg:max-w-none">
                <div
                  aria-hidden
                  className={`absolute -left-3 -top-3 h-full w-full border-2 ${a.bar.replace("bg-", "border-")}`}
                />
                <div className="relative aspect-[4/5] overflow-hidden bg-ink ring-paper">
                  <Image
                    src={portrait}
                    alt={portraitAlt}
                    fill
                    sizes="(min-width:1024px) 30vw, 80vw"
                    style={{ objectPosition: portraitPosition }}
                    className="object-cover saturate-[1.05]"
                  />
                  <div
                    aria-hidden
                    className={`absolute left-0 top-0 h-2 w-1/2 ${a.bar}`}
                  />
                  <div
                    aria-hidden
                    className="absolute bottom-0 right-0 h-2 w-1/3 bg-ink/70"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-wider2 text-ink/55">
                  <span className={a.chip}>Plate / {index}</span>
                  <span>Editor's portrait</span>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>

      {marquee && marquee.length > 0 && (
        <div className="mt-20 border-t border-b border-ink/15 bg-cream-100/50 py-6">
          <Marquee
            items={marquee.map((m, i) => (
              <span
                key={i}
                className="font-display text-3xl italic text-ink/80 md:text-4xl"
              >
                {m}
              </span>
            ))}
          />
        </div>
      )}
    </section>
  );
}
