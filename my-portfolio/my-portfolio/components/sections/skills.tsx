'use client'

import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { SectionReveal } from '@/components/animations/section-reveal'
import { cn } from '@/lib/utils'

const skills = [
  {
    title: 'Core Design',
    image: '/skills/core-design.webp',
    description: [
      'I design interfaces for web and mobile products that stay clean, simple, and easy to use.',
      'I like to bring order into products: design systems, components, and repeatable patterns so the whole product feels consistent.',
      'I always think about implementation while designing: states, edge cases, and behavior across devices.',
    ],
  },
  {
    title: 'UX',
    image: '/skills/ux-research.webp',
    description: [
      'Before drawing anything, I think through what a person wants to achieve and how they will move from point A to point B.',
      'I focus on clear structure: navigation that makes sense, obvious priorities on the screen, and as few unnecessary steps as possible.',
      'I am comfortable reworking solutions when they do not serve the task or the user well enough.',
    ],
  },
  {
    title: 'UI & Visual',
    image: '/skills/ui-visual.webp',
    description: [
      'I work with composition, typography, and spacing so interfaces look tidy and readable.',
      'I build clear UI patterns: how buttons, forms, cards, and error or loading states behave.',
      'I adapt layouts to different screen sizes while keeping one consistent visual character.',
    ],
  },
  {
    title: 'Tools',
    image: '/skills/design-tools.webp',
    description: [
      'Figma is my main workspace: auto‑layout, components, variants, styles, and full design systems.',
      'I use Photoshop when I need to prepare or clean up graphics for interfaces.',
      'I rely on plugins and ready‑made libraries where it makes sense, so I spend time on decisions, not on repetitive routine.',
    ],
  },
  {
    title: 'AI & Automation',
    image: '/skills/ai-automation.webp',
    description: [
      'I am interested in how AI can speed up design work, from early ideation to quick high‑fidelity concepts.',
      'I use AI as a practical helper for finding references, generating interface options, and drafting text.',
      'I combine manual work and AI when it saves time and keeps the quality of the product high.',
    ],
  },
  {
    title: 'Design & Code',
    image: '/skills/design-code.webp',
    description: [
      'I care about how design turns into code, so I try to create layouts that are straightforward to implement.',
      'I think through states, logic, and element behavior at the design stage, so there are no undefined screens later.',
      'I understand that clean, structured design makes it easier to build and maintain a clean interface in code.',
    ],
  },
]

function SkillCard({
  title,
  image,
  description,
}: {
  title: string
  image: string
  description: string[]
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [direction, setDirection] = useState<'top' | 'bottom' | 'left' | 'right'>('left')

  const handleMouseEnter = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const { width: w, height: h, left, top } = ref.current.getBoundingClientRect()
    const x = event.clientX - left - (w / 2) * (w > h ? h / w : 1)
    const y = event.clientY - top - (h / 2) * (h > w ? w / h : 1)
    const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4
    const directions: Array<'top' | 'right' | 'bottom' | 'left'> = ['top', 'right', 'bottom', 'left']
    setDirection(directions[d])
  }

  const textVariants = {
    initial: { opacity: 0, y: 10 },
    exit: { opacity: 0, y: 10 },
    top: { opacity: 1, y: 0 },
    bottom: { opacity: 1, y: 0 },
    left: { opacity: 1, y: 0 },
    right: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      onMouseEnter={handleMouseEnter}
      className="relative h-[320px] w-full overflow-hidden rounded-xl border border-border bg-card group/card cursor-pointer"
    >
      <AnimatePresence mode="wait">
        <motion.div
          className="relative h-full w-full"
          initial="initial"
          whileHover={direction}
          exit="exit"
        >
          {/* Background image */}
          <div className="absolute inset-0">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover/card:scale-110"
            />
          </div>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Title always visible at bottom */}
          <div 
            className="absolute bottom-0 left-0 right-0 p-5 z-10 transition-opacity duration-300 group-hover/card:opacity-0"
            style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
          >
            <h3 className="text-lg font-medium text-white">{title}</h3>
          </div>

          {/* Dark overlay on hover */}
          <motion.div className="absolute inset-0 z-10 bg-black/70 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100" />

          {/* Text content on hover */}
          <motion.div
            variants={textVariants}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute inset-0 z-20 flex flex-col justify-center p-5 opacity-0 group-hover/card:opacity-100"
            style={{ fontFamily: 'var(--font-inter), Inter, system-ui, sans-serif' }}
          >
            <h3 className="mb-3 text-base font-medium tracking-normal text-white">{title}</h3>
            <ul className="space-y-2">
              {description.map((item, i) => (
                <li key={i} className="text-[12px] leading-[1.7] font-normal text-white/80">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}

export function SkillsSection() {
  return (
    <SectionReveal>
      <section id="skills" className="min-h-[60vh] px-4 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-fg md:text-5xl">Skills</h2>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skills.map((skill) => (
              <SkillCard
                key={skill.title}
                title={skill.title}
                image={skill.image}
                description={skill.description}
              />
            ))}
          </div>
        </div>
      </section>
    </SectionReveal>
  )
}
