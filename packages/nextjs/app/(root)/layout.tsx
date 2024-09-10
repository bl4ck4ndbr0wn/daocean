import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Dao Home",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
