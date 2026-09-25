import { useCallback, useEffect, useRef, useState } from "react";
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
    "inline-flex items-center justify-center gap-2.5 rounded-lg font-semibold transition-colors no-underline",
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

/** Dark photo hero used on the inner pages (About, Careers, Contact): the photo fills the right and fades into navy. */
export function PageHero({
  eyebrow,
  title,
  body,
  cta,
  image,
  imageAlt,
  imageClass,
}: {
  eyebrow: string;
  title: React.ReactNode;
  body: string;
  cta?: React.ReactNode;
  image: string;
  imageAlt: string;
  imageClass?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <img
        src={image}
        alt={imageAlt}
        className={cn("ken-burns absolute inset-0 h-full w-full object-cover lg:left-auto lg:w-[64%]", imageClass)}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-navy/80 lg:bg-transparent lg:bg-gradient-to-r lg:from-navy lg:from-[36%] lg:via-navy/70 lg:via-[52%] lg:to-navy/0"
      />
      <Container className="relative flex min-h-[440px] flex-col justify-center gap-5 py-16 lg:min-h-[520px] lg:py-24">
        <Eyebrow dark className="enter">
          {eyebrow}
        </Eyebrow>
        <h1 style={{ "--d": "100ms" } as React.CSSProperties} className="enter max-w-[620px] font-display text-[38px] font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-[56px]">
          {title}
        </h1>
        <p style={{ "--d": "220ms" } as React.CSSProperties} className="enter max-w-[520px] text-[17px] leading-relaxed text-slate-mist lg:text-lg">
          {body}
        </p>
        {cta && (
          <div style={{ "--d": "340ms" } as React.CSSProperties} className="enter mt-2 flex">
            {cta}
          </div>
        )}
      </Container>
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

/* ---------- Motion ---------- */

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** True once the element has scrolled into view, or been scrolled past (and stays true). */
export function useInView<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (!("IntersectionObserver" in window)) {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      // The huge top margin counts anything already above the viewport as seen, so jumping past a section
      // (a fast scroll or a #link) never leaves its content hidden.
      { threshold, rootMargin: "100000px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, threshold]);
  return [ref, inView] as const;
}

/**
 * Fades and lifts its content in when it scrolls into view. `delay` (ms) staggers items in a row.
 * Styles live in index.css (.reveal); people who prefer reduced motion see content immediately.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as: Tag = "div",
  variant = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "span";
  variant?: "up" | "fade" | "left" | "right" | "zoom";
}) {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <Tag
      ref={ref as React.Ref<never>}
      className={cn("reveal", `reveal-${variant}`, inView && "is-visible", className)}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/** Counts a number up from zero the first time it scrolls into view, e.g. "200+" or "99.9%". */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const match = /^(\D*)(\d+(?:\.\d+)?)(.*)$/.exec(value);
  const [ref, inView] = useInView<HTMLSpanElement>(0.4);
  const target = match ? parseFloat(match[2]) : 0;
  const decimals = match && match[2].includes(".") ? match[2].split(".")[1].length : 0;
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView || !match) return;
    if (prefersReducedMotion()) {
      setCurrent(target);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setCurrent(target * eased);
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, target]);

  // Values like "24/7" have nothing to count; show them as they are.
  if (!match || value.includes("/")) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className} aria-label={value}>
      <span aria-hidden="true">
        {match[1]}
        {current.toFixed(decimals)}
        {match[3]}
      </span>
    </span>
  );
}
