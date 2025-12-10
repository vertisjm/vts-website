import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Lightbulb, TrendingUp, Heart } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Collaborative Team",
    description: "Work alongside talented professionals in a supportive environment"
  },
  {
    icon: Lightbulb,
    title: "Growth Opportunities",
    description: "Continuous learning and career advancement programs"
  },
  {
    icon: TrendingUp,
    title: "Competitive Benefits",
    description: "Comprehensive compensation and benefits packages"
  },
  {
    icon: Heart,
    title: "Work-Life Balance",
    description: "Flexible arrangements to support your personal life"
  }
];

export default function Careers() {
  useEffect(() => {
    const styleId = 'zoho-recruit-override-styles';
    const existingStyle = document.getElementById(styleId);
    
    if (!existingStyle) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        /* Override Zoho Recruit Embed Styles */
        .embed_jobs_with_style_1 {
          font-family: inherit !important;
        }
        
        .embed_jobs_with_style_1 .embed_jobs_head,
        .embed_jobs_with_style_1 .embed_jobs_head2,
        .embed_jobs_with_style_1 .embed_jobs_head3 {
          background: transparent !important;
          border: none !important;
          padding: 0 !important;
          margin: 0 !important;
        }
        
        /* Job listing container */
        .embed_jobs_with_style_1 #rec_job_listing_div {
          background: transparent !important;
        }
        
        /* Job cards */
        .embed_jobs_with_style_1 .embed_job {
          background: hsl(var(--card)) !important;
          border: 1px solid hsl(var(--border)) !important;
          border-radius: 0.5rem !important;
          padding: 1.5rem !important;
          margin-bottom: 1rem !important;
          transition: box-shadow 0.2s ease, transform 0.2s ease !important;
        }
        
        .embed_jobs_with_style_1 .embed_job:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
          transform: translateY(-2px) !important;
        }
        
        /* Job title */
        .embed_jobs_with_style_1 .embed_job .embed_job_title,
        .embed_jobs_with_style_1 .embed_job .embed_job_title a {
          font-size: 1.25rem !important;
          font-weight: 600 !important;
          color: hsl(var(--foreground)) !important;
          text-decoration: none !important;
          line-height: 1.4 !important;
          margin-bottom: 0.75rem !important;
          display: block !important;
        }
        
        .embed_jobs_with_style_1 .embed_job .embed_job_title a:hover {
          color: hsl(var(--primary)) !important;
        }
        
        /* Job details (location, department, etc.) */
        .embed_jobs_with_style_1 .embed_job .embed_job_details,
        .embed_jobs_with_style_1 .embed_job .embed_job_location,
        .embed_jobs_with_style_1 .embed_job .embed_job_department,
        .embed_jobs_with_style_1 .embed_job .embed_job_type,
        .embed_jobs_with_style_1 .embed_job span {
          font-size: 0.875rem !important;
          color: hsl(var(--muted-foreground)) !important;
          line-height: 1.6 !important;
        }
        
        /* Job description */
        .embed_jobs_with_style_1 .embed_job .embed_job_desc {
          font-size: 0.9375rem !important;
          color: hsl(var(--muted-foreground)) !important;
          line-height: 1.7 !important;
          margin-top: 0.75rem !important;
        }
        
        /* Apply button */
        .embed_jobs_with_style_1 .embed_job .embed_apply_btn,
        .embed_jobs_with_style_1 .embed_job a.embed_apply_btn,
        .embed_jobs_with_style_1 .embed_job button {
          background: hsl(var(--primary)) !important;
          color: hsl(var(--primary-foreground)) !important;
          border: none !important;
          border-radius: 0.375rem !important;
          padding: 0.625rem 1.25rem !important;
          font-size: 0.875rem !important;
          font-weight: 500 !important;
          cursor: pointer !important;
          transition: opacity 0.2s ease !important;
          text-decoration: none !important;
          display: inline-block !important;
          margin-top: 1rem !important;
        }
        
        .embed_jobs_with_style_1 .embed_job .embed_apply_btn:hover,
        .embed_jobs_with_style_1 .embed_job a.embed_apply_btn:hover,
        .embed_jobs_with_style_1 .embed_job button:hover {
          opacity: 0.9 !important;
        }
        
        /* Section headers */
        .embed_jobs_with_style_1 .embed_jobs_heading,
        .embed_jobs_with_style_1 h2,
        .embed_jobs_with_style_1 h3 {
          font-size: 1.5rem !important;
          font-weight: 600 !important;
          color: hsl(var(--foreground)) !important;
          margin-bottom: 1.5rem !important;
        }
        
        /* No jobs message */
        .embed_jobs_with_style_1 .embed_no_jobs,
        .embed_jobs_with_style_1 .no_jobs_msg {
          text-align: center !important;
          padding: 3rem !important;
          color: hsl(var(--muted-foreground)) !important;
          font-size: 1rem !important;
          background: hsl(var(--card)) !important;
          border: 1px solid hsl(var(--border)) !important;
          border-radius: 0.5rem !important;
        }
        
        /* Filter/search elements */
        .embed_jobs_with_style_1 select,
        .embed_jobs_with_style_1 input[type="text"],
        .embed_jobs_with_style_1 input[type="search"] {
          background: hsl(var(--background)) !important;
          border: 1px solid hsl(var(--border)) !important;
          border-radius: 0.375rem !important;
          padding: 0.5rem 0.75rem !important;
          font-size: 0.875rem !important;
          color: hsl(var(--foreground)) !important;
        }
        
        .embed_jobs_with_style_1 select:focus,
        .embed_jobs_with_style_1 input[type="text"]:focus,
        .embed_jobs_with_style_1 input[type="search"]:focus {
          outline: none !important;
          border-color: hsl(var(--primary)) !important;
          box-shadow: 0 0 0 2px hsl(var(--primary) / 0.2) !important;
        }
        
        /* Links */
        .embed_jobs_with_style_1 a {
          color: hsl(var(--primary)) !important;
          text-decoration: none !important;
        }
        
        .embed_jobs_with_style_1 a:hover {
          text-decoration: underline !important;
        }
        
        /* Dark mode adjustments */
        .dark .embed_jobs_with_style_1 .embed_job {
          background: hsl(var(--card)) !important;
          border-color: hsl(var(--border)) !important;
        }
        
        .dark .embed_jobs_with_style_1 .embed_job:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
        }
        
        /* Remove any unwanted Zoho branding */
        .embed_jobs_with_style_1 .powered_by,
        .embed_jobs_with_style_1 .zoho_branding {
          display: none !important;
        }
        
        /* Loading state */
        .embed_jobs_with_style_1 .embed_loading {
          text-align: center !important;
          padding: 2rem !important;
          color: hsl(var(--muted-foreground)) !important;
        }
      `;
      document.head.appendChild(style);
    }

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
            brand_color: "#1755B5",
            empty_job_msg: "No current openings available. Check back soon!"
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
          brand_color: "#1755B5",
          empty_job_msg: "No current openings available. Check back soon!"
        });
      }
    }

    return () => {
      const styleToRemove = document.getElementById(styleId);
      if (styleToRemove) {
        styleToRemove.remove();
      }
    };
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

      <section className="py-12 lg:py-16 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center mb-10">Why Work With Us</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} data-testid={`card-benefit-${index}`}>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-8">Open Positions</h2>
          <div className="embed_jobs_with_style_1">
            <div id="rec_job_listing_div" data-testid="container-job-listings" />
          </div>

          <div className="mt-12 text-center">
            <Card className="inline-block">
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-2">
                  Don't see a role that fits?
                </p>
                <p className="text-sm text-muted-foreground">
                  Send your resume to{" "}
                  <a href="mailto:careers@vertisjm.com" className="text-primary hover:underline font-medium" data-testid="link-careers-email">
                    careers@vertisjm.com
                  </a>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
}
