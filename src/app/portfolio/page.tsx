import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FigurePlate from "@/components/FigurePlate";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Research",
  description: "Selected publications, research projects and consulting work.",
};

export const dynamic = "force-dynamic";

const focus = [
  "Net-Zero Infrastructure",
  "Circular Construction",
  "Decision Intelligence",
  "Stakeholder Theory",
  "Sustainability Reporting",
  "Quantity Surveying",
];

function parseTags(raw: string): string[] {
  try {
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

export default async function PortfolioPage() {
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { order: "asc" },
  });

  return (
    <>
      <PageHero
        index="03"
        eyebrow="Research"
        title="The bibliography."
        subtitle="A working catalogue of papers, projects, and consulting threads — each one a position taken in evidence."
        marquee={focus}
        portrait="/portraits/doyin-portfolio-1.jpg"
        portraitAlt="Oladoyin Akintola — editorial portrait"
        portraitPosition="58% 18%"
        accent="rust"
        meta={[
          { k: "Papers", v: "02 published" },
          { k: "Citations", v: "Growing" },
          { k: "Outlets", v: "E&B · AJCEB" },
          { k: "Issue", v: "Nº 01 · Vol. I" },
          { k: "Volume", v: "MMXXVI" },
          { k: "Status", v: "Open briefs" },
        ]}
      />

      {/* PUBLICATIONS — magazine list */}
      <section className="section relative bg-paper-warm">
        <span className="corner-sticker right-6 top-6 md:right-12 md:top-12">
          ✦ Issue Nº 01 · Vol. I
        </span>
        <div className="container-x">
          <Reveal>
            <div className="flex items-end justify-between border-b border-ink/15 pb-6">
              <div>
                <p className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/60">
                  <span className="text-gold">[01]</span>
                  <span className="h-px w-12 bg-ink/30" />
                  <span>Selected Publications</span>
                </p>
                <h2 className="display mt-6 text-4xl text-ink md:text-6xl">
                  Two papers, <em className="text-gold">2025</em>.
                </h2>
              </div>
              <p className="hidden font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/50 md:block">
                Issue Nº 01 · Volume I
              </p>
            </div>
          </Reveal>

          <ol className="mt-12">
            {projects.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <li>
                  <a
                    href={p.href ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ed-card group block border-b border-ink/15 py-12 transition-colors hover:bg-cream-50/60"
                  >
                    <div className="grid grid-cols-12 gap-6">
                      {/* number */}
                      <div className="col-span-2 md:col-span-1">
                        <span className="font-mono text-[0.75rem] uppercase tracking-wider2 text-gold">
                          {p.n}
                        </span>
                      </div>

                      {/* image */}
                      <div className="col-span-10 md:col-span-3">
                        <FigurePlate
                          src={p.image}
                          alt={p.title}
                          fig=""
                          aspect="aspect-[4/5]"
                          accent={i === 0 ? "rust" : "moss"}
                          shape={i === 0 ? "bezel" : "bezel-alt"}
                        />
                      </div>

                      {/* main */}
                      <div className="col-span-12 md:col-span-5">
                        <p className="font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/60">
                          {p.year}{p.venue ? ` · ${p.venue}` : ""}
                        </p>
                        <h3 className="mt-3 font-display text-3xl leading-tight text-ink md:text-5xl">
                          {p.title}
                        </h3>
                        <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink/70 md:text-lg">
                          {p.desc}
                        </p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {parseTags(p.tags).map((t) => (
                            <span
                              key={t}
                              className="rounded-full border border-ink/20 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider2 text-ink/70"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* meta + arrow */}
                      <div className="col-span-12 flex items-center justify-between md:col-span-3 md:flex-col md:items-end md:justify-between md:gap-6">
                        <p className="max-w-[14rem] font-mono text-[0.65rem] uppercase tracking-wider2 text-ink/50 md:text-right">
                          {p.role}
                        </p>
                        <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider2 text-ink transition-all group-hover:gap-4 group-hover:text-gold">
                          Read paper
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                        </span>
                      </div>
                    </div>
                  </a>
                </li>
              </Reveal>
            ))}
          </ol>

          {/* Note */}
          <Reveal>
            <p className="mt-12 max-w-2xl font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/50">
              ✦ Forthcoming · A book chapter on decision intelligence for
              SDG-aligned infrastructure (2026).
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
