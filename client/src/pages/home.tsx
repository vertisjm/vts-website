import { Link } from "wouter";
import { ArrowRight, Server, Network, Shield, Cloud, Users, CheckCircle, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { services, partners, testimonials, companyStats } from "@/lib/data";
import { useState, useEffect } from "react";

const serviceIcons: Record<string, typeof Server> = {
  Server, Network, Shield, Cloud, Users
};

function HeroSection() {
  return (
    <section className="relative min-h-[70vh] flex items-center bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 relative">
        <div className="max-w-3xl">
          <Badge variant="secondary" className="mb-6" data-testid="badge-hero">
            Jamaica's Leading IT Partner
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6" data-testid="text-hero-title">
            Enterprise IT Solutions <br className="hidden sm:block" />
            <span className="text-primary">Built for Growth</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8 max-w-2xl" data-testid="text-hero-description">
            Vertis Technology delivers comprehensive managed IT services, network infrastructure, cybersecurity, and cloud solutions for medium to large enterprises across Jamaica and the Caribbean.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <Button size="lg" className="gap-2" data-testid="button-hero-consultation">
                Schedule Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/support">
              <Button variant="outline" size="lg" data-testid="button-hero-support">
                Request Support
              </Button>
            </Link>
          </div>
        </div>
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

function ServicesSection() {
  return (
    <section className="py-20 lg:py-24">
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
            return (
              <Card key={service.id} className="group hover-elevate" data-testid={`card-service-${service.id}`}>
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {service.shortDescription}
                  </p>
                  <Link href={`/services/${service.id}`}>
                    <Button variant="ghost" size="sm" className="gap-2 -ml-3" data-testid={`button-learn-more-${service.id}`}>
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  return (
    <section className="py-20 lg:py-24 bg-card">
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
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center p-4 sm:p-6 rounded-lg border bg-background hover:border-primary/30 transition-colors group"
              data-testid={`partner-logo-${partner.id}`}
            >
              <span className="text-sm sm:text-base font-medium text-muted-foreground group-hover:text-foreground transition-colors text-center">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/partners">
            <Button variant="outline" className="gap-2" data-testid="button-view-all-partners">
              View All Partners
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
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
    <section className="py-20 lg:py-24 bg-card">
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
          <Link href="/services/managed-it">
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10" data-testid="button-cta-services">
              Explore Our Services
            </Button>
          </Link>
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
      <ServicesSection />
      <PartnersSection />
      <TestimonialsSection />
      <WhyChooseUsSection />
      <CTASection />
    </>
  );
}
