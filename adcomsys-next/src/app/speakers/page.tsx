import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ArrowLeft, Linkedin, Mail, Award, Briefcase } from 'lucide-react'

export default function SpeakersPage() {
  const speakers = [
    {
      name: 'Dr. Rajesh Kumar',
      title: 'Distinguished Scientist',
      affiliation: 'Indian Institute of Technology, Delhi',
      image: '',
      expertise: 'Artificial Intelligence & Machine Learning',
      bio: 'Dr. Rajesh Kumar is a renowned researcher in AI with over 200 publications and 15,000+ citations.',
      linkedin: '#',
      email: 'rajesh.kumar@iitd.ac.in',
      keynote: 'Future of AI in Healthcare'
    },
    {
      name: 'Prof. Sarah Johnson',
      title: 'Professor & Research Lead',
      affiliation: 'MIT, United States',
      image: '',
      expertise: 'Quantum Computing',
      bio: 'Prof. Johnson leads groundbreaking research in quantum algorithms and has received multiple NSF grants.',
      linkedin: '#',
      email: 'sjohnson@mit.edu',
      keynote: 'Quantum Computing: From Theory to Practice'
    },
    {
      name: 'Dr. Priya Sharma',
      title: 'Chief Data Scientist',
      affiliation: 'Microsoft Research, India',
      image: '',
      expertise: 'Big Data & Cloud Computing',
      bio: 'Dr. Sharma has pioneered scalable data processing systems serving millions of users globally.',
      linkedin: '#',
      email: 'priya.sharma@microsoft.com',
      keynote: 'Scaling Data Systems in the Cloud Era'
    },
    {
      name: 'Prof. David Chen',
      title: 'Chair, Computer Science',
      affiliation: 'Stanford University',
      image: '',
      expertise: 'Cybersecurity & Blockchain',
      bio: 'Prof. Chen is a leading expert in cryptographic protocols and blockchain consensus mechanisms.',
      linkedin: '#',
      email: 'dchen@stanford.edu',
      keynote: 'Decentralized Security: The Blockchain Revolution'
    },
    {
      name: 'Dr. Anita Desai',
      title: 'Senior Research Fellow',
      affiliation: 'IIIT Hyderabad',
      image: '',
      expertise: 'Internet of Things',
      bio: 'Dr. Desai has developed innovative IoT solutions for smart cities and sustainable agriculture.',
      linkedin: '#',
      email: 'anita.desai@iiit.ac.in',
      keynote: 'IoT for Sustainable Development'
    },
    {
      name: 'Prof. Michael Brown',
      title: 'Director, AI Research',
      affiliation: 'Oxford University',
      image: '',
      expertise: 'Deep Learning & Computer Vision',
      bio: 'Prof. Brown has made significant contributions to neural architecture design and visual recognition.',
      linkedin: '#',
      email: 'mbrown@oxford.ac.uk',
      keynote: 'Next Generation Computer Vision Systems'
    }
  ]

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

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
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="text-center mb-12">
          <Badge className="mb-4" variant="secondary">Keynote Speakers</Badge>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Distinguished Speakers</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn from world-renowned experts and thought leaders in computing and systems research
          </p>
        </div>

        {/* Speakers Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {speakers.map((speaker, index) => (
            <Card key={index} className="hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={speaker.image} alt={speaker.name} />
                    <AvatarFallback className="bg-blue-600 text-white text-xl">
                      {getInitials(speaker.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="mb-1">{speaker.name}</CardTitle>
                    <p className="text-sm text-gray-600 font-medium">{speaker.title}</p>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <Briefcase className="h-3 w-3 mr-1" />
                      {speaker.affiliation}
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Badge variant="secondary" className="mb-2">
                    <Award className="h-3 w-3 mr-1" />
                    {speaker.expertise}
                  </Badge>
                  <p className="text-sm text-gray-700 leading-relaxed">{speaker.bio}</p>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600 mb-1 font-semibold">Keynote Topic:</p>
                  <p className="text-sm font-medium text-blue-900">{speaker.keynote}</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Link href={`mailto:${speaker.email}`}>
                    <Button size="sm" variant="outline">
                      <Mail className="h-4 w-4 mr-1" />
                      Email
                    </Button>
                  </Link>
                  <Link href={speaker.linkedin} target="_blank">
                    <Button size="sm" variant="outline">
                      <Linkedin className="h-4 w-4 mr-1" />
                      LinkedIn
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* More Speakers Coming Soon */}
        <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
          <CardContent className="py-12 text-center">
            <Award className="h-16 w-16 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-2">More Speakers Coming Soon!</h2>
            <p className="text-blue-100 mb-6">
              We are finalizing additional keynote speakers and industry experts. Stay tuned for updates.
            </p>
            <Link href="/registration">
              <Button size="lg" variant="secondary">
                Register Now
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Speaker Benefits */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-center mb-8">Why Attend Our Keynotes?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Latest Research Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Get exclusive access to cutting-edge research and emerging trends from global leaders.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Networking Opportunities</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Connect with speakers during Q&A sessions and networking breaks.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Industry Perspectives</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Learn how academic research translates to real-world industry applications.
                </p>
              </CardContent>
            </Card>
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
