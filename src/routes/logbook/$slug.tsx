import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { blogPosts } from '@/lib/blog-posts'
import { Footer } from '@/components/footer'

export const Route = createFileRoute('/logbook/$slug')({
  component: BlogPost,
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug)
    if (!post) {
      throw notFound()
    }
    return { post }
  },
})

function BlogPost() {
  const { post } = Route.useLoaderData()
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-background font-sans antialiased flex flex-col">
      <main className="flex-1 container px-4 md:px-6 py-20 max-w-3xl mx-auto">
        <Link
          to="/#logbook"
          className="text-muted-foreground hover:text-primary mb-8 inline-block"
        >
          &larr; {t('logbook.back')}
        </Link>

        <article className="prose prose-zinc dark:prose-invert lg:prose-xl max-w-none">
          <h1 className="text-4xl font-bold tracking-tight mb-4 text-foreground">
            {t(post.titleKey)}
          </h1>
          <div className="flex items-center text-muted-foreground mb-8 text-sm">
            <span>{post.date}</span>
            <span className="mx-2">•</span>
            <span>{post.author}</span>
          </div>

          <div className="whitespace-pre-wrap leading-relaxed text-foreground text-lg">
            {t(post.contentKey)}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}
