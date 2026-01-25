import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
  const { t } = useTranslation()

  const scrollToPlayground = () => {
    const element = document.getElementById('playground')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative pt-20 pb-32 overflow-hidden">
      <div className="container px-4 md:px-6 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80 mb-6">
            {t('hero.greeting')}
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-6">
            {t('hero.headline')}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            {t('hero.subheadline')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={scrollToPlayground} className="gap-2">
              {t('hero.cta')}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -z-10 opacity-10 translate-x-1/3 -translate-y-1/4">
        <svg width="800" height="800" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.1,-19.2,95.8,-5.3C93.5,8.6,82.2,21.5,70.6,32.2C59,42.9,47.1,51.4,34.8,58.3C22.5,65.2,9.8,70.5,-3.1,75.8C-16,81.1,-29.1,86.4,-40.8,80.7C-52.5,75,-62.8,58.3,-70.6,42.3C-78.4,26.3,-83.7,11,-81.9,-3.1C-80.1,-17.2,-71.2,-30.1,-60.8,-40.8C-50.4,-51.5,-38.5,-60,-26.1,-68.6C-13.7,-77.2,-0.8,-85.9,13.2,-88.2C27.2,-90.5,54.4,-86.4,44.7,-76.4Z" transform="translate(100 100)" />
        </svg>
      </div>
    </section>
  )
}
