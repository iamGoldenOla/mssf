import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { IMG } from "@/lib/images";
import { ScrollReveal } from "@/components/scroll-reveal";

export const Route = createFileRoute("/what-we-do")({
  head: () => ({
    meta: [
      { title: "What We Do — My Shining Star Foundation" },
      { name: "description", content: "Seven integrated programs — from school renovation to clean water — that keep rural Cross River State children in school." },
      { property: "og:title", content: "What We Do — MSSF" },
      { property: "og:description", content: "An integrated model of education, health, and dignity." },
    ],
    links: [{ rel: "canonical", href: "/what-we-do" }],
  }),
  component: WhatWeDoPage,
});

const capabilities = [
  { n: "01", title: "Child Education", body: "Notebooks, uniforms, and tuition assistance so no child is turned away for lack of funds." },
  { n: "02", title: "School Renovation", body: "Roofs, classrooms, sanitation blocks, and solar power delivered as a full package." },
  { n: "03", title: "Child Protection & Free Transportation", body: "Daily transport for children in remote settlements — safety is a prerequisite for learning." },
  { n: "04", title: "Healthcare Support", body: "On-site health checks and first-aid to catch preventable illness early." },
  { n: "05", title: "WASH & Nutritional Milk", body: "Clean water access and daily nutritional milk supplementation." },
  { n: "06", title: "Poverty Alleviation", body: "Partnership with JB Farms to create household income around each school community." },
  { n: "07", title: "Early Childhood Education", body: "Play-based learning for the youngest, so the school day starts before Primary 1." },
];

function WhatWeDoPage() {
  return (
    <SiteShell>
      <header className="border-b border-border px-6 py-20 bg-stone-50">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">What We Do</p>
            <h1 className="font-display text-4xl font-semibold leading-tight lg:text-6xl text-green">
              Seven programs. One integrated model.
            </h1>
            <p className="max-w-2xl text-lg text-charcoal/70">
              Delivering only textbooks leaves a hungry child. Delivering only meals leaves a
              child who can't read them. Our model works because it refuses to pick one.
            </p>
          </div>
          <div className="lg:col-span-5 overflow-hidden rounded-sm ring-1 ring-black/5 shadow-lg max-h-[300px]">
            <img src={IMG.uniforms} alt="Students with new school uniforms" className="w-full object-cover" />
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-px bg-border ring-1 ring-border md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <ScrollReveal key={c.n} delay={i * 80} className="bg-offwhite h-full">
              <div className="space-y-4 p-10 transition-colors hover:bg-stone-50 h-full">
                <div className="grid size-10 place-items-center rounded-sm bg-gold/10 font-mono text-sm text-gold">
                  {c.n}
                </div>
                <h3 className="font-display text-xl font-semibold">{c.title}</h3>
                <p className="text-sm leading-relaxed text-charcoal/70">{c.body}</p>
                <Link to="/projects" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold mt-2">
                  See Impact →
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Feature story: St. Peter's */}
      <section className="border-y border-border bg-stone-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-16 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-5">
              <ScrollReveal>
                <p className="font-mono text-xs uppercase tracking-widest text-gold">Case Study</p>
                <h2 className="font-display text-4xl font-semibold leading-tight mt-2">
                  St. Peter's Primary School
                </h2>
                <p className="text-lg text-charcoal/70 mt-4">
                  A dilapidated, totally abandoned building in rural Cross River State. Today,
                  over 300 children attend daily — with transport, meals, water, and a working
                  roof.
                </p>
                <div className="grid grid-cols-2 gap-6 border-y border-border py-6 mt-6">
                  <div>
                    <p className="font-display text-3xl font-semibold text-green">2018</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-charcoal/50">Renovation began</p>
                  </div>
                  <div>
                    <p className="font-display text-3xl font-semibold text-green">300+</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-charcoal/50">Children enrolled</p>
                  </div>
                </div>
              </ScrollReveal>
            </div>
            <div className="space-y-8 lg:col-span-7">
              <ScrollReveal delay={150}>
                <img src={IMG.schoolMural} alt="St. Peter's School" className="w-full rounded-sm object-cover ring-1 ring-black/5" loading="lazy" />
              </ScrollReveal>
              <div className="space-y-6 text-charcoal/80">
                <ScrollReveal delay={200}>
                  <h3 className="font-display text-2xl font-semibold text-charcoal">More Than a School — A Scalable Solution</h3>
                  <p className="mt-2">
                    What we built at St. Peter's wasn't a one-time renovation. It was a template:
                    identify a school with community need, deliver the full stack (structure,
                    staffing, transport, water, milk, health), stay for the long term, and
                    document every step.
                  </p>
                  <p className="mt-2">
                    That template is now being replicated across the region — because it's the
                    boring, dated, itemized version of hope that actually holds up.
                  </p>
                </ScrollReveal>
              </div>
              <div className="pt-4">
                <ScrollReveal delay={300} duration={1200} translateY={12}>
                  <blockquote className="border-l-2 border-gold bg-offwhite p-8 font-display text-2xl italic leading-snug text-charcoal">
                    "Education is the most powerful weapon which you can use to change the world."
                    <footer className="mt-4 font-body text-sm not-italic text-charcoal/60">— Nelson Mandela</footer>
                  </blockquote>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
