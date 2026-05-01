import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Field Notes",
  description:
    "Slow essays on infrastructure, sustainability, and the politics of decision intelligence.",
};

const posts = [
  {
    n: "01",
    issue: "Issue Nº 01",
    eta: "Spring 2026",
    title: "The Future of Net-Zero Infrastructure",
    desc: "On the gap between net-zero rhetoric and the cost-base, capacity and carbon-stock realities of construction in developing economies.",
    category: "Infrastructure",
  },
  {
    n: "02",
    issue: "Issue Nº 02",
    eta: "Spring 2026",
    title: "Circular Economy in Construction",
    desc: "How a circular framing reorganises supply chains, contracts, and ultimately the moral economy of the building site.",
    category: "Sustainability",
  },
  {
    n: "03",
    issue: "Issue Nº 03",
    eta: "Summer 2026",
    title: "Decision Intelligence for Infrastructure",
    desc: "Bringing data, theory, and judgement together — and why the best decisions still feel uncomfortable.",
    category: "Analytics",
  },
];

export default function BlogPage() {
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
                <span>Forthcoming Essays</span>
              </p>
              <p className="font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/50">
                Subscribe via email →
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-px bg-ink/15 md:grid-cols-3">
            {posts.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08}>
                <article className="ed-card group flex h-full flex-col bg-cream-50 p-10 md:p-12">
                  <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/60">
                    <span className="text-gold">{p.n}</span>
                    <span>{p.issue}</span>
                  </div>

                  <p className="mt-10 font-mono text-[0.65rem] uppercase tracking-wider2 text-rust">
                    Coming · {p.eta}
                  </p>
                  <h2 className="mt-4 font-display text-3xl leading-tight text-ink md:text-4xl">
                    {p.title}
                  </h2>
                  <p className="mt-5 flex-1 text-base leading-relaxed text-ink/70">
                    {p.desc}
                  </p>

                  <div className="mt-8 flex items-center justify-between border-t border-ink/15 pt-6">
                    <span className="font-mono text-[0.65rem] uppercase tracking-wider2 text-ink/60">
                      {p.category}
                    </span>
                    <span className="font-mono text-[0.65rem] uppercase tracking-wider2 text-ink/40">
                      Draft
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* Newsletter */}
          <Reveal>
            <div className="mt-24 grid items-center gap-10 border border-ink/15 bg-cream-100/40 p-10 md:grid-cols-2 md:p-16">
              <div>
                <p className="font-mono text-[0.72rem] uppercase tracking-wider2 text-gold">
                  ✉ The Quarterly
                </p>
                <h3 className="display mt-5 text-3xl text-ink md:text-5xl">
                  Receive the next essay <em className="text-gold">first</em>.
                </h3>
                <p className="mt-4 max-w-md text-base leading-relaxed text-ink/70">
                  No spam, no growth-hacking — just a thoughtful note when a
                  new piece is published.
                </p>
              </div>
              <form className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="flex-1 border border-ink/20 bg-cream-50 px-5 py-4 font-mono text-sm text-ink placeholder:text-ink/40 focus:border-ink focus:outline-none"
                />
                <button type="submit" className="btn btn-ink">
                  Subscribe ↗
                </button>
              </form>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
