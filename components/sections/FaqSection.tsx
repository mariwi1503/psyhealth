'use client'

import { useState } from 'react'
import { ChevronDown, MessageCircle } from 'lucide-react'

const faqs = [
  ['Apakah sesi bisa dilakukan secara online?', 'Bisa. Kami menyediakan sesi online melalui video call maupun sesi tatap muka di klinik Malang.'],
  ['Bagaimana cara memilih psikolog?', 'Anda dapat memilih psikolog berdasarkan kebutuhan dan jadwal yang tersedia, lalu lanjutkan booking secara langsung.'],
  ['Apakah data saya aman?', 'Kerahasiaan dan kenyamanan klien adalah prioritas kami. Seluruh sesi dilakukan secara profesional dan beretika.'],
]

export function FaqSection() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0)

  return (
    <section id="faq" className="mx-auto grid max-w-6xl gap-14 px-5 py-24 lg:grid-cols-[.8fr_1.2fr] lg:px-8">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[.2em] text-[#a18565]">Pertanyaan umum</p>
        <h2 className="font-serif text-4xl leading-tight text-[#304235] sm:text-5xl">Rasa tenang dimulai dari informasi yang jelas.</h2>
        <p className="mt-5 text-sm leading-6 text-[#788579]">Masih punya pertanyaan? Hubungi kami melalui WhatsApp, kami dengan senang hati membantu.</p>
        <button className="mt-7 rounded-full border border-[#c8d2c1] px-5 py-3 text-sm font-semibold text-[#52634a]">
          <MessageCircle className="mr-2 inline h-4 w-4" /> Hubungi kami
        </button>
      </div>
      <div className="divide-y divide-[#dfe4d8] border-y border-[#dfe4d8]">
        {faqs.map(([question, answer], index) => (
          <div key={question} className="py-5">
            <button className="flex w-full items-center justify-between text-left font-medium text-[#465848]" onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}>
              {question}
              <ChevronDown className={`h-5 w-5 text-[#8aa07e] transition ${expandedFaq === index ? 'rotate-180' : ''}`} />
            </button>
            {expandedFaq === index && <p className="mt-3 max-w-xl text-sm leading-6 text-[#788579]">{answer}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
