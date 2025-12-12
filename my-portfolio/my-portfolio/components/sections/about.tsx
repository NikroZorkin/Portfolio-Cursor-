'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { BentoCard } from '@/components/bento-card'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { HandRaisedIcon } from '@heroicons/react/24/outline'

// Apple-style smooth easing
const smoothEase = [0.25, 0.4, 0.25, 1]

// Custom SVG Icons from devicon style
const FigmaIcon = () => (
  <svg viewBox="0 0 128 128" className="h-5 w-5">
    <path fill="#0acf83" d="M45.5 129c11.9 0 21.5-9.6 21.5-21.5V86H45.5C33.6 86 24 95.6 24 107.5S33.6 129 45.5 129z"/>
    <path fill="#a259ff" d="M24 64.5C24 52.6 33.6 43 45.5 43H67v43H45.5C33.6 86 24 76.4 24 64.5z"/>
    <path fill="#f24e1e" d="M24 21.5C24 9.6 33.6 0 45.5 0H67v43H45.5C33.6 43 24 33.4 24 21.5z"/>
    <path fill="#ff7262" d="M67 0h21.5C100.4 0 110 9.6 110 21.5S100.4 43 88.5 43H67V0z"/>
    <path fill="#1abcfe" d="M110 64.5c0 11.9-9.6 21.5-21.5 21.5S67 76.4 67 64.5 76.6 43 88.5 43 110 52.6 110 64.5z"/>
  </svg>
)

const AISparkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path d="M12 2L13.09 8.26L19 7L14.74 11.09L21 12L14.74 12.91L19 17L13.09 15.74L12 22L10.91 15.74L5 17L9.26 12.91L3 12L9.26 11.09L5 7L10.91 8.26L12 2Z" 
      fill="currentColor" className="text-violet-500"/>
  </svg>
)

const CodeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path d="M8 18L2 12L8 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500"/>
    <path d="M16 6L22 12L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-500"/>
  </svg>
)

const ToolsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500"/>
  </svg>
)

const AccessibilityIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <circle cx="12" cy="4" r="2" fill="currentColor" className="text-emerald-500"/>
    <path d="M12 8V13M8 10H16M10 13L8 21M14 13L16 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"/>
  </svg>
)

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path d="M6.5 12.5L17.5 2.5C17.5 2.5 21.5 6.5 21.5 12.5C21.5 18.5 15.5 21.5 12 21.5C8.5 21.5 2.5 18.5 2.5 12.5C2.5 6.5 6.5 2.5 6.5 2.5" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"/>
    <path d="M12 8V16M8 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-green-500"/>
  </svg>
)

const TeamIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="2" className="text-blue-500"/>
    <circle cx="17" cy="7" r="3" stroke="currentColor" strokeWidth="2" className="text-blue-500"/>
    <path d="M3 21V19C3 16.79 4.79 15 7 15H11C13.21 15 15 16.79 15 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-blue-500"/>
    <path d="M17 15C19.21 15 21 16.79 21 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-blue-500"/>
  </svg>
)

const FitnessIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path d="M6.5 6.5L17.5 17.5M6.5 17.5L17.5 6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-rose-500"/>
    <path d="M2 12H6M18 12H22M12 2V6M12 18V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-rose-500"/>
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" className="text-rose-500"/>
  </svg>
)

const MountainIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path d="M8 21L12 10L16 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500"/>
    <path d="M2 21L7 11L10 16L12 10L15 16L17 11L22 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal-500"/>
  </svg>
)

const BookIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
    <path d="M4 19.5C4 18.837 4.26339 18.2011 4.73223 17.7322C5.20107 17.2634 5.83696 17 6.5 17H20" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"/>
    <path d="M6.5 2H20V22H6.5C5.83696 22 5.20107 21.7366 4.73223 21.2678C4.26339 20.7989 4 20.163 4 19.5V4.5C4 3.83696 4.26339 3.20107 4.73223 2.73223C5.20107 2.26339 5.83696 2 6.5 2Z" 
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-500"/>
  </svg>
)

// Interactive list item component
function ListItem({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="group/item flex items-center gap-3 py-2 px-3 -mx-3 rounded-lg transition-all duration-200 hover:bg-white/5 cursor-default">
      <span className="flex-shrink-0 transition-transform duration-200 group-hover/item:scale-110">
        {icon}
      </span>
      <span className="text-sm text-muted-fg transition-colors duration-200 group-hover/item:text-fg">
        {children}
      </span>
    </li>
  )
}

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1, margin: '0px 0px -80px 0px' })
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const headerVariants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: smoothEase,
      },
    },
  }

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: prefersReducedMotion ? 0 : 35,
      scale: prefersReducedMotion ? 1 : 0.97,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: smoothEase,
      },
    },
  }

  return (
    <section id="about" className="min-h-[60vh] px-4 py-24 md:px-8">
      <motion.div 
        ref={containerRef}
        className="mx-auto max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div className="mb-12" variants={headerVariants}>
          <h2 className="text-3xl font-bold text-fg md:text-5xl">About</h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {/* Bio */}
          <motion.div className="md:col-span-2" variants={cardVariants}>
            <BentoCard size="md" className="h-full">
              <h3 className="flex items-center gap-2 text-xl font-semibold text-card-fg">
                Hi, I'm Danylo Zorkin <HandRaisedIcon className="h-6 w-6 text-primary" />
              </h3>
              <p className="mt-4 text-muted-fg leading-relaxed">
                I'm a UX/UI designer focused on AI-driven products and clean, code-friendly interfaces. I'm comfortable moving between Figma, design systems, and front-end logic, creating experiences that look great and work well.
              </p>
              <p className="mt-4 text-muted-fg leading-relaxed">
                I'm really curious about how AI can speed up research, brainstorming, and creative exploration — from quick UX ideas to polished UI designs. I enjoy working where design meets engineering, speaking both "designer" and "developer" to make teamwork easier and smarter.
              </p>
              <p className="mt-4 text-muted-fg leading-relaxed">
                When I'm not designing, you'll usually find me testing new AI tools, improving my design process, learning more about coding, or diving into product and tech trends to stay ahead of the curve.
              </p>
            </BentoCard>
          </motion.div>

          {/* Photo */}
          <motion.div variants={cardVariants}>
            <BentoCard
              size="sm"
              noPadding
              className="relative overflow-hidden h-full min-h-[280px]"
            >
              <div className="relative h-full w-full">
                <Image
                  src="/IMG000 (2).jpg"
                  alt="About me"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  style={{ 
                    objectPosition: 'center 70%',
                    transform: 'scale(1.2) translateX(-8%)'
                  }}
                />
              </div>
            </BentoCard>
          </motion.div>

          {/* Interests */}
          <motion.div variants={cardVariants}>
            <BentoCard size="sm" className="h-full">
              <h3 className="text-lg font-semibold text-card-fg mb-2">Interests</h3>
              <ul className="space-y-0.5">
                <ListItem icon={<AISparkIcon />}>
                  AI-assisted design workflows
                </ListItem>
                <ListItem icon={<FigmaIcon />}>
                  UX/UI for digital products
                </ListItem>
                <ListItem icon={<ToolsIcon />}>
                  Exploring new AI & design tools
                </ListItem>
              </ul>
            </BentoCard>
          </motion.div>

          {/* Values */}
          <motion.div variants={cardVariants}>
            <BentoCard size="sm" className="h-full">
              <h3 className="text-lg font-semibold text-card-fg mb-2">Values</h3>
              <ul className="space-y-0.5">
                <ListItem icon={<AccessibilityIcon />}>
                  Clarity & functional minimalism
                </ListItem>
                <ListItem icon={<LeafIcon />}>
                  Consistency & system-driven design
                </ListItem>
                <ListItem icon={<TeamIcon />}>
                  Continuous learning & collaboration
                </ListItem>
              </ul>
            </BentoCard>
          </motion.div>

          {/* Hobbies */}
          <motion.div variants={cardVariants}>
            <BentoCard size="sm" className="h-full">
              <h3 className="text-lg font-semibold text-card-fg mb-2">Hobbies</h3>
              <ul className="space-y-0.5">
                <ListItem icon={<FitnessIcon />}>
                  Fitness
                </ListItem>
                <ListItem icon={<MountainIcon />}>
                  Hiking
                </ListItem>
                <ListItem icon={<BookIcon />}>
                  Reading
                </ListItem>
              </ul>
            </BentoCard>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
