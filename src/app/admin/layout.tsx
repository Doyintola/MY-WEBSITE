import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Providers from "./providers";
import LogoutButton from "./LogoutButton";

export const metadata: Metadata = {
  title: "Admin · Akintola",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/content", label: "Hero & Copy" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/research", label: "Research" },
  { href: "/admin/expertise", label: "Expertise" },
  { href: "/admin/stats", label: "Stats & Marquee" },
];

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await getServerSession(authOptions);

  // Login page renders without chrome
  // Detect via children path? Simpler: check session — if absent, render bare.
  // Middleware already protects everything except /admin/login, so the unauth case
  // here is only reached on /admin/login itself.
  if (!session) {
    return (
      <Providers>
        <div className="min-h-screen bg-ink text-cream-50">{children}</div>
      </Providers>
    );
  }

  return (
    <Providers>
      <div className="min-h-screen bg-cream-50 text-ink">
        <div className="flex min-h-screen">
          {/* SIDEBAR */}
          <aside className="hidden w-64 shrink-0 border-r border-ink/10 bg-ink text-cream-50 md:flex md:flex-col">
            <div className="border-b border-cream-50/15 p-6">
              <p className="font-mono text-[0.65rem] uppercase tracking-wider2 text-gold-light">
                Editorial CMS
              </p>
              <p className="mt-2 font-display text-2xl">Akintola</p>
              <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-wider2 text-cream-50/50">
                {session.user?.email}
              </p>
            </div>
            <nav className="flex-1 p-4">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="block rounded-md px-3 py-2 font-mono text-[0.75rem] uppercase tracking-wider2 text-cream-50/80 transition-colors hover:bg-cream-50/10 hover:text-gold-light"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="border-t border-cream-50/15 p-4 space-y-2">
              <Link
                href="/"
                className="block rounded-md border border-cream-50/20 px-3 py-2 text-center font-mono text-[0.7rem] uppercase tracking-wider2 hover:bg-cream-50/10"
              >
                ← View site
              </Link>
              <LogoutButton />
            </div>
          </aside>

          {/* MAIN */}
          <main className="flex-1 overflow-x-hidden">
            <div className="mx-auto max-w-5xl px-6 py-10 md:px-10 md:py-14">
              {children}
            </div>
          </main>
        </div>
      </div>
    </Providers>
  );
}
