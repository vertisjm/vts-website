# Vertis Technology Website

## Overview

This is a professional single-page static website for Vertis Technology, a Jamaica-based Managed IT Services and Solutions Provider. The website showcases enterprise-grade IT support, network infrastructure services, cloud solutions, and IT security consulting services. Built as a modern, responsive static web application with React and Tailwind CSS, it targets medium to large enterprises in Jamaica and the Caribbean region.

**Note:** This is a static website with no backend server or database. All content is hardcoded in the frontend. Forms submit directly to external services (Zoho CRM).

## Site Structure

The website is a single-page application with anchor-based navigation:
- **Homepage (/)** - Contains all main content sections:
  - Hero section with main value proposition
  - Stats section with company metrics
  - About section (#about) - Mission, vision, and core values
  - Services section (#services) - Expandable service cards
  - Industries section - Sectors served
  - Partners section (#partners) - Technology partner logos
  - Testimonials section - Customer quotes carousel
  - Support section (#support) - Support options and ticket portal links
  - Why Choose Us section
  - CTA section

- **Separate Pages:**
  - **/contact** - Contact form (submits to Zoho CRM WebToLead)
  - **/careers** - Job board with Zoho Recruit integration

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Animations**: Framer Motion for scroll-triggered animations
- **Build Tool**: Vite for development and production builds

### Static Site Structure
- No backend server required for production
- All content hardcoded in `client/src/lib/data.ts`
- Forms submit directly to Zoho CRM (external service)
- Can be hosted on any static hosting provider (SiteGround, Netlify, Vercel, etc.)

### Project Structure
```
├── client/           # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components (Home, Contact, Careers)
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities and static data
│   └── public/
│       └── assets/       # Static assets (logos, images)
├── server/           # Development server only
│   ├── index.ts      # Dev server entry point
│   ├── static.ts     # Static file serving
│   └── vite.ts       # Vite dev server integration
├── shared/           # Shared TypeScript types
│   └── schema.ts     # Type definitions
├── dist/             # Production build output
│   └── public/       # Static files ready for deployment
└── attached_assets/  # Source assets
```

### Key Design Patterns
- **Static Site**: No backend required for production deployment
- **Path Aliases**: `@/` for client source, `@shared/` for shared code
- **Component Composition**: shadcn/ui patterns with Radix UI primitives
- **Type Safety**: End-to-end TypeScript with shared type definitions

### Design System
Following enterprise B2B design guidelines with:
- Inter/DM Sans typography
- Navy/Indigo/Aqua brand colors (#0B1F3A, #1755B5, #33C3F0)
- Tailwind spacing units (4, 6, 8, 12, 16, 20, 24)
- max-w-7xl container with responsive padding
- Card-based service presentation with hover effects
- Light/dark theme support via CSS variables

## Building for Production

Run `npm run build` to create a production build. The static files will be in `dist/public/`.

### Deploying to Static Hosting

1. Run `npm run build`
2. Upload the contents of `dist/public/` to your static hosting provider
3. Configure the hosting to serve `index.html` for all routes (SPA fallback)

## External Integrations

### Zoho Services
- **Zoho SalesIQ**: Chat widget for live customer support
- **Zoho Recruit**: Job board embed on careers page
- **Zoho CRM WebToLead**: Contact form submission
- **Zoho Desk**: Support ticket portal links

### Contact Information
- Primary Phone: +1 876 634-8700
- Secondary Phone: +1 876 634-8699
- Address: 1b Braemar Avenue, Kingston 10
- Careers Email: jobs@vertisjm.com

### Key NPM Packages
- **framer-motion**: Scroll-triggered animations
- **@radix-ui/***: Accessible UI primitives
- **zod**: Runtime type validation
- **wouter**: Lightweight React router
- **react-hook-form**: Form state management
- **lucide-react**: Icon library

## Content Updates

To update website content, edit the data files:
- **Services, Partners, Testimonials**: `client/src/lib/data.ts`
- **Navigation, Footer links**: `client/src/components/navigation.tsx`, `client/src/components/footer.tsx`
- **Page content**: `client/src/pages/home.tsx`, `client/src/pages/contact.tsx`, `client/src/pages/careers.tsx`
