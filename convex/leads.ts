import { v } from 'convex/values'
import { internalMutation, internalQuery, mutation, query } from './_generated/server'

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query('leads').order('desc').collect()
  },
})

export const addLead = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    phone: v.optional(v.string()),
    message: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert('leads', {
      ...args,
      status: 'new',
    })
  },
})

export const updateLead = mutation({
  args: {
    id: v.id('leads'),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    company: v.optional(v.string()),
    phone: v.optional(v.string()),
    message: v.optional(v.string()),
    status: v.optional(v.string()),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...fields } = args
    await ctx.db.patch(id, fields)
  },
})

export const deleteLead = mutation({
  args: { id: v.id('leads') },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id)
  },
})

// Internal mutation for saving scraped leads (called from actions)
export const saveScrapedLead = internalMutation({
  args: {
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    phone: v.optional(v.string()),
    message: v.string(), // Pain point analysis from AI
    source: v.string(),
    jobUrl: v.optional(v.string()),
    excelHellScore: v.optional(v.number()),
    generatedPitch: v.optional(v.string()),
    rawJobDescription: v.string(), // Will be saved as a comment
  },
  handler: async (ctx, args) => {
    if (args.jobUrl) {
      const existingLead = await ctx.db
        .query('leads')
        .withIndex('by_jobUrl', (q) => q.eq('jobUrl', args.jobUrl))
        .first()
      if (existingLead) {
        return existingLead._id
      }
    }

    // Insert the lead
    const leadId = await ctx.db.insert('leads', {
      name: args.name,
      email: args.email,
      company: args.company,
      phone: args.phone,
      message: args.message,
      status: 'new',
      source: args.source,
      jobUrl: args.jobUrl,
      analysisStatus: 'pending',
      excelHellScore: args.excelHellScore,
      generatedPitch: args.generatedPitch,
      rawJobDescription: args.rawJobDescription,
    })

    // Save the raw job description as the first comment
    await ctx.db.insert('comments', {
      leadId,
      content: args.rawJobDescription,
      author: 'System',
    })

    return leadId
  },
})

export const getByJobUrl = query({
  args: {
    jobUrl: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('leads')
      .withIndex('by_jobUrl', (q) => q.eq('jobUrl', args.jobUrl))
      .first()
  },
})

export const listPendingScrapedLeads = internalQuery({
  args: {
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    const leads = await ctx.db
      .query('leads')
      .withIndex('by_source_analysisStatus', (q) =>
        q.eq('source', 'scraped').eq('analysisStatus', 'pending')
      )
      .take(args.limit)

    return leads
  },
})

export const listScrapedLeadsForBackfill = internalQuery({
  args: {
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('leads')
      .withIndex('by_source', (q) => q.eq('source', 'scraped'))
      .take(args.limit)
  },
})

export const updateScrapedLeadAnalysis = internalMutation({
  args: {
    leadId: v.id('leads'),
    company: v.optional(v.string()),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    analysisStatus: v.string(),
    analysisModel: v.optional(v.string()),
    analysisError: v.optional(v.string()),
    jobTitle: v.optional(v.string()),
    contactName: v.optional(v.string()),
    contactEmail: v.optional(v.string()),
    contactPhone: v.optional(v.string()),
    cleanedJobDescription: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { leadId, ...updates } = args
    await ctx.db.patch(leadId, updates)
  },
})
