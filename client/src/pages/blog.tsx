import { Link } from "wouter";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { blogPosts } from "@/lib/data";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Blog() {
  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-background">
      <section className="relative py-20 bg-gradient-to-br from-[#0B1F3A] via-[#1755B5] to-[#0B1F3A] overflow-hidden">
        <div className="absolute inset-0 bg-black/30" />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              IT Insights & Resources
            </h1>
            <p className="text-lg text-white/80">
              Expert insights on managed IT services, cybersecurity, cloud solutions, and technology trends for Caribbean businesses.
            </p>
          </motion.div>
        </div>
      </section>

      {featuredPosts.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8">Featured Articles</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="h-full hover-elevate cursor-pointer border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent" data-testid={`card-featured-post-${post.id}`}>
                      <CardHeader className="pb-2">
                        <Badge variant="secondary" className="w-fit mb-2" data-testid={`badge-category-${post.id}`}>
                          {post.category}
                        </Badge>
                        <h3 className="text-xl font-bold text-foreground" data-testid={`title-post-${post.id}`}>
                          {post.title}
                        </h3>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4 line-clamp-3" data-testid={`excerpt-post-${post.id}`}>
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {post.author}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(post.publishedDate)}
                            </span>
                          </div>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-foreground mb-8">All Articles</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link href={`/blog/${post.slug}`}>
                  <Card className="h-full hover-elevate cursor-pointer" data-testid={`card-post-${post.id}`}>
                    <CardHeader className="pb-2">
                      <Badge variant="outline" className="w-fit mb-2" data-testid={`badge-category-regular-${post.id}`}>
                        {post.category}
                      </Badge>
                      <h3 className="text-lg font-semibold text-foreground" data-testid={`title-regular-post-${post.id}`}>
                        {post.title}
                      </h3>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground text-sm mb-4 line-clamp-2" data-testid={`excerpt-regular-post-${post.id}`}>
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.publishedDate)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {post.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-[#0B1F3A] via-[#1755B5] to-[#0B1F3A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Need IT Support for Your Business?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Our team of experts is ready to help you optimize your IT infrastructure and protect your business.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-[#33C3F0] text-white" data-testid="button-contact-cta">
              Get in Touch
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
