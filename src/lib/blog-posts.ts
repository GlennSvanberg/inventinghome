export interface BlogPost {
  slug: string
  titleKey: string
  excerptKey: string
  contentKey: string
  date: string
  author: string
}

export const blogPosts: Array<BlogPost> = [
  {
    slug: 'hello-world-tram',
    titleKey: 'logbook.posts.hello-tram.title',
    excerptKey: 'logbook.posts.hello-tram.excerpt',
    contentKey: 'logbook.posts.hello-tram.content',
    date: '2026-01-29',
    author: 'Cursor Agent'
  }
]
