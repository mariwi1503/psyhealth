'use client'

import { useState, useEffect } from 'react'
import { ArrowRight, Check, X, Shield, Lock, ChevronDown } from 'lucide-react'

// Constants
const PSYCHOLOGISTS = [
  { id: 'p1', name: 'Rizka Rahma Kinanti, M.Psi.', image: '/images/rizka.jpeg' },
  { id: 'p2', name: 'M. Rofiqul Rohman, M.Psi.', image: '/images/rofiq.png' },
]

const SCHEDULES = [
  { id: 's1', label: 'Oct 01, 2026 - 09:00', timestamp: new Date('2026-10-01T09:00:00+07:00').getTime() },
  { id: 's2', label: 'Oct 02, 2026 - 13:00', timestamp: new Date('2026-10-02T13:00:00+07:00').getTime() },
  { id: 's3', label: 'Oct 03, 2026 - 16:00', timestamp: new Date('2026-10-03T16:00:00+07:00').getTime() },
  { id: 's4', label: 'Oct 04, 2026 - 10:00', timestamp: new Date('2026-10-04T10:00:00+07:00').getTime() },
]

type Step = 'details' | 'otp' | 'payment' | 'pin-setup' | 'history' | 'history-login' | 'history-pin' | 'history-otp'

interface Booking {
  id: string
  service: string
  scheduleLabel: string
  scheduleTimestamp: number
  psychologistId: string
  status: string
  payment: string
}

interface UserSession {
  name: string
  phoneNumber: string
  pin?: string
}

export function BookingModalV2({ service, mode, setMode, onClose, initialStep = 'details' }: { service: string; mode: string; setMode: (mode: string) => void; onClose: () => void; initialStep?: Step }) {
  const [currentStep, setCurrentStep] = useState<Step>(initialStep)
  
  // Booking Form State
  const [patientName, setPatientName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [selectedSchedule, setSelectedSchedule] = useState('')
  const [selectedPsychologist, setSelectedPsychologist] = useState('')
  const [isPsychologistDropdownOpen, setIsPsychologistDropdownOpen] = useState(false)
  const [paymentMethod, setPaymentMethod] = useState('QRIS')
  
  // Auth State
  const [otpCode, setOtpCode] = useState('')
  const [pinCode, setPinCode] = useState('')
  const [loginPin, setLoginPin] = useState('')
  
  // Data State
  const [bookingHistory, setBookingHistory] = useState<Booking[]>([])
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null)

  useEffect(() => {
    const savedBookings = JSON.parse(localStorage.getItem('psyhealth-bookings') || '[]')
    if (Array.isArray(savedBookings)) setBookingHistory(savedBookings)
    
    // Check Active Session
    const activeSession = JSON.parse(sessionStorage.getItem('psyhealth-session') || 'null')
    if (activeSession) {
      const usersDb = JSON.parse(localStorage.getItem('psyhealth-users-db') || '[]')
      const userDetails = usersDb.find((u: UserSession) => u.phoneNumber === activeSession.phoneNumber)
      if (userDetails) {
        setCurrentUser(userDetails)
        if (initialStep === 'details') {
          setPatientName(userDetails.name || '')
          setPhoneNumber(userDetails.phoneNumber || '')
        } else if (initialStep.startsWith('history')) {
          setCurrentStep('history')
        }
      }
    }
  }, [initialStep])

  // ==================== DB HELPER ====================
  const saveToDbAndSession = (userData: UserSession) => {
    const usersDb: UserSession[] = JSON.parse(localStorage.getItem('psyhealth-users-db') || '[]')
    const existingIndex = usersDb.findIndex(u => u.phoneNumber === userData.phoneNumber)
    if (existingIndex >= 0) {
      usersDb[existingIndex] = { ...usersDb[existingIndex], ...userData }
    } else {
      usersDb.push(userData)
    }
    localStorage.setItem('psyhealth-users-db', JSON.stringify(usersDb))
    sessionStorage.setItem('psyhealth-session', JSON.stringify({ phoneNumber: userData.phoneNumber }))
    setCurrentUser(userData)
    window.dispatchEvent(new Event('psyhealth-session-updated'))
  }

  const findUserInDb = (phone: string) => {
    const usersDb: UserSession[] = JSON.parse(localStorage.getItem('psyhealth-users-db') || '[]')
    return usersDb.find(u => u.phoneNumber === phone)
  }

  // ==================== BOOKING FLOW ====================
  const handleContinueToOtp = () => {
    if (patientName.trim() && phoneNumber.trim() && selectedSchedule && selectedPsychologist) {
      if (currentUser && currentUser.phoneNumber === phoneNumber) {
        setCurrentStep('payment')
      } else {
        setCurrentStep('otp')
      }
    }
  }

  const handleValidateOtp = () => {
    if (otpCode.trim()) setCurrentStep('payment')
  }

  const handleConfirmPayment = () => {
    const scheduleObj = SCHEDULES.find(s => s.id === selectedSchedule)
    const newBooking: Booking = { 
      id: `B-${Math.floor(Math.random() * 10000)}`,
      service, 
      scheduleLabel: scheduleObj?.label || '', 
      scheduleTimestamp: scheduleObj?.timestamp || 0,
      psychologistId: selectedPsychologist,
      status: 'Confirmed', 
      payment: paymentMethod 
    }
    
    const updatedHistory = [...bookingHistory, newBooking]
    localStorage.setItem('psyhealth-bookings', JSON.stringify(updatedHistory))
    setBookingHistory(updatedHistory)
    
    // Save to DB & Session
    const existingUser = findUserInDb(phoneNumber)
    const userData: UserSession = { name: patientName, phoneNumber, pin: existingUser?.pin }
    saveToDbAndSession(userData)
    
    // Check if user needs to set up a PIN
    if (!userData.pin) {
      setCurrentStep('pin-setup')
    } else {
      setCurrentStep('history')
    }
  }

  const handleSetupPin = () => {
    if (pinCode.length >= 4) {
      const updatedUser = { name: patientName, phoneNumber, pin: pinCode }
      saveToDbAndSession(updatedUser)
      setCurrentStep('history')
    }
  }

  const handleSkipPin = () => {
    setCurrentStep('history')
  }

  // ==================== HISTORY LOGIN FLOW ====================
  const handleHistoryLoginSubmit = () => {
    if (!phoneNumber.trim()) return
    
    const dbUser = findUserInDb(phoneNumber)
    if (dbUser) {
      setCurrentUser(dbUser) // Temp load for login flow
      if (dbUser.pin) {
        setCurrentStep('history-pin')
      } else {
        setCurrentStep('history-otp') // Needs to verify before setting pin
      }
    } else {
      // New phone number trying to access history
      setCurrentUser({ name: 'User', phoneNumber }) // Temp placeholder
      setCurrentStep('history-otp')
    }
  }

  const handleHistoryPinSubmit = () => {
    if (currentUser?.pin === loginPin) {
      sessionStorage.setItem('psyhealth-session', JSON.stringify({ phoneNumber: currentUser.phoneNumber }))
      window.dispatchEvent(new Event('psyhealth-session-updated'))
      setCurrentStep('history')
    } else {
      alert('Incorrect PIN')
    }
  }

  const handleHistoryOtpSubmit = () => {
    if (otpCode.trim() && currentUser) {
      // Validated OTP, now force them to set a PIN for future
      // But they need to provide a name first if they are new, though in this flow we don't ask for name.
      // We will just use 'User' if name is empty, but we'll ask for PIN.
      setCurrentStep('pin-setup')
    }
  }

  // ==================== HISTORY ACTIONS ====================
  const handleCancelBooking = (bookingId: string) => {
    const booking = bookingHistory.find(b => b.id === bookingId)
    if (!booking) return

    const hoursUntilSession = (booking.scheduleTimestamp - new Date().getTime()) / (1000 * 60 * 60)
    
    if (hoursUntilSession < 24) {
      alert('Cannot cancel sessions less than 24 hours in advance.')
      return
    }

    const updatedHistory = bookingHistory.map(b => 
      b.id === bookingId ? { ...b, status: 'Cancelled' } : b
    )
    localStorage.setItem('psyhealth-bookings', JSON.stringify(updatedHistory))
    setBookingHistory(updatedHistory)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#243126]/40 p-0 backdrop-blur-sm sm:items-center sm:p-5">
      <div className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-t-[30px] bg-[#fbfaf6] p-6 shadow-2xl sm:rounded-[30px] sm:p-8">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs uppercase tracking-[.18em] text-[#a18565]">
              {['history', 'history-login', 'history-pin', 'history-otp'].includes(currentStep) ? 'Akun Saya' : 'Pesan Jadwal'}
            </p>
            <h2 className="mt-2 font-serif text-3xl text-[#304235]">
              {currentStep === 'history' ? 'Riwayat Konsultasi' : 
               currentStep === 'pin-setup' ? 'Amankan Akun Anda' :
               currentStep.startsWith('history-') ? 'Akses Riwayat' :
               'Mulai langkah Anda.'}
            </h2>
          </div>
          <button onClick={onClose} className="rounded-full bg-[#edf1e9] p-2" aria-label="Tutup"><X className="h-5 w-5" /></button>
        </div>

        {/* ================= STEP: DETAILS ================= */}
        {currentStep === 'details' && (
          <div className="mt-7 space-y-5">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#72806e]">Pilih Psikolog</label>
              <div className="relative">
                <button 
                  type="button" 
                  onClick={() => setIsPsychologistDropdownOpen(!isPsychologistDropdownOpen)}
                  className="flex w-full items-center justify-between rounded-2xl border border-[#dbe3d5] bg-white p-3.5 text-sm"
                >
                  {selectedPsychologist ? (
                    <div className="flex items-center gap-3">
                      <img src={PSYCHOLOGISTS.find(p => p.id === selectedPsychologist)?.image} alt="" className="h-6 w-6 rounded-full object-cover" />
                      <span className="font-medium text-[#52634a]">{PSYCHOLOGISTS.find(p => p.id === selectedPsychologist)?.name}</span>
                    </div>
                  ) : (
                    <span className="text-[#9ca3af]">Pilih seorang psikolog</span>
                  )}
                  <ChevronDown className={`h-4 w-4 text-[#72806e] transition-transform ${isPsychologistDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isPsychologistDropdownOpen && (
                  <div className="absolute z-10 mt-2 w-full overflow-hidden rounded-2xl border border-[#dbe3d5] bg-white shadow-lg">
                    {PSYCHOLOGISTS.map(psy => (
                      <button
                        key={psy.id}
                        type="button"
                        onClick={() => {
                          setSelectedPsychologist(psy.id)
                          setIsPsychologistDropdownOpen(false)
                        }}
                        className="flex w-full items-center gap-3 p-3 transition hover:bg-[#edf3e9] border-b border-[#f0f4ec] last:border-0"
                      >
                        <img src={psy.image} alt={psy.name} className="h-8 w-8 rounded-full object-cover" />
                        <span className={`text-sm ${selectedPsychologist === psy.id ? 'font-bold text-[#52634a]' : 'font-medium text-[#465848]'}`}>{psy.name}</span>
                        {selectedPsychologist === psy.id && <Check className="ml-auto h-4 w-4 text-[#52634a]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#72806e]">Pilih Layanan</label>
              <select className="w-full rounded-2xl border border-[#dbe3d5] bg-white p-3.5 text-sm text-[#465848]" defaultValue={service}>
                <option value="Konseling Individu">Konseling Individu</option>
                <option value="Konseling Pasangan">Konseling Pasangan</option>
                <option value="Konseling Anak">Konseling Anak</option>
                <option value="Bimbingan Pranikah">Bimbingan Pranikah</option>
                <option value="Tes IQ & Kognitif">Tes IQ & Kognitif</option>
              </select>
            </div>
            
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#72806e]">Pilih Jadwal</label>
              <select value={selectedSchedule} onChange={e => setSelectedSchedule(e.target.value)} className="w-full rounded-2xl border border-[#dbe3d5] bg-white p-3.5 text-sm text-[#465848]">
                <option value="">Pilih tanggal dan waktu</option>
                {SCHEDULES.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
            
            {currentUser ? (
              <div className="rounded-2xl border border-[#7e966f] bg-[#edf3e9] p-4 text-[#52634a]">
                <p className="text-xs font-semibold uppercase tracking-wider opacity-80">Pesanan atas nama</p>
                <div className="mt-1 flex items-center gap-2">
                  <Check className="h-4 w-4" />
                  <p className="font-medium">{currentUser.name} <span className="opacity-70">({currentUser.phoneNumber})</span></p>
                </div>
                <button 
                  onClick={() => {
                    sessionStorage.removeItem('psyhealth-session')
                    window.dispatchEvent(new Event('psyhealth-session-updated'))
                    setCurrentUser(null)
                    setPatientName('')
                    setPhoneNumber('')
                  }}
                  className="mt-3 text-xs font-semibold text-[#a66f60] transition hover:text-red-700 underline"
                >
                  Bukan Anda? Gunakan akun lain.
                </button>
              </div>
            ) : (
              <>
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#72806e]">Nama Lengkap</label>
                  <input value={patientName} onChange={e => setPatientName(e.target.value)} placeholder="Nama Anda" className="w-full rounded-2xl border border-[#dbe3d5] bg-white p-3.5 text-sm text-[#465848]" />
                </div>
                
                <div>
                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#72806e]">Nomor WhatsApp</label>
                  <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="08xxxxxxxxxx" className="w-full rounded-2xl border border-[#dbe3d5] bg-white p-3.5 text-sm text-[#465848]" />
                </div>
              </>
            )}
            
            <div className="grid grid-cols-2 gap-3">
              {['Online', 'Offline · Malang'].map(item => (
                <button key={item} onClick={() => setMode(item.split(' · ')[0])} className={`rounded-2xl border p-3.5 text-left text-sm ${mode === item.split(' · ')[0] ? 'border-[#7e966f] bg-[#edf3e9] text-[#52634a]' : 'border-[#dbe3d5] bg-white text-[#788579]'}`}>
                  {item}
                </button>
              ))}
            </div>
            
            <button onClick={handleContinueToOtp} disabled={!patientName || !phoneNumber || !selectedSchedule || !selectedPsychologist} className="w-full rounded-full bg-[#52634a] px-5 py-3.5 text-sm font-semibold text-white disabled:opacity-50">
              Lanjut <ArrowRight className="ml-1 inline h-4 w-4" />
            </button>
          </div>
        )}

        {/* ================= STEP: OTP (BOOKING) ================= */}
        {currentStep === 'otp' && (
          <div className="mt-7 space-y-5">
            <p className="text-sm leading-6 text-[#788579]">Kode OTP demo telah dikirim ke <strong>{phoneNumber}</strong>. Masukkan angka sembarang untuk lanjut.</p>
            <input maxLength={6} value={otpCode} onChange={e => setOtpCode(e.target.value)} inputMode="numeric" placeholder="••••••" className="w-full rounded-2xl border border-[#dbe3d5] bg-white p-3.5 text-center tracking-[1em] text-lg font-bold text-[#465848]" />
            <button onClick={handleValidateOtp} className="w-full rounded-full bg-[#52634a] px-5 py-3.5 text-sm font-semibold text-white">Validasi OTP</button>
          </div>
        )}

        {/* ================= STEP: PAYMENT ================= */}
        {currentStep === 'payment' && (
          <div className="mt-7 space-y-5">
            <p className="text-sm leading-6 text-[#788579]">OTP divalidasi. Pilih metode pembayaran untuk menyelesaikan pesanan Anda.</p>
            <div className="space-y-3">
              {['QRIS', 'Transfer Bank', 'Virtual Account'].map(item => (
                <button key={item} onClick={() => setPaymentMethod(item)} className={`w-full rounded-2xl border p-4 text-left text-sm ${paymentMethod === item ? 'border-[#7e966f] bg-[#edf3e9] text-[#52634a]' : 'border-[#dbe3d5] bg-white text-[#788579]'}`}>
                  {item}
                </button>
              ))}
            </div>
            
            <button onClick={handleConfirmPayment} className="w-full rounded-full bg-[#52634a] px-5 py-3.5 text-sm font-semibold text-white mt-4">Saya sudah menyelesaikan pembayaran</button>
          </div>
        )}

        {/* ================= STEP: PIN SETUP ================= */}
        {currentStep === 'pin-setup' && (
          <div className="mt-7 space-y-5">
            <div className="flex items-center gap-3 p-4 bg-amber-50 text-amber-800 rounded-2xl border border-amber-200">
              <Shield className="h-6 w-6 flex-shrink-0" />
              <p className="text-sm leading-5">Pemesanan berhasil! Amankan akun Anda dengan PIN agar mudah melacak atau membatalkan jadwal nanti.</p>
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-[#72806e]">Buat 6-Digit PIN</label>
              <input type="password" maxLength={6} value={pinCode} onChange={e => setPinCode(e.target.value)} inputMode="numeric" placeholder="••••••" className="w-full rounded-2xl border border-[#dbe3d5] bg-white p-3.5 text-center tracking-[1em] text-lg font-bold text-[#465848]" />
            </div>
            <div className="flex flex-col gap-3">
              <button onClick={handleSetupPin} disabled={pinCode.length < 4} className="w-full rounded-full bg-[#52634a] px-5 py-3.5 text-sm font-semibold text-white disabled:opacity-50">Simpan PIN & Lihat Riwayat</button>
              <button onClick={handleSkipPin} className="w-full px-5 py-3.5 text-sm font-medium text-[#788579]">Lewati untuk sekarang</button>
            </div>
          </div>
        )}

        {/* ================= STEP: HISTORY LOGIN (PHONE) ================= */}
        {currentStep === 'history-login' && (
          <div className="mt-7 space-y-5">
            <p className="text-sm leading-6 text-[#788579]">Masukkan nomor WhatsApp Anda untuk melihat riwayat pesanan.</p>
            <input value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} placeholder="08xxxxxxxxxx" className="w-full rounded-2xl border border-[#dbe3d5] bg-white p-3.5 text-sm" />
            <button onClick={handleHistoryLoginSubmit} className="w-full rounded-full bg-[#52634a] px-5 py-3.5 text-sm font-semibold text-white">Lanjut</button>
          </div>
        )}

        {/* ================= STEP: HISTORY LOGIN (PIN) ================= */}
        {currentStep === 'history-pin' && (
          <div className="mt-7 space-y-5">
            <div className="flex items-center gap-3 p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 mb-4">
              <Lock className="h-6 w-6 flex-shrink-0" />
              <p className="text-sm leading-5">Selamat datang kembali, <strong>{currentUser?.name}</strong>! Masukkan PIN Anda untuk melihat riwayat.</p>
            </div>
            <input type="password" maxLength={6} value={loginPin} onChange={e => setLoginPin(e.target.value)} inputMode="numeric" placeholder="••••••" className="w-full rounded-2xl border border-[#dbe3d5] bg-white p-3.5 text-center tracking-[1em] text-lg font-bold text-[#465848]" />
            <button onClick={handleHistoryPinSubmit} className="w-full rounded-full bg-[#52634a] px-5 py-3.5 text-sm font-semibold text-white">Buka Akses</button>
            <button onClick={() => setCurrentStep('history-otp')} className="w-full text-xs text-[#788579] text-center mt-2">Lupa PIN? Login dengan OTP</button>
          </div>
        )}

        {/* ================= STEP: HISTORY LOGIN (OTP) ================= */}
        {currentStep === 'history-otp' && (
          <div className="mt-7 space-y-5">
            <p className="text-sm leading-6 text-[#788579]">Kode OTP demo telah dikirim ke <strong>{phoneNumber}</strong>.</p>
            <input maxLength={6} value={otpCode} onChange={e => setOtpCode(e.target.value)} inputMode="numeric" placeholder="••••••" className="w-full rounded-2xl border border-[#dbe3d5] bg-white p-3.5 text-center tracking-[1em] text-lg font-bold text-[#465848]" />
            <button onClick={handleHistoryOtpSubmit} className="w-full rounded-full bg-[#52634a] px-5 py-3.5 text-sm font-semibold text-white">Validasi OTP</button>
          </div>
        )}

        {/* ================= STEP: HISTORY VIEW ================= */}
        {currentStep === 'history' && (
          <div className="mt-7 space-y-4">
            <div className="flex items-center justify-between rounded-2xl bg-[#edf3e9] p-4 text-sm text-[#52634a]">
              <div>
                <Check className="mr-2 inline h-4 w-4" /> Login sebagai <strong>{currentUser?.name || patientName}</strong>.
              </div>
              <button 
                onClick={() => {
                  sessionStorage.removeItem('psyhealth-session')
                  window.dispatchEvent(new Event('psyhealth-session-updated'))
                  window.location.reload()
                }}
                className="text-xs font-semibold text-[#a66f60] transition hover:text-red-700"
              >
                Keluar
              </button>
            </div>
            
            {bookingHistory.length === 0 ? (
              <p className="text-sm text-center py-8 text-[#788579]">Tidak ada riwayat pesanan.</p>
            ) : (
              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
                {bookingHistory.map((item, index) => {
                  const psy = PSYCHOLOGISTS.find(p => p.id === item.psychologistId)
                  const hoursUntil = (item.scheduleTimestamp - new Date().getTime()) / (1000 * 60 * 60)
                  const canCancel = hoursUntil > 24 && item.status !== 'Cancelled' && item.status !== 'Completed'
                  
                  return (
                    <div key={item.id || `legacy-booking-${index}`} className="rounded-2xl border border-[#dbe3d5] bg-white p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-[#465848]">{item.service}</p>
                          <div className="flex items-center gap-2 mt-2">
                            {psy && <img src={psy.image} alt={psy.name} className="h-6 w-6 rounded-full object-cover" />}
                            <p className="text-xs text-[#788579]">{psy?.name}</p>
                          </div>
                          <p className="mt-1 text-xs text-[#788579]">{item.scheduleLabel} · {item.payment}</p>
                          
                          {canCancel ? (
                            <button onClick={() => handleCancelBooking(item.id)} className="mt-3 text-xs font-semibold text-[#a66f60] transition hover:text-red-700">Batalkan Pesanan</button>
                          ) : item.status !== 'Cancelled' ? (
                            <p className="mt-3 text-[10px] text-[#a18565]">Tidak bisa dibatalkan (&lt; 24 jam)</p>
                          ) : null}
                        </div>
                        <span className={`rounded-full px-3 py-1 text-[11px] font-medium ${
                          item.status === 'Cancelled' ? 'bg-red-50 text-red-600' : 'bg-[#f0e6d8] text-[#8d806d]'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            <button onClick={onClose} className="w-full rounded-full bg-[#52634a] px-5 py-3.5 text-sm font-semibold text-white">Selesai</button>
          </div>
        )}
      </div>
    </div>
  )
}
