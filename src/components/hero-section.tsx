import { Button } from "@/components/ui/button"
import { ArrowRightIcon } from "lucide-react"
import { useTranslation } from 'react-i18next'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-primary/5" />
      
      {/* Animated geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
        {/* Brand name */}
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-red-600 via-primary via-orange-500 to-primary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
            {t('hero.title')}
          </span>
        </h1>

        {/* Tagline */}
        <p className="text-xl md:text-2xl lg:text-3xl text-foreground/90 mb-8 font-medium max-w-3xl mx-auto leading-relaxed">
          {t('hero.tagline')}{" "}
          <span className="bg-gradient-to-r from-red-600 via-primary to-orange-500 bg-clip-text text-transparent font-semibold bg-[length:200%_auto] animate-gradient">
            {t('hero.taglineHighlight')}
          </span>
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            className="text-lg px-8 py-6 h-auto group"
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

