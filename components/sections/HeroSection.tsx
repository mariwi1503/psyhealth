'use client'

import { motion } from 'framer-motion'
import { ArrowRight, MapPin, ShieldCheck, Sparkles } from 'lucide-react'
import { scrollTo } from '@/lib/utils'
import { psychologistImage } from '@/lib/constants'

export function HeroSection({ setBookingOpen }: { setBookingOpen: (open: boolean) => void }) {
  return (
    <section id="top" className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-36 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:pb-28 lg:pt-44">
      <div className="relative z-10">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }} className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d7dfce] bg-[#f0f3eb] px-3 py-2 text-xs font-medium text-[#68765e]">
          <Sparkles className="h-3.5 w-3.5" /> Tempat pulang untuk pikiranmu
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1, duration: .7 }} className="max-w-xl font-serif text-5xl leading-[1.03] tracking-[-.045em] text-[#304235] sm:text-6xl lg:text-[5.2rem]">
          Tidak apa-apa untuk <em className="font-normal text-[#a18565]">tidak baik-baik saja.</em>
        </motion.h1>
        <p className="mt-7 max-w-lg text-base leading-7 text-[#718074]">Kami menemani langkah kecilmu untuk memahami diri, memulihkan hati, dan bertumbuh dengan cara yang paling manusiawi.</p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <button onClick={() => scrollTo('layanan')} className="rounded-full bg-[#52634a] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#52634a]/15 transition hover:-translate-y-0.5">
            Lihat layanan <ArrowRight className="ml-2 inline h-4 w-4" />
          </button>
          <button onClick={() => setBookingOpen(true)} className="rounded-full border border-[#c8d2c1] bg-transparent px-6 py-3.5 text-sm font-semibold text-[#52634a] transition hover:bg-white">
            Booking sesi
          </button>
        </div>
        <div className="mt-12 flex flex-wrap gap-x-7 gap-y-4 text-xs text-[#788579]">
          <span><strong className="mr-1 text-lg text-[#9a8061]">95%</strong> rasio kesuksesan</span>
          <span className="flex items-center gap-1"><ShieldCheck className="h-4 w-4 text-[#879b7a]" /> Privasi terjaga</span>
          <span className="flex items-center gap-1"><MapPin className="h-4 w-4 text-[#879b7a]" /> Malang & online</span>
        </div>
      </div>
      <div className="relative mx-auto w-full max-w-md lg:max-w-none">
        <div className="absolute -right-4 top-8 h-48 w-48 rounded-full bg-[#dfe9d8] blur-2xl" />
        <div className="absolute -bottom-4 left-1/4 h-40 w-40 rounded-full bg-[#ecdcc5] blur-2xl" />
        <div className="relative rounded-[48%_48%_18%_18%] bg-[#e8eee1] p-5 pb-0">
          <img src={psychologistImage} alt="Psikolog PsyHealth" className="mx-auto h-[420px] w-full rounded-[45%_45%_10%_10%] object-cover object-top mix-blend-multiply sm:h-[500px]" />
          <div className="absolute bottom-5 left-5 rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur">
            <div className="mb-1 flex gap-1 text-[#c59a57]">★★★★★</div>
            <p className="text-xs font-medium text-[#52634a]">“Ruang aman untuk bertumbuh.”</p>
          </div>
        </div>
      </div>
    </section>
  )
}
