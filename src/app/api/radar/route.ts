import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { validateIntelItem } from "@/lib/intel";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const status = req.nextUrl.searchParams.get("status") || "all";
  return NextResponse.json(await prisma.intelItem.findMany({
    where: status === "all" ? {} : { status },
    orderBy: [{ status: "asc" }, { urgency: "asc" }, { publishedAt: "desc" }, { createdAt: "desc" }],
  }));
}

export async function POST(req: NextRequest) {
  const validated = validateIntelItem(await req.json().catch(() => ({})));
  if (!validated.ok) return NextResponse.json({ error: validated.error }, { status: 400 });
  const item = await prisma.intelItem.create({ data: validated.data });
  return NextResponse.json(item, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const { id, posture, urgency, status } = await req.json().catch(() => ({}));
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  if (posture && !["ignore", "monitor", "read", "investigate", "trial", "apply"].includes(posture)) return NextResponse.json({ error: "invalid posture" }, { status: 400 });
  if (status && !["draft", "approved", "archived"].includes(status)) return NextResponse.json({ error: "invalid status" }, { status: 400 });
  return NextResponse.json(await prisma.intelItem.update({ where: { id }, data: { ...(posture ? { posture } : {}), ...(urgency ? { urgency } : {}), ...(status ? { status } : {}) } }));
}
