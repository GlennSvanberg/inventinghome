import { ScrollAnimation } from "@/components/scroll-animation"
import { useTranslation } from 'react-i18next'

export function ValuePropositionSection() {
  const { t } = useTranslation()

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
      
      {/* Decorative elements - static */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <ScrollAnimation direction="fade" delay={100}>
          <div className="text-center">
            {/* Glass card for quote */}
            <div className="glass-strong rounded-3xl p-8 md:p-12 mb-8 glass-hover">
              {/* Quote */}
              <blockquote className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
                <span className="text-foreground">
                  {t('valueProposition.quote')}{" "}
                  <span className="bg-gradient-to-r from-red-600 via-primary to-orange-500 bg-clip-text text-transparent">
                    {t('valueProposition.quoteHighlight')}
                  </span>{" "}
                  {t('valueProposition.quoteEnd')}
                </span>
              </blockquote>
            </div>

            {/* Supporting text */}
            <ScrollAnimation direction="up" delay={200}>
              <div className="glass rounded-2xl p-6 inline-block">
                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                  {t('valueProposition.supportingText')}
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}

