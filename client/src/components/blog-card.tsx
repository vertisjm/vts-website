import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { formatPostDate, type BlogPost } from "@/lib/blog";

import cybersecurityImg from "@assets/stock_images/cybersecurity.jpg";
import cloudImg from "@assets/stock_images/cloud.jpg";
import infrastructureImg from "@assets/stock_images/infrastructure.jpg";
import backupImg from "@assets/stock_images/backup-dr.jpg";
import managedItImg from "@assets/stock_images/managed-it.jpg";
import coastImg from "@assets/stock_images/ocho-rios-aerial.jpg";
import meetingImg from "@assets/stock_images/industries-meeting.jpg";

// Articles have no photos of their own, so each category gets a matching stock image.
const categoryImages: Record<string, string> = {
  "IT Strategy": managedItImg,
  Cybersecurity: cybersecurityImg,
  "Cloud Services": cloudImg,
  "Data Protection": backupImg,
  "Business Continuity": coastImg,
  Compliance: meetingImg,
};

export function postImage(post: BlogPost) {
  return categoryImages[post.category] ?? infrastructureImg;
}

export function CategoryTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="self-start rounded-md bg-brand-tint px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-dark">
      {children}
    </span>
  );
}

export function BlogCard({ post, compact }: { post: BlogPost; compact?: boolean }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="lift group flex h-full flex-col overflow-hidden rounded-xl border border-line bg-white text-ink"
      data-testid={`card-post-${post.slug}`}
    >
      <span className={"block overflow-hidden bg-line-photo " + (compact ? "h-40" : "h-48")}>
        <img src={postImage(post)} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
      </span>
      <span className="flex flex-1 flex-col gap-3 p-5 lg:p-6">
        <CategoryTag>{post.category}</CategoryTag>
        <span className="font-display text-lg font-semibold leading-snug">{post.title}</span>
        {!compact && <span className="line-clamp-3 text-sm leading-relaxed text-slate">{post.excerpt}</span>}
        <span className="mt-auto flex items-center justify-between pt-2 text-[13px] text-slate">
          <span>
            {formatPostDate(post.publishedDate)} · {post.readTime}
          </span>
          <ArrowRight aria-hidden="true" className="h-4 w-4 text-brand transition-transform group-hover:translate-x-1" />
        </span>
      </span>
    </Link>
  );
}
