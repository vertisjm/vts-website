import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft } from "lucide-react";
import { BlogCard, CategoryTag, postImage } from "@/components/blog-card";
import { Markdown } from "@/components/markdown";
import { Container, PillLink, Reveal } from "@/components/site";
import { blogPosts, formatPostDate, sortedPosts } from "@/lib/blog";
import NotFound from "@/pages/not-found";

export default function BlogPost() {
  const [, params] = useRoute("/blog/:slug");
  const post = blogPosts.find((p) => p.slug === params?.slug);

  useEffect(() => {
    if (!post) return;
    const previous = document.title;
    document.title = `${post.title} | Vertis Technology Blog`;
    return () => {
      document.title = previous;
    };
  }, [post]);

  if (!post) return <NotFound />;

  const related = [
    ...sortedPosts.filter((p) => p.slug !== post.slug && p.category === post.category),
    ...sortedPosts.filter((p) => p.slug !== post.slug && p.category !== post.category),
  ].slice(0, 3);

  return (
    <>
      <article>
        <header className="relative overflow-hidden bg-navy text-white">
          <img src={postImage(post)} alt="" className="ken-burns absolute inset-0 h-full w-full object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-navy via-navy/85 to-navy/60" />
          <Container className="relative flex max-w-[960px] flex-col gap-5 py-14 lg:py-20">
            <Link href="/blog" className="enter flex min-h-11 items-center gap-2 self-start text-sm font-semibold text-slate-pale hover:text-white">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" /> All insights
            </Link>
            <div className="enter" style={{ "--d": "60ms" } as React.CSSProperties}>
              <CategoryTag>{post.category}</CategoryTag>
            </div>
            <h1 className="enter font-display text-[34px] font-bold leading-[1.1] tracking-[-0.02em] sm:text-[44px] lg:text-5xl" style={{ "--d": "120ms" } as React.CSSProperties}>
              {post.title}
            </h1>
            <p className="enter text-sm text-slate-pale" style={{ "--d": "180ms" } as React.CSSProperties}>
              {post.author} · {formatPostDate(post.publishedDate)} · {post.readTime}
            </p>
          </Container>
        </header>

        <Container className="max-w-[800px] py-12 lg:py-16">
          <p className="mb-8 border-l-4 border-leaf pl-5 font-display text-lg leading-relaxed text-ink lg:text-xl">{post.excerpt}</p>
          <Markdown source={post.content} />
        </Container>
      </article>

      <section className="bg-mist py-14 lg:py-20">
        <Container className="flex flex-col gap-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-display text-2xl font-bold lg:text-3xl">More insights</h2>
            <PillLink href="/blog" variant="outline" size="md">
              View all insights
            </PillLink>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 90}>
                <BlogCard post={p} compact />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
