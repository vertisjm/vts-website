import { Link } from "wouter";
import { Logo } from "./navigation";
import { SectionLink, SUPPORT_PORTAL_URL, contact } from "./site";
import { services } from "@/lib/data";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Technology Partners", href: "/#partners" },
  { label: "Support", href: "/#support" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
];

const socials = [
  { label: "LinkedIn", href: "https://jm.linkedin.com/company/vertis-technology" },
  { label: "Facebook", href: "https://www.facebook.com/vertisjm/" },
  { label: "Instagram", href: "https://www.instagram.com/vertistechnology/" },
];

const linkCls = "text-slate-pale transition-colors hover:text-white";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (href.startsWith("/#")) {
    return (
      <SectionLink href={href} className={linkCls}>
        {children}
      </SectionLink>
    );
  }
  return (
    <Link href={href} className={linkCls}>
      {children}
    </Link>
  );
}

function ColumnTitle({ children }: { children: React.ReactNode }) {
  return <div className="mb-1.5 font-display text-sm font-semibold text-white">{children}</div>;
}

export function Footer() {
  return (
    <footer className="bg-navy text-slate-pale">
      <div className="mx-auto max-w-[1440px] px-5 pb-8 pt-14 sm:px-8 lg:px-20 lg:pt-[72px]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1.2fr_0.9fr_1.3fr] lg:gap-14">
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="Vertis Technology home">
              <Logo onDark />
            </Link>
            <p className="max-w-[320px] text-[15px] leading-relaxed">
              Jamaica's leading Managed IT Services provider offering enterprise-grade IT support, network
              infrastructure, cloud solutions, and IT security consulting.
            </p>
            <div className="flex gap-[18px] text-sm">
              {socials.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-white hover:text-leaf-light">
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2.5 text-sm">
            <ColumnTitle>Our Services</ColumnTitle>
            {services.map((s) => (
              <FooterLink key={s.id} href="/#services">
                {s.title}
              </FooterLink>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 text-sm">
            <ColumnTitle>Quick Links</ColumnTitle>
            {quickLinks.map((l) => (
              <FooterLink key={l.label} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </div>

          <div className="flex flex-col gap-2.5 text-sm">
            <ColumnTitle>Contact Us</ColumnTitle>
            <span className="leading-normal text-white">
              {contact.addressLines[0]}
              <br />
              {contact.addressLines[1]}
            </span>
            {contact.phones.map((p) => (
              <a key={p.href} href={p.href} className="text-white hover:text-leaf-light">
                {p.label}
              </a>
            ))}
            <a href={`mailto:${contact.email}`} className="text-leaf-light hover:text-white">
              {contact.email}
            </a>
            <span className="mt-1 leading-normal">
              Mon – Fri: 8:00 AM – 5:00 PM
              <br />
              Weekend: Emergency Support Only
            </span>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-navy-line pt-6 text-[13px] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} Vertis Technology. All rights reserved.</span>
          <div className="flex gap-6">
            <a href={SUPPORT_PORTAL_URL} className={linkCls}>
              Support Portal
            </a>
            <Link href="/contact" className={linkCls}>
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
