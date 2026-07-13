import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getBlogPost, getBlogPosts } from "@/lib/cms";
import { getBlogPostSchema, getBreadcrumbSchema } from "@/lib/seo";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => {
    const post = getBlogPost(params.slug);
    const title = post
      ? `${post.title} — MSSF Blog`
      : "Post Not Found — MSSF Blog";
    const description = post
      ? post.excerpt.replace(/<[^>]*>/g, "").slice(0, 160)
      : "";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        ...(post?.featuredImage
          ? [{ property: "og:image", content: post.featuredImage }]
          : []),
      ],
      links: [
        { rel: "canonical", href: `/blog/${params.slug}` },
      ],
      scripts: post
        ? [
            {
              type: "application/ld+json",
              children: getBlogPostSchema(post),
            },
            {
              type: "application/ld+json",
              children: getBreadcrumbSchema([
                { name: "Home", url: "/" },
                { name: "Blog", url: "/blog" },
                { name: post.title, url: `/blog/${post.slug}` },
              ]),
            },
          ]
        : [],
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { slug } = Route.useParams();
  const post = getBlogPost(slug);
  const allPosts = getBlogPosts();

  if (!post) {
    return (
      <SiteShell>
        <div className="flex min-h-[60vh] items-center justify-center bg-background px-4">
          <div className="max-w-md text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">
              404
            </p>
            <h1 className="mt-4 font-display text-4xl font-semibold text-foreground">
              Post not found
            </h1>
            <p className="mt-4 text-sm text-muted-foreground">
              This blog post doesn't exist or has been removed.
            </p>
            <Link
              to="/blog"
              className="mt-8 inline-flex items-center justify-center rounded-sm bg-green px-6 py-3 text-xs font-semibold uppercase tracking-widest text-offwhite transition-colors hover:bg-green-deep"
            >
              Back to blog
            </Link>
          </div>
        </div>
      </SiteShell>
    );
  }

  // Find related posts (same category, excluding current)
  const related = allPosts
    .filter(
      (p) =>
        p.id !== post.id &&
        p.categories?.some((c) => post.categories?.includes(c))
    )
    .slice(0, 3);

  return (
    <SiteShell>
      {/* Hero with featured image */}
      {post.featuredImage ? (
        <header className="relative h-[50vh] min-h-[350px] w-full overflow-hidden">
          <img
            src={post.featuredImage}
            alt={post.title}
            className="absolute inset-0 h-full w-full object-cover animate-ken-burns"
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute inset-0 flex items-end p-6 lg:p-12">
            <div className="max-w-3xl">
              <ScrollReveal translateY={12}>
                <div className="space-y-3 text-offwhite">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-gold">
                    {new Date(post.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h1 className="font-display text-3xl font-semibold leading-tight lg:text-5xl">
                    {post.title}
                  </h1>
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {post.categories.map((cat) => (
                        <span
                          key={cat}
                          className="text-[10px] font-mono uppercase tracking-widest bg-offwhite/20 px-2 py-1 rounded-sm"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </header>
      ) : (
        <header className="border-b border-border bg-background px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <ScrollReveal translateY={12}>
              <p className="font-mono text-[10px] uppercase tracking-widest text-gold mb-4">
                {new Date(post.date).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <h1 className="font-display text-3xl font-semibold leading-tight text-charcoal lg:text-5xl">
                {post.title}
              </h1>
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4">
                  {post.categories.map((cat) => (
                    <span
                      key={cat}
                      className="text-[10px] font-mono uppercase tracking-widest text-green bg-green/10 px-2 py-1 rounded-sm"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              )}
            </ScrollReveal>
          </div>
        </header>
      )}

      {/* Post content */}
      <article className="mx-auto max-w-3xl px-6 py-16">
        <ScrollReveal>
          <div
            className="prose prose-lg prose-stone max-w-none
              prose-headings:font-display prose-headings:text-charcoal
              prose-p:text-charcoal/85 prose-p:leading-relaxed
              prose-a:text-green prose-a:no-underline hover:prose-a:underline
              prose-img:rounded-sm prose-img:shadow-md
              prose-blockquote:border-gold prose-blockquote:text-charcoal/70
              prose-strong:text-charcoal"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </ScrollReveal>
      </article>

      {/* Back to blog + related posts */}
      <section className="border-t border-border px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex items-center justify-between mb-10">
            <Link
              to="/blog"
              className="font-mono text-xs uppercase tracking-widest text-charcoal/60 hover:text-green transition-colors"
            >
              ← Back to blog
            </Link>
          </div>

          {related.length > 0 && (
            <>
              <p className="font-mono text-xs uppercase tracking-widest text-gold mb-6">
                Related Stories
              </p>
              <div className="grid gap-8 md:grid-cols-3">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="group block border border-border/80 bg-card rounded-sm overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-gold/60 transition-all duration-300"
                  >
                    {p.featuredImage && (
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={p.featuredImage}
                          alt={p.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-5 space-y-2">
                      <p className="font-mono text-[10px] uppercase tracking-widest text-gold">
                        {new Date(p.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                      <h3 className="font-display text-lg font-semibold text-charcoal group-hover:text-green transition-colors">
                        {p.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </SiteShell>
  );
}
