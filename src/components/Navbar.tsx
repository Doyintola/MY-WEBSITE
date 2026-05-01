"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Magnetic from "./Magnetic";

const links = [
  { href: "/", label: "Index", num: "01" },
  { href: "/about", label: "Profile", num: "02" },
  { href: "/portfolio", label: "Research", num: "03" },
  { href: "/blog", label: "Field Notes", num: "04" },
  { href: "/contact", label: "Contact", num: "05" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      data-light={!scrolled}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-ink/10 bg-cream/85 backdrop-blur-xl"
          : "bg-gradient-to-b from-ink/40 via-ink/15 to-transparent"
      }`}
    >
      <div className="container-x flex h-20 items-center justify-between">
        <Link href="/" className="group flex items-center gap-3">
          <span
            className={`grid h-9 w-9 place-items-center rounded-full border font-display text-base italic transition-all group-hover:border-gold group-hover:bg-gold group-hover:text-cream-50 ${
              scrolled
                ? "border-ink/30 text-ink"
                : "border-cream-50/50 text-cream-50"
            }`}
          >
            O
          </span>
          <span className="hidden flex-col leading-none sm:flex">
            <span
              className={`font-display text-base ${
                scrolled ? "text-ink" : "text-cream-50"
              }`}
            >
              Oladoyin <span className="italic text-gold-light">Akintola</span>
            </span>
            <span
              className={`font-mono text-[0.62rem] uppercase tracking-wider2 ${
                scrolled ? "text-ink/50" : "text-cream-50/70"
              }`}
            >
              Researcher · Consultant
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`group flex items-center gap-1.5 font-mono text-[0.72rem] uppercase tracking-wider2 transition-colors ${
                  scrolled
                    ? "text-ink/70 hover:text-ink"
                    : "text-cream-50/80 hover:text-cream-50"
                } ${active ? (scrolled ? "text-ink" : "text-cream-50") : ""}`}
              >
                <span className="text-gold-light group-hover:text-gold">
                  {l.num}
                </span>
                <span>{l.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Magnetic>
            <Link
              href="/contact"
              className={`btn clip-tag ${
                scrolled
                  ? "bg-ink text-cream-50 hover:bg-gold hover:text-ink"
                  : "bg-gold text-ink hover:bg-cream-50"
              }`}
            >
              <span>Let&apos;s Collaborate</span>
              <span aria-hidden>↗</span>
            </Link>
          </Magnetic>
        </div>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className={`grid h-11 w-11 place-items-center rounded-full border md:hidden ${
            scrolled
              ? "border-ink/30 text-ink"
              : "border-cream-50/40 text-cream-50"
          }`}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-ink/10 bg-cream/95 backdrop-blur-xl transition-[max-height] duration-500 md:hidden ${
          open ? "max-h-[480px]" : "max-h-0"
        }`}
      >
        <nav className="container-x flex flex-col py-6">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className="group flex items-center justify-between border-b border-ink/10 py-4 last:border-b-0"
                data-active={active}
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-[0.7rem] text-gold">
                    {l.num}
                  </span>
                  <span className="font-display text-2xl text-ink">
                    {l.label}
                  </span>
                </span>
                <span
                  className={`text-ink/40 transition-all ${
                    active ? "text-gold" : ""
                  } group-hover:translate-x-1 group-hover:text-ink`}
                >
                  →
                </span>
              </Link>
            );
          })}
          <Link href="/contact" className="btn btn-ink mt-6 self-start">
            Let&apos;s Collaborate ↗
          </Link>
        </nav>
      </div>
    </header>
  );
}
