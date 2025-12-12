"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ScrollAnimation } from "@/components/scroll-animation"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Field, FieldGroup } from "@/components/ui/field"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoaderIcon, CheckCircleIcon, AlertCircleIcon, MailIcon } from "lucide-react"
import { useTranslation } from 'react-i18next'

type FormState = {
  name: string
  email: string
  company?: string
  phone?: string
  message: string
}

type SubmitState = "idle" | "loading" | "success" | "error"

export function ContactFormSection() {
  const { t } = useTranslation()
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
      setErrorMessage(t('contact.form.errors.nameRequired'))
      return false
    }
    if (!formData.email.trim()) {
      setErrorMessage(t('contact.form.errors.emailRequired'))
      return false
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrorMessage(t('contact.form.errors.emailInvalid'))
      return false
    }
    if (!formData.message.trim()) {
      setErrorMessage(t('contact.form.errors.messageRequired'))
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
        throw new Error(errorData.message || t('contact.form.errors.sendFailed'))
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
        error instanceof Error ? error.message : t('contact.form.errors.sendFailed')
      )
    }
  }

  return (
    <section id="contact" className="py-24 px-6 bg-muted/30">
      <div className="max-w-2xl mx-auto">
        <ScrollAnimation direction="fade">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {t('contact.heading')}
            </h2>
            <p className="text-xl text-muted-foreground">
              {t('contact.description')}
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation direction="up" delay={100}>
          <Card className="glass-strong glass-hover relative overflow-hidden">
            {/* Glass shine effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            
            <CardHeader className="relative z-10">
              <CardTitle className="flex items-center gap-2">
                <div className="glass-primary rounded-lg p-2">
                  <MailIcon className="w-5 h-5 text-primary" />
                </div>
                {t('contact.cardTitle')}
              </CardTitle>
              <CardDescription>
                {t('contact.cardDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10">
            <form onSubmit={handleSubmit}>
              <FieldGroup>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field>
                    <Label htmlFor="name">
                      {t('contact.form.name')} <span className="text-destructive">{t('contact.form.required')}</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      disabled={submitState === "loading"}
                      placeholder={t('contact.form.namePlaceholder')}
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="email">
                      {t('contact.form.email')} <span className="text-destructive">{t('contact.form.required')}</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      disabled={submitState === "loading"}
                      placeholder={t('contact.form.emailPlaceholder')}
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Field>
                    <Label htmlFor="company">{t('contact.form.company')}</Label>
                    <Input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleChange}
                      disabled={submitState === "loading"}
                      placeholder={t('contact.form.companyPlaceholder')}
                    />
                  </Field>

                  <Field>
                    <Label htmlFor="phone">{t('contact.form.phone')}</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={submitState === "loading"}
                      placeholder={t('contact.form.phonePlaceholder')}
                    />
                  </Field>
                </div>

                <Field>
                  <Label htmlFor="message">
                    {t('contact.form.message')} <span className="text-destructive">{t('contact.form.required')}</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    disabled={submitState === "loading"}
                    placeholder={t('contact.form.messagePlaceholder')}
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
                    <span>{t('contact.form.success')}</span>
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
                        {t('contact.form.sending')}
                      </>
                    ) : (
                      t('contact.form.send')
                    )}
                  </Button>
                </Field>
              </FieldGroup>
            </form>
          </CardContent>
        </Card>
        </ScrollAnimation>
      </div>
    </section>
  )
}

