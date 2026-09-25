import type { Service, Partner, Testimonial } from "@shared/schema";

// Partner logos: official marks from Wikimedia Commons, or from the partner's own website where Commons has none.
import microsoftLogo from "@assets/partners/microsoft.svg";
import fortinetLogo from "@assets/partners/fortinet.svg";
import sophosLogo from "@assets/partners/sophos.svg";
import dellLogo from "@assets/partners/dell.svg";
import hpLogo from "@assets/partners/hp.svg";
import veeamLogo from "@assets/partners/veeam.svg";
import vmwareLogo from "@assets/partners/vmware.svg";
import ciscoLogo from "@assets/partners/cisco.svg";
import crowdstrikeLogo from "@assets/partners/crowdstrike.svg";
import synologyLogo from "@assets/partners/synology.svg";
import grandstreamLogo from "@assets/partners/grandstream.png";
import threeCxLogo from "@assets/partners/3cx.svg";
import progressKempLogo from "@assets/partners/progress-kemp.svg";
import redHatLogo from "@assets/partners/redhat.svg";
import vergeIoLogo from "@assets/partners/vergeio.svg";
import lumuLogo from "@assets/partners/lumu.png";
import qwerxLogo from "@assets/partners/qwerx.png";
import exaGridLogo from "@assets/partners/exagrid.png";
import delineaLogo from "@assets/partners/delinea.svg";
import manageEngineLogo from "@assets/partners/manageengine.png";

import managedItImg from "@assets/stock_images/managed-it.jpg";
import cybersecurityImg from "@assets/stock_images/cybersecurity.jpg";
import cloudImg from "@assets/stock_images/cloud.jpg";
import infrastructureImg from "@assets/stock_images/infrastructure.jpg";
import backupImg from "@assets/stock_images/backup-dr.jpg";

// The five solutions featured as photo cards on the home page (ids refer to `services`).
export const featuredSolutions = [
  { serviceId: "managed-it", title: "Managed IT Services", blurb: "Keep your IT environment secure, productive and supported.", image: managedItImg },
  { serviceId: "it-security", title: "Cybersecurity", blurb: "Protect your people, data and operations.", image: cybersecurityImg },
  { serviceId: "cloud-services", title: "Cloud Solutions", blurb: "Modernise with Azure, Microsoft 365 and hybrid cloud.", image: cloudImg },
  { serviceId: "network-infrastructure", title: "Infrastructure", blurb: "Networks, compute, storage and datacentre solutions.", image: infrastructureImg },
  { serviceId: "backup-as-a-service", title: "Backup & DR", blurb: "Keep your business running, whatever happens.", image: backupImg },
];

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
    id: "sovereign-ai",
    title: "Local & Sovereign AI Infrastructure",
    shortDescription: "AI servers, high-performance networking, GPU clusters and AI models, designed and built locally.",
    description: "Vertis Technology designs and builds local and sovereign AI infrastructure through partnerships with global technology leaders. We supply and deploy AI servers, design high-performance AI networking, design and configure GPU clusters, and implement the AI models that run on them, on premises or in a local data centre, so sensitive data stays in Jamaica and the region.",
    features: [
      "AI Server Supply & Deployment",
      "High-Performance AI Networking Design & Deployment",
      "GPU Cluster Design & Configuration",
      "AI Model Implementation & Integration",
      "On-Premises & Local Data Centre Deployment",
      "Data Residency & Access Controls",
      "Ongoing Management & Support"
    ],
    benefits: [
      "Keep sensitive data in-country and under your control",
      "Support data protection and residency obligations",
      "Predictable performance for AI workloads",
      "Enterprise-grade platforms from our technology partners",
      "Local expertise to design, build and support your AI environment"
    ],
    icon: "BrainCircuit"
  },
  {
    id: "application-development",
    title: "Application Development",
    shortDescription: "Custom software solutions tailored to your business needs.",
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
    icon: "RotateCcw"
  }
];

export const partners: Partner[] = [
  { id: "microsoft", name: "Microsoft", description: "Strategic partner for Microsoft 365, Azure cloud solutions, and enterprise productivity tools.", logo: microsoftLogo, url: "https://www.microsoft.com" },
  { id: "fortinet", name: "Fortinet", description: "Network security partner offering next-generation firewalls and security fabric solutions.", logo: fortinetLogo, url: "https://www.fortinet.com" },
  { id: "sophos", name: "Sophos", description: "Cybersecurity partner for endpoint protection and synchronized security solutions.", logo: sophosLogo, url: "https://www.sophos.com" },
  { id: "dell", name: "Dell Technologies", description: "Hardware partner for enterprise servers, workstations, and infrastructure solutions.", logo: dellLogo, url: "https://www.dell.com" },
  { id: "hp", name: "HP", description: "Provider of enterprise computing, printing, and imaging solutions.", logo: hpLogo, url: "https://www.hp.com" },
  { id: "veeam", name: "Veeam", description: "Backup and disaster recovery solutions for hybrid cloud environments.", logo: veeamLogo, url: "https://www.veeam.com" },
  { id: "exagrid", name: "ExaGrid", description: "Tiered backup storage with fast backups, fast recoveries and ransomware recovery.", logo: exaGridLogo, url: "https://www.exagrid.com" },
  { id: "vmware", name: "VMware", description: "Virtualization and cloud infrastructure solutions for enterprise environments.", logo: vmwareLogo, url: "https://www.vmware.com" },
  { id: "vergeio", name: "VergeIO", description: "VergeOS private cloud and virtualization, combining compute, storage and networking in one platform.", logo: vergeIoLogo, url: "https://www.verge.io" },
  { id: "redhat", name: "Red Hat", description: "Enterprise open source platforms, including Red Hat Enterprise Linux and OpenShift.", logo: redHatLogo, url: "https://www.redhat.com" },
  { id: "lumu", name: "Lumu", description: "Network detection and response that confirms compromise in real time.", logo: lumuLogo, url: "https://lumu.io" },
  { id: "qwerx", name: "QWERX", description: "Dynamic distributed device authentication with ephemeral keys and zero standing trust.", logo: qwerxLogo, url: "https://qwerx.co", darkLogo: true },
  { id: "delinea", name: "Delinea", description: "Privileged access management to secure and control access to critical systems.", logo: delineaLogo, url: "https://delinea.com" },
  { id: "manageengine", name: "ManageEngine", description: "IT management software for service desk, endpoint, network and security operations.", logo: manageEngineLogo, url: "https://www.manageengine.com" },
  { id: "cisco", name: "Cisco", description: "Networking partner for enterprise routing, switching, and collaboration solutions.", logo: ciscoLogo, url: "https://www.cisco.com" },
  { id: "crowdstrike", name: "CrowdStrike", description: "Cloud-native endpoint protection and threat intelligence platform.", logo: crowdstrikeLogo, url: "https://www.crowdstrike.com" },
  { id: "synology", name: "Synology", description: "Storage and backup solutions partner for enterprise NAS and data management.", logo: synologyLogo, url: "https://www.synology.com" },
  { id: "grandstream", name: "Grandstream", description: "VoIP and unified communications solutions for modern business telephony.", logo: grandstreamLogo, url: "https://www.grandstream.com" },
  { id: "3cx", name: "3CX", description: "Software-based PBX and unified communications platform for voice and video.", logo: threeCxLogo, url: "https://www.3cx.com" },
  { id: "progress-kemp", name: "Progress Kemp", description: "Progress Kemp LoadMaster load balancing and application delivery for reliable, high-availability services.", logo: progressKempLogo, url: "https://kemptechnologies.com", wideLogo: true }
];

// Shown when the admin portal has no testimonials saved. Same four as vertisjm.com.
export const testimonials: Testimonial[] = [
  {
    id: "ironrock",
    quote: "Vertis was able to resolve our network concerns in one week where other service providers were saying they needed 2 months. We chose Vertis Technology Solutions Ltd, for our Managed Service partner a decision that has yielded great rewards.",
    name: "Maurice Bolt",
    role: "Gen. Manager - Technology & Operations",
    company: "IronRock Insurance Company Limited"
  },
  {
    id: "jta",
    quote: "We needed a SD-WAN solution to be implemented to meet the needs of our infrastructure. Vertis Technology Solutions Ltd partnered with us to implement the solution across our locations. THANK YOU, VERTIS!",
    name: "Fabian Webb",
    role: "IT Manager",
    company: "JTA Credit Union"
  },
  {
    id: "sangsters",
    quote: "For me being able to rely completely on your partner, is probably the single most important thing, and that for me has been a differentiator for Vertis. Vertis has not let me down, and I don't believe it's in them to let a customer down.",
    name: "Shane Monroe",
    role: "IT Manager",
    company: "Sangster's International Airport"
  },
  {
    id: "purity",
    quote: "Vertis solved our network security needs with the implementation of a Unified Threat Management device that improved our security exponentially. Vertis attention to detail is quite refreshing.",
    name: "Steven Mullings",
    role: "IT Manager",
    company: "Purity Bakery"
  }
];

export const industries = [
  "Financial Services",
  "Healthcare",
  "Manufacturing",
  "Logistics & Transportation",
  "Retail & Distribution",
  "Education",
  "Government & Public Sector",
  "Professional Services"
];

export const companyStats = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 200, suffix: "+", label: "Clients Served" },
  { value: 99.9, suffix: "%", label: "Uptime SLA" },
  { value: "24/7", suffix: "", label: "Support Available", isStatic: true }
];
