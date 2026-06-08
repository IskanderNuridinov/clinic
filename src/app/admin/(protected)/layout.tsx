import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AdminLayoutClient from "./AdminLayoutClient";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin-session")?.value;
  if (session !== process.env.ADMIN_SECRET) {
    redirect("/admin/login");
  }
  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
