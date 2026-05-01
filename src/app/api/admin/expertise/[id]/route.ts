import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const body = await req.json();
  const data: Record<string, unknown> = {};
  for (const k of ["n", "title", "desc", "icon", "order"]) {
    if (k in body) data[k] = body[k];
  }
  const updated = await prisma.expertise.update({
    where: { id: params.id },
    data,
  });
  return NextResponse.json(updated);
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } },
) {
  const guard = await requireAdmin();
  if (guard) return guard;
  await prisma.expertise.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
