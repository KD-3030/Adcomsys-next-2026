import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-linear-to-r from-brand-black via-brand-navy to-brand-black text-white py-12 sm:py-16 px-4 border-t-4 border-brand-orange">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-orange mb-4">AdComSys 2026</h3>
            <p className="text-brand-white/90 text-base sm:text-lg leading-relaxed">
              International Conference on Advanced Computing and Systems
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-brand-orange text-lg sm:text-xl">Quick Links</h4>
            <div className="space-y-2 text-base">
              <Link href="/about" className="block text-brand-white/90 hover:text-brand-orange transition-colors">
                About
              </Link>
              <Link href="/committee" className="block text-brand-white/90 hover:text-brand-orange transition-colors">
                Committee
              </Link>
              <Link href="/call-for-papers" className="block text-brand-white/90 hover:text-brand-orange transition-colors">
                Call for Papers
              </Link>
              <Link href="/speakers" className="block text-brand-white/90 hover:text-brand-orange transition-colors">
                Speakers
              </Link>
              <Link href="/registration" className="block text-brand-white/90 hover:text-brand-orange transition-colors">
                Registration
              </Link>
              <Link href="/contact" className="block text-brand-white/90 hover:text-brand-orange transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-brand-orange text-lg sm:text-xl">Organized By</h4>
            <p className="text-brand-white/90 text-base sm:text-lg leading-relaxed">
              Department of CST, CSIT, CSE (Cybersecurity), CSE (Networks)<br />
              University of Engineering and Management<br />
              Kolkata, India
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-brand-white/80 text-base">
            © 2025 AdComSys 2026. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
