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

  // ── Hero carousel slides ────────────────────────────
  const slides = [
    {
      src: "/portraits/doyin-hero-1.jpg",
      alt: "Oladoyin Akintola — outdoor portrait, gold light",
      tint: "gold",
      label: "Plate / 01",
      caption: "Researcher · Quantity Surveyor · Akure",
      position: "right center",
      order: 0,
    },
    {
      src: "/portraits/doyin-hero-3.jpg",
      alt: "Oladoyin Akintola — keynote stance",
      tint: "ink",
      label: "Plate / 02",
      caption: "Public lecture · GBCN · 2025",
      position: "right center",
      order: 1,
    },
    {
      src: "/portraits/doyin-hero-2.jpg",
      alt: "Oladoyin Akintola — formal portrait",
      tint: "rust",
      label: "Plate / 03",
      caption: "Convocation · FUTA · 2024",
      position: "right center",
      order: 2,
    },
    {
      src: "/portraits/doyin-research.jpg",
      alt: "Oladoyin Akintola — studio portrait, warm interior",
      tint: "moss",
      label: "Plate / 04",
      caption: "B.Tech (1ˢᵗ Class) Quantity Surveying · FUTA",
      position: "55% 22%",
      order: 3,
    },
  ];
  await prisma.heroSlide.deleteMany();
  for (const s of slides) await prisma.heroSlide.create({ data: s });
  console.log(`✔ HeroSlide: ${slides.length}`);

  // ── Briefs (Contact page) ───────────────────────────
  const briefs = [
    "PhD supervision · placement",
    "Consulting · advisory",
    "Public lecture · keynote",
    "Editorial · peer review",
    "Press · interview",
  ];
  await prisma.brief.deleteMany();
  for (let i = 0; i < briefs.length; i++) {
    await prisma.brief.create({ data: { title: briefs[i], order: i } });
  }
  console.log(`✔ Brief: ${briefs.length}`);

  // ── Contact channels ────────────────────────────────
  const channels = [
    { label: "Email", value: "akintolaoladoyin86", href: "mailto:akintolaoladoyin86@gmail.com", icon: "mail", order: 0 },
    { label: "Phone", value: "+234 810 7722 097", href: "tel:+2348107722097", icon: "phone", order: 1 },
    { label: "LinkedIn", value: "/in/oladoyinakintola", href: "https://linkedin.com/in/oladoyinakintola", icon: "linkedin", order: 2 },
    { label: "Google Scholar", value: "Akintola, O.A.", href: "https://scholar.google.com", icon: "scholar", order: 3 },
    { label: "ORCID", value: "0000-0000-0000-0000", href: "https://orcid.org", icon: "orcid", order: 4 },
    { label: "ResearchGate", value: "Oladoyin-Akintola", href: "https://researchgate.net", icon: "researchgate", order: 5 },
  ];
  await prisma.contactChannel.deleteMany();
  for (const c of channels) await prisma.contactChannel.create({ data: c });
  console.log(`✔ ContactChannel: ${channels.length}`);

  // ── Timeline (About page) ───────────────────────────
  const timeline = [
    { year: "2026", title: "Open briefs · 2026", body: "Currently accepting research collaborations, consulting briefs, public lectures, and editorial work.", tag: "Now", order: 0 },
    { year: "2025", title: "Two papers published", body: "First-author and co-author research released in *Energy and Buildings* and the *Australasian Journal of Construction Economics & Building*.", tag: "Publication", order: 1 },
    { year: "2024", title: "B.Tech (1ˢᵗ Class) — FUTA", body: "Graduated top of class in Quantity Surveying from the Federal University of Technology, Akure.", tag: "Milestone", order: 2 },
    { year: "2023", title: "Joined RG-SIM+ · GBCN", body: "Began affiliation with Research Group on Sustainable Infrastructure Modelling+ and the Green Building Council of Nigeria.", tag: "Affiliation", order: 3 },
  ];
  await prisma.timelineEntry.deleteMany();
  for (const t of timeline) await prisma.timelineEntry.create({ data: t });
  console.log(`✔ TimelineEntry: ${timeline.length}`);

  // ── Highlights (About page Three Movements) ─────────
  const highlights = [
    { n: "01", title: "Research as practice", body: "Decision intelligence isn't a tool — it's a discipline. The numbers earn the policy.", order: 0 },
    { n: "02", title: "Net-zero, in earnest", body: "Carbon-neutral infrastructure pathways calibrated for the realities of developing economies.", order: 1 },
    { n: "03", title: "Circularity over rhetoric", body: "Closing material loops in construction and reframing the value chain around regeneration.", order: 2 },
  ];
  await prisma.highlight.deleteMany();
  for (const h of highlights) await prisma.highlight.create({ data: h });
  console.log(`✔ Highlight: ${highlights.length}`);

  // ── About facts (sidebar At a glance) ───────────────
  const aboutFacts = [
    { k: "Education", v: "B.Tech (1ˢᵗ Class) — FUTA", order: 0 },
    { k: "Affiliation", v: "RG-SIM+ · GBCN", order: 1 },
    { k: "Focus", v: "Net-Zero · Circularity", order: 2 },
    { k: "Region", v: "Nigeria · Sub-Saharan Africa", order: 3 },
    { k: "Languages", v: "English · Yorùbá", order: 4 },
    { k: "Status", v: "Open to PhD / Consulting", order: 5 },
  ];
  await prisma.aboutFact.deleteMany();
  for (const a of aboutFacts) await prisma.aboutFact.create({ data: a });
  console.log(`✔ AboutFact: ${aboutFacts.length}`);

  // ── Atelier facts (Home page) ───────────────────────
  const atelier = [
    { k: "Based in", v: "Akure, Nigeria", order: 0 },
    { k: "Working hours", v: "Mon–Fri · WAT", order: 1 },
    { k: "Tools", v: "R · Stata · LaTeX", order: 2 },
    { k: "Reading", v: "Energy & Buildings", order: 3 },
    { k: "Listening", v: "Asa · Sade · Burna", order: 4 },
    { k: "On the desk", v: "Net-zero pathways draft", order: 5 },
  ];
  await prisma.atelierFact.deleteMany();
  for (const a of atelier) await prisma.atelierFact.create({ data: a });
  console.log(`✔ AtelierFact: ${atelier.length}`);

  // ── PageHero specs ──────────────────────────────────
  const heroSpecs = [
    // about
    { page: "about", k: "Based", v: "Akure · Lagos", order: 0 },
    { page: "about", k: "Degree", v: "B.Tech 1ˢᵗ · FUTA", order: 1 },
    { page: "about", k: "Affiliation", v: "RG-SIM+ · GBCN", order: 2 },
    { page: "about", k: "Focus", v: "Net-Zero · Circular", order: 3 },
    { page: "about", k: "Languages", v: "English · Yorùbá", order: 4 },
    { page: "about", k: "Status", v: "PhD / Consulting", order: 5 },
    // portfolio
    { page: "portfolio", k: "Papers", v: "02 published", order: 0 },
    { page: "portfolio", k: "Citations", v: "Growing", order: 1 },
    { page: "portfolio", k: "Outlets", v: "E&B · AJCEB", order: 2 },
    { page: "portfolio", k: "Issue", v: "Nº 01 · Vol. I", order: 3 },
    { page: "portfolio", k: "Volume", v: "MMXXVI", order: 4 },
    { page: "portfolio", k: "Status", v: "Open briefs", order: 5 },
    // contact
    { page: "contact", k: "Reply", v: "Within 48 hrs", order: 0 },
    { page: "contact", k: "Timezone", v: "WAT (UTC+1)", order: 1 },
    { page: "contact", k: "Hours", v: "Mon–Fri", order: 2 },
    { page: "contact", k: "Email", v: "akintolaoladoyin86", order: 3 },
    { page: "contact", k: "Phone", v: "+234 810 7722 097", order: 4 },
    { page: "contact", k: "Status", v: "Open 2026", order: 5 },
  ];
  await prisma.pageHeroSpec.deleteMany();
  for (const s of heroSpecs) await prisma.pageHeroSpec.create({ data: s });
  console.log(`✔ PageHeroSpec: ${heroSpecs.length}`);

  // ── Nav links ───────────────────────────────────────
  const nav = [
    { group: "navbar", label: "Index", href: "/", order: 0 },
    { group: "navbar", label: "Profile", href: "/about", order: 1 },
    { group: "navbar", label: "Research", href: "/portfolio", order: 2 },
    { group: "navbar", label: "Field Notes", href: "/blog", order: 3 },
    { group: "navbar", label: "Contact", href: "/contact", order: 4 },
    { group: "footer-primary", label: "Profile", href: "/about", order: 0 },
    { group: "footer-primary", label: "Research", href: "/portfolio", order: 1 },
    { group: "footer-primary", label: "Contact", href: "/contact", order: 2 },
    { group: "footer-social", label: "LinkedIn", href: "https://linkedin.com", order: 0 },
    { group: "footer-social", label: "Google Scholar", href: "https://scholar.google.com", order: 1 },
    { group: "footer-social", label: "ORCID", href: "https://orcid.org", order: 2 },
  ];
  await prisma.navLink.deleteMany();
  for (const n of nav) await prisma.navLink.create({ data: n });
  console.log(`✔ NavLink: ${nav.length}`);

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
