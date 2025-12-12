import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "@/components/hero-section";
import { ServicesSection } from "@/components/services-section";
import { ValuePropositionSection } from "@/components/value-proposition-section";
import { ContactFormSection } from "@/components/contact-form-section";
import { Footer } from "@/components/footer";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <ValuePropositionSection />
      <ContactFormSection />
      <Footer />
    </main>
  );
}