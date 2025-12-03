'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [authorsDropdownOpen, setAuthorsDropdownOpen] = useState(false)
  const [mobileAuthorsOpen, setMobileAuthorsOpen] = useState(false)

  return (
    <nav className="bg-[#FFCC5C] border-b-4 border-brand-orange sticky top-0 z-50 shadow-xl">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-2 sm:py-3">
        <div className="flex justify-between items-center gap-2 sm:gap-4">
          {/* Left University Logo - UEM */}
          <div className="shrink-0">
            <Image
              src="/assets/logos/logo-1.png"
              alt="UEM Kolkata"
              width={80}
              height={80}
              priority
              className="w-auto h-10 sm:h-12 md:h-14 lg:h-16 object-contain"
            />
          </div>
          
          
          {/* Desktop Navigation - now shows at md breakpoint */}
          <div className="hidden md:flex flex-wrap items-center justify-center gap-4 lg:gap-5 xl:gap-7 flex-1 mx-4">
            <Link href="/" className="text-brand-navy hover:text-brand-white transition-colors duration-200 font-semibold text-sm lg:text-base xl:text-lg whitespace-nowrap">Home</Link>
            <Link href="/about" className="text-brand-navy hover:text-brand-white transition-colors duration-200 font-semibold text-sm lg:text-base xl:text-lg whitespace-nowrap">About</Link>
            <Link href="/committee" className="text-brand-navy hover:text-brand-white transition-colors duration-200 font-semibold text-sm lg:text-base xl:text-lg whitespace-nowrap">Committee</Link>
            
            {/* Authors Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setAuthorsDropdownOpen(true)}
              onMouseLeave={() => setAuthorsDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 text-brand-navy hover:text-brand-white transition-colors duration-200 font-semibold text-sm lg:text-base xl:text-lg whitespace-nowrap py-2">
                Authors
                <ChevronDown className={`h-4 w-4 lg:h-5 lg:w-5 transition-transform duration-200 ${authorsDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {authorsDropdownOpen && (
                <div className="absolute top-full left-0 pt-1 w-52 z-50">
                  <div className="bg-brand-navy border-2 border-brand-orange rounded-lg shadow-xl py-2">
                    <Link 
                      href="/call-for-papers/submissions" 
                      className="block px-4 py-2.5 text-brand-white hover:text-brand-orange hover:bg-white/10 transition-colors duration-200 text-base font-medium"
                    >
                      Submissions
                    </Link>
                    <Link 
                      href="/call-for-papers/call-for-papers" 
                      className="block px-4 py-2.5 text-brand-white hover:text-brand-orange hover:bg-white/10 transition-colors duration-200 text-base font-medium"
                    >
                      Call For Papers
                    </Link>
                    <Link 
                      href="/call-for-papers/important-dates" 
                      className="block px-4 py-2.5 text-brand-white hover:text-brand-orange hover:bg-white/10 transition-colors duration-200 text-base font-medium"
                    >
                      Important Dates
                    </Link>
                  </div>
                </div>
              )}
            </div>
            
            <Link href="/speakers" className="text-brand-navy hover:text-brand-white transition-colors duration-200 font-semibold text-sm lg:text-base xl:text-lg whitespace-nowrap">Speakers</Link>
            <Link href="/technical-program" className="text-brand-navy hover:text-brand-white transition-colors duration-200 font-semibold text-sm lg:text-base xl:text-lg whitespace-nowrap">Program</Link>
            <Link href="/registration" className="text-brand-navy hover:text-brand-white transition-colors duration-200 font-semibold text-sm lg:text-base xl:text-lg whitespace-nowrap">Registration</Link>
            <Link href="/past-editions" className="text-brand-navy hover:text-brand-white transition-colors duration-200 font-semibold text-sm lg:text-base xl:text-lg whitespace-nowrap">Past Editions</Link>
            <Link href="/contact" className="text-brand-navy hover:text-brand-white transition-colors duration-200 font-semibold text-sm lg:text-base xl:text-lg whitespace-nowrap">Contact</Link>
          </div>
          
          {/* Right University Logo - IEM */}
          <div className="shrink-0">
            <Image
              src="/assets/logos/logo-5.png"
              alt="IEM Kolkata"
              width={80}
              height={80}
              priority
              className="w-auto h-10 sm:h-12 md:h-14 lg:h-16 object-contain"
            />
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-brand-navy hover:text-brand-orange transition-colors duration-200 shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5 sm:h-6 sm:w-6" /> : <Menu className="h-5 w-5 sm:h-6 sm:w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pb-3 space-y-2 border-t border-brand-orange/30 pt-3">
            <Link href="/" className="block text-brand-navy hover:text-brand-orange transition-colors duration-200 font-semibold py-2.5 text-base" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link href="/about" className="block text-brand-navy hover:text-brand-orange transition-colors duration-200 font-semibold py-2.5 text-base" onClick={() => setMobileMenuOpen(false)}>About</Link>
            <Link href="/committee" className="block text-brand-navy hover:text-brand-orange transition-colors duration-200 font-semibold py-2.5 text-base" onClick={() => setMobileMenuOpen(false)}>Committee</Link>
            
            {/* Mobile Authors Dropdown */}
            <div>
              <button 
                className="flex items-center justify-between w-full text-brand-navy hover:text-brand-orange transition-colors duration-200 font-semibold py-2.5 text-base"
                onClick={() => setMobileAuthorsOpen(!mobileAuthorsOpen)}
              >
                Authors
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${mobileAuthorsOpen ? 'rotate-180' : ''}`} />
              </button>
              {mobileAuthorsOpen && (
                <div className="pl-4 space-y-1 border-l-2 border-brand-orange/30 ml-2">
                  <Link href="/call-for-papers/submissions" className="block text-brand-navy/80 hover:text-brand-orange transition-colors duration-200 font-medium py-2.5 text-base" onClick={() => setMobileMenuOpen(false)}>Submissions</Link>
                  <Link href="/call-for-papers/call-for-papers" className="block text-brand-navy/80 hover:text-brand-orange transition-colors duration-200 font-medium py-2.5 text-base" onClick={() => setMobileMenuOpen(false)}>Call For Papers</Link>
                  <Link href="/call-for-papers/important-dates" className="block text-brand-navy/80 hover:text-brand-orange transition-colors duration-200 font-medium py-2.5 text-base" onClick={() => setMobileMenuOpen(false)}>Important Dates</Link>
                </div>
              )}
            </div>
            
            <Link href="/speakers" className="block text-brand-navy hover:text-brand-orange transition-colors duration-200 font-semibold py-2.5 text-base" onClick={() => setMobileMenuOpen(false)}>Speakers</Link>
            <Link href="/technical-program" className="block text-brand-navy hover:text-brand-orange transition-colors duration-200 font-semibold py-2.5 text-base" onClick={() => setMobileMenuOpen(false)}>Program</Link>
            <Link href="/registration" className="block text-brand-navy hover:text-brand-orange transition-colors duration-200 font-semibold py-2.5 text-base" onClick={() => setMobileMenuOpen(false)}>Registration</Link>
            <Link href="/past-editions" className="block text-brand-navy hover:text-brand-orange transition-colors duration-200 font-semibold py-2.5 text-base" onClick={() => setMobileMenuOpen(false)}>Past Editions</Link>
            <Link href="/contact" className="block text-brand-navy hover:text-brand-orange transition-colors duration-200 font-semibold py-2.5 text-base" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
