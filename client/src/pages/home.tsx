import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowLeft,
  ArrowRight,
  BrainCircuit,
  Briefcase,
  Building2,
  Check,
  Clock,
  Cloud,
  Code,
  Cpu,
  Factory,
  GraduationCap,
  HardDrive,
  HeartPulse,
  Landmark,
  MapPin,
  MapPinned,
  Network,
  Server,
  ServerCog,
  Shield,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Truck,
  UserPlus,
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { companyStats, featuredSolutions, industries, partners, services, testimonials as fallbackTestimonials } from "@/lib/data";
import { sortedPosts } from "@/lib/blog";
import type { Service, TestimonialRecord } from "@shared/schema";
import { BlogCard } from "@/components/blog-card";
import { Container, CountUp, Eyebrow, PillLink, Reveal, scrollToId, useInView } from "@/components/site";

import fallbackHeroImage from "@assets/stock_images/hero-it-server-room.jpg";
import caribbeanMap from "@assets/caribbean-map.svg";
import ctaImage from "@assets/stock_images/ocho-rios-aerial.jpg";

// Drop a licensed photo of the Kingston skyline at night at client/public/images/kingston-skyline-night.jpg
// (landscape, at least 2400px wide). Until it exists the hero uses the server-room stock photo.
const KINGSTON_NIGHT = "/images/kingston-skyline-night.jpg";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const serviceIcons: Record<string, typeof Server> = {
  Server,
  Network,
  Shield,
  Cloud,
  Code,
  Users: UserPlus,
  RotateCcw: HardDrive,
  BrainCircuit,
};

const industryIcons: Record<string, typeof Server> = {
  "Financial Services": Landmark,
  Healthcare: HeartPulse,
  Manufacturing: Factory,
  "Logistics & Transportation": Truck,
  "Retail & Distribution": ShoppingCart,
  Education: GraduationCap,
  "Government & Public Sector": Building2,
  "Professional Services": Briefcase,
};

const heroPoints = [
  { icon: Clock, title: "24/7 Support", body: "Always on, always available" },
  { icon: MapPin, title: "Caribbean Coverage", body: "Local teams, regional reach" },
  { icon: ShieldCheck, title: "Trusted Partner", body: "Proven expertise" },
];

function HeroSection() {
  const [background, setBackground] = useState(KINGSTON_NIGHT);

  return (
    <section id="hero" className="relative overflow-hidden bg-navy text-white">
      <img
        src={background}
        alt=""
        aria-hidden="true"
        onError={() => setBackground(fallbackHeroImage)}
        className="ken-burns pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      {/* Keeps the headline readable: darkest behind the text, lighter on the right. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-navy/75 lg:bg-transparent lg:bg-gradient-to-r lg:from-navy/95 lg:via-navy/70 lg:to-navy/20"
      />
      <Container className="relative flex min-h-[560px] flex-col justify-center gap-6 pb-12 pt-16 lg:min-h-[600px] lg:pt-24">
        <Eyebrow dark className="enter">
          Enterprise technology. Caribbean reach.
        </Eyebrow>
        <h1
          className="enter max-w-[720px] font-display text-[40px] font-bold leading-[1.06] tracking-[-0.02em] sm:text-[52px] lg:text-[64px]"
          style={delay(100)}
          data-testid="text-hero-title"
        >
          Technology that moves the <span className="text-leaf">Caribbean forward.</span>
        </h1>
        <p className="enter max-w-[560px] text-[17px] leading-relaxed text-slate-mist lg:text-xl" style={delay(220)} data-testid="text-hero-description">
          Managed IT, cybersecurity, cloud and infrastructure solutions delivered across the Caribbean.
        </p>
        <div className="enter mt-2 flex flex-col gap-3 sm:flex-row sm:gap-4" style={delay(340)}>
          <PillLink href="/contact" arrow data-testid="button-hero-consultation">
            Talk to an Expert
          </PillLink>
          <PillLink href="/#solutions" variant="outline-dark" data-testid="button-hero-solutions">
            Explore Our Solutions
          </PillLink>
        </div>
      </Container>
      <Container className="relative">
        <ul className="grid grid-cols-1 gap-5 border-t border-white/15 py-7 sm:grid-cols-3 lg:py-8">
          {heroPoints.map((p, i) => (
            <li key={p.title} className="enter flex items-center gap-4" style={delay(480 + i * 120)}>
              <p.icon aria-hidden="true" className="h-8 w-8 shrink-0 text-brand-sky" strokeWidth={1.6} />
              <span className="flex flex-col">
                <span className="font-display text-[15px] font-semibold">{p.title}</span>
                <span className="text-sm text-slate-pale">{p.body}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function ServiceDetails({ service, open, onOpenChange }: { service: Service | null; open: boolean; onOpenChange: (o: boolean) => void }) {
  if (!service) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-2xl border-line bg-white p-8 sm:p-10">
        <DialogTitle className="font-display text-2xl font-bold text-ink sm:text-3xl">{service.title}</DialogTitle>
        <DialogDescription className="text-base leading-relaxed text-slate">{service.description}</DialogDescription>
        {service.features && (
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-lg font-semibold text-ink">What's included</h3>
            <ul className="grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {service.features.map((f) => (
                <li key={f} className="flex gap-2.5 text-[15px] text-ink">
                  <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-leaf-dark" strokeWidth={3} />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        )}
        {service.benefits && (
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-lg font-semibold text-ink">Benefits</h3>
            <ul className="flex flex-col gap-2.5">
              {service.benefits.map((b) => (
                <li key={b} className="flex gap-2.5 text-[15px] text-slate">
                  <Check aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-brand" strokeWidth={3} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        )}
        {service.technologies && (
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((t) => (
              <span key={t} className="rounded-full bg-mist px-3 py-1.5 text-[13px] font-semibold text-slate">
                {t}
              </span>
            ))}
          </div>
        )}
        <div>
          <PillLink href="/contact" arrow size="md">
            Talk to an Expert
          </PillLink>
        </div>
      </DialogContent>
    </Dialog>
  );
}

const cardCls =
  "lift group flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-white text-left text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

/** A solution card opens its detail panel when we have details, otherwise it goes to the contact page. */
function SolutionCard({ service, onOpen, children, className }: { service: Service; onOpen: (s: Service) => void; children: React.ReactNode; className?: string }) {
  if (service.description) {
    return (
      <button type="button" className={cardCls + " " + (className ?? "")} onClick={() => onOpen(service)} data-testid={`card-service-${service.id}`}>
        {children}
      </button>
    );
  }
  return (
    <Link href="/contact" className={cardCls + " " + (className ?? "")} data-testid={`card-service-${service.id}`}>
      {children}
    </Link>
  );
}

function SolutionsSection() {
  const [selected, setSelected] = useState<Service | null>(null);
  const [showAll, setShowAll] = useState(false);
  const byId = (id: string) => services.find((s) => s.id === id)!;
  const featuredIds = new Set(featuredSolutions.map((f) => f.serviceId));
  const others = services.filter((s) => !featuredIds.has(s.id));

  return (
    <section id="solutions" className="py-14 lg:py-24">
      <Container className="flex flex-col gap-8 lg:gap-10">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3">
            <Eyebrow className="text-slate">Our solutions</Eyebrow>
            <h2 className="max-w-[560px] font-display text-3xl font-bold leading-[1.15] tracking-[-0.015em] lg:text-[40px]">
              Technology that delivers real business outcomes.
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            aria-expanded={showAll}
            aria-controls="more-solutions"
            className="flex min-h-11 items-center gap-2 self-start text-[15px] font-semibold text-brand hover:text-brand-dark sm:self-auto"
          >
            {showAll ? "Show fewer solutions" : "View all solutions"}
            <ArrowRight aria-hidden="true" className={"h-4 w-4 transition-transform " + (showAll ? "-rotate-90" : "")} />
          </button>
        </Reveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-5">
          {featuredSolutions.map((f, i) => {
            const service = byId(f.serviceId);
            const Icon = serviceIcons[service.icon] ?? Server;
            return (
              <Reveal key={f.serviceId} delay={i * 90}>
                <SolutionCard service={service} onOpen={setSelected}>
                  <span className="relative block h-44 w-full overflow-hidden bg-line-photo lg:h-40">
                    <img src={f.image} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </span>
                  <span className="relative flex flex-1 flex-col gap-2 px-5 pb-5 pt-9">
                    <span className="absolute -top-6 left-5 flex h-12 w-12 items-center justify-center rounded-full border-4 border-white bg-leaf text-white transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="font-display text-[17px] font-semibold leading-snug">{f.title}</span>
                    <span className="flex-1 text-sm leading-normal text-slate">{f.blurb}</span>
                    <ArrowRight aria-hidden="true" className="mt-2 h-4 w-4 text-brand transition-transform group-hover:translate-x-1.5" />
                  </span>
                </SolutionCard>
              </Reveal>
            );
          })}
        </div>

        {showAll && (
          <div id="more-solutions" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:gap-5">
            {others.map((service) => {
              const Icon = serviceIcons[service.icon] ?? Server;
              return (
                <div key={service.id} className="enter">
                  <SolutionCard service={service} onOpen={setSelected} className="flex-row items-center gap-4 p-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-navy text-leaf">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="flex flex-1 flex-col gap-1">
                      <span className="font-display text-[17px] font-semibold">{service.title}</span>
                      <span className="text-sm text-slate">{service.shortDescription}</span>
                    </span>
                    <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-brand" />
                  </SolutionCard>
                </div>
              );
            })}
          </div>
        )}
      </Container>
      <ServiceDetails service={selected} open={selected !== null} onOpenChange={(o) => !o && setSelected(null)} />
    </section>
  );
}

// Map points in the caribbean-map.svg coordinate space (1200 × 620, the same Mercator projection used to draw the map).
const KINGSTON = { x: 500, y: 339 };
const regionPoints = [
  { x: 483, y: 109 }, // Nassau
  { x: 361, y: 298 }, // George Town
  { x: 637, y: 217 }, // Providenciales
  { x: 708, y: 323 }, // Santo Domingo
  { x: 824, y: 324 }, // San Juan
  { x: 979, y: 465 }, // Castries
  { x: 1021, y: 493 }, // Bridgetown
  { x: 963, y: 569 }, // Port of Spain
  { x: 155, y: 355 }, // Belize City
];

function arcPath(to: { x: number; y: number }) {
  const mx = (KINGSTON.x + to.x) / 2;
  const my = (KINGSTON.y + to.y) / 2;
  const lift = Math.hypot(to.x - KINGSTON.x, to.y - KINGSTON.y) * 0.28;
  return `M${KINGSTON.x} ${KINGSTON.y} Q${mx} ${my - lift} ${to.x} ${to.y}`;
}

const aiSteps = [
  { icon: ServerCog, title: "AI servers", body: "Enterprise AI servers built for GPU workloads, supplied and deployed with our technology partners." },
  { icon: Network, title: "High-performance AI networking", body: "High-bandwidth, low-latency networking that connects GPUs and servers at scale." },
  { icon: Cpu, title: "GPU cluster design & configuration", body: "GPU clusters designed, built and tuned for your models and workloads." },
  { icon: BrainCircuit, title: "AI model implementation", body: "AI models deployed and integrated on your own infrastructure, ready for your teams." },
];

/** Animated diagram of a sovereign AI environment: everything inside the boundary stays in-country. */
function SovereignAiDiagram() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const layer = (i: number) => "transition-all duration-700 " + (inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4");
  const layerDelay = (i: number) => ({ transitionDelay: `${150 + i * 180}ms` });

  return (
    <div ref={ref} className="relative overflow-hidden rounded-2xl bg-navy p-5 text-white shadow-[0_30px_60px_rgba(10,27,46,0.25)] sm:p-7">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-brand/40 blur-[90px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -left-16 h-64 w-64 rounded-full bg-leaf/25 blur-[90px]" />

      <div className="relative rounded-xl border-2 border-dashed border-leaf/50 p-4 pt-8 sm:p-5 sm:pt-9">
        <span className="absolute -top-3.5 left-4 flex items-center gap-1.5 rounded-md bg-leaf px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-navy">
          <MapPinned aria-hidden="true" className="h-3.5 w-3.5" /> Your data stays in-country
        </span>

        <div className="flex flex-col gap-4">
          {/* Top: people and apps */}
          <div className={layer(2) + " relative z-10 rounded-lg border border-white/10 bg-[#13283F] p-4"} style={layerDelay(2)}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-pale">Your teams & applications</span>
              <Sparkles aria-hidden="true" className="h-4 w-4 text-leaf" />
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs font-semibold">
              {["Assistants", "Analytics", "Automation"].map((a) => (
                <span key={a} className="rounded-md bg-white/10 px-2 py-2">
                  {a}
                </span>
              ))}
            </div>
          </div>

          <DataFlow />

          {/* Middle: private models */}
          <div className={layer(1) + " relative z-10 flex items-center gap-3 rounded-lg border border-brand-sky/40 bg-[#0F3556] p-4"} style={layerDelay(1)}>
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-sky/25 text-white">
              <BrainCircuit aria-hidden="true" className="h-5 w-5" />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-semibold">AI models</span>
              <span className="text-xs text-slate-pale">Implemented on infrastructure you control</span>
            </span>
          </div>

          <DataFlow />

          {/* Bottom: infrastructure */}
          <div className={layer(0) + " relative z-10 rounded-lg border border-white/10 bg-[#112539] p-4"} style={layerDelay(0)}>
            <div className="grid grid-cols-3 gap-2">
              {[
                { icon: ServerCog, label: "AI servers" },
                { icon: Cpu, label: "GPU cluster" },
                { icon: Network, label: "AI networking" },
              ].map((c) => (
                <div key={c.label} className="flex flex-col items-center gap-2 rounded-md bg-white/[0.06] px-2 py-3 text-center">
                  <c.icon aria-hidden="true" className="h-5 w-5 text-brand-sky" />
                  <span className="text-[11px] font-semibold leading-tight sm:text-xs">{c.label}</span>
                </div>
              ))}
            </div>
            {/* GPU cluster status lights */}
            <div aria-hidden="true" className="mt-3 grid grid-cols-12 gap-1">
              {Array.from({ length: 24 }, (_, i) => (
                <span key={i} className={"led h-1.5 rounded-full " + (i % 5 === 0 ? "bg-brand-sky" : "bg-leaf")} style={delay((i * 137) % 1800)} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Small animated dots moving up between two layers of the AI diagram. */
function DataFlow() {
  return (
    <div aria-hidden="true" className="relative -my-2 flex h-6 justify-center gap-10 overflow-visible">
      {[0, 1, 2].map((i) => (
        <span key={i} className="relative w-px bg-gradient-to-t from-leaf/10 via-leaf/50 to-leaf/10">
          <span className="data-up absolute -left-[3px] top-full h-[7px] w-[7px] rounded-full bg-leaf shadow-[0_0_10px_#8BC441]" style={delay(i * 700)} />
        </span>
      ))}
    </div>
  );
}

function SovereignAiSection() {
  return (
    <section id="sovereign-ai" className="relative overflow-hidden bg-mist py-16 lg:py-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <Reveal variant="left" className="flex flex-col gap-6">
          <span className="flex items-center gap-2 self-start rounded-full bg-navy px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-leaf">
            <Sparkles aria-hidden="true" className="h-3.5 w-3.5" /> Local & sovereign AI
          </span>
          <h2 className="font-display text-[34px] font-bold leading-[1.08] tracking-[-0.02em] lg:text-[48px]">
            AI infrastructure, <span className="text-brand">designed and built locally.</span>
          </h2>
          <p className="max-w-[560px] text-base leading-relaxed text-slate lg:text-lg">
            Vertis Technology builds local and sovereign AI infrastructure through partnerships with global technology
            leaders, from AI servers and high-performance networking to GPU clusters and the AI models that run on them. Your
            data stays in Jamaica and the region, on infrastructure you control.
          </p>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {aiSteps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={120 + i * 90} className="flex gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand shadow-sm">
                  <s.icon aria-hidden="true" className="h-5 w-5" />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="font-display text-base font-semibold">{s.title}</span>
                  <span className="text-sm leading-relaxed text-slate">{s.body}</span>
                </span>
              </Reveal>
            ))}
          </ul>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:gap-6">
            <PillLink href="/contact" arrow data-testid="button-ai-expert">
              Talk to an AI Expert
            </PillLink>
            <Link
              href="/blog/jamaica-data-protection-act-compliance-guide"
              className="flex min-h-11 items-center gap-2 text-[15px] font-semibold text-brand hover:text-brand-dark"
            >
              Read: Jamaica's Data Protection Act <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
        </Reveal>
        <Reveal variant="zoom" delay={150}>
          <SovereignAiDiagram />
        </Reveal>
      </Container>
    </section>
  );
}

function RegionMap() {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref} className={"relative aspect-[1200/620] w-full " + (inView ? "is-visible" : "")}>
      <img src={caribbeanMap} alt="Map of the Caribbean with Jamaica highlighted and Kingston marked" className="absolute inset-0 h-full w-full" />
      <svg viewBox="0 0 1200 620" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <linearGradient id="arc" x1="0" x2="1">
            <stop offset="0" stopColor="#8BC441" />
            <stop offset="1" stopColor="#1A94D2" />
          </linearGradient>
        </defs>
        {regionPoints.map((p, i) => (
          <g key={i}>
            <path d={arcPath(p)} pathLength={1} fill="none" stroke="url(#arc)" strokeWidth="2" strokeLinecap="round" className="draw-line" style={delay(200 + i * 140)} />
            <circle cx={p.x} cy={p.y} r="6" fill="#1A94D2" stroke="#0A1B2E" strokeWidth="2" className="pop-in" style={delay(1300 + i * 140)} />
          </g>
        ))}
        <circle cx={KINGSTON.x} cy={KINGSTON.y} r="14" fill="none" stroke="#8BC441" strokeWidth="3" className="pulse-ring" />
        <circle cx={KINGSTON.x} cy={KINGSTON.y} r="14" fill="none" stroke="#8BC441" strokeWidth="3" className="pulse-ring pulse-ring-delay" />
        <circle cx={KINGSTON.x} cy={KINGSTON.y} r="8" fill="#ffffff" stroke="#8BC441" strokeWidth="4" />
      </svg>
      <span
        className="absolute -translate-x-1/2 rounded-md bg-leaf px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-navy shadow-lg"
        style={{ left: `${(KINGSTON.x / 1200) * 100}%`, top: `calc(${(KINGSTON.y / 620) * 100}% + 18px)` }}
      >
        Kingston HQ
      </span>
    </div>
  );
}

function RegionSection() {
  const stats = companyStats.map((s) => ({ value: `${s.value}${s.suffix}`, label: s.label }));
  return (
    <section id="industries" className="relative overflow-hidden bg-navy text-white">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-1/4 h-[480px] w-[480px] rounded-full bg-brand/25 blur-[140px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 bottom-0 h-[420px] w-[420px] rounded-full bg-leaf/15 blur-[140px]" />
      <Container className="relative flex flex-col gap-14 py-16 lg:gap-20 lg:py-28">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-10">
          <Reveal variant="left" className="flex flex-col gap-6">
            <Eyebrow dark>Regional reach</Eyebrow>
            <h2 className="font-display text-[34px] font-bold leading-[1.08] tracking-[-0.02em] lg:text-[52px]">
              Across Jamaica and <span className="text-leaf">the Caribbean.</span>
            </h2>
            <p className="max-w-[500px] text-base leading-relaxed text-slate-mist lg:text-lg">
              We deliver solutions to businesses, government and institutions throughout the Caribbean, combining local
              understanding with global technology.
            </p>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 bg-white/10">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col-reverse gap-1 bg-navy/90 p-5 backdrop-blur">
                  <dt className="text-sm text-slate-pale">{s.label}</dt>
                  <dd className="font-display text-3xl font-bold text-leaf lg:text-4xl">
                    <CountUp value={s.value} />
                  </dd>
                </div>
              ))}
            </dl>
            <div>
              <PillLink href="/contact#coverage" arrow size="md" data-testid="button-regional-coverage">
                Our Regional Coverage
              </PillLink>
            </div>
          </Reveal>
          <Reveal variant="zoom" delay={150} className="lg:-mr-10 xl:-mr-16">
            <RegionMap />
          </Reveal>
        </div>

        <div className="flex flex-col gap-6">
          <Reveal className="flex items-center gap-4">
            <h3 className="font-display text-lg font-semibold">Industries we serve</h3>
            <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
          </Reveal>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:gap-4">
            {industries.map((industry, i) => {
              const Icon = industryIcons[industry] ?? Briefcase;
              return (
                <Reveal as="li" key={industry} delay={(i % 4) * 80}>
                  <div className="group flex h-full items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] p-4 transition-colors duration-300 hover:border-leaf/60 hover:bg-white/[0.08] lg:p-5">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-leaf/15 text-leaf transition-transform duration-300 group-hover:scale-110">
                      <Icon aria-hidden="true" className="h-5 w-5" />
                    </span>
                    <span className="text-sm font-semibold leading-snug lg:text-[15px]">{industry}</span>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </section>
  );
}

function TestimonialsSection() {
  const { data: dbTestimonials } = useQuery<TestimonialRecord[]>({ queryKey: ["/api/testimonials"] });
  const items = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (items.length < 2 || paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 8000);
    return () => clearInterval(id);
  }, [items.length, paused]);

  if (items.length === 0) return null;
  const t = items[index % items.length];
  const go = (step: number) => setIndex((i) => (i + step + items.length) % items.length);

  return (
    <section id="testimonials" className="bg-mist py-14 lg:py-24">
      <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal className="flex flex-col gap-4">
          <Eyebrow className="text-slate">Testimonials</Eyebrow>
          <h2 className="font-display text-3xl font-bold leading-[1.15] tracking-[-0.015em] lg:text-[40px]">Trusted by leading organisations.</h2>
          <p className="text-base leading-relaxed text-slate">What our clients say about working with Vertis.</p>
          <div className="mt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-line-strong bg-white text-ink transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              <ArrowLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="flex h-11 w-11 items-center justify-center rounded-lg border border-line-strong bg-white text-ink transition-colors hover:border-navy hover:bg-navy hover:text-white"
            >
              <ArrowRight aria-hidden="true" className="h-5 w-5" />
            </button>
            <span className="ml-2 text-sm font-semibold text-slate" aria-live="polite">
              {index + 1} / {items.length}
            </span>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <figure
            className="relative m-0 flex min-h-[340px] flex-col justify-between gap-8 overflow-hidden rounded-2xl bg-navy p-8 text-white sm:p-12"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
            data-testid="card-testimonial"
          >
            <svg aria-hidden="true" viewBox="0 0 56 44" className="absolute -right-4 -top-6 h-40 w-40 text-white/[0.04]">
              <path d="M0 44V26C0 11 8 2 22 0l2 6c-8 2-12 8-12 14h10v24zm32 0V26c0-15 8-24 22-26l2 6c-8 2-12 8-12 14h10v24z" fill="currentColor" />
            </svg>
            <div key={t.id} className="quote-in flex flex-col gap-8">
              <svg aria-hidden="true" width="44" height="34" viewBox="0 0 56 44" className="text-leaf">
                <path d="M0 44V26C0 11 8 2 22 0l2 6c-8 2-12 8-12 14h10v24zm32 0V26c0-15 8-24 22-26l2 6c-8 2-12 8-12 14h10v24z" fill="currentColor" />
              </svg>
              <blockquote className="m-0 font-display text-lg font-medium leading-relaxed sm:text-[22px]" data-testid="text-testimonial-quote">
                {t.quote}
              </blockquote>
              <figcaption className="flex flex-col gap-1 border-t border-white/15 pt-5">
                <span className="text-[17px] font-semibold" data-testid="text-testimonial-name">
                  {t.name}
                </span>
                <span className="text-[15px] text-slate-pale" data-testid="text-testimonial-role">
                  {t.role}, {t.company}
                </span>
              </figcaption>
            </div>
            <div className="flex gap-1.5" role="group" aria-label="Choose testimonial">
              {items.map((item, i) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial ${i + 1} of ${items.length}`}
                  aria-pressed={i === index}
                  className="flex h-11 w-8 items-center justify-center"
                >
                  <span className={"block h-1.5 rounded-full transition-all duration-500 " + (i === index ? "w-7 bg-leaf" : "w-3 bg-white/30")} />
                </button>
              ))}
            </div>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}

function PartnersSection() {
  return (
    <section id="partners" className="py-14 lg:py-20">
      <Container className="flex flex-col gap-8">
        <Reveal>
          <Eyebrow className="text-slate">Our technology partners</Eyebrow>
        </Reveal>
        <ul className="grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-3 lg:grid-cols-6 lg:gap-x-12">
          {partners.map((p, i) => (
            <Reveal as="li" key={p.id} delay={(i % 6) * 60} variant="fade" className="flex justify-center">
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                title={p.description}
                className="flex h-14 w-full items-center justify-center rounded-lg px-2 grayscale-[35%] transition duration-300 hover:scale-105 hover:grayscale-0"
              >
                <img src={p.logo} alt={p.name} className="max-h-9 max-w-[140px] object-contain" loading="lazy" />
              </a>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function InsightsSection() {
  const latest = sortedPosts.slice(0, 3);
  return (
    <section id="insights" className="border-t border-line py-14 lg:py-20">
      <Container className="flex flex-col gap-8">
        <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-3">
            <Eyebrow className="text-slate">Latest insights</Eyebrow>
            <h2 className="font-display text-3xl font-bold leading-tight lg:text-[38px]">Ideas for running technology well.</h2>
          </div>
          <Link href="/blog" className="flex min-h-11 items-center gap-2 self-start text-[15px] font-semibold text-brand hover:text-brand-dark sm:self-auto">
            View all insights <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </Reveal>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((post, i) => (
            <Reveal key={post.slug} delay={i * 100}>
              <BlogCard post={post} compact />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function CtaSection() {
  return (
    <section className="pb-14 lg:pb-20">
      <Container>
        <Reveal variant="zoom">
          <div className="relative overflow-hidden rounded-2xl bg-navy text-white">
            <img src={ctaImage} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
            <div className="relative flex flex-col gap-6 px-7 py-10 lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-14">
              <div className="flex max-w-[560px] flex-col gap-3">
                <h2 className="font-display text-[28px] font-bold leading-tight lg:text-[34px]">Ready to modernise your technology?</h2>
                <p className="text-base leading-relaxed text-slate-mist lg:text-[17px]">
                  Let's discuss how Vertis can help your organisation become more secure, resilient and future ready.
                </p>
              </div>
              <PillLink href="/contact" arrow className="shrink-0" data-testid="button-cta-consultation">
                Start a Conversation
              </PillLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

export default function Home() {
  // Honour /#section links when arriving from another page or a fresh load.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) setTimeout(() => scrollToId(id), 60);
  }, []);

  return (
    <>
      <HeroSection />
      <SolutionsSection />
      <SovereignAiSection />
      <RegionSection />
      <TestimonialsSection />
      <PartnersSection />
      <InsightsSection />
      <CtaSection />
    </>
  );
}
