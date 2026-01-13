import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  leads: defineTable({
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    phone: v.optional(v.string()),
    message: v.string(),
    status: v.string(), // e.g., "new", "contacted", "qualified", "closed"
    notes: v.optional(v.string()),
  }).index('by_status', ['status']),
  comments: defineTable({
    leadId: v.id('leads'),
    content: v.string(),
    author: v.optional(v.string()), // For future use if multiple users are added
  }).index('by_leadId', ['leadId']),
})
