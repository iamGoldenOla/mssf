import { createFileRoute } from "@tanstack/react-router";
import { getBlogPosts } from "@/lib/cms";

const BASE_URL = "https://mssf.com.ng";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const staticPaths = [
          "/",
          "/who-we-are",
          "/what-we-do",
          "/projects",
          "/gallery",
          "/donate",
          "/get-involved",
          "/contact",
          "/blog"
        ];
        
        // Add dynamic blog posts
        let blogPosts: any[] = [];
        try {
          blogPosts = getBlogPosts();
        } catch (e) {
          console.error("Sitemap load error:", e);
        }
        
        const blogPaths = blogPosts.map(p => `/blog/${p.slug}`);
        const allPaths = [...staticPaths, ...blogPaths];

        const urls = allPaths
          .map(
            (p) =>
              `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`
          )
          .join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
