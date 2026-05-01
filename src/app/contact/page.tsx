import type { Metadata } from "next";
import {
  Mail,
  Linkedin,
  Phone,
  IdCard,
  GraduationCap,
  ExternalLink,
  ArrowUpRight,
} from "lucide-react";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import FigurePlate from "@/components/FigurePlate";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach out for research, consulting, lectures, or collaboration on net-zero infrastructure.",
};

const channels = [
  {
    icon: Mail,
    n: "01",
    label: "Email",
    value: "akintolaoladoyin86@gmail.com",
    href: "mailto:akintolaoladoyin86@gmail.com",
    note: "Reply within 48 hrs · WAT",
  },
  {
    icon: Phone,
    n: "02",
    label: "Phone",
    value: "+234 810 7722 097",
    href: "tel:+2348107722097",
    note: "Mon–Fri · 09:00–18:00",
  },
  {
    icon: Linkedin,
    n: "03",
    label: "LinkedIn",
    value: "Connect professionally",
    href: "https://www.linkedin.com/in/oladoyin-abidemi-akintola-975780237",
    note: "Public profile",
  },
  {
    icon: ExternalLink,
    n: "04",
    label: "ResearchGate",
    value: "Browse publications",
    href: "https://www.researchgate.net/profile/Oladoyin-Akintola",
    note: "Papers · citations",
  },
  {
    icon: IdCard,
    n: "05",
    label: "ORCID",
    value: "0009-0006-7702-298X",
    href: "https://orcid.org/0009-0006-7702-298X",
    note: "Verified researcher",
  },
  {
    icon: GraduationCap,
    n: "06",
    label: "Google Scholar",
    value: "Academic record",
    href: "https://scholar.google.com/citations?user=EJXc004AAAAJ&hl=en",
    note: "Citations · h-index",
  },
];

const briefs = [
  "Research collaboration",
  "PhD supervision · placement",
  "Consulting · advisory",
  "Public lecture · keynote",
  "Editorial · peer review",
  "Press · interview",
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        index="05"
        eyebrow="Contact"
        title="Let's talk."
        subtitle="Open to research collaborations, consulting briefs, lectures and editorial work — on net-zero infrastructure, circular construction, and decision intelligence."
        portrait="/portraits/doyin-contact.jpg"
        portraitAlt="Oladoyin Akintola — outdoor editorial"
        portraitPosition="30% 22%"
        accent="moss"
        meta={[
          { k: "Reply", v: "Within 48 hrs" },
          { k: "Timezone", v: "WAT (UTC+1)" },
          { k: "Hours", v: "Mon–Fri" },
          { k: "Email", v: "akintolaoladoyin86" },
          { k: "Phone", v: "+234 810 7722 097" },
          { k: "Status", v: "Open 2026" },
        ]}
      />

      {/* HUGE EMAIL CTA */}
      <section className="relative border-b border-ink/15 bg-paper-warm">
        <span className="corner-sticker right-6 top-6 md:right-12 md:top-12">
          ❧ Direct Line
        </span>
        <div className="container-x py-24">
          <Reveal>
            <p className="font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/60">
              ⟶ Direct line
            </p>
            <a
              href="mailto:akintolaoladoyin86@gmail.com"
              className="group mt-6 block"
            >
              <h2 className="display break-words text-[clamp(2.4rem,8vw,7rem)] leading-[0.95] text-ink transition-colors group-hover:text-gold">
                akintolaoladoyin86
                <span className="text-gold">@</span>gmail.com
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
                  href="mailto:akintolaoladoyin86@gmail.com?subject=Collaboration%20Brief"
                  className="btn btn-ink"
                >
                  <span>Send a brief</span>
                  <span aria-hidden>↗</span>
                </a>
              </Magnetic>
              <Magnetic>
                <a href="tel:+2348107722097" className="btn btn-outline">
                  <span>+234 810 7722 097</span>
                </a>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* CHANNELS GRID */}
      <section className="section relative bg-paper-cool">
        <span className="corner-sticker right-6 top-6 md:right-12 md:top-12">
          ❖ Six Ways
        </span>
        <div className="container-x">
          <Reveal>
            <div className="flex items-end justify-between border-b border-ink/15 pb-6">
              <div>
                <p className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/60">
                  <span className="text-gold">[01]</span>
                  <span className="h-px w-12 bg-ink/30" />
                  <span>Other Channels</span>
                </p>
                <h2 className="display mt-6 text-4xl text-ink md:text-6xl">
                  Six ways <em className="text-gold">to reach</em>.
                </h2>
              </div>
            </div>
          </Reveal>

          <ul className="mt-12 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-3">
            {channels.map(({ icon: Icon, n, label, value, href, note }, i) => {
              const external = href.startsWith("http");
              return (
                <Reveal key={label} delay={i * 0.05}>
                  <li>
                    <a
                      href={href}
                      {...(external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="ed-card group flex h-full flex-col bg-cream-50 p-8 md:p-10"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[0.7rem] uppercase tracking-wider2 text-gold">
                          {n}
                        </span>
                        <ArrowUpRight className="h-4 w-4 text-ink/40 transition-all group-hover:rotate-45 group-hover:text-gold" />
                      </div>
                      <Icon className="mt-10 h-6 w-6 text-ink/70" />
                      <h3 className="mt-6 font-display text-2xl text-ink">
                        {label}
                      </h3>
                      <p className="mt-2 break-words text-base text-ink/80">
                        {value}
                      </p>
                      <p className="mt-auto pt-8 font-mono text-[0.65rem] uppercase tracking-wider2 text-ink/50">
                        {note}
                      </p>
                    </a>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </section>

      {/* BRIEFS / WHAT TO REACH ABOUT */}
      <section className="relative border-t border-ink/15 bg-blueprint">
        <span className="corner-sticker right-6 top-6 md:right-12 md:top-12">
          ¶ 03 · Open Briefs
        </span>
        <div className="container-x section">
          <div className="grid gap-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-5">
              <p className="flex items-center gap-3 font-mono text-[0.72rem] uppercase tracking-wider2 text-ink/60">
                <span className="text-gold">[02]</span>
                <span className="h-px w-12 bg-ink/30" />
                <span>Open Briefs</span>
              </p>
              <h2 className="display mt-6 text-4xl text-ink md:text-6xl">
                What to <em className="text-gold">reach</em> about.
              </h2>
              <div className="mt-10">
                <FigurePlate
                  src="/portraits/doyin-contact.jpg"
                  alt="Oladoyin Akintola"
                  fig="Fig. 05"
                  caption="Open for correspondence · 2026"
                  aspect="aspect-[4/5]"
                  accent="rust"
                  shape="bezel"
                  position="30% 20%"
                />
              </div>
            </Reveal>
            <Reveal delay={0.15} className="lg:col-span-7">
              <ul className="border-t border-ink/15">
                {briefs.map((b, i) => (
                  <li
                    key={b}
                    className="flex items-baseline justify-between gap-4 border-b border-ink/15 py-5"
                  >
                    <span className="font-mono text-[0.7rem] uppercase tracking-wider2 text-gold">
                      0{i + 1}
                    </span>
                    <span className="flex-1 font-display text-xl text-ink md:text-2xl">
                      {b}
                    </span>
                    <span className="text-ink/30">→</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
