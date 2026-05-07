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

export async function GET() {
  const rows = await prisma.blogPost.findMany({
    orderBy: { publishedAt: "desc" },
  });
  return NextResponse.json(rows);
}

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const body = await req.json();
  const title: string = body.title || "Untitled post";
  let slug: string = body.slug ? slugify(body.slug) : slugify(title);
  if (!slug) slug = `post-${Date.now()}`;
  // ensure unique
  const exists = await prisma.blogPost.findUnique({ where: { slug } });
  if (exists) slug = `${slug}-${Date.now().toString(36).slice(-4)}`;

  const created = await prisma.blogPost.create({
    data: {
      slug,
      title,
      excerpt: body.excerpt ?? "",
      coverImage: body.coverImage || null,
      body: body.body ?? "",
      tags:
        typeof body.tags === "string"
          ? body.tags
          : JSON.stringify(body.tags ?? []),
      published: body.published ?? true,
      publishedAt: body.publishedAt ? new Date(body.publishedAt) : new Date(),
    },
  });
  return NextResponse.json(created);
}
