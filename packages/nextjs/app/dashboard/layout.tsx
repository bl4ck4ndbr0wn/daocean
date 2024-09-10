import type { Metadata } from "next";
import Sidebar from "~~/components/layout/sidebar";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dao dashboard",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen w-full bg-muted/40">
      <Sidebar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64">{children}</div>
    </div>
  );
}
