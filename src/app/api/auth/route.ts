import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const SESSION_COOKIE = "admin-session";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();
  if (username !== process.env.ADMIN_USERNAME || password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Неверные данные" }, { status: 401 });
  }
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, process.env.ADMIN_SECRET!, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 86400,
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}

export async function GET() {
  const cookieStore = await cookies();
  const val = cookieStore.get(SESSION_COOKIE)?.value;
  return NextResponse.json({ authenticated: val === process.env.ADMIN_SECRET });
}
