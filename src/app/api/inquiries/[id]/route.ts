import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const statusSchema = z.enum(["new", "called", "done"]);

function authCheck(req: NextRequest) {
  return req.cookies.get("admin-session")?.value === process.env.ADMIN_SECRET;
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!authCheck(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  const body = await req.json();
  const result = statusSchema.safeParse(body.status);
  if (!result.success) return NextResponse.json({ error: "Неверный статус" }, { status: 400 });
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("inquiries").update({ status: result.data }).eq("id", id).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
