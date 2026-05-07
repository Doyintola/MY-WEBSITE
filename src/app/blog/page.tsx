import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FigurePlate from "@/components/FigurePlate";
import { prisma } from "@/lib/db";

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Slow essays on infrastructure, sustainability, decision intelligence and the work of evidence.",
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

function formatDate(d: Date) {
  return new Date(d).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <PageHero
        index="04"
        eyebrow="Field Notes"
        title="Slow writing, in pieces."
        subtitle="An editorial space for longer arguments — on net-zero, circularity, and the quiet labour of decision intelligence."
      />

      <section className="section">
        <div className="container-x">
          <Reveal>
            <div className="flex items-baseline justify-between border-b border-ink/15 pb-6">
              <p className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/60">
                <span className="text-gold">[01]</span>
                <span className="h-px w-12 bg-ink/30" />
                <span>{posts.length === 1 ? "1 essay" : `${posts.length} essays`}</span>
              </p>
              <p className="font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/50">
                Newest first
              </p>
            </div>
          </Reveal>

          {posts.length === 0 ? (
            <Reveal>
              <p className="mt-16 max-w-xl rounded-md border border-dashed border-ink/20 p-8 font-mono text-sm text-ink/60">
                No posts yet. The first essay is on its way.
              </p>
            </Reveal>
          ) : (
            <ol className="mt-12">
              {posts.map((p, i) => (
                <Reveal key={p.id} delay={i * 0.05}>
                  <li>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="ed-card group block border-b border-ink/15 py-12 transition-colors hover:bg-cream-50/60"
                    >
                      <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-2 md:col-span-1">
                          <span className="font-mono text-[0.75rem] uppercase tracking-wider2 text-gold">
                            {String(posts.length - i).padStart(2, "0")}
                          </span>
                        </div>

                        {p.coverImage ? (
                          <div className="col-span-10 md:col-span-3">
                            <FigurePlate
                              src={p.coverImage}
                              alt={p.title}
                              fig=""
                              aspect="aspect-[4/5]"
                              accent={i % 2 === 0 ? "gold" : "moss"}
                              shape={i % 2 === 0 ? "bezel" : "bezel-alt"}
                            />
                          </div>
                        ) : (
                          <div className="hidden md:col-span-3 md:block" />
                        )}

                        <div className="col-span-12 md:col-span-6">
                          <p className="font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/60">
                            {formatDate(p.publishedAt)}
                          </p>
                          <h2 className="mt-3 font-display text-3xl leading-tight text-ink transition-colors group-hover:text-gold md:text-5xl">
                            {p.title}
                          </h2>
                          {p.excerpt && (
                            <p className="mt-5 max-w-3xl text-base leading-relaxed text-ink/70 md:text-lg">
                              {p.excerpt}
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

                        <div className="col-span-12 flex items-center justify-end md:col-span-2">
                          <span className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider2 text-ink transition-all group-hover:gap-4 group-hover:text-gold">
                            Read
                            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </li>
                </Reveal>
              ))}
            </ol>
          )}
        </div>
      </section>
    </>
  );
}
