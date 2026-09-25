import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { SectionLink, SUPPORT_PORTAL_URL, pillClass } from "./site";
import vertisMark from "@assets/vertis-mark.png";

type NavItem = { label: string; href: string };

const navItems: NavItem[] = [
  { label: "Solutions", href: "/#solutions" },
  { label: "Industries", href: "/#industries" },
  { label: "Insights", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export function Logo({ onDark, size = "md" }: { onDark?: boolean; size?: "sm" | "md" }) {
  return (
    <span className="flex items-center gap-3">
      <img src={vertisMark} alt="" className={size === "sm" ? "h-9 w-9" : "h-11 w-11"} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display font-bold tracking-[0.1em]",
            size === "sm" ? "text-lg" : "text-[22px]",
            onDark ? "text-white" : "text-navy",
          )}
        >
          VERTIS
        </span>
        <span
          className={cn(
            "mt-[5px] font-semibold tracking-[0.42em]",
            size === "sm" ? "text-[8px]" : "text-[9px]",
            onDark ? "text-slate-pale" : "text-slate",
          )}
        >
          TECHNOLOGY
        </span>
      </span>
    </span>
  );
}

function NavLink({ item, active, className, onNavigate }: { item: NavItem; active: boolean; className: string; onNavigate?: () => void }) {
  const props = {
    className,
    "aria-current": active ? ("page" as const) : undefined,
    onClick: onNavigate,
  };
  if (item.href.startsWith("/#")) {
    return (
      <SectionLink href={item.href} {...props}>
        {item.label}
      </SectionLink>
    );
  }
  return (
    <Link href={item.href} {...props}>
      {item.label}
    </Link>
  );
}

export function Navigation() {
  const [location] = useLocation();
  const [open, setOpen] = useState(false);
  const isActive = (item: NavItem) =>
    !item.href.startsWith("/#") && (location === item.href || location.startsWith(item.href + "/"));

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-[88px] lg:px-20">
        <Link href="/" aria-label="Vertis Technology home" className="shrink-0" data-testid="link-logo">
          <span className="hidden lg:block">
            <Logo />
          </span>
          <span className="lg:hidden">
            <Logo size="sm" />
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 xl:flex xl:gap-10">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              item={item}
              active={isActive(item)}
              className={cn(
                "border-b-[3px] pb-[27px] pt-[30px] text-[15px] transition-colors hover:text-brand",
                isActive(item) ? "border-leaf font-semibold text-brand" : "border-transparent font-medium text-ink",
              )}
            />
          ))}
        </nav>

        <div className="hidden items-center xl:flex">
          <Link href="/contact" className={pillClass("primary", "md", "h-11 px-5")} data-testid="button-nav-consultation">
            Talk to an Expert
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              type="button"
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink xl:hidden"
              data-testid="button-mobile-menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[320px] bg-white p-0">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <div className="flex h-full flex-col">
              <div className="border-b border-line px-6 py-5">
                <SheetClose asChild>
                  <Link href="/" aria-label="Vertis Technology home">
                    <Logo size="sm" />
                  </Link>
                </SheetClose>
              </div>
              <nav aria-label="Mobile" className="flex flex-col px-3 py-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.label}
                    item={item}
                    active={isActive(item)}
                    onNavigate={() => setOpen(false)}
                    className={cn(
                      "rounded-xl px-3 py-3.5 text-base",
                      isActive(item) ? "bg-leaf-tint font-semibold text-leaf-dark" : "font-medium text-ink hover:bg-mist",
                    )}
                  />
                ))}
              </nav>
              <div className="mt-auto flex flex-col gap-3 border-t border-line p-6">
                <SheetClose asChild>
                  <Link href="/contact" className={pillClass("primary", "md")}>
                    Talk to an Expert
                  </Link>
                </SheetClose>
                <a href={SUPPORT_PORTAL_URL} className={pillClass("outline", "md")}>
                  Support Portal
                </a>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
