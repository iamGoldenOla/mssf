/**
 * MSSF SEO & Structured Data Helpers
 *
 * Generates schema.org structured data for the MSSF website.
 * Injected into page <head> via TanStack Router's head() function.
 */

import type { BlogPost } from "./cms";

// ---------------------------------------------------------------------------
// Organization schema — global, appears on every page
// ---------------------------------------------------------------------------

export function getOrganizationSchema(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": "https://mssf.com.ng/#organization",
    name: "My Shining Star Foundation",
    alternateName: "MSSF",
    url: "https://mssf.com.ng",
    logo: "https://mssf.com.ng/logo.png",
    description:
      "A grassroots Nigerian NGO delivering education, transport, healthcare, and clean water to rural children in Cross River State.",
    foundingDate: "2018",
    areaServed: {
      "@type": "Place",
      name: "Cross River State, Nigeria",
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "Oban, Akamkpa II, Akamkpa LGA",
      addressLocality: "Calabar",
      addressRegion: "Cross River State",
      postalCode: "542102",
      addressCountry: "NG",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: "info@mssf.com.ng",
      contactType: "general",
    },
    sameAs: [],
  });
}

// ---------------------------------------------------------------------------
// WebSite schema — helps search engines understand site structure
// ---------------------------------------------------------------------------

export function getWebSiteSchema(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://mssf.com.ng/#website",
    url: "https://mssf.com.ng",
    name: "My Shining Star Foundation",
    publisher: { "@id": "https://mssf.com.ng/#organization" },
  });
}

// ---------------------------------------------------------------------------
// Blog post schema (Article)
// ---------------------------------------------------------------------------

export function getBlogPostSchema(post: BlogPost): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: "My Shining Star Foundation",
      url: "https://mssf.com.ng",
    },
    publisher: { "@id": "https://mssf.com.ng/#organization" },
    mainEntityOfPage: `https://mssf.com.ng/blog/${post.slug}`,
    ...(post.featuredImage && { image: post.featuredImage }),
  });
}

// ---------------------------------------------------------------------------
// Breadcrumb schema
// ---------------------------------------------------------------------------

export function getBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `https://mssf.com.ng${item.url}`,
    })),
  });
}
