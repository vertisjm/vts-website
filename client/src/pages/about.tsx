import { Link } from "wouter";
import { ArrowRight, Target, Eye, Award, Users, Building2, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { industries, companyStats } from "@/lib/data";

function HeroSection() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Badge variant="secondary" className="mb-6">About Us</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6" data-testid="text-about-title">
            Your Trusted IT Partner in <span className="text-primary">Jamaica</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed" data-testid="text-about-description">
            For over 15 years, Vertis Technology has been empowering businesses across Jamaica and the Caribbean with enterprise-grade IT solutions and exceptional service.
          </p>
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
              <p className="text-3xl sm:text-4xl font-bold text-primary mb-2" data-testid={`text-about-stat-value-${index}`}>
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground" data-testid={`text-about-stat-label-${index}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MissionVisionSection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Card data-testid="card-mission">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Target className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To deliver exceptional IT services and solutions that enable businesses to achieve their strategic objectives through reliable, secure, and innovative technology. We are committed to building lasting partnerships with our clients by providing proactive support, expert guidance, and measurable results.
              </p>
            </CardContent>
          </Card>

          <Card data-testid="card-vision">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="h-7 w-7 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                To be the leading Managed IT Services provider in the Caribbean, recognized for excellence in technology solutions, customer satisfaction, and innovation. We envision a future where every organization has access to enterprise-grade IT capabilities that drive growth and competitive advantage.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function ValuesSection() {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for excellence in every interaction, project, and solution we deliver to our clients."
    },
    {
      icon: Users,
      title: "Partnership",
      description: "We build lasting relationships based on trust, transparency, and mutual success with our clients."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "We continuously evolve our capabilities to bring the latest technology solutions to our clients."
    },
    {
      icon: Building2,
      title: "Integrity",
      description: "We conduct our business with the highest ethical standards, honesty, and accountability."
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Our Values</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-values-title">
            What Drives Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our core values guide every decision we make and every solution we deliver.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <Card key={index} className="text-center" data-testid={`card-value-${index}`}>
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          ))}
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
              We understand that different industries have unique technology requirements and compliance needs. Our team has deep experience serving organizations across multiple sectors, bringing industry-specific knowledge to every engagement.
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

function WhyChooseSection() {
  const reasons = [
    {
      title: "Local Expertise",
      description: "Based in Jamaica with deep understanding of the Caribbean business landscape and regulatory environment."
    },
    {
      title: "Enterprise Experience",
      description: "Our team has managed IT infrastructure for some of the largest organizations in the region."
    },
    {
      title: "Proactive Approach",
      description: "We identify and resolve issues before they impact your business operations."
    },
    {
      title: "Strategic Partnerships",
      description: "Direct relationships with leading technology vendors ensure access to the best solutions and support."
    },
    {
      title: "Transparent Pricing",
      description: "Clear, predictable costs with no hidden fees or surprise charges."
    },
    {
      title: "Rapid Response",
      description: "Defined SLAs with guaranteed response times for all support requests."
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Why Vertis</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-why-vertis-title">
            Why Customers Choose Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover what sets Vertis Technology apart as your trusted IT partner.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, index) => (
            <Card key={index} data-testid={`card-reason-${index}`}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-3">{reason.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {reason.description}
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
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-about-cta-title">
          Ready to Partner with Us?
        </h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
          Let's discuss how Vertis Technology can help your organization achieve its technology goals.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/contact">
            <Button size="lg" variant="secondary" className="gap-2" data-testid="button-about-cta-contact">
              Contact Us Today
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/services/managed-it">
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10" data-testid="button-about-cta-services">
              Explore Our Services
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function About() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <MissionVisionSection />
      <ValuesSection />
      <IndustriesSection />
      <WhyChooseSection />
      <CTASection />
    </>
  );
}
