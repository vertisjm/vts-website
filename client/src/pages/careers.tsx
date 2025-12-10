import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";

export default function Careers() {
  useEffect(() => {
    const existingLink = document.querySelector('link[href*="embed_jobs.css"]');
    if (!existingLink) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://static.zohocdn.com/recruit/embed_careers_site/css/v1.1/embed_jobs.css";
      link.type = "text/css";
      document.head.appendChild(link);
    }

    const existingScript = document.querySelector('script[src*="embed_jobs.js"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://static.zohocdn.com/recruit/embed_careers_site/javascript/v1.1/embed_jobs.js";
      script.type = "text/javascript";
      script.onload = () => {
        if ((window as any).rec_embed_js) {
          (window as any).rec_embed_js.load({
            widget_id: "rec_job_listing_div",
            page_name: "Careers",
            source: "CareerSite",
            site: "https://vertisjm.zohorecruit.com",
            brand_color: "#7289db",
            empty_job_msg: "No current Openings"
          });
        }
      };
      document.body.appendChild(script);
    } else {
      if ((window as any).rec_embed_js) {
        (window as any).rec_embed_js.load({
          widget_id: "rec_job_listing_div",
          page_name: "Careers",
          source: "CareerSite",
          site: "https://vertisjm.zohorecruit.com",
          brand_color: "#7289db",
          empty_job_msg: "No current Openings"
        });
      }
    }
  }, []);

  return (
    <>
      <section className="py-16 lg:py-20 bg-gradient-to-br from-primary/10 via-background to-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Badge variant="secondary" className="mb-6">Careers</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight mb-6" data-testid="text-careers-title">
              Join Our <span className="text-primary">Growing Team</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed" data-testid="text-careers-description">
              At Vertis Technology, we're building the future of IT services in the Caribbean. Join a team of passionate professionals making a real impact.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="embed_jobs_head embed_jobs_with_style_1">
            <div className="embed_jobs_head2">
              <div className="embed_jobs_head3">
                <div id="rec_job_listing_div" data-testid="container-job-listings" />
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't see a role that fits? Send your resume to{" "}
            <a href="mailto:careers@vertisjm.com" className="text-primary hover:underline" data-testid="link-careers-email">
              careers@vertisjm.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
