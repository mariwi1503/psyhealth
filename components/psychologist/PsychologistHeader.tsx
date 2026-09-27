"use client";

import { Bell, LogOut, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export function PsychologistHeader() {
  const pathname = usePathname();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const getHeaderContent = () => {
    if (pathname === '/psychologist') return { title: 'Beranda Psikolog', subtitle: 'Pantau jadwal hari ini dan aktivitas Anda.' };
    if (pathname.includes('/psychologist/schedule')) return { title: 'Manajemen Jadwal', subtitle: 'Atur ketersediaan dan lihat kalender sesi konsultasi.' };
    if (pathname.includes('/psychologist/patients')) return { title: 'Daftar Pasien', subtitle: 'Kelola data pasien dan rekam medis (catatan sesi).' };
    if (pathname.includes('/psychologist/earnings')) return { title: 'Pendapatan', subtitle: 'Pantau riwayat transaksi dan penarikan dana.' };
    if (pathname.includes('/psychologist/settings')) return { title: 'Pengaturan Profil', subtitle: 'Perbarui profil publik, spesialisasi, dan tarif.' };
    return { title: 'Dashboard Psikolog', subtitle: 'Panel manajemen psikolog.' };
  };

  const { title, subtitle } = getHeaderContent();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      <div className="flex flex-1 items-center gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{title}</h1>
          <p className="text-xs text-slate-500 hidden sm:block">{subtitle}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4 relative">
        <button className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 border-2 border-white" />
        </button>
        
        <div className="relative" ref={menuRef}>
          <button 
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-medium border border-indigo-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            DR
          </button>
          
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-100 py-1 z-50 overflow-hidden">
              <div className="px-4 py-2 border-b border-slate-100">
                <p className="text-sm font-medium text-slate-900">Dr. Budi Santoso</p>
                <p className="text-xs text-slate-500 truncate">budi.s@psyhealth.com</p>
              </div>
              <button className="w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2 transition-colors">
                <User className="h-4 w-4 text-slate-400" /> Profil Saya
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
              >
                <LogOut className="h-4 w-4 text-red-500" /> Keluar
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
