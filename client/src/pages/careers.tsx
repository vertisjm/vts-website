import { useEffect } from "react";
import { GraduationCap, Puzzle, Sprout, Users } from "lucide-react";
import { Container, Eyebrow, PageHero, PillLink, Reveal, contact } from "@/components/site";

import heroImage from "@assets/stock_images/careers-team.jpg";
import teamImage from "@assets/stock_images/industries-meeting.jpg";

const ZOHO_RECRUIT_SITE = "https://vertisjm.zohorecruit.com";

const reasons = [
  { icon: Users, title: "Meaningful work", body: "Work on enterprise technology solutions across cloud, cybersecurity, infrastructure and more." },
  { icon: GraduationCap, title: "Keep developing", body: "Certifications, training, mentoring and exposure to enterprise environments." },
  { icon: Puzzle, title: "Solve real problems", body: "Work directly with clients on technology that their organisations depend on." },
  { icon: Sprout, title: "Grow with us", body: "Build your career as Vertis expands across Jamaica and the Caribbean." },
];

// Open positions come from Zoho Recruit's embeddable job list.
const recruitOptions = {
  widget_id: "rec_job_listing_div",
  page_name: "Careers",
  source: "CareerSite",
  site: ZOHO_RECRUIT_SITE,
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

const h2Cls = "font-display text-3xl font-bold leading-[1.15] tracking-[-0.015em] lg:text-[38px]";

export default function Careers() {
  useZohoRecruitJobs();

  return (
    <>
      <PageHero
        eyebrow="Careers at Vertis"
        title={
          <>
            Build technology
            <br />
            that makes a difference.
          </>
        }
        body="Join a team solving real technology challenges for organisations across Jamaica and the Caribbean."
        cta={
          <PillLink href="#positions" arrow size="md">
            View Open Positions
          </PillLink>
        }
        image={heroImage}
        imageAlt="Colleagues collaborating around a laptop"
      />

      <section className="py-14 lg:py-24">
        <Container className="flex flex-col gap-10">
          <Reveal>
            <h2 className={h2Cls}>Learn. Solve. Build. Grow.</h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 100} className="group flex flex-col gap-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-leaf-tint transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-3" data-testid={`card-benefit-${i}`}>
                  <r.icon aria-hidden="true" className="h-7 w-7 text-leaf-dark" strokeWidth={1.6} />
                </span>
                <h3 className="font-display text-lg font-semibold">{r.title}</h3>
                <p className="text-[15px] leading-relaxed text-slate">{r.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section id="positions" className="bg-mist py-14 lg:py-24">
        <Container className="flex flex-col gap-8">
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex flex-col gap-3">
              <Eyebrow className="text-slate">Open positions</Eyebrow>
              <h2 className={h2Cls}>Find your next opportunity at Vertis.</h2>
            </div>
            <a
              href={`${ZOHO_RECRUIT_SITE}/jobs/Careers`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-11 items-center gap-2 self-start text-[15px] font-semibold text-brand hover:text-brand-dark sm:self-auto"
            >
              View all positions →
            </a>
          </Reveal>

          <div className="rounded-xl border border-line bg-white p-4 sm:p-8">
            <div className="embed_jobs_head embed_jobs_with_style_1">
              <div className="embed_jobs_head2">
                <div className="embed_jobs_head3">
                  <div id="rec_job_listing_div" data-testid="container-job-listings" />
                </div>
              </div>
            </div>
          </div>

          <p className="text-[15px] text-slate">
            Don't see a role that fits? Send your resume to{" "}
            <a href={`mailto:${contact.jobsEmail}`} className="font-semibold text-brand hover:text-brand-dark" data-testid="link-careers-email">
              {contact.jobsEmail}
            </a>{" "}
            and we'll keep you in mind.
          </p>
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container>
          <Reveal variant="zoom" className="grid grid-cols-1 overflow-hidden rounded-2xl bg-navy text-white lg:grid-cols-2">
            <img src={teamImage} alt="Team meeting around a table with laptops" className="h-64 w-full object-cover lg:h-full" />
            <div className="flex flex-col justify-center gap-4 px-7 py-10 lg:px-14 lg:py-16">
              <h2 className="font-display text-[28px] font-bold leading-tight lg:text-[34px]">A team that supports each other.</h2>
              <p className="text-base leading-relaxed text-slate-mist">
                We value collaboration, continuous learning and a shared commitment to delivering excellent service to our
                customers.
              </p>
              <div className="mt-2">
                <PillLink href="/about#team" arrow size="md">
                  Meet the Team
                </PillLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
