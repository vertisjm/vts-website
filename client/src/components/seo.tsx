import { useEffect } from "react";

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: "website" | "article";
  publishedTime?: string;
  author?: string;
  keywords?: string;
}

export function SEO({ 
  title, 
  description, 
  canonical,
  type = "website",
  publishedTime,
  author,
  keywords
}: SEOProps) {
  useEffect(() => {
    document.title = title;
    
    const updateMeta = (name: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement | null;
      
      if (!meta) {
        meta = document.createElement("meta");
        if (isProperty) {
          meta.setAttribute("property", name);
        } else {
          meta.setAttribute("name", name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    const removeMeta = (name: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      const meta = document.querySelector(selector);
      if (meta) {
        meta.remove();
      }
    };

    updateMeta("description", description);
    updateMeta("og:title", title, true);
    updateMeta("og:description", description, true);
    updateMeta("og:type", type, true);
    updateMeta("og:image", "https://vertisjm.com/favicon.png", true);
    updateMeta("twitter:title", title);
    updateMeta("twitter:description", description);
    updateMeta("twitter:image", "https://vertisjm.com/favicon.png");
    
    if (canonical) {
      updateMeta("og:url", canonical, true);
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.setAttribute("rel", "canonical");
        document.head.appendChild(link);
      }
      link.setAttribute("href", canonical);
    }
    
    if (type === "article" && publishedTime) {
      updateMeta("article:published_time", publishedTime, true);
    } else {
      removeMeta("article:published_time", true);
    }
    
    if (type === "article" && author) {
      updateMeta("author", author);
      updateMeta("article:author", author, true);
    } else {
      removeMeta("article:author", true);
    }
    
    if (keywords) {
      updateMeta("keywords", keywords);
    }

    return () => {
      document.title = "Vertis Technology - Managed IT Services & Solutions Provider | Jamaica";
      removeMeta("article:published_time", true);
      removeMeta("article:author", true);
    };
  }, [title, description, canonical, type, publishedTime, author, keywords]);

  return null;
}
