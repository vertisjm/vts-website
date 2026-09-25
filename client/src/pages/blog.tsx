import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { BlogCard, CategoryTag, postImage } from "@/components/blog-card";
import { Container, Eyebrow, PillLink, Reveal } from "@/components/site";
import { formatPostDate, sortedPosts } from "@/lib/blog";

export default function Blog() {
  const categories = useMemo(() => ["All", ...Array.from(new Set(sortedPosts.map((p) => p.category)))], []);
  const [category, setCategory] = useState("All");
  const [lead, ...rest] = sortedPosts;
  const visible = category === "All" ? rest : sortedPosts.filter((p) => p.category === category);

  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        <div aria-hidden="true" className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand/30 blur-[120px]" />
        <Container className="relative flex flex-col gap-5 py-16 lg:py-24">
          <Eyebrow dark className="enter">
            Insights
          </Eyebrow>
          <h1 className="enter max-w-[720px] font-display text-[38px] font-bold leading-[1.08] tracking-[-0.02em] sm:text-5xl lg:text-[56px]" style={{ "--d": "80ms" } as React.CSSProperties}>
            IT insights & resources.
          </h1>
          <p className="enter max-w-[560px] text-[17px] leading-relaxed text-slate-mist lg:text-lg" style={{ "--d": "160ms" } as React.CSSProperties}>
            Expert insights on managed IT services, cybersecurity, cloud solutions and technology trends for Caribbean
            businesses.
          </p>
        </Container>
      </section>

      {/* Latest article, large */}
      <section className="py-14 lg:py-20">
        <Container>
          <Reveal>
            <Link
              href={`/blog/${lead.slug}`}
              className="lift group grid grid-cols-1 overflow-hidden rounded-2xl border border-line bg-white text-ink lg:grid-cols-[1.2fr_1fr]"
              data-testid={`card-post-${lead.slug}`}
            >
              <span className="block h-60 overflow-hidden bg-line-photo lg:h-full lg:min-h-[340px]">
                <img src={postImage(lead)} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </span>
              <span className="flex flex-col justify-center gap-4 p-7 lg:p-12">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate">Latest article</span>
                <CategoryTag>{lead.category}</CategoryTag>
                <span className="font-display text-2xl font-bold leading-snug lg:text-[32px]">{lead.title}</span>
                <span className="text-base leading-relaxed text-slate">{lead.excerpt}</span>
                <span className="flex items-center gap-2 text-[15px] font-semibold text-brand">
                  Read article <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-sm text-slate">
                  {formatPostDate(lead.publishedDate)} · {lead.readTime}
                </span>
              </span>
            </Link>
          </Reveal>
        </Container>
      </section>

      {/* All articles with a category filter */}
      <section className="bg-mist py-14 lg:py-20">
        <Container className="flex flex-col gap-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <h2 className="font-display text-3xl font-bold leading-tight lg:text-[38px]">All articles</h2>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by topic">
              {categories.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  aria-pressed={category === c}
                  className={
                    "min-h-11 rounded-lg px-4 text-sm font-semibold transition-colors " +
                    (category === c ? "bg-navy text-white" : "border border-line-strong bg-white text-ink hover:border-navy")
                  }
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((post, i) => (
              <Reveal key={post.slug} delay={(i % 3) * 90}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-14 lg:py-20">
        <Container>
          <Reveal className="flex flex-col items-start gap-5 rounded-2xl bg-navy px-7 py-10 text-white lg:flex-row lg:items-center lg:justify-between lg:px-14 lg:py-12">
            <div className="flex flex-col gap-2">
              <h2 className="font-display text-[26px] font-bold lg:text-[30px]">Need IT support for your business?</h2>
              <p className="text-base text-slate-mist">
                Our team of experts is ready to help you optimise your IT infrastructure and protect your business.
              </p>
            </div>
            <PillLink href="/contact" arrow className="shrink-0">
              Talk to an Expert
            </PillLink>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
