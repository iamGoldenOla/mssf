import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { IMG } from "@/lib/images";
import { useMemo, useState } from "react";
import { BeforeAfter } from "@/components/before-after";
import { ScrollReveal } from "@/components/scroll-reveal";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — My Shining Star Foundation" },
      { name: "description", content: "Photographs from MSSF's work at St. Peter's Primary and across Cross River State." },
      { property: "og:title", content: "Gallery — MSSF" },
      { property: "og:description", content: "Real photographs. Real children. Real work." },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

type Cat = "All" | "School Renovation" | "Classroom" | "Community" | "Events";

const photos: { src: string; alt: string; cat: Exclude<Cat, "All">; span?: string }[] = [
  { src: IMG.schoolMural, alt: "St. Peter's School mural and students", cat: "School Renovation", span: "md:col-span-2 md:row-span-2" },
  { src: IMG.schoolGroup, alt: "Full school group photo", cat: "Classroom" },
  { src: IMG.uniforms, alt: "Students in blue uniforms", cat: "Classroom" },
  { src: IMG.childrenCloseup, alt: "Children close-up", cat: "Classroom" },
  { src: IMG.achievementBefore, alt: "Renovation of dilapidated school building (March 2024)", cat: "School Renovation" },
  { src: IMG.achievementDilapidated, alt: "Ditch and foundations work at dilapidated school building (March 2024)", cat: "School Renovation" },
  { src: IMG.achievementQuarters, alt: "Renovation of teachers' quarters in progress (September 2024)", cat: "School Renovation", span: "md:col-span-2" },
  { src: IMG.achievementDrums, alt: "A set of school drums donated to pupils (May 2024)", cat: "Events" },
  { src: IMG.achievementChairs, alt: "5 tables & 6 chairs donated for teachers' use (June 2024)", cat: "Events" },
  { src: IMG.boyThumbs, alt: "Student giving a thumbs up on the path to school", cat: "Community", span: "md:row-span-2" },
  { src: IMG.threeBoys, alt: "Three schoolchildren on the palm-lined road", cat: "Community" },
  { src: IMG.twoBoys, alt: "Two children in the village", cat: "Community" },
  { src: IMG.teamEvent, alt: "MSSF team at partner event", cat: "Events", span: "md:col-span-2" },
];

const cats: Cat[] = ["All", "School Renovation", "Classroom", "Community", "Events"];

function GalleryPage() {
  const [cat, setCat] = useState<Cat>("All");
  const [open, setOpen] = useState<number | null>(null);

  const filtered = useMemo(
    () => (cat === "All" ? photos : photos.filter((p) => p.cat === cat)),
    [cat]
  );

  return (
    <SiteShell>
      <header className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <img
          src={IMG.threeBoys}
          alt="Gallery"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%] animate-ken-burns"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
          <div className="max-w-4xl w-full">
            <ScrollReveal translateY={12}>
              <div className="space-y-4 text-offwhite">
                <p className="font-mono text-xs uppercase tracking-widest text-gold">Gallery</p>
                <h1 className="font-display text-4xl font-semibold leading-tight lg:text-6xl text-offwhite">
                  The work, unedited.
                </h1>
                <p className="max-w-2xl text-base text-offwhite/90 mx-auto">
                  Real moments from St. Peter's Primary School and the surrounding communities. No stock photography, ever.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full border px-5 py-2 text-xs font-medium uppercase tracking-widest transition-colors ${
                cat === c
                  ? "border-green bg-green text-offwhite"
                  : "border-border bg-offwhite text-charcoal/70 hover:border-charcoal/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid auto-rows-[220px] grid-cols-2 gap-3 md:grid-cols-4">
          {filtered.map((p, i) => (
            <ScrollReveal key={p.src} delay={i * 40} duration={600} translateY={12} className={p.span ?? ""}>
              <button
                onClick={() => setOpen(i)}
                className="group relative overflow-hidden rounded-sm bg-stone-200 ring-1 ring-black/5 w-full h-full text-left"
              >
                <img
                  src={p.src}
                  alt={p.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-charcoal/0 transition-all duration-300 group-hover:bg-charcoal/40 flex items-center justify-center">
                  <div className="size-10 rounded-full border border-offwhite/20 bg-charcoal/30 text-offwhite flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 backdrop-blur-xs">
                    <span className="text-xl font-light leading-none">+</span>
                  </div>
                </div>
                <div className="absolute bottom-2 left-2 rounded-sm bg-offwhite/85 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-charcoal opacity-0 transition-opacity group-hover:opacity-100">
                  {p.cat}
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Before & After Renovation */}
      <section className="bg-stone-50 border-t border-border px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-12 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-gold">Renovation Impact</p>
              <h2 className="font-display text-3xl font-semibold lg:text-4xl">
                Before & After Transformation
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-charcoal/60">
                A visual record of the structural transformation of St. Peter's Primary School, Oban, from dilapidated conditions to a safe, encouraging learning environment.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <BeforeAfter
              beforeSrc={IMG.schoolBefore}
              afterSrc={IMG.schoolMural}
              beforeLabel="Before Renovation"
              afterLabel="After Renovation"
            />
          </ScrollReveal>
        </div>
      </section>

      {/* Interhouse Sport Competition */}
      <section className="border-t border-border bg-offwhite px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-14 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-gold">Beyond the Classroom</p>
              <h2 className="font-display text-3xl font-semibold lg:text-4xl">
                Interhouse Sport Competition
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-charcoal/60">
                Fostering teamwork, discipline, and joy through annual interhouse sports — where every child learns that greatness starts with showing up.
              </p>
            </div>
          </ScrollReveal>

          {/* Hero shot — all teams together */}
          <ScrollReveal delay={100}>
            <div className="relative mb-8 overflow-hidden rounded-md ring-1 ring-black/5">
              <img
                src={IMG.sportAllTeams}
                alt="All four houses assembled together with the coach"
                className="w-full h-[340px] md:h-[420px] object-cover object-[center_25%] transition-transform duration-700 hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-6 right-6">
                <p className="font-display text-lg md:text-2xl font-semibold text-offwhite">
                  Four Houses. One Community.
                </p>
                <p className="mt-1 text-sm text-offwhite/80">All teams assembled for the annual interhouse sport competition</p>
              </div>
            </div>
          </ScrollReveal>

          {/* House colour grid — 4 columns on desktop */}
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            {[
              { src: IMG.sportBlueTeamField, label: "Blue House", desc: "March-past on the field", color: "bg-blue-600" },
              { src: IMG.sportRedTeamField, label: "Red House", desc: "March-past on the field", color: "bg-red-600" },
              { src: IMG.sportGreenTeamField, label: "Green House", desc: "March-past on the field", color: "bg-emerald-600" },
              { src: IMG.sportYellowTeamCoaches, label: "Yellow House", desc: "Team with coaches", color: "bg-amber-500" },
            ].map((house, i) => (
              <ScrollReveal key={house.label} delay={i * 80} translateY={16}>
                <div className="group relative overflow-hidden rounded-md ring-1 ring-black/5 bg-stone-100">
                  <img
                    src={house.src}
                    alt={house.label}
                    className="h-[260px] w-full object-cover object-[center_20%] transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/30" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-charcoal/70 to-transparent">
                    <div className="flex items-center gap-2">
                      <span className={`inline-block size-3 rounded-full ${house.color} ring-2 ring-offwhite/50`} />
                      <span className="font-display text-sm font-semibold text-offwhite">{house.label}</span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-offwhite/70">{house.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Indoor team portraits row */}
          <div className="grid gap-4 md:grid-cols-3 mb-8">
            {[
              { src: IMG.sportBlueTeamClass, alt: "Blue house team portrait", label: "Blue House Portrait" },
              { src: IMG.sportRedTeamClass, alt: "Red house team portrait", label: "Red House Portrait" },
              { src: IMG.sportYellowTeamClass, alt: "Yellow house team portrait", label: "Yellow House Portrait" },
            ].map((shot, i) => (
              <ScrollReveal key={shot.label} delay={i * 80} translateY={12}>
                <div className="group relative overflow-hidden rounded-md ring-1 ring-black/5 bg-stone-100">
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    className="h-[280px] w-full object-cover object-[center_15%] transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/25" />
                  <div className="absolute bottom-3 left-3 rounded-sm bg-offwhite/85 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-charcoal opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {shot.label}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom row: coaches + classroom photos */}
          <div className="grid gap-4 md:grid-cols-3">
            <ScrollReveal delay={0} translateY={12}>
              <div className="group relative overflow-hidden rounded-md ring-1 ring-black/5 bg-stone-100">
                <img
                  src={IMG.classroomAssembly}
                  alt="Children gathered in the school assembly hall"
                  className="h-[260px] w-full object-cover object-[center_30%] transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/25" />
                <div className="absolute bottom-3 left-3 rounded-sm bg-offwhite/85 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-charcoal opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  School Assembly
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={80} translateY={12}>
              <div className="group relative overflow-hidden rounded-md ring-1 ring-black/5 bg-stone-100">
                <img
                  src={IMG.classroomGreenTables}
                  alt="New green round tables and chairs in the classroom"
                  className="h-[260px] w-full object-cover object-[center_35%] transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/25" />
                <div className="absolute bottom-3 left-3 rounded-sm bg-offwhite/85 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-charcoal opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  New Classroom Furniture
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={160} translateY={12}>
              <div className="group relative overflow-hidden rounded-md ring-1 ring-black/5 bg-stone-100">
                <img
                  src={IMG.classroomTeaching}
                  alt="Teacher and staff at the blackboard with children"
                  className="h-[260px] w-full object-cover object-[center_25%] transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-charcoal/0 transition-colors duration-300 group-hover:bg-charcoal/25" />
                <div className="absolute bottom-3 left-3 rounded-sm bg-offwhite/85 px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-charcoal opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Classroom Teaching
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {open !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/90 p-6 animate-fade-in"
          onClick={() => setOpen(null)}
        >
          <img
            src={filtered[open].src}
            alt={filtered[open].alt}
            className="max-h-[90vh] max-w-[90vw] rounded-sm object-contain"
          />
          <button
            onClick={() => setOpen(null)}
            className="absolute right-6 top-6 grid size-10 place-items-center rounded-full bg-offwhite/10 text-offwhite hover:bg-offwhite/20"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      )}
    </SiteShell>
  );
}
