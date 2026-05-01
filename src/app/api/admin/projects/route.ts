import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const body = await req.json();
  const created = await prisma.project.create({
    data: {
      n: body.n ?? "00",
      year: body.year ?? "",
      title: body.title ?? "Untitled",
      desc: body.desc ?? "",
      tags: typeof body.tags === "string" ? body.tags : JSON.stringify(body.tags ?? []),
      href: body.href ?? null,
      venue: body.venue ?? null,
      role: body.role ?? null,
      image: body.image ?? "",
      order: body.order ?? 0,
      published: body.published ?? true,
    },
  });
  return NextResponse.json(created);
}
