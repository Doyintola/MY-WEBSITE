import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/guard";
import { signUpload } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const guard = await requireAdmin();
  if (guard) return guard;
  const { folder } = await req.json().catch(() => ({ folder: "akintola" }));
  const sig = signUpload(folder ?? "akintola");
  return NextResponse.json(sig);
}
