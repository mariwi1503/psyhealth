"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Wallet, 
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Beranda", href: "/psychologist", icon: LayoutDashboard },
  { name: "Jadwal Saya", href: "/psychologist/schedule", icon: Calendar },
  { name: "Daftar Pasien", href: "/psychologist/patients", icon: Users },
  { name: "Pendapatan", href: "/psychologist/earnings", icon: Wallet },
  { name: "Pengaturan", href: "/psychologist/settings", icon: Settings },
];

export function PsychologistSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-64 flex-col bg-white border-r border-slate-200 shadow-sm">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-slate-100">
        <Link href="/psychologist" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">
            PsyHealth Pro
          </span>
        </Link>
      </div>

      <div className="flex flex-1 flex-col overflow-y-auto">
        <nav className="flex-1 space-y-1 px-4 py-4">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive && item.href !== '/psychologist' || (item.href === '/psychologist' && pathname === '/psychologist')
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 shrink-0",
                    isActive && item.href !== '/psychologist' || (item.href === '/psychologist' && pathname === '/psychologist') 
                      ? "text-indigo-600" 
                      : "text-slate-400 group-hover:text-slate-600"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-slate-200 p-4">
        <button 
          onClick={() => window.location.href = '/'}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Keluar (Logout)
        </button>
      </div>
    </div>
  );
}
