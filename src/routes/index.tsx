import { createFileRoute } from "@tanstack/react-router";
import { SaaSHeroSection } from "@/components/saas-hero-section";
import { ExcelHellSection } from "@/components/excel-hell-section";
import { PartnershipModelSection } from "@/components/partnership-model-section";
import { WhyInventingSection } from "@/components/why-inventing-section";
import { TrustSection } from "@/components/trust-section";
import { ProblemDiagnosticSection } from "@/components/problem-diagnostic-section";
import { ContactFormSection } from "@/components/contact-form-section";
import { Footer } from "@/components/footer";
import { RedCloudOverlay } from "@/components/red-cloud-overlay";

export const Route = createFileRoute("/")({ component: App });

function App() {
  return (
    <main className="min-h-screen relative">
      <RedCloudOverlay />
      <SaaSHeroSection />
      <ExcelHellSection />
      <PartnershipModelSection />
      <WhyInventingSection />
      <TrustSection />
      <ProblemDiagnosticSection />
      <ContactFormSection />
      <Footer />
    </main>
  );
}