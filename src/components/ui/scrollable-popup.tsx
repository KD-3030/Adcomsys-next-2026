"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScrollablePopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
  className?: string
}

export function ScrollablePopup({ open, onOpenChange, children, className }: ScrollablePopupProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/80 animate-in fade-in-0"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Popup Container */}
      <div 
        className={cn(
          "relative z-50 w-full max-w-lg mx-4 bg-black rounded-lg shadow-xl animate-in zoom-in-95 slide-in-from-bottom-2 max-h-[90vh] flex flex-col",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto overflow-x-hidden p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

export function ScrollablePopupHeader({ 
  className, 
  children,
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-1.5 mb-4", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function ScrollablePopupTitle({ 
  className, 
  children,
  ...props 
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </h2>
  )
}

export function ScrollablePopupDescription({ 
  className, 
  children,
  ...props 
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("text-sm text-gray-500", className)}
      {...props}
    >
      {children}
    </p>
  )
}
