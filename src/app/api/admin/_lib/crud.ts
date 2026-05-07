import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/guard";

type PrismaModel =
  | "blogPost"
  | "certificate"
  | "contactChannel"
  | "aboutFact"
  | "project";

interface CrudOpts {
  model: PrismaModel;
  /** Fields allowed on create/update. */
  fields: string[];
  /** Defaults applied on create when keys are missing. */
  defaults?: Record<string, unknown>;
  /** Order field used for default ordering (default: "order"). */
  orderBy?: string;
  /** Optional filter (e.g. by `page` or `group`) parsed from search params. */
  filterParam?: string;
  filterField?: string;
}

function pick(body: Record<string, unknown>, fields: string[]) {
  const data: Record<string, unknown> = {};
  for (const k of fields) if (k in body) data[k] = body[k];
  return data;
}

function p(model: PrismaModel) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (prisma as any)[model];
}

export function makeCollectionRoutes(opts: CrudOpts) {
  const orderBy = opts.orderBy ?? "order";

  async function GET(req: Request) {
    const url = new URL(req.url);
    const where: Record<string, unknown> = {};
    if (opts.filterParam && opts.filterField) {
      const v = url.searchParams.get(opts.filterParam);
      if (v) where[opts.filterField] = v;
    }
    const rows = await p(opts.model).findMany({
      where,
      orderBy: { [orderBy]: "asc" },
    });
    return NextResponse.json(rows);
  }

  async function POST(req: Request) {
    const guard = await requireAdmin();
    if (guard) return guard;
    const body = (await req.json()) as Record<string, unknown>;
    const data = { ...(opts.defaults ?? {}), ...pick(body, opts.fields) };
    const created = await p(opts.model).create({ data });
    return NextResponse.json(created);
  }

  return { GET, POST };
}

export function makeItemRoutes(opts: Pick<CrudOpts, "model" | "fields">) {
  async function PATCH(
    req: Request,
    { params }: { params: { id: string } },
  ) {
    const guard = await requireAdmin();
    if (guard) return guard;
    const body = (await req.json()) as Record<string, unknown>;
    const data = pick(body, opts.fields);
    const updated = await p(opts.model).update({
      where: { id: params.id },
      data,
    });
    return NextResponse.json(updated);
  }

  async function DELETE(
    _req: Request,
    { params }: { params: { id: string } },
  ) {
    const guard = await requireAdmin();
    if (guard) return guard;
    await p(opts.model).delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  }

  return { PATCH, DELETE };
}
