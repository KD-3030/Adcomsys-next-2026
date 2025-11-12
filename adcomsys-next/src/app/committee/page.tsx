import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ArrowLeft, Users, Crown, Award, Briefcase, Mail, Building } from 'lucide-react'
import { supabaseAdmin } from '@/lib/db'

// Committee Member Component
interface CommitteeMemberProps {
  name: string
  designation: string
  affiliation: string
  email?: string
  role?: string
  level?: 'chief' | 'patron' | 'chair' | 'member'
}

interface CommitteeMemberData {
  id: string
  name: string
  designation: string
  affiliation: string
  email: string
  committee_type: 'organizing' | 'technical' | 'advisory'
  display_order: number
  is_active: boolean
}

function CommitteeMember({ name, designation, affiliation, email, role = '', level = 'member' }: CommitteeMemberProps) {
  const levelColors = {
    chief: 'bg-gradient-to-r from-yellow-500 to-orange-500',
    patron: 'bg-gradient-to-r from-blue-600 to-indigo-600',
    chair: 'bg-gradient-to-r from-green-600 to-teal-600',
    member: 'bg-gradient-to-r from-gray-600 to-gray-700'
  }

  const levelIcons = {
    chief: Crown,
    patron: Award,
    chair: Briefcase,
    member: Users
  }

  const Icon = levelIcons[level]

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 border-l-4 border-blue-600">
      <div className={`${levelColors[level]} h-2`}></div>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`${levelColors[level]} p-3 rounded-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                {role && (
                  <Badge variant="secondary" className="mb-2 font-medium">
                    {role}
                  </Badge>
                )}
                <h3 className="text-xl font-bold text-gray-900">{name}</h3>
              </div>
            </div>
            <p className="text-sm font-medium text-gray-700 flex items-center gap-2 mt-2">
              <Briefcase className="h-4 w-4 text-blue-600" />
              {designation}
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2 mt-1">
              <Building className="h-4 w-4 text-gray-500" />
              {affiliation}
            </p>
            {email && (
              <p className="text-sm text-blue-600 flex items-center gap-2 mt-2">
                <Mail className="h-4 w-4" />
                <a href={`mailto:${email}`} className="hover:underline">{email}</a>
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Simple member card for large lists
function SimpleMemberCard({ name, affiliation }: { name: string; affiliation: string }) {
  return (
    <div className="p-4 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg border border-gray-200 hover:shadow-md transition-shadow">
      <p className="font-semibold text-gray-900 mb-1">{name}</p>
      <p className="text-sm text-gray-600">{affiliation}</p>
    </div>
  )
}

async function getCommitteeMembers() {
  const { data, error } = await supabaseAdmin
    .from('committee_members')
    .select('*')
    .eq('is_active', true)
    .order('display_order', { ascending: true })

  if (error) {
    console.error('Error fetching committee members:', error)
    return []
  }

  return data as CommitteeMemberData[]
}

export default async function CommitteePage() {
  const members = await getCommitteeMembers()
  
  const organizingMembers = members.filter(m => m.committee_type === 'organizing')
  const technicalMembers = members.filter(m => m.committee_type === 'technical')
  const advisoryMembers = members.filter(m => m.committee_type === 'advisory')
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b sticky top-0 z-50 shadow-sm">
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

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-full">
              <Users className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Conference Committee
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Meet the distinguished members organizing AdComSys 2026
          </p>
        </div>
      </div>

      {/* Page Content */}
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        

        <Tabs defaultValue="organizing" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="organizing" className="text-base">
              Organizing Committee
            </TabsTrigger>
            <TabsTrigger value="technical" className="text-base">
              Technical Committee
            </TabsTrigger>
            <TabsTrigger value="advisory" className="text-base">
              Advisory Committee
            </TabsTrigger>
          </TabsList>

          {/* Organizing Committee */}
          <TabsContent value="organizing" className="mt-6">
            {organizingMembers.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {organizingMembers.map((member) => (
                  <CommitteeMember
                    key={member.id}
                    name={member.name}
                    designation={member.designation}
                    affiliation={member.affiliation}
                    email={member.email}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No organizing committee members found.</p>
              </div>
            )}
          </TabsContent>

          {/* Technical Committee */}
          <TabsContent value="technical" className="mt-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded"></div>
                <h2 className="text-2xl font-bold text-gray-900">Technical Program Committee</h2>
              </div>
              <p className="text-gray-600 mb-8">
                Our distinguished TPC members ensure the highest quality of accepted papers through rigorous peer review.
              </p>
            </div>
            
            {technicalMembers.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {technicalMembers.map((member) => (
                  <SimpleMemberCard
                    key={member.id}
                    name={member.name}
                    affiliation={member.affiliation}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No technical committee members found.</p>
              </div>
            )}
          </TabsContent>

          {/* Advisory Committee */}
          <TabsContent value="advisory" className="mt-6">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-12 bg-gradient-to-r from-indigo-600 to-blue-600 rounded"></div>
                <h2 className="text-2xl font-bold text-gray-900">Advisory Board</h2>
              </div>
              <p className="text-gray-600 mb-8">
                Esteemed experts providing strategic guidance and academic excellence to the conference.
              </p>
            </div>

            {advisoryMembers.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {advisoryMembers.map((member) => (
                  <CommitteeMember
                    key={member.id}
                    name={member.name}
                    designation={member.designation}
                    affiliation={member.affiliation}
                    email={member.email}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No advisory committee members found.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white border-0">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">
                Join Our Distinguished Conference
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Be part of AdComSys 2026 and contribute to the advancement of communication systems
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/signup">
                  <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                    Register Now
                  </Button>
                </Link>
                <Link href="https://cmt3.research.microsoft.com/AdComSys2025" target="_blank">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent text-white border-white hover:bg-white/10">
                    Submit Your Paper
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 px-4 mt-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">AdComSys 2026</h3>
              <p className="text-gray-400 text-sm">
                International Conference on Advanced Communication Systems
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2 text-sm">
                <Link href="/call-for-papers" className="block text-gray-400 hover:text-white transition-colors">
                  Call for Papers
                </Link>
                <Link href="/registration" className="block text-gray-400 hover:text-white transition-colors">
                  Registration
                </Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Organized By</h4>
              <p className="text-gray-400 text-sm">
                Department of CST & CSIT<br />
                University of Engineering and Management<br />
                Kolkata, India
              </p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 AdComSys 2026. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
