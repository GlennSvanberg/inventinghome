import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

type ContactRequestBody = {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
}

export const Route = createFileRoute('/api/contact')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          // Parse request body
          const body = await request.json() as ContactRequestBody

          // Validate required fields
          if (!body.name || !body.email || !body.message) {
            return json(
              { success: false, message: 'Name, email, and message are required' },
              { status: 400 }
            )
          }

          // Validate email format
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
          if (!emailRegex.test(body.email)) {
            return json(
              { success: false, message: 'Invalid email format' },
              { status: 400 }
            )
          }

          // Get SMTP configuration from environment variables
          const smtpHost = process.env.SMTP_HOST
          const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT) : 587
          const smtpUser = process.env.SMTP_USER
          const smtpPassword = process.env.SMTP_PASSWORD
          const smtpFrom = process.env.SMTP_FROM || smtpUser
          const contactEmail = process.env.CONTACT_EMAIL || smtpUser

          if (!smtpHost || !smtpUser || !smtpPassword) {
            console.error('SMTP configuration is missing')
            return json(
              { success: false, message: 'Email service is not configured' },
              { status: 500 }
            )
          }

          // Import nodemailer dynamically (only on server)
          const nodemailer = await import('nodemailer')

          // Create transporter
          const transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465, // true for 465, false for other ports
            auth: {
              user: smtpUser,
              pass: smtpPassword,
            },
          })

          // Verify connection
          await transporter.verify()

          // Prepare email content
          const emailSubject = `New Contact Form Submission from ${body.name}`
          const emailHtml = `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            ${body.company ? `<p><strong>Company:</strong> ${body.company}</p>` : ''}
            ${body.phone ? `<p><strong>Phone:</strong> ${body.phone}</p>` : ''}
            <p><strong>Message:</strong></p>
            <p>${body.message.replace(/\n/g, '<br>')}</p>
          `

          const emailText = `
New Contact Form Submission

Name: ${body.name}
Email: ${body.email}
${body.company ? `Company: ${body.company}` : ''}
${body.phone ? `Phone: ${body.phone}` : ''}

Message:
${body.message}
          `

          // Send email
          await transporter.sendMail({
            from: smtpFrom,
            to: contactEmail,
            subject: emailSubject,
            text: emailText,
            html: emailHtml,
            replyTo: body.email,
          })

          return json({ success: true, message: 'Message sent successfully' })
        } catch (error) {
          console.error('Error sending email:', error)
          return json(
            {
              success: false,
              message:
                error instanceof Error
                  ? error.message
                  : 'Failed to send message. Please try again later.',
            },
            { status: 500 }
          )
        }
      },
    },
  },
})
