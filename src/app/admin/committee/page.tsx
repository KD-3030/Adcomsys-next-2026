'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Edit, Plus, Trash2, User, Upload, X } from 'lucide-react'
import { toast } from 'sonner'
import { uploadImage, deleteImage } from '@/lib/storage/upload'
import Image from 'next/image'

interface CommitteeMember {
  id: string
  name: string
  designation: string
  affiliation: string
  email: string
  committee_type: 'organizing' | 'technical' | 'advisory'
  image_url?: string
  display_order?: number
  is_active?: boolean
  created_at: string
}

export default function CommitteePage() {
  const [members, setMembers] = useState<CommitteeMember[]>([])
  const [filteredMembers, setFilteredMembers] = useState<CommitteeMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingMember, setEditingMember] = useState<CommitteeMember | null>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [isUploading, setIsUploading] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    affiliation: '',
    email: '',
    committee_type: 'organizing' as 'organizing' | 'technical' | 'advisory',
    image_url: '',
    display_order: 0,
    is_active: true
  })

  useEffect(() => {
    fetchMembers()
  }, [])

  useEffect(() => {
    if (categoryFilter === 'all') {
      setFilteredMembers(members)
    } else {
      setFilteredMembers(members.filter(m => m.committee_type === categoryFilter))
    }
  }, [members, categoryFilter])

  const fetchMembers = async () => {
    try {
      const response = await fetch('/api/admin/committee')
      if (response.ok) {
        const data = await response.json()
        setMembers(data.members)
      } else {
        toast.error('Failed to fetch committee members')
      }
    } catch (error) {
      console.error('Failed to fetch members:', error)
      toast.error('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddNew = () => {
    setEditingMember(null)
    setFormData({
      name: '',
      designation: '',
      affiliation: '',
      email: '',
      committee_type: 'organizing',
      image_url: '',
      display_order: 0,
      is_active: true
    })
    setImageFile(null)
    setImagePreview('')
    setIsEditDialogOpen(true)
  }

  const handleEdit = (member: CommitteeMember) => {
    setEditingMember(member)
    setFormData({
      name: member.name,
      designation: member.designation,
      affiliation: member.affiliation,
      email: member.email,
      committee_type: member.committee_type,
      image_url: member.image_url || '',
      display_order: member.display_order || 0,
      is_active: member.is_active !== undefined ? member.is_active : true
    })
    setImageFile(null)
    setImagePreview(member.image_url || '')
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
    setFormData({ ...formData, image_url: '' })
  }

  const handleSave = async () => {
    // Validate
    if (!formData.name || !formData.affiliation || !formData.email) {
      toast.error('Please fill in all required fields')
      return
    }

    setIsUploading(true)

    try {
      let imageUrl = formData.image_url

      // Upload new image if selected
      if (imageFile) {
        // Delete old image if exists and we're editing
        if (editingMember?.image_url) {
          await deleteImage(editingMember.image_url, 'committee-images')
        }

        const result = await uploadImage(imageFile, 'committee-images', 'photos')
        if (result.success && result.url) {
          imageUrl = result.url
        } else {
          toast.error(result.error || 'Failed to upload image')
          setIsUploading(false)
          return
        }
      }

      const url = editingMember
        ? `/api/admin/committee/${editingMember.id}`
        : '/api/admin/committee'
      const method = editingMember ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, image_url: imageUrl })
      })

      if (response.ok) {
        toast.success(editingMember ? 'Member updated' : 'Member added')
        setIsEditDialogOpen(false)
        fetchMembers()
      } else {
        toast.error('Failed to save member')
      }
    } catch (error) {
      console.error('Failed to save member:', error)
      toast.error('An error occurred')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to remove this committee member?')) return

    try {
      const response = await fetch(`/api/admin/committee/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Member removed')
        fetchMembers()
      } else {
        toast.error('Failed to remove member')
      }
    } catch (error) {
      console.error('Failed to delete member:', error)
      toast.error('An error occurred')
    }
  }

  const getCategoryBadge = (category: string) => {
    const config = {
      organizing: { color: 'bg-brand-navy text-white', text: 'Organizing Committee' },
      technical: { color: 'bg-brand-orange text-brand-navy', text: 'Technical Committee' },
      advisory: { color: 'bg-brand-navy/80 text-white', text: 'Advisory Board' }
    }
    const categoryConfig = config[category as keyof typeof config]
    
    // Handle undefined category
    if (!categoryConfig) {
      return <Badge className="bg-gray-600">{category || 'Unknown'}</Badge>
    }
    
    const { color, text } = categoryConfig
    return <Badge className={color}>{text}</Badge>
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
          <h1 className="text-3xl font-bold">Committee</h1>
          <p className="text-white/80 mt-1">Manage conference committee members</p>
        </div>
        <Button onClick={handleAddNew} className="bg-white text-brand-navy hover:bg-brand-orange hover:text-brand-navy">
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-brand-navy">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-orange">
                {members.filter(m => m.committee_type === 'organizing').length}
              </p>
              <p className="text-sm text-white-600 mt-1">Organizing Committee</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-brand-orange">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-orange">
                {members.filter(m => m.committee_type === 'technical').length}
              </p>
              <p className="text-sm text-white-600 mt-1">Technical Committee</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-brand-navy/80">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-orange">
                {members.filter(m => m.committee_type === 'advisory').length}
              </p>
              <p className="text-sm text-white-600 mt-1">Advisory Board</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter */}
      <Card>
        <CardContent className="pt-6">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="organizing">Organizing Committee</SelectItem>
              <SelectItem value="technical">Technical Committee</SelectItem>
              <SelectItem value="advisory">Advisory Board</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Committee Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Affiliation</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {member.image_url ? (
                            <div className="relative w-12 h-12 flex-shrink-0">
                              <Image
                                src={member.image_url}
                                alt={member.name}
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
                            <div className="font-medium">{member.name}</div>
                            <div className="text-sm text-gray-500">{member.designation}</div>
                            <div className="text-xs text-gray-400">{member.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{member.affiliation}</TableCell>
                      <TableCell>{getCategoryBadge(member.committee_type)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(member)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(member.id)}
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
                      No committee members found. Click &quot;Add Member&quot; to create one.
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingMember ? 'Edit Committee Member' : 'Add Committee Member'}</DialogTitle>
            <DialogDescription>
              {editingMember ? 'Update member information' : 'Add a new committee member'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label>Name *</Label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full name"
                />
              </div>
              <div>
                <Label>Designation/Position</Label>
                <Input
                  value={formData.designation}
                  onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                  placeholder="e.g., Professor, Chair"
                />
              </div>
              <div>
                <Label>Category *</Label>
                <Select
                  value={formData.committee_type}
                  onValueChange={(value) => setFormData({ ...formData, committee_type: value as 'organizing' | 'technical' | 'advisory' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organizing">Organizing Committee</SelectItem>
                    <SelectItem value="technical">Technical Committee</SelectItem>
                    <SelectItem value="advisory">Advisory Board</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="col-span-2">
                <Label>Affiliation *</Label>
                <Input
                  value={formData.affiliation}
                  onChange={(e) => setFormData({ ...formData, affiliation: e.target.value })}
                  placeholder="University or Organization"
                />
              </div>
              <div className="col-span-2">
                <Label>Email *</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              <div className="col-span-2">
                <Label>Profile Photo</Label>
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
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 bg-brand-navy text-white rounded-md hover:bg-brand-navy/90 transition-colors">
                        <Upload className="h-4 w-4" />
                        <span className="text-sm">Upload Photo</span>
                      </div>
                      <input
                        id="image-upload"
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white" disabled={isUploading}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-brand-orange text-brand-navy hover:bg-brand-orange/90" disabled={isUploading}>
              {isUploading ? 'Uploading...' : (editingMember ? 'Update' : 'Create')}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
