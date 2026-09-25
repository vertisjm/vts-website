import { useEffect, useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Check, Cloud, Code, Network, Phone, RotateCcw, Server, Shield, Ticket, UserPlus } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { services, partners, testimonials as fallbackTestimonials, companyStats, industries } from "@/lib/data";
import type { Service, TestimonialRecord } from "@shared/schema";
import { Container, Eyebrow, FanMark, H2, IconBadge, PillLink, SUPPORT_PORTAL_URL, contact, scrollToId } from "@/components/site";

import heroImage from "@assets/stock_images/hero-it-server-room.jpg";
import industriesImage from "@assets/stock_images/industries-meeting.jpg";

const serviceIcons: Record<string, typeof Server> = {
  Server,
  Network,
  Shield,
  Cloud,
  Code,
  Users: UserPlus,
  RotateCcw,
};

const whyChooseUs = [
  "24/7 proactive monitoring and support",
  "Certified engineers with enterprise experience",
  "Transparent pricing with no hidden costs",
  "Fast response times with defined SLAs",
  "Local presence with Caribbean expertise",
  "Strategic partnerships with leading vendors",
];

// Drop a licensed photo of the Kingston skyline at night at client/public/images/kingston-skyline-night.jpg
// (landscape, at least 2400px wide). Until it exists the hero falls back to the navy background and logo mark.
const HERO_BACKGROUND = "/images/kingston-skyline-night.jpg";

function HeroSection() {
  const [hasBackground, setHasBackground] = useState(false);

  return (
    <section id="hero" className="relative overflow-hidden bg-navy text-white">
      <img
        src={HERO_BACKGROUND}
        alt=""
        aria-hidden="true"
        onLoad={() => setHasBackground(true)}
        onError={() => setHasBackground(false)}
        className={"pointer-events-none absolute inset-0 h-full w-full object-cover " + (hasBackground ? "" : "hidden")}
      />
      {hasBackground ? (
        // Keeps the headline readable: darkest on the left behind the text, lighter on the right.
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-navy/80 lg:bg-transparent lg:bg-gradient-to-r lg:from-navy lg:via-navy/85 lg:to-navy/40" />
      ) : (
        <FanMark className="pointer-events-none absolute -right-36 -top-10 w-[360px] opacity-[0.14] lg:-right-[120px] lg:w-[760px]" />
      )}
      <Container className="relative flex flex-col gap-12 pb-14 pt-12 lg:flex-row lg:items-center lg:gap-16 lg:pb-[72px] lg:pt-24">
        <div className="flex flex-1 flex-col gap-6 lg:gap-7">
          <Eyebrow dark rule>
            Jamaica's leading IT partner
          </Eyebrow>
          <h1
            className="font-display text-[38px] font-bold leading-[1.06] tracking-[-0.02em] sm:text-5xl lg:text-[68px] lg:leading-[1.04]"
            data-testid="text-hero-title"
          >
            Enterprise IT solutions <span className="text-leaf">built for growth.</span>
          </h1>
          <p className="max-w-[600px] text-[17px] leading-relaxed text-slate-mist lg:text-xl" data-testid="text-hero-description">
            Vertis Technology delivers comprehensive managed IT services, network infrastructure, cybersecurity, and cloud
            solutions for medium to large enterprises across Jamaica and the Caribbean.
          </p>
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <PillLink href="/contact" arrow data-testid="button-hero-consultation">
              Schedule Consultation
            </PillLink>
            <PillLink href="/#support" variant="outline-dark" data-testid="button-hero-support">
              Request Support
            </PillLink>
          </div>
        </div>
        <div className="relative h-[300px] overflow-hidden rounded-[24px_24px_24px_120px] sm:h-[400px] lg:h-[480px] lg:w-[560px] lg:shrink-0">
          <img src={heroImage} alt="IT professional working on a laptop in a server room" className="absolute inset-0 h-full w-full object-cover" />
        </div>
      </Container>
      <Container className="relative">
        <dl className="grid grid-cols-2 border-t border-navy-line lg:grid-cols-4">
          {companyStats.map((stat, i) => (
            <div
              key={stat.label}
              className={
                "flex flex-col-reverse gap-1 border-navy-line pb-6 pt-6 lg:pb-10 lg:pt-8 " +
                ["pr-4", "border-l pl-4 lg:pl-6", "lg:border-l lg:pl-6", "border-l pl-4 lg:pl-6"][i]
              }
            >
              <dt className="text-sm text-slate-pale lg:text-[15px]">{stat.label}</dt>
              <dd className="font-display text-3xl font-bold text-leaf lg:text-[40px]">
                {stat.value}
                {stat.suffix}
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

function ServiceDetails({ service, open, onOpenChange }: { service: Service | null; open: boolean; onOpenChange: (o: boolean) => void }) {
  if (!service) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-3xl border-line bg-white p-8 sm:p-10">
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
            Talk to us about {service.title.replace(/ \(.*\)$/, "")}
          </PillLink>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ServicesSection() {
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <section id="services" className="bg-mist py-14 lg:py-28">
      <Container className="flex flex-col gap-8 lg:gap-12">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between lg:gap-12">
          <div className="flex flex-col gap-3.5">
            <Eyebrow>Our services</Eyebrow>
            <H2>Comprehensive IT solutions</H2>
          </div>
          <p className="max-w-[520px] text-base leading-relaxed text-slate lg:text-lg">
            From managed IT services to cybersecurity, we provide end-to-end technology solutions tailored to your
            business needs.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
          {services.map((service) => {
            const Icon = serviceIcons[service.icon] ?? Server;
            const hasDetails = Boolean(service.description);
            const body = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-navy text-leaf sm:h-[52px] sm:w-[52px]">
                  <Icon aria-hidden="true" className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
                </span>
                <span className="flex flex-1 flex-col gap-1 sm:gap-3.5">
                  <span className="font-display text-base font-semibold leading-snug sm:text-[19px]">{service.title}</span>
                  <span className="text-sm leading-normal text-slate sm:flex-1 sm:text-[15px]">{service.shortDescription}</span>
                  <span className="hidden items-center gap-1.5 text-sm font-semibold text-brand sm:flex">
                    {hasDetails ? "Learn More" : "Ask Us About It"} <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </span>
                </span>
              </>
            );
            const cls =
              "group flex items-center gap-4 rounded-2xl border border-line bg-white p-4 text-left text-ink transition-shadow hover:shadow-[0_12px_32px_rgba(10,27,46,0.08)] sm:min-h-[250px] sm:flex-col sm:items-start sm:gap-3.5 sm:rounded-[18px] sm:p-7";
            return hasDetails ? (
              <button key={service.id} id={service.id} type="button" className={cls} onClick={() => setSelected(service)} data-testid={`card-service-${service.id}`}>
                {body}
              </button>
            ) : (
              <Link key={service.id} id={service.id} href="/contact" className={cls} data-testid={`card-service-${service.id}`}>
                {body}
              </Link>
            );
          })}
          <Link
            href="/contact"
            className="flex flex-col justify-between gap-3.5 rounded-2xl bg-brand p-6 text-white transition-colors hover:bg-brand-dark sm:min-h-[250px] sm:rounded-[18px] sm:p-7"
          >
            <span className="font-display text-[22px] font-semibold leading-snug">Not sure where to start?</span>
            <span className="text-[15px] leading-normal text-brand-tint">Schedule a free consultation with our experts.</span>
            <span className="flex items-center gap-1.5 text-[15px] font-semibold">
              Schedule Consultation <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
            </span>
          </Link>
        </div>
      </Container>
      <ServiceDetails service={selected} open={selected !== null} onOpenChange={(o) => !o && setSelected(null)} />
    </section>
  );
}

function IndustriesSection() {
  return (
    <section id="industries" className="bg-navy py-14 text-white lg:py-28">
      <Container className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-20">
        <div className="relative hidden h-[440px] w-[600px] shrink-0 overflow-hidden rounded-[20px] lg:block">
          <img src={industriesImage} alt="Business team meeting around a table with laptops" className="absolute inset-0 h-full w-full object-cover" />
        </div>
        <div className="flex flex-1 flex-col gap-5 lg:gap-6">
          <Eyebrow dark>Industries we serve</Eyebrow>
          <H2>Expertise across sectors</H2>
          <p className="text-base leading-relaxed text-slate-mist lg:text-lg">
            We understand that different industries have unique technology requirements and compliance needs. Our team
            has deep experience serving organizations across multiple sectors.
          </p>
          <ul className="flex flex-wrap gap-2 sm:grid sm:grid-cols-2 sm:gap-2.5">
            {industries.map((industry) => (
              <li key={industry} className="rounded-full bg-navy-600 px-3.5 py-2 text-sm sm:rounded-xl sm:px-4 sm:py-3 sm:text-[15px]">
                {industry}
              </li>
            ))}
          </ul>
          <div className="mt-2">
            <PillLink href="/contact" variant="leaf" arrow data-testid="button-discuss-needs">
              Discuss Your Needs
            </PillLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

function WhyAndTestimonialSection() {
  const { data: dbTestimonials } = useQuery<TestimonialRecord[]>({ queryKey: ["/api/testimonials"] });
  const items = dbTestimonials && dbTestimonials.length > 0 ? dbTestimonials : fallbackTestimonials;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % items.length), 8000);
    return () => clearInterval(id);
  }, [items.length]);

  const t = items[index % items.length];

  return (
    <section className="py-14 lg:py-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-[72px]">
        <div className="flex flex-col gap-5 lg:gap-[22px]">
          <Eyebrow>Why choose us</Eyebrow>
          <H2>Your technology partner for success</H2>
          <p className="text-base leading-relaxed text-slate lg:text-lg">
            At Vertis Technology, we understand that reliable IT infrastructure is the backbone of modern business. Our
            team of certified professionals works tirelessly to ensure your technology empowers your growth.
          </p>
          <ul className="mt-1.5 grid grid-cols-1 gap-x-7 gap-y-3.5 sm:grid-cols-2">
            {whyChooseUs.map((item) => (
              <li key={item} className="flex items-start gap-3 text-base leading-snug">
                <span className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-leaf-tint text-leaf-dark">
                  <Check aria-hidden="true" className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        {t && (
          <figure className="relative m-0 flex flex-col gap-7 rounded-[28px] bg-mist px-7 pb-10 pt-12 sm:px-12 sm:pb-11 sm:pt-14" data-testid="card-testimonial">
            <svg aria-hidden="true" width="56" height="44" viewBox="0 0 56 44" className="text-leaf">
              <path d="M0 44V26C0 11 8 2 22 0l2 6c-8 2-12 8-12 14h10v24zm32 0V26c0-15 8-24 22-26l2 6c-8 2-12 8-12 14h10v24z" fill="currentColor" />
            </svg>
            <blockquote className="m-0 font-display text-lg font-medium leading-normal text-ink sm:text-[22px]" data-testid="text-testimonial-quote">
              {t.quote}
            </blockquote>
            <figcaption className="flex flex-col gap-1 border-t border-line pt-5">
              <span className="text-[17px] font-semibold">{t.name}</span>
              <span className="text-[15px] text-slate">
                {t.role}, {t.company}
              </span>
            </figcaption>
            {items.length > 1 && (
              <div className="flex gap-2" role="group" aria-label="Choose testimonial">
                {items.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show testimonial ${i + 1} of ${items.length}`}
                    aria-pressed={i === index}
                    className="flex h-11 w-11 items-center justify-center"
                  >
                    <span className={"block h-2.5 rounded-full transition-all " + (i === index ? "w-6 bg-brand" : "w-2.5 bg-line-strong")} />
                  </button>
                ))}
              </div>
            )}
          </figure>
        )}
      </Container>
    </section>
  );
}

function PartnersSection() {
  return (
    <section id="partners" className="bg-mist py-14 lg:py-24">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col items-center gap-3 text-center">
          <Eyebrow>Technology partners</Eyebrow>
          <h2 className="font-display text-3xl font-bold leading-tight lg:text-4xl">Powered by industry leaders</h2>
          <p className="text-base text-slate lg:text-[17px]">
            We partner with the world's leading technology providers to deliver best-in-class solutions for your business.
          </p>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
          {partners.map((p) => (
            <li key={p.id}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                title={p.description}
                className="flex h-[72px] items-center justify-center rounded-[14px] border border-line bg-white px-3 text-center font-display text-base font-semibold text-slate transition-colors hover:border-brand hover:text-brand lg:h-[84px] lg:text-lg"
              >
                {p.name}
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function SupportSection() {
  return (
    <section id="support" className="py-14 lg:py-28">
      <Container className="grid grid-cols-1 gap-5 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div className="flex flex-col gap-4 rounded-[22px] bg-brand px-6 py-8 text-white sm:rounded-3xl sm:p-12">
          <h2 className="font-display text-[26px] font-bold leading-tight sm:text-[34px]">Ready to transform your IT infrastructure?</h2>
          <p className="text-base leading-relaxed text-brand-tint sm:text-[17px]">
            Let's discuss how Vertis Technology can help your organization achieve its technology goals. Schedule a free
            consultation with our experts today.
          </p>
          <div className="mt-2">
            <PillLink href="/contact" variant="white" className="w-full sm:w-auto" data-testid="button-cta-consultation">
              Schedule Consultation
            </PillLink>
          </div>
        </div>
        <div className="flex flex-col gap-3.5 rounded-3xl border border-line bg-mist p-8 sm:p-10">
          <IconBadge>
            <Phone aria-hidden="true" className="h-[22px] w-[22px]" />
          </IconBadge>
          <h3 className="font-display text-[21px] font-semibold">Phone Support</h3>
          <p className="flex-1 text-[15px] leading-normal text-slate">Speak directly with our technical support team for urgent issues.</p>
          <a href={contact.phones[0].href} className="text-base font-semibold text-brand hover:text-brand-dark">
            Call {contact.phones[0].label} →
          </a>
        </div>
        <div className="flex flex-col gap-3.5 rounded-3xl border border-line bg-mist p-8 sm:p-10">
          <IconBadge>
            <Ticket aria-hidden="true" className="h-[22px] w-[22px]" />
          </IconBadge>
          <h3 className="font-display text-[21px] font-semibold">Ticket Portal</h3>
          <p className="flex-1 text-[15px] leading-normal text-slate">Submit and track support tickets through our Zoho Desk portal.</p>
          <a href={SUPPORT_PORTAL_URL} className="text-base font-semibold text-brand hover:text-brand-dark">
            Open Portal →
          </a>
        </div>
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
      <ServicesSection />
      <IndustriesSection />
      <WhyAndTestimonialSection />
      <PartnersSection />
      <SupportSection />
    </>
  );
}
