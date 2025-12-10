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
          <h2 className="text-2xl font-bold mb-8">Open Positions</h2>
          <div className="embed_jobs_head embed_jobs_with_style_1">
            <div className="embed_jobs_head2">
              <div className="embed_jobs_head3">
                <div id="rec_job_listing_div" data-testid="container-job-listings" />
              </div>
            </div>
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
    </>
  );
}
