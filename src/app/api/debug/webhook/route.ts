import { NextRequest, NextResponse } from "next/server";

// Stores last 5 webhook payloads in memory
const log: { ts: string; body: unknown }[] = [];

export async function POST(req: NextRequest) {
  const body = await req.json();
  log.unshift({ ts: new Date().toISOString(), body });
  if (log.length > 5) log.pop();
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json(log);
}
