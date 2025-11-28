import { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Past Editions | AdComSys 2026',
  description: 'Explore the history of AdComSys conferences and past editions.',
}

export default function PastEditionsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero Section */}
        <section className="bg-brand-navy text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: "'Faculty Glyphic', sans-serif" }}>
              Past Editions
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore the rich history of AdComSys conferences
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <Card className="max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="flex items-center justify-center gap-2">
                    <Calendar className="h-6 w-6 text-brand-orange" />
                    Coming Soon
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    Information about past AdComSys conferences will be available here soon.
                    Stay tuned for details about previous editions, proceedings, and highlights.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
