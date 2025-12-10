import { Link } from "wouter";
import { ArrowRight, Briefcase, Users, Lightbulb, Heart, ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function HeroSection() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Badge variant="secondary" className="mb-6">Careers</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6" data-testid="text-careers-title">
            Join Our <span className="text-primary">Growing Team</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8" data-testid="text-careers-description">
            At Vertis Technology, we're building the future of IT services in the Caribbean. Join a team of passionate professionals making a real impact for businesses across the region.
          </p>
          <Button size="lg" className="gap-2" asChild data-testid="button-view-positions">
            <a href="https://recruit.zoho.com" target="_blank" rel="noopener noreferrer">
              View Open Positions
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

function WhyJoinSection() {
  const reasons = [
    {
      icon: Users,
      title: "Collaborative Culture",
      description: "Work alongside talented professionals in a supportive environment that values teamwork and knowledge sharing."
    },
    {
      icon: Lightbulb,
      title: "Continuous Learning",
      description: "Access to certifications, training programs, and hands-on experience with leading technologies."
    },
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "Flexible work arrangements and competitive benefits that support your personal and professional goals."
    },
    {
      icon: Briefcase,
      title: "Career Growth",
      description: "Clear paths for advancement with mentorship from industry veterans and leadership opportunities."
    }
  ];

  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Why Join Us</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-why-join-title">
            More Than Just a Job
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We invest in our people because we know they're the foundation of our success.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, index) => (
            <Card key={index} className="text-center" data-testid={`card-reason-${index}`}>
              <CardContent className="p-6">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <reason.icon className="h-7 w-7 text-primary" />
                </div>
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

function BenefitsSection() {
  const benefits = [
    "Competitive salary and performance bonuses",
    "Comprehensive health insurance",
    "Paid vacation and sick leave",
    "Professional development budget",
    "Industry certifications sponsorship",
    "Flexible work arrangements",
    "Modern equipment and tools",
    "Team building events and activities"
  ];

  return (
    <section className="py-20 lg:py-24 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="secondary" className="mb-4">Benefits</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6" data-testid="text-benefits-title">
              What We Offer
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We believe in taking care of our team with competitive compensation and benefits that support your growth and wellbeing.
            </p>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3" data-testid={`text-benefit-${index}`}>
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <div className="text-center p-8">
                <Users className="h-24 w-24 text-primary mx-auto mb-6" />
                <p className="text-2xl font-bold mb-2">Join Our Team</p>
                <p className="text-muted-foreground">Be part of something great</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function OpenPositionsSection() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Open Positions</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-positions-title">
            Current Opportunities
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our current openings and find your next career opportunity at Vertis Technology.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto" data-testid="card-job-portal">
          <CardContent className="p-8 text-center">
            <Briefcase className="h-16 w-16 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">View All Open Positions</h3>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Our job board is powered by Zoho Recruit. Click below to explore current openings, learn more about each role, and submit your application.
            </p>
            <Button size="lg" className="gap-2" asChild data-testid="button-job-portal">
              <a href="https://recruit.zoho.com" target="_blank" rel="noopener noreferrer">
                View Open Positions
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <p className="text-sm text-muted-foreground mt-6">
              Don't see a role that fits? Send your resume to{" "}
              <a href="mailto:careers@vertisjm.com" className="text-primary hover:underline">
                careers@vertisjm.com
              </a>
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-careers-cta-title">
          Ready to Make an Impact?
        </h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
          Join Vertis Technology and help shape the future of IT services in the Caribbean. Your next chapter starts here.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="secondary" className="gap-2" asChild data-testid="button-cta-apply">
            <a href="https://recruit.zoho.com" target="_blank" rel="noopener noreferrer">
              Apply Now
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Link href="/contact">
            <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10" data-testid="button-cta-contact">
              Contact Us
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Careers() {
  return (
    <>
      <HeroSection />
      <WhyJoinSection />
      <BenefitsSection />
      <OpenPositionsSection />
      <CTASection />
    </>
  );
}
