import { useCallback } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Camera } from "lucide-react";
import { cn } from "@/lib/utils";

/* Shared building blocks for the 2026 redesign. */

export const SUPPORT_PORTAL_URL = "https://support.vertisjm.com/portal/en/home";

export const contact = {
  addressLines: ["1b Braemar Avenue", "Kingston 10, Jamaica"],
  directionsUrl: "https://www.google.com/maps/search/?api=1&query=1b+Braemar+Avenue+Kingston+10+Jamaica",
  phones: [
    { label: "+1 (876) 634-8700", href: "tel:+18766348700" },
    { label: "+1 (876) 634-8699", href: "tel:+18766348699" },
  ],
  email: "sales@vertisjm.com",
  jobsEmail: "jobs@vertisjm.com",
  hours: ["Monday – Friday: 8:00 AM – 5:00 PM", "Weekend: Emergency Support Only"],
};

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-20", className)}>{children}</div>;
}

/** Small uppercase label above a heading. `dark` for use on navy backgrounds. */
export function Eyebrow({ children, dark, rule, className }: { children: React.ReactNode; dark?: boolean; rule?: boolean; className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-3 text-xs sm:text-[13px] font-semibold tracking-[0.18em] uppercase",
        dark ? "text-leaf-light" : "text-leaf-dark",
        className,
      )}
    >
      {rule && <span aria-hidden="true" className="h-[3px] w-7 bg-leaf" />}
      {children}
    </div>
  );
}

export function H2({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("font-display font-bold text-3xl sm:text-4xl lg:text-[44px] leading-[1.12] tracking-[-0.015em]", className)}>
      {children}
    </h2>
  );
}

type Variant = "primary" | "outline-dark" | "outline" | "white" | "leaf";

const variantClass: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-dark",
  "outline-dark": "border-[1.5px] border-[#5C7690] text-white hover:bg-white/10",
  outline: "border-[1.5px] border-brand text-brand hover:bg-brand hover:text-white",
  white: "bg-white text-navy hover:bg-brand-tint",
  leaf: "bg-leaf text-navy hover:bg-leaf-light",
};

const sizeClass = {
  md: "h-12 px-5 text-[15px]",
  lg: "h-[52px] sm:h-14 px-6 sm:px-7 text-base",
};

export function pillClass(variant: Variant = "primary", size: "md" | "lg" = "lg", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2.5 rounded-full font-semibold transition-colors no-underline",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf",
    sizeClass[size],
    variantClass[variant],
    className,
  );
}

/** Pill-shaped link. Internal paths use the router; everything else is a plain anchor. */
export function PillLink({
  href,
  variant = "primary",
  size = "lg",
  arrow,
  className,
  children,
  ...rest
}: {
  href: string;
  variant?: Variant;
  size?: "md" | "lg";
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href">) {
  const inner = (
    <>
      {children}
      {arrow && <ArrowRight aria-hidden="true" className="h-[18px] w-[18px]" />}
    </>
  );
  const cls = pillClass(variant, size, className);
  if (href.startsWith("/") && !href.includes("#")) {
    return (
      <Link href={href} className={cls} {...rest}>
        {inner}
      </Link>
    );
  }
  if (href.startsWith("/#")) {
    return (
      <SectionLink href={href} className={cls} {...rest}>
        {inner}
      </SectionLink>
    );
  }
  return (
    <a href={href} className={cls} {...rest}>
      {inner}
    </a>
  );
}

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

/** Link to a section of the home page ("/#services") that works from any route. */
export function SectionLink({
  href,
  onClick,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const [location, navigate] = useLocation();
  const id = href.split("#")[1];
  const handle = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      onClick?.(e);
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
      e.preventDefault();
      if (location === "/") {
        history.replaceState(null, "", `/#${id}`);
        scrollToId(id);
      } else {
        navigate("/");
        history.replaceState(null, "", `/#${id}`);
        // Wait for the home page to render before scrolling.
        setTimeout(() => scrollToId(id), 60);
      }
    },
    [id, location, navigate, onClick],
  );
  return <a href={href} onClick={handle} {...rest} />;
}

/** Stand-in for a photo that hasn't been supplied yet. */
export function PhotoPlaceholder({ label, className, dark = true }: { label: string; className?: string; dark?: boolean }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 border border-dashed p-6 text-center text-sm",
        dark ? "border-navy-dash bg-navy-700 text-slate-fog" : "border-line-strong bg-line-photo text-slate-muted",
        className,
      )}
    >
      <Camera aria-hidden="true" className="h-9 w-9" strokeWidth={1.6} />
      {label}
    </div>
  );
}

/** Dark hero used on the inner pages (About, Careers, Contact). */
export function PageHero({
  eyebrow,
  title,
  highlight,
  body,
  cta,
  image,
  imageAlt,
  photoLabel,
}: {
  eyebrow: string;
  title: string;
  highlight: string;
  body: string;
  cta?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  photoLabel?: string;
}) {
  return (
    <section className="flex flex-col bg-navy text-white lg:min-h-[560px] lg:flex-row">
      <div className="flex flex-col justify-center gap-6 px-5 py-16 sm:px-8 lg:w-[700px] lg:shrink-0 lg:py-24 lg:pl-20 lg:pr-16">
        <Eyebrow dark rule>
          {eyebrow}
        </Eyebrow>
        <h1 className="font-display text-[40px] font-bold leading-[1.06] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
          {title} <span className="text-leaf">{highlight}</span>
        </h1>
        <p className="text-[17px] leading-relaxed text-slate-mist sm:text-[19px]">{body}</p>
        {cta && <div className="flex">{cta}</div>}
      </div>
      <div className="relative min-h-[260px] flex-1 overflow-hidden lg:rounded-bl-[160px]">
        {image ? (
          <img src={image} alt={imageAlt ?? ""} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <PhotoPlaceholder label={photoLabel ?? "Photo"} className="absolute inset-0 border-y-0 border-r-0" />
        )}
      </div>
    </section>
  );
}

/** The mark from the logo, drawn in brand colours; used as a faint hero decoration. */
export function FanMark({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 560 520" className={className}>
      <path d="M250 520 Q 200 260 40 120" fill="none" stroke="#1A94D2" strokeWidth="26" />
      <path d="M310 520 Q 360 260 520 120" fill="none" stroke="#1A94D2" strokeWidth="26" />
      <path d="M215 520 Q 140 340 0 260" fill="none" stroke="#1A94D2" strokeWidth="26" />
      <path d="M345 520 Q 420 340 560 260" fill="none" stroke="#1A94D2" strokeWidth="26" />
      <path d="M280 500 Q 250 250 160 60 Q 280 0 400 60 Q 310 250 280 500 Z" fill="#8BC441" />
    </svg>
  );
}

export function IconBadge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-leaf-tint text-leaf-dark", className)}>
      {children}
    </span>
  );
}
