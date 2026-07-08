import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { IMG } from "@/lib/images";

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
      <header className="border-b border-border px-6 py-20 bg-stone-50">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Get Involved</p>
            <h1 className="font-display text-4xl font-semibold leading-tight lg:text-6xl text-green">
              Four ways in. Pick yours.
            </h1>
          </div>
          <div className="lg:col-span-5 overflow-hidden rounded-sm ring-1 ring-black/5 shadow-lg max-h-[300px]">
            <img src={IMG.twoBoys} alt="MSSF students smiling in the village" className="w-full object-cover" />
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-px bg-border ring-1 ring-border md:grid-cols-2">
          {paths.map((p) => (
            <div key={p.n} className="flex flex-col justify-between gap-8 bg-offwhite p-10 transition-colors hover:bg-stone-50">
              <div className="space-y-4">
                <div className="grid size-10 place-items-center rounded-sm bg-gold/10 font-mono text-sm text-gold">
                  {p.n}
                </div>
                <h3 className="font-display text-2xl font-semibold">{p.title}</h3>
                <p className="text-charcoal/70">{p.body}</p>
              </div>
              <Link to={p.to} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold">
                {p.cta} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="border-y border-border bg-stone-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">Partners</p>
          <h2 className="mb-12 max-w-2xl font-display text-4xl font-semibold">
            We don't work alone.
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              { name: "JB Farms / Agrinexus", desc: "Operational partner providing agricultural livelihoods to school-community families." },
              { name: "Rotary International", desc: "Co-funded programs and international volunteer coordination." },
              { name: "Local School Committees", desc: "Community-level governance and program feedback at every partner school." },
            ].map((p) => (
              <div key={p.name} className="border border-border bg-card p-8">
                <div className="mb-4 grid h-14 place-items-center bg-stone-100 font-display text-xl font-semibold text-charcoal/60">
                  {p.name.split(" ")[0]}
                </div>
                <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                <p className="mt-2 text-sm text-charcoal/70">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/contact" className="inline-block rounded-sm bg-green px-8 py-4 text-xs font-semibold uppercase tracking-widest text-offwhite hover:bg-green-deep">
              Become a Partner
            </Link>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
