import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export default function ReviewerDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  )
}
