import { prisma } from "./db";

export type ContentMap = Record<string, string>;

export async function getContent(): Promise<ContentMap> {
  const rows = await prisma.siteContent.findMany();
  const map: ContentMap = {};
  for (const r of rows) {
    try {
      const v = JSON.parse(r.value);
      map[r.key] = typeof v === "string" ? v : JSON.stringify(v);
    } catch {
      map[r.key] = r.value;
    }
  }
  return map;
}

export function content(map: ContentMap, key: string, fallback = ""): string {
  return map[key] ?? fallback;
}
