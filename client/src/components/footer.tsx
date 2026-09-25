import { Link } from "wouter";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { Logo } from "./navigation";
import { SectionLink, SUPPORT_PORTAL_URL, contact } from "./site";
import { industries, services } from "@/lib/data";

const companyLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Team", href: "/about#team" },
  { label: "Technology Partners", href: "/#partners" },
  { label: "Insights", href: "/blog" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const socials = [
  { label: "LinkedIn", href: "https://jm.linkedin.com/company/vertis-technology", icon: Linkedin },
  { label: "Facebook", href: "https://www.facebook.com/vertisjm/", icon: Facebook },
  { label: "Instagram", href: "https://www.instagram.com/vertistechnology/", icon: Instagram },
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
  if (href.includes("#")) {
    // A section on another page: a normal link so the browser jumps to it after loading.
    return (
      <a href={href} className={linkCls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={linkCls}>
      {children}
    </Link>
  );
}

function Column({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2.5 text-sm">
      <div className="mb-1.5 font-display text-sm font-semibold text-white">{title}</div>
      {children}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy text-slate-pale">
      <div className="mx-auto max-w-[1440px] px-5 pb-8 pt-14 sm:px-8 lg:px-20 lg:pt-[72px]">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_0.9fr_1.3fr] lg:gap-12">
          <div className="flex flex-col gap-5">
            <Link href="/" aria-label="Vertis Technology home">
              <Logo onDark />
            </Link>
            <p className="max-w-[300px] text-[15px] leading-relaxed">
              Enterprise technology solutions for a stronger, more resilient Caribbean.
            </p>
            <div className="flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-lg bg-white/10 text-white transition-colors hover:bg-white/20"
                >
                  <s.icon aria-hidden="true" className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <Column title="Solutions">
            {services.map((s) => (
              <FooterLink key={s.id} href="/#solutions">
                {s.title}
              </FooterLink>
            ))}
          </Column>

          <Column title="Industries">
            {industries.map((i) => (
              <FooterLink key={i} href="/#industries">
                {i}
              </FooterLink>
            ))}
          </Column>

          <Column title="Company">
            {companyLinks.map((l) => (
              <FooterLink key={l.label} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </Column>

          <Column title="Client Support">
            <a href={SUPPORT_PORTAL_URL} className="text-leaf-light hover:text-white">
              Support Portal
            </a>
            {contact.phones.map((p) => (
              <a key={p.href} href={p.href} className="text-white hover:text-leaf-light">
                {p.label}
              </a>
            ))}
            <a href={`mailto:${contact.email}`} className="text-white hover:text-leaf-light">
              {contact.email}
            </a>
            <span className="mt-1 leading-normal">
              {contact.addressLines[0]}, {contact.addressLines[1]}
            </span>
            <span className="leading-normal">
              Mon – Fri: 8:00 AM – 5:00 PM
              <br />
              Weekend: Emergency Support Only
            </span>
          </Column>
        </div>

        <div className="mt-12 border-t border-navy-line pt-6 text-[13px]">
          © {new Date().getFullYear()} Vertis Technology. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
