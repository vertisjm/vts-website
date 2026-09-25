import { useEffect } from "react";
import { useLocation } from "wouter";
import { Navigation } from "./navigation";
import { Footer } from "./footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  // Start each page at the top, unless we're heading to a section of it.
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="flex min-h-screen flex-col bg-white text-ink">
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
