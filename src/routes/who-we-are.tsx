import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { IMG } from "@/lib/images";

export const Route = createFileRoute("/who-we-are")({
  head: () => ({
    meta: [
      { title: "Who We Are — My Shining Star Foundation" },
      { name: "description", content: "The story, mission, values, and people behind MSSF's work in rural Cross River State." },
      { property: "og:title", content: "Who We Are — MSSF" },
      { property: "og:description", content: "Meet the team building a scalable blueprint for rural Nigerian education." },
    ],
    links: [{ rel: "canonical", href: "/who-we-are" }],
  }),
  component: WhoWeArePage,
});

const values = [
  { title: "Dignity First", body: "Every child, every family, every partner treated with respect. No pity narratives." },
  { title: "Radical Transparency", body: "Every intervention is dated, itemized, and traceable. Trust is earned in receipts." },
  { title: "Local Roots", body: "Nigerian-led, community-embedded. We build with, never for." },
  { title: "Replicable, Not Charitable", body: "We're building a blueprint other communities can copy. Handouts don't scale." },
  { title: "Long-term Presence", body: "We return to the same schools year after year. Consistency compounds." },
];

const team = [
  { id: "shermal", name: "Dr. Shermal Perera", role: "Founder", img: IMG.teamEvent, bio: "Founder of Agrinexus International and My Shining Star Foundation, driving sustainable development and education in Cross River State." },
  { id: "vijay", name: "Mr. Vijayakumar Sambanthar (Mr. Vijay)", role: "Program Director", img: IMG.vijay, bio: "General Manager at Agrinexus and Program Director of MSSF, coordinating on-ground operations with over 40 years of global experience." },
  { id: "deborah", name: "Ms. Deborah Asuquo", role: "Program Coordinator", img: IMG.rebecca, bio: "Program Coordinator managing school partnerships, community relations, and material distribution logistics." },
  { id: "kingsley", name: "Mr. Kingsley", role: "Volunteer Team Lead", img: IMG.teamEvent, bio: "Volunteer Team Lead directing student transport, local logistics, and community volunteer groups." },
];

function WhoWeArePage() {
  return (
    <SiteShell>
      <header className="border-b border-border px-6 py-20 bg-stone-50">
        <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Who We Are</p>
            <h1 className="font-display text-4xl font-semibold leading-tight lg:text-6xl text-green">
              A Nigerian NGO built on receipts, not rhetoric.
            </h1>
          </div>
          <div className="lg:col-span-5 overflow-hidden rounded-sm ring-1 ring-black/5 shadow-lg max-h-[300px]">
            <img src={IMG.schoolGroup} alt="MSSF school pupils smiling together" className="w-full object-cover" />
          </div>
        </div>
      </header>

      {/* Our Story */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <img src={IMG.schoolMural} alt="MSSF team at St. Peter's School" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="space-y-6">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Our Story</p>
            <h2 className="font-display text-4xl font-semibold leading-tight">
              It started with one abandoned classroom.
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-charcoal/70">
              <p>
                In 2018, our founding team walked into St. Peter's Primary School in rural Cross River
                State. The roof was open to the sky. The children — hundreds of them — had no desks,
                no books, and no clean water within walking distance.
              </p>
              <p>
                We didn't launch a campaign. We didn't post appeals. We started renovating, one
                classroom at a time, and logged every naira spent and every child served.
              </p>
              <p>
                Six years later, MSSF is a working blueprint: renovation + staffing + transport +
                health + water, delivered together, at one real school first. Then the next.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="border-y border-border bg-stone-50 px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Vision</p>
            <h3 className="font-display text-3xl font-semibold leading-tight text-green">
              A world where every child has access to quality education and the opportunity to thrive.
            </h3>
          </div>
          <div className="space-y-4">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Mission</p>
            <p className="text-lg leading-relaxed text-charcoal/70">
              To bring education, dignity, and opportunity to underserved children in rural areas.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">Core Values</p>
          <h2 className="mb-12 max-w-2xl font-display text-4xl font-semibold">
            Five commitments we hold to.
          </h2>
          <div className="divide-y divide-border border-y border-border">
            {values.map((v, i) => (
              <div key={v.title} className="grid gap-6 py-8 md:grid-cols-12">
                <div className="font-mono text-xs text-gold md:col-span-2">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-xl font-semibold md:col-span-4">{v.title}</h3>
                <p className="text-charcoal/70 md:col-span-6">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* People */}
      <section className="bg-stone-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">Our People</p>
          <h2 className="mb-12 font-display text-4xl font-semibold">The team on the ground.</h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((p) => (
              <article key={p.name} className="flex h-full flex-col bg-card ring-1 ring-border hover:shadow-md transition-shadow">
                <div className="aspect-[4/5] overflow-hidden">
                  <img src={p.img} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
                </div>
                <div className="flex flex-1 flex-col space-y-3 p-6 justify-between">
                  <div className="space-y-3">
                    <div>
                      <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-gold">{p.role}</p>
                    </div>
                    <p className="text-sm leading-relaxed text-charcoal/70">{p.bio}</p>
                  </div>
                  <div className="pt-2">
                    <Link
                      to="/people/$personId"
                      params={{ personId: p.id }}
                      className="text-xs font-semibold uppercase tracking-widest text-gold hover:text-gold-dark"
                    >
                      Read Full Bio →
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
