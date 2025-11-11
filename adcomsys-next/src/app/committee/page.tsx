import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Users } from 'lucide-react'

export default function CommitteePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-xl font-bold text-blue-600">AdComSys 2026</h1>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
            <Users className="mr-3 h-10 w-10 text-blue-600" />
            Conference Committee
          </h1>
          <p className="text-lg text-gray-600">
            Meet the distinguished members organizing AdComSys 2026
          </p>
        </div>

        <Tabs defaultValue="organizing" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="organizing">Organizing Committee</TabsTrigger>
            <TabsTrigger value="technical">Technical Committee</TabsTrigger>
            <TabsTrigger value="advisory">Advisory Committee</TabsTrigger>
          </TabsList>

          {/* Organizing Committee */}
          <TabsContent value="organizing" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Chief Patron</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-lg">Dr. Satyajit Chakrabarti</p>
                  <p className="text-gray-600">Pro Vice Chancellor, UEM Kolkata</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Patron</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-lg">Prof. Biswajit Sarkar</p>
                  <p className="text-gray-600">Dean, Faculty of Engineering & Technology</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>General Chair</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-lg">Dr. Rajib Kumar Pal</p>
                  <p className="text-gray-600">Professor & HOD, Dept. of CST</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Program Chair</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-lg">Dr. Anirban Sarkar</p>
                  <p className="text-gray-600">Associate Professor, Dept. of CSIT</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Organizing Secretary</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-lg">Dr. Sourav Banerjee</p>
                  <p className="text-gray-600">Assistant Professor, Dept. of CST</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Treasurer</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-lg">Dr. Madhurima Chattopadhyay</p>
                  <p className="text-gray-600">Assistant Professor, Dept. of CSIT</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Technical Committee */}
          <TabsContent value="technical" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Technical Program Committee Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Dr. Amit Kumar Das', affiliation: 'IIT Kharagpur' },
                    { name: 'Dr. Priya Sharma', affiliation: 'NIT Durgapur' },
                    { name: 'Dr. Rahul Gupta', affiliation: 'IIIT Hyderabad' },
                    { name: 'Dr. Sneha Patel', affiliation: 'BITS Pilani' },
                    { name: 'Dr. Vikram Singh', affiliation: 'IIT Bombay' },
                    { name: 'Dr. Anjali Mehta', affiliation: 'IIT Delhi' },
                    { name: 'Dr. Suresh Kumar', affiliation: 'NIT Trichy' },
                    { name: 'Dr. Kavita Rao', affiliation: 'IIIT Bangalore' },
                    { name: 'Dr. Rajesh Verma', affiliation: 'IIT Madras' },
                    { name: 'Dr. Pooja Agarwal', affiliation: 'NIT Warangal' },
                    { name: 'Dr. Manish Joshi', affiliation: 'IIT Kanpur' },
                    { name: 'Dr. Neha Desai', affiliation: 'IIIT Allahabad' },
                  ].map((member, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <p className="font-semibold text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.affiliation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advisory Committee */}
          <TabsContent value="advisory" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Advisory Board Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: 'Prof. S. K. Pal', affiliation: 'Indian Statistical Institute, Kolkata', designation: 'Distinguished Scientist' },
                    { name: 'Prof. R. K. Shyamasundar', affiliation: 'IIT Bombay', designation: 'Emeritus Professor' },
                    { name: 'Prof. Indranil Sengupta', affiliation: 'IIT Kharagpur', designation: 'Professor' },
                    { name: 'Prof. Partha Pratim Das', affiliation: 'IIT Kharagpur', designation: 'Professor' },
                    { name: 'Dr. M. P. Gupta', affiliation: 'IIT Delhi', designation: 'Professor' },
                    { name: 'Prof. B. N. Jain', affiliation: 'IIT Delhi', designation: 'Emeritus Professor' },
                  ].map((member, index) => (
                    <div key={index} className="p-5 bg-gradient-to-r from-blue-50 to-gray-50 rounded-lg border-l-4 border-blue-600">
                      <p className="font-semibold text-lg text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-600">{member.designation}</p>
                      <p className="text-sm text-blue-600">{member.affiliation}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="text-center py-12">
          <p className="text-gray-600 mb-6">
            Want to be part of this distinguished conference?
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/signup">
              <Button size="lg">Register Now</Button>
            </Link>
            <Link href="https://cmt3.research.microsoft.com/AdComSys2025" target="_blank">
              <Button size="lg" variant="outline">Submit Paper</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-16">
        <div className="container mx-auto text-center">
          <p className="mb-2">© 2025 AdComSys 2026. All rights reserved.</p>
          <p className="text-gray-400 text-sm">
            Organized by Department of CST & CSIT, University of Engineering and Management, Kolkata
          </p>
        </div>
      </footer>
    </div>
  )
}
