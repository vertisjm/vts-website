import { Link } from "wouter";
import { ArrowRight, Handshake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { partners } from "@/lib/data";

function HeroSection() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Badge variant="secondary" className="mb-6">Technology Partners</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6" data-testid="text-partners-title">
            Powered by <span className="text-primary">Industry Leaders</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed" data-testid="text-partners-description">
            We maintain strategic partnerships with the world's leading technology vendors to deliver best-in-class solutions and exceptional support for your business.
          </p>
        </div>
      </div>
    </section>
  );
}

function PartnersGridSection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {partners.map((partner) => (
            <Card key={partner.id} className="group hover-elevate" data-testid={`card-partner-${partner.id}`}>
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                  <span className="text-lg font-bold text-muted-foreground group-hover:text-primary transition-colors">
                    {partner.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{partner.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {partner.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  const benefits = [
    {
      title: "Direct Access",
      description: "Our partnerships provide direct access to vendor resources, ensuring faster resolution of complex issues."
    },
    {
      title: "Competitive Pricing",
      description: "Partner relationships enable us to offer competitive pricing on hardware, software, and licensing."
    },
    {
      title: "Expert Training",
      description: "Our team receives ongoing training and certification from our technology partners."
    },
    {
      title: "Early Adoption",
      description: "We have access to new technologies and solutions before they're widely available in the market."
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Partner Benefits</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-benefits-title">
            What Our Partnerships Mean for You
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our strategic partnerships translate directly into better solutions and service for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card key={index} data-testid={`card-benefit-${index}`}>
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Handshake className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-partners-cta-title">
          Leverage Our Partner Ecosystem
        </h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
          Contact us to learn how our technology partnerships can benefit your organization with better solutions and pricing.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="gap-2" data-testid="button-partners-cta-contact">
              Contact Us
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/services/managed-it">
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10" data-testid="button-partners-cta-services">
              Explore Our Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Partners() {
  return (
    <>
      <HeroSection />
      <PartnersGridSection />
      <BenefitsSection />
      <CTASection />
    </>
  );
}
