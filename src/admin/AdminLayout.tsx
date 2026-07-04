import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminSidebar from "./components/AdminSidebar";
import { useAdminSession } from "./hooks/useAdminSession";

const SIDEBAR_STORAGE_KEY = "adminSidebarCollapsed";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === "undefined") return true;
    return localStorage.getItem(SIDEBAR_STORAGE_KEY) !== "false";
  });
  const status = useAdminSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/admin/login");
    }
  }, [status, router]);

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(collapsed));
  }, [collapsed]);

  if (status !== "authenticated") return null;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Content */}
      <main
        className={`
          flex-1 bg-gray-100 p-6 transition-all duration-300
          ${collapsed ? "ml-20" : "ml-64"}
        `}
      >
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
