# AGENTS.md

This document provides instructions for AI agents working on the inventing landing site project.

## Project Overview

This is a **TanStack Start** website built with:
- **Framework**: TanStack Start (React + TypeScript)
- **UI Components**: shadcn/ui component library
- **Styling**: Tailwind CSS with custom theme (base-maia style, zinc base color)
- **Server**: Nitro for server-side functionality and API routes
- **Font**: Noto Sans Variable (already configured)

## Design Guidelines

### Component Usage
- **Always use shadcn components** from `src/components/ui/`
- Do not create custom components when shadcn equivalents exist
- Maintain consistency with existing component patterns

### Theme & Styling
- **Maintain the existing theme** defined in `src/styles.css`
- Use CSS variables for colors (e.g., `bg-background`, `text-foreground`, `border-border`)
- Support dark mode - theme variables are already configured
- Use the Noto Sans Variable font family (already set up)
- Follow the existing color scheme and design tokens

### Best Practices
- Keep designs clean and modern
- Ensure responsive layouts
- Maintain accessibility standards
- Follow existing code patterns and conventions

## Company Information

### Brand Identity
- **Site Name**: inventing
- **Tagline**: "We are developers at the forefront helping small businesses step into 2026 already today"

### Services Offered
- Build a website
- Custom transformation
- Company chatbot
- Removing admin tasks

### Value Proposition
"We are there to help for half or less that you would think."

### Call to Action
"Contact us"

## Technical Requirements

### Landing Site
- Simple, focused landing page
- Clear value proposition
- Service highlights
- Contact form prominently displayed

### Contact Form
- Must send emails via SMTP
- Use Nitro server routes for email handling
- Keep form simple and user-friendly
- Include appropriate validation

## Internationalization (i18n)

### Multilingual Support
The site supports **multiple languages** with full internationalization:
- **English (en)** - Default/fallback language
- **Swedish (sv)** - Svenska
- **Polish (pl)** - Polski

### Translation System
- **Library**: react-i18next with i18next
- **Language Detection**: Automatic browser language detection with localStorage persistence
- **Translation Files**: Located in `src/locales/`
  - `en.json` - English translations
  - `sv.json` - Swedish translations
  - `pl.json` - Polish translations

### Critical Rule: Always Update All Languages
**⚠️ IMPORTANT**: When adding or modifying any text content:
1. **ALWAYS update ALL language files** (`en.json`, `sv.json`, `pl.json`)
2. **Never add translations to only one language**
3. **Maintain the same structure** across all translation files
4. **Use translation keys** instead of hardcoded text in components

### Using Translations in Components
```typescript
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t } = useTranslation()
  
  return (
    <div>
      <h1>{t('section.key')}</h1>
      <p>{t('section.description')}</p>
    </div>
  )
}
```

### Translation File Structure
All translation files follow the same nested structure:
- `meta` - Page meta tags (title, description)
- `hero` - Hero section content
- `services` - Services section with all service items
- `valueProposition` - Value proposition section
- `contact` - Contact form section (including form labels, placeholders, validation messages)
- `footer` - Footer content

### Language Selector
- Located in the footer component
- Uses the Select component from shadcn/ui
- Automatically updates HTML `lang` attribute
- Persists language preference in localStorage

### Adding New Languages
To add a new language:
1. Create new translation file: `src/locales/{code}.json`
2. Add language code to `src/lib/i18n.ts`:
   - Import the translation file
   - Add to `resources` object
   - Add to `supportedLngs` array
3. Add language option to `src/components/language-selector.tsx`

### Best Practices
- **Never hardcode text** - Always use translation keys
- **Keep translation keys consistent** across all languages
- **Test all languages** when making changes
- **Update translations immediately** when adding new features
- **Use descriptive key names** (e.g., `contact.form.emailPlaceholder` not `email`)

### Implementation Philosophy
- **Keep it simple** - This is a landing site, not a complex application
- Focus on conversion and user experience
- Maintain clean, readable code

## Documentation Instructions

### Using Context7 MCP Server
- **Always use Context7 MCP server** to get the latest TanStack Start documentation
- Use Context7 for shadcn/ui component documentation when needed
- Before implementing features, check Context7 for:
  - Latest API changes
  - Best practices
  - Component usage examples
  - Framework updates

### Code References
- Reference existing code patterns in the codebase
- Follow established conventions
- Check similar implementations before creating new ones

## Project Structure Reference

### Key Directories
- **Routes**: `src/routes/` - File-based routing
  - `__root.tsx` - Root route configuration
  - `index.tsx` - Home page route
- **Components**: `src/components/ui/` - shadcn components
- **Styles**: `src/styles.css` - Global styles and theme variables
- **Server Routes**: Use Nitro API routes (typically `src/routes/api/`)
- **Translations**: `src/locales/` - i18n translation files (en.json, sv.json, pl.json)
- **i18n Config**: `src/lib/i18n.ts` - Internationalization configuration

### Path Aliases
- `@/components` → `src/components`
- `@/lib` → `src/lib`
- `@/hooks` → `src/hooks` (if created)
- `@/ui` → `src/components/ui`

### Configuration Files
- `components.json` - shadcn/ui configuration
- `vite.config.ts` - Vite and TanStack Start configuration
- `tsconfig.json` - TypeScript configuration
- `package.json` - Dependencies and scripts

## Implementation Notes

### Code Quality
- Maintain existing file structure
- Follow TypeScript best practices
- Use existing path aliases consistently
- Write clean, maintainable code

### Development Workflow
- Use `npm run dev` to start development server (port 3000)
- Use `npm run build` to build for production
- Use `npm run preview` to preview production build

### SMTP Configuration
- SMTP credentials should be configured via environment variables
- Use Nitro's server-side capabilities for email sending
- Keep email functionality secure and simple

## Quick Reference

### Available shadcn Components
Check `src/components/ui/` for available components. Common ones include:
- Button
- Input
- Textarea
- Card
- Label
- And more...

### Theme Colors
- Primary: Orange/amber tones (oklch color space)
- Background: White (light) / Dark (dark mode)
- Foreground: Dark text (light) / Light text (dark mode)
- See `src/styles.css` for complete color palette

### Getting Started
1. Review existing routes and components
2. Use Context7 to get latest TanStack Start docs
3. Follow design guidelines above
4. **Remember to update all language files** when adding/modifying text
5. Implement features maintaining simplicity
6. Test thoroughly before completion (including all languages)

---

**Remember**: This is a landing site focused on conversion. Keep it simple, beautiful, and effective.

