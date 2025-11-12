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
import { Edit, Plus, Trash2, User } from 'lucide-react'
import { toast } from 'sonner'

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
    setIsEditDialogOpen(true)
  }

  const handleSave = async () => {
    // Validate
    if (!formData.name || !formData.affiliation || !formData.email) {
      toast.error('Please fill in all required fields')
      return
    }

    try {
      const url = editingMember
        ? `/api/admin/committee/${editingMember.id}`
        : '/api/admin/committee'
      const method = editingMember ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
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
      organizing: { color: 'bg-blue-600', text: 'Organizing Committee' },
      technical: { color: 'bg-green-600', text: 'Technical Committee' },
      advisory: { color: 'bg-purple-600', text: 'Advisory Board' }
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Committee</h1>
          <p className="text-gray-600 mt-1">Manage conference committee members</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" />
          Add Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">
                {members.filter(m => m.committee_type === 'organizing').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Organizing Committee</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">
                {members.filter(m => m.committee_type === 'technical').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Technical Committee</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">
                {members.filter(m => m.committee_type === 'advisory').length}
              </p>
              <p className="text-sm text-gray-600 mt-1">Advisory Board</p>
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
                            <img
                              src={member.image_url}
                              alt={member.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
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
                <Label>Photo URL</Label>
                <Input
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                  placeholder="https://example.com/photo.jpg"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {editingMember ? 'Update' : 'Create'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
