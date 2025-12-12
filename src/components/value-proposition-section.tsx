import { ScrollAnimation } from "@/components/scroll-animation"
import { useTranslation } from 'react-i18next'

export function ValuePropositionSection() {
  const { t } = useTranslation()

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollAnimation direction="fade" delay={100}>
          <div className="text-center">
            {/* Quote */}
            <blockquote className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
              <span className="text-foreground">
                {t('valueProposition.quote')}{" "}
                <span className="bg-gradient-to-r from-red-600 via-primary via-orange-500 to-primary bg-clip-text text-transparent relative inline-block bg-[length:200%_auto] animate-gradient">
                  {t('valueProposition.quoteHighlight')}
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-primary to-orange-500 transform -skew-x-12 animate-pulse opacity-50" />
                </span>{" "}
                {t('valueProposition.quoteEnd')}
              </span>
            </blockquote>

            {/* Supporting text */}
            <ScrollAnimation direction="up" delay={200}>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                {t('valueProposition.supportingText')}
              </p>
            </ScrollAnimation>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}

