import Link from "next/link";
import Image from "next/image";
import {
  Building2,
  Leaf,
  Brain,
  Calculator,
  Handshake,
  CircleDashed,
  type LucideIcon,
  ArrowUpRight,
} from "lucide-react";
import Reveal, { RevealText } from "@/components/Reveal";
import Marquee from "@/components/Marquee";
import Magnetic from "@/components/Magnetic";
import HeroCarousel from "@/components/HeroCarousel";
import FigurePlate from "@/components/FigurePlate";
import Signature from "@/components/Signature";
import { prisma } from "@/lib/db";
import { getContent, content } from "@/lib/content";

export const dynamic = "force-dynamic";

const ICONS: Record<string, LucideIcon> = {
  Building2,
  Leaf,
  Brain,
  Calculator,
  Handshake,
  CircleDashed,
};

function parseTags(raw: string): string[] {
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export default async function Home() {
  const [copy, expertiseRows, researchRows, statsRows, marqueeRows] = await Promise.all([
    getContent(),
    prisma.expertise.findMany({ orderBy: { order: "asc" } }),
    prisma.researchPaper.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
    prisma.stat.findMany({ orderBy: { order: "asc" } }),
    prisma.marqueeItem.findMany({ orderBy: { order: "asc" } }),
  ]);

  const expertise = expertiseRows.map((e) => ({
    icon: ICONS[e.icon ?? "Building2"] ?? Building2,
    n: e.n,
    title: e.title,
    desc: e.desc,
  }));
  const research = researchRows.map((r) => ({
    year: r.year,
    journal: r.journal,
    title: r.title,
    desc: r.desc,
    tags: parseTags(r.tags),
    href: r.href ?? "#",
  }));
  const stats = statsRows.map((s) => ({ num: s.num, label: s.label, sub: s.sub ?? "" }));
  const marqueeItems = marqueeRows.map((m) => m.text);

  return (
    <>
      {/* ── HERO ───────────────────────────────────────── */}
      <HeroCarousel>
        <div className="container-x flex flex-1 flex-col justify-center pt-32 md:pt-40">
          {/* meta row */}
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[0.7rem] uppercase tracking-wider2 text-cream-50/80">
            <span className="flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-rust" />
              {content(copy, "hero.eyebrow.left", "Available for 2026 collaborations")}
            </span>
            <span>{content(copy, "hero.eyebrow.right", "Akure · Lagos · Worldwide / Issue Nº 01")}</span>
          </div>

          <div className="max-w-5xl">
            <h1 className="display text-[clamp(3rem,9.5vw,9.5rem)] text-cream-50 drop-shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
              <RevealText text={content(copy, "hero.title.line1", "Net-zero is")} />
              <br />
              <span className="italic text-gold-light">
                <RevealText text={content(copy, "hero.title.line2", "not a slogan.")} delay={0.2} />
              </span>
            </h1>

            <Reveal delay={0.4}>
              <p className="mt-12 max-w-2xl text-pretty text-xl leading-relaxed text-cream-50/90 md:text-2xl">
                {content(
                  copy,
                  "hero.body",
                  "I'm Oladoyin A. Akintola — a researcher, consultant, and infrastructure innovator translating decision intelligence into net-zero, circular construction for developing economies.",
                )}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <Link
                    href={content(copy, "hero.cta.primary.href", "/portfolio")}
                    className="btn bg-gold text-cream-50 clip-tag hover:bg-gold-dark"
                  >
                    <span>{content(copy, "hero.cta.primary.label", "Read the Research")}</span>
                    <span aria-hidden>↗</span>
                  </Link>
                </Magnetic>
                <Magnetic>
                  <Link
                    href={content(copy, "hero.cta.secondary.href", "/about")}
                    className="btn border border-cream-50/40 bg-cream-50/10 text-cream-50 backdrop-blur clip-tag hover:bg-cream-50 hover:text-ink"
                  >
                    <span>{content(copy, "hero.cta.secondary.label", "The Profile")}</span>
                    <span aria-hidden>→</span>
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
          </div>
        </div>
      </HeroCarousel>

      {/* ── MARQUEE ───────────────────────────────────── */}
      <div className="border-y-4 border-ink bg-gold py-7 text-ink">
        <Marquee
          items={(marqueeItems.length
            ? marqueeItems
            : [
                "Net-Zero Infrastructure",
                "Circular Construction",
                "Decision Intelligence",
                "Sustainable Development",
                "Quantity Surveying",
                "Climate-Responsive Design",
              ]
          ).map((t, i) => (
            <span
              key={i}
              className="font-display text-3xl italic text-ink md:text-5xl"
            >
              {t}
            </span>
          ))}
        />
      </div>

      {/* ── STATS ─────────────────────────────────────── */}
      <section className="bg-ink text-cream-50">
        <div className="container-x grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => {
            const colors = ["text-gold", "text-moss-light", "text-rust", "text-gold-light"];
            return (
            <Reveal
              key={s.label}
              delay={i * 0.08}
              className={`group border-cream-50/15 px-2 py-12 md:px-8 md:py-16 ${
                i < stats.length - 1 ? "lg:border-r" : ""
              } ${i < 2 ? "border-b lg:border-b-0" : ""} ${
                i % 2 === 0 ? "border-r lg:border-r" : ""
              }`}
            >
              <p className={`stat-num ${colors[i]} transition-transform group-hover:translate-x-1`}>
                {s.num}
              </p>
              <p className="mt-4 font-display text-lg text-cream-50/90">
                {s.label}
              </p>
              <p className="mt-1 font-mono text-[0.7rem] uppercase tracking-wider2 text-cream-50/50">
                {s.sub}
              </p>
            </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── EXPERTISE ─────────────────────────────────── */}
      <section className="section relative bg-paper-warm">
        <span className="corner-sticker right-6 top-6 md:right-12 md:top-12">
          ✦ Praxis · Six Axes
        </span>
        <div className="container-x">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
              <div className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/60">
                <span className="text-gold">[02]</span>
                <span className="h-px w-12 bg-ink/30" />
                <span>Practice</span>
              </div>
              <h2 className="display mt-8 text-5xl text-ink md:text-7xl">
                A research practice <em className="text-gold">at six</em>{" "}
                intersections.
              </h2>
              <p className="mt-6 max-w-md text-balance text-lg leading-relaxed text-ink/70">
                Each axis below is a working brief — projects, papers, and
                consulting threads where the climate, the cost, and the human
                converge.
              </p>
            </Reveal>

            <div className="lg:col-span-7">
              <ul className="border-t border-ink/15">
                {expertise.map(({ icon: Icon, n, title, desc }, i) => (
                  <Reveal key={title} delay={i * 0.05}>
                    <li className="group grid grid-cols-12 items-start gap-4 border-b border-ink/15 py-8 transition-colors hover:bg-cream-50/60">
                      <span className="col-span-2 font-mono text-[0.75rem] uppercase tracking-wider2 text-gold md:col-span-1">
                        {n}
                      </span>
                      <div className="col-span-9 md:col-span-9">
                        <h3 className="font-display text-2xl text-ink md:text-3xl">
                          {title}
                        </h3>
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/70 md:text-base">
                          {desc}
                        </p>
                      </div>
                      <span className="col-span-1 mt-1 text-ink/30 transition-all group-hover:rotate-45 group-hover:text-gold md:col-span-2 md:justify-self-end">
                        <Icon className="h-5 w-5" />
                      </span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── ATELIER / FIELD STUDIO ─────────────────────── */}
      <section className="relative overflow-hidden bg-blueprint">
        {/* decorative scaffolding */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-ink/20" />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-ink/20" />
        <div aria-hidden className="pointer-events-none absolute -right-32 top-24 hidden h-[420px] w-[420px] rounded-full bg-gold/15 blur-3xl md:block" />

        <div className="container-x section relative">
          <Reveal>
            <p className="dateline">
              <span className="text-gold">¶ 03</span> · The Atelier · Akure / WAT
            </p>
          </Reveal>

          <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-20">
            {/* Big offset portrait */}
            <Reveal className="relative lg:col-span-5">
              <div className="relative">
                <div
                  aria-hidden
                  className="absolute -left-4 -top-4 h-full w-full border border-ink/25"
                />
                <div className="relative aspect-[4/5] overflow-hidden ring-paper">
                  <Image
                    src="/portraits/doyin-aux-1.jpg"
                    alt="Oladoyin Akintola — studio portrait"
                    fill
                    sizes="(min-width:1024px) 40vw, 90vw"
                    style={{ objectPosition: "32% 25%" }}
                    className="object-cover"
                  />
                </div>
                <span className="corner-sticker -bottom-6 -right-2 bg-cream-50/95 px-3 py-1 ring-paper">
                  Plate 02 · Studio · 2026
                </span>
              </div>
            </Reveal>

            {/* Manifesto column */}
            <Reveal delay={0.15} className="lg:col-span-7">
              <p className="font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/55">
                ⟶ A note from the desk
              </p>
              <h2 className="display mt-6 text-balance text-5xl text-ink md:text-7xl">
                Research is{" "}
                <em className="scribble text-gold">a craft</em>,{" "}
                not a footnote.
              </h2>
              <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink/80">
                <p>
                  My desk holds three things at once — a paper draft, a
                  bill of quantities, and a policy briefing. They argue with
                  each other. That argument is the work.
                </p>
                <p>
                  Net-zero, in the markets I write for, is not a slogan
                  imported in a glossy report. It&apos;s a re-pricing of
                  what we&apos;ve normalised. I show up to that conversation
                  with numbers that earn the policy.
                </p>
              </div>

              <div className="mt-10 grid grid-cols-2 gap-px bg-ink/15 sm:grid-cols-3">
                {[
                  ["Based in", "Akure · Lagos"],
                  ["Working hours", "Mon–Fri · WAT"],
                  ["Tools", "STATA · Python · NVivo"],
                  ["Reading", "Energy Policy"],
                  ["Listening", "Afrobeats · Jazz"],
                  ["On the desk", "PhD applications"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="bg-cream-50/80 p-5 backdrop-blur-sm"
                  >
                    <p className="font-mono text-[0.62rem] uppercase tracking-wider2 text-ink/50">
                      {k}
                    </p>
                    <p className="mt-2 font-display text-base text-ink md:text-lg">
                      {v}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12 flex items-center gap-6">
                <Signature size="text-3xl md:text-4xl" />
                <span className="font-mono text-[0.62rem] uppercase tracking-wider2 text-ink/50">
                  Editor · this issue
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PULL QUOTE ─────────────────────────────────── */}
      <section className="bg-moss text-cream-50">
        <div className="container-tight section text-center">
          <Reveal>
            <p className="font-mono text-[0.72rem] uppercase tracking-wider2 text-gold-light">
              Working principle
            </p>
            <blockquote className="display mt-8 text-balance text-4xl text-cream-50 md:text-6xl lg:text-7xl">
              <span aria-hidden className="text-gold-light">
                &ldquo;
              </span>
              We will not retrofit our way to a livable future —
              <em className="italic text-gold-light"> we have to design it</em> with
              evidence, equity, and intention.
              <span aria-hidden className="text-gold-light">
                &rdquo;
              </span>
            </blockquote>
            <p className="mt-10 font-mono text-[0.72rem] uppercase tracking-wider2 text-cream-50/70">
              — O. A. Akintola, Field Notes
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── RESEARCH ──────────────────────────────────── */}
      <section className="section relative bg-paper-cool">
        <span className="corner-sticker right-6 top-6 md:right-12 md:top-12">
          ❧ Bibliography
        </span>
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/60">
                  <span className="text-gold">[03]</span>
                  <span className="h-px w-12 bg-ink/30" />
                  <span>Selected Writing</span>
                </div>
                <h2 className="display mt-6 text-5xl text-ink md:text-7xl">
                  Recent <em className="text-gold">papers</em>.
                </h2>
              </div>
              <Link
                href="/portfolio"
                className="link-underline font-mono text-xs uppercase tracking-wider2 text-ink/70 hover:text-ink"
              >
                Full bibliography ↗
              </Link>
            </div>
          </Reveal>

          <div className="mt-16 grid gap-px bg-ink/15 md:grid-cols-2">
            {research.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.1}>
                <a
                  href={r.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ed-card flex h-full flex-col bg-cream-50 p-10 md:p-12"
                >
                  <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/60">
                    <span className="text-gold">{r.year}</span>
                    <span className="text-ink/40">Paper · 0{i + 1}</span>
                  </div>
                  <FigurePlate
                    src={
                      i === 0
                        ? "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=80&auto=format&fit=crop"
                        : "https://images.unsplash.com/photo-1517842645767-c639042777db?w=1200&q=80&auto=format&fit=crop"
                    }
                    alt={r.title}
                    fig=""
                    aspect="aspect-[16/9]"
                    accent={i === 0 ? "rust" : "moss"}
                    shape={i === 0 ? "slash" : "bezel-alt"}
                    className="mt-6"
                  />
                  <p className="mt-6 font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/60">
                    {r.journal}
                  </p>
                  <h3 className="mt-3 font-display text-3xl leading-tight text-ink md:text-4xl">
                    {r.title}
                  </h3>
                  <p className="mt-5 text-base leading-relaxed text-ink/70">
                    {r.desc}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {r.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-ink/20 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider2 text-ink/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-auto flex items-center gap-2 pt-10 font-mono text-xs uppercase tracking-wider2 text-ink transition-all group-hover:gap-4 group-hover:text-gold">
                    Read paper
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="section relative bg-paper-warm">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden bg-ink p-10 text-cream-50 ring-bold clip-banner md:p-20">
              {/* big color blocks */}
              <div className="pointer-events-none absolute -right-20 -top-20 h-[420px] w-[420px] bg-gold/40 blur-3xl" />
              <div className="pointer-events-none absolute -left-24 -bottom-24 h-[320px] w-[320px] bg-rust/40 blur-3xl" />
              {/* color stripes */}
              <div aria-hidden className="absolute left-0 top-0 h-2 w-1/3 bg-gold" />
              <div aria-hidden className="absolute right-0 top-12 h-2 w-1/4 bg-moss" />

              <div className="relative grid gap-10 md:grid-cols-12">
                <div className="md:col-span-7">
                  <p className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-wider2 text-cream-100/60">
                    <span className="text-gold-light">[05]</span>
                    <span className="h-px w-12 bg-cream-100/30" />
                    <span>Open Brief</span>
                  </p>
                  <h2 className="display mt-6 text-4xl text-cream-50 md:text-6xl">
                    Have a brief that needs{" "}
                    <em className="text-gold-light">evidence</em>?
                  </h2>
                  <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream-100/80">
                    Available for research collaborations, consulting on
                    net-zero construction, lectures, and editorial reviews.
                  </p>
                </div>

                <div className="flex flex-col items-start justify-end gap-4 md:col-span-5 md:items-end">
                  <Magnetic>
                    <Link
                      href="/contact"
                      className="btn bg-gold text-ink clip-tag hover:bg-gold-light"
                    >
                      <span>Start a conversation</span>
                      <span aria-hidden>↗</span>
                    </Link>
                  </Magnetic>
                  <p className="font-mono text-[0.72rem] uppercase tracking-wider2 text-cream-100/50">
                    Reply within 48 hrs · WAT
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
