import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
export const dynamic="force-dynamic";
export async function GET(){return NextResponse.json(await prisma.labExperiment.findMany({orderBy:{updatedAt:"desc"}}));}
export async function POST(req:NextRequest){const b=await req.json();if(!b.title||!b.hypothesis)return NextResponse.json({error:"title and hypothesis required"},{status:400});return NextResponse.json(await prisma.labExperiment.create({data:{title:b.title,hypothesis:b.hypothesis,intelItemId:b.intelItemId||null,sourceUrl:b.sourceUrl||null,setup:b.setup||null,hardware:b.hardware||null,modelChoice:b.modelChoice||null,dataBoundary:b.dataBoundary||null,testSteps:b.testSteps||null,result:b.result||null,decision:b.decision||null,nextAction:b.nextAction||null,status:b.status||"planned"}}),{status:201});}
