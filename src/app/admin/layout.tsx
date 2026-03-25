"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Flame,
  LayoutDashboard,
  Tag,
  Users,
  FolderOpen,
  Bell,
  LogOut,
  FileText,
} from "lucide-react";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/deals", label: "Fırsatlar", icon: Tag },
  { href: "/admin/users", label: "Kullanıcılar", icon: Users },
  { href: "/admin/categories", label: "Kategoriler", icon: FolderOpen },
  { href: "/admin/notifications", label: "Bildirimler", icon: Bell },
  { href: "/admin/blog", label: "Blog", icon: FileText },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setAuthed(true);
      return;
    }
    const token = localStorage.getItem("admin_token");
    if (!token) {
      router.push("/admin/login");
    } else {
      setAuthed(true);
    }
  }, [pathname, router]);

  if (!authed) return null;

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 flex items-center gap-2">
          <Flame className="w-7 h-7 text-orange-500" />
          <span className="text-xl font-extrabold text-gray-900">Alertix</span>
          <span className="text-xs bg-orange-100 text-orange-600 px-2 py-0.5 rounded-full font-semibold ml-1">
            Admin
          </span>
        </div>

        <nav className="flex-1 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 text-sm font-medium transition ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            onClick={() => {
              localStorage.removeItem("admin_token");
              router.push("/admin/login");
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition w-full"
          >
            <LogOut className="w-5 h-5" />
            Çıkış Yap
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 overflow-auto">{children}</main>
    </div>
  );
}
