# Vertis Technology Design Guidelines

## Design Approach
**Reference-Based Strategy**: Drawing inspiration from enterprise B2B leaders (Microsoft Azure, AWS, Stripe Business, IBM) combined with modern IT service providers. The design will convey technical expertise, trust, and enterprise-grade professionalism while maintaining approachability.

## Core Design Principles
1. **Enterprise Credibility**: Clean, structured layouts that communicate reliability and technical competence
2. **Clear Information Hierarchy**: Service offerings and value propositions presented with crystal clarity
3. **Trust Building**: Strategic placement of partner logos, certifications, and testimonials throughout
4. **Purposeful Whitespace**: Generous spacing that lets content breathe without feeling sparse

## Typography System
- **Headings**: Inter or DM Sans - Bold (700) for H1, Semi-bold (600) for H2-H3
  - H1: 3.5xl to 5xl (desktop), 2xl to 3xl (mobile)
  - H2: 2xl to 3xl (desktop), xl to 2xl (mobile)
  - H3: xl to 2xl
- **Body Text**: Inter Regular (400), size base to lg
- **Accent/Labels**: Inter Medium (500), size sm to base
- **Line Height**: Relaxed for body (1.75), tight for headings (1.2)

## Layout System
**Spacing Units**: Tailwind units of 4, 6, 8, 12, 16, 20, 24 (as in p-4, gap-6, mt-8, etc.)
- Section vertical padding: py-16 to py-24 (desktop), py-12 to py-16 (mobile)
- Component spacing: gap-8 to gap-12 for grids
- Container: max-w-7xl with px-6 to px-8

## Component Library

### Navigation Header
- Fixed/sticky header with slight shadow on scroll
- Logo left, navigation center/right with dropdown for Services
- CTA buttons: "Request Support" (primary) and "Contact Us" (secondary)
- Mobile: Hamburger menu with full-height drawer

### Hero Sections
- **Homepage Hero**: 70vh minimum with large background image (modern office/data center/technology infrastructure)
  - Blurred background overlay for text readability
  - H1 headline + supporting subheadline + 2 primary CTAs with blurred backgrounds
  - Partner logo bar below hero (6-8 logos in single row, grayscale with color on hover)

### Service Cards/Sections
- Grid layout: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
- Each card: Icon top, title, brief description, "Learn More" link
- Subtle border, light background, hover lift effect (shadow increase)

### Technology Partners Grid
- 4 columns (desktop), 3 columns (tablet), 2 columns (mobile)
- Partner logos in bordered cards with company name below
- Uniform sizing with padding, all logos grayscale that reveal color on hover

### Testimonials Carousel
- Full-width section with background tint
- Large quote marks, testimonial text, customer name/role/company
- Carousel indicators (dots) below, auto-rotate with manual controls
- 1 testimonial visible at a time on mobile, 2-3 on desktop in card format

### Contact Form
- 2-column layout: Form left (60%), Info + Map right (40%)
- Form fields: Name, Email, Company, Service Interest (dropdown), Message
- Single-column stack on mobile
- Google Maps embed in rounded container

### Footer
- 4-column layout: Services list, Quick Links, Partners, Contact Info + Social
- Dark background with light text
- Copyright and additional links at bottom

### Call-to-Action Sections
- Full-width colored backgrounds (blue gradient or solid)
- Centered content with headline + supporting text + primary button
- Placed strategically between major sections

## Multi-Column Strategy
- **Use 3-4 columns**: Service features, partner logos, stats/metrics
- **Use 2 columns**: About Us (text + image), Contact page layout, service detail pages
- **Single column**: Hero content, long-form text, testimonials on mobile

## Images

### Hero Images
1. **Homepage**: Large hero image - modern data center or IT professionals collaborating (1920x1080 minimum)
2. **About Us**: Team photo or office environment (professional, high-quality)
3. **Services Pages**: Relevant technology imagery per service (cloud infrastructure, security operations center, network diagrams)
4. **Partners Page**: Hero with interconnected technology theme

### Supporting Images
- Service icons: Use Heroicons for consistency (outline style)
- Decorative graphics: Subtle tech-themed patterns or gradients as section backgrounds
- All images should feel professional, modern, enterprise-grade

### Image Treatment
- Hero images: Subtle overlay (dark gradient 40-60% opacity) for text contrast
- Buttons on images: Frosted glass blur background effect (backdrop-blur)
- Service/feature images: Rounded corners (rounded-lg to rounded-xl)

## Accessibility & Interaction
- Focus states: Visible blue outline (ring-2 ring-blue-500)
- Button states: Distinct hover (slight scale/shadow), active (scale down)
- Minimum touch targets: 44x44px
- Color contrast: WCAG AA minimum (4.5:1 for text)
- Keyboard navigation: Full support with logical tab order

## Animation Approach
**Minimal, Purposeful Animation**:
- Fade-in on scroll for section reveals (subtle, once)
- Smooth transitions for hover states (150-300ms)
- Carousel slide transitions (smooth, not distracting)
- NO complex scroll-triggered animations or parallax effects
- Focus on performance and professionalism over flashiness

## Page-Specific Guidelines

### Homepage
- 7-8 sections: Hero, Value Props (3-col), Services Overview (3-col), Partners Grid, Stats/Metrics, Testimonials, CTA
- Each section distinct with alternating background treatments (white/light grey)

### Service Pages
- Consistent template: Hero, Service Description, Features Grid (3-col), Benefits, Technologies Used, Related Services, CTA
- Include relevant service-specific imagery

### Support/Ticket Logging
- Clear prominent button to Zoho Desk
- Support SLA information in cards
- FAQ accordion section

This design will create a professional, trustworthy enterprise IT services website that converts visitors while maintaining technical credibility.