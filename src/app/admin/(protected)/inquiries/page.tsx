import { createSupabaseServerClient } from "@/lib/supabase/server";
import InquiriesTable from "@/components/admin/InquiriesTable";

export default async function InquiriesPage() {
  const supabase = await createSupabaseServerClient();
  const { data: inquiries } = await supabase.from("inquiries").select("*").order("created_at", { ascending: false });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-[family-name:var(--font-figtree)] text-[#134e4a] font-bold text-2xl">Заявки</h1>
        <span className="text-[#64748b] text-sm">{inquiries?.length ?? 0} всего</span>
      </div>
      <InquiriesTable initialInquiries={inquiries ?? []} />
    </div>
  );
}
