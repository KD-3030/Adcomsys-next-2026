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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 sm:space-x-3">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-brand-orange">AdComSys 2026</h1>
            <Badge className="bg-brand-orange text-brand-navy hover:bg-brand-orange/90 text-xs sm:text-sm px-2 py-0.5">3rd Edition</Badge>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8">
            <Link href="/about" className="text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium text-sm xl:text-base">About</Link>
            <Link href="/committee" className="text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium text-sm xl:text-base">Committee</Link>
            <Link href="/call-for-papers" className="text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium text-sm xl:text-base">Call for Papers</Link>
            <Link href="/speakers" className="text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium text-sm xl:text-base">Speakers</Link>
            <Link href="/technical-program" className="text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium text-sm xl:text-base">Program</Link>
            <Link href="/registration" className="text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium text-sm xl:text-base">Registration</Link>
            <Link href="/contact" className="text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium text-sm xl:text-base">Contact</Link>
          </div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex space-x-2">
            <Link href="/login">
              <Button variant="outline" size="sm" className="border-2 border-brand-orange text-brand-white hover:bg-brand-orange hover:text-brand-navy transition-all duration-200">Login</Button>
            </Link>
            <Link href="/signup">
              <Button size="sm" className="bg-brand-orange text-brand-navy hover:bg-brand-orange/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-200">Register</Button>
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-brand-white hover:text-brand-orange transition-colors duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 space-y-3 border-t border-brand-orange/30 pt-4">
            <Link href="/about" className="block text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/committee" className="block text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Committee</Link>
            <Link href="/call-for-papers" className="block text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Call for Papers</Link>
            <Link href="/speakers" className="block text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Speakers</Link>
            <Link href="/technical-program" className="block text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Program</Link>
            <Link href="/registration" className="block text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Registration</Link>
            <Link href="/contact" className="block text-brand-white hover:text-brand-orange transition-colors duration-200 font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
            <div className="flex flex-col gap-2 pt-4 border-t border-brand-orange/30">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full border-2 border-brand-orange text-brand-white hover:bg-brand-orange hover:text-brand-navy transition-all duration-200">Login</Button>
              </Link>
              <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full bg-brand-orange text-brand-navy hover:bg-brand-orange/90 font-semibold shadow-lg hover:shadow-xl transition-all duration-200">Register</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
