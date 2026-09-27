'use client'

import { useState } from 'react'
import { Navigation } from '@/components/sections/Navigation'
import { HeroSection } from '@/components/sections/HeroSection'
import { AboutSection } from '@/components/sections/AboutSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { PsychologistsSection } from '@/components/sections/PsychologistsSection'
import { FaqSection } from '@/components/sections/FaqSection'
import { Footer } from '@/components/sections/Footer'
import { BookingModalV2 } from '@/components/ui/BookingModalV2'

export default function Page() {
  const [bookingModalState, setBookingModalState] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState('Konseling Individu')
  const [selectedMode, setSelectedMode] = useState('Online')

  return (
    <main className="min-h-screen overflow-hidden bg-[#f8f7f2] text-[#27332b]">
      <Navigation setBookingOpen={(open, step) => setBookingModalState(open ? (step || 'details') : null)} />
      <HeroSection setBookingOpen={(open) => setBookingModalState(open ? 'details' : null)} />
      <AboutSection />
      <ServicesSection setBookingOpen={(open) => setBookingModalState(open ? 'details' : null)} setSelectedService={setSelectedService} />
      <PsychologistsSection setBookingOpen={(open) => setBookingModalState(open ? 'details' : null)} />
      <FaqSection />
      <Footer />
      
      {bookingModalState && (
        <BookingModalV2 
          initialStep={bookingModalState as any}
          service={selectedService} 
          mode={selectedMode} 
          setMode={setSelectedMode} 
          onClose={() => setBookingModalState(null)} 
        />
      )}
    </main>
  )
}
