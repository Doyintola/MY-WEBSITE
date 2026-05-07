import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [posts, projects, certs, channels] = await Promise.all([
    prisma.blogPost.count(),
    prisma.project.count(),
    prisma.certificate.count(),
    prisma.contactChannel.count(),
  ]);

  const cards = [
    { label: "Blog posts", n: posts, href: "/admin/blog", accent: "bg-gold" },
    { label: "Projects", n: projects, href: "/admin/projects", accent: "bg-moss" },
    { label: "Certificates", n: certs, href: "/admin/certificates", accent: "bg-rust" },
    { label: "Contact channels", n: channels, href: "/admin/channels", accent: "bg-ink" },
  ];

  return (
    <div>
      <p className="font-mono text-[0.7rem] uppercase tracking-wider2 text-ink/60">
        Editorial CMS / Dashboard
      </p>
      <h1 className="mt-3 font-display text-5xl text-ink md:text-6xl">
        Welcome back.
      </h1>
      <p className="mt-3 max-w-2xl text-ink/70">
        Write posts, edit your bio, manage your certificates, projects and
        contact details. Changes save instantly and appear on the live site
        after a refresh.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
          <a
            href="/admin/blog"
            className="rounded-md bg-ink px-4 py-2 font-mono text-[0.7rem] uppercase tracking-wider2 text-cream-50 hover:bg-ink/85"
          >
            Write a post
          </a>
          <a
            href="/admin/content"
            className="rounded-md border border-ink/30 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-wider2 text-ink hover:bg-ink/5"
          >
            Edit bio
          </a>
          <a
            href="/admin/certificates"
            className="rounded-md border border-ink/30 px-4 py-2 font-mono text-[0.7rem] uppercase tracking-wider2 text-ink hover:bg-ink/5"
          >
            Add certificate
          </a>
        </div>
      </div>
    </div>
  );
}
