"use client";

import { useState, useEffect } from "react";
import { Search, X, Check, Play, XCircle, Trash2, Edit2 } from "lucide-react";
import { getLocalData, initialBookings, setLocalData } from "@/lib/mockData";

export default function BookingsPage() {
  const [bookings, setBookings] = useState(initialBookings);
  const [mounted, setMounted] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    bookingId: string;
    nextStatus: string;
    confirmText: string;
  } | null>(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [typeFilter, setTypeFilter] = useState("Semua");

  useEffect(() => {
    // using _v2 to clear cache and load new status data
    setBookings(getLocalData("psyhealth_bookings_v2", initialBookings));
    setMounted(true);
  }, []);

  const updateStatus = (id: string, newStatus: string) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: newStatus } : b);
    setBookings(updated);
    setLocalData("psyhealth_bookings_v2", updated);
    
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking({ ...selectedBooking, status: newStatus });
    }
  };

  const handleDelete = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    setLocalData("psyhealth_bookings_v2", updated);
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'Selesai': return 'bg-emerald-100 text-emerald-700';
      case 'Sedang Berlangsung': return 'bg-purple-100 text-purple-700';
      case 'Terjadwal': return 'bg-blue-100 text-blue-700';
      case 'Menunggu Verifikasi': return 'bg-amber-100 text-amber-700';
      case 'Menunggu Pembayaran': return 'bg-orange-100 text-orange-700';
      case 'Dibatalkan': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const filteredBookings = bookings.filter(b => {
    const matchSearch = b.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        b.patient.toLowerCase().includes(searchQuery.toLowerCase()) || 
                        b.professional.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "Semua" || b.status === statusFilter;
    const matchType = typeFilter === "Semua" || b.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  if (!mounted) return null;

  return (
    <div className="space-y-6 max-w-7xl mx-auto relative">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari ID, Pasien, atau Psikolog..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-colors"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-700"
            >
              <option value="Semua">Semua Jenis</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-10 px-3 rounded-lg border border-slate-200 bg-white text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-700"
            >
              <option value="Semua">Semua Status</option>
              <option value="Menunggu Pembayaran">Menunggu Pembayaran</option>
              <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
              <option value="Terjadwal">Terjadwal</option>
              <option value="Sedang Berlangsung">Sedang Berlangsung</option>
              <option value="Selesai">Selesai</option>
              <option value="Dibatalkan">Dibatalkan</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium">ID Pemesanan</th>
                <th className="px-6 py-4 font-medium">Pasien</th>
                <th className="px-6 py-4 font-medium">Psikolog</th>
                <th className="px-6 py-4 font-medium">Jadwal</th>
                <th className="px-6 py-4 font-medium">Jenis</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.map((booking) => {
                const dateObj = new Date(booking.date);
                const formattedDate = dateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
                const formattedTime = dateObj.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
                
                return (
                  <tr 
                    key={booking.id} 
                    onClick={() => setSelectedBooking({ ...booking, formattedDate, formattedTime })}
                    className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                  >
                    <td className="px-6 py-4 font-medium text-slate-900 group-hover:text-teal-700 transition-colors">{booking.id}</td>
                    <td className="px-6 py-4 text-slate-900 font-medium">{booking.patient}</td>
                    <td className="px-6 py-4 text-slate-600">{booking.professional}</td>
                    <td className="px-6 py-4 text-slate-600">
                      <div className="flex flex-col">
                        <span className="font-medium text-slate-900">{formattedDate}</span>
                        <span className="text-xs">{formattedTime} WIB</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-600">{booking.type}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium whitespace-nowrap ${getStatusStyle(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        {/* Primary Action (Next Step) */}
                        {['Menunggu Pembayaran', 'Menunggu Verifikasi', 'Terjadwal', 'Sedang Berlangsung'].includes(booking.status) && (
                          <button 
                            title="Update Status"
                            onClick={(e) => {
                              e.stopPropagation();
                              
                              let nextStatus = '';
                              let confirmText = '';
                              
                              if (booking.status === 'Menunggu Pembayaran') {
                                nextStatus = 'Menunggu Verifikasi';
                                confirmText = 'Konfirmasi Pembayaran';
                              } else if (booking.status === 'Menunggu Verifikasi') {
                                nextStatus = 'Terjadwal';
                                confirmText = 'Verifikasi Pesanan';
                              } else if (booking.status === 'Terjadwal') {
                                nextStatus = 'Sedang Berlangsung';
                                confirmText = 'Mulai Sesi';
                              } else if (booking.status === 'Sedang Berlangsung') {
                                nextStatus = 'Selesai';
                                confirmText = 'Selesaikan Sesi';
                              }
                              
                              setConfirmModal({
                                isOpen: true,
                                bookingId: booking.id,
                                nextStatus,
                                confirmText
                              });
                            }}
                            className="p-1.5 text-teal-600 hover:text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                        )}

                        {/* Secondary Action (Cancel / Delete) */}
                        {['Menunggu Pembayaran', 'Menunggu Verifikasi', 'Terjadwal'].includes(booking.status) && (
                          <button 
                            title="Batalkan"
                            onClick={() => updateStatus(booking.id, 'Dibatalkan')}
                            className="p-1.5 text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        )}
                        {booking.status === 'Sedang Berlangsung' && (
                          <button 
                            title="Batalkan"
                            disabled
                            className="p-1.5 text-slate-400 bg-slate-50 cursor-not-allowed rounded-lg transition-colors"
                          >
                            <XCircle className="h-4 w-4" />
                          </button>
                        )}
                        {(booking.status === 'Selesai' || booking.status === 'Dibatalkan') && (
                          <button 
                            title="Hapus Data"
                            onClick={() => handleDelete(booking.id)}
                            className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                    Tidak ada jadwal pemesanan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DETAIL */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Detail Pemesanan</h2>
                <p className="text-sm text-slate-500 mt-0.5">ID: {selectedBooking.id}</p>
              </div>
              <button 
                onClick={() => setSelectedBooking(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Pasien</p>
                    <p className="font-medium text-slate-900">{selectedBooking.patient}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Psikolog</p>
                    <p className="font-medium text-slate-900">{selectedBooking.professional}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Jadwal Sesi</p>
                    <p className="font-medium text-slate-900">{selectedBooking.formattedDate} - {selectedBooking.formattedTime} WIB</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Jenis Layanan</p>
                    <p className="font-medium text-slate-900">{selectedBooking.type}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Total Biaya</p>
                    <p className="font-medium text-slate-900">Rp {selectedBooking.amount.toLocaleString('id-ID')}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Status Saat Ini</p>
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium ${getStatusStyle(selectedBooking.status)}`}>
                      {selectedBooking.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedBooking(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRMATION MODAL */}
      {confirmModal?.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-teal-100 mb-4">
                <Check className="h-6 w-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Update Status</h3>
              <p className="text-sm text-slate-500 mt-2">
                Apakah Anda yakin ingin memproses pemesanan ini ke tahap <span className="font-semibold text-slate-700">{confirmModal.nextStatus}</span>?
              </p>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
              <button 
                onClick={() => setConfirmModal(null)}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors"
              >
                Batal
              </button>
              <button 
                onClick={() => {
                  updateStatus(confirmModal.bookingId, confirmModal.nextStatus);
                  setConfirmModal(null);
                }}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors"
              >
                {confirmModal.confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
