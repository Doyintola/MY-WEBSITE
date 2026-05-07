import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import { prisma } from "@/lib/db";
import { getContent, content } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out for research, consulting, lectures, or collaboration.",
};

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const [copy, channels] = await Promise.all([
    getContent(),
    prisma.contactChannel.findMany({
      where: { published: true },
      orderBy: { order: "asc" },
    }),
  ]);

  const email = content(copy, "contact.email", "");
  const phone = content(copy, "contact.phone", "");
  const location = content(copy, "contact.location", "");

  const [emailUser, emailDomain] = email ? email.split("@") : ["", ""];

  return (
    <>
      <PageHero
        index="05"
        eyebrow="Contact"
        title="Let's talk."
        subtitle="Open to research, consulting, lectures and editorial work — and to a friendly hello."
        accent="moss"
      />

      {/* HUGE EMAIL CTA */}
      {email && (
        <section className="relative border-b border-ink/15 bg-paper-warm">
          <span className="corner-sticker right-6 top-6 md:right-12 md:top-12">
            ❧ Direct Line
          </span>
          <div className="container-x py-24">
            <Reveal>
              <p className="font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/60">
                ⟶ Direct line
              </p>
              <a href={`mailto:${email}`} className="group mt-6 block">
                <h2 className="display break-words text-[clamp(2rem,7vw,6rem)] leading-[0.95] text-ink transition-colors group-hover:text-gold">
                  {emailUser}
                  <span className="text-gold">@</span>
                  {emailDomain}
                  <span
                    aria-hidden
                    className="ml-4 inline-block transition-transform group-hover:rotate-45"
                  >
                    ↗
                  </span>
                </h2>
              </a>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Magnetic>
                  <a
                    href={`mailto:${email}?subject=Hello`}
                    className="btn btn-ink"
                  >
                    <span>Send an email</span>
                    <span aria-hidden>↗</span>
                  </a>
                </Magnetic>
                {phone && (
                  <Magnetic>
                    <a
                      href={`tel:${phone.replace(/\s/g, "")}`}
                      className="btn btn-outline"
                    >
                      <span>{phone}</span>
                    </a>
                  </Magnetic>
                )}
              </div>
              {location && (
                <p className="mt-8 font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/50">
                  {location}
                </p>
              )}
            </Reveal>
          </div>
        </section>
      )}

      {/* CHANNELS GRID */}
      {channels.length > 0 && (
        <section className="section relative bg-paper-cool">
          <span className="corner-sticker right-6 top-6 md:right-12 md:top-12">
            ❖ Elsewhere
          </span>
          <div className="container-x">
            <Reveal>
              <div className="flex items-end justify-between border-b border-ink/15 pb-6">
                <div>
                  <p className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/60">
                    <span className="text-gold">[01]</span>
                    <span className="h-px w-12 bg-ink/30" />
                    <span>Other channels</span>
                  </p>
                  <h2 className="display mt-6 text-4xl text-ink md:text-6xl">
                    Find me <em className="text-gold">elsewhere</em>.
                  </h2>
                </div>
              </div>
            </Reveal>

            <ul className="mt-12 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
              {channels.map((c, i) => {
                const external = c.href.startsWith("http");
                return (
                  <Reveal key={c.id} delay={i * 0.05}>
                    <li>
                      <a
                        href={c.href}
                        {...(external
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="ed-card group flex h-full flex-col bg-cream-50 p-8 md:p-10"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[0.7rem] uppercase tracking-wider2 text-gold">
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <ArrowUpRight className="h-4 w-4 text-ink/40 transition-all group-hover:rotate-45 group-hover:text-gold" />
                        </div>
                        <h3 className="mt-10 font-display text-2xl text-ink">
                          {c.label}
                        </h3>
                        <p className="mt-2 break-words text-base text-ink/80">
                          {c.value}
                        </p>
                      </a>
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
