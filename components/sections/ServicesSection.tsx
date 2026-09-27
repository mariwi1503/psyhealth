'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const services = [
  { title: 'Konseling Individu', copy: 'Ruang aman untuk memahami diri, mengelola stres, dan menemukan kembali kendali.', price: 'Rp 200.000', tag: '60 menit', icon: '✦' },
  { title: 'Konseling Pasangan', copy: 'Membangun komunikasi yang lebih sehat dan hubungan yang lebih hangat bersama.', price: 'Rp 350.000', tag: '90 menit', icon: '♡' },
  { title: 'Konseling Anak', copy: 'Mendampingi tumbuh kembang anak dengan cinta, pemahaman, dan strategi yang tepat.', price: 'Rp 250.000', tag: '60 menit', icon: '◌' },
  { title: 'Bimbingan Pra Nikah', copy: 'Bekal psikologis untuk membangun pernikahan dengan kesadaran dan kematangan emosi.', price: 'Rp 350.000', tag: '90 menit', icon: '∞' },
]

export function ServicesSection({ setBookingOpen, setSelectedService }: { setBookingOpen: (open: boolean) => void, setSelectedService: (service: string) => void }) {
  return (
    <section id="layanan" className="mx-auto max-w-6xl px-5 py-24 lg:px-8">
      <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[#a18565]">Layanan kami</p>
          <h2 className="max-w-lg font-serif text-4xl leading-tight text-[#304235] sm:text-5xl">Dukungan yang sesuai dengan kebutuhanmu.</h2>
        </div>
        <p className="max-w-xs text-sm leading-6 text-[#788579]">Setiap perjalanan memiliki ritmenya sendiri. Pilih layanan yang terasa paling tepat untukmu.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {services.map((service, index) => (
          <motion.article whileHover={{ y: -5 }} key={service.title} className={`group cursor-pointer rounded-[28px] border border-[#e0e5db] p-7 transition-shadow hover:shadow-xl hover:shadow-[#6d805f]/10 ${index % 2 ? 'bg-[#f0e6d8]' : 'bg-white'}`}>
            <div className="mb-12 flex items-start justify-between">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#e4ecdf] font-serif text-2xl text-[#758c6a]">{service.icon}</span>
              <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] text-[#8d806d]">{service.tag}</span>
            </div>
            <h3 className="font-serif text-2xl text-[#37493a]">{service.title}</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[#788579]">{service.copy}</p>
            <div className="mt-7 flex items-center justify-between border-t border-[#cfd9ca]/70 pt-5">
              <span className="text-sm font-semibold text-[#9b7858]">{service.price}</span>
              <button onClick={() => { setSelectedService(service.title); setBookingOpen(true) }} className="text-sm font-semibold text-[#52634a]">
                Pilih layanan <ArrowRight className="ml-1 inline h-4 w-4 transition group-hover:translate-x-1" />
              </button>
            </div>
          </motion.article>
        ))}
      </div>
      <div className="mt-5 rounded-[28px] bg-[#52634a] p-7 text-white sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[.2em] text-[#cddbc7]">Untuk sekolah & perusahaan</p>
          <h3 className="mt-2 font-serif text-2xl">Pelatihan dan seminar psikologi</h3>
        </div>
        <button className="mt-5 rounded-full bg-[#e5c9a4] px-5 py-3 text-sm font-semibold text-[#52634a] sm:mt-0">
          Konsultasikan kebutuhan <ArrowRight className="ml-2 inline h-4 w-4" />
        </button>
      </div>
    </section>
  )
}
