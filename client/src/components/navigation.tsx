import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, ChevronDown, Server, Network, Shield, Cloud, Users, Info, Star, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import vertisLogo from "@assets/vertis-logo.svg";

const sectionLinks = [
  { href: "/#services", label: "Services", anchor: true },
  { href: "/#partners", label: "Partners", anchor: true },
  { href: "/#support", label: "Support", anchor: true },
];

const aboutAnchors = [
  { id: "about", label: "About Us", icon: Info, hash: "#about" },
  { id: "testimonials", label: "Testimonials", icon: Star, hash: "#testimonials" },
];

const serviceAnchors = [
  { id: "managed-it", label: "Managed IT Services", icon: Server },
  { id: "network-infrastructure", label: "Network Design & Infrastructure", icon: Network },
  { id: "it-security", label: "IT Security Services", icon: Shield },
  { id: "cloud-services", label: "Cloud Services", icon: Cloud },
  { id: "application-development", label: "Application Development", icon: Code },
  { id: "staff-augmentation", label: "IT Staff Augmentation", icon: Users },
];

function scrollToSection(hash: string) {
  const element = document.querySelector(hash);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
}

export function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, hash: string) => {
    if (location === "/") {
      e.preventDefault();
      scrollToSection(hash);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center" data-testid="link-logo">
            <img 
              src={vertisLogo} 
              alt="Vertis Technology" 
              className="h-10 w-auto"
            />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <a 
              href="/" 
              onClick={(e) => {
                if (location === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              data-testid="link-home"
            >
              <Button variant={location === "/" ? "secondary" : "ghost"} size="sm">
                Home
              </Button>
            </a>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="gap-1"
                  data-testid="button-about-dropdown"
                >
                  About
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                {aboutAnchors.map((item) => (
                  <DropdownMenuItem key={item.id} asChild>
                    <a 
                      href={`/${item.hash}`} 
                      onClick={(e) => handleAnchorClick(e, item.hash)}
                      className="flex items-center gap-2 cursor-pointer" 
                      data-testid={`link-${item.id}`}
                    >
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      {item.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="gap-1"
                  data-testid="button-services-dropdown"
                >
                  Services
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {serviceAnchors.map((service) => (
                  <DropdownMenuItem key={service.id} asChild>
                    <a 
                      href="/#services" 
                      onClick={(e) => handleAnchorClick(e, "#services")}
                      className="flex items-center gap-2 cursor-pointer" 
                      data-testid={`link-${service.id}`}
                    >
                      <service.icon className="h-4 w-4 text-muted-foreground" />
                      {service.label}
                    </a>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <a 
              href="/#partners" 
              onClick={(e) => handleAnchorClick(e, "#partners")}
              data-testid="link-partners"
            >
              <Button variant="ghost" size="sm">
                Partners
              </Button>
            </a>

            <a 
              href="/#support" 
              onClick={(e) => handleAnchorClick(e, "#support")}
              data-testid="link-support"
            >
              <Button variant="ghost" size="sm">
                Support
              </Button>
            </a>

            <Link href="/careers" data-testid="link-careers">
              <Button variant={location === "/careers" ? "secondary" : "ghost"} size="sm">
                Careers
              </Button>
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            <div className="hidden md:flex items-center gap-2">
              <a href="/#support" onClick={(e) => handleAnchorClick(e, "#support")} data-testid="link-request-support">
                <Button variant="outline" size="sm">Request Support</Button>
              </a>
              <Link href="/contact" data-testid="link-contact-cta">
                <Button size="sm">Contact Us</Button>
              </Link>
            </div>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <div className="flex flex-col gap-4 mt-8">
                  <div className="flex items-center gap-2 mb-4">
                    <img 
                      src={vertisLogo} 
                      alt="Vertis Technology" 
                      className="h-10 w-auto"
                    />
                  </div>
                  
                  <SheetClose asChild>
                    <a 
                      href="/" 
                      onClick={(e) => {
                        if (location === "/") {
                          e.preventDefault();
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                          setMobileOpen(false);
                        }
                      }}
                      data-testid="mobile-link-home"
                    >
                      <Button variant={location === "/" ? "secondary" : "ghost"} className="w-full justify-start">
                        Home
                      </Button>
                    </a>
                  </SheetClose>

                  {sectionLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <a 
                        href={link.href} 
                        onClick={(e) => {
                          if (location === "/") {
                            e.preventDefault();
                            scrollToSection(link.href.replace("/#", "#"));
                            setMobileOpen(false);
                          }
                        }}
                        data-testid={`mobile-link-${link.label.toLowerCase()}`}
                      >
                        <Button variant="ghost" className="w-full justify-start">
                          {link.label}
                        </Button>
                      </a>
                    </SheetClose>
                  ))}

                  <SheetClose asChild>
                    <Link href="/careers" data-testid="mobile-link-careers">
                      <Button variant={location === "/careers" ? "secondary" : "ghost"} className="w-full justify-start">
                        Careers
                      </Button>
                    </Link>
                  </SheetClose>

                  <div className="border-t pt-4 mt-2 flex flex-col gap-2">
                    <SheetClose asChild>
                      <a href="/#support" onClick={(e) => {
                        if (location === "/") {
                          e.preventDefault();
                          scrollToSection("#support");
                          setMobileOpen(false);
                        }
                      }}>
                        <Button variant="outline" className="w-full">Request Support</Button>
                      </a>
                    </SheetClose>
                    <SheetClose asChild>
                      <Link href="/contact">
                        <Button className="w-full">Contact Us</Button>
                      </Link>
                    </SheetClose>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
