"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Field, FieldGroup } from "@/components/ui/field"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoaderIcon, CheckCircleIcon, AlertCircleIcon, MailIcon } from "lucide-react"

type FormState = {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
}

type SubmitState = "idle" | "loading" | "success" | "error"

export function ContactFormSection() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  })
  const [submitState, setSubmitState] = useState<SubmitState>("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setErrorMessage("Name is required")
      return false
    }
    if (!formData.email.trim()) {
      setErrorMessage("Email is required")
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage("Please enter a valid email address")
      return false
    }
    if (!formData.message.trim()) {
      setErrorMessage("Message is required")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage("")

    if (!validateForm()) {
      setSubmitState("error")
      return
    }

    setSubmitState("loading")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || "Failed to send message")
      }

      setSubmitState("success")
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitState("idle")
      }, 5000)
    } catch (error) {
      setSubmitState("error")
      setErrorMessage(
        error instanceof Error ? error.message : "Failed to send message. Please try again."
      )
    }
  }

  return (
    <section id="contact" className="py-24 px-6 bg-muted/30">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Get in touch
          </h2>
          <p className="text-xl text-muted-foreground">
            Ready to step into 2026? Let's talk about your project.
          </p>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MailIcon className="w-5 h-5 text-primary" />
              Contact us
            </CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you as soon as possible.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field>
                    <Label htmlFor="name">
                      Name <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={submitState === "loading"}
                      placeholder="Your name"
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="email">
                      Email <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={submitState === "loading"}
                      placeholder="your.email@example.com"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      disabled={submitState === "loading"}
                      placeholder="Your company"
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={submitState === "loading"}
                      placeholder="+1 (555) 000-0000"
                    />
                  </Field>
                </div>

                <Field>
                  <Label htmlFor="message">
                    Message <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={submitState === "loading"}
                    placeholder="Tell us about your project..."
                    rows={6}
                  />
                </Field>

                {/* Error message */}
                {submitState === "error" && errorMessage && (
                  <div className="flex items-center gap-2 text-destructive text-sm p-3 bg-destructive/10 rounded-lg border border-destructive/20">
                    <AlertCircleIcon className="w-4 h-4" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Success message */}
                {submitState === "success" && (
                  <div className="flex items-center gap-2 text-primary text-sm p-3 bg-primary/10 rounded-lg border border-primary/20">
                    <CheckCircleIcon className="w-4 h-4" />
                    <span>Message sent successfully! We'll get back to you soon.</span>
                  </div>
                )}

                <Field orientation="horizontal" className="justify-end">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={submitState === "loading"}
                    className="min-w-32"
                  >
                    {submitState === "loading" ? (
                      <>
                        <LoaderIcon className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send message"
                    )}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

