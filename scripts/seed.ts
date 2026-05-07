/**
 * Seed initial content for the simplified blog-style portfolio.
 * Run with: npx tsx scripts/seed.ts
 */
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import "dotenv/config";

const prisma = new PrismaClient();

async function main() {
  // ── Admin user ──────────────────────────────────────
  const email = (process.env.ADMIN_EMAIL ?? "admin@akintola.local").toLowerCase();
  const password = process.env.ADMIN_PASSWORD ?? "changeme123";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, name: "Site Owner", passwordHash, role: "admin" },
  });
  console.log(`✔ Admin: ${email} / ${password}`);

  // ── Site content ────────────────────────────────────
  const content: Record<string, string> = {
    "site.tagline": "Researcher · Consultant · Writer",
    "home.intro.title":
      "Field notes on net-zero, circularity, and the work of evidence.",
    "home.intro.body":
      "I'm Oladoyin A. Akintola — a researcher and consultant writing about sustainable infrastructure, decision intelligence, and the quiet labour of building futures that earn their keep.",
    "about.bio":
      "Oladoyin Abidemi Akintola is a researcher working at the intersection of sustainable infrastructure, decision intelligence, and climate-responsive development. She holds a Bachelor of Technology in Quantity Surveying from the Federal University of Technology, Akure — graduating with First Class Honours.\n\nHer academic training laid a foundation in construction management and economics, which she now applies to understanding how the construction industry can transition toward net-zero systems. Her current focus is the role of decision intelligence in advancing sustainable construction across developing economies.\n\nShe writes here in long form — slow notes from the field, on what works, what doesn't, and what we still need to figure out.",
    "about.portrait": "/portraits/doyin-about.jpg",
    "contact.email": "doyin@akintola.studio",
    "contact.phone": "+234 000 000 0000",
    "contact.location": "Lagos · Nigeria",
  };
  for (const [key, value] of Object.entries(content)) {
    await prisma.siteContent.upsert({
      where: { key },
      update: { value: JSON.stringify(value) },
      create: { key, value: JSON.stringify(value) },
    });
  }
  console.log(`✔ Site content: ${Object.keys(content).length} keys`);

  // ── About facts (sidebar) ───────────────────────────
  await prisma.aboutFact.deleteMany();
  const facts = [
    ["Education", "B.Tech (1ˢᵗ Class) — FUTA"],
    ["Affiliation", "RG-SIM+ · GBCN"],
    ["Focus", "Net-Zero · Circularity"],
    ["Region", "Nigeria · Sub-Saharan Africa"],
    ["Languages", "English · Yorùbá"],
    ["Status", "Open to PhD / Consulting"],
  ];
  for (const [i, [k, v]] of facts.entries()) {
    await prisma.aboutFact.create({ data: { k, v, order: i } });
  }
  console.log(`✔ About facts: ${facts.length}`);

  // ── Contact channels ────────────────────────────────
  await prisma.contactChannel.deleteMany();
  const channels = [
    {
      label: "Email",
      value: "doyin@akintola.studio",
      href: "mailto:doyin@akintola.studio",
      icon: "mail",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/oladoyin-akintola",
      href: "https://www.linkedin.com/in/oladoyin-akintola/",
      icon: "linkedin",
    },
    {
      label: "ORCID",
      value: "0000-0000-0000-0000",
      href: "https://orcid.org/",
      icon: "orcid",
    },
    {
      label: "Google Scholar",
      value: "scholar.google.com",
      href: "https://scholar.google.com/",
      icon: "scholar",
    },
    {
      label: "ResearchGate",
      value: "researchgate.net",
      href: "https://www.researchgate.net/",
      icon: "researchgate",
    },
    {
      label: "X / Twitter",
      value: "@akintola",
      href: "https://x.com/",
      icon: "twitter",
    },
  ];
  for (const [i, c] of channels.entries()) {
    await prisma.contactChannel.create({ data: { ...c, order: i } });
  }
  console.log(`✔ Contact channels: ${channels.length}`);

  // ── Projects ────────────────────────────────────────
  await prisma.project.deleteMany();
  const projects = [
    {
      n: "01",
      year: "2025",
      title: "Decision Intelligence for Net-Zero Construction",
      desc: "A research framework mapping decision-points in construction procurement against net-zero impact for developing economies.",
      tags: JSON.stringify(["Research", "Net-Zero", "DI"]),
      role: "Lead researcher",
      venue: "RG-SIM+",
      image: "",
    },
    {
      n: "02",
      year: "2024",
      title: "Circularity Pathways in West African Housing",
      desc: "A comparative review of circular construction strategies across three West African contexts.",
      tags: JSON.stringify(["Circularity", "Policy"]),
      role: "Co-author",
      venue: "Working paper",
      image: "",
    },
  ];
  for (const [i, p] of projects.entries()) {
    await prisma.project.create({ data: { ...p, order: i } });
  }
  console.log(`✔ Projects: ${projects.length}`);

  // ── Certificates ────────────────────────────────────
  await prisma.certificate.deleteMany();
  const certs = [
    {
      title: "B.Tech, Quantity Surveying (First Class)",
      issuer: "Federal University of Technology, Akure",
      year: "2023",
    },
    {
      title: "Sustainable Construction — Short Course",
      issuer: "Green Building Council Nigeria",
      year: "2024",
    },
  ];
  for (const [i, c] of certs.entries()) {
    await prisma.certificate.create({ data: { ...c, order: i } });
  }
  console.log(`✔ Certificates: ${certs.length}`);

  // ── Sample blog posts ───────────────────────────────
  const posts = [
    {
      slug: "why-evidence-takes-time",
      title: "Why evidence takes time (and why that's the point)",
      excerpt:
        "On the slow labour of doing research that earns its keep — and the cost of skipping the patient parts.",
      tags: JSON.stringify(["Method", "Research"]),
      body: `In a world that measures velocity in dashboards, evidence is a stubborn artefact. It refuses to compress.\n\n## The shape of patience\n\nGood research is mostly the parts you don't see — the second draft of a question, the discarded survey, the fortnight spent reading the literature you thought you'd already finished.\n\n> "If we knew what we were doing, it wouldn't be called research."\n\nIt's tempting to publish the conclusion before the work has settled. But the conclusion is rarely the most useful thing we produce. The useful thing is the **method** — how we got there, what we tried, what we ruled out.\n\n## Notes I keep returning to\n\n- Write the method first, even if it changes.\n- Read more than you cite.\n- Sit with the contradictions before resolving them.\n\nMore on this next month.`,
      publishedAt: new Date("2025-09-15"),
    },
    {
      slug: "net-zero-is-not-a-spreadsheet",
      title: "Net-zero is not a spreadsheet",
      excerpt:
        "Carbon accounting is necessary but insufficient. The harder problem is institutional.",
      tags: JSON.stringify(["Net-Zero", "Policy"]),
      body: `Most of the conversations I have about net-zero start with a spreadsheet. They should start with a question: *who decides?*\n\nThe technical problem is mostly solved. We know how to specify low-carbon concrete. We know how to draft a procurement clause. The hard part is whether the people in the room have the **authority and the appetite** to choose differently.\n\n## Three institutional bottlenecks\n\n1. **Procurement timelines** that punish learning.\n2. **Risk frameworks** that penalise the unfamiliar.\n3. **Reporting cycles** that reward what's easy to measure.\n\nFix the spreadsheet without fixing these, and the spreadsheet wins anyway.`,
      publishedAt: new Date("2025-10-02"),
    },
    {
      slug: "a-short-note-on-circularity",
      title: "A short note on circularity",
      excerpt:
        "Circularity is a verb before it is a noun. A few field observations from the last quarter.",
      tags: JSON.stringify(["Circularity"]),
      body: `Circularity, in practice, is unglamorous. It is the salvaged door, the second-hand brick, the contractor who keeps a list of who needs what.\n\nThe more I look at circularity in West African construction, the more I notice that the **infrastructure for it already exists** — informally. The challenge is not invention. It is recognition.`,
      publishedAt: new Date("2025-10-20"),
    },
  ];
  for (const p of posts) {
    await prisma.blogPost.upsert({
      where: { slug: p.slug },
      update: p,
      create: p,
    });
  }
  console.log(`✔ Blog posts: ${posts.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
