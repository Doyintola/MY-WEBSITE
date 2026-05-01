import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await prisma.expertise.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const body = await req.json();
  const created = await prisma.expertise.create({
    data: {
      n: body.n ?? "00",
      title: body.title ?? "Untitled",
      desc: body.desc ?? "",
      icon: body.icon ?? null,
      order: body.order ?? 0,
    },
  });
  return NextResponse.json(created);
}
