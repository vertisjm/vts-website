import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Server, Network, Shield, Cloud, Users, CheckCircle, Quote, Target, Eye, Award, Building2, Briefcase, Headphones, Clock, ExternalLink, Zap, Star, Code, Landmark, Heart, Factory, Truck, ShoppingCart, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { services, partners, testimonials, companyStats, industries } from "@/lib/data";
import { useState, useEffect, useRef } from "react";

import heroImage1 from "@assets/stock_images/black_professionals__57cc3629.jpg";
import heroImage2 from "@assets/stock_images/black_professionals__5b030cf6.jpg";
import heroImage3 from "@assets/stock_images/black_professionals__34628ca7.jpg";
import techInnovationImage from "@assets/stock_images/technology_innovatio_c4bf14a8.jpg";

const heroImages = [heroImage1, heroImage2, heroImage3];

const serviceIcons: Record<string, typeof Server> = {
  Server, Network, Shield, Cloud, Users, Code
};

const industryIcons: Record<string, typeof Server> = {
  Landmark, Heart, Factory, Truck, ShoppingCart, GraduationCap, Building2, Briefcase
};

function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-[80vh] flex items-center scroll-mt-16 overflow-hidden">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={index !== currentImageIndex}
        >
          <img
            src={image}
            alt={`Technology professionals ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(11,31,58,0.92)] via-[rgba(11,31,58,0.85)] to-[rgba(11,31,58,0.70)]" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="max-w-3xl">
          <Badge className="mb-6 bg-white/15 text-white border-white/20 backdrop-blur-sm" data-testid="badge-hero">
            Jamaica's Leading IT Partner
          </Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight mb-6 text-white" data-testid="text-hero-title">
            Enterprise IT Solutions <br className="hidden sm:block" />
            <span className="text-[#33C3F0]">Built for Growth</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/85 leading-relaxed mb-8 max-w-2xl" data-testid="text-hero-description">
            Vertis Technology delivers comprehensive managed IT services, network infrastructure, cybersecurity, and cloud solutions for medium to large enterprises across Jamaica and the Caribbean.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact">
              <Button size="lg" className="gap-2" data-testid="button-hero-consultation">
                Schedule Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#support">
              <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white backdrop-blur-sm" data-testid="button-hero-support">
                Request Support
              </Button>
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentImageIndex ? "bg-white" : "bg-white/40"
            }`}
            aria-label={`Go to slide ${index + 1}`}
            data-testid={`button-hero-slide-${index}`}
          />
        ))}
      </div>
    </section>
  );
}

function CountUpNumber({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(current);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [hasStarted, value, duration]);

  const displayValue = Number.isInteger(value) ? Math.round(count) : count.toFixed(1);

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  );
}

function useIntersectionObserver(ref: React.RefObject<HTMLElement>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return isVisible;
}

function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="py-12 border-b bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {companyStats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <p className="text-3xl sm:text-4xl font-bold text-primary mb-2" data-testid={`text-stat-value-${index}`}>
                {stat.isStatic ? (
                  <>{stat.value}{stat.suffix}</>
                ) : (
                  <CountUpNumber value={stat.value as number} suffix={stat.suffix} />
                )}
              </p>
              <p className="text-sm text-muted-foreground" data-testid={`text-stat-label-${index}`}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-20 lg:py-24 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-4">About Us</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-about-title">
            Your Trusted IT Partner in Jamaica
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            For over 10 years, Vertis Technology has been empowering businesses across Jamaica and the Caribbean with enterprise-grade IT solutions and exceptional service.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card data-testid="card-mission" className="h-full">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Target className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To deliver exceptional IT services and solutions that enable businesses to achieve their strategic objectives through reliable, secure, and innovative technology.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card data-testid="card-vision" className="h-full">
              <CardContent className="p-8">
                <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mb-6">
                  <Eye className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed">
                  To be the leading Managed IT Services provider in the Caribbean, recognized for excellence in technology solutions, customer satisfaction, and innovation.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Award, title: "Excellence", description: "We strive for excellence in every interaction and solution." },
            { icon: Users, title: "Partnership", description: "We build lasting relationships based on trust and transparency." },
            { icon: Target, title: "Innovation", description: "We continuously evolve to bring the latest technology solutions." },
            { icon: Building2, title: "Integrity", description: "We conduct business with the highest ethical standards." }
          ].map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center h-full" data-testid={`card-value-${index}`}>
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">{value.title}</h4>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import cameilleSterlingImg from "@assets/image_1765405458755.png";
import ryanSterlingImg from "@assets/Copy_of_Ryan_-_Professional_Photo_(2)_(1)_1765406682054.png";
import michaelKerrImg from "@assets/MK_-_Professional_Photo_(1)_1765406633973.png";
import sanjayStephensImg from "@assets/Photo-_Sanjay_1765405740646.jpeg";
import coleenHibbertImg from "@assets/Vertis_Technology_Headshots-51_1765405778953.jpg";
import cassandraSterlingImg from "@assets/Photo_2_(1)_1765407162039.jpg";

const executives = [
  {
    name: "Ryan Sterling",
    role: "CEO & Head of Business Development",
    initials: "RS",
    image: ryanSterlingImg,
    imageClass: "scale-150 object-[center_35%]",
    bio: "Ryan Sterling serves on the Board of Directors. Ryan is responsible for all of the company's worldwide sales and business development, and strategic partnerships."
  },
  {
    name: "Cameille Sterling",
    role: "Chief Operations Officer",
    initials: "CS",
    image: cameilleSterlingImg,
    imagePosition: "object-top",
    bio: "Cameille serves on the Board of Directors. As head of Operations and Marketing, Cameille leads a talented and creative team focused on enabling the success of Vertis Technology teams across the organization."
  },
  {
    name: "Michael Kerr",
    role: "CTO & Head of Service Delivery",
    initials: "MK",
    image: michaelKerrImg,
    imageClass: "object-top",
    bio: "Michael serves on the Board of Directors. He leads Vertis' Service and Solutions Teams. Michael has a proven ability in adapting/maturing technology organizations to solve business issues while managing costs and risks."
  }
];

const keyEmployees = [
  {
    name: "Cassandra-Leigh Sterling-Masters",
    role: "Service Delivery Manager",
    initials: "CS",
    image: cassandraSterlingImg
  },
  {
    name: "Sanjay Stephens",
    role: "Snr Systems Engineer",
    initials: "SS",
    image: sanjayStephensImg
  },
  {
    name: "Coleen Hibbert",
    role: "IT Operations Manager",
    initials: "CH",
    image: coleenHibbertImg,
    imageClass: "scale-125"
  }
];

function TeamSection() {
  return (
    <section id="team" className="py-20 lg:py-24 bg-card scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">Our Team</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6" data-testid="text-team-title">
            Over 50 Vertis Strong!
          </h2>
        </div>
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-lg text-muted-foreground text-center leading-relaxed" data-testid="text-team-description">
            With over 100 years combined experience in the IT field implementing, supporting IT solutions and services from medium to large enterprises, we pride ourselves in delivering value service. Our customers are dear to us and we ensure that we know their mission and give solutions that achieve the mission well. Our commitment to our customers defines how we do business and our years of experience working across industries underpin the vast array of services we offer.
          </p>
        </div>

        <div className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {keyEmployees.map((employee, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <Card className="text-center" data-testid={`card-employee-${index}`}>
                  <CardContent className="p-6">
                    {employee.image ? (
                      <div className="w-44 h-44 rounded-full overflow-hidden mx-auto mb-4">
                        <img 
                          src={employee.image} 
                          alt={employee.name}
                          className={`w-full h-full object-cover object-top ${employee.imageClass || ''}`}
                        />
                      </div>
                    ) : (
                      <div className="w-44 h-44 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <span className="text-4xl font-bold text-primary">{employee.initials}</span>
                      </div>
                    )}
                    <h4 className="text-base font-semibold mb-1">{employee.name}</h4>
                    <p className="text-sm text-muted-foreground">{employee.role}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-center mb-10">Executive Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {executives.map((exec, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
              >
                <Card className="text-center h-full" data-testid={`card-executive-${index}`}>
                  <CardContent className="p-6">
                    {exec.image ? (
                      <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-4">
                        <img 
                          src={exec.image} 
                          alt={exec.name}
                          className={`w-full h-full object-cover ${exec.imageClass || exec.imagePosition || ''}`}
                        />
                      </div>
                    ) : (
                      <div className="w-48 h-48 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <span className="text-5xl font-bold text-primary">{exec.initials}</span>
                      </div>
                    )}
                    <h4 className="text-lg font-semibold mb-1">{exec.name}</h4>
                    <p className="text-sm text-primary font-medium mb-4">{exec.role}</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">{exec.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const [expandedService, setExpandedService] = useState<string | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToService = (serviceId: string) => {
    setTimeout(() => {
      const element = document.getElementById(`service-card-${serviceId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  useEffect(() => {
    const handleExpandService = (e: CustomEvent<string>) => {
      setExpandedService(e.detail);
      scrollToService(e.detail);
    };

    const checkHashOnLoad = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#service-')) {
        const serviceId = hash.replace('#service-', '');
        setExpandedService(serviceId);
        scrollToService(serviceId);
      }
    };

    window.addEventListener('expandService', handleExpandService as EventListener);
    checkHashOnLoad();

    return () => {
      window.removeEventListener('expandService', handleExpandService as EventListener);
    };
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-20 lg:py-24 bg-card scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-4">Our Services</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-services-title">
            Comprehensive IT Solutions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From managed IT services to cybersecurity, we provide end-to-end technology solutions tailored to your business needs.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, serviceIndex) => {
            const IconComponent = serviceIcons[service.icon] || Server;
            const isExpanded = expandedService === service.id;
            return (
              <motion.div
                key={service.id}
                id={`service-card-${service.id}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: serviceIndex * 0.08 }}
                className={`scroll-mt-24 ${isExpanded ? 'md:col-span-2 lg:col-span-3' : ''}`}
              >
              <Card 
                className={`group transition-all duration-300 h-full ${!isExpanded ? 'hover-elevate' : ''}`}
                data-testid={`card-service-${service.id}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {isExpanded ? service.description : service.shortDescription}
                      </p>
                      
                      {isExpanded && (
                        <div className="mt-6 space-y-6">
                          <div>
                            <h4 className="font-semibold mb-3 flex items-center gap-2">
                              <Zap className="h-4 w-4 text-primary" />
                              Key Features
                            </h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {service.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-sm">
                                  <CheckCircle className="h-4 w-4 text-primary flex-shrink-0" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold mb-3">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                              {service.technologies.map((tech, idx) => (
                                <Badge key={idx} variant="secondary">{tech}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="gap-2 -ml-3 mt-2"
                        onClick={() => setExpandedService(isExpanded ? null : service.id)}
                        data-testid={`button-toggle-${service.id}`}
                      >
                        {isExpanded ? 'Show Less' : 'Learn More'}
                        <ArrowRight className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              </motion.div>
            );
          })}
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
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-4">Industries We Serve</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6" data-testid="text-industries-title">
              Expertise Across Sectors
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We understand that different industries have unique technology requirements and compliance needs. Our team has deep experience serving organizations across multiple sectors.
            </p>
            <Link href="/contact">
              <Button className="gap-2" data-testid="button-discuss-needs">
                Discuss Your Needs
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            {industries.map((industry, index) => {
              const IconComponent = industryIcons[industry.icon] || Briefcase;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="hover-elevate h-full" data-testid={`card-industry-${index}`}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <IconComponent className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-medium text-sm">{industry.name}</span>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function PartnersSection() {
  return (
    <section id="partners" className="py-20 lg:py-24 scroll-mt-16 relative overflow-hidden">
      {/* Tech-savvy background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] via-[#1755B5]/90 to-[#0B1F3A]" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(51, 195, 240, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(23, 85, 181, 0.3) 0%, transparent 50%),
                           linear-gradient(to right, rgba(51, 195, 240, 0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(51, 195, 240, 0.1) 1px, transparent 1px)`,
          backgroundSize: '100% 100%, 100% 100%, 40px 40px, 40px 40px'
        }} />
      </div>
      <div className="absolute top-20 right-20 w-64 h-64 bg-[#33C3F0]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-80 h-80 bg-[#1755B5]/20 rounded-full blur-3xl" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-white/15 text-white border-white/20 backdrop-blur-sm">Technology Partners</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white" data-testid="text-partners-title">
            Powered by Industry Leaders
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            We partner with the world's leading technology providers to deliver best-in-class solutions for your business.
          </p>
        </motion.div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-6">
          {partners.map((partner, partnerIndex) => (
            <motion.a
              key={partner.id}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center p-6 rounded-lg border border-white/10 hover:border-white/30 transition-all group hover-elevate aspect-[3/2] backdrop-blur-sm ${
                partner.id === "3cx" ? "bg-slate-800" : "bg-white/10"
              }`}
              data-testid={`partner-logo-${partner.id}`}
              title={partner.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: partnerIndex * 0.05 }}
            >
              <img
                src={partner.logo}
                alt={`${partner.name} logo`}
                className={`w-auto max-w-full object-contain opacity-80 group-hover:opacity-100 transition-opacity ${
                  partner.id === "veeam" ? "" : "brightness-0 invert"
                } ${
                  ["synology", "cisco", "vmware"].includes(partner.id) ? "h-12 sm:h-14" : "h-8 sm:h-10"
                }`}
              />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (testimonials.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [testimonials.length]);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id="testimonials" className="py-20 lg:py-24 scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-4">Testimonials</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-testimonials-title">
            Trusted by Leading Organizations
          </h2>
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="relative overflow-visible" data-testid="card-testimonial">
            <CardContent className="p-8 sm:p-12">
              <Quote className="h-10 w-10 text-primary/20 mb-6" />
              <div className="flex gap-1 mb-4" data-testid="rating-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-lg sm:text-xl leading-relaxed mb-8" data-testid="text-testimonial-quote">
                {testimonials[currentIndex]?.quote}
              </p>
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  {testimonials[currentIndex]?.companyLogo ? (
                    <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center overflow-hidden p-1.5">
                      <img 
                        src={testimonials[currentIndex].companyLogo} 
                        alt={`${testimonials[currentIndex]?.company} logo`}
                        className="w-full h-full object-contain"
                        data-testid="img-testimonial-avatar-logo"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {testimonials[currentIndex]?.name?.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold" data-testid="text-testimonial-name">
                      {testimonials[currentIndex]?.name}
                    </p>
                    <p className="text-sm text-muted-foreground" data-testid="text-testimonial-role">
                      {testimonials[currentIndex]?.role}, {testimonials[currentIndex]?.company}
                    </p>
                  </div>
                </div>
                {testimonials[currentIndex]?.companyLogo && (
                  <div className="h-10 flex items-center">
                    <img 
                      src={testimonials[currentIndex].companyLogo} 
                      alt={`${testimonials[currentIndex]?.company} logo`}
                      className="h-full w-auto object-contain max-w-[120px] dark:invert dark:opacity-70"
                      data-testid="img-testimonial-company-logo"
                    />
                  </div>
                )}
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
        </motion.div>
      </div>
    </section>
  );
}

function SupportSection() {
  const supportOptions = [
    {
      icon: Headphones,
      title: "Phone Support",
      description: "Speak directly with our technical support team for urgent issues.",
      action: "Call Now",
      link: "tel:+18766348700"
    },
    {
      icon: Clock,
      title: "Ticket Portal",
      description: "Submit and track support tickets through our Zoho Desk portal.",
      action: "Open Portal",
      link: "https://support.vertisjm.com/portal/en/home",
      external: true
    }
  ];

  return (
    <section id="support" className="py-20 lg:py-24 bg-card scroll-mt-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-4">Support</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4" data-testid="text-support-title">
            We're Here to Help
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Need technical assistance? Our support team is available to help you resolve issues quickly.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {supportOptions.map((option, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
            <Card className="text-center h-full" data-testid={`card-support-option-${index}`}>
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <option.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{option.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {option.description}
                </p>
                <Button className="gap-2" asChild data-testid={`button-support-${index}`}>
                  <a 
                    href={option.link} 
                    target={option.external ? "_blank" : undefined}
                    rel={option.external ? "noopener noreferrer" : undefined}
                  >
                    {option.action}
                    {option.external && <ExternalLink className="h-4 w-4" />}
                  </a>
                </Button>
              </CardContent>
            </Card>
            </motion.div>
          ))}
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
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-4">Why Choose Us</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-6" data-testid="text-why-choose-title">
              Your Technology Partner for Success
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              At Vertis Technology, we understand that reliable IT infrastructure is the backbone of modern business. Our team of certified professionals works tirelessly to ensure your technology empowers your growth.
            </p>
            <ul className="space-y-4">
              {reasons.map((reason, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start gap-3" 
                  data-testid={`text-reason-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative rounded-lg overflow-hidden shadow-xl">
              <img 
                src={techInnovationImage} 
                alt="AI and technology innovation"
                className="w-full h-auto object-cover aspect-[4/5]"
                data-testid="img-why-choose-tech"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1F3A]/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#33C3F0]/20 backdrop-blur-sm flex items-center justify-center">
                    <Zap className="h-5 w-5 text-[#33C3F0]" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">Innovative Solutions</p>
                    <p className="text-white/70 text-sm">Powered by cutting-edge technology</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20 lg:py-24 relative overflow-hidden">
      {/* Rich contemporary gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0B1F3A] via-[#1755B5] to-[#0B1F3A]" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#33C3F0]/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#1755B5]/30 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-[#33C3F0]/10 to-[#1755B5]/10 rounded-full blur-3xl" />
      
      {/* Subtle mesh pattern */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                         linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '60px 60px'
      }} />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white" data-testid="text-cta-title">
            Ready to Transform Your IT Infrastructure?
          </h2>
          <p className="text-lg text-white/85 max-w-2xl mx-auto mb-8">
            Let's discuss how Vertis Technology can help your organization achieve its technology goals. Schedule a free consultation with our experts today.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact">
              <Button size="lg" className="gap-2 bg-[#33C3F0] hover:bg-[#33C3F0]/90 text-[#0B1F3A] font-semibold" data-testid="button-cta-consultation">
                Schedule Consultation
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <a href="#services">
              <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white backdrop-blur-sm" data-testid="button-cta-services">
                Explore Our Services
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutSection />
      <TeamSection />
      <ServicesSection />
      <IndustriesSection />
      <PartnersSection />
      <TestimonialsSection />
      <SupportSection />
      <WhyChooseUsSection />
      <CTASection />
    </>
  );
}
