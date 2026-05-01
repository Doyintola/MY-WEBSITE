import { prisma } from "@/lib/db";

export default async function AdminDashboard() {
  const [projects, papers, expertise, stats, marquee] = await Promise.all([
    prisma.project.count(),
    prisma.researchPaper.count(),
    prisma.expertise.count(),
    prisma.stat.count(),
    prisma.marqueeItem.count(),
  ]);

  const cards = [
    { label: "Projects", n: projects, href: "/admin/projects", accent: "bg-gold" },
    { label: "Research papers", n: papers, href: "/admin/research", accent: "bg-moss" },
    { label: "Expertise items", n: expertise, href: "/admin/expertise", accent: "bg-rust" },
    { label: "Stats", n: stats, href: "/admin/stats", accent: "bg-ink" },
    { label: "Marquee items", n: marquee, href: "/admin/stats", accent: "bg-gold-dark" },
  ];

  return (
    <div>
      <p className="font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/60">
        Editorial CMS / Dashboard
      </p>
      <h1 className="mt-3 font-display text-5xl text-ink md:text-6xl">
        At a glance.
      </h1>
      <p className="mt-3 max-w-2xl text-ink/70">
        Manage every word and image on the published portfolio. Changes save
        instantly and appear on the live site after a hard refresh.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <a
            key={c.label}
            href={c.href}
            className="group block rounded-2xl border border-ink/15 bg-cream-100 p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            <div className={`h-1 w-12 rounded-full ${c.accent}`} />
            <p className="mt-4 font-display text-5xl text-ink">{c.n}</p>
            <p className="mt-2 font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/60">
              {c.label} →
            </p>
          </a>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border border-ink/15 bg-cream-100 p-6">
        <p className="font-mono text-[0.65rem] uppercase tracking-wider2 text-ink/60">
          Quick actions
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <a href="/admin/content" className="rounded-md bg-ink px-4 py-2 font-mono text-[0.7rem] uppercase tracking-wider2 text-cream-50 hover:bg-ink/85">
            Edit hero copy
          </a>
          <a href="/admin/projects" className="rounded-md border border-ink/30 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-wider2 text-ink hover:bg-ink/5">
            Add project
          </a>
          <a href="/admin/research" className="rounded-md border border-ink/30 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-wider2 text-ink hover:bg-ink/5">
            Add research paper
          </a>
        </div>
      </div>
    </div>
  );
}
