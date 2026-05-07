import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FigurePlate from "@/components/FigurePlate";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected research projects and consulting work.",
};

export const dynamic = "force-dynamic";

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
        eyebrow="Projects"
        title="Selected work."
        subtitle="A working catalogue of papers, projects, and consulting threads."
        accent="rust"
      />

      <section className="section relative bg-paper-warm">
        <div className="container-x">
          <Reveal>
            <div className="flex items-end justify-between border-b border-ink/15 pb-6">
              <div>
                <p className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/60">
                  <span className="text-gold">[01]</span>
                  <span className="h-px w-12 bg-ink/30" />
                  <span>Projects</span>
                </p>
                <h2 className="display mt-6 text-4xl text-ink md:text-6xl">
                  Selected <em className="text-gold">projects</em>.
                </h2>
              </div>
            </div>
          </Reveal>

          {projects.length === 0 ? (
            <Reveal>
              <p className="mt-16 max-w-xl rounded-md border border-dashed border-ink/20 p-8 font-mono text-sm text-ink/60">
                No projects yet.
              </p>
            </Reveal>
          ) : (
            <ol className="mt-12">
              {projects.map((p, i) => {
                const Wrapper: React.ElementType = p.href ? "a" : "div";
                const wrapperProps = p.href
                  ? {
                      href: p.href,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {};
                return (
                  <Reveal key={p.id} delay={i * 0.08}>
                    <li>
                      <Wrapper
                        {...wrapperProps}
                        className="ed-card group block border-b border-ink/15 py-12 transition-colors hover:bg-cream-50/60"
                      >
                        <div className="grid grid-cols-12 gap-6">
                          <div className="col-span-2 md:col-span-1">
                            <span className="font-mono text-[0.75rem] uppercase tracking-wider2 text-gold">
                              {p.n || String(i + 1).padStart(2, "0")}
                            </span>
                          </div>

                          {p.image ? (
                            <div className="col-span-10 md:col-span-3">
                              <FigurePlate
                                src={p.image}
                                alt={p.title}
                                fig=""
                                aspect="aspect-[4/5]"
                                accent={i % 2 === 0 ? "rust" : "moss"}
                                shape={i % 2 === 0 ? "bezel" : "bezel-alt"}
                              />
                            </div>
                          ) : (
                            <div className="hidden md:col-span-3 md:block" />
                          )}

                          <div className="col-span-12 md:col-span-5">
                            <p className="font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/60">
                              {p.year}
                              {p.venue ? ` · ${p.venue}` : ""}
                            </p>
                            <h3 className="mt-3 font-display text-3xl leading-tight text-ink md:text-5xl">
                              {p.title}
                            </h3>
                            {p.desc && (
                              <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink/70 md:text-lg">
                                {p.desc}
                              </p>
                            )}
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

                          <div className="col-span-12 flex items-center justify-between md:col-span-3 md:flex-col md:items-end md:justify-between md:gap-6">
                            {p.role && (
                              <p className="max-w-[14rem] font-mono text-[0.65rem] uppercase tracking-wider2 text-ink/50 md:text-right">
                                {p.role}
                              </p>
                            )}
                            {p.href && (
                              <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider2 text-ink transition-all group-hover:gap-4 group-hover:text-gold">
                                Open
                                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                              </span>
                            )}
                          </div>
                        </div>
                      </Wrapper>
                    </li>
                  </Reveal>
                );
              })}
            </ol>
          )}
        </div>
      </section>
    </>
  );
}
