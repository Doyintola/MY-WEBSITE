import type { Metadata } from "next";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import FigurePlate from "@/components/FigurePlate";
import { getContent, content } from "@/lib/content";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description:
    "Researcher and consultant working at the intersection of sustainable infrastructure, decision intelligence, and climate-responsive development.",
};

const FALLBACK_FACTS: [string, string][] = [
  ["Education", "B.Tech (1ˢᵗ Class) — FUTA"],
  ["Affiliation", "RG-SIM+ · GBCN"],
  ["Focus", "Net-Zero · Circularity"],
  ["Region", "Nigeria · Sub-Saharan Africa"],
  ["Languages", "English · Yorùbá"],
  ["Status", "Open to PhD / Consulting"],
];

export default async function AboutPage() {
  const [copy, factRows, certs] = await Promise.all([
    getContent(),
    prisma.aboutFact.findMany({ orderBy: { order: "asc" } }),
    prisma.certificate.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
  ]);

  const facts: [string, string][] = factRows.length
    ? factRows.map((f) => [f.k, f.v] as [string, string])
    : FALLBACK_FACTS;

  const portrait = content(copy, "about.portrait", "/portraits/doyin-about.jpg");
  const bio = content(copy, "about.bio", "").trim();
  const bioParagraphs = bio
    ? bio.split(/\n{2,}|\r\n{2,}/).map((p) => p.trim()).filter(Boolean)
    : [];

  return (
    <>
      <PageHero
        index="02"
        eyebrow="About"
        title="A practice in evidence."
        subtitle="Researcher, consultant, and infrastructure innovator — translating decision intelligence into net-zero, circular construction outcomes for developing economies."
        portrait={portrait}
        portraitAlt="Oladoyin Akintola — portrait"
        portraitPosition="57% 26%"
        accent="gold"
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
              In her own <em className="text-gold">words</em>.
            </h2>

            <div className="prose prose-lg mt-12 max-w-none prose-headings:font-display prose-headings:text-ink prose-p:text-ink/85 prose-a:text-gold prose-strong:text-ink prose-blockquote:border-gold prose-blockquote:text-ink/80">
              {bioParagraphs.length > 0 ? (
                <ReactMarkdown>{bio}</ReactMarkdown>
              ) : (
                <>
                  <p className="dropcap">
                    Oladoyin Abidemi Akintola is a researcher working at the
                    intersection of sustainable infrastructure, decision
                    intelligence, and climate-responsive development. She holds
                    a Bachelor of Technology in Quantity Surveying from the
                    Federal University of Technology, Akure — graduating with
                    First Class Honours.
                  </p>
                  <p>
                    Her academic training laid a foundation in construction
                    management and economics, which she now applies to
                    understanding how the construction industry can transition
                    toward net-zero systems.
                  </p>
                </>
              )}
            </div>
          </Reveal>

          {/* SIDEBAR */}
          <Reveal delay={0.1} className="lg:col-span-5">
            <aside className="sticky top-32 space-y-8">
              <FigurePlate
                src={portrait}
                alt="Oladoyin Akintola"
                fig="Fig. 01"
                caption="Portrait"
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
                  {facts.map(([k, v]) => (
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
              </div>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* CERTIFICATES */}
      {certs.length > 0 && (
        <section className="relative border-t border-ink/15 bg-paper-cool">
          <span className="corner-sticker right-6 top-6 md:right-12 md:top-12">
            ❖ Credentials
          </span>
          <div className="container-x section">
            <Reveal>
              <div className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/60">
                <span className="text-gold">[02]</span>
                <span className="h-px w-12 bg-ink/30" />
                <span>Certificates &amp; credentials</span>
              </div>
              <h2 className="display mt-6 text-4xl text-ink md:text-6xl">
                On <em className="text-gold">paper</em>.
              </h2>
            </Reveal>

            <ul className="mt-16 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
              {certs.map((c, i) => {
                const Wrapper: React.ElementType = c.href ? "a" : "div";
                const wrapperProps = c.href
                  ? {
                      href: c.href,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : {};
                return (
                  <Reveal key={c.id} delay={i * 0.05}>
                    <li>
                      <Wrapper
                        {...wrapperProps}
                        className="ed-card group flex h-full flex-col bg-cream-50 p-8 md:p-10"
                      >
                        <div className="flex items-center justify-between font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/60">
                          <span className="text-gold">{String(i + 1).padStart(2, "0")}</span>
                          {c.year && <span>{c.year}</span>}
                        </div>
                        {c.image && (
                          <div className="relative mt-6 aspect-[4/3] overflow-hidden ring-paper">
                            <Image
                              src={c.image}
                              alt={c.title}
                              fill
                              sizes="(min-width:1024px) 25vw, 90vw"
                              className="object-cover"
                            />
                          </div>
                        )}
                        <h3 className="mt-8 font-display text-2xl text-ink">
                          {c.title}
                        </h3>
                        {c.issuer && (
                          <p className="mt-2 text-base text-ink/70">{c.issuer}</p>
                        )}
                        {c.href && (
                          <span className="mt-auto pt-8 font-mono text-[0.65rem] uppercase tracking-wider2 text-ink/50 transition-colors group-hover:text-gold">
                            Verify ↗
                          </span>
                        )}
                      </Wrapper>
                    </li>
                  </Reveal>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
