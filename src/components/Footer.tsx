import Link from "next/link";
import Marquee from "./Marquee";

const explore = [
  { href: "/", label: "Index" },
  { href: "/about", label: "Profile" },
  { href: "/portfolio", label: "Research" },
  { href: "/blog", label: "Field Notes" },
  { href: "/contact", label: "Contact" },
];

const elsewhere = [
  { href: "https://www.linkedin.com/in/oladoyin-abidemi-akintola-975780237", label: "LinkedIn" },
  { href: "https://www.researchgate.net/profile/Oladoyin-Akintola", label: "ResearchGate" },
  { href: "https://orcid.org/0009-0006-7702-298X", label: "ORCID" },
  { href: "https://scholar.google.com/citations?user=EJXc004AAAAJ&hl=en", label: "Google Scholar" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-ink/15 bg-ink text-cream-100">
      {/* Marquee strip */}
      <div className="border-b border-cream-100/10 py-5">
        <Marquee
          items={[
            "Net-Zero Infrastructure",
            "Decision Intelligence",
            "Circular Construction",
            "SDG-Aligned Research",
            "Quantity Surveying",
            "Available for 2026 collaborations",
          ].map((t, i) => (
            <span
              key={i}
              className="font-display text-2xl italic text-cream-100/90 md:text-3xl"
            >
              {t}
            </span>
          ))}
        />
      </div>

      <div className="container-x py-20">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-3 font-mono text-[0.7rem] uppercase tracking-wider2 text-cream-100/60">
              <span className="text-gold-light">[06]</span>
              <span className="h-px w-10 bg-cream-100/30" />
              <span>End Note</span>
            </p>
            <h3 className="display mt-6 text-5xl text-cream-50 md:text-7xl">
              Building <em className="text-gold-light">paper-zero</em>
              <br /> futures, together.
            </h3>
            <Link
              href="/contact"
              className="mt-10 inline-flex items-center gap-3 border-b border-cream-100/30 pb-2 font-mono text-xs uppercase tracking-wider2 text-cream-100/80 transition-all hover:border-gold-light hover:text-gold-light"
            >
              Start a conversation
              <span aria-hidden>↗</span>
            </Link>
          </div>

          <div className="grid gap-12 sm:grid-cols-2 lg:col-span-5">
            <div>
              <h4 className="font-mono text-[0.7rem] uppercase tracking-wider2 text-cream-100/50">
                Navigate
              </h4>
              <ul className="mt-5 space-y-3">
                {explore.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="link-underline font-display text-xl text-cream-100/90 hover:text-cream-50"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-mono text-[0.7rem] uppercase tracking-wider2 text-cream-100/50">
                Elsewhere
              </h4>
              <ul className="mt-5 space-y-3">
                {elsewhere.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-underline font-display text-xl text-cream-100/90 hover:text-cream-50"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-24 border-t border-cream-100/10 pt-10">
          <h2
            aria-hidden
            className="display select-none text-[clamp(4rem,16vw,16rem)] leading-none text-cream-50/95"
          >
            Akintola<span className="text-gold-light">.</span>
          </h2>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-cream-100/10 pt-8 font-mono text-[0.7rem] uppercase tracking-wider2 text-cream-100/50 md:flex-row md:items-center">
          <p>© {year} Oladoyin A. Akintola — All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-gold-light" />
            Lagos · Akure · Worldwide
          </p>
          <p>
            Made with intention <span className="text-gold-light">✦</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
