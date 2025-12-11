'use client'

import { type HTMLAttributes, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// ANIMATION RULE: Only transform/opacity - NO layout properties (width/height/top/left)

export type BentoCardSize = 'sm' | 'md' | 'lg' | 'hero'
export type BentoCardAspect = 'square' | '4/3' | '16/10' | '16/9' | '3/4' | 'auto'

interface BentoCardProps extends HTMLAttributes<HTMLDivElement> {
  size?: BentoCardSize
  aspectRatio?: BentoCardAspect
  interactive?: boolean
  noPadding?: boolean
  colSpan?: number | { default?: number; lg?: number }
  rowSpan?: number | { default?: number; lg?: number }
  children: ReactNode
}

const sizeClasses: Record<BentoCardSize, string> = {
  sm: 'col-span-1 row-span-1',
  md: 'col-span-1 md:col-span-2 row-span-1',
  lg: 'col-span-1 md:col-span-2 lg:col-span-3 row-span-2',
  hero: 'col-span-1 md:col-span-2 row-span-1',
}

const aspectClasses: Record<BentoCardAspect, string> = {
  square: 'aspect-square',
  '4/3': 'aspect-[4/3]',
  '16/10': 'aspect-[16/10]',
  '16/9': 'aspect-video',
  '3/4': 'aspect-[3/4]',
  auto: '',
}

export function BentoCard({
  size = 'md',
  aspectRatio = 'auto',
  interactive = false,
  noPadding = false,
  colSpan,
  rowSpan,
  className,
  children,
  ...props
}: BentoCardProps) {
  const prefersReducedMotion = useReducedMotion()
  
  // Tailwind class mapping for grid spans (required for JIT compilation)
  const colSpanMap: Record<number, string> = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12',
  }
  
  const colSpanLgMap: Record<number, string> = {
    1: 'lg:col-span-1',
    2: 'lg:col-span-2',
    3: 'lg:col-span-3',
    4: 'lg:col-span-4',
    5: 'lg:col-span-5',
    6: 'lg:col-span-6',
    7: 'lg:col-span-7',
    8: 'lg:col-span-8',
    9: 'lg:col-span-9',
    10: 'lg:col-span-10',
    11: 'lg:col-span-11',
    12: 'lg:col-span-12',
  }
  
  const rowSpanMap: Record<number, string> = {
    1: 'row-span-1',
    2: 'row-span-2',
    3: 'row-span-3',
    4: 'row-span-4',
    5: 'row-span-5',
    6: 'row-span-6',
    7: 'row-span-7',
  }
  
  const rowSpanLgMap: Record<number, string> = {
    1: 'lg:row-span-1',
    2: 'lg:row-span-2',
    3: 'lg:row-span-3',
    4: 'lg:row-span-4',
    5: 'lg:row-span-5',
    6: 'lg:row-span-6',
    7: 'lg:row-span-7',
  }
  
  // Custom grid spans override size classes
  const getColSpan = () => {
    if (colSpan) {
      if (typeof colSpan === 'number') {
        return colSpanMap[colSpan] || ''
      }
      return cn(
        colSpan.default && colSpanMap[colSpan.default],
        colSpan.lg && colSpanLgMap[colSpan.lg]
      )
    }
    return sizeClasses[size]
  }
  
  const getRowSpan = () => {
    if (rowSpan) {
      if (typeof rowSpan === 'number') {
        return rowSpanMap[rowSpan] || ''
      }
      return cn(
        rowSpan.default && rowSpanMap[rowSpan.default],
        rowSpan.lg && rowSpanLgMap[rowSpan.lg]
      )
    }
    return ''
  }
  
  const baseClassName = cn(
    // Base styles
    'relative overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 ease-out',
    // Grid spans (custom or size-based)
    getColSpan(),
    getRowSpan(),
    // Aspect ratio
    aspectClasses[aspectRatio],
    // Padding (unless disabled)
    !noPadding && 'p-6 md:p-8',
    // Interactive state
    interactive &&
      'cursor-pointer hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    // Custom classes (applied last to override if needed)
    className
  )

  // C5: Hover-lift animation (scale ≤ 1.04, translateY ≤ 4px)
  if (interactive && !prefersReducedMotion) {
    return (
      <motion.div
        className={baseClassName}
        whileHover={{ scale: 1.02, y: -2 }}
        transition={{ 
          type: 'tween', 
          ease: [0.25, 0.1, 0.25, 1], // cubic-bezier for smooth feel
          duration: 0.3
        }}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <div className={baseClassName} {...props}>
      {children}
    </div>
  )
}

