'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { BentoCard } from '@/components/bento-card'
import { SectionReveal } from '@/components/animations/section-reveal'
import { contactFormSchema, type ContactFormData } from '@/lib/validations/contact'
import { trackEvent, AnalyticsEvents } from '@/lib/analytics'

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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
    <SectionReveal>
      <section id="contact" className="min-h-screen px-4 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-fg md:text-5xl">
              Get In Touch
            </h2>
            <p className="mt-4 text-lg text-muted-fg">
              Have a project in mind? Let's work together.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Contact Form */}
            <BentoCard size="md">
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

                {/* Budget Field (Optional) */}
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-card-fg"
                  >
                    Budget (optional)
                  </label>
                  <select
                    id="budget"
                    {...register('budget')}
                    className="mt-2 w-full rounded-lg border border-border bg-bg px-4 py-2 text-fg focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  >
                    <option value="">Select a range</option>
                    <option value="< $5k">&lt; $5k</option>
                    <option value="$5k - $10k">$5k - $10k</option>
                    <option value="$10k - $20k">$10k - $20k</option>
                    <option value="> $20k">&gt; $20k</option>
                  </select>
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

            {/* Contact Info */}
            <div className="flex flex-col gap-6">
              <BentoCard className="flex flex-col">
                <h3 className="text-lg font-semibold text-card-fg">Email</h3>
                <a
                  href="mailto:danilzorkin1402@gmail.com"
                  className="mt-2 text-primary hover:underline"
                >
                  danilzorkin1402@gmail.com
                </a>
              </BentoCard>

              <BentoCard className="flex flex-col">
                <h3 className="text-lg font-semibold text-card-fg">Telegram</h3>
                <a
                  href="https://t.me/danylo_zorkin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-primary hover:underline"
                >
                  @danylo_zorkin
                </a>
              </BentoCard>

              <BentoCard className="flex flex-col">
                <h3 className="text-lg font-semibold text-card-fg">
                  Response Time
                </h3>
                <p className="mt-2 text-muted-fg">
                  Usually within 24 hours
                </p>
              </BentoCard>
            </div>
          </div>
        </div>
      </section>
    </SectionReveal>
  )
}

