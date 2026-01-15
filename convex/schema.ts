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
    // Lead discovery system fields
    source: v.optional(v.string()), // "inbound" or "scraped"
    jobUrl: v.optional(v.string()),
    analysisStatus: v.optional(v.string()), // "pending", "scored", "failed"
    analysisModel: v.optional(v.string()),
    analysisError: v.optional(v.string()),
    excelHellScore: v.optional(v.number()), // 1-10
    generatedPitch: v.optional(v.string()),
    rawJobDescription: v.optional(v.string()),
    cleanedJobDescription: v.optional(v.string()),
    jobTitle: v.optional(v.string()),
    contactName: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    contactPhone: v.optional(v.string()),
  })
    .index('by_status', ['status'])
    .index('by_source', ['source'])
    .index('by_jobUrl', ['jobUrl'])
    .index('by_source_analysisStatus', ['source', 'analysisStatus']),
  comments: defineTable({
    leadId: v.id('leads'),
    content: v.string(),
    author: v.optional(v.string()), // For future use if multiple users are added
  }).index('by_leadId', ['leadId']),
})
