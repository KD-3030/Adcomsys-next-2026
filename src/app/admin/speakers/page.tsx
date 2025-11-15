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
import { Edit, Plus, Trash2, User, Upload, X } from 'lucide-react'
import { toast } from 'sonner'
import { uploadImage, deleteImage } from '@/lib/storage/upload'
import Image from 'next/image'

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
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)

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
    setImageFile(null)
    setImagePreview('')
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
    setImageFile(null)
    setImagePreview(speaker.photo_url || '')
    setIsEditDialogOpen(true)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setImageFile(null)
    setImagePreview('')
    setFormData({ ...formData, photo_url: '' })
  }

  const handleSave = async () => {
    // Validate
    if (!formData.name || !formData.affiliation) {
      toast.error('Please fill in name and affiliation')
      return
    }

    setIsUploading(true)

    try {
      let photoUrl = formData.photo_url

      // Upload new image if selected
      if (imageFile) {
        // Delete old image if exists and we're editing
        if (editingSpeaker?.photo_url) {
          await deleteImage(editingSpeaker.photo_url, 'speaker-images')
        }

        const result = await uploadImage(imageFile, 'speaker-images', 'photos')
        if (result.success && result.url) {
          photoUrl = result.url
        } else {
          toast.error(result.error || 'Failed to upload image')
          setIsUploading(false)
          return
        }
      }

      const url = editingSpeaker
        ? `/api/admin/speakers/${editingSpeaker.id}`
        : '/api/admin/speakers'
      const method = editingSpeaker ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, photo_url: photoUrl })
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
    } finally {
      setIsUploading(false)
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center border-l-4 border-brand-orange bg-gradient-to-r from-brand-navy to-brand-navy/90 text-white p-6 rounded-lg">
        <div>
          <h1 className="text-3xl font-bold">Speakers</h1>
          <p className="text-white/80 mt-1">Manage keynote and invited speakers</p>
        </div>
        <Button onClick={handleAddNew} className="bg-white text-brand-navy hover:bg-brand-orange hover:text-brand-navy">
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
                            <div className="relative w-12 h-12 flex-shrink-0">
                              <Image
                                src={speaker.photo_url}
                                alt={speaker.name}
                                fill
                                className="rounded-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
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
        <DialogContent className="max-w-3xl">
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
                <label className="text-sm font-medium">Profile Photo</label>
                <div className="space-y-3">
                  {imagePreview ? (
                    <div className="relative w-32 h-32 mx-auto">
                      <Image
                        src={imagePreview}
                        alt="Preview"
                        fill
                        className="rounded-full object-cover border-2 border-brand-orange"
                      />
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={handleRemoveImage}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                      <User className="h-16 w-16 text-gray-400" />
                    </div>
                  )}
                  <div className="flex justify-center">
                    <label htmlFor="speaker-image-upload" className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 bg-brand-navy text-white rounded-md hover:bg-brand-navy/90 transition-colors">
                        <Upload className="h-4 w-4" />
                        <span className="text-sm">Upload Photo</span>
                      </div>
                      <input
                        id="speaker-image-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500 text-center">
                    Recommended: Square image, max 5MB
                  </p>
                </div>
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
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white" disabled={isUploading}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-brand-orange text-brand-navy hover:bg-brand-orange/90" disabled={isUploading}>
              {isUploading ? 'Uploading...' : (editingSpeaker ? 'Update' : 'Create')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
