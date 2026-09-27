'use client'

import { CalendarDays } from 'lucide-react'
import { psychologistImage } from '@/lib/constants'

export function PsychologistsSection({ setBookingOpen }: { setBookingOpen: (open: boolean) => void }) {
  return (
    <section id="psikolog" className="bg-[#e8eee1] py-24">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="mb-12">
          <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[#a18565]">Psikolog klinis kami</p>
          <h2 className="font-serif text-4xl text-[#304235] sm:text-5xl">Ditemani oleh yang memahami.</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <Psychologist name="Rizka Rahma Kinanti" credential="M.Psi., Psikolog" focus="Stres · Kecemasan · Trauma · Relationship" image="/images/rizka.jpeg" onBook={() => setBookingOpen(true)} />
          <Psychologist name="M. Rofiqul Rohman" credential="M.Psi., Psikolog" focus="Remaja & Anak · Karier · Self Growth" image="/images/rofiq.png" onBook={() => setBookingOpen(true)} />
        </div>
      </div>
    </section>
  )
}

function Psychologist({ name, credential, focus, image, onBook }: { name: string; credential: string; focus: string; image: string; onBook: () => void }) {
  return (
    <article className="flex flex-col gap-6 rounded-[28px] bg-white p-5 shadow-sm sm:flex-row sm:items-end">
      <img src={image} alt={`Foto ${name}`} className="h-64 w-full rounded-[22px] object-cover object-top sm:h-56 sm:w-44" />
      <div className="flex-1 pb-2">
        <p className="text-xs uppercase tracking-[.16em] text-[#a18565]">Psikolog klinis</p>
        <h3 className="mt-2 font-serif text-2xl text-[#37493a]">{name},<br />{credential}</h3>
        <p className="mt-4 text-sm leading-6 text-[#788579]">Berpengalaman, empatik, dan berdedikasi tinggi dalam mendampingi proses pemulihanmu.</p>
        <p className="mt-4 text-xs font-medium text-[#758c6a]">{focus}</p>
        <button onClick={onBook} className="mt-5 rounded-full bg-[#52634a] px-4 py-2.5 text-xs font-semibold text-white">
          Lihat jadwal <CalendarDays className="ml-1 inline h-3.5 w-3.5" />
        </button>
      </div>
    </article>
  )
}
