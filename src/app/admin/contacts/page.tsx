'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  ScrollablePopup,
  ScrollablePopupHeader,
  ScrollablePopupTitle,
  ScrollablePopupDescription,
} from '@/components/ui/scrollable-popup'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Eye, Mail, Trash2, Download } from 'lucide-react'
import { toast } from 'sonner'

interface Contact {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  status: 'new' | 'read' | 'replied'
  created_at: string
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('new')
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)

  useEffect(() => {
    fetchContacts()
  }, [])

  useEffect(() => {
    filterContacts()
  }, [contacts, statusFilter])

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/admin/contacts')
      if (response.ok) {
        const data = await response.json()
        setContacts(data.contacts)
      } else {
        toast.error('Failed to fetch contacts')
      }
    } catch (error) {
      console.error('Failed to fetch contacts:', error)
      toast.error('An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const filterContacts = () => {
    if (statusFilter === 'all') {
      setFilteredContacts(contacts)
    } else {
      setFilteredContacts(contacts.filter(c => c.status === statusFilter))
    }
  }

  const handleViewContact = async (contact: Contact) => {
    setSelectedContact(contact)
    setIsViewDialogOpen(true)

    // Mark as read if new
    if (contact.status === 'new') {
      await updateContactStatus(contact.id, 'read')
    }
  }

  const updateContactStatus = async (id: string, status: 'read' | 'replied') => {
    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })

      if (response.ok) {
        fetchContacts()
      }
    } catch (error) {
      console.error('Failed to update contact:', error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return

    try {
      const response = await fetch(`/api/admin/contacts/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Message deleted')
        fetchContacts()
      } else {
        toast.error('Failed to delete message')
      }
    } catch (error) {
      console.error('Failed to delete contact:', error)
      toast.error('An error occurred')
    }
  }

  const getStatusBadge = (status: string) => {
    const config = {
      new: { color: 'bg-brand-orange text-brand-navy', text: 'New' },
      read: { color: 'bg-brand-navy/60 text-white', text: 'Read' },
      replied: { color: 'bg-brand-navy text-white', text: 'Replied' }
    }
    const { color, text } = config[status as keyof typeof config] || config.new
    return <Badge className={color}>{text}</Badge>
  }

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Subject', 'Message', 'Status', 'Date']
    const rows = filteredContacts.map(contact => [
      contact.name,
      contact.email,
      contact.phone || '',
      contact.subject,
      contact.message,
      contact.status,
      new Date(contact.created_at).toLocaleDateString()
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `contacts_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    toast.success('CSV exported successfully')
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
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <p className="text-white/80 mt-1">
            {contacts.filter(c => c.status === 'new').length} new messages
          </p>
        </div>
        <Button onClick={exportToCSV} className="bg-brand-orange text-brand-navy hover:bg-brand-orange hover:text-brand-navy">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-l-4 border-brand-orange">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-orange">
                {contacts.filter(c => c.status === 'new').length}
              </p>
              <p className="text-sm text-white-600 mt-1">New Messages</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-brand-navy/60">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-orange">
                {contacts.filter(c => c.status === 'read').length}
              </p>
              <p className="text-sm text-white-600 mt-1">Read</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-brand-navy">
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-brand-orange">
                {contacts.filter(c => c.status === 'replied').length}
              </p>
              <p className="text-sm text-white-600 mt-1">Replied</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-64">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="read">Read</SelectItem>
              <SelectItem value="replied">Replied</SelectItem>
              <SelectItem value="all">All</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Contacts Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.length > 0 ? (
                  filteredContacts.map((contact) => (
                    <TableRow key={contact.id} className={contact.status === 'new' ? 'bg-brand-orange/5' : ''}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{contact.name}</div>
                          <div className="text-sm text-gray-500">{contact.email}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{contact.subject}</TableCell>
                      <TableCell>{getStatusBadge(contact.status)}</TableCell>
                      <TableCell>
                        {new Date(contact.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewContact(contact)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(contact.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                      No messages found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* View Contact Dialog */}
      <ScrollablePopup open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen} className="max-w-2xl">
        <ScrollablePopupHeader>
          <ScrollablePopupTitle>Contact Message</ScrollablePopupTitle>
          <ScrollablePopupDescription>Message details and reply options</ScrollablePopupDescription>
        </ScrollablePopupHeader>
          {selectedContact && (
            <div className="space-y-4">
              {/* Contact Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Name:</span>
                    <span className="ml-2 font-medium">{selectedContact.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Email:</span>
                    <span className="ml-2 font-medium">{selectedContact.email}</span>
                  </div>
                  {selectedContact.phone && (
                    <div>
                      <span className="text-gray-600">Phone:</span>
                      <span className="ml-2 font-medium">{selectedContact.phone}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-600">Date:</span>
                    <span className="ml-2">{new Date(selectedContact.created_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Subject */}
              <div>
                <p className="text-sm text-gray-600 mb-1">Subject</p>
                <p className="font-semibold text-lg">{selectedContact.subject}</p>
              </div>

              {/* Message */}
              <div>
                <p className="text-sm text-gray-600 mb-2">Message</p>
                <div className="bg-brand-navy/5 border-l-4 border-brand-orange p-4 rounded-lg">
                  <p className="text-brand-navy whitespace-pre-wrap">{selectedContact.message}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  className="flex-1 bg-brand-orange text-brand-navy hover:bg-brand-orange/90"
                  onClick={() => {
                    window.location.href = `mailto:${selectedContact.email}?subject=Re: ${selectedContact.subject}`
                    updateContactStatus(selectedContact.id, 'replied')
                    setIsViewDialogOpen(false)
                  }}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Reply via Email
                </Button>
                <Button
                  variant="outline"
                  className="border-brand-navy text-brand-navy hover:bg-brand-navy hover:text-white"
                  onClick={() => setIsViewDialogOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
      </ScrollablePopup>
    </div>
  )
}
