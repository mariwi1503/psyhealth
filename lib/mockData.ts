export const initialPatients = [
  { id: "P-1001", name: "Amanda S.", email: "amanda@example.com", phone: "0812-3456-7890", registeredAt: "2026-09-01", status: "Aktif", totalSessions: 3 },
  { id: "P-1002", name: "Reza F.", email: "reza@example.com", phone: "0812-9876-5432", registeredAt: "2026-09-15", status: "Aktif", totalSessions: 1 },
  { id: "P-1003", name: "Siti K.", email: "siti@example.com", phone: "0821-1122-3344", registeredAt: "2026-09-20", status: "Non-Aktif", totalSessions: 0 },
  { id: "P-1004", name: "Deni I.", email: "deni@example.com", phone: "0813-5566-7788", registeredAt: "2026-09-25", status: "Aktif", totalSessions: 2 },
];

export const initialProfessionals = [
  { id: "PSY-01", name: "Dr. Budi Santoso", spec: "Psikolog Klinis Dewasa", rating: 4.9, sessions: 145, status: "Aktif" },
  { id: "PSY-02", name: "Rina Amelia, M.Psi", spec: "Psikolog Klinis Anak & Remaja", rating: 4.8, sessions: 89, status: "Aktif" },
  { id: "PSY-03", name: "Dr. Andi Setiawan", spec: "Psikolog Pernikahan & Keluarga", rating: 5.0, sessions: 210, status: "Aktif" },
  { id: "PSY-04", name: "Siska Dewi, M.Psi", spec: "Psikolog Pendidikan", rating: 4.7, sessions: 54, status: "Cuti" },
];

export const initialBookings = [
  { id: "B-2938", patient: "Amanda S.", professional: "Dr. Budi Santoso", date: "2026-09-28T10:00:00", type: "Online", status: "Selesai", amount: 350000 },
  { id: "B-2939", patient: "Reza F.", professional: "Rina Amelia, M.Psi", date: "2026-09-29T13:00:00", type: "Offline", status: "Menunggu Pembayaran", amount: 400000 },
  { id: "B-2940", patient: "Siti K.", professional: "Dr. Budi Santoso", date: "2026-09-29T15:00:00", type: "Online", status: "Terjadwal", amount: 350000 },
  { id: "B-2941", patient: "Deni I.", professional: "Dr. Andi Setiawan", date: "2026-09-30T09:00:00", type: "Online", status: "Menunggu Verifikasi", amount: 500000 },
  { id: "B-2942", patient: "Joko W.", professional: "Dr. Andi Setiawan", date: "2026-09-27T10:00:00", type: "Online", status: "Sedang Berlangsung", amount: 500000 },
];

export const initialFinance = [
  { id: "INV-1001", bookingId: "B-2938", date: "2026-09-28", amount: 350000, method: "Bank Transfer", status: "Berhasil" },
  { id: "INV-1002", bookingId: "B-2939", date: "2026-09-29", amount: 400000, method: "GoPay", status: "Tertunda" },
  { id: "INV-1003", bookingId: "B-2940", date: "2026-09-29", amount: 350000, method: "OVO", status: "Berhasil" },
  { id: "INV-1004", bookingId: "B-2941", date: "2026-09-30", amount: 500000, method: "Credit Card", status: "Berhasil" },
];

// Helper to initialize and fetch from localStorage
export const getLocalData = (key: string, initialData: any) => {
  if (typeof window === "undefined") return initialData;
  const stored = localStorage.getItem(key);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return initialData;
    }
  }
  localStorage.setItem(key, JSON.stringify(initialData));
  return initialData;
};

export const setLocalData = (key: string, data: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};
