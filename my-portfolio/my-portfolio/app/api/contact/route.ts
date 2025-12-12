import { NextResponse } from 'next/server'
import { contactFormSchema } from '@/lib/validations/contact'
import { rateLimit, getClientIdentifier } from '@/lib/rate-limit'
import { sendDiscordNotification } from '@/lib/discord'

export async function POST(request: Request) {
  try {
    // 1. Rate limiting (DEV ONLY - in-memory)
    const identifier = getClientIdentifier(request)
    const rateLimitResult = rateLimit(identifier, 5, 10 * 60 * 1000) // 5 req per 10 min

    if (!rateLimitResult.success) {
      const retryAfter = Math.ceil((rateLimitResult.reset - Date.now()) / 1000)
      return NextResponse.json(
        {
          error: 'Too many requests. Please try again later.',
          retryAfter,
        },
        {
          status: 429,
          headers: {
            'Retry-After': retryAfter.toString(),
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimitResult.reset.toString(),
          },
        }
      )
    }

    // 2. Parse and validate request body
    const body = await request.json()
    const result = contactFormSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Invalid form data', details: result.error.issues },
        { status: 400 }
      )
    }

    const { name, email, message, website } = result.data

    // 3. Honeypot check
    if (website && website.length > 0) {
      console.warn('[Honeypot] Bot detected, honeypot filled:', { identifier, website })
      // Silently reject (pretend success to confuse bots)
      return NextResponse.json({ success: true })
    }

    // 4. Send Discord notification
    console.log('[Contact Form] Valid submission:', {
      name,
      email,
      message: message.substring(0, 50) + '...',
    })

    const discordSent = await sendDiscordNotification({ name, email, message })
    
    if (!discordSent) {
      console.error('[Contact Form] Failed to send Discord notification')
      // Still return success to user, but log the error
    }

    return NextResponse.json(
      { success: true },
      {
        headers: {
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.reset.toString(),
        },
      }
    )
  } catch (error) {
    console.error('[Contact Form] Error:', error)
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    )
  }
}

