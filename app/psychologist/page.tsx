import {
  CalendarCheck,
  Users,
  Wallet,
  Clock,
  Video,
  ArrowRight
} from "lucide-react";

const stats = [
  {
    title: "Sesi Hari Ini",
    value: "4",
    subtitle: "2 sesi tersisa",
    icon: CalendarCheck,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    title: "Pasien Aktif",
    value: "28",
    subtitle: "+3 minggu ini",
    icon: Users,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    title: "Sesi Selesai (Bulan Ini)",
    value: "64",
    subtitle: "85% tingkat kehadiran",
    icon: Clock,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Estimasi Pendapatan",
    value: "Rp 8.5M",
    subtitle: "Siap dicairkan Rp 3M",
    icon: Wallet,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
];

const todaysAppointments = [
  { id: "S-101", time: "10:00 AM", client: "Amanda S.", type: "Konseling Pasangan", status: "Selesai" },
  { id: "S-102", time: "01:30 PM", client: "Reza F.", type: "Konsultasi Umum", status: "Berlangsung" },
  { id: "S-103", time: "03:00 PM", client: "Siti K.", type: "Terapi CBT", status: "Menunggu" },
  { id: "S-104", time: "05:00 PM", client: "Deni I.", type: "Konsultasi Umum", status: "Menunggu" },
];

export default function PsychologistDashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-slate-50 border border-blue-100/50 rounded-2xl p-6 sm:p-8 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-slate-800">Selamat pagi, Dr. Budi Santoso! 👋</h2>
          <p className="text-slate-600 text-sm max-w-xl">
            Anda memiliki 3 sesi tersisa hari ini. Sesi selanjutnya dengan Reza F. dimulai pada 01:30 PM.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</h3>
              <p className="text-xs text-slate-400">{stat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Schedule Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Jadwal Sesi Hari Ini</h2>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Lihat Kalender Penuh</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Waktu</th>
                  <th className="px-6 py-4 font-medium">Pasien</th>
                  <th className="px-6 py-4 font-medium">Topik / Layanan</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {todaysAppointments.map((apt) => (
                  <tr key={apt.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{apt.time}</td>
                    <td className="px-6 py-4 text-slate-600 font-medium">{apt.client}</td>
                    <td className="px-6 py-4 text-slate-600">{apt.type}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        apt.status === 'Selesai' ? 'bg-slate-100 text-slate-600' :
                        apt.status === 'Berlangsung' ? 'bg-indigo-100 text-indigo-700 animate-pulse' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {apt.status !== 'Selesai' && (
                        <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1 justify-end ml-auto">
                          Mulai <ArrowRight className="h-4 w-4" />
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Needed / Notes */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Tugas Menunggu</h2>
          
          <div className="space-y-4 flex-1">
            <div className="p-4 rounded-xl border border-amber-200 bg-amber-50">
              <h3 className="text-sm font-semibold text-amber-900 mb-1">Tulis Catatan Sesi</h3>
              <p className="text-xs text-amber-700 mb-3">Anda belum menulis catatan (private notes) untuk sesi dengan Amanda S.</p>
              <button className="text-xs font-medium text-amber-800 bg-amber-200/50 px-3 py-1.5 rounded-lg hover:bg-amber-200 transition-colors">
                Tulis Sekarang
              </button>
            </div>
            
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <h3 className="text-sm font-semibold text-slate-900 mb-1">Permintaan Jadwal Baru</h3>
              <p className="text-xs text-slate-500 mb-3">Deni I. mengajukan sesi pada 02 Okt 2026, 14:00.</p>
              <div className="flex gap-2">
                <button className="text-xs font-medium text-white bg-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-700 transition-colors">
                  Setujui
                </button>
                <button className="text-xs font-medium text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                  Reschedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
