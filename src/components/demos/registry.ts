import { LogisticsPro } from './LogisticsPro'
import type { ComponentType } from 'react'

export type DemoRegistryEntry = {
  slug: string
  title: string
  description: string
  Component: ComponentType
}

export const demoRegistry = {
  logistics: {
    slug: 'logistics',
    title: 'LogisticsPro',
    description: 'High-end dispatch & finance dashboard for fleets stuck in Excel.',
    Component: LogisticsPro,
  },
} satisfies Record<string, DemoRegistryEntry>

export type DemoSlug = keyof typeof demoRegistry

export function getDemoBySlug(slug: string): DemoRegistryEntry | undefined {
  return (demoRegistry as Record<string, DemoRegistryEntry | undefined>)[slug]
}

export function getAllDemos(): Array<DemoRegistryEntry> {
  return Object.values(demoRegistry)
}

