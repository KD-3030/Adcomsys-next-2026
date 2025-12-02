'use client'

import { useState } from 'react'
import { ScrollablePopup, ScrollablePopupHeader, ScrollablePopupTitle, ScrollablePopupDescription } from '@/components/ui/scrollable-popup'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { Upload, Loader2 } from 'lucide-react'

interface SubmitPaperDialogProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
}

const PAPER_TRACKS = [
  // Track 1: Computing Paradigms & Technologies
  'Cloud Computing',
  'Fog Computing',
  'Dew Computing',
  'Parallel Computing',
  'Mobile Computing',
  'Pervasive Computing',
  'Green Computing',
  'Cognitive Computing',
  'Evolutionary Computation',
  'Grid Computing',
  'Quantum Computing',
  'Bio-inspired Computing',
  'Neuromorphic Computing',
  'High Performance Computing',
  'Distributed Computing',
  'Edge Computing',
  'DNA Computing & Reversible Computing',
  'Optical Computing',
  'Analog Computing',
  'Quantum Cryptography',
  'Digital Forensics',
  'Geoscience and Remote Sensing',
  'Industrial Informatics',
  'Human Centric Computing',
  
  // Track 2: Intelligent Systems & AI
  'Intelligent Systems',
  'AI with Robotics',
  'AI-based Image Processing',
  'Explainable AI',
  'Deep Learning',
  'Reinforcement Learning',
  'Active Learning',
  'Featured Learning',
  'Meta Learning',
  'Generative Models',
  'Generative Adversarial Network',
  'Soft Computing',
  'NLP-based Smart Systems',
  'Robotics Systems',
  'Data Analytics Systems',
  'Big Data',
  'Data Mining',
  'Automation',
  'AI-Systems in Autonomous Vehicles',
  'Fuzzy Systems',
  'Hybrid AI',
  'Cognitive Intelligence',
  'Affective Computing',
  'Audio, Speech and Video Processing',
  'Biomedical and Health Informatics',
  'Bioinformatics',
  
  // Track 3: Internet of Things & Applications
  'IoT in Healthcare',
  'IoT in Vehicular Network',
  'Industrial IoT',
  'IoT in Industry',
  'IoT in Agriculture',
  'IoT in Underwater Surveillance',
  'IoT in Smart City',
  'Human Activity Recognition',
  'Wireless Sensor Networks',
  '5G & beyond 5G',
  'IoT in Everything',
  'AI IoT',
  'Industry 4.0',
  'Consumer IoT',
  'Infrastructure IoT',
  'Commercial IoT',
  'Fog IoT',
  'Short and Long Range IoT',
  'Environmental IoT',
  'Security in IoT',
  
  // Track 4: Cybersecurity & Blockchain
  'Various types of Security Systems',
  'Malware Protection Systems',
  'Phishing Protection Systems',
  'DoS/DDoS Protection Systems',
  'Preventive and Detective Security Systems',
  'Corrective Security Systems',
  'Blockchain Authentication',
  'Consensus Mechanisms',
  'Blockchain Types and Networks',
  'Smart Contracts',
  'Decentralized Applications',
  'Blockchain Scalability Solutions',
  'Blockchain Governance',
  'Blockchain Interoperability',
  'Blockchain Security',
  'Cryptocurrencies and Tokens',
  'Non-Fungible Tokens',
  'Security, Privacy, Attacks, and Forensics',
  'Encryption Techniques',
  'Crypt Analysis',
  'Blockchain-based Machine Learning',
  'Dependable and Secure Computing',
  'Cybernetics'
]

export default function SubmitPaperDialog({ isOpen, onClose, onSuccess }: SubmitPaperDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    cmtPaperId: '',
    title: '',
    authors: '',
    subjectArea: '',
    abstract: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.cmtPaperId || !formData.title || !formData.authors || !formData.subjectArea) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/authors/papers/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit paper')
      }

      toast.success('Paper submitted successfully! Awaiting admin approval.')
      setFormData({
        cmtPaperId: '',
        title: '',
        authors: '',
        subjectArea: '',
        abstract: ''
      })
      onSuccess()
    } catch (error) {
      console.error('Submission error:', error)
      toast.error(error instanceof Error ? error.message : 'Failed to submit paper')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ScrollablePopup open={isOpen} onOpenChange={onClose} className="max-w-2xl">
      <ScrollablePopupHeader>
        <ScrollablePopupTitle>Submit New Paper</ScrollablePopupTitle>
        <ScrollablePopupDescription>
          Enter your paper details. This will be sent to admin for approval before appearing in your submissions.
        </ScrollablePopupDescription>
      </ScrollablePopupHeader>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg mb-4">
          <p className="text-sm text-blue-800">
            <strong className="font-semibold">Important:</strong> Make sure you have already submitted your paper through the{' '}
            <a 
              href="https://cmt3.research.microsoft.com/AdComSys2025" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-blue-600 font-semibold"
            >
              CMT Portal
            </a>
            {' '}and received your CMT Paper ID before filling this form.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="cmtPaperId">
              CMT Paper ID <span className="text-red-500">*</span>
            </Label>
            <Input
              id="cmtPaperId"
              value={formData.cmtPaperId}
              onChange={(e) => setFormData({ ...formData, cmtPaperId: e.target.value })}
              placeholder="e.g., 12345"
              required
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Your paper ID from the CMT portal
            </p>
          </div>

          <div>
            <Label htmlFor="title">
              Paper Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter the full paper title"
              required
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="authors">
              Authors <span className="text-red-500">*</span>
            </Label>
            <Input
              id="authors"
              value={formData.authors}
              onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
              placeholder="e.g., John Doe, Jane Smith, Robert Brown"
              required
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Enter all author names separated by commas
            </p>
          </div>

          <div>
            <Label htmlFor="subjectArea">
              Subject Area / Track <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.subjectArea}
              onValueChange={(value) => setFormData({ ...formData, subjectArea: value })}
              required
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a research track" />
              </SelectTrigger>
              <SelectContent className="max-h-[400px]">
                {PAPER_TRACKS.map((track) => (
                  <SelectItem key={track} value={track}>
                    {track}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500 mt-1">
              Select the most relevant track for your research
            </p>
          </div>

          <div>
            <Label htmlFor="abstract">Abstract (Optional)</Label>
            <Textarea
              id="abstract"
              value={formData.abstract}
              onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
              placeholder="Enter paper abstract..."
              rows={5}
              className="mt-1"
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#FFCC5C] hover:bg-[#ff9800] text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Submit Paper
                </>
              )}
            </Button>
          </div>
        </form>
    </ScrollablePopup>
  )
}
