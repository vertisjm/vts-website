import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Server, Network, Shield, Cloud, Users } from "lucide-react";
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

const serviceLinks = [
  { href: "/services/managed-it", label: "Managed IT Services", icon: Server },
  { href: "/services/network-infrastructure", label: "Network Design & Infrastructure", icon: Network },
  { href: "/services/it-security", label: "IT Security Services", icon: Shield },
  { href: "/services/cloud-services", label: "Cloud Services", icon: Cloud },
  { href: "/services/staff-augmentation", label: "IT Staff Augmentation", icon: Users },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/partners", label: "Partners" },
  { href: "/support", label: "Support" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/") return location === "/";
    return location.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2" data-testid="link-logo">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary text-primary-foreground font-bold text-lg">
              V
            </div>
            <span className="font-semibold text-lg hidden sm:block">Vertis Technology</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/" data-testid="link-home">
              <Button variant={isActive("/") && location === "/" ? "secondary" : "ghost"} size="sm">
                Home
              </Button>
            </Link>
            
            <Link href="/about" data-testid="link-about">
              <Button variant={isActive("/about") ? "secondary" : "ghost"} size="sm">
                About Us
              </Button>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant={isActive("/services") ? "secondary" : "ghost"} 
                  size="sm"
                  className="gap-1"
                  data-testid="button-services-dropdown"
                >
                  Services
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64">
                {serviceLinks.map((service) => (
                  <DropdownMenuItem key={service.href} asChild>
                    <Link href={service.href} className="flex items-center gap-2 cursor-pointer" data-testid={`link-${service.href.split('/').pop()}`}>
                      <service.icon className="h-4 w-4 text-muted-foreground" />
                      {service.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href="/partners" data-testid="link-partners">
              <Button variant={isActive("/partners") ? "secondary" : "ghost"} size="sm">
                Partners
              </Button>
            </Link>

            <Link href="/support" data-testid="link-support">
              <Button variant={isActive("/support") ? "secondary" : "ghost"} size="sm">
                Support
              </Button>
            </Link>

            <Link href="/careers" data-testid="link-careers">
              <Button variant={isActive("/careers") ? "secondary" : "ghost"} size="sm">
                Careers
              </Button>
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            <div className="hidden md:flex items-center gap-2">
              <Link href="/support" data-testid="link-request-support">
                <Button variant="outline" size="sm">Request Support</Button>
              </Link>
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
                    <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary text-primary-foreground font-bold text-lg">
                      V
                    </div>
                    <span className="font-semibold text-lg">Vertis Technology</span>
                  </div>
                  
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link href={link.href} data-testid={`mobile-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}>
                        <Button 
                          variant={isActive(link.href) && (link.href !== "/" || location === "/") ? "secondary" : "ghost"} 
                          className="w-full justify-start"
                        >
                          {link.label}
                        </Button>
                      </Link>
                    </SheetClose>
                  ))}

                  <div className="border-t pt-4 mt-2">
                    <p className="text-sm font-medium text-muted-foreground mb-3 px-4">Services</p>
                    {serviceLinks.map((service) => (
                      <SheetClose asChild key={service.href}>
                        <Link href={service.href} data-testid={`mobile-link-${service.href.split('/').pop()}`}>
                          <Button variant="ghost" className="w-full justify-start gap-2">
                            <service.icon className="h-4 w-4 text-muted-foreground" />
                            {service.label}
                          </Button>
                        </Link>
                      </SheetClose>
                    ))}
                  </div>

                  <div className="border-t pt-4 mt-2 flex flex-col gap-2">
                    <SheetClose asChild>
                      <Link href="/support">
                        <Button variant="outline" className="w-full">Request Support</Button>
                      </Link>
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
