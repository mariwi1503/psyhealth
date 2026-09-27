import { Search, FileText, MessageSquare } from "lucide-react";

const clients = [
  { id: "C-01", name: "Amanda S.", status: "Aktif", lastSession: "25 Sep 2026", nextSession: "02 Okt 2026", issues: ["Kecemasan", "Stres Kerja"] },
  { id: "C-02", name: "Reza F.", status: "Aktif", lastSession: "18 Sep 2026", nextSession: "02 Okt 2026", issues: ["Konflik Hubungan"] },
  { id: "C-03", name: "Deni I.", status: "Selesai", lastSession: "10 Agu 2026", nextSession: "-", issues: ["Depresi Ringan"] },
  { id: "C-04", name: "Siti K.", status: "Aktif", lastSession: "Baru", nextSession: "03 Okt 2026", issues: ["Trauma Masa Lalu"] },
];

export default function ClientsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-end">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Cari nama pasien..." 
            className="pl-10 pr-4 py-2 w-full sm:w-64 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <div key={client.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col h-full">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{client.name}</h3>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    client.status === 'Aktif' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {client.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="space-y-3 mb-6 flex-1">
              <div>
                <p className="text-xs text-slate-500">Keluhan Utama</p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {client.issues.map(issue => (
                    <span key={issue} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                      {issue}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-slate-500">Sesi Terakhir</p>
                  <p className="text-sm font-medium text-slate-900">{client.lastSession}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Sesi Berikutnya</p>
                  <p className="text-sm font-medium text-slate-900">{client.nextSession}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-auto pt-4 border-t border-slate-100">
              <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors">
                <FileText className="h-4 w-4" /> Catatan
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-2 text-sm font-medium text-slate-600 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">
                <MessageSquare className="h-4 w-4" /> Pesan
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
