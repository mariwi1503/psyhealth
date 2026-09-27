import {
  Users,
  CalendarCheck,
  Wallet,
  TrendingUp,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const stats = [
  {
    title: "Total Pasien",
    value: "1,248",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    title: "Sesi Selesai (Bulan Ini)",
    value: "384",
    change: "+8%",
    trend: "up",
    icon: CalendarCheck,
    color: "text-emerald-600",
    bgColor: "bg-emerald-100",
  },
  {
    title: "Total Pendapatan",
    value: "Rp 124.5M",
    change: "-3%",
    trend: "down",
    icon: Wallet,
    color: "text-indigo-600",
    bgColor: "bg-indigo-100",
  },
  {
    title: "Psikolog Aktif",
    value: "24",
    change: "0%",
    trend: "neutral",
    icon: TrendingUp,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
];

const recentBookings = [
  { id: "B-2938", client: "Amanda S.", psychologist: "Dr. Budi Santoso", date: "28 Sep 2026", status: "Selesai", amount: "Rp 350.000" },
  { id: "B-2939", client: "Reza F.", psychologist: "Rina Amelia, M.Psi", date: "29 Sep 2026", status: "Menunggu", amount: "Rp 400.000" },
  { id: "B-2940", client: "Siti K.", psychologist: "Dr. Budi Santoso", date: "29 Sep 2026", status: "Terjadwal", amount: "Rp 350.000" },
  { id: "B-2941", client: "Deni I.", psychologist: "Dr. Andi Setiawan", date: "30 Sep 2026", status: "Terjadwal", amount: "Rp 500.000" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div className="flex items-center gap-1">
                {stat.trend === "up" && <ArrowUpRight className="h-4 w-4 text-emerald-500" />}
                {stat.trend === "down" && <ArrowDownRight className="h-4 w-4 text-red-500" />}
                <span className={`text-sm font-medium ${stat.trend === "up" ? "text-emerald-500" :
                    stat.trend === "down" ? "text-red-500" :
                      "text-slate-500"
                  }`}>
                  {stat.change}
                </span>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-slate-900">Pemesanan Terbaru</h2>
            <button className="text-sm font-medium text-teal-600 hover:text-teal-700">Lihat Semua</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="px-6 py-4 font-medium">ID Pemesanan</th>
                  <th className="px-6 py-4 font-medium">Pasien</th>
                  <th className="px-6 py-4 font-medium">Psikolog</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Total</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-900">{booking.id}</td>
                    <td className="px-6 py-4 text-slate-600">{booking.client}</td>
                    <td className="px-6 py-4 text-slate-600">{booking.psychologist}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${booking.status === 'Selesai' ? 'bg-emerald-100 text-emerald-700' :
                          booking.status === 'Terjadwal' ? 'bg-blue-100 text-blue-700' :
                            'bg-amber-100 text-amber-700'
                        }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">{booking.amount}</td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreVertical className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions or Activity Feed */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col h-full">
          <h2 className="text-lg font-semibold text-slate-900 mb-6">Aktivitas Hari Ini</h2>

          <div className="space-y-6 flex-1">
            <div className="flex gap-4">
              <div className="h-2 w-2 rounded-full bg-emerald-500 mt-2 shrink-0 relative">
                <div className="absolute top-2 left-1/2 -ml-px w-px h-14 bg-slate-200"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Sesi selesai: Amanda S.</p>
                <p className="text-xs text-slate-500 mt-1">10:00 AM • Dr. Budi Santoso</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 shrink-0 relative">
                <div className="absolute top-2 left-1/2 -ml-px w-px h-14 bg-slate-200"></div>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900">Pemesanan baru: Reza F.</p>
                <p className="text-xs text-slate-500 mt-1">10:45 AM • Rina Amelia, M.Psi</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="h-2 w-2 rounded-full bg-amber-500 mt-2 shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-slate-900">Pembayaran tertunda: ID B-2939</p>
                <p className="text-xs text-slate-500 mt-1">11:30 AM • Menunggu transfer bank</p>
              </div>
            </div>
          </div>

          <button className="w-full mt-6 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors mt-auto">
            Lihat Semua Aktivitas
          </button>
        </div>
      </div>
    </div>
  );
}
