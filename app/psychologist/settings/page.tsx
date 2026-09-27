import { User, Mail, Phone, MapPin, Briefcase, Award, Upload } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-12">

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-6">
          <div className="h-24 w-24 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-2xl font-bold border-4 border-white shadow-sm shrink-0 relative">
            BS
            <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow border border-slate-200 text-slate-600 hover:text-indigo-600">
              <Upload className="h-4 w-4" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Dr. Budi Santoso</h2>
            <p className="text-slate-500 text-sm">Psikolog Klinis Dewasa</p>
            <div className="mt-3 flex gap-2">
              <span className="px-2.5 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full flex items-center gap-1">
                <Award className="h-3 w-3" /> SIPP Terverifikasi
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Informasi Pribadi */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <User className="h-5 w-5 text-indigo-600" /> Informasi Pribadi
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Nama Lengkap & Gelar</label>
                <input type="text" defaultValue="Dr. Budi Santoso, M.Psi, Psikolog" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Email</label>
                <input type="email" defaultValue="budi.s@psyhealth.com" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-slate-50 text-slate-500" readOnly />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Nomor Telepon</label>
                <input type="text" defaultValue="+62 812-3456-7890" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Lokasi Praktik (Opsional)</label>
                <input type="text" defaultValue="Klinik Sehat Jiwa, Jakarta Selatan" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Spesialisasi & Profil Profesional */}
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-indigo-600" /> Profil Profesional
            </h3>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Deskripsi Singkat (Bio)</label>
                <textarea rows={4} defaultValue="Saya adalah psikolog klinis yang berfokus pada penanganan depresi, kecemasan, dan masalah hubungan pasangan. Pendekatan utama saya menggunakan Cognitive Behavioral Therapy (CBT)." className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"></textarea>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Fokus Spesialisasi (Pisahkan dengan koma)</label>
                <input type="text" defaultValue="Depresi, Kecemasan, Konseling Pasangan, CBT" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-700">Tarif Konsultasi per Sesi (Rp)</label>
                <input type="number" defaultValue="350000" className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium text-sm hover:bg-slate-50 transition-colors">
              Batal
            </button>
            <button className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium text-sm hover:bg-indigo-700 transition-colors">
              Simpan Perubahan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
