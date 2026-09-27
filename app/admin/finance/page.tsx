"use client";

import { useState, useEffect } from "react";
import { Search, Download, Trash2 } from "lucide-react";
import { getLocalData, initialFinance, setLocalData } from "@/lib/mockData";

export default function FinancePage() {
  const [invoices, setInvoices] = useState(initialFinance);
  const [mounted, setMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [methodFilter, setMethodFilter] = useState("Semua");

  useEffect(() => {
    setInvoices(getLocalData("psyhealth_finance", initialFinance));
    setMounted(true);
  }, []);

  const handleDelete = (id: string) => {
    const updated = invoices.filter(inv => inv.id !== id);
    setInvoices(updated);
    setLocalData("psyhealth_finance", updated);
  };

  const updateStatus = (id: string, newStatus: string) => {
    const updated = invoices.map(inv => inv.id === id ? { ...inv, status: newStatus } : inv);
    setInvoices(updated);
    setLocalData("psyhealth_finance", updated);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount);
  };

  const filteredInvoices = invoices.filter(inv => {
    const matchSearch = inv.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        inv.bookingId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "Semua" || inv.status === statusFilter;
    const matchMethod = methodFilter === "Semua" || inv.method === methodFilter;
    return matchSearch && matchStatus && matchMethod;
  });

  if (!mounted) return null;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari ID Invoice atau Booking..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-colors"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select 
              value={methodFilter}
              onChange={(e) => setMethodFilter(e.target.value)}
              className="h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-700"
            >
              <option value="Semua">Semua Metode</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="GoPay">GoPay</option>
              <option value="OVO">OVO</option>
              <option value="Credit Card">Credit Card</option>
            </select>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-700"
            >
              <option value="Semua">Semua Status</option>
              <option value="Lunas">Lunas</option>
              <option value="Pending">Pending</option>
              <option value="Gagal">Gagal</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium">No. Invoice</th>
                <th className="px-6 py-4 font-medium">ID Booking</th>
                <th className="px-6 py-4 font-medium">Tanggal</th>
                <th className="px-6 py-4 font-medium">Metode Pembayaran</th>
                <th className="px-6 py-4 font-medium">Jumlah</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{inv.id}</td>
                  <td className="px-6 py-4 text-slate-600">{inv.bookingId}</td>
                  <td className="px-6 py-4 text-slate-600">{inv.date}</td>
                  <td className="px-6 py-4 text-slate-600">{inv.method}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{formatCurrency(inv.amount)}</td>
                  <td className="px-6 py-4">
                    <select 
                      value={inv.status}
                      onChange={(e) => updateStatus(inv.id, e.target.value)}
                      className={`text-xs font-medium px-2 py-1 rounded-full border-0 cursor-pointer ${
                        inv.status === 'Berhasil' ? 'bg-emerald-100 text-emerald-700' :
                        inv.status === 'Tertunda' ? 'bg-amber-100 text-amber-700' :
                        'bg-red-100 text-red-700'
                      }`}
                    >
                      <option value="Berhasil">Berhasil</option>
                      <option value="Tertunda">Tertunda</option>
                      <option value="Gagal">Gagal</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => handleDelete(inv.id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredInvoices.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    Tidak ada data transaksi.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
