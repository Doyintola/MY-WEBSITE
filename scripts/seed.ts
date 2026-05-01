/**
 * Seed initial content from the hardcoded values currently shipped on the site.
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
    create: {
      email,
      name: "Site Owner",
      passwordHash,
      role: "admin",
    },
  });
  console.log(`✔ Admin: ${email} / ${password}`);

  // ── Site content (key/value JSON) ───────────────────
  const content: Record<string, unknown> = {
    "hero.eyebrow.left": "Available for 2026 collaborations",
    "hero.eyebrow.right": "Akure · Lagos · Worldwide / Issue Nº 01",
    "hero.title.line1": "Net-zero is",
    "hero.title.line2": "not a slogan.",
    "hero.body":
      "I'm Oladoyin A. Akintola — a researcher, consultant, and infrastructure innovator translating decision intelligence into net-zero, circular construction for developing economies.",
    "hero.cta.primary.label": "Read the Research",
    "hero.cta.primary.href": "/portfolio",
    "hero.cta.secondary.label": "The Profile",
    "hero.cta.secondary.href": "/about",
    "about.bio":
      "A graduate researcher and quantity surveyor with a first-class B.Tech from FUTA, working at the intersection of net-zero infrastructure, circular construction, and decision intelligence for developing economies.",
    "contact.email": "doyin.akintola@example.com",
    "contact.location": "Akure · Lagos · Worldwide",
    "contact.linkedin": "",
  };
  for (const [key, value] of Object.entries(content)) {
    await prisma.siteContent.upsert({
      where: { key },
      update: { value: JSON.stringify(value) },
      create: { key, value: JSON.stringify(value) },
    });
  }
  console.log(`✔ SiteContent: ${Object.keys(content).length} keys`);

  // ── Stats ───────────────────────────────────────────
  const stats = [
    { num: "05+", label: "Years researching", sub: "FUTA · GBCN · RG-SIM+", order: 0 },
    { num: "02", label: "Peer-reviewed papers", sub: "Energy & Buildings · AJCEB", order: 1 },
    { num: "1ˢᵗ", label: "Class B.Tech (FUTA)", sub: "Quantity Surveying", order: 2 },
    { num: "SDG", label: "Aligned advocacy", sub: "11 · 12 · 13", order: 3 },
  ];
  await prisma.stat.deleteMany();
  for (const s of stats) await prisma.stat.create({ data: s });
  console.log(`✔ Stats: ${stats.length}`);

  // ── Marquee ─────────────────────────────────────────
  const marquee = [
    "Net-Zero Infrastructure",
    "Circular Construction",
    "Decision Intelligence",
    "Sustainable Development",
    "Quantity Surveying",
    "Climate-Responsive Design",
  ];
  await prisma.marqueeItem.deleteMany();
  for (let i = 0; i < marquee.length; i++) {
    await prisma.marqueeItem.create({ data: { text: marquee[i], order: i } });
  }
  console.log(`✔ Marquee: ${marquee.length}`);

  // ── Expertise ───────────────────────────────────────
  const expertise = [
    { n: "01", title: "Construction Management", desc: "Strategic oversight and optimization of construction projects with focus on sustainability and efficiency.", icon: "Building2", order: 0 },
    { n: "02", title: "Net-Zero Infrastructure", desc: "Carbon-neutral infrastructure pathways calibrated for developing economies.", icon: "Leaf", order: 1 },
    { n: "03", title: "Decision Intelligence", desc: "Data-driven frameworks linking quantitative evidence to infrastructure choices.", icon: "Brain", order: 2 },
    { n: "04", title: "Quantitative Analysis", desc: "Advanced statistical and mathematical methodologies for complex built-environment problems.", icon: "Calculator", order: 3 },
    { n: "05", title: "Stakeholder Engagement", desc: "Optimising the relationship between people, policy, and infrastructure outcomes.", icon: "Handshake", order: 4 },
    { n: "06", title: "Circular Economy", desc: "Closing material loops in construction and reframing the value chain around regeneration.", icon: "CircleDashed", order: 5 },
  ];
  await prisma.expertise.deleteMany();
  for (const e of expertise) await prisma.expertise.create({ data: e });
  console.log(`✔ Expertise: ${expertise.length}`);

  // ── Projects (research portfolio rows) ──────────────
  const projects = [
    {
      n: "01",
      year: "2025",
      title: "Evaluating Net-Zero Carbon Emissions Benefits in Nigeria's Construction Industry",
      desc: "A comprehensive evaluation of the economic, environmental, and social benefits of transitioning Nigeria's construction sector toward net-zero. Mixed-methods analysis grounded in stakeholder interviews and emissions accounting.",
      tags: JSON.stringify(["Net-Zero", "Carbon Accounting", "Nigeria"]),
      href: "https://doi.org/10.1016/j.enbuild.2025.116509",
      venue: "Energy and Buildings",
      role: "First author · methodology · writing",
      image: "/portraits/doyin-research.jpg",
      order: 0,
    },
    {
      n: "02",
      year: "2025",
      title: "Awareness and Practice of Circular Economy Principles Among Construction Stakeholders in Nigeria",
      desc: "An empirical investigation into how Nigerian construction professionals understand and operationalise circular-economy thinking — surfacing the gap between rhetoric and yard-level practice.",
      tags: JSON.stringify(["Circular Economy", "Stakeholder Analysis", "Survey"]),
      href: "https://doi.org/10.5130/ajceb.v25i2.9126",
      venue: "Construction Economics & Building",
      role: "Co-author · data analysis · review",
      image: "/portraits/doyin-portfolio-1.jpg",
      order: 1,
    },
  ];
  await prisma.project.deleteMany();
  for (const p of projects) await prisma.project.create({ data: p });
  console.log(`✔ Projects: ${projects.length}`);

  // ── Research papers (homepage strip) ────────────────
  const research = [
    {
      year: "2025",
      journal: "Energy and Buildings",
      title: "Evaluating Net-Zero Carbon Emissions Benefits in Nigeria's Construction Industry",
      desc: "A comprehensive study of the economic, environmental, and social benefits of transitioning Nigeria's construction sector toward net-zero.",
      tags: JSON.stringify(["Net-Zero", "Nigeria", "Carbon"]),
      href: "https://doi.org/10.1016/j.enbuild.2025.116509",
      order: 0,
    },
    {
      year: "2025",
      journal: "Australasian Journal of Construction Economics & Building",
      title: "Awareness and Practice of Circular Economy Principles Among Construction Stakeholders",
      desc: "Empirical investigation into how Nigerian construction professionals understand and implement circular economy principles.",
      tags: JSON.stringify(["Circularity", "Stakeholders"]),
      href: "https://doi.org/10.5130/ajceb.v25i2.9126",
      order: 1,
    },
  ];
  await prisma.researchPaper.deleteMany();
  for (const r of research) await prisma.researchPaper.create({ data: r });
  console.log(`✔ ResearchPaper: ${research.length}`);

  console.log("\n✅ Seed complete.\n");
  console.log(`Login: ${email}`);
  console.log(`Password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
