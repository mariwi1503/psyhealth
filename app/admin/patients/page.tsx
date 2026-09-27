"use client";

import { useState, useEffect } from "react";
import { Plus, Search, Edit2, Trash2, X } from "lucide-react";
import { getLocalData, initialPatients, setLocalData } from "@/lib/mockData";

export default function PatientsPage() {
  const [patients, setPatients] = useState(initialPatients);
  const [mounted, setMounted] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);

  useEffect(() => {
    setPatients(getLocalData("psyhealth_patients", initialPatients));
    setMounted(true);
  }, []);

  const handleDelete = (id: string) => {
    const updated = patients.filter(p => p.id !== id);
    setPatients(updated);
    setLocalData("psyhealth_patients", updated);
  };

  if (!mounted) return null;

  return (
    <div className="space-y-6 max-w-7xl mx-auto relative">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Cari nama, email, atau ID..."
              className="h-10 w-full rounded-lg border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500 transition-colors"
            />
          </div>
          <button className="flex items-center justify-center w-full sm:w-auto gap-2 bg-teal-600 hover:bg-teal-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
            <Plus className="h-4 w-4" /> Tambah Pasien Baru
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium">ID Pasien</th>
                <th className="px-6 py-4 font-medium">Nama Pasien</th>
                <th className="px-6 py-4 font-medium">No. HP</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Tgl Terdaftar</th>
                <th className="px-6 py-4 font-medium">Total Sesi</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patients.map((patient) => (
                <tr 
                  key={patient.id} 
                  onClick={() => setSelectedPatient(patient)}
                  className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                >
                  <td className="px-6 py-4 font-medium text-slate-900 group-hover:text-teal-700 transition-colors">{patient.id}</td>
                  <td className="px-6 py-4 text-slate-900 font-medium">{patient.name}</td>
                  <td className="px-6 py-4 font-medium text-slate-600">{patient.phone}</td>
                  <td className="px-6 py-4 text-slate-600">{patient.email}</td>
                  <td className="px-6 py-4 text-slate-600">{patient.registeredAt}</td>
                  <td className="px-6 py-4 text-slate-600">{patient.totalSessions} Sesi</td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                      <button 
                        title="Edit Data"
                        className="p-1.5 text-teal-600 hover:text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button 
                        title="Hapus Data"
                        onClick={() => handleDelete(patient.id)}
                        className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center justify-center"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {patients.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-slate-500">
                    Tidak ada data pasien.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL DETAIL */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Detail Pasien</h2>
                <p className="text-sm text-slate-500 mt-0.5">ID: {selectedPatient.id}</p>
              </div>
              <button 
                onClick={() => setSelectedPatient(null)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Nama Lengkap</p>
                  <p className="font-medium text-slate-900">{selectedPatient.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Nomor HP</p>
                    <p className="font-medium text-slate-900">{selectedPatient.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Email</p>
                    <p className="font-medium text-slate-900">{selectedPatient.email}</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Total Sesi</p>
                    <p className="font-medium text-slate-900">{selectedPatient.totalSessions} Sesi</p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Status</p>
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium ${
                      selectedPatient.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {selectedPatient.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
              <button 
                onClick={() => setSelectedPatient(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
              >
                Tutup
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 rounded-xl transition-colors">
                Edit Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
