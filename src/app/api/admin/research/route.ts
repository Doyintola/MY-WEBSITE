import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await prisma.researchPaper.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const body = await req.json();
  const created = await prisma.researchPaper.create({
    data: {
      year: body.year ?? "",
      journal: body.journal ?? "",
      title: body.title ?? "Untitled",
      desc: body.desc ?? "",
      tags: typeof body.tags === "string" ? body.tags : JSON.stringify(body.tags ?? []),
      href: body.href ?? null,
      order: body.order ?? 0,
      published: body.published ?? true,
    },
  });
  return NextResponse.json(created);
}
