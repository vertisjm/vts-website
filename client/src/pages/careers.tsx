import { useEffect } from "react";
import { BarChart3, Clock, Medal, Users } from "lucide-react";
import { Container, Eyebrow, H2, IconBadge, PageHero, PillLink, contact } from "@/components/site";

import heroImage from "@assets/stock_images/careers-team.jpg";

const benefits = [
  { icon: Users, title: "Collaborative Team", description: "Work alongside talented professionals in a supportive environment." },
  { icon: BarChart3, title: "Growth Opportunities", description: "Continuous learning and career advancement programs." },
  { icon: Medal, title: "Competitive Benefits", description: "Comprehensive compensation and benefits packages." },
  { icon: Clock, title: "Work-Life Balance", description: "Flexible arrangements to support your personal life." },
];

// Open positions come from Zoho Recruit's embeddable job list.
const recruitOptions = {
  widget_id: "rec_job_listing_div",
  page_name: "Careers",
  source: "CareerSite",
  site: "https://vertisjm.zohorecruit.com",
  brand_color: "#0E6FA6",
  empty_job_msg: "No current openings",
};

function useZohoRecruitJobs() {
  useEffect(() => {
    if (!document.querySelector('link[href*="embed_jobs.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://static.zohocdn.com/recruit/embed_careers_site/css/v1.1/embed_jobs.css";
      link.type = "text/css";
      document.head.appendChild(link);
    }

    const load = () => (window as any).rec_embed_js?.load(recruitOptions);
    if (document.querySelector('script[src*="embed_jobs.js"]')) {
      load();
    } else {
      const script = document.createElement("script");
      script.src = "https://static.zohocdn.com/recruit/embed_careers_site/javascript/v1.1/embed_jobs.js";
      script.type = "text/javascript";
      script.onload = load;
      document.body.appendChild(script);
    }
  }, []);
}

export default function Careers() {
  useZohoRecruitJobs();

  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Join our"
        highlight="growing team."
        body="At Vertis Technology, we're building the future of IT services in the Caribbean. Join a team of passionate professionals making a real impact."
        cta={
          <PillLink href="#positions" arrow>
            View Open Positions
          </PillLink>
        }
        image={heroImage}
        imageAlt="Colleagues collaborating around a laptop"
      />

      <section className="py-14 lg:py-28">
        <Container className="flex flex-col gap-10 lg:gap-12">
          <div className="flex flex-col gap-3.5">
            <Eyebrow>Why work with us</Eyebrow>
            <H2>A place to do your best work.</H2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {benefits.map((b, i) => (
              <div key={b.title} className="flex flex-col gap-3 rounded-[20px] bg-mist p-7 lg:p-8" data-testid={`card-benefit-${i}`}>
                <IconBadge>
                  <b.icon aria-hidden="true" className="h-6 w-6" />
                </IconBadge>
                <h3 className="font-display text-xl font-semibold">{b.title}</h3>
                <p className="text-[15px] leading-relaxed text-slate">{b.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="positions" className="bg-mist py-14 lg:py-28">
        <Container className="flex flex-col gap-8">
          <div className="flex flex-col gap-3.5">
            <Eyebrow>Open positions</Eyebrow>
            <H2>Find your next opportunity.</H2>
          </div>

          <div className="rounded-[20px] border border-line bg-white p-4 sm:p-8">
            <div className="embed_jobs_head embed_jobs_with_style_1">
              <div className="embed_jobs_head2">
                <div className="embed_jobs_head3">
                  <div id="rec_job_listing_div" data-testid="container-job-listings" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5 rounded-2xl bg-navy px-6 py-7 text-white sm:flex-row sm:items-center sm:justify-between sm:px-8">
            <div className="flex flex-col gap-1">
              <span className="font-display text-xl font-semibold">Don't see a role that fits?</span>
              <span className="text-base text-slate-pale">Send your resume and we'll keep you in mind.</span>
            </div>
            <PillLink href={`mailto:${contact.jobsEmail}`} variant="leaf" size="md" data-testid="link-careers-email">
              {contact.jobsEmail}
            </PillLink>
          </div>
        </Container>
      </section>
    </>
  );
}
