import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { IMG } from "@/lib/images";
import { useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";

export const Route = createFileRoute("/donate")({
  head: () => ({
    meta: [
      { title: "Donate — My Shining Star Foundation" },
      { name: "description", content: "$5/month keeps a child in school. Give from anywhere in the world, or via Nigerian bank transfer." },
      { property: "og:title", content: "Donate — MSSF" },
      { property: "og:description", content: "$5 a month. One child, in school." },
    ],
    links: [{ rel: "canonical", href: "/donate" }],
  }),
  component: DonatePage,
});

const tiers = [
  { amount: 5, label: "The Seed", outcome: "Supports one child for a month — books, uniform, milk." },
  { amount: 25, label: "The Classroom", outcome: "Classroom-level support: shared materials and staffing help.", featured: true },
  { amount: 50, label: "The Foundation", outcome: "Contributes to school-wide transformation and infrastructure." },
];

function DonatePage() {
  const [region, setRegion] = useState<"abroad" | "nigeria">("abroad");
  const [activeRegion, setActiveRegion] = useState<"abroad" | "nigeria">("abroad");
  const [isFading, setIsFading] = useState(false);

  const handleRegionChange = (newRegion: "abroad" | "nigeria") => {
    if (newRegion === activeRegion) return;
    setIsFading(true);
    setRegion(newRegion);
    setTimeout(() => {
      setActiveRegion(newRegion);
      setIsFading(false);
    }, 220); // 220ms matches the 200-250ms cross-fade spec
  };

  return (
    <SiteShell>
      <header className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <img
          src={IMG.childrenCloseup}
          alt="Donate"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%] animate-ken-burns"
        />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
          <div className="max-w-4xl w-full">
            <ScrollReveal translateY={12}>
              <div className="space-y-4 text-offwhite">
                <p className="font-mono text-xs uppercase tracking-widest text-gold">Donate</p>
                <h1 className="font-display text-4xl font-semibold leading-tight lg:text-6xl text-offwhite">
                  Change a life for just <span className="text-gold">$5/month.</span>
                </h1>
                <p className="max-w-2xl text-base text-offwhite/90 mx-auto">
                  Small enough to forget about. Big enough to keep a child in a classroom, with clean
                  water and a daily meal, all year long.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </header>

      {/* Currency-split tabs */}
      <section className="mx-auto max-w-5xl px-6 py-20">
        <div className="mb-10 flex justify-center">
          <div className="inline-flex rounded-sm border border-border bg-offwhite p-1">
            <button
              onClick={() => handleRegionChange("abroad")}
              className={`rounded-sm px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer ${
                region === "abroad" ? "bg-green text-offwhite" : "text-charcoal/60"
              }`}
            >
              Give from Abroad (USD)
            </button>
            <button
              onClick={() => handleRegionChange("nigeria")}
              className={`rounded-sm px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer ${
                region === "nigeria" ? "bg-green text-offwhite" : "text-charcoal/60"
              }`}
            >
              Give from Nigeria (NGN)
            </button>
          </div>
        </div>

        <div className={`transition-opacity duration-220 ease-out ${isFading ? "opacity-0" : "opacity-100"}`}>
          {activeRegion === "abroad" ? (
            <div>
              <div className="grid gap-6 md:grid-cols-3">
                {tiers.map((t, idx) => (
                  <ScrollReveal key={t.amount} delay={idx * 80} translateY={10}>
                    <div
                      className={`relative flex flex-col items-center gap-6 p-8 text-center h-full hover:scale-[1.01] transition-transform ${
                        t.featured
                          ? "bg-green text-offwhite shadow-2xl"
                          : "border border-border bg-card"
                      }`}
                    >
                      {t.featured && (
                        <div className="absolute -top-3 bg-gold px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-charcoal">
                          Most Effective
                        </div>
                      )}
                      <span className={`font-mono text-[10px] uppercase tracking-widest ${t.featured ? "text-gold" : "text-gold"}`}>
                        {t.label}
                      </span>
                      <div className="font-display text-5xl font-semibold">
                        ${t.amount}
                        <span className={`text-base font-normal ${t.featured ? "text-offwhite/50" : "text-charcoal/40"}`}>
                          /mo
                        </span>
                      </div>
                      <p className={`text-sm leading-relaxed ${t.featured ? "text-offwhite/70" : "text-charcoal/60"}`}>
                        {t.outcome}
                      </p>
                      <button
                        className={`w-full rounded-sm py-3 text-xs font-semibold uppercase tracking-widest transition-colors mt-auto ${
                          t.featured
                            ? "bg-gold text-charcoal hover:bg-gold-dark"
                            : "border border-green text-green hover:bg-green hover:text-offwhite"
                        }`}
                      >
                        Subscribe Monthly
                      </button>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
              <div className="mt-8 text-center">
                <button className="text-sm font-semibold border-b border-border pb-1 hover:border-gold cursor-pointer">
                  Or make a one-time donation →
                </button>
              </div>
            </div>
          ) : (
            <ScrollReveal>
              <div className="mx-auto max-w-2xl space-y-6 border border-border bg-card p-10 shadow-sm">
                <h3 className="font-display text-2xl font-semibold">Zenith Bank Transfer</h3>
                <div className="space-y-4">
                  <Row label="Bank" value="Zenith Bank" />
                  <Row label="Account Name" value="My Shining Star Foundation" />
                  <Row label="Account Number" value="1016024813" mono />
                  <Row label="Reference" value="Your name + purpose" />
                </div>
                <p className="text-xs text-charcoal/50">
                  Please email your transfer confirmation to <a href="mailto:info@mssf.com.ng" className="text-gold hover:underline">info@mssf.com.ng</a> so we can issue a formal receipt.
                </p>
                <p className="rounded-sm bg-stone-100 p-3 font-mono text-[10px] uppercase tracking-widest text-charcoal/60">
                  Paystack / Flutterwave NGN checkout — coming soon
                </p>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* What your donation does */}
      <section className="border-y border-border bg-stone-50 px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">Where It Goes</p>
            <h2 className="mb-12 font-display text-4xl font-semibold">Every dollar, accounted for.</h2>
          </ScrollReveal>
          <div className="grid gap-px bg-border ring-1 ring-border md:grid-cols-2 lg:grid-cols-4">
            {[
              { t: "Books & Supplies", b: "Exercise books, pens, and teacher instructional guides." },
              { t: "Renovated Classrooms", b: "Roofing, painting, desks, and solar power." },
              { t: "Teacher Support", b: "Stipends, training, and classroom resources." },
              { t: "Safe Environments", b: "Sanitation, clean water, and daily nutritional milk." },
            ].map((x, i) => (
              <ScrollReveal key={x.t} delay={i * 80} className="bg-offwhite h-full">
                <div className="space-y-3 p-8 h-full">
                  <h3 className="font-display text-lg font-semibold">{x.t}</h3>
                  <p className="text-sm text-charcoal/70">{x.b}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What Your Donation Provides */}
      <section className="bg-stone-50 border-t border-border px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-gold">Our Impact Model</p>
              <h2 className="font-display text-3xl font-semibold lg:text-4xl">
                Your Donation Provides
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-charcoal/60">
                MSSF coordinates holistic interventions that cover every aspect of a child's school experience. We cannot do it without you.
              </p>
            </div>
          </ScrollReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "Quality and passionate teaching staff",
              "Access to clean drinking water and milk daily",
              "School uniforms and learning materials",
              "Vocational education and excursions",
              "Free transport (bus fees covered for all pupils)",
              "Regular medical check-ups",
              "Safe and child-friendly classrooms",
              "A chance for children in rural communities to dream big!",
            ].map((item, idx) => (
              <ScrollReveal key={idx} delay={idx * 60}>
                <div className="flex items-start gap-3 bg-card p-6 border border-border rounded-sm shadow-sm hover:shadow-md transition-shadow h-full">
                  <span className="text-green font-bold text-lg">✓</span>
                  <p className="text-sm font-semibold text-charcoal">{item}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="space-y-6">
            <ScrollReveal>
              <p className="font-mono text-xs uppercase tracking-widest text-gold">Our Promise</p>
              <h2 className="font-display text-4xl font-semibold leading-tight mt-2">
                We publish what we do — dated, itemized, verifiable.
              </h2>
              <p className="text-lg text-charcoal/70 mt-4">
                Every project. Every year. If you want the naira-level detail, ask us — we'll send
                the log.
              </p>
              <div className="pt-2">
                <a href="mailto:info@mssf.com.ng" className="inline-flex items-center gap-2 font-semibold text-gold">
                  Request the full impact log →
                </a>
              </div>
            </ScrollReveal>
          </div>
          <div className="w-full">
            <ScrollReveal delay={150}>
              <img src={IMG.uniforms} alt="MSSF-supported students" className="rounded-sm ring-1 ring-black/5 w-full object-cover" loading="lazy" />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between border-b border-border py-3">
      <span className="font-mono text-[10px] uppercase tracking-widest text-charcoal/50">{label}</span>
      <span className={`font-semibold ${mono ? "font-mono text-lg text-green" : ""}`}>{value}</span>
    </div>
  );
}
