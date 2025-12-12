import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What we do
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Comprehensive solutions to help your business thrive in the digital age
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Card
                key={service.title}
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-border/50 hover:border-primary/30"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
                }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}

