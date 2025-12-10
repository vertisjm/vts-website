import { Link } from "wouter";
import { Mail, Phone, MapPin, Linkedin, Twitter, Facebook } from "lucide-react";
import { services, partners } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary text-primary-foreground font-bold text-lg">
                V
              </div>
              <span className="font-semibold text-lg">Vertis Technology</span>
            </div>
            <p className="text-sm opacity-80 leading-relaxed mb-6">
              Jamaica's leading Managed IT Services provider offering enterprise-grade IT support, network infrastructure, cloud solutions, and IT security consulting.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-md bg-background/10 hover:bg-background/20 transition-colors"
                data-testid="link-linkedin"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-md bg-background/10 hover:bg-background/20 transition-colors"
                data-testid="link-twitter"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 rounded-md bg-background/10 hover:bg-background/20 transition-colors"
                data-testid="link-facebook"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.id}>
                  <Link 
                    href={`/services/${service.id}`} 
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                    data-testid={`footer-link-${service.id}`}
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Technology Partners</h3>
            <ul className="space-y-3">
              {partners.slice(0, 6).map((partner) => (
                <li key={partner.id}>
                  <Link 
                    href="/partners" 
                    className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                    data-testid={`footer-link-partner-${partner.id}`}
                  >
                    {partner.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/partners" 
                  className="text-sm text-primary hover:underline"
                  data-testid="footer-link-all-partners"
                >
                  View All Partners
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 opacity-80" />
                <span className="text-sm opacity-80">
                  12 Trafalgar Road<br />
                  Kingston 10, Jamaica
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 opacity-80" />
                <a 
                  href="tel:+18769299000" 
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  data-testid="footer-link-phone"
                >
                  +1 (876) 929-9000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 opacity-80" />
                <a 
                  href="mailto:info@vertisjm.com" 
                  className="text-sm opacity-80 hover:opacity-100 transition-opacity"
                  data-testid="footer-link-email"
                >
                  info@vertisjm.com
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-sm opacity-80 mb-2">Office Hours</p>
              <p className="text-sm opacity-60">Monday - Friday: 8:00 AM - 5:00 PM</p>
              <p className="text-sm opacity-60">Weekend: Emergency Support Only</p>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm opacity-60">
              &copy; {new Date().getFullYear()} Vertis Technology. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm opacity-60 hover:opacity-100 transition-opacity" data-testid="footer-link-privacy">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-sm opacity-60 hover:opacity-100 transition-opacity" data-testid="footer-link-terms">
                Terms of Service
              </Link>
              <Link href="/support" className="text-sm opacity-60 hover:opacity-100 transition-opacity" data-testid="footer-link-support">
                Support Portal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
