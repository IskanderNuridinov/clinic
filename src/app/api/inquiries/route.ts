import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function authCheck(req: NextRequest) {
  return req.cookies.get("admin-session")?.value === process.env.ADMIN_SECRET;
}

export async function GET(req: NextRequest) {
  if (!authCheck(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
