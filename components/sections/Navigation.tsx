'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Menu, X } from 'lucide-react'
import { scrollTo } from '@/lib/utils'

export function Navigation({ setBookingOpen }: { setBookingOpen: (open: boolean, step?: 'details' | 'history' | 'history-login' | 'history-pin') => void }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [user, setUser] = useState<{ name: string; phoneNumber: string; pin?: string } | null>(null)

  useEffect(() => {
    const activeSession = JSON.parse(sessionStorage.getItem('psyhealth-session') || 'null')
    if (activeSession) {
      // Fetch full user details from "DB"
      const usersDb = JSON.parse(localStorage.getItem('psyhealth-users-db') || '[]')
      const userDetails = usersDb.find((u: any) => u.phoneNumber === activeSession.phoneNumber)
      if (userDetails) setUser(userDetails)
    }
  }, [])

  const handleScrollTo = (id: string) => {
    setMenuOpen(false)
    scrollTo(id)
  }

  const handleHistoryClick = () => {
    setMenuOpen(false)
    if (user) {
      setBookingOpen(true, 'history')
    } else {
      setBookingOpen(true, 'history-login')
    }
  }

  return (
    <nav className="fixed top-0 z-40 w-full border-b border-[#dfe4d8]/70 bg-[#f8f7f2]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 lg:px-8">
        <button onClick={() => handleScrollTo('top')} className="group flex items-center gap-2" aria-label="PsyHealth home">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#6e8063] text-xl text-white">✦</span>
          <span className="text-left leading-none">
            <strong className="block font-serif text-xl tracking-tight text-[#52634a]">psyhealth</strong>
            <small className="text-[9px] uppercase tracking-[.22em] text-[#9a8061]">praktik psikolog malang</small>
          </span>
        </button>
        
        <div className="hidden items-center gap-8 text-sm text-[#607062] md:flex">
          <button onClick={() => handleScrollTo('layanan')} className="transition hover:text-[#9a8061]">Layanan</button>
          <button onClick={() => handleScrollTo('psikolog')} className="transition hover:text-[#9a8061]">Psikolog</button>
          <button onClick={() => handleScrollTo('tentang')} className="transition hover:text-[#9a8061]">Tentang Kami</button>
          <button onClick={() => handleScrollTo('faq')} className="transition hover:text-[#9a8061]">FAQ</button>
        </div>
        
        <div className="hidden md:flex md:items-center md:gap-3">
          <button onClick={handleHistoryClick} className="flex items-center gap-2 rounded-full border border-[#dbe3d5] bg-white px-4 py-2.5 text-sm font-semibold text-[#52634a] shadow-sm transition hover:bg-[#edf3e9]">
            {user ? (
              <>
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#f0e6d8] text-xs text-[#8d806d]">{user.name.charAt(0).toUpperCase()}</span>
                Riwayat Saya
              </>
            ) : (
              'Riwayat Saya'
            )}
          </button>
          <Link href="/login" className="flex items-center rounded-full bg-[#52634a] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#41523b]">
            Login Admin <ArrowRight className="ml-2 inline h-4 w-4" />
          </Link>
        </div>
        
        <button className="rounded-full p-2 md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {menuOpen && (
        <div className="border-t border-[#dfe4d8] bg-[#f8f7f2] px-5 py-4 md:hidden">
          <div className="flex flex-col gap-4 text-sm">
            <button onClick={() => handleScrollTo('layanan')} className="text-left">Layanan</button>
            <button onClick={() => handleScrollTo('psikolog')} className="text-left">Psikolog</button>
            <button onClick={() => handleScrollTo('tentang')} className="text-left">Tentang Kami</button>
            
            <button onClick={handleHistoryClick} className="rounded-full border border-[#dbe3d5] bg-white px-4 py-3 font-semibold text-[#52634a] text-center">
              {user ? `Riwayat (${user.name})` : 'Riwayat Saya'}
            </button>
            
            <Link href="/login" className="rounded-full bg-[#52634a] px-4 py-3 font-semibold text-white text-center">Login Admin</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
