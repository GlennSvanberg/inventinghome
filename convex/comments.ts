import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const list = query({
    args: { leadId: v.id('leads') },
    handler: async (ctx, args) => {
        return await ctx.db
            .query('comments')
            .withIndex('by_leadId', (q) => q.eq('leadId', args.leadId))
            .order('desc')
            .collect()
    },
})

export const add = mutation({
    args: {
        leadId: v.id('leads'),
        content: v.string(),
        author: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert('comments', {
            ...args,
            author: args.author ?? 'Admin',
        })
    },
})

export const update = mutation({
    args: {
        id: v.id('comments'),
        content: v.string(),
    },
    handler: async (ctx, args) => {
        const { id, content } = args
        await ctx.db.patch(id, { content })
    },
})

export const remove = mutation({
    args: { id: v.id('comments') },
    handler: async (ctx, args) => {
        await ctx.db.delete(args.id)
    },
})
