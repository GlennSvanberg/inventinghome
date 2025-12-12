import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollAnimation } from "@/components/scroll-animation"
import { 
  GlobeIcon, 
  SparklesIcon, 
  BotIcon, 
  ZapIcon 
} from "lucide-react"

const services = [
  {
    icon: GlobeIcon,
    title: "Build a website",
    description: "Modern, responsive websites that convert visitors into customers. Built with cutting-edge technology.",
  },
  {
    icon: SparklesIcon,
    title: "Custom transformation",
    description: "Transform your business processes with custom software solutions tailored to your needs.",
  },
  {
    icon: BotIcon,
    title: "Company chatbot",
    description: "Intelligent chatbots that handle customer inquiries 24/7, freeing your team for what matters.",
  },
  {
    icon: ZapIcon,
    title: "Removing admin tasks",
    description: "Automate repetitive tasks and workflows. Focus on growth while we handle the admin.",
  },
]

export function ServicesSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <ScrollAnimation direction="fade">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              What we do
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive solutions to help your business thrive in the digital age
            </p>
          </div>
        </ScrollAnimation>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <ScrollAnimation
                key={service.title}
                direction="up"
                delay={index * 100}
              >
                <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 hover:border-primary/30 hover:scale-[1.02]">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6 text-primary group-hover:rotate-12 transition-transform duration-300" />
                    </div>
                    <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </ScrollAnimation>
            )
          })}
        </div>
      </div>
    </section>
  )
}

