import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"
import { useTranslation } from 'react-i18next'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />
      
      {/* Static geometric shapes - no animations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Floating glass panel */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[5]">
        <div className="glass-strong rounded-3xl p-12 max-w-4xl mx-6 transform rotate-[-2deg] opacity-30 blur-sm" />
        <div className="glass-strong rounded-3xl p-12 max-w-4xl mx-6 transform rotate-[1deg] opacity-20 blur-md" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        {/* Glass card for main content */}
        <div className="glass-strong rounded-3xl p-8 md:p-12 mb-8">
          {/* Brand name */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl mb-6 tracking-tight">
            <span className="font-futuristic font-black bg-gradient-to-r from-red-600 via-primary to-orange-500 bg-clip-text text-transparent">
              {t('hero.title')}
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl lg:text-3xl text-foreground/90 mb-8 font-medium max-w-3xl mx-auto leading-relaxed">
            {t('hero.tagline')}{" "}
            <span className="bg-gradient-to-r from-red-600 via-primary to-orange-500 bg-clip-text text-transparent font-semibold">
              {t('hero.taglineHighlight')}
            </span>
          </p>
        </div>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="text-lg px-8 py-6 h-auto group glass-button glass-button-hover !bg-transparent"
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {t('hero.cta')}
            <ArrowRightIcon className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}

