import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { SEO } from "@/components/seo";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const relatedPosts = blogPosts
    .filter(p => p.id !== post?.id && p.category === post?.category)
    .slice(0, 2);

  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: JSX.Element[] = [];
    let currentList: string[] = [];
    let listKey = 0;

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${listKey++}`} className="list-disc list-inside space-y-2 mb-6 text-muted-foreground">
            {currentList.map((item, i) => (
              <li key={i} dangerouslySetInnerHTML={{ __html: formatText(item) }} />
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    const formatText = (text: string) => {
      return text
        .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>');
    };

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();
      
      if (trimmedLine === '') {
        flushList();
        return;
      }

      if (trimmedLine.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={index} className="text-2xl font-bold text-foreground mt-8 mb-4">
            {trimmedLine.substring(3)}
          </h2>
        );
      } else if (trimmedLine.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={index} className="text-xl font-semibold text-foreground mt-6 mb-3">
            {trimmedLine.substring(4)}
          </h3>
        );
      } else if (trimmedLine.startsWith('- ')) {
        currentList.push(trimmedLine.substring(2));
      } else {
        flushList();
        elements.push(
          <p key={index} className="text-muted-foreground mb-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: formatText(trimmedLine) }} />
        );
      }
    });

    flushList();
    return elements;
  };

  if (!post) {
    return (
      <div className="bg-background">
        <SEO 
          title="Article Not Found | Vertis Technology"
          description="The article you're looking for doesn't exist or has been moved."
        />
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/blog">
            <Button data-testid="button-back-to-blog">
              <ArrowLeft className="mr-2 w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background">
      <SEO 
        title={`${post.title} | Vertis Technology Blog`}
        description={post.excerpt}
        canonical={`https://vertisjm.com/blog/${post.slug}`}
        type="article"
        publishedTime={post.publishedDate}
        author={post.author}
        keywords={`${post.category}, IT services Jamaica, ${post.title.toLowerCase().split(' ').slice(0, 3).join(', ')}`}
      />
      <section className="relative py-16 bg-gradient-to-br from-[#0B1F3A] via-[#1755B5] to-[#0B1F3A] overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <Link href="/blog">
              <Button variant="ghost" className="text-white/80 mb-6 -ml-4" data-testid="button-back-to-blog-header">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to Blog
              </Button>
            </Link>
            
            <Badge variant="secondary" className="mb-4" data-testid="badge-post-category">
              {post.category}
            </Badge>
            
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-6" data-testid="text-post-title">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span data-testid="text-author">{post.author}</span>
                <span className="text-white/60">•</span>
                <span data-testid="text-author-role">{post.authorRole}</span>
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span data-testid="text-date">{formatDate(post.publishedDate)}</span>
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span data-testid="text-read-time">{post.readTime}</span>
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg max-w-none"
              data-testid="article-content"
            >
              {renderContent(post.content)}
            </motion.div>

            <div className="border-t border-border mt-12 pt-8">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Written by</p>
                  <p className="font-semibold text-foreground">{post.author}</p>
                  <p className="text-sm text-muted-foreground">{post.authorRole}</p>
                </div>
                <Button variant="outline" onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                  }
                }} data-testid="button-share">
                  <Share2 className="mr-2 w-4 h-4" />
                  Share Article
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6">Related Articles</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} href={`/blog/${relatedPost.slug}`}>
                    <Card className="h-full hover-elevate cursor-pointer" data-testid={`card-related-post-${relatedPost.id}`}>
                      <CardHeader className="pb-2">
                        <Badge variant="outline" className="w-fit mb-2">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="font-semibold text-foreground">
                          {relatedPost.title}
                        </h3>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-16 bg-gradient-to-br from-[#0B1F3A] via-[#1755B5] to-[#0B1F3A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Transform Your IT?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Contact our team to discuss how we can help optimize your IT infrastructure and protect your business.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-[#33C3F0] text-white" data-testid="button-contact-cta">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
