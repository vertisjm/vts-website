import { useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

function HeroSection() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <Badge variant="secondary" className="mb-6">Contact Us</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6" data-testid="text-contact-title">
            Let's Start a <span className="text-primary">Conversation</span>
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed" data-testid="text-contact-description">
            Whether you need IT support, want to discuss a project, or simply have questions, we're here to help. Reach out and let's explore how we can support your business.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactFormSection() {
  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'formScript1691948000001924023';
    script.src = 'https://crm.zoho.com/crm/WebFormServeServlet?rid=7ebbaac1113935ccd84ee73bc0e27316545dcbcbf4ddd34233ef44e98569162351d1535ae282784b8bef9129c0892349gidffd7dbb1408e7f3dd2f7041ffcee60768639875ddfa4f216077e022ee5c43a50&script=$sYG';
    script.async = true;

    if (formContainerRef.current) {
      formContainerRef.current.appendChild(script);
    }

    return () => {
      if (formContainerRef.current && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <Card data-testid="card-contact-form">
      <CardContent className="p-8">
        <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
        <div ref={formContainerRef} data-testid="zoho-form-container" className="zoho-crm-form" />
      </CardContent>
    </Card>
  );
}

function ContactInfoSection() {
  return (
    <div className="space-y-6">
      <Card data-testid="card-contact-info">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-6">Contact Information</h3>
          <ul className="space-y-6">
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium mb-1">Office Address</p>
                <p className="text-sm text-muted-foreground">
                  1b Braemar Avenue<br />
                  Kingston 10, Jamaica
                </p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Phone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium mb-1">Phone</p>
                <a href="tel:+18766348700" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-phone">
                  +1 (876) 634-8700
                </a>
                <br />
                <a href="tel:+18766348699" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-phone-alt">
                  +1 (876) 634-8699
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium mb-1">Email</p>
                <a href="mailto:info@vertisjm.com" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-email">
                  info@vertisjm.com
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium mb-1">Office Hours</p>
                <p className="text-sm text-muted-foreground">
                  Monday - Friday: 8:00 AM - 5:00 PM<br />
                  Weekend: Emergency Support Only
                </p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      <Card data-testid="card-map">
        <CardContent className="p-0 overflow-hidden">
          <div className="aspect-[4/3] bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1897.2!2d-76.7877!3d18.0085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8edb3f8d9c8a2f1b%3A0x0!2sBraemar%20Avenue%2C%20Kingston%2010%2C%20Jamaica!5e0!3m2!1sen!2s!4v1702234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Vertis Technology Office Location"
              className="rounded-b-lg"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <HeroSection />
      <section className="py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <ContactFormSection />
            </div>
            <div className="lg:col-span-2">
              <ContactInfoSection />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
