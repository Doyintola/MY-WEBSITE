import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import Reveal, { RevealText } from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import Signature from "@/components/Signature";
import FigurePlate from "@/components/FigurePlate";
import { prisma } from "@/lib/db";
import { getContent, content } from "@/lib/content";

export const dynamic = "force-dynamic";

function parseTags(raw: string): string[] {
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function Home() {
  const [copy, posts, projects] = await Promise.all([
    getContent(),
    prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { publishedAt: "desc" },
      take: 6,
    }),
    prisma.project.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
      take: 3,
    }),
  ]);

  const introTitle = content(
    copy,
    "home.intro.title",
    "Field notes on net-zero, circularity, and the work of evidence.",
  );
  const introBody = content(
    copy,
    "home.intro.body",
    "I'm Oladoyin A. Akintola — a researcher and consultant writing about sustainable infrastructure, decision intelligence, and the quiet labour of building futures that earn their keep.",
  );
  const portrait = content(copy, "about.portrait", "/portraits/doyin-about.jpg");

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <>
      {/* ── INTRO HERO (about + signature) ─────────────── */}
      <section className="relative overflow-hidden border-b border-ink/15 bg-paper-warm pt-36 pb-20 md:pt-44 md:pb-24">
        <div className="pointer-events-none absolute -top-40 -right-40 h-[520px] w-[520px] rounded-full bg-gold/20 blur-3xl animate-blob" />
        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-moss/15 blur-3xl animate-blob" />
        <div aria-hidden className="absolute left-0 top-32 h-1 w-1/3 bg-gold md:top-40" />

        <span className="corner-sticker right-6 top-32 md:right-12 md:top-40 text-gold">
          ✦ A writing practice
        </span>

        <div className="container-x relative">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-8">
              <Reveal>
                <div className="flex flex-wrap items-center gap-4 font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/60">
                  <span className="text-gold">[01]</span>
                  <span className="h-px w-12 bg-ink/30" />
                  <span>Index</span>
                  <span className="h-px w-12 bg-ink/30" />
                  <span className="text-ink/40">{content(copy, "site.tagline", "Researcher · Consultant")}</span>
                </div>
              </Reveal>

              <h1 className="display mt-8 text-balance text-5xl text-ink md:text-7xl lg:text-[6.5rem] leading-[0.95]">
                <RevealText text={introTitle} />
              </h1>

              <Reveal delay={0.3}>
                <p className="mt-10 max-w-2xl text-balance text-lg leading-relaxed text-ink/75 md:text-xl">
                  {introBody}
                </p>

                <div className="mt-10 flex flex-wrap items-center gap-4">
                  <Magnetic>
                    <Link href="/blog" className="btn bg-ink text-cream-50 clip-tag hover:bg-gold hover:text-ink">
                      <span>Read the field notes</span>
                      <span aria-hidden>↗</span>
                    </Link>
                  </Magnetic>
                  <Magnetic>
                    <Link href="/about" className="btn btn-outline">
                      <span>About me</span>
                      <span aria-hidden>→</span>
                    </Link>
                  </Magnetic>
                </div>
              </Reveal>

              <Reveal delay={0.5}>
                <div className="mt-12 flex items-center gap-6">
                  <Signature size="text-3xl md:text-4xl" />
                  <span className="font-mono text-[0.62rem] uppercase tracking-wider2 text-ink/50">
                    Editor · this issue
                  </span>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-4">
              <Reveal delay={0.2}>
                <div className="relative">
                  <div aria-hidden className="absolute -left-3 -top-3 h-full w-full border border-ink/25" />
                  <div className="relative aspect-[4/5] overflow-hidden ring-paper">
                    <Image
                      src={portrait}
                      alt="Oladoyin Akintola"
                      fill
                      sizes="(min-width:1024px) 30vw, 90vw"
                      style={{ objectPosition: "57% 24%" }}
                      className="object-cover"
                      priority
                    />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED POST ─────────────────────────────── */}
      {featured && (
        <section className="section relative bg-paper-cool">
          <span className="corner-sticker right-6 top-6 md:right-12 md:top-12">
            ✦ Latest
          </span>
          <div className="container-x">
            <Reveal>
              <div className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/60">
                <span className="text-gold">[02]</span>
                <span className="h-px w-12 bg-ink/30" />
                <span>Latest essay</span>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <Link
                href={`/blog/${featured.slug}`}
                className="group mt-10 grid gap-10 border-t border-b border-ink/15 py-12 md:grid-cols-12 md:py-16"
              >
                {featured.coverImage && (
                  <div className="md:col-span-5">
                    <FigurePlate
                      src={featured.coverImage}
                      alt={featured.title}
                      fig=""
                      aspect="aspect-[4/5]"
                      accent="gold"
                      shape="bezel"
                    />
                  </div>
                )}
                <div className={featured.coverImage ? "md:col-span-7" : "md:col-span-12"}>
                  <p className="font-mono text-[0.7rem] uppercase tracking-wider2 text-gold">
                    {formatDate(featured.publishedAt)}
                  </p>
                  <h2 className="display mt-5 text-balance text-4xl text-ink transition-colors group-hover:text-gold md:text-6xl">
                    {featured.title}
                  </h2>
                  {featured.excerpt && (
                    <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
                      {featured.excerpt}
                    </p>
                  )}
                  <div className="mt-8 flex flex-wrap gap-2">
                    {parseTags(featured.tags).map((t) => (
                      <span
                        key={t}
                        className="rounded-full border border-ink/20 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider2 text-ink/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-10 flex items-center gap-2 font-mono text-xs uppercase tracking-wider2 text-ink transition-all group-hover:gap-4 group-hover:text-gold">
                    Read essay
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      )}

      {/* ── RECENT POSTS GRID ──────────────────────────── */}
      <section className="section relative bg-paper-warm">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <div className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/60">
                  <span className="text-gold">[03]</span>
                  <span className="h-px w-12 bg-ink/30" />
                  <span>Recent writing</span>
                </div>
                <h2 className="display mt-6 text-4xl text-ink md:text-6xl">
                  More <em className="text-gold">field notes</em>.
                </h2>
              </div>
              <Link
                href="/blog"
                className="link-underline font-mono text-xs uppercase tracking-wider2 text-ink/70 hover:text-ink"
              >
                Full archive ↗
              </Link>
            </div>
          </Reveal>

          {rest.length === 0 ? (
            <Reveal>
              <p className="mt-16 max-w-xl rounded-md border border-dashed border-ink/20 p-8 font-mono text-sm text-ink/60">
                No more posts yet. Check back soon — or write the next one in
                the admin.
              </p>
            </Reveal>
          ) : (
            <div className="mt-16 grid gap-px bg-ink/15 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.06}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="ed-card group flex h-full flex-col bg-cream-50 p-10"
                  >
                    <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/60">
                      <span className="text-gold">{formatDate(p.publishedAt)}</span>
                      <span className="text-ink/40">Essay</span>
                    </div>
                    <h3 className="mt-8 font-display text-2xl leading-tight text-ink transition-colors group-hover:text-gold md:text-3xl">
                      {p.title}
                    </h3>
                    {p.excerpt && (
                      <p className="mt-4 flex-1 text-base leading-relaxed text-ink/70">
                        {p.excerpt}
                      </p>
                    )}
                    <div className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-wider2 text-ink/70 transition-all group-hover:gap-4 group-hover:text-gold">
                      Read
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── PROJECTS PEEK ──────────────────────────────── */}
      {projects.length > 0 && (
        <section className="section relative bg-blueprint">
          <div className="container-x">
            <Reveal>
              <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
                <div>
                  <div className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/60">
                    <span className="text-gold">[04]</span>
                    <span className="h-px w-12 bg-ink/30" />
                    <span>Selected work</span>
                  </div>
                  <h2 className="display mt-6 text-4xl text-ink md:text-6xl">
                    Selected <em className="text-gold">projects</em>.
                  </h2>
                </div>
                <Link
                  href="/portfolio"
                  className="link-underline font-mono text-xs uppercase tracking-wider2 text-ink/70 hover:text-ink"
                >
                  All projects ↗
                </Link>
              </div>
            </Reveal>

            <div className="mt-16 grid gap-px bg-ink/15 md:grid-cols-3">
              {projects.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.07}>
                  <a
                    href={p.href ?? "/portfolio"}
                    target={p.href ? "_blank" : undefined}
                    rel={p.href ? "noopener noreferrer" : undefined}
                    className="ed-card group flex h-full flex-col bg-cream-50 p-10"
                  >
                    <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/60">
                      <span className="text-gold">{p.year}</span>
                      <span className="text-ink/40">Project</span>
                    </div>
                    <h3 className="mt-6 font-display text-2xl leading-tight text-ink md:text-3xl">
                      {p.title}
                    </h3>
                    <p className="mt-4 flex-1 text-base leading-relaxed text-ink/70">
                      {p.desc}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-2">
                      {parseTags(p.tags).map((t) => (
                        <span
                          key={t}
                          className="rounded-full border border-ink/20 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider2 text-ink/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────── */}
      <section className="section relative bg-paper-warm">
        <div className="container-x">
          <Reveal>
            <div className="relative overflow-hidden bg-ink p-10 text-cream-50 ring-bold clip-banner md:p-20">
              <div className="pointer-events-none absolute -right-20 -top-20 h-[420px] w-[420px] bg-gold/40 blur-3xl" />
              <div className="pointer-events-none absolute -left-24 -bottom-24 h-[320px] w-[320px] bg-rust/40 blur-3xl" />
              <div aria-hidden className="absolute left-0 top-0 h-2 w-1/3 bg-gold" />
              <div aria-hidden className="absolute right-0 top-12 h-2 w-1/4 bg-moss" />
              <div className="relative grid gap-10 md:grid-cols-12">
                <div className="md:col-span-7">
                  <p className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-wider2 text-cream-100/60">
                    <span className="text-gold-light">[05]</span>
                    <span className="h-px w-12 bg-cream-100/30" />
                    <span>Open to talk</span>
                  </p>
                  <h2 className="display mt-6 text-4xl text-cream-50 md:text-6xl">
                    Have something you&apos;d like to <em className="text-gold-light">discuss</em>?
                  </h2>
                  <p className="mt-6 max-w-lg text-lg leading-relaxed text-cream-100/80">
                    Reach out about research, consulting, lectures, editorial
                    work — or to just say hello.
                  </p>
                </div>
                <div className="flex flex-col items-start justify-end gap-4 md:col-span-5 md:items-end">
                  <Magnetic>
                    <Link href="/contact" className="btn bg-gold text-ink clip-tag hover:bg-gold-light">
                      <span>Get in touch</span>
                      <span aria-hidden>↗</span>
                    </Link>
                  </Magnetic>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
