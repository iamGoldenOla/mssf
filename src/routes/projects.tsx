import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { IMG } from "@/lib/images";
import { ScrollReveal } from "@/components/scroll-reveal";

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

type Entry = { date: string; item: string; qty?: string; remark: string; img?: string };
type Year = { year: string; entries: Entry[] };

const YEARS: Year[] = [
  {
    year: "2026",
    entries: [
      { date: "03 / 2026", item: "Donation of First Aid Box with kits inside", qty: "1 Box", remark: "Delivered to the school for safety and basic health support." },
      { date: "02 / 2026", item: "Donation of Empty Water Kegs & Trash Bins", qty: "8 Kegs, 4 Bins", remark: "Brought to facilitate fetching of clean water and school hygiene." },
      { date: "02 / 2026", item: "Donation of GP Tank for Water", qty: "1 GP Tank", remark: "Installation of a large GP tank to store clean borehole water." },
      { date: "02 / 2026", item: "Completed 3 Rooms of School Toilets", qty: "3 Rooms", remark: "New school toilet facilities completed and keys handed over to the Head Teacher." },
    ],
  },
  {
    year: "2025",
    entries: [
      { date: "10 / 2025", item: "Donation of class registers for teachers", qty: "6 Registers", remark: "Supplied to teachers to track and manage student attendance." },
      { date: "08 / 2025", item: "Donation of Foldable teachers' tables, seats & Football", qty: "4 Tables, 6 Seats, 1 Football", remark: "Delivered to the school; Mr. Christopher received it on behalf of the school." },
      { date: "07 / 2025", item: "Donation of wooden benches without tops for ECCDE writing", qty: "6 Benches", remark: "Benches without tops provided for Early Child Care writing." },
      { date: "06 / 2025", item: "Donation of Colour Books & Pencil Crayons for ECCDE", qty: "4 Books, 2 Pkts", remark: "Supplied for ECCDE early childhood learning usage." },
      { date: "06 / 2025", item: "Donation of exercise books, pencils and pens by Rotary Club", qty: "1000 Books, 4 Pkts, 1 Container", remark: "Rotary Club donated 1000pcs of writing materials, 4 packets of pencils, and 1 container of pens." },
      { date: "05 / 2025", item: "Issuance of class register for the head teacher", qty: "1 Register", remark: "Attendance register issued for the Head Teacher." },
      { date: "03 / 2025", item: "Donation of mattress for teachers", qty: "6 Mattresses", remark: "Donation of mattresses for the 2nd batch of teachers to upgrade living quarters." },
      { date: "03 / 2025", item: "Donation of Hausa mat for ECCDE", qty: "1 Mat", remark: "Provided for early childhood learning environment." },
      { date: "02 / 2025", item: "Donation of wooden benches without tops for ECCDE writing", qty: "3 Benches", remark: "The Head Teacher received the benches." },
    ],
  },
  {
    year: "2024",
    entries: [
      { date: "09 / 2024", item: "Renovation of teachers' quarters", qty: "1 Building", remark: "Upgraded living quarters for teachers, providing mattresses and furniture.", img: IMG.achievementQuarters },
      { date: "06 / 2024", item: "Donation of tables & chairs for teacher's use", qty: "5 Tables, 6 Chairs", remark: "Provided for teacher classroom use.", img: IMG.achievementChairs },
      { date: "05 / 2024", item: "Donation of school drums", qty: "1 Set", remark: "A set of school drums donated to the students.", img: IMG.achievementDrums },
      { date: "03 / 2024", item: "Renovation of dilapidated school building", qty: "St. Peter's School", remark: "Transformation of dilapidated school structure into a safe learning environment.", img: IMG.achievementBefore },
      { date: "01 / 2024", item: "Writing materials distribution", qty: "500 Books, 3 Pkts, 2 Containers", remark: "Distributed 500 copies of 40 leaves exercise books, 3 packets of pencils, and 2 containers of erasers." },
      { date: "01 / 2024", item: "Recruitment of teachers", qty: "4 Educators", remark: "Recruitment of 4 qualified and passionate teachers for the school." },
    ],
  },
];

function ProjectsPage() {
  return (
    <SiteShell>
      <header className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <img
          src={IMG.schoolMural}
          alt="Projects & Impact"
          className="absolute inset-0 h-full w-full object-cover object-[center_35%] animate-ken-burns"
        />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
          <div className="max-w-4xl w-full">
            <ScrollReveal translateY={12}>
              <div className="space-y-4 text-offwhite">
                <p className="font-mono text-xs uppercase tracking-widest text-gold">Projects & Impact</p>
                <h1 className="font-display text-4xl font-semibold leading-tight lg:text-6xl text-offwhite">
                  The receipts. Every project. Every year.
                </h1>
                <p className="max-w-2xl text-base text-offwhite/90 mx-auto">
                  We believe trust is earned, not requested. Here is the dated, itemized record of every desk, book, well, and teacher stipend delivered since 2018.
                </p>
              </div>
            </ScrollReveal>
          </div>
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
                {y.entries.map((e, idx) => (
                  <ScrollReveal key={e.date + e.item} delay={idx * 60} duration={500}>
                    <article className="grid grid-cols-1 gap-4 border border-border bg-card p-6 md:grid-cols-12 md:gap-8 hover:shadow-sm transition-shadow">
                      <div className="font-mono text-xs text-gold md:col-span-2">{e.date}</div>
                      <div className="space-y-3 md:col-span-6">
                        <div className="space-y-1">
                          <h3 className="font-semibold">{e.item}</h3>
                          <p className="text-sm text-charcoal/70">{e.remark}</p>
                        </div>
                        {e.img && (
                          <div className="overflow-hidden rounded-sm ring-1 ring-black/5 max-w-sm mt-3">
                            <img src={e.img} alt={e.item} className="w-full object-cover max-h-[180px]" loading="lazy" />
                          </div>
                        )}
                      </div>
                      <div className="md:col-span-4 md:text-right">
                        {e.qty && (
                          <span className="inline-block bg-stone-100 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-charcoal/70">
                            {e.qty}
                          </span>
                        )}
                      </div>
                    </article>
                  </ScrollReveal>
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
            <ScrollReveal>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gold">Material Support (Running List)</p>
              <h3 className="mb-6 font-display text-3xl font-semibold">In-kind contributions welcome.</h3>
              <ul className="space-y-3 text-charcoal/70">
                <li className="flex justify-between border-b border-border py-2"><span>Exercise books & stationery</span><span className="font-mono text-xs text-charcoal/50">Always needed</span></li>
                <li className="flex justify-between border-b border-border py-2"><span>School uniforms (primary sizes)</span><span className="font-mono text-xs text-charcoal/50">Termly</span></li>
                <li className="flex justify-between border-b border-border py-2"><span>Sandals & school bags</span><span className="font-mono text-xs text-charcoal/50">Always needed</span></li>
                <li className="flex justify-between border-b border-border py-2"><span>Solar lamps</span><span className="font-mono text-xs text-charcoal/50">Ongoing</span></li>
                <li className="flex justify-between py-2"><span>First-aid supplies</span><span className="font-mono text-xs text-charcoal/50">Monthly</span></li>
              </ul>
            </ScrollReveal>
          </div>
          <div>
            <ScrollReveal delay={150}>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-gold">Bank Transfer (Nigeria)</p>
              <h3 className="mb-6 font-display text-3xl font-semibold">Direct to MSSF.</h3>
              <div className="space-y-4 border border-border bg-card p-8 shadow-sm">
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
                  <div className="font-mono text-xl font-semibold text-green">1016024813</div>
                </div>
                <p className="text-xs text-charcoal/50">
                  Please email a copy of your transfer confirmation to info@mssf.com.ng so we can send a receipt.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
