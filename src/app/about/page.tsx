import type { Metadata } from "next";
import { FlaskConical, Building2, Globe2 } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FigurePlate from "@/components/FigurePlate";
import { getContent, content } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Profile",
  description:
    "Researcher and consultant working at the intersection of sustainable infrastructure, decision intelligence, and climate-responsive development.",
};

const highlights = [
  {
    icon: FlaskConical,
    n: "01",
    title: "Research Focus",
    desc: "Circular construction, net-zero transitions, and infrastructure sustainability — published in Energy and Buildings and Construction Economics & Building.",
  },
  {
    icon: Building2,
    n: "02",
    title: "Industry Practice",
    desc: "Graduate Research Assistant with RG-SIM+, alongside active service as a Project Quantity Surveyor on live construction briefs.",
  },
  {
    icon: Globe2,
    n: "03",
    title: "Sustainability Advocacy",
    desc: "Active contributor to the Green Building Council Nigeria and Nationally Determined Contributions projects across West Africa.",
  },
];

const timeline = [
  { year: "2020", label: "Begins B.Tech in Quantity Surveying — FUTA" },
  { year: "2024", label: "Graduates First Class Honours · top of cohort" },
  { year: "2024", label: "Joins RG-SIM+ as Graduate Research Assistant" },
  { year: "2025", label: "Two peer-reviewed papers published" },
  { year: "2026", label: "Open to PhD placements & consulting briefs" },
];

export default async function AboutPage() {
  const copy = await getContent();
  const bio = content(copy, "about.bio", "").trim();
  const bioParagraphs = bio ? bio.split(/\n{2,}|\r\n{2,}/).map((p) => p.trim()).filter(Boolean) : [];
  return (
    <>
      <PageHero
        index="02"
        eyebrow="Profile"
        title="A practice in evidence."
        subtitle="Researcher, consultant, and infrastructure innovator — translating decision intelligence into net-zero, circular construction outcomes for developing economies."
        portrait="/portraits/doyin-about.jpg"
        portraitAlt="Oladoyin Akintola — portrait"
        portraitPosition="57% 26%"
        accent="gold"
        meta={[
          { k: "Based", v: "Akure · Lagos" },
          { k: "Degree", v: "B.Tech 1ˢᵗ · FUTA" },
          { k: "Affiliation", v: "RG-SIM+ · GBCN" },
          { k: "Focus", v: "Net-Zero · Circular" },
          { k: "Languages", v: "English · Yorùbá" },
          { k: "Status", v: "PhD / Consulting" },
        ]}
      />

      {/* BIO + SIDEBAR */}
      <section className="section relative bg-paper-warm">
        <span className="corner-sticker right-6 top-6 md:right-12 md:top-12">
          ¶ 01 · The Long Form
        </span>
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <div className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/60">
              <span className="text-gold">[01]</span>
              <span className="h-px w-12 bg-ink/30" />
              <span>The Long Form</span>
            </div>
            <h2 className="display mt-8 text-4xl text-ink md:text-6xl">
              The journey, in <em className="text-gold">three movements</em>.
            </h2>

            <div className="mt-12 space-y-7 text-lg leading-relaxed text-ink/80">
              {bioParagraphs.length > 0 ? (
                bioParagraphs.map((p, i) => (
                  <p key={i} className={i === 0 ? "dropcap" : undefined}>
                    {p}
                  </p>
                ))
              ) : (
                <>
                  <p className="dropcap">
                    Oladoyin Abidemi Akintola is a researcher working at the
                    intersection of sustainable infrastructure, decision
                    intelligence, and climate-responsive development. She holds a
                    Bachelor of Technology in Quantity Surveying from the Federal
                    University of Technology, Akure — graduating with First Class
                    Honours.
                  </p>
                  <p>
                    Her academic training laid a foundation in construction
                    management and economics, which she now applies to
                    understanding how the construction industry can transition
                    toward net-zero systems — particularly in markets where
                    resource and policy realities reject one-size-fits-all
                    imports.
                  </p>
                  <p>
                    Oladoyin&apos;s work is driven by a commitment to the
                    Sustainable Development Goals — and by the conviction that
                    research, education, and advocacy are not separate disciplines
                    but a single practice. Each paper, each site, each policy
                    conversation pulls toward the same horizon: a built environment
                    that gives back more than it takes.
                  </p>
                </>
              )}
            </div>

            <figure className="mt-14 border-l-2 border-gold pl-8">
              <blockquote className="font-display text-2xl italic leading-snug text-ink md:text-3xl">
                &ldquo;Decision intelligence isn&apos;t a tool — it&apos;s a
                discipline. The numbers earn the policy.&rdquo;
              </blockquote>
              <figcaption className="mt-4 font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/50">
                — Field Notes, 2025
              </figcaption>
            </figure>
          </Reveal>

          {/* SIDEBAR */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <aside className="sticky top-32 space-y-8">
              <FigurePlate
                src="/portraits/doyin-about.jpg"
                alt="Oladoyin Akintola — graduation portrait"
                fig="Fig. 01"
                caption="Convocation · FUTA · 2024"
                aspect="aspect-[4/5]"
                accent="gold"
                shape="bezel"
                position="57% 24%"
              />
              <div className="border border-ink/15 bg-cream-50/70 p-8 ring-paper">
              <p className="font-mono text-[0.7rem] uppercase tracking-wider2 text-gold">
                ⟶ At a glance
              </p>
              <dl className="mt-6 divide-y divide-ink/10">
                {[
                  ["Education", "B.Tech (1ˢᵗ Class) — FUTA"],
                  ["Affiliation", "RG-SIM+ · GBCN"],
                  ["Focus", "Net-Zero · Circularity"],
                  ["Region", "Nigeria · Sub-Saharan Africa"],
                  ["Languages", "English · Yorùbá"],
                  ["Status", "Open to PhD / Consulting"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-4 py-4"
                  >
                    <dt className="font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/50">
                      {k}
                    </dt>
                    <dd className="text-right font-display text-base text-ink">
                      {v}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 hairline" />

              <p className="mt-8 font-mono text-[0.7rem] uppercase tracking-wider2 text-gold">
                Currently reading
              </p>
              <p className="mt-3 font-display text-lg italic text-ink">
                &ldquo;Doughnut Economics&rdquo; · Kate Raworth
              </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="relative border-y border-ink/15 bg-blueprint">
        <span className="corner-sticker right-6 top-6 md:right-12 md:top-12">
          ❧ Chronology
        </span>
        <div className="container-x section">
          <Reveal>
            <div className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/60">
              <span className="text-gold">[02]</span>
              <span className="h-px w-12 bg-ink/30" />
              <span>Trajectory</span>
            </div>
            <h2 className="display mt-6 text-4xl text-ink md:text-6xl">
              A short <em className="text-gold">chronology</em>.
            </h2>
          </Reveal>

          <ol className="mt-16 border-t border-ink/15">
            {timeline.map((t, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <li className="grid grid-cols-12 items-baseline gap-4 border-b border-ink/15 py-6 transition-colors hover:bg-cream-50/60">
                  <span className="col-span-3 font-mono text-[0.75rem] uppercase tracking-wider2 text-gold md:col-span-2">
                    {t.year}
                  </span>
                  <span className="col-span-9 font-display text-xl text-ink md:col-span-10 md:text-2xl">
                    {t.label}
                  </span>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* HIGHLIGHTS */}
      <section className="section relative bg-paper-cool">
        <span className="corner-sticker right-6 top-6 md:right-12 md:top-12">
          ❖ Three Movements
        </span>
        <div className="container-x">
          <Reveal>
            <div className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/60">
              <span className="text-gold">[03]</span>
              <span className="h-px w-12 bg-ink/30" />
              <span>What I bring</span>
            </div>
            <h2 className="display mt-6 max-w-3xl text-4xl text-ink md:text-6xl">
              Three threads, one <em className="text-gold">brief</em>.
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-px bg-ink/15 md:grid-cols-3">
            {highlights.map(({ icon: Icon, n, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.07}>
                <div className="ed-card flex h-full flex-col bg-cream-50 p-10">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[0.7rem] uppercase tracking-wider2 text-gold">
                      {n}
                    </span>
                    <Icon className="h-5 w-5 text-ink/40 transition-colors group-hover:text-gold" />
                  </div>
                  <h3 className="mt-12 font-display text-3xl text-ink">
                    {title}
                  </h3>
                  <p className="mt-4 text-base leading-relaxed text-ink/70">
                    {desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
