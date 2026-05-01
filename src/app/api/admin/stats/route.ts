import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await prisma.stat.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const body = await req.json();
  const created = await prisma.stat.create({
    data: {
      num: body.num ?? "",
      label: body.label ?? "",
      sub: body.sub ?? null,
      order: body.order ?? 0,
    },
  });
  return NextResponse.json(created);
}
