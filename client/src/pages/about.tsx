import { useEffect } from "react";
import { BadgeCheck, Cog, Globe2, Handshake, Lightbulb, MapPin, Scale, ShieldCheck, TrendingUp, Waves, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, CountUp, Eyebrow, PageHero, PillLink, Reveal, scrollToId } from "@/components/site";

import heroImage from "@assets/stock_images/about-team.jpg";
import localImage from "@assets/stock_images/jamaica-coastline.jpg";
import ctaImage from "@assets/stock_images/careers-team.jpg";
import cameilleSterlingImg from "@assets/image_1765405458755.png";
import ryanSterlingImg from "@assets/ryan-sterling-2025.png";
import michaelKerrImg from "@assets/michael-kerr-2025.png";
import sanjayStephensImg from "@assets/Photo-_Sanjay_1765405740646.jpeg";
import coleenHibbertImg from "@assets/Vertis_Technology_Headshots-51_1765405778953.jpg";
import cassandraImg from "@assets/cassandra_1765486685263.jpeg";

// Company facts as published on vertisjm.com.
const stats = [
  { value: "10+", label: "Years of experience" },
  { value: "200+", label: "Clients served" },
  { value: "24/7", label: "Support & monitoring" },
  { value: "50+", label: "Team members" },
];

const purpose = [
  { icon: ShieldCheck, title: "Secure", body: "Protect the people, systems and information organisations depend upon." },
  { icon: Cog, title: "Operate", body: "Keep critical technology available, supported and performing." },
  { icon: TrendingUp, title: "Transform", body: "Help organisations modernise and take advantage of new technology." },
];

const reach = [
  { icon: MapPin, label: "Jamaica" },
  { icon: Waves, label: "Caribbean" },
  { icon: Globe2, label: "Global" },
];

const values = [
  { icon: BadgeCheck, title: "Accountability", body: "We take ownership." },
  { icon: Wrench, title: "Expertise", body: "We do technology well." },
  { icon: Handshake, title: "Partnership", body: "We succeed together." },
  { icon: Lightbulb, title: "Innovation", body: "We find a better way." },
  { icon: Scale, title: "Integrity", body: "We do what's right." },
];

// Photos and imageClass crops match the team section on vertisjm.com.
const executives = [
  {
    name: "Ryan Sterling",
    role: "CEO & Head of Business Development",
    image: ryanSterlingImg,
    imageClass: "scale-150 object-[center_35%]",
    bio: "Ryan serves on the Board of Directors. Ryan is responsible for all of the company's worldwide sales and business development, and strategic partnerships.",
  },
  {
    name: "Cameille Sterling",
    role: "Chief Operations Officer",
    image: cameilleSterlingImg,
    imageClass: "object-top",
    bio: "Cameille serves on the Board of Directors. As head of Operations and Marketing, Cameille leads a talented and creative team focused on enabling the success of Vertis Technology teams across the organization.",
  },
  {
    name: "Michael Kerr",
    role: "CTO & Head of Service Delivery",
    image: michaelKerrImg,
    imageClass: "object-top",
    bio: "Michael serves on the Board of Directors. He leads Vertis' Service and Solutions Teams. Michael has a proven ability in adapting and maturing technology organizations to solve business issues while managing costs and risks.",
  },
];

const leadership = [
  { name: "Cassandra-Leigh Masters", role: "Service Delivery Manager", image: cassandraImg, imageClass: "object-[center_35%]" },
  { name: "Sanjay Stephens", role: "Snr Systems Engineer", image: sanjayStephensImg, imageClass: "object-top" },
  { name: "Coleen Hibbert", role: "IT Operations Manager", image: coleenHibbertImg, imageClass: "object-top scale-125" },
];

const h2Cls = "font-display text-3xl font-bold leading-[1.15] tracking-[-0.015em] lg:text-[38px]";

export default function About() {
  // Support links such as /about#team from the footer.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) setTimeout(() => scrollToId(id), 60);
  }, []);

  return (
    <>
      <PageHero
        eyebrow="About Vertis"
        title={
          <>
            Caribbean expertise.
            <br />
            Enterprise capability.
          </>
        }
        body="We help organisations across Jamaica and the Caribbean build, secure and operate the technology they depend on."
        cta={
          <PillLink href="#story" arrow size="md">
            Our Story
          </PillLink>
        }
        image={heroImage}
        imageAlt="Colleagues talking in an open-plan office"
      />

      {/* Story + stats */}
      <section id="story" className="relative overflow-hidden py-14 lg:py-24">
        <div aria-hidden="true" className="pointer-events-none absolute -right-40 top-0 hidden h-full w-[520px] bg-gradient-to-l from-leaf-tint to-transparent lg:block" />
        <Container className="relative flex flex-col gap-10">
          <Reveal className="flex max-w-[640px] flex-col gap-5">
            <h2 className={h2Cls}>Technology is only valuable when it delivers an outcome.</h2>
            <p className="text-base leading-relaxed text-slate lg:text-[17px]">
              Vertis Technology is a Jamaican technology solutions and managed services company, combining local expertise
              with enterprise technology to help organisations solve complex IT challenges – from day-to-day support to
              major transformation projects.
            </p>
          </Reveal>
          <dl className="grid max-w-[760px] grid-cols-2 gap-8 sm:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90} className="flex flex-col-reverse gap-1 border-l-2 border-leaf pl-4">
                <dt className="text-sm text-slate">{s.label}</dt>
                <dd className="font-display text-4xl font-bold text-ink">
                  <CountUp value={s.value} />
                </dd>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Purpose */}
      <section className="pb-14 lg:pb-24">
        <Container className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-3">
            <Eyebrow className="text-slate">Our purpose</Eyebrow>
            <h2 className={h2Cls + " max-w-[560px]"}>Making enterprise technology work for the Caribbean.</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:gap-6">
            {purpose.map((p, i) => (
              <Reveal key={p.title} delay={i * 110} className="lift flex flex-col gap-3 rounded-xl border border-line bg-white p-7">
                <p.icon aria-hidden="true" className="h-9 w-9 text-brand" strokeWidth={1.6} />
                <h3 className="font-display text-lg font-semibold">{p.title}</h3>
                <p className="text-[15px] leading-relaxed text-slate">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Local understanding */}
      <section className="relative overflow-hidden bg-navy text-white">
        <img src={localImage} alt="Aerial view of the Jamaican coastline" className="ken-burns absolute inset-0 h-full w-full object-cover lg:left-auto lg:w-[60%]" />
        <div aria-hidden="true" className="absolute inset-0 bg-navy/80 lg:bg-transparent lg:bg-gradient-to-r lg:from-navy lg:from-[40%] lg:via-navy/70 lg:via-[55%] lg:to-navy/0" />
        <Container className="relative py-16 lg:py-24">
          <Reveal variant="left" className="flex flex-col gap-5">
            <h2 className={h2Cls + " max-w-[480px]"}>
              Local understanding.
              <br />
              Global technology.
            </h2>
            <p className="max-w-[480px] text-base leading-relaxed text-slate-mist lg:text-[17px]">
              We combine deep local knowledge with world-class technology and partnerships to deliver solutions across Jamaica
              and the Caribbean.
            </p>
            <ul className="flex flex-wrap gap-x-8 gap-y-3 pt-2">
              {reach.map((r) => (
                <li key={r.label} className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.14em]">
                  <r.icon aria-hidden="true" className="h-6 w-6 text-brand-sky" strokeWidth={1.6} />
                  {r.label}
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <PillLink href="/contact" arrow size="md">
                Our Approach
              </PillLink>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Values */}
      <section className="py-14 lg:py-20">
        <Container className="flex flex-col gap-8">
          <Eyebrow className="text-slate">Our values</Eyebrow>
          <ul className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 80} className="group flex flex-col items-center gap-2 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-tint transition-transform duration-300 group-hover:-translate-y-1 group-hover:bg-leaf-tint">
                  <v.icon aria-hidden="true" className="h-7 w-7 text-brand transition-colors group-hover:text-leaf-dark" strokeWidth={1.6} />
                </span>
                <h3 className="font-display text-base font-semibold">{v.title}</h3>
                <p className="text-sm text-slate">{v.body}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      {/* Team */}
      <section id="team" className="bg-mist py-14 lg:py-24">
        <Container className="flex flex-col gap-12">
          <div className="grid grid-cols-1 items-end gap-6 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
            <div className="flex flex-col gap-3">
              <Eyebrow className="text-slate">Our team</Eyebrow>
              <h2 className={h2Cls}>Over 50 Vertis strong.</h2>
            </div>
            <p className="text-base leading-relaxed text-slate">
              With over 100 years combined experience in the IT field implementing and supporting IT solutions and services
              for medium to large enterprises, we pride ourselves in delivering value service. Our commitment to our
              customers defines how we do business.
            </p>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-display text-xl font-semibold">Executive team</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {executives.map((e, i) => (
                <Reveal
                  as="article"
                  key={e.name}
                  delay={i * 110}
                  className="lift flex flex-col items-center gap-4 rounded-2xl bg-white px-7 pb-8 pt-9 text-center"
                  data-testid={`card-executive-${e.name.split(" ")[0].toLowerCase()}`}
                >
                  <div className="h-40 w-40 overflow-hidden rounded-full bg-line-photo lg:h-44 lg:w-44">
                    <img src={e.image} alt={`Portrait of ${e.name}`} className={cn("h-full w-full object-cover", e.imageClass)} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-display text-xl font-semibold">{e.name}</h4>
                    <div className="text-sm font-semibold text-brand">{e.role}</div>
                  </div>
                  <p className="text-sm leading-relaxed text-slate">{e.bio}</p>
                </Reveal>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h3 className="font-display text-xl font-semibold">Leadership</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {leadership.map((t, i) => (
                <Reveal key={t.name} delay={i * 110} className="lift flex items-center gap-5 rounded-2xl bg-white p-5">
                  <div className="h-24 w-24 shrink-0 overflow-hidden rounded-full bg-line-photo">
                    <img src={t.image} alt={`Portrait of ${t.name}`} className={cn("h-full w-full object-cover", t.imageClass)} />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h4 className="font-display text-lg font-semibold">{t.name}</h4>
                    <div className="text-sm text-slate">{t.role}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Careers CTA */}
      <section className="py-14 lg:py-20">
        <Container>
          <div className="relative overflow-hidden rounded-2xl bg-navy text-white">
            <img src={ctaImage} alt="" className="absolute inset-0 h-full w-full object-cover lg:left-auto lg:w-1/2" />
            <div aria-hidden="true" className="absolute inset-0 bg-navy/80 lg:bg-transparent lg:bg-gradient-to-r lg:from-navy lg:from-50% lg:to-navy/10" />
            <div className="relative flex max-w-[560px] flex-col gap-4 px-7 py-10 lg:px-14 lg:py-14">
              <h2 className="font-display text-[28px] font-bold leading-tight lg:text-[34px]">Build the future with us.</h2>
              <p className="text-base leading-relaxed text-slate-mist">
                We're always interested in people who are passionate about technology and solving difficult problems.
              </p>
              <div className="mt-2">
                <PillLink href="/careers" arrow size="md">
                  Explore Careers
                </PillLink>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
