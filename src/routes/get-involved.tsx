import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { IMG } from "@/lib/images";
import { ScrollReveal } from "@/components/scroll-reveal";

export const Route = createFileRoute("/get-involved")({
  head: () => ({
    meta: [
      { title: "Get Involved — My Shining Star Foundation" },
      { name: "description", content: "Volunteer, partner, sponsor a child, or donate. Four ways to help MSSF's work in Cross River State." },
      { property: "og:title", content: "Get Involved — MSSF" },
      { property: "og:description", content: "Four ways in. Pick yours." },
    ],
    links: [{ rel: "canonical", href: "/get-involved" }],
  }),
  component: GetInvolvedPage,
});

const paths = [
  { n: "01", title: "Volunteer", body: "On-ground help with transport, classroom support, and events in Cross River State.", cta: "Apply to volunteer", to: "/contact" },
  { n: "02", title: "Partner", body: "Corporate or NGO partnerships for co-funded programs, in-kind supply, or shared logistics.", cta: "Explore partnership", to: "/contact" },
  { n: "03", title: "Sponsor a Child", body: "Direct sponsorship of an individual child's schooling year, with quarterly progress updates.", cta: "Sponsor a child", to: "/donate" },
  { n: "04", title: "Donate", body: "$5/month, one-time, or bank transfer. Every gift itemized against a project.", cta: "Give now", to: "/donate" },
];

function GetInvolvedPage() {
  return (
    <SiteShell>
      <header className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <img
          src={IMG.twoBoys}
          alt="Get Involved"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%] animate-ken-burns"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
          <div className="max-w-4xl w-full">
            <ScrollReveal translateY={12}>
              <div className="space-y-4 text-offwhite">
                <p className="font-mono text-xs uppercase tracking-widest text-gold">Get Involved</p>
                <h1 className="font-display text-4xl font-semibold leading-tight lg:text-6xl text-offwhite">
                  Four ways in. Pick yours.
                </h1>
                <p className="max-w-2xl text-base text-offwhite/90 mx-auto">
                  Whether you volunteer your time, sponsor a child, invest in infrastructure, or donate supplies, there is a role for you in MSSF.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-6 md:grid-cols-2">
          {paths.map((p, i) => (
            <ScrollReveal key={p.n} delay={i * 80} className="h-full">
              <div className={`flex flex-col justify-between gap-8 bg-card border-2 ${i % 2 === 0 ? 'border-gold/50' : 'border-green/50'} p-10 rounded-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 h-full`}>
                <div className="space-y-4">
                  <div className="grid size-10 place-items-center rounded-sm bg-gold/10 font-mono text-sm text-gold">
                    {p.n}
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-green">{p.title}</h3>
                  <p className="text-charcoal/70">{p.body}</p>
                </div>
                <Link to={p.to} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold mt-4 self-start">
                  {p.cta} →
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="border-y border-border bg-stone-50 px-6 py-24" id="partners">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">Partners</p>
            <h2 className="mb-12 max-w-2xl font-display text-4xl font-semibold">
              We don't work alone.
            </h2>
          </ScrollReveal>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "JB Farms Oban", logo: IMG.logoJbfarms, desc: "Primary renovation and infrastructure partner providing agricultural livelihoods to school-community families." },
              { name: "Agrinexus International", logo: IMG.logoAgrinexus, desc: "Corporate social responsibility partner driving local logistical and ground operations." },
              { name: "Rotary International", logo: IMG.logoRotary, desc: "Co-funded programs and international volunteer coordination." },
              { name: "Local School Committees", logo: null, desc: "Community-level governance and program feedback at every partner school." },
            ].map((p, i) => (
              <ScrollReveal key={p.name} delay={i * 80}>
                <div className={`border-2 ${i % 2 === 0 ? 'border-gold/50' : 'border-green/50'} bg-card p-8 shadow-sm h-full rounded-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300`}>
                  <div className="mb-6 flex h-16 items-center justify-center bg-stone-50 p-2 rounded-sm overflow-hidden border border-border/40">
                    {p.logo ? (
                      <img src={p.logo} alt={p.name} className="max-h-full max-w-full object-contain" />
                    ) : (
                      <span className="font-display text-lg font-semibold text-charcoal/40 uppercase">{p.name.split(" ")[0]}</span>
                    )}
                  </div>
                  <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                  <p className="mt-2 text-sm text-charcoal/70">{p.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <ScrollReveal delay={300}>
              <Link to="/contact" className="inline-block rounded-sm bg-green px-8 py-4 text-xs font-semibold uppercase tracking-widest text-offwhite hover:bg-green-deep">
                Become a Partner
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
