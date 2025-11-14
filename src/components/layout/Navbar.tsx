'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-brand-navy border-b-4 border-brand-orange sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4">
        <div className="flex justify-between items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0">
            <h1 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold text-brand-orange whitespace-nowrap">AdComSys 2026</h1>
            <Badge className="bg-brand-orange text-brand-navy hover:bg-brand-orange/90 text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5">3rd Edition</Badge>
          </Link>
          
          {/* Desktop Navigation - now shows at md breakpoint */}
          <div className="hidden md:flex flex-wrap items-center justify-center gap-3 lg:gap-4 xl:gap-6 flex-1 mx-4">
            <Link href="/about" className="text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium text-xs lg:text-sm xl:text-base whitespace-nowrap">About</Link>
            <Link href="/committee" className="text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium text-xs lg:text-sm xl:text-base whitespace-nowrap">Committee</Link>
            <Link href="/call-for-papers" className="text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium text-xs lg:text-sm xl:text-base whitespace-nowrap">Papers</Link>
            <Link href="/speakers" className="text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium text-xs lg:text-sm xl:text-base whitespace-nowrap">Speakers</Link>
            <Link href="/technical-program" className="text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium text-xs lg:text-sm xl:text-base whitespace-nowrap">Program</Link>
            <Link href="/registration" className="text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium text-xs lg:text-sm xl:text-base whitespace-nowrap">Registration</Link>
            <Link href="/contact" className="text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium text-xs lg:text-sm xl:text-base whitespace-nowrap">Contact</Link>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-1.5 lg:space-x-2 flex-shrink-0">
            <Link href="/login">
              <Button variant="outline" size="sm" className="border-2 border-brand-orange text-brand-white hover:bg-brand-orange hover:text-brand-navy transition-all duration-200 text-xs lg:text-sm px-2 lg:px-3">Login</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-brand-orange text-brand-navy hover:bg-brand-orange/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-xs lg:text-sm px-2 lg:px-3">Register</Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-brand-white hover:text-brand-orange transition-colors duration-200 flex-shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pb-3 space-y-2 border-t border-brand-orange/30 pt-3">
            <Link href="/about" className="block text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/committee" className="block text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>Committee</Link>
            <Link href="/call-for-papers" className="block text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>Call for Papers</Link>
            <Link href="/speakers" className="block text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>Speakers</Link>
            <Link href="/technical-program" className="block text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>Program</Link>
            <Link href="/registration" className="block text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>Registration</Link>
            <Link href="/contact" className="block text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium py-2 text-sm" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <div className="flex flex-col gap-2 pt-3 border-t border-brand-orange/30">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full border-2 border-brand-orange text-brand-white hover:bg-brand-orange hover:text-brand-navy transition-all duration-200 text-sm">Login</Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full bg-brand-orange text-brand-navy hover:bg-brand-orange/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 text-sm">Register</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
