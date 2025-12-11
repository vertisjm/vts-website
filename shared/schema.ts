export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  features: string[];
  benefits: string[];
  technologies: string[];
  icon: string;
}

export interface Partner {
  id: string;
  name: string;
  description: string;
  logo: string;
  url: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  companyLogo?: string | null;
}

export interface Industry {
  name: string;
  icon: string;
}

export interface CompanyStat {
  value: number | string;
  suffix: string;
  label: string;
  isStatic?: boolean;
}
