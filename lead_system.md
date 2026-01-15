# Project Overview: Inventing.se Lead Discovery System

## 1. Context & Business Logic
**Inventing.se** is an "Efficiency-as-a-Service" business targeting SMEs (10-100 employees) in Gothenburg, Sweden. 
* **The Mission:** Help companies scale without increasing headcount by replacing manual "Excel Hell" with robust, custom SaaS modules.
* **The Founder Advantage:** Ex-SKF innovation expert. We bring enterprise-level industrial standards (predictability, security, reliability) to small-business administration.
* **The Commercial Model:** 0 SEK upfront cost, fixed monthly subscription. We take the build risk; the client gets the efficiency upside.

## 2. The Lead Generation Philosophy
Instead of traditional cold-calling, we use **Job Board Signals**. When a company is hiring for an "Administrator," "Coordinator," or "Logistics Assistant," they are actually advertising a **process failure**. They are looking for a human to be the "glue" between systems. We aim to offer a software module as a more reliable, cheaper alternative to that hire.

## 3. System Architecture (The "Lead Engine")

The system is integrated into the protected `/admin/contacts` dashboard and follows a 4-step pipeline:

### Step A: Discovery (Scraping)
* **Tool:** Firecrawl.
* **Source:** Platsbanken, Indeed, and LinkedIn Jobs (filtered for Gothenburg).
* **Input:** Keywords like "Excel", "Manuell hantering", "Sammanställa", "Koordinator".
* **Logic:** Identify companies that fit the 10-100 employee profile.

### Step B: Intelligence (LLM Analysis)
* **Tool:** OpenAI (gpt-4.1-mini).
* **Scoring:** Every job description is analyzed for an **"Excel Hell Score" (1-10)**.
    * *High Score Criteria:* Mention of manual data entry, multiple spreadsheets, "cleaning data," or specific reporting struggles.
* **Pain Identification:** Extract the specific "friction point" (e.g., "Manual syncing of transport deviations").
* **Solution Mapping:** The AI suggests which Inventing.se module fits (e.g., "Freight Tracking Bridge").

### Step C: The "SKF-Pedigree" Pitcher
* **Action:** For high-scoring leads, the system generates a personalized, no-fluff pitch.
* **Tone:** "Gothenburg-Pragmatic" (Straightforward, honest, industrial).
* **The Hook:** Use the founder's SKF background as the trust anchor. "I saw you're hiring for X. Instead of training a new person in your current spreadsheets, I can build a system that automates that specific friction."

### Step D: Lead Management (Convex CRM)
* **Storage:** Leads are saved in a `leads` table in Convex.
* **Fields:** Company info, score, job link, AI-detected pain, and the generated pitch.
* **Workflow UI:** A dashboard where the founder can "Approve & Send" or "Archive" leads.

## 4. Technical Constraints for Cursor
* **Backend:** Convex Actions (for long-running Firecrawl/OpenAI calls).
* **Frontend:** Next.js (Shadcn UI).
* **Database:** Convex (real-time updates).
* **Security:** All lead-gen features must be behind the existing admin authentication.


# Inventing.se: Strategic Sales & Lead Generation Blueprint

## I. The Lead Engine: Signal-Based Acquisition
We do not cold-call; we listen for market signals. A job advertisement for an "Administrative Assistant" or "Operations Coordinator" is a public admission of a process bottleneck.

### 1. Discovery Pipeline (The "Hunter")
- **The Signal:** Companies with 10–100 employees in Gothenburg posting roles on Platsbanken/Indeed.
- **The Filter:** Using Firecrawl to scrape descriptions and OpenAI to calculate an **"Excel Hell Score"**.
- **The High-Value Target:** Any ad mentioning "manual data entry," "reconciling spreadsheets," "complex Excel reporting," or "coordinating between systems."

### 2. The Logic of the Sale
We frame the conversation around **Recruitment Prevention**. 
- **The Human Cost:** Hiring a person costs ~500k-600k SEK/year (including social fees), plus months of training on fragile Excel sheets.
- **The Inventing Alternative:** A custom software module built for the specific process for ~5k-7k SEK/month. 
- **The Result:** The company scales its capacity without scaling its headcount.

---

## II. The Pitch: "The Industrial-Grade Alternative"

The pitch is designed to be sent to CEOs or Operations Managers. It uses your **SKF pedigree** to establish instant trust and moves the conversation from "tech" to "business value."

### 1. The Core Narrative
"You are looking for a person to manage a process. I am offering a system that manages it better, for 10% of the cost."

### 2. The Template (The "Gothenburg Pragmatist")
> **Subject:** Angående er rekrytering av [Job Title] – ett alternativ för [Company Name]
>
> **Hej [Name],**
>
> Jag såg att ni söker en [Job Title] för att hantera [Specific Pain Point from Ad, e.g., orderflöden och transportavvikelser].
>
> Innan ni låser upp er i en dyr rekryteringsprocess vill jag ge dig ett alternativ. Jag driver **Inventing.se** här i Göteborg och vi hjälper bolag att skala utan att nyanställa genom att bygga bort det manuella arbetet i Excel.
>
> **Varför Inventing?**
> * **Industriell Standard:** Jag kommer från en bakgrund inom innovation på bolag som **SKF**. Jag bygger inte appar – jag bygger robust, säker infrastruktur som fungerar dygnet runt.
> * **Förstärk din personal:** Istället för att träna en nyanställd i gamla kalkylark, ger vi ditt befintliga team verktyg som gör att de hinner med dubbelt så mycket.
> * **Noll risk:** Vi tar hela utvecklingsrisken. Ni betalar ingenting upfront, utan bara en fast månadskostnad när systemet är live och levererar värde.
>
> Har du tid för en 10-minuters kaffe i veckan för att se om vi kan automatisera bort det här behovet istället för att rekrytera? 
>
> (P.S. Jag är även killen bakom allaheterglenn.se – så jag lovar att jag både kan bygga saker som fungerar och har rötterna i Göteborg.)
>
> **Mvh,**
> **[Your Name]**

---

## III. Execution Timeline (The 20-Hour Week)
- **Monday:** Review the "Lead Dashboard" for the 10 best Excel Hell scores.
- **Tuesday-Thursday:** Send 3-5 personalized pitches daily using the generated drafts.
- **Friday:** Follow up on responses and schedule "Problem Discovery" calls for the following week.

### Goal:
Convert **5 clients** at **5,000 SEK/month** to reach the **300,000 SEK/year** income milestone.