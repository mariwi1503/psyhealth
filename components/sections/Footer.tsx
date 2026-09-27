import { MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#304235] text-[#dfe8d9]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.2fr_.8fr_.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dbe6d3] text-[#52634a]">✦</span>
            <span className="font-serif text-2xl">psyhealth</span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-6 text-[#adbcaa]">Menemani kamu menemukan kembali diri dalam lelahnya hidup.</p>
        </div>
        <div>
          <h3 className="mb-4 text-xs uppercase tracking-[.2em] text-[#c6a77f]">Hubungi kami</h3>
          <p className="text-sm leading-7 text-[#dfe8d9]">0899-4352-200<br />Jl. Selat Karimata E3 No.09<br />Kota Malang, Jawa Timur</p>
        </div>
        <div>
          <h3 className="mb-4 text-xs uppercase tracking-[.2em] text-[#c6a77f]">Mari terhubung</h3>
          <p className="flex items-center gap-2 text-sm text-[#dfe8d9]"><MessageCircle className="h-4 w-4" /> @psyhealth.malang</p>
          <p className="mt-5 text-xs text-[#91a28f]">Tersedia online maupun offline.</p>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-[#91a28f]">© 2024 PsyHealth Malang · Praktik Psikolog Klinis</div>
    </footer>
  )
}
