# Inventing - Landing Site

A modern, multilingual landing page built with TanStack Start, React, TypeScript, and shadcn/ui. This site showcases the services of Inventing, a development company helping small businesses step into 2030.

## Features

- 🌍 **Multilingual Support** - Full internationalization with English, Swedish, and Polish
- 📧 **Contact Form** - Functional contact form with SMTP email integration
- 🎨 **Modern UI** - Built with shadcn/ui components and Tailwind CSS
- 🌓 **Dark Mode** - Theme toggle with persistent preferences
- ✨ **Animations** - Smooth scroll animations and visual effects
- 📱 **Responsive** - Fully responsive design for all devices
- ⚡ **Fast** - Built with TanStack Start for optimal performance

## Tech Stack

- **Framework**: [TanStack Start](https://tanstack.com/start) (React + TypeScript)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Styling**: Tailwind CSS v4 with custom theme
- **Internationalization**: react-i18next with i18next
- **Server**: Nitro for server-side functionality
- **Email**: Nodemailer for SMTP email sending
- **Font**: Noto Sans Variable

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd inventing
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the project root
   - See [SMTP_SETUP.md](./SMTP_SETUP.md) for email configuration details

4. Start the development server:
```bash
npm run dev
```

The site will be available at `http://localhost:3000`

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # shadcn/ui components
│   ├── hero-section.tsx
│   ├── services-section.tsx
│   ├── value-proposition-section.tsx
│   ├── contact-form-section.tsx
│   ├── footer.tsx
│   └── ...
├── routes/             # TanStack Start routes
│   ├── index.tsx       # Home page
│   └── api/
│       └── contact.ts  # Contact form API endpoint
├── locales/            # Translation files
│   ├── en.json         # English
│   ├── sv.json         # Swedish
│   └── pl.json         # Polish
├── lib/                # Utilities and configurations
│   ├── i18n.ts         # i18n configuration
│   └── utils.ts        # Utility functions
└── styles.css          # Global styles and theme variables
```

## Configuration

### SMTP Email Setup

The contact form requires SMTP configuration to send emails. See [SMTP_SETUP.md](./SMTP_SETUP.md) for detailed instructions on configuring email services.

Required environment variables:
- `SMTP_HOST` - SMTP server hostname
- `SMTP_PORT` - SMTP server port (usually 587 or 465)
- `SMTP_USER` - SMTP username/email
- `SMTP_PASSWORD` - SMTP password
- `SMTP_FROM` - From email address (optional, defaults to SMTP_USER)
- `CONTACT_EMAIL` - Email address to receive contact form submissions (optional, defaults to SMTP_USER)

### Internationalization

The site supports three languages:
- **English (en)** - Default language
- **Swedish (sv)** - Svenska
- **Polish (pl)** - Polski

Language detection is automatic based on browser settings, with preferences stored in localStorage. Users can manually switch languages using the language selector in the footer.

To add a new language:
1. Create a new translation file in `src/locales/` (e.g., `de.json`)
2. Update `src/lib/i18n.ts` to include the new language
3. Add the language option to `src/components/language-selector.tsx`

## Available Scripts

- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run check` - Format and lint code

## Development

### Adding New Components

This project uses shadcn/ui components. To add a new component:

```bash
npx shadcn@latest add [component-name]
```

Components will be added to `src/components/ui/`.

### Styling

The project uses Tailwind CSS with a custom theme defined in `src/styles.css`. Theme variables support both light and dark modes. Use CSS variables for colors (e.g., `bg-background`, `text-foreground`).

### Adding Content

When adding or modifying text content:
1. **Always update all language files** (`en.json`, `sv.json`, `pl.json`)
2. Use translation keys in components via `useTranslation()` hook
3. Never hardcode text directly in components

Example:
```typescript
import { useTranslation } from 'react-i18next'

function MyComponent() {
  const { t } = useTranslation()
  return <h1>{t('section.title')}</h1>
}
```

## Deployment

Build the project for production:

```bash
npm run build
```

The production build will be in the `.output` directory, ready to be deployed to any platform that supports Node.js or static hosting.

## License

Private project - All rights reserved.
