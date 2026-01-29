import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { blogPosts } from '@/lib/blog-posts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function LogbookSection() {
  const { t } = useTranslation()

  return (
    <section id="logbook" className="py-20">
      <div className="container px-4 md:px-6">
        <div className="max-w-2xl mb-12">
          <h2 className="text-3xl font-bold tracking-tight mb-4">{t('logbook.title')}</h2>
          <p className="text-muted-foreground text-lg">{t('logbook.description')}</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.length > 0 ? (
            blogPosts.map((post) => (
              <Link
                key={post.slug}
                to={`/logbook/${post.slug}`}
                className="block h-full decoration-0"
              >
                <Card className="h-full hover:bg-muted/50 transition-colors cursor-pointer">
                  <CardHeader>
                    <CardTitle>{t(post.titleKey)}</CardTitle>
                    <CardDescription>{post.date}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">
                      {t(post.excerptKey)}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="border border-dashed border-border rounded-lg p-12 text-center bg-muted/10 col-span-full">
              <p className="text-muted-foreground italic">{t('logbook.empty')}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
