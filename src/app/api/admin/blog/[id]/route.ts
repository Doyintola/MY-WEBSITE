import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/guard";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } },
) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const body = await req.json();
  const data: Record<string, unknown> = {};
  for (const k of ["title", "excerpt", "coverImage", "body", "published"]) {
    if (k in body) data[k] = body[k];
  }
  if ("slug" in body && body.slug) {
    data.slug = slugify(body.slug);
  }
  if ("tags" in body) {
    data.tags =
      typeof body.tags === "string" ? body.tags : JSON.stringify(body.tags);
  }
  if ("publishedAt" in body && body.publishedAt) {
    data.publishedAt = new Date(body.publishedAt);
  }
  const updated = await prisma.blogPost.update({
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
  await prisma.blogPost.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
