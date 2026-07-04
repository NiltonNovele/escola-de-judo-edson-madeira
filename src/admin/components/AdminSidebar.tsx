import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  CalendarDays,
} from "lucide-react";

type AdminSidebarProps = {
  collapsed: boolean;
  setCollapsed: Dispatch<SetStateAction<boolean>>;
};

const AdminSidebar = ({ collapsed, setCollapsed }: AdminSidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin/login");
  };

  const tabs = [
    { path: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { path: "/admin/events", label: "Events", icon: CalendarDays },
  ];

  return (
    <div className="inline-flex">
      {/* Mobile Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[#0A3A75] text-white rounded-md"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X /> : <Menu />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-screen bg-[#0A3A75] border-r border-[#1e4f8f] z-40
          transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* LOGO */}
        <div className="h-16 flex items-center px-4 border-b border-[#1e4f8f]">
          <Image
            src="/images/logo.jpg"
            alt="EJEM"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
          />

          <div
            className={`
              ml-3 overflow-hidden transition-all duration-300
              ${collapsed ? "w-0 opacity-0" : "w-40 opacity-100"}
            `}
          >
            <p className="text-white font-bold leading-tight">
              EJEM
            </p>
          </div>
        </div>

        {/* MENU */}
        <nav className="p-3 space-y-1">
          {tabs.map(({ path, label, icon: Icon }) => (
            <Link
              key={path}
              href={path}
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-semibold uppercase
                transition-colors
                ${
                  router.pathname === path
                    ? "bg-[#1d4ed8] text-white"
                    : "text-blue-100 hover:bg-[#123f7a]"
                }
              `}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />

              <span
                className={`
                  overflow-hidden transition-all duration-300
                  ${collapsed ? "w-0 opacity-0" : "w-40 opacity-100"}
                `}
              >
                {label}
              </span>
            </Link>
          ))}
        </nav>

        {/* FOOTER */}
        <div className="absolute bottom-0 w-full border-t border-[#1e4f8f] p-3">
          {/* User */}
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-[#1d4ed8] flex items-center justify-center text-white font-bold">
              A
            </div>

            <div
              className={`
                overflow-hidden transition-all duration-300
                ${collapsed ? "w-0 opacity-0" : "w-40 opacity-100"}
              `}
            >
              <p className="text-sm text-white font-semibold">Admin User</p>
              <p className="text-xs text-blue-300">admin@ejem.org.mz</p>
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-blue-100 hover:bg-[#123f7a]"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />

            <span
              className={`
                overflow-hidden transition-all duration-300
                ${collapsed ? "w-0 opacity-0" : "w-16 opacity-100"}
              `}
            >
              Logout
            </span>
          </button>
        </div>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 bg-[#1d4ed8] text-white p-1 rounded-full"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </button>
      </aside>
    </div>
  );
};

export default AdminSidebar;
