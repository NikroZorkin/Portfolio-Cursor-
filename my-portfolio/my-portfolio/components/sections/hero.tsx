'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { BentoCard } from '@/components/bento-card'
import { MagneticButton } from '@/components/animations/magnetic-button'
import { ParallaxImage } from '@/components/animations/parallax-image'
import { SectionReveal } from '@/components/animations/section-reveal'
import { trackCTAClick } from '@/lib/analytics'

const experiences = [
  {
    title: 'Senior UX/UI Designer',
    company: 'Tech Startup Inc',
    period: '2021 - Present',
    description:
      'Leading design for a B2B SaaS platform, managing a team of 3 designers',
  },
  {
    title: 'UX Designer',
    company: 'Digital Agency',
    period: '2019 - 2021',
    description:
      'Designed mobile and web applications for clients across various industries',
  },
  {
    title: 'Junior Designer',
    company: 'Creative Studio',
    period: '2017 - 2019',
    description:
      'Started career creating marketing materials and landing pages',
  },
]
import { heroProjects } from '@/lib/projects-data'
import { siteConfig } from '@/lib/site-config'
import {
  generateEmailLinks,
  isDesktopDevice,
  hasClickModifiers,
  tryOpenGmail,
} from '@/lib/email-helper'

export function HeroSection() {
  const [isDesktop, setIsDesktop] = useState(false)

  // Generate email links once
  const { mailtoHref, gmailUrl } = generateEmailLinks({
    to: siteConfig.contact.email,
    subject: siteConfig.contact.subject,
    body: siteConfig.contact.body,
  })

  // Detect if desktop on mount
  useEffect(() => {
    setIsDesktop(isDesktopDevice())
  }, [])

  // Smart email click handler
  const handleEmailClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>) => {
      // If user used modifiers (Ctrl, Cmd, Shift, middle click) - don't intercept
      if (hasClickModifiers(event.nativeEvent)) {
        return // Let native behavior handle it
      }

      // Mobile/tablet - let mailto work natively
      if (!isDesktop) {
        trackCTAClick('email', { target: 'mailto' })
        return // Go to mailto href
      }

      // Desktop - try to open Gmail web compose
      event.preventDefault()

      const gmailOpened = tryOpenGmail(gmailUrl)

      if (gmailOpened) {
        // Successfully opened Gmail web
        trackCTAClick('email', { target: 'gmail' })
      } else {
        // Popup blocked - fallback to mailto
        trackCTAClick('email', { target: 'mailto' })
        window.location.href = mailtoHref
      }
    },
    [isDesktop, gmailUrl, mailtoHref]
  )

  return (
    <SectionReveal>
      <section
        id="hero"
        className="relative min-h-screen px-4 py-24 md:px-8 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          {/* Bento Grid: 12 columns on desktop, single column on mobile - matching reference layout */}
          <div className="grid grid-cols-1 gap-4 auto-rows-[160px] lg:grid-cols-12">
            {/* 1) Name: colSpan=4, rowSpan=2 (left top, smaller width) */}
            <BentoCard
              colSpan={{ default: 12, lg: 4 }}
              rowSpan={{ default: 2, lg: 2 }}
              className="flex flex-col justify-end lg:col-start-1 lg:row-start-1 lg:min-h-[336px] lg:max-h-[336px]"
            >
              <h1 className="text-4xl font-black uppercase tracking-tight leading-[0.95] text-fg sm:text-balance md:text-5xl lg:leading-[0.9] lg:text-[clamp(28px,5vw,72px)]">
                DANYLO
                <br />
                ZORKIN
              </h1>
            </BentoCard>

            {/* 2) Portrait: colSpan=3, rowSpan=3 (middle column) - Portrait photo */}
            <BentoCard
              colSpan={{ default: 12, lg: 3 }}
              rowSpan={{ default: 3, lg: 3 }}
              noPadding
              className="relative overflow-hidden lg:col-start-5 lg:row-start-1 lg:min-h-[512px] lg:max-h-[512px]"
            >
              <div className="absolute inset-0 bg-gray-100">
<img
                    src="/IMG000.jpg"
                    alt="Danylo Zorkin"
                    className="h-full w-full object-cover object-[60%_30%]"
                  />
              </div>
            </BentoCard>

            {/* 3) Experience: colSpan=5, rowSpan=4 (rightmost column, aligned with bio bottom) */}
            <BentoCard
              colSpan={{ default: 12, lg: 5 }}
              rowSpan={{ default: 4, lg: 4 }}
              className="flex flex-col lg:col-start-8 lg:row-start-1 lg:min-h-[688px] lg:max-h-[688px]"
            >
              <h2 className="mb-6 text-2xl font-bold uppercase text-fg md:text-3xl lg:text-4xl">
                Experience
              </h2>
              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div key={index} className="border-b border-border pb-6 last:border-0 last:pb-0">
                    <h3 className="text-base font-semibold text-card-fg leading-tight md:text-lg">
                      {exp.title}
                    </h3>
                    <p className="mt-1 text-sm italic text-muted-fg leading-tight md:text-base">
                      {exp.company}
                    </p>
                    <p className="mt-1 text-xs text-muted-fg leading-tight md:text-sm">
                      {exp.period}
                    </p>
                    <p className="mt-3 text-sm text-muted-fg leading-relaxed md:text-base">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </BentoCard>

            {/* 4) BioShort: colSpan=4, rowSpan=2 (under name, left column) */}
            <BentoCard
              colSpan={{ default: 12, lg: 4 }}
              rowSpan={{ default: 2, lg: 2 }}
              className="flex flex-col justify-start lg:col-start-1 lg:row-start-3 lg:min-h-[336px] lg:max-h-[336px] pt-4! px-6! pb-8! md:px-8! md:pb-8!"
            >
              <p className="text-sm text-muted-fg md:text-base">
                Hey, I'm Danylo Zorkin, a web designer and developer from Portland. I
                build clean, functional websites with a creative twist—always
                focused on great user experiences. I'm also into 3D graphics and
                interactive design, blending tech and creativity to make something
                cool and engaging.
              </p>
            </BentoCard>

            {/* 5) EmailMe: colSpan=3, rowSpan=1 (under portrait, middle column, aligned with bio bottom) - Smart email with Gmail/mailto fallback */}
            <BentoCard
              colSpan={{ default: 12, lg: 3 }}
              rowSpan={{ default: 1, lg: 1 }}
              noPadding
              className="group relative lg:col-start-5 lg:row-start-4 lg:min-h-[160px] lg:max-h-[160px] hover:bg-[#1A1A1A] transition-colors duration-300"
            >
              <a
                href={mailtoHref}
                className="relative block h-full w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-xl"
                aria-label="Write me an email"
                onClick={handleEmailClick}
              >
                <div className="absolute left-3 top-2 text-xs text-muted-fg md:left-4 md:top-3">
                  Wanna get
                  <br />
                  in touch?
                </div>
                <ArrowUpRight className="absolute right-3 top-2 h-4 w-4 text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:right-4 md:top-3 md:h-4 md:w-4" />
                <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4">
                  <MagneticButton strength={8}>
                    <div className="relative">
                      <span className="text-base font-bold uppercase text-fg md:text-lg lg:text-xl">
                        EMAIL ME
                      </span>
                    </div>
                  </MagneticButton>
                </div>
              </a>
            </BentoCard>
          </div>
        </div>
      </section>
    </SectionReveal>
  )
}

