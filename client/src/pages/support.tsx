import { Link } from "wouter";
import { ArrowRight, Headphones, Clock, Shield, MessageCircle, ChevronDown, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

function HeroSection() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Badge variant="secondary" className="mb-6">Support Portal</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6" data-testid="text-support-title">
            We're Here to <span className="text-primary">Help</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8" data-testid="text-support-description">
            Need technical assistance? Our support team is available to help you resolve issues quickly and get your business back on track.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="gap-2" asChild data-testid="button-submit-ticket">
              <a href="https://desk.zoho.com" target="_blank" rel="noopener noreferrer">
                Submit a Ticket
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
            <Link href="/contact">
              <Button variant="outline" size="lg" data-testid="button-contact-sales">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function SupportOptionsSection() {
  const options = [
    {
      icon: Headphones,
      title: "Phone Support",
      description: "Speak directly with our technical support team for urgent issues.",
      action: "Call Now",
      link: "tel:+18769299000",
      external: false
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Chat with our support representatives in real-time during business hours.",
      action: "Start Chat",
      link: "#zoho-chat",
      external: false
    },
    {
      icon: Shield,
      title: "Ticket Portal",
      description: "Submit and track support tickets through our Zoho Desk portal.",
      action: "Open Portal",
      link: "https://desk.zoho.com",
      external: true
    }
  ];

  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Support Channels</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-channels-title">
            Multiple Ways to Reach Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Choose the support channel that works best for your situation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {options.map((option, index) => (
            <Card key={index} className="text-center" data-testid={`card-support-option-${index}`}>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <option.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{option.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {option.description}
                </p>
                {option.external ? (
                  <Button className="gap-2" asChild data-testid={`button-option-${index}`}>
                    <a href={option.link} target="_blank" rel="noopener noreferrer">
                      {option.action}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                ) : (
                  <Button asChild data-testid={`button-option-${index}`}>
                    <a href={option.link}>{option.action}</a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function SLASection() {
  const slaItems = [
    {
      priority: "Critical",
      description: "Complete system outage or major security incident",
      response: "< 1 Hour",
      resolution: "< 4 Hours"
    },
    {
      priority: "High",
      description: "Significant degradation affecting business operations",
      response: "< 2 Hours",
      resolution: "< 8 Hours"
    },
    {
      priority: "Medium",
      description: "Non-critical issue affecting productivity",
      response: "< 4 Hours",
      resolution: "< 24 Hours"
    },
    {
      priority: "Low",
      description: "General inquiries or minor issues",
      response: "< 8 Hours",
      resolution: "< 48 Hours"
    }
  ];

  return (
    <section className="py-20 lg:py-24 bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">Service Level Agreement</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-sla-title">
            Our Response Commitments
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're committed to resolving your issues quickly with defined response and resolution times.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {slaItems.map((item, index) => (
            <Card key={index} data-testid={`card-sla-${index}`}>
              <CardHeader className="pb-3">
                <Badge 
                  variant={
                    item.priority === "Critical" ? "destructive" :
                    item.priority === "High" ? "default" : "secondary"
                  }
                  className="w-fit"
                >
                  {item.priority}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {item.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Response:</span>
                    <span className="font-medium">{item.response}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Resolution:</span>
                    <span className="font-medium">{item.resolution}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const faqs = [
    {
      question: "How do I submit a support ticket?",
      answer: "You can submit a support ticket through our Zoho Desk portal by clicking the 'Submit a Ticket' button. You'll need to provide your contact information, describe the issue, and select a priority level. Our team will respond based on our SLA commitments."
    },
    {
      question: "What are your support hours?",
      answer: "Our standard support hours are Monday through Friday, 8:00 AM to 5:00 PM EST. For managed services clients, we provide 24/7 emergency support for critical issues. Weekend support is available for emergency situations only."
    },
    {
      question: "How do I check the status of my ticket?",
      answer: "You can log into the Zoho Desk portal to view the status of all your tickets. You'll also receive email notifications when there are updates to your tickets."
    },
    {
      question: "What qualifies as a critical issue?",
      answer: "Critical issues include complete system outages, major security incidents (such as active breaches), or any situation that completely prevents your organization from conducting business. These receive our highest priority response."
    },
    {
      question: "Can I upgrade my support plan?",
      answer: "Yes, we offer various support tiers to meet different business needs. Contact our sales team to discuss upgrading your current plan to include extended hours, faster response times, or dedicated support resources."
    },
    {
      question: "Do you provide remote support?",
      answer: "Yes, most issues can be resolved remotely through our secure remote access tools. For hardware issues or complex installations, we can dispatch technicians to your location."
    }
  ];

  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">FAQ</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-faq-title">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find quick answers to common support questions.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card rounded-lg border px-6"
                data-testid={`accordion-faq-${index}`}
              >
                <AccordionTrigger className="text-left hover:no-underline py-6">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-support-cta-title">
          Need Immediate Assistance?
        </h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
          Our support team is standing by to help. Submit a ticket or call us directly for urgent issues.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" variant="secondary" className="gap-2" asChild data-testid="button-cta-ticket">
            <a href="https://desk.zoho.com" target="_blank" rel="noopener noreferrer">
              Submit a Ticket
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10" asChild data-testid="button-cta-call">
            <a href="tel:+18769299000">
              Call +1 (876) 929-9000
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function Support() {
  return (
    <>
      <HeroSection />
      <SupportOptionsSection />
      <SLASection />
      <FAQSection />
      <CTASection />
      
      {/* Zoho CRM Chat Widget Placeholder */}
      <div id="zoho-chat" className="hidden">
        {/* 
          ZOHO CRM CHAT WIDGET INTEGRATION
          
          To enable the Zoho CRM chat widget, add the following script to your HTML:
          
          <script type="text/javascript">
            var $zoho = $zoho || {};
            $zoho.salesiq = $zoho.salesiq || {
              widgetcode: "YOUR_WIDGET_CODE_HERE",
              values: {},
              ready: function() {}
            };
            var d = document;
            s = d.createElement("script");
            s.type = "text/javascript";
            s.id = "zsiqscript";
            s.defer = true;
            s.src = "https://salesiq.zoho.com/widget";
            t = d.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(s, t);
          </script>
          
          Replace YOUR_WIDGET_CODE_HERE with your actual Zoho SalesIQ widget code.
        */}
      </div>
    </>
  );
}
