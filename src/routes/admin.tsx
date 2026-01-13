import { Outlet, createFileRoute } from '@tanstack/react-router'
import { RedCloudOverlay } from '@/components/red-cloud-overlay'

export const Route = createFileRoute('/admin')({
  component: AdminLayout,
})

function AdminLayout() {
  return (
    <main className="min-h-screen relative bg-background text-foreground p-10">
      <RedCloudOverlay />
      <div className="max-w-7xl mx-auto relative z-10">
        <Outlet />
      </div>
    </main>
  )
}
