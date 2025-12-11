import type { Service, Partner, Testimonial } from "@shared/schema";

export const services: Service[] = [
  {
    id: "managed-it",
    title: "Managed IT Services",
    shortDescription: "Comprehensive IT management and support for your business operations.",
    description: "Our Managed IT Services provide end-to-end technology management, ensuring your systems run smoothly 24/7. We handle everything from proactive monitoring to help desk support, freeing your team to focus on core business objectives.",
    features: [
      "24/7 Network Monitoring & Management",
      "Help Desk & Technical Support",
      "IT Asset Management",
      "Patch Management & Updates",
      "Backup & Disaster Recovery",
      "Vendor Management",
      "IT Strategy & Consulting",
      "Performance Optimization"
    ],
    benefits: [
      "Reduce IT costs with predictable monthly expenses",
      "Minimize downtime with proactive monitoring",
      "Access enterprise-grade expertise without hiring overhead",
      "Improve security posture with continuous updates",
      "Scale IT resources as your business grows"
    ],
    technologies: ["Microsoft 365", "Azure", "Dell", "HP", "Veeam", "Synology"],
    icon: "Server"
  },
  {
    id: "network-infrastructure",
    title: "Network Design & Infrastructure",
    shortDescription: "Enterprise-grade network solutions built for performance and reliability.",
    description: "We design, implement, and manage robust network infrastructures that support your business operations. From initial architecture to ongoing optimization, we ensure your network delivers the performance, security, and scalability you need.",
    features: [
      "Network Architecture & Design",
      "LAN/WAN Implementation",
      "Wireless Network Solutions",
      "VoIP & Unified Communications",
      "Network Security Integration",
      "Cabling & Physical Infrastructure",
      "Network Performance Monitoring",
      "Capacity Planning & Upgrades"
    ],
    benefits: [
      "Maximize uptime with redundant network design",
      "Improve productivity with high-speed connectivity",
      "Future-proof your infrastructure for growth",
      "Reduce complexity with unified communications",
      "Ensure compliance with security standards"
    ],
    technologies: ["Cisco", "Fortinet", "Grandstream", "3CX", "Dell", "HP"],
    icon: "Network"
  },
  {
    id: "it-security",
    title: "IT Security Services",
    shortDescription: "Protect your business with comprehensive cybersecurity solutions.",
    description: "Our IT Security Services provide multi-layered protection against evolving cyber threats. From endpoint security to Security Operations Center (SOC) services, we safeguard your critical assets and maintain compliance with industry regulations.",
    features: [
      "Security Operations Center (SOC)",
      "Endpoint Detection & Response (EDR)",
      "Vulnerability Management",
      "Security Information & Event Management (SIEM)",
      "Penetration Testing",
      "Security Awareness Training",
      "Incident Response Planning",
      "Compliance Assessment & Reporting"
    ],
    benefits: [
      "Detect and respond to threats in real-time",
      "Protect sensitive data from breaches",
      "Meet regulatory compliance requirements",
      "Reduce risk with proactive vulnerability management",
      "Build a security-conscious organizational culture"
    ],
    technologies: ["Fortinet", "Sophos", "CrowdStrike", "Microsoft Defender", "Veeam"],
    icon: "Shield"
  },
  {
    id: "cloud-services",
    title: "Cloud Services",
    shortDescription: "Seamless cloud adoption and management for modern businesses.",
    description: "Transform your IT infrastructure with our comprehensive cloud services. We help you migrate, manage, and optimize cloud environments, enabling greater flexibility, scalability, and cost-efficiency for your business operations.",
    features: [
      "Cloud Strategy & Assessment",
      "Microsoft 365 Implementation",
      "Azure Cloud Solutions",
      "Cloud Migration Services",
      "Hybrid Cloud Architecture",
      "Cloud Security & Compliance",
      "Cloud Cost Optimization",
      "Backup & Disaster Recovery"
    ],
    benefits: [
      "Reduce capital expenditure with OpEx model",
      "Enable remote work with cloud collaboration",
      "Scale resources on demand",
      "Improve disaster recovery capabilities",
      "Access enterprise tools without enterprise complexity"
    ],
    technologies: ["Microsoft 365", "Azure", "Veeam", "Synology"],
    icon: "Cloud"
  },
  {
    id: "application-development",
    title: "Application Development",
    shortDescription: "Custom software solutions tailored to your business needs.",
    description: "We design and develop custom applications that streamline your business processes and drive digital transformation. From web and mobile apps to enterprise systems, our development team delivers scalable, secure solutions aligned with your objectives.",
    features: [
      "Custom Web Application Development",
      "Mobile App Development",
      "Enterprise Software Solutions",
      "API Development & Integration",
      "Legacy System Modernization",
      "Database Design & Development",
      "Quality Assurance & Testing",
      "Ongoing Maintenance & Support"
    ],
    benefits: [
      "Automate manual processes to improve efficiency",
      "Create competitive advantages with custom solutions",
      "Integrate disparate systems for unified workflows",
      "Scale applications as your business grows",
      "Reduce operational costs through automation"
    ],
    technologies: ["React", "Node.js", "Python", ".NET", "Azure", "AWS"],
    icon: "Code"
  },
  {
    id: "staff-augmentation",
    title: "IT Staff Augmentation",
    shortDescription: "Flexible IT talent solutions to extend your team's capabilities.",
    description: "Access skilled IT professionals on-demand to supplement your existing team. Our staff augmentation services provide the expertise you need for specific projects or ongoing support, without the overhead of permanent hires.",
    features: [
      "Technical Staff Placement",
      "Project-Based Resourcing",
      "Long-Term Contract Staffing",
      "Specialized IT Expertise",
      "Team Extension Services",
      "Managed Teams",
      "Skills Gap Analysis",
      "Flexible Engagement Models"
    ],
    benefits: [
      "Access specialized skills when you need them",
      "Scale your team without permanent overhead",
      "Reduce hiring time and recruitment costs",
      "Maintain project momentum with expert resources",
      "Focus internal staff on core competencies"
    ],
    technologies: ["Microsoft", "Dell", "HP", "Cisco", "Various Platforms"],
    icon: "Users"
  },
  {
    id: "backup-as-a-service",
    title: "Vertis Backup as a Service (BaaS)",
    shortDescription: "Enterprise backup and disaster recovery with ransomware protection.",
    description: "Protect your critical business data with our comprehensive Backup as a Service solution. We provide enterprise-grade backup, disaster recovery, and ransomware protection for servers and applications, ensuring business continuity and rapid recovery when you need it most.",
    features: [
      "Automated Server & Application Backup",
      "Ransomware Detection & Protection",
      "Instant VM Recovery",
      "Offsite & Cloud Backup Replication",
      "Bare Metal Recovery",
      "Application-Aware Backup (SQL, Exchange, SharePoint)",
      "Backup Monitoring & Reporting",
      "Recovery Point & Time Objectives (RPO/RTO) Management"
    ],
    benefits: [
      "Protect against ransomware with immutable backups",
      "Minimize downtime with rapid disaster recovery",
      "Ensure compliance with data retention requirements",
      "Reduce risk of data loss with automated backups",
      "Achieve peace of mind with tested recovery procedures"
    ],
    technologies: ["Veeam", "Azure", "Synology", "Dell", "Microsoft 365"],
    icon: "HardDrive"
  }
];

export const partners: Partner[] = [
  {
    id: "microsoft",
    name: "Microsoft",
    description: "Strategic partner for Microsoft 365, Azure cloud solutions, and enterprise productivity tools.",
    logo: "https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE1Mu3b?ver=5c31",
    url: "https://www.microsoft.com"
  },
  {
    id: "dell",
    name: "Dell Technologies",
    description: "Hardware partner for enterprise servers, workstations, and infrastructure solutions.",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/dell.svg",
    url: "https://www.dell.com"
  },
  {
    id: "hp",
    name: "HP",
    description: "Provider of enterprise computing, printing, and imaging solutions.",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/hp.svg",
    url: "https://www.hp.com"
  },
  {
    id: "fortinet",
    name: "Fortinet",
    description: "Network security partner offering next-generation firewalls and security fabric solutions.",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/fortinet.svg",
    url: "https://www.fortinet.com"
  },
  {
    id: "sophos",
    name: "Sophos",
    description: "Cybersecurity partner for endpoint protection and synchronized security solutions.",
    logo: "https://assets.sophos.com/X24WTUEQ/at/cgwpbfck63x7s6xnn84ck/Logo-Graphic-Logo-Tagline.svg",
    url: "https://www.sophos.com"
  },
  {
    id: "crowdstrike",
    name: "CrowdStrike",
    description: "Cloud-native endpoint protection and threat intelligence platform.",
    logo: "https://assets.crowdstrike.com/is/content/crowdstrikeinc/black-primary-crowdstrike-logo-1-addedPadding-3",
    url: "https://www.crowdstrike.com"
  },
  {
    id: "synology",
    name: "Synology",
    description: "Storage and backup solutions partner for enterprise NAS and data management.",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/synology.svg",
    url: "https://www.synology.com"
  },
  {
    id: "cisco",
    name: "Cisco",
    description: "Networking partner for enterprise routing, switching, and collaboration solutions.",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/cisco.svg",
    url: "https://www.cisco.com"
  },
  {
    id: "grandstream",
    name: "Grandstream",
    description: "VoIP and unified communications solutions for modern business telephony.",
    logo: "https://www.grandstream.com/hs-fs/hubfs/raw_assets/public/Grandstream_Feb_2021/images/logo-grandstream-low-web.png?width=600&height=204&name=logo-grandstream-low-web.png",
    url: "https://www.grandstream.com"
  },
  {
    id: "3cx",
    name: "3CX",
    description: "Software-based PBX and unified communications platform for voice and video.",
    logo: "https://www.3cx.com/wp-content/uploads/2018/08/logo-3.png",
    url: "https://www.3cx.com"
  },
  {
    id: "veeam",
    name: "Veeam",
    description: "Backup and disaster recovery solutions for hybrid cloud environments.",
    logo: "/assets/veeam-logo.png",
    url: "https://www.veeam.com"
  },
  {
    id: "vmware",
    name: "VMware",
    description: "Virtualization and cloud infrastructure solutions for enterprise environments.",
    logo: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/vmware.svg",
    url: "https://www.vmware.com"
  }
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote: "We needed a SD-WAN solution to be implemented to meet the needs of our infrastructure. Vertis Technology Solutions Ltd partnered with us to implement the solution across our locations. THANK YOU, VERTIS!",
    name: "Fabian Webb",
    role: "IT Manager",
    company: "JTA Credit Union",
    companyLogo: "https://jtacreditunion.com/storage/storage/upload/medialibrary/April2025/jljVeJsLz8p7YKUuBygaPtFaN7ZJsWcgOjmVv6MX.png"
  },
  {
    id: "2",
    quote: "For me being able to rely completely on your partner, is probably the single most important thing, and that for me has been a differentiator for Vertis. Vertis has not let me down, and I don't believe it's in them to let a customer down.",
    name: "Shane Monroe",
    role: "IT Manager",
    company: "Sangster's International Airport",
    companyLogo: "https://www.mbjairport.com/template/logo2019.png"
  }
];

export const industries = [
  { name: "Financial Services", icon: "Landmark" },
  { name: "Healthcare", icon: "Heart" },
  { name: "Manufacturing", icon: "Factory" },
  { name: "Logistics & Transportation", icon: "Truck" },
  { name: "Retail & Distribution", icon: "ShoppingCart" },
  { name: "Education", icon: "GraduationCap" },
  { name: "Government & Public Sector", icon: "Building2" },
  { name: "Professional Services", icon: "Briefcase" }
];

export const companyStats = [
  { value: 50, suffix: "+", label: "Years Experience" },
  { value: 200, suffix: "+", label: "Clients Served" },
  { value: 99.9, suffix: "%", label: "Uptime SLA" },
  { value: "24/7", suffix: "", label: "Support Available", isStatic: true }
];
