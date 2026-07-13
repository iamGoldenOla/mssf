import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getBlogPosts } from "@/lib/cms";
import { IMG } from "@/lib/images";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — My Shining Star Foundation" },
      {
        name: "description",
        content:
          "Stories, updates, and reflections from MSSF's work in rural Cross River State, Nigeria.",
      },
      { property: "og:title", content: "Blog — MSSF" },
      {
        property: "og:description",
        content: "Updates from the field and stories of impact.",
      },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogListPage,
});

function BlogListPage() {
  const posts = getBlogPosts();

  return (
    <SiteShell>
      <header className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <img
          src={IMG.schoolGroup}
          alt="Blog"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%] animate-ken-burns"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
          <div className="max-w-4xl w-full">
            <ScrollReveal translateY={12}>
              <div className="space-y-4 text-offwhite">
                <p className="font-mono text-xs uppercase tracking-widest text-gold">
                  Blog
                </p>
                <h1 className="font-display text-4xl font-semibold leading-tight lg:text-6xl text-offwhite">
                  Stories from the field.
                </h1>
                <p className="max-w-2xl text-base text-offwhite/90 mx-auto">
                  Updates, reflections, and dispatches from our work in Cross
                  River State.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-24">
        {posts.length === 0 ? (
          <ScrollReveal>
            <div className="text-center py-20">
              <p className="font-mono text-xs uppercase tracking-widest text-gold mb-4">
                Coming Soon
              </p>
              <h2 className="font-display text-3xl font-semibold text-charcoal">
                Blog posts are on their way.
              </h2>
              <p className="mt-4 text-charcoal/70 max-w-lg mx-auto">
                We're preparing stories and updates from the field. Check back
                soon for our first posts.
              </p>
              <Link
                to="/"
                className="mt-8 inline-flex items-center justify-center rounded-sm bg-green px-6 py-3 text-xs font-semibold uppercase tracking-widest text-offwhite transition-colors hover:bg-green-deep"
              >
                Return home
              </Link>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, i) => (
              <ScrollReveal key={post.id} delay={i * 100}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group block border border-border/80 bg-card rounded-sm overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-gold/60 transition-all duration-300"
                >
                  {post.featuredImage && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6 space-y-3">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-gold">
                      {new Date(post.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <h2 className="font-display text-xl font-semibold text-charcoal group-hover:text-green transition-colors">
                      {post.title}
                    </h2>
                    <div
                      className="text-sm text-charcoal/70 line-clamp-3"
                      dangerouslySetInnerHTML={{ __html: post.excerpt }}
                    />
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-2">
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
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>
    </SiteShell>
  );
}
