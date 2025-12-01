'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/ui-utils'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.5, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedCard({ children, className, delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

interface GradientTextProps {
  children: ReactNode
  className?: string
  from?: string
  to?: string
}

export function GradientText({ children, className, from = 'brand-orange', to = 'brand-navy' }: GradientTextProps) {
  return (
    <span className={cn(
      `bg-linear-to-r from-${from} to-${to} bg-clip-text text-transparent`,
      className
    )}>
      {children}
    </span>
  )
}

interface GlowButtonProps {
  children: ReactNode
  onClick?: () => void
  className?: string
}

export function GlowButton({ children, onClick, className }: GlowButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "relative px-6 py-3 bg-brand-orange text-brand-navy font-semibold rounded-lg",
        "shadow-lg hover:shadow-brand-orange/50 transition-all duration-300",
        "before:absolute before:inset-0 before:rounded-lg before:bg-brand-orange",
        "before:opacity-0 hover:before:opacity-20 before:blur-xl before:transition-opacity",
        className
      )}
    >
      {children}
    </motion.button>
  )
}

export function PulsingBadge({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full",
        "bg-brand-orange text-brand-navy font-semibold text-sm",
        className
      )}
    >
      {children}
    </motion.div>
  )
}

export function FloatingCard({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

interface StaggerChildrenProps {
  children: ReactNode
  className?: string
}

export function StaggerChildren({ children, className }: StaggerChildrenProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className }: { children: ReactNode, className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

