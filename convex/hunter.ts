"use node"

import { action } from './_generated/server'
import { api, internal } from './_generated/api'
import { v } from 'convex/values'
import FirecrawlApp from '@mendable/firecrawl-js'
import OpenAI from 'openai'
import type { Id } from './_generated/dataModel'

// Initialize clients
const getFirecrawlClient = () => {
  const apiKey = process.env.FIRECRAWL_API_KEY
  if (!apiKey) {
    throw new Error('FIRECRAWL_API_KEY environment variable is not set')
  }
  return new FirecrawlApp({ apiKey })
}

const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is not set')
  }
  return new OpenAI({ apiKey })
}

async function extractLeadDetails(
  openai: OpenAI,
  jobDescription: string,
  jobUrl: string
) {
  const systemPrompt = `You extract structured data from Swedish job ads.

Return JSON with:
{
  "company": "<company or employer name if present, else empty string>",
  "jobTitle": "<job title if present, else empty string>",
  "contactName": "<named contact person if present, else empty string>",
  "contactEmail": "<email address if present, else empty string>",
  "contactPhone": "<phone number if present, else empty string>",
  "cleanedJobDescription": "<job ad cleaned of cookie banners, navigation, or boilerplate>"
}

Rules:
- Use only the text provided.
- If unsure, return empty string for that field.
- Prefer real contact details from the ad over placeholders.
- cleanedJobDescription should remove cookie notices, navigation, and repeated footer text.
- Keep cleanedJobDescription in Swedish if the source is Swedish.`

  const userPrompt = `Job URL: ${jobUrl}

Job Description:
${jobDescription}

Extract the fields and return JSON only.`

  const response = await openai.chat.completions.create({
    model: 'gpt-4.1-mini',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    response_format: {
      type: 'json_schema',
      json_schema: {
        name: 'lead_extraction',
        schema: {
          type: 'object',
          additionalProperties: false,
          properties: {
            company: { type: 'string' },
            jobTitle: { type: 'string' },
            contactName: { type: 'string' },
            contactEmail: { type: 'string' },
            contactPhone: { type: 'string' },
            cleanedJobDescription: { type: 'string' },
          },
          required: [
            'company',
            'jobTitle',
            'contactName',
            'contactEmail',
            'contactPhone',
            'cleanedJobDescription',
          ],
        },
      },
    },
    temperature: 0.2,
  })

  const content = response.choices[0]?.message?.content
  if (!content) {
    throw new Error('OpenAI returned empty response')
  }

  return JSON.parse(content) as {
    company: string
    jobTitle: string
    contactName: string
    contactEmail: string
    contactPhone: string
    cleanedJobDescription: string
  }
}

/**
 * Scrapes a job board URL and extracts job listings
 * Note: This is a simplified version. You may need to adjust based on the actual structure of job board pages.
 */
async function scrapeJobBoard(firecrawl: FirecrawlApp, url: string) {
  try {
    const result = await firecrawl.scrape(url, {
      formats: ['markdown', 'html'],
    })

    return {
      markdown: result.markdown || '',
      html: result.html || '',
      url: url, // Use the input URL since result may not have url property
    }
  } catch (error) {
    console.error(`Error scraping ${url}:`, error)
    throw error
  }
}

/**
 * Extracts individual job URLs from a Platsbanken search results page
 */
function extractJobUrlsFromSearchResults(html: string, baseUrl: string): string[] {
  const jobUrls: string[] = []
  
  // Multiple patterns to try - Platsbanken might use different URL structures
  const patterns = [
    // Pattern 1: /platsbanken/annonser/[job-id]
    /href=["']([^"']*\/platsbanken\/annonser\/[^"']+)["']/gi,
    // Pattern 2: Full URLs with arbetsformedlingen.se
    /href=["'](https?:\/\/[^"']*arbetsformedlingen\.se[^"']*\/platsbanken\/annonser[^"']+)["']/gi,
    // Pattern 3: Data attributes or other link formats
    /(?:href|data-url|data-href)=["']([^"']*\/annonser\/[^"']+)["']/gi,
    // Pattern 4: Look for job IDs in the URL structure
    /\/annonser\/([a-zA-Z0-9_-]+)/gi,
  ]
  
  for (const pattern of patterns) {
    let match
    while ((match = pattern.exec(html)) !== null) {
      let jobUrl = match[1] || match[0]
      
      // Skip if it's the search page itself
      if (jobUrl.includes('annonser?q=') || jobUrl.includes('annonser?')) {
        continue
      }
      
      // Convert relative URLs to absolute
      if (jobUrl.startsWith('/')) {
        jobUrl = `https://arbetsformedlingen.se${jobUrl}`
      } else if (!jobUrl.startsWith('http')) {
        // If it's just a path like "annonser/123", construct full URL
        if (jobUrl.includes('annonser/')) {
          jobUrl = `https://arbetsformedlingen.se/platsbanken/${jobUrl}`
        } else {
          jobUrl = `https://arbetsformedlingen.se/platsbanken/annonser/${jobUrl}`
        }
      }
      
      // Remove query parameters and fragments to get clean job URLs
      jobUrl = jobUrl.split('?')[0].split('#')[0]
      
      // Ensure it's a valid job URL (contains /annonser/ and not the search page)
      if (jobUrl && jobUrl.includes('/annonser/') && !jobUrl.includes('annonser?') && !jobUrls.includes(jobUrl)) {
        jobUrls.push(jobUrl)
      }
    }
  }
  
  // Remove duplicates and return
  return [...new Set(jobUrls)]
}

/**
 * Checks if a URL is a search results page (vs a single job posting)
 */
function isSearchResultsPage(url: string): boolean {
  // Platsbanken search results contain "annonser?" with query parameters
  return url.includes('/annonser?') || url.includes('/annonser?q=')
}

/**
 * Main discovery action - can be triggered manually or via cron
 * 
 * Usage examples:
 * - npx convex run hunter:discover '{"url": "https://platsbanken.arbetsformedlingen.se/..."}'
 * - npx convex run hunter:discover '{}' (for batch mode - requires jobBoardUrls to be configured)
 */
export const discover = action({
  args: {
    url: v.optional(v.string()), // Optional: single URL to scrape and analyze
  },
  handler: async (ctx, args) => {
    const firecrawl = getFirecrawlClient()

    // Job board URLs to scrape (you'll need to provide actual search URLs)
    // For now, this is a placeholder structure - you'll need to construct
    // actual search URLs for Platsbanken, Indeed, LinkedIn Jobs
    const jobBoardUrls: string[] = []
    // Example: jobBoardUrls.push('https://platsbanken.arbetsformedlingen.se/se/jobb/...')

    console.log('Starting lead discovery (scrape-only)...')

    const discoveredLeads: Array<{
      company: string
      jobTitle: string
      jobUrl: string
      jobDescription: string
    }> = []

    // For exploratory testing, you can pass a single URL via args
    // This allows you to test with one job posting at a time, or a search results page
    console.log('Args received:', JSON.stringify(args))
    
    // Default test URL if none provided (for easier testing)
    const testUrl = 'https://arbetsformedlingen.se/platsbanken/annonser?q=excel&l=3:PVZL_BQT_XtL'
    const url = args.url || testUrl
    
    if (url) {
      console.log(`Processing URL: ${url}`)
      
      // Check if this is a search results page
      const isSearchPage = isSearchResultsPage(url)
      console.log(`Is search results page: ${isSearchPage}`)
      
      if (isSearchPage) {
        console.log(`Detected search results page: ${url}`)
        console.log('Scraping search results to extract individual job URLs...')
        
        const searchResults = await scrapeJobBoard(firecrawl, url)
        console.log(`Scraped page - Markdown length: ${searchResults.markdown.length}, HTML length: ${searchResults.html.length}`)
        
        const jobUrls = extractJobUrlsFromSearchResults(searchResults.html, url)
        console.log(`Found ${jobUrls.length} job postings to analyze`)
        
        if (jobUrls.length === 0) {
          console.log('WARNING: No job URLs extracted. Trying markdown extraction...')
          // Try extracting from markdown as well
          const markdownUrls = extractJobUrlsFromSearchResults(searchResults.markdown, url)
          console.log(`Found ${markdownUrls.length} URLs from markdown`)
          if (markdownUrls.length > 0) {
            jobUrls.push(...markdownUrls)
          }
          
          // If still no URLs, log a sample of the HTML for debugging
          if (jobUrls.length === 0) {
            console.log('HTML sample (first 2000 chars):', searchResults.html.substring(0, 2000))
            console.log('Markdown sample (first 1000 chars):', searchResults.markdown.substring(0, 1000))
            
            // Try to find any links at all
            const anyLinks = searchResults.html.match(/href=["']([^"']+)["']/gi)
            console.log(`Found ${anyLinks?.length || 0} total links in HTML`)
            if (anyLinks && anyLinks.length > 0) {
              console.log('Sample links:', anyLinks.slice(0, 10))
            }
          }
        } else {
          console.log('Sample job URLs found:', jobUrls.slice(0, 3))
        }
        
        if (jobUrls.length === 0) {
          return {
            success: true,
            leadsFound: 0,
            leadsSaved: 0,
            leads: [],
            error: 'No job URLs could be extracted from the search results page. The page structure may have changed.',
            debug: {
              htmlLength: searchResults.html.length,
              markdownLength: searchResults.markdown.length,
              htmlSample: searchResults.html.substring(0, 1000),
            },
          }
        }
        
        // Process each job URL
        for (let i = 0; i < jobUrls.length; i++) {
          const jobUrl = jobUrls[i]
          console.log(`Processing job ${i + 1}/${jobUrls.length}: ${jobUrl}`)
          
          try {
            const existingLead = await ctx.runQuery(api.leads.getByJobUrl, {
              jobUrl,
            })
            if (existingLead) {
              console.log(`Skipping already-scraped job URL: ${jobUrl}`)
              continue
            }

            const jobContent = await scrapeJobBoard(firecrawl, jobUrl)
            const jobDescription = jobContent.markdown

            // Try to extract company and title from the content
            const companyMatch = jobDescription.match(/företag[:\s]+([^\n]+)/i) || 
                                jobDescription.match(/company[:\s]+([^\n]+)/i) ||
                                jobDescription.match(/arbetsgivare[:\s]+([^\n]+)/i)
            const company = companyMatch ? companyMatch[1].trim() : 'Unknown Company'

            const titleMatch = jobDescription.match(/titel[:\s]+([^\n]+)/i) ||
                              jobDescription.match(/position[:\s]+([^\n]+)/i) ||
                              jobDescription.match(/jobb[:\s]+([^\n]+)/i) ||
                              jobDescription.match(/^#\s+(.+)$/m) // Markdown H1 title
            const jobTitle = titleMatch ? titleMatch[1].trim() : 'Administrative Role'

            discoveredLeads.push({
              company,
              jobTitle,
              jobUrl,
              jobDescription,
            })

            // Rate limiting - be respectful to APIs
            if (i < jobUrls.length - 1) {
              await new Promise((resolve) => setTimeout(resolve, 2000))
            }
          } catch (error) {
            console.error(`Error processing job ${jobUrl}:`, error)
            continue
          }
        }
      } else {
        // Single job posting URL
        console.log(`Scraping single job URL: ${url}`)
        const existingLead = await ctx.runQuery(api.leads.getByJobUrl, {
          jobUrl: url,
        })
        if (existingLead) {
          console.log(`Skipping already-scraped job URL: ${url}`)
          return {
            success: true,
            leadsFound: 0,
            leadsSaved: 0,
            leads: [],
            skipped: 1,
          }
        }

        const jobContent = await scrapeJobBoard(firecrawl, url)
        const jobDescription = jobContent.markdown

        // Try to extract company and title from the content
        const companyMatch = jobDescription.match(/företag[:\s]+([^\n]+)/i) || 
                            jobDescription.match(/company[:\s]+([^\n]+)/i) ||
                            jobDescription.match(/arbetsgivare[:\s]+([^\n]+)/i)
        const company = companyMatch ? companyMatch[1].trim() : 'Unknown Company'

        const titleMatch = jobDescription.match(/titel[:\s]+([^\n]+)/i) ||
                          jobDescription.match(/position[:\s]+([^\n]+)/i) ||
                          jobDescription.match(/jobb[:\s]+([^\n]+)/i) ||
                          jobDescription.match(/^#\s+(.+)$/m) // Markdown H1 title
        const jobTitle = titleMatch ? titleMatch[1].trim() : 'Administrative Role'

        discoveredLeads.push({
          company,
          jobTitle,
          jobUrl: url,
          jobDescription,
        })
      }
    } else {
      // Batch processing mode - iterate through job board URLs
      for (const url of jobBoardUrls) {
        try {
          console.log(`Processing: ${url}`)
          const existingLead = await ctx.runQuery(api.leads.getByJobUrl, {
            jobUrl: url,
          })
          if (existingLead) {
            console.log(`Skipping already-scraped job URL: ${url}`)
            continue
          }
          const jobContent = await scrapeJobBoard(firecrawl, url)

          // Parse job details (simplified - implement proper parsing)
          const jobDescription = jobContent.markdown
          const company = 'Extracted Company' // Implement extraction
          const jobTitle = 'Extracted Title' // Implement extraction

          discoveredLeads.push({
            company,
            jobTitle,
            jobUrl: url,
            jobDescription,
          })

          // Rate limiting - be respectful to APIs
          await new Promise((resolve) => setTimeout(resolve, 2000))
        } catch (error) {
          console.error(`Error processing ${url}:`, error)
          continue
        }
      }
    }

    // Save high-scoring leads to the database
    const savedLeads: string[] = []
    for (const lead of discoveredLeads) {
      try {
        const leadId = await ctx.runMutation(internal.leads.saveScrapedLead, {
          name: lead.jobTitle, // Use job title as name initially
          email: 'pending@inventing.se', // Placeholder - will need to find contact info
          company: lead.company,
          message: 'Scraped job ad (analysis pending).',
          source: 'scraped',
          jobUrl: lead.jobUrl,
          rawJobDescription: lead.jobDescription,
        })

        savedLeads.push(leadId)
        console.log(`Saved lead: ${lead.company} - ${lead.jobTitle}`)
      } catch (error) {
        console.error(`Error saving lead for ${lead.company}:`, error)
      }
    }

    return {
      success: true,
      leadsFound: discoveredLeads.length,
      leadsSaved: savedLeads.length,
      leads: discoveredLeads.map((l) => ({
        company: l.company,
        jobUrl: l.jobUrl,
      })),
    }
  },
})

/**
 * Analyze saved scraped leads (no rescrape).
 * Uses the raw job description to extract company name and job title.
 */
export const analyzeScrapedLeads = action({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const openai = getOpenAIClient()
    const limit = args.limit ?? 10

    const pendingLeads = await ctx.runQuery(
      internal.leads.listPendingScrapedLeads,
      { limit }
    )

    const results: Array<{
      leadId: string
      success: boolean
      company?: string
      jobTitle?: string
      error?: string
    }> = []

    for (const lead of pendingLeads) {
      try {
        const jobDescription = lead.rawJobDescription ?? ''
        if (!jobDescription) {
          await ctx.runMutation(internal.leads.updateScrapedLeadAnalysis, {
            leadId: lead._id,
            analysisStatus: 'failed',
            analysisModel: 'gpt-4.1-mini',
            analysisError: 'Missing raw job description',
          })
          results.push({
            leadId: lead._id,
            success: false,
            error: 'Missing raw job description',
          })
          continue
        }

        const extracted = await extractLeadDetails(
          openai,
          jobDescription,
          lead.jobUrl ?? ''
        )

        const companyName = extracted.company?.trim()
        const jobTitle = extracted.jobTitle?.trim()
        const contactName = extracted.contactName?.trim()
        const contactEmail = extracted.contactEmail?.trim()
        const contactPhone = extracted.contactPhone?.trim()
        const cleanedJobDescription = extracted.cleanedJobDescription?.trim()

        await ctx.runMutation(internal.leads.updateScrapedLeadAnalysis, {
          leadId: lead._id,
          analysisStatus: 'scored',
          analysisModel: 'gpt-4.1-mini',
          analysisError: undefined,
          company: companyName || undefined,
          name: jobTitle || undefined,
          email: contactEmail || undefined,
          jobTitle: jobTitle || undefined,
          contactName: contactName || undefined,
          contactEmail: contactEmail || undefined,
          contactPhone: contactPhone || undefined,
          cleanedJobDescription: cleanedJobDescription || undefined,
        })

        results.push({
          leadId: lead._id,
          success: true,
          company: companyName || undefined,
          jobTitle: jobTitle || undefined,
        })
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Unknown error'
        await ctx.runMutation(internal.leads.updateScrapedLeadAnalysis, {
          leadId: lead._id,
          analysisStatus: 'failed',
          analysisModel: 'gpt-4.1-mini',
          analysisError: message,
        })
        results.push({
          leadId: lead._id,
          success: false,
          error: message,
        })
      }
    }

    return {
      success: true,
      analyzed: results.length,
      results,
    }
  },
})

/**
 * Backfill analysisStatus for older scraped leads.
 * Marks missing analysisStatus as "pending" without rescraping.
 */
export const backfillScrapedLeadsAnalysisStatus = action({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (
    ctx,
    args
  ): Promise<{ success: boolean; checked: number; updated: number }> => {
    const limit = args.limit ?? 100
    const scrapedLeads: Array<{ _id: Id<'leads'>; analysisStatus?: string }> =
      await ctx.runQuery(
      internal.leads.listScrapedLeadsForBackfill,
      { limit }
    )

    let updated = 0
    for (const lead of scrapedLeads) {
      if (lead.analysisStatus) {
        continue
      }
      await ctx.runMutation(internal.leads.updateScrapedLeadAnalysis, {
        leadId: lead._id,
        analysisStatus: 'pending',
      })
      updated += 1
    }

    return {
      success: true,
      checked: scrapedLeads.length,
      updated,
    }
  },
})
