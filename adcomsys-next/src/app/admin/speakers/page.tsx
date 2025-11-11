'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Edit, Plus, Trash2, User } from 'lucide-react'
import { toast } from 'sonner'

interface Speaker {
  id: string
  name: string
  title: string
  affiliation: string
  bio: string
  photo_url?: string
  talk_title?: string
  talk_abstract?: string
  created_at: string
}

export default function SpeakersPage() {
  const [speakers, setSpeakers] = useState<Speaker[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingSpeaker, setEditingSpeaker] = useState<Speaker | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    title: '',
    affiliation: '',
    bio: '',
    photo_url: '',
    talk_title: '',
    talk_abstract: ''
  })

  useEffect(() => {
    fetchSpeakers()
  }, [])

  const fetchSpeakers = async () => {
    try {
      const response = await fetch('/api/admin/speakers')
      if (response.ok) {
        const data = await response.json()
        setSpeakers(data.speakers)
      } else {
        toast.error('Failed to fetch speakers')
      }
    } catch (error) {
      console.error('Failed to fetch speakers:', error)
      toast.error('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddNew = () => {
    setEditingSpeaker(null)
    setFormData({
      name: '',
      title: '',
      affiliation: '',
      bio: '',
      photo_url: '',
      talk_title: '',
      talk_abstract: ''
    })
    setIsEditDialogOpen(true)
  }

  const handleEdit = (speaker: Speaker) => {
    setEditingSpeaker(speaker)
    setFormData({
      name: speaker.name,
      title: speaker.title,
      affiliation: speaker.affiliation,
      bio: speaker.bio,
      photo_url: speaker.photo_url || '',
      talk_title: speaker.talk_title || '',
      talk_abstract: speaker.talk_abstract || ''
    })
    setIsEditDialogOpen(true)
  }

  const handleSave = async () => {
    // Validate
    if (!formData.name || !formData.affiliation) {
      toast.error('Please fill in name and affiliation')
      return
    }

    try {
      const url = editingSpeaker
        ? `/api/admin/speakers/${editingSpeaker.id}`
        : '/api/admin/speakers'
      const method = editingSpeaker ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        toast.success(editingSpeaker ? 'Speaker updated' : 'Speaker added')
        setIsEditDialogOpen(false)
        fetchSpeakers()
      } else {
        toast.error('Failed to save speaker')
      }
    } catch (error) {
      console.error('Failed to save speaker:', error)
      toast.error('An error occurred')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this speaker?')) return

    try {
      const response = await fetch(`/api/admin/speakers/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Speaker deleted')
        fetchSpeakers()
      } else {
        toast.error('Failed to delete speaker')
      }
    } catch (error) {
      console.error('Failed to delete speaker:', error)
      toast.error('An error occurred')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Speakers</h1>
          <p className="text-gray-600 mt-1">Manage keynote and invited speakers</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add Speaker
        </Button>
      </div>

      {/* Speakers Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Speaker</TableHead>
                  <TableHead>Affiliation</TableHead>
                  <TableHead>Talk</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {speakers.length > 0 ? (
                  speakers.map((speaker) => (
                    <TableRow key={speaker.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {speaker.photo_url ? (
                            <img
                              src={speaker.photo_url}
                              alt={speaker.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                              <User className="h-6 w-6 text-gray-400" />
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{speaker.name}</div>
                            <div className="text-sm text-gray-500">{speaker.title}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{speaker.affiliation}</TableCell>
                      <TableCell>
                        {speaker.talk_title ? (
                          <div className="text-sm">{speaker.talk_title}</div>
                        ) : (
                          <span className="text-gray-400">No talk assigned</span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(speaker)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(speaker.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                      No speakers found. Click &quot;Add Speaker&quot; to create one.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit/Create Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingSpeaker ? 'Edit Speaker' : 'Add New Speaker'}</DialogTitle>
            <DialogDescription>
              {editingSpeaker ? 'Update speaker information' : 'Add a new keynote speaker'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-sm font-medium">Name *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Speaker's full name"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Title/Position</label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Professor, Director"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Affiliation *</label>
                <Input
                  value={formData.affiliation}
                  onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                  placeholder="University or Organization"
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium">Bio</label>
                <Textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Speaker biography"
                  rows={3}
                />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium">Photo URL</label>
                <Input
                  value={formData.photo_url}
                  onChange={(e) => setFormData({ ...formData, photo_url: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Enter a direct URL to the speaker&apos;s photo
                </p>
              </div>
            </div>

            <div className="border-t pt-4">
              <h3 className="font-medium mb-4">Talk Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Talk Title</label>
                  <Input
                    value={formData.talk_title}
                    onChange={(e) => setFormData({ ...formData, talk_title: e.target.value })}
                    placeholder="Title of the keynote/talk"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Talk Abstract</label>
                  <Textarea
                    value={formData.talk_abstract}
                    onChange={(e) => setFormData({ ...formData, talk_abstract: e.target.value })}
                    placeholder="Abstract or description of the talk"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingSpeaker ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
