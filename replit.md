# Vertis Technology Website

## Overview

This is a professional single-page website for Vertis Technology, a Jamaica-based Managed IT Services and Solutions Provider. The website showcases enterprise-grade IT support, network infrastructure services, cloud solutions, and IT security consulting services. Built as a modern, responsive web application with a React frontend and Express backend, it targets medium to large enterprises in Jamaica and the Caribbean region.

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
  - **/contact** - Contact form with database persistence
  - **/careers** - Job board with Zoho Recruit integration link

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight client-side routing)
- **State Management**: TanStack React Query for server state and data fetching
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express
- **API Design**: RESTful API endpoints under `/api` prefix
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Validation**: Zod schemas shared between frontend and backend via drizzle-zod
- **Data Storage**: PostgreSQL database with Drizzle ORM (DatabaseStorage class in server/storage.ts)

### Project Structure
```
├── client/           # React frontend application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page components (Home, About, Services, etc.)
│   │   ├── hooks/        # Custom React hooks
│   │   └── lib/          # Utilities, data, and query client
├── server/           # Express backend
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Data storage layer
│   └── vite.ts       # Vite dev server integration
├── shared/           # Shared code between client and server
│   └── schema.ts     # Drizzle schemas and Zod validation
└── attached_assets/  # Static assets and design requirements
```

### Key Design Patterns
- **Monorepo Structure**: Client and server code colocated with shared types
- **Path Aliases**: `@/` for client source, `@shared/` for shared code
- **Component Composition**: shadcn/ui patterns with Radix UI primitives
- **Type Safety**: End-to-end TypeScript with shared schema definitions

### Database Schema
- **users**: Basic user authentication table (id, username, password)
- **contactSubmissions**: Contact form submissions (name, email, company, serviceInterest, message, submittedAt)

### Design System
Following enterprise B2B design guidelines with:
- Inter/DM Sans typography
- Tailwind spacing units (4, 6, 8, 12, 16, 20, 24)
- max-w-7xl container with responsive padding
- Card-based service presentation with hover effects
- Light/dark theme support via CSS variables

## External Dependencies

### Core Services
- **PostgreSQL Database**: Primary data store (configured via DATABASE_URL environment variable)
- **Zoho Desk**: External support ticket system (linked from support page)
- **Zoho Recruit**: External job application system (linked from careers page)

### Third-Party APIs & Integrations
- No active third-party API integrations currently implemented
- Design references external support/recruiting platforms via outbound links

### Key NPM Packages
- **@tanstack/react-query**: Server state management
- **drizzle-orm**: Database ORM with PostgreSQL support
- **@radix-ui/***: Accessible UI primitives for component library
- **zod**: Runtime type validation
- **wouter**: Lightweight React router
- **react-hook-form**: Form state management
- **lucide-react**: Icon library