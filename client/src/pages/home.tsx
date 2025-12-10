import { Link } from "wouter";
import { ArrowRight, Server, Network, Shield, Cloud, Users, CheckCircle, Quote, Target, Eye, Award, Building2, Briefcase, Headphones, Clock, ExternalLink, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { services, partners, testimonials, companyStats, industries } from "@/lib/data";
import { useState, useEffect } from "react";

import heroImage1 from "@assets/stock_images/black_professionals__57cc3629.jpg";
import heroImage2 from "@assets/stock_images/black_professionals__5b030cf6.jpg";
import heroImage3 from "@assets/stock_images/black_professionals__34628ca7.jpg";

const heroImages = [heroImage1, heroImage2, heroImage3];

const serviceIcons: Record<string, typeof Server> = {
  Server, Network, Shield, Cloud, Users
};

function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-[80vh] flex items-center scroll-mt-16 overflow-hidden">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== currentImageIndex}
        >
          <img
            src={image}
            alt={`Technology professionals ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(11,31,58,0.92)] via-[rgba(11,31,58,0.85)] to-[rgba(11,31,58,0.70)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="max-w-3xl">
          <Badge className="mb-6 bg-white/15 text-white border-white/20 backdrop-blur-sm" data-testid="badge-hero">
            Jamaica's Leading IT Partner
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-white" data-testid="text-hero-title">
            Enterprise IT Solutions <br className="hidden sm:block" />
            <span className="text-[#33C3F0]">Built for Growth</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/85 leading-relaxed mb-8 max-w-2xl" data-testid="text-hero-description">
            Vertis Technology delivers comprehensive managed IT services, network infrastructure, cybersecurity, and cloud solutions for medium to large enterprises across Jamaica and the Caribbean.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <Button size="lg" className="gap-2" data-testid="button-hero-consultation">
                Schedule Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#support">
              <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white backdrop-blur-sm" data-testid="button-hero-support">
                Request Support
              </Button>
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentImageIndex ? "bg-white" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            data-testid={`button-hero-slide-${index}`}
          />
        ))}
      </div>
    </section>
  );
}

function StatsSection() {
  return (
    <section className="py-12 border-b bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {companyStats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold text-primary mb-2" data-testid={`text-stat-value-${index}`}>
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground" data-testid={`text-stat-label-${index}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-24 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">About Us</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-about-title">
            Your Trusted IT Partner in Jamaica
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            For over 15 years, Vertis Technology has been empowering businesses across Jamaica and the Caribbean with enterprise-grade IT solutions and exceptional service.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <Card data-testid="card-mission">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To deliver exceptional IT services and solutions that enable businesses to achieve their strategic objectives through reliable, secure, and innovative technology.
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-vision">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading Managed IT Services provider in the Caribbean, recognized for excellence in technology solutions, customer satisfaction, and innovation.
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Award, title: "Excellence", description: "We strive for excellence in every interaction and solution." },
            { icon: Users, title: "Partnership", description: "We build lasting relationships based on trust and transparency." },
            { icon: Target, title: "Innovation", description: "We continuously evolve to bring the latest technology solutions." },
            { icon: Building2, title: "Integrity", description: "We conduct business with the highest ethical standards." }
          ].map((value, index) => (
            <Card key={index} className="text-center" data-testid={`card-value-${index}`}>
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const [expandedService, setExpandedService] = useState<string | null>(null);

  return (
    <section id="services" className="py-20 lg:py-24 bg-card scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Our Services</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-services-title">
            Comprehensive IT Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From managed IT services to cybersecurity, we provide end-to-end technology solutions tailored to your business needs.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const IconComponent = serviceIcons[service.icon] || Server;
            const isExpanded = expandedService === service.id;
            return (
              <Card 
                key={service.id} 
                className={`group transition-all duration-300 ${isExpanded ? 'md:col-span-2 lg:col-span-3' : 'hover-elevate'}`}
                data-testid={`card-service-${service.id}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {isExpanded ? service.description : service.shortDescription}
                      </p>
                      
                      {isExpanded && (
                        <div className="mt-6 space-y-6">
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <Zap className="h-4 w-4 text-primary" />
                              Key Features
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {service.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                              {service.technologies.map((tech, idx) => (
                                <Badge key={idx} variant="secondary">{tech}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-2 -ml-3 mt-2"
                        onClick={() => setExpandedService(isExpanded ? null : service.id)}
                        data-testid={`button-toggle-${service.id}`}
                      >
                        {isExpanded ? 'Show Less' : 'Learn More'}
                        <ArrowRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="secondary" className="mb-4">Industries We Serve</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6" data-testid="text-industries-title">
              Expertise Across Sectors
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We understand that different industries have unique technology requirements and compliance needs. Our team has deep experience serving organizations across multiple sectors.
            </p>
            <Link href="/contact">
              <Button className="gap-2" data-testid="button-discuss-needs">
                Discuss Your Needs
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {industries.map((industry, index) => (
              <Card key={index} className="hover-elevate" data-testid={`card-industry-${index}`}>
                <CardContent className="p-4 flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="font-medium text-sm">{industry}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  return (
    <section id="partners" className="py-20 lg:py-24 bg-card scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Technology Partners</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-partners-title">
            Powered by Industry Leaders
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We partner with the world's leading technology providers to deliver best-in-class solutions for your business.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {partners.map((partner) => (
            <a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-4 sm:p-6 rounded-lg border bg-background hover:border-primary/30 transition-all group hover-elevate min-h-[120px]"
              data-testid={`partner-logo-${partner.id}`}
              title={partner.name}
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className="h-10 w-auto max-w-[80px] object-contain opacity-70 group-hover:opacity-100 transition-opacity"
              />
              <span className="text-xs text-muted-foreground mt-3 group-hover:text-foreground transition-colors text-center">
                {partner.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-testimonials-title">
            Trusted by Leading Organizations
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-visible" data-testid="card-testimonial">
            <CardContent className="p-8 sm:p-12">
              <Quote className="h-10 w-10 text-primary/20 mb-6" />
              <p className="text-lg sm:text-xl leading-relaxed mb-8" data-testid="text-testimonial-quote">
                {testimonials[currentIndex].quote}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                  {testimonials[currentIndex].name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold" data-testid="text-testimonial-name">
                    {testimonials[currentIndex].name}
                  </p>
                  <p className="text-sm text-muted-foreground" data-testid="text-testimonial-role">
                    {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-primary/30"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                data-testid={`button-testimonial-dot-${index}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SupportSection() {
  const supportOptions = [
    {
      icon: Headphones,
      title: "Phone Support",
      description: "Speak directly with our technical support team for urgent issues.",
      action: "Call Now",
      link: "tel:+18769299000"
    },
    {
      icon: Clock,
      title: "Ticket Portal",
      description: "Submit and track support tickets through our Zoho Desk portal.",
      action: "Open Portal",
      link: "https://desk.zoho.com",
      external: true
    }
  ];

  return (
    <section id="support" className="py-20 lg:py-24 bg-card scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Support</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-support-title">
            We're Here to Help
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Need technical assistance? Our support team is available to help you resolve issues quickly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {supportOptions.map((option, index) => (
            <Card key={index} className="text-center" data-testid={`card-support-option-${index}`}>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <option.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{option.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {option.description}
                </p>
                <Button className="gap-2" asChild data-testid={`button-support-${index}`}>
                  <a 
                    href={option.link} 
                    target={option.external ? "_blank" : undefined}
                    rel={option.external ? "noopener noreferrer" : undefined}
                  >
                    {option.action}
                    {option.external && <ExternalLink className="h-4 w-4" />}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhyChooseUsSection() {
  const reasons = [
    "24/7 proactive monitoring and support",
    "Certified engineers with enterprise experience",
    "Transparent pricing with no hidden costs",
    "Fast response times with defined SLAs",
    "Local presence with Caribbean expertise",
    "Strategic partnerships with leading vendors"
  ];

  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="secondary" className="mb-4">Why Choose Us</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6" data-testid="text-why-choose-title">
              Your Technology Partner for Success
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              At Vertis Technology, we understand that reliable IT infrastructure is the backbone of modern business. Our team of certified professionals works tirelessly to ensure your technology empowers your growth.
            </p>
            <ul className="space-y-4">
              {reasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-3" data-testid={`text-reason-${index}`}>
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 p-8">
                {[Server, Network, Shield, Cloud].map((Icon, index) => (
                  <div
                    key={index}
                    className="w-24 h-24 sm:w-32 sm:h-32 rounded-lg bg-background shadow-sm flex items-center justify-center"
                  >
                    <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-primary" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-cta-title">
          Ready to Transform Your IT Infrastructure?
        </h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
          Let's discuss how Vertis Technology can help your organization achieve its technology goals. Schedule a free consultation with our experts today.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="gap-2" data-testid="button-cta-consultation">
              Schedule Consultation
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <a href="#services">
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10" data-testid="button-cta-services">
              Explore Our Services
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <ServicesSection />
      <IndustriesSection />
      <PartnersSection />
      <TestimonialsSection />
      <SupportSection />
      <WhyChooseUsSection />
      <CTASection />
    </>
  );
}
