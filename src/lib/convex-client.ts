import { ConvexReactClient } from 'convex/react'

const convexUrl = import.meta.env.VITE_CONVEX_URL as string

if (!convexUrl) {
  console.warn(
    "VITE_CONVEX_URL is not set. Convex will not work until you run 'npx convex dev' or set the environment variable.",
  )
}

export const convex = new ConvexReactClient(
  convexUrl || 'https://placeholder-url.convex.cloud',
)
