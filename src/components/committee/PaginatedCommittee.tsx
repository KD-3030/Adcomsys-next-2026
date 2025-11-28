'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, Mail, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'

interface CommitteeMemberData {
  id: string
  name: string
  designation: string
  affiliation: string
  email: string
  committee_type: 'organizing' | 'technical' | 'advisory'
  display_order: number
  is_active: boolean
  image_url: string | null
}

interface PaginatedCommitteeProps {
  members: CommitteeMemberData[]
  itemsPerPage?: number
  title?: string
}

function CommitteeMemberCard({ member }: { member: CommitteeMemberData }) {
  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-l-4 border-[#fca311] shadow-md bg-white relative z-10">
      <div className="bg-gradient-to-r from-[#14213d] to-[#1a2844] h-2"></div>
      <CardContent className="p-6 bg-white">
        <div className="flex flex-col items-center text-center gap-4 bg-white relative">
          {member.image_url ? (
            <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#fca311]">
              <Image
                src={member.image_url}
                alt={member.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          ) : (
            <div className="bg-gradient-to-r from-[#14213d] to-[#1a2844] p-3 rounded-full flex-shrink-0">
              <Users className="h-6 w-6 text-[#fca311]" />
            </div>
          )}
          <div className="flex-1 w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{member.name}</h3>
            <p className="text-sm font-medium text-[#fca311] mb-2">
              {member.designation}
            </p>
            {member.affiliation && (
              <p className="text-xs text-gray-600 leading-relaxed">
                {member.affiliation}
              </p>
            )}
            {member.email && (
              <p className="text-xs text-[#fca311] mt-3">
                <a href={`mailto:${member.email}`} className="hover:underline hover:text-[#ff9800] transition-colors inline-flex items-center gap-1">
                  <Mail className="h-3 w-3" />
                  {member.email}
                </a>
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

const PAGE_SIZE_OPTIONS = [20, 30, 50, 100] as const

export default function PaginatedCommittee({ members, itemsPerPage = 24, title }: PaginatedCommitteeProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(itemsPerPage)
  
  const totalPages = Math.ceil(members.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentMembers = members.slice(startIndex, endIndex)
  
  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize)
    setCurrentPage(1) // Reset to first page when changing page size
  }
  
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
    // Scroll to top of the section
    window.scrollTo({ top: 300, behavior: 'smooth' })
  }

  // Generate page numbers to show
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const showEllipsis = totalPages > 7
    
    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
      }
    }
    
    return pages
  }

  if (members.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
        <p>No committee members found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with count */}
      <div className="flex items-center justify-between">
        {title && (
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-gray-600" />
            <h2 className="text-2xl font-bold text-[#14213d]">{title}</h2>
            <div className="h-1 w-20 bg-gradient-to-r from-gray-500 to-gray-700 rounded"></div>
          </div>
        )}
        <Badge variant="secondary" className="text-sm">
          {members.length} Members
        </Badge>
      </div>

      {/* Members Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentMembers.map((member) => (
          <CommitteeMemberCard key={member.id} member={member} />
        ))}
      </div>

      {/* Pagination Controls */}
      {members.length > PAGE_SIZE_OPTIONS[0] && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, members.length)} of {members.length} members
            </p>
            
            {/* Page Size Selector */}
            <div className="flex items-center gap-2">
              <label htmlFor="pageSize" className="text-sm text-gray-600">Show:</label>
              <select
                id="pageSize"
                value={pageSize}
                onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                className="h-9 px-3 rounded-md border border-gray-300 bg-white text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#fca311] focus:border-transparent cursor-pointer"
              >
                {PAGE_SIZE_OPTIONS.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span className="text-sm text-gray-600">per page</span>
            </div>
          </div>
          
          {totalPages > 1 && (
          <div className="flex items-center gap-1">
            {/* First Page */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(1)}
              disabled={currentPage === 1}
              className="h-9 w-9"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>
            
            {/* Previous Page */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="h-9 w-9"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            {/* Page Numbers */}
            <div className="flex items-center gap-1 mx-2">
              {getPageNumbers().map((page, index) => (
                typeof page === 'number' ? (
                  <Button
                    key={index}
                    variant={currentPage === page ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => goToPage(page)}
                    className={`h-9 w-9 ${currentPage === page ? 'bg-[#fca311] hover:bg-[#ff9800] text-white' : ''}`}
                  >
                    {page}
                  </Button>
                ) : (
                  <span key={index} className="px-2 text-gray-400">...</span>
                )
              ))}
            </div>
            
            {/* Next Page */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="h-9 w-9"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            
            {/* Last Page */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => goToPage(totalPages)}
              disabled={currentPage === totalPages}
              className="h-9 w-9"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
          )}
        </div>
      )}
    </div>
  )
}
