import { Eye, Target } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container, Eyebrow, H2, PageHero, PillLink } from "@/components/site";

import heroImage from "@assets/stock_images/about-team.jpg";
import cameilleSterlingImg from "@assets/image_1765405458755.png";
import ryanSterlingImg from "@assets/ryan-sterling-2025.png";
import michaelKerrImg from "@assets/michael-kerr-2025.png";
import sanjayStephensImg from "@assets/Photo-_Sanjay_1765405740646.jpeg";
import coleenHibbertImg from "@assets/Vertis_Technology_Headshots-51_1765405778953.jpg";
import cassandraImg from "@assets/cassandra_1765486685263.jpeg";

const values = [
  { title: "Excellence", body: "We strive for excellence in every interaction and solution.", accent: "border-leaf" },
  { title: "Partnership", body: "We build lasting relationships based on trust and transparency.", accent: "border-brand-sky" },
  { title: "Innovation", body: "We continuously evolve to bring the latest technology solutions.", accent: "border-leaf" },
  { title: "Integrity", body: "We conduct business with the highest ethical standards.", accent: "border-brand-sky" },
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

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Your trusted IT partner"
        highlight="in Jamaica."
        body="For over 10 years, Vertis Technology has been empowering businesses across Jamaica and the Caribbean with enterprise-grade IT solutions and exceptional service."
        cta={
          <PillLink href="/contact" arrow>
            Schedule Consultation
          </PillLink>
        }
        image={heroImage}
        imageAlt="Colleagues talking in an open-plan office"
      />

      {/* Mission / vision */}
      <section className="py-14 lg:py-28">
        <Container className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex flex-col gap-4 rounded-3xl bg-mist p-8 lg:p-12">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-tint text-leaf-dark">
              <Target aria-hidden="true" className="h-[26px] w-[26px]" />
            </span>
            <Eyebrow>Our mission</Eyebrow>
            <p className="font-display text-xl font-medium leading-[1.45] lg:text-2xl">
              To deliver exceptional IT services and solutions that enable businesses to achieve their strategic objectives
              through reliable, secure, and innovative technology.
            </p>
          </div>
          <div className="flex flex-col gap-4 rounded-3xl bg-navy p-8 text-white lg:p-12">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-navy-600 text-leaf">
              <Eye aria-hidden="true" className="h-[26px] w-[26px]" />
            </span>
            <Eyebrow dark>Our vision</Eyebrow>
            <p className="font-display text-xl font-medium leading-[1.45] lg:text-2xl">
              To be the leading Managed IT Services provider in the Caribbean, recognized for excellence in technology
              solutions, customer satisfaction, and innovation.
            </p>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="pb-14 lg:pb-28">
        <Container className="flex flex-col gap-10">
          <H2>Our values</H2>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {values.map((v) => (
              <div key={v.title} className={cn("flex flex-col gap-2.5 border-t-[3px] pt-6", v.accent)}>
                <h3 className="font-display text-[22px] font-semibold">{v.title}</h3>
                <p className="text-base leading-normal text-slate">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Team intro */}
      <section id="team" className="bg-mist py-14 lg:py-28">
        <Container className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <div className="flex flex-col gap-4">
            <Eyebrow>Our team</Eyebrow>
            <h2 className="font-display text-4xl font-bold leading-[1.1] tracking-[-0.015em] lg:text-5xl">Over 50 Vertis strong.</h2>
            <dl className="mt-4 flex gap-10">
              <div className="flex flex-col-reverse gap-1">
                <dt className="text-[15px] text-slate">Team members</dt>
                <dd className="font-display text-4xl font-bold text-brand lg:text-[44px]">50+</dd>
              </div>
              <div className="flex flex-col-reverse gap-1">
                <dt className="text-[15px] text-slate">Years combined experience</dt>
                <dd className="font-display text-4xl font-bold text-brand lg:text-[44px]">100+</dd>
              </div>
            </dl>
          </div>
          <p className="text-base leading-[1.75] text-slate lg:text-lg">
            With over 100 years combined experience in the IT field implementing and supporting IT solutions and services
            for medium to large enterprises, we pride ourselves in delivering value service. Our customers are dear to us
            and we ensure that we know their mission and give solutions that achieve the mission well. Our commitment to
            our customers defines how we do business, and our years of experience working across industries underpin the
            vast array of services we offer.
          </p>
        </Container>
      </section>

      {/* Executive team */}
      <section className="py-14 lg:py-28">
        <Container className="flex flex-col gap-10 lg:gap-12">
          <H2>Executive team</H2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-7">
            {executives.map((e) => (
              <article
                key={e.name}
                className="flex flex-col items-center gap-[18px] rounded-3xl bg-mist px-7 pb-8 pt-10 text-center"
                data-testid={`card-executive-${e.name.split(" ")[0].toLowerCase()}`}
              >
                <div className="h-48 w-48 overflow-hidden rounded-full bg-line-photo ring-4 ring-white">
                  <img src={e.image} alt={`Portrait of ${e.name}`} className={cn("h-full w-full object-cover", e.imageClass)} />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-[22px] font-semibold">{e.name}</h3>
                  <div className="text-[15px] font-semibold text-leaf-dark">{e.role}</div>
                </div>
                <p className="text-[15px] leading-[1.65] text-slate">{e.bio}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Leadership */}
      <section className="pb-14 lg:pb-28">
        <Container className="flex flex-col gap-10">
          <h2 className="font-display text-[28px] font-bold leading-tight lg:text-[32px]">Leadership</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-7">
            {leadership.map((t) => (
              <div key={t.name} className="flex flex-col items-center gap-4 rounded-[18px] border border-line px-5 pb-7 pt-8 text-center">
                <div className="h-44 w-44 overflow-hidden rounded-full bg-line-photo">
                  <img src={t.image} alt={`Portrait of ${t.name}`} className={cn("h-full w-full object-cover", t.imageClass)} />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-display text-[19px] font-semibold">{t.name}</h3>
                  <div className="text-[15px] text-slate">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Careers CTA */}
      <section className="pb-14 lg:pb-28">
        <Container>
          <div className="flex flex-col gap-8 rounded-[28px] bg-brand px-7 py-10 text-white lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:px-[72px] lg:py-16">
            <div className="flex max-w-[700px] flex-col gap-3.5">
              <h2 className="font-display text-3xl font-bold leading-tight lg:text-[40px]">Join our growing team</h2>
              <p className="text-base leading-relaxed text-brand-tint lg:text-lg">
                We're building the future of IT services in the Caribbean. Join a team of passionate professionals making a
                real impact.
              </p>
            </div>
            <PillLink href="/careers" variant="white" arrow className="shrink-0">
              View Open Positions
            </PillLink>
          </div>
        </Container>
      </section>
    </>
  );
}
