import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await prisma.intelItem.findMany({ orderBy: [{ urgency: "asc" }, { publishedAt: "desc" }, { createdAt: "desc" }] }));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  if (!body.title || !body.source || !body.sourceUrl || !body.topic || !body.summary) return NextResponse.json({ error: "title, source, URL, topic and summary are required" }, { status: 400 });
  const item = await prisma.intelItem.create({ data: { title: body.title, source: body.source, sourceUrl: body.sourceUrl, topic: body.topic, summary: body.summary, publishedAt: body.publishedAt ? new Date(body.publishedAt) : null, credibility: body.credibility || "primary", posture: body.posture || "read", urgency: body.urgency || "routine" } });
  return NextResponse.json(item, { status: 201 });
}

export async function PATCH(req: NextRequest) {
  const { id, posture, urgency } = await req.json();
  if (!id) return NextResponse.json({ error: "id required" }, { status: 400 });
  return NextResponse.json(await prisma.intelItem.update({ where: { id }, data: { ...(posture ? { posture } : {}), ...(urgency ? { urgency } : {}) } }));
}
