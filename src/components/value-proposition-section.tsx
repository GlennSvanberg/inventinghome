export function ValuePropositionSection() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10" />
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center">
          {/* Quote */}
          <blockquote className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 leading-tight">
            <span className="text-foreground">
              We are there to help for{" "}
              <span className="text-primary relative inline-block">
                half or less
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/30 transform -skew-x-12" />
              </span>{" "}
              that you would think.
            </span>
          </blockquote>

          {/* Supporting text */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Quality development services at a fraction of traditional agency costs. 
            We believe great technology should be accessible to every business.
          </p>
        </div>
      </div>
    </section>
  )
}

