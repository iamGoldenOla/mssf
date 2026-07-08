import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects & Impact — My Shining Star Foundation" },
      { name: "description", content: "A dated, itemized log of every MSSF intervention from 2018 to 2026 in Cross River State." },
      { property: "og:title", content: "Projects & Impact — MSSF" },
      { property: "og:description", content: "The receipts. Every project. Every year." },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

type Entry = { date: string; item: string; qty?: string; remark: string };
type Year = { year: string; entries: Entry[] };

const YEARS: Year[] = [
  {
    year: "2026",
    entries: [
      { date: "03 / 2026", item: "Early Childhood Reading Corner — Odiofiong", qty: "1 room, 40 children", remark: "Play-based learning space with age-appropriate books and low seating." },
      { date: "01 / 2026", item: "Rotary Partnership Kickoff", remark: "Formal MoU signed for co-funded teacher training program in Q2." },
    ],
  },
  {
    year: "2025",
    entries: [
      { date: "11 / 2025", item: "Uniform Distribution — Term 3", qty: "180 sets", remark: "New uniforms distributed to primary students at 2 partner schools." },
      { date: "09 / 2025", item: "Nutritional Milk Rollout", qty: "Daily, 250 children", remark: "Daily milk supplementation program launched at St. Peter's and Odiofiong." },
      { date: "06 / 2025", item: "Solar Power Installation", qty: "1 school", remark: "4-panel array powering lights, ceiling fans, and staff room at St. Peter's." },
      { date: "03 / 2025", item: "Volunteer Cohort #3", qty: "12 volunteers", remark: "Trained on child safeguarding, transport protocols, and first aid." },
    ],
  },
  {
    year: "2024",
    entries: [
      { date: "11 / 2024", item: "St. Peter's — Renovation Phase II Complete", qty: "4 classrooms", remark: "Roofing, painting, and desk replacement finished. 120 students served." },
      { date: "08 / 2024", item: "Borehole & Water Purification", qty: "2,000 L / day", remark: "New water system at Odiofiong Primary serves school and adjacent community." },
      { date: "05 / 2024", item: "Community Health Camp", qty: "180 screenings", remark: "General health screenings, deworming, and basic dental care for enrolled children." },
      { date: "01 / 2024", item: "Quarterly Learning Kit Distribution", qty: "800 books, 400 pens", remark: "Distributed across 3 rural schools alongside 50 teacher instructional guides." },
    ],
  },
];

function ProjectsPage() {
  return (
    <SiteShell>
      <header className="border-b border-border px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">Projects & Impact</p>
          <h1 className="max-w-3xl font-display text-5xl font-semibold leading-tight lg:text-6xl">
            The receipts. Every project. Every year.
          </h1>
        </div>
      </header>

      {/* Dashboard */}
      <section className="border-b border-border px-6 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
          <div className="border border-border p-8">
            <div className="font-display text-5xl font-semibold text-green">2,000+</div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-charcoal/60">Students Impacted</div>
          </div>
          <div className="border border-border p-8">
            <div className="font-display text-5xl font-semibold text-green">5+</div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-charcoal/60">Schools Upgraded</div>
          </div>
          <div className="border border-border p-8">
            <div className="font-display text-5xl font-semibold text-green">₦ full log</div>
            <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-charcoal/60">Available to donors on request</div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gold">Year by Year</p>
            <h2 className="font-display text-4xl font-semibold">2024 — 2026</h2>
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-widest text-charcoal/40 md:block">
            Live impact log
          </span>
        </div>

        <div className="space-y-16">
          {YEARS.map((y) => (
            <div key={y.year} className="grid gap-8 lg:grid-cols-12">
              <div className="lg:col-span-3">
                <div className="sticky top-32">
                  <div className="font-display text-6xl font-semibold text-gold">{y.year}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-charcoal/50">
                    {y.entries.length} entries
                  </div>
                </div>
              </div>
              <div className="space-y-3 lg:col-span-9">
                {y.entries.map((e) => (
                  <article key={e.date + e.item} className="grid grid-cols-1 gap-4 border border-border bg-card p-6 md:grid-cols-12 md:gap-8">
                    <div className="font-mono text-xs text-gold md:col-span-2">{e.date}</div>
                    <div className="space-y-1 md:col-span-6">
                      <h3 className="font-semibold">{e.item}</h3>
                      <p className="text-sm text-charcoal/70">{e.remark}</p>
                    </div>
                    <div className="md:col-span-4 md:text-right">
                      {e.qty && (
                        <span className="inline-block bg-stone-100 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-charcoal/70">
                          {e.qty}
                        </span>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Material support & bank */}
      <section className="border-t border-border bg-stone-50 px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gold">Material Support (Running List)</p>
            <h3 className="mb-6 font-display text-3xl font-semibold">In-kind contributions welcome.</h3>
            <ul className="space-y-3 text-charcoal/70">
              <li className="flex justify-between border-b border-border py-2"><span>Exercise books & stationery</span><span className="font-mono text-xs text-charcoal/50">Always needed</span></li>
              <li className="flex justify-between border-b border-border py-2"><span>School uniforms (primary sizes)</span><span className="font-mono text-xs text-charcoal/50">Termly</span></li>
              <li className="flex justify-between border-b border-border py-2"><span>Sandals & school bags</span><span className="font-mono text-xs text-charcoal/50">Always needed</span></li>
              <li className="flex justify-between border-b border-border py-2"><span>Solar lamps</span><span className="font-mono text-xs text-charcoal/50">Ongoing</span></li>
              <li className="flex justify-between py-2"><span>First-aid supplies</span><span className="font-mono text-xs text-charcoal/50">Monthly</span></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gold">Bank Transfer (Nigeria)</p>
            <h3 className="mb-6 font-display text-3xl font-semibold">Direct to MSSF.</h3>
            <div className="space-y-4 border border-border bg-card p-8">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-charcoal/50">Bank</div>
                <div className="font-semibold">Zenith Bank</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-charcoal/50">Account Name</div>
                <div className="font-semibold">My Shining Star Foundation</div>
              </div>
              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-charcoal/50">Account Number</div>
                <div className="font-mono text-xl font-semibold text-green">XXXX XXXX XX</div>
              </div>
              <p className="text-xs text-charcoal/50">
                Please email a copy of your transfer confirmation to hello@mssf.ng so we can send a receipt.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
