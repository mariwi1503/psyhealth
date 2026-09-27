import { Wallet, ArrowDownRight, ArrowUpRight, CheckCircle2, Clock } from "lucide-react";

const transactions = [
  { id: "TRX-1092", date: "27 Sep 2026, 14:00", description: "Sesi Konsultasi - Amanda S.", amount: "+ Rp 300.000", status: "Selesai", type: "income" },
  { id: "TRX-1091", date: "26 Sep 2026, 11:30", description: "Sesi Konsultasi - Reza F.", amount: "+ Rp 400.000", status: "Selesai", type: "income" },
  { id: "WD-082", date: "25 Sep 2026, 09:00", description: "Penarikan Dana ke BCA (****1234)", amount: "- Rp 2.500.000", status: "Berhasil", type: "withdrawal" },
  { id: "TRX-1085", date: "24 Sep 2026, 16:00", description: "Sesi Konsultasi - Deni I.", amount: "+ Rp 350.000", status: "Tertunda", type: "income" },
];

export default function EarningsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors shadow-sm">
          Tarik Dana
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-white/20 rounded-lg">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <span className="font-medium text-indigo-100">Saldo Tersedia</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-1">Rp 3.050.000</h2>
            <p className="text-sm text-indigo-200">Siap untuk ditarik ke rekening Anda</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-100 rounded-lg">
              <Clock className="h-6 w-6 text-amber-600" />
            </div>
            <span className="font-medium text-slate-600">Saldo Tertunda</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-1">Rp 350.000</h2>
            <p className="text-sm text-slate-500">Menunggu penyelesaian sesi</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            </div>
            <span className="font-medium text-slate-600">Total Ditarik (Bulan Ini)</span>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900 mb-1">Rp 5.200.000</h2>
            <p className="text-sm text-slate-500">Berdasarkan 3 kali penarikan</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slate-900">Riwayat Transaksi</h2>
          <select className="text-sm border-slate-200 rounded-lg focus:ring-indigo-500 focus:border-indigo-500">
            <option>Semua Transaksi</option>
            <option>Pemasukan</option>
            <option>Penarikan</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 font-medium">ID Transaksi</th>
                <th className="px-6 py-4 font-medium">Tanggal</th>
                <th className="px-6 py-4 font-medium">Deskripsi</th>
                <th className="px-6 py-4 font-medium">Jumlah</th>
                <th className="px-6 py-4 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {transactions.map((trx) => (
                <tr key={trx.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{trx.id}</td>
                  <td className="px-6 py-4 text-slate-600">{trx.date}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{trx.description}</td>
                  <td className={`px-6 py-4 font-semibold ${trx.type === 'income' ? 'text-emerald-600' : 'text-slate-900'}`}>
                    <div className="flex items-center gap-1">
                      {trx.type === 'income' ? <ArrowDownRight className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
                      {trx.amount}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      trx.status === 'Selesai' || trx.status === 'Berhasil' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {trx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
