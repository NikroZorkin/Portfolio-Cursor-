'use client'

import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Copy, Check } from 'lucide-react'
import { BentoCard } from '@/components/bento-card'
import { PdfExport } from '@/components/pdf-export'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact'
import { trackEvent, AnalyticsEvents } from '@/lib/analytics'

// Apple-style smooth easing
const smoothEase = [0.25, 0.4, 0.25, 1]

// Copy button component
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="ml-2 p-1.5 rounded-md text-muted-fg hover:text-fg hover:bg-white/10 transition-all duration-200"
      aria-label={copied ? 'Copied!' : 'Copy to clipboard'}
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </button>
  )
}

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, amount: 0.1, margin: '0px 0px -80px 0px' })
  const prefersReducedMotion = useReducedMotion()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.12,
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to send message')
      }

      setSubmitStatus('success')
      trackEvent(AnalyticsEvents.FORM_SUBMIT, { form: 'contact', status: 'success' })
      reset()
    } catch (error) {
      console.error('Submit error:', error)
      setSubmitStatus('error')
      trackEvent(AnalyticsEvents.FORM_SUBMIT, { form: 'contact', status: 'error' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="min-h-screen px-4 py-24 md:px-8">
      <motion.div 
        ref={containerRef}
        className="mx-auto max-w-7xl"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
      >
        <motion.div className="mb-12" variants={headerVariants}>
          <h2 className="text-3xl font-bold text-fg md:text-5xl">
            Get In Touch
          </h2>
          <p className="mt-4 text-lg text-muted-fg">
            Have a project in mind? Let's work together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Contact Form */}
          <motion.div variants={cardVariants}>
            <BentoCard size="md" className="h-full">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-card-fg"
                  >
                    Name <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    {...register('name')}
                    className="mt-2 w-full rounded-lg border border-border bg-bg px-4 py-2 text-fg placeholder:text-muted-fg focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-card-fg"
                  >
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    {...register('email')}
                    className="mt-2 w-full rounded-lg border border-border bg-bg px-4 py-2 text-fg placeholder:text-muted-fg focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    placeholder="hello@example.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-card-fg"
                  >
                    Message <span className="text-destructive">*</span>
                  </label>
                  <textarea
                    id="message"
                    {...register('message')}
                    rows={5}
                    className="mt-2 w-full rounded-lg border border-border bg-bg px-4 py-2 text-fg placeholder:text-muted-fg focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-destructive">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                {/* Honeypot Field (hidden) */}
                <input
                  type="text"
                  {...register('website')}
                  tabIndex={-1}
                  autoComplete="off"
                  className="absolute left-[-9999px] h-0 w-0 opacity-0"
                  aria-hidden="true"
                />

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <p className="text-sm text-primary">
                    Message sent successfully! I'll get back to you soon.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-sm text-destructive">
                    Failed to send message. Please try again or email me directly.
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-fg transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </BentoCard>
          </motion.div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <motion.div variants={cardVariants}>
              <BentoCard className="group relative flex flex-col hover:bg-[#1A1A1A] transition-colors duration-300">
                <a
                  href="mailto:danilzorkin1402@gmail.com"
                  className="absolute inset-0 z-10"
                  aria-label="Send email"
                />
                <ArrowUpRight className="absolute right-3 top-3 h-4 w-4 text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:right-4 md:top-4" />
                <h3 className="text-lg font-semibold text-card-fg">Email</h3>
                <div className="mt-2 flex items-center">
                  <span className="text-primary">danilzorkin1402@gmail.com</span>
                  <div className="relative z-20">
                    <CopyButton text="danilzorkin1402@gmail.com" />
                  </div>
                </div>
              </BentoCard>
            </motion.div>

            <motion.div variants={cardVariants}>
              <BentoCard className="group relative flex flex-col hover:bg-[#1A1A1A] transition-colors duration-300">
                <a
                  href="https://github.com/NikroZorkin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 z-10"
                  aria-label="Visit GitHub profile"
                />
                <ArrowUpRight className="absolute right-3 top-3 h-4 w-4 text-primary transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 md:right-4 md:top-4" />
                <h3 className="text-lg font-semibold text-card-fg">GitHub</h3>
                <div className="mt-2 flex items-center">
                  <span className="text-primary">@NikroZorkin</span>
                  <div className="relative z-20">
                    <CopyButton text="NikroZorkin" />
                  </div>
                </div>
              </BentoCard>
            </motion.div>

            <motion.div variants={cardVariants}>
              <BentoCard className="flex flex-col">
                <h3 className="text-lg font-semibold text-card-fg">
                  Response Time
                </h3>
                <p className="mt-2 text-muted-fg">
                  Usually within 24 hours
                </p>
              </BentoCard>
            </motion.div>

            {/* PDF Export */}
            <motion.div variants={cardVariants}>
              <PdfExport />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
