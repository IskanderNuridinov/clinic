import { NextRequest, NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function authCheck(req: NextRequest) {
  return req.cookies.get("admin-session")?.value === process.env.ADMIN_SECRET;
}

export async function GET(req: NextRequest) {
  if (!authCheck(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const supabase = await createSupabaseServerClient();
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (id) {
    const [{ data: conversation }, { data: messages }] = await Promise.all([
      supabase.from("conversations").select("*").eq("id", id).single(),
      supabase.from("messages").select("*").eq("conversation_id", id).order("created_at", { ascending: true }),
    ]);
    return NextResponse.json({ conversation, messages: messages || [] });
  }

  const { data, error } = await supabase.from("conversations").select("*").order("updated_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
