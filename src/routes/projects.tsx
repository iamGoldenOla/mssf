import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { IMG } from "@/lib/images";
import { ScrollReveal } from "@/components/scroll-reveal";
import { useState } from "react";
import { getTimeline, type TimelineYear, type TimelineEntry } from "@/lib/cms";

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

type Entry = TimelineEntry;
type Year = TimelineYear;

const YEARS: Year[] = getTimeline();

function ProjectsPage() {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  return (
    <SiteShell>
      <header className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <img
          src={IMG.schoolMural}
          alt="Projects & Impact"
          className="absolute inset-0 h-full w-full object-cover object-[center_35%] animate-ken-burns"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
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
                    <article className="grid grid-cols-1 gap-4 border border-border/80 bg-card p-6 md:grid-cols-12 md:gap-8 rounded-sm hover:border-gold/60 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                      <div className="font-mono text-xs text-gold md:col-span-2">{e.date}</div>
                      <div className="space-y-3 md:col-span-6">
                        <div className="space-y-1">
                          <h3 className="font-semibold">{e.item}</h3>
                          <p className="text-sm text-charcoal/70">{e.remark}</p>
                        </div>
                        {e.img && (
                          <div className="flex flex-wrap gap-4 mt-4">
                            {(Array.isArray(e.img) ? e.img : [e.img]).map((imgSrc, imgIdx) => {
                              const isMultiple = Array.isArray(e.img) && e.img.length > 1;
                              return (
                                <button
                                  key={imgIdx}
                                  onClick={() => setActivePhoto(imgSrc)}
                                  className={`group relative overflow-hidden rounded-md border border-border/40 bg-stone-100 ring-1 ring-black/5 hover:border-gold/65 transition-all duration-300 hover:shadow-lg focus:outline-none cursor-zoom-in ${
                                    isMultiple 
                                      ? "max-w-[280px] w-full h-[180px] md:h-[200px] flex-1 min-w-[180px]" 
                                      : "max-w-md w-full h-[250px] md:h-[270px]"
                                  }`}
                                >
                                  <img 
                                    src={imgSrc} 
                                    alt={`${e.item} - image ${imgIdx + 1}`} 
                                    className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500" 
                                    loading="lazy" 
                                  />
                                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                                </button>
                              );
                            })}
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

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 p-6 animate-fade-in animate-duration-300"
          onClick={() => setActivePhoto(null)}
        >
          <img
            src={activePhoto}
            alt="Enlarged view"
            className="max-h-[90vh] max-w-[90vw] rounded-sm object-contain shadow-2xl ring-1 ring-white/10"
          />
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute right-6 top-6 grid size-10 place-items-center rounded-full bg-offwhite/10 text-offwhite hover:bg-offwhite/20 transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      )}
    </SiteShell>
  );
}
