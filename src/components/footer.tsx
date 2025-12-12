export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 px-6 border-t border-border/50 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-1">Inventing</h3>
            <p className="text-sm text-muted-foreground">
              Step into 2026 already today
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            © {currentYear} Inventing. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}

