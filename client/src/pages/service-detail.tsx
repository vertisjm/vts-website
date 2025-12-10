import { Link, useParams } from "wouter";
import { ArrowRight, ArrowLeft, CheckCircle, Server, Network, Shield, Cloud, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { services } from "@/lib/data";

const serviceIcons: Record<string, typeof Server> = {
  Server, Network, Shield, Cloud, Users
};

function NotFoundState() {
  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl font-bold mb-4">Service Not Found</h1>
        <p className="text-muted-foreground mb-8">The service you're looking for doesn't exist.</p>
        <Link href="/">
          <Button className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    </section>
  );
}

export default function ServiceDetail() {
  const { id } = useParams<{ id: string }>();
  const service = services.find(s => s.id === id);

  if (!service) {
    return <NotFoundState />;
  }

  const IconComponent = serviceIcons[service.icon] || Server;
  const otherServices = services.filter(s => s.id !== service.id).slice(0, 3);

  return (
    <>
      <section className="py-20 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors" data-testid="link-back-home">
            <ArrowLeft className="h-4 w-4" />
            Back to Services
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge variant="secondary" className="mb-6">{service.title}</Badge>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6" data-testid="text-service-title">
                {service.title}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed mb-8" data-testid="text-service-description">
                {service.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="gap-2" data-testid="button-service-contact">
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/support">
                  <Button variant="outline" size="lg" data-testid="button-service-support">
                    Request Support
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <IconComponent className="h-32 w-32 text-primary" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">Service Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-features-title">
              What's Included
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.features.map((feature, index) => (
              <Card key={index} className="hover-elevate" data-testid={`card-feature-${index}`}>
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <p className="font-medium">{feature}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <Badge variant="secondary" className="mb-4">Benefits</Badge>
              <h2 className="text-3xl font-bold tracking-tight mb-8" data-testid="text-benefits-title">
                Business Benefits
              </h2>
              <ul className="space-y-4">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3" data-testid={`text-benefit-${index}`}>
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <Badge variant="secondary" className="mb-4">Technologies</Badge>
              <h2 className="text-3xl font-bold tracking-tight mb-8" data-testid="text-technologies-title">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-3">
                {service.technologies.map((tech, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="px-4 py-2 text-sm"
                    data-testid={`badge-technology-${index}`}
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
              <p className="text-muted-foreground mt-6 leading-relaxed">
                We leverage industry-leading technologies and maintain strategic partnerships with the world's top technology vendors to deliver exceptional solutions for your business.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">Related Services</Badge>
            <h2 className="text-3xl font-bold tracking-tight mb-4" data-testid="text-related-title">
              Explore Other Services
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((relatedService) => {
              const RelatedIcon = serviceIcons[relatedService.icon] || Server;
              return (
                <Card key={relatedService.id} className="group hover-elevate" data-testid={`card-related-${relatedService.id}`}>
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <RelatedIcon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-3">{relatedService.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed text-sm">
                      {relatedService.shortDescription}
                    </p>
                    <Link href={`/services/${relatedService.id}`}>
                      <Button variant="ghost" size="sm" className="gap-2 -ml-3" data-testid={`button-related-${relatedService.id}`}>
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

      <section className="py-20 lg:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-service-cta-title">
            Ready to Get Started?
          </h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
            Let's discuss how our {service.title.toLowerCase()} can help transform your business operations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="gap-2" data-testid="button-service-cta-contact">
                Schedule Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/support">
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground/30 hover:bg-primary-foreground/10" data-testid="button-service-cta-support">
                Request Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
