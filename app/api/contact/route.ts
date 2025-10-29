import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema } from '@/lib/validations';
import { z } from 'zod';

// Rate limiting storage (in-memory for demo, use Redis in production)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Rate limit configuration
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 5;

/**
 * Check if request should be rate limited
 */
function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  if (!record || now > record.resetTime) {
    // New window or expired window
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    // Rate limit exceeded
    return false;
  }

  // Increment count
  record.count++;
  return true;
}

/**
 * Clean up expired rate limit records
 */
function cleanupRateLimitMap() {
  const now = Date.now();
  const entries = Array.from(rateLimitMap.entries());
  for (const [key, record] of entries) {
    if (now > record.resetTime) {
      rateLimitMap.delete(key);
    }
  }
}

// Periodic cleanup (every 5 minutes)
setInterval(cleanupRateLimitMap, 5 * 60 * 1000);

/**
 * POST /api/contact
 * Handle contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const clientIp = request.headers.get('x-forwarded-for') ||
                     request.headers.get('x-real-ip') ||
                     'unknown';

    // Check rate limit
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
        },
        { status: 429 }
      );
    }

    // Parse request body
    let body;
    try {
      body = await request.json();
    } catch (error) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid request body',
        },
        { status: 400 }
      );
    }

    // Trim whitespace from string fields
    const trimmedBody = {
      ...body,
      name: body.name?.trim(),
      email: body.email?.trim(),
      subject: body.subject?.trim(),
      message: body.message?.trim(),
    };

    // Validate with Zod schema
    const validation = contactFormSchema.safeParse(trimmedBody);

    if (!validation.success) {
      const errors = validation.error.errors.map(err => `${err.path.join('.')}: ${err.message}`);
      return NextResponse.json(
        {
          success: false,
          error: errors.join(', '),
        },
        { status: 400 }
      );
    }

    const data = validation.data;

    // Log the contact form submission (in production, send email or store in database)
    console.log('Contact form submission:', {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      locale: data.locale,
      timestamp: new Date().toISOString(),
      ip: clientIp,
    });

    // TODO: Integrate with email service (e.g., Resend, SendGrid, or AWS SES)
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'contact@cyborg-vpn.com',
    //   to: 'support@cyborg-vpn.com',
    //   subject: `New contact: ${data.subject}`,
    //   html: `
    //     <h2>New Contact Form Submission</h2>
    //     <p><strong>Name:</strong> ${data.name}</p>
    //     <p><strong>Email:</strong> ${data.email}</p>
    //     <p><strong>Subject:</strong> ${data.subject}</p>
    //     <p><strong>Message:</strong></p>
    //     <p>${data.message}</p>
    //     <p><strong>Locale:</strong> ${data.locale}</p>
    //   `,
    // });

    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: 'Your message has been sent successfully. We will get back to you soon.',
      },
      { status: 200 }
    );

  } catch (error) {
    // Log error for debugging
    console.error('Contact form API error:', error);

    // Return generic error response
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred. Please try again later.',
      },
      { status: 500 }
    );
  }
}
