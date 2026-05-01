import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await prisma.siteContent.findMany();
  const map: Record<string, unknown> = {};
  for (const r of rows) {
    try {
      map[r.key] = JSON.parse(r.value);
    } catch {
      map[r.key] = r.value;
    }
  }
  return NextResponse.json(map);
}

export async function PUT(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const body = (await req.json()) as Record<string, unknown>;
  const ops = Object.entries(body).map(([key, value]) =>
    prisma.siteContent.upsert({
      where: { key },
      update: { value: JSON.stringify(value) },
      create: { key, value: JSON.stringify(value) },
    }),
  );
  await prisma.$transaction(ops);
  return NextResponse.json({ ok: true });
}
