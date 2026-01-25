import { createFileRoute } from '@tanstack/react-router'
import { HeroSection } from '@/components/hero-section'
import { PlaygroundGrid } from '@/components/playground-grid'
import { LogbookSection } from '@/components/logbook-section'
import { Footer } from '@/components/footer'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className="min-h-screen bg-background font-sans antialiased">
      <main>
        <HeroSection />
        <PlaygroundGrid />
        <LogbookSection />
      </main>
      <Footer />
    </div>
  )
}
