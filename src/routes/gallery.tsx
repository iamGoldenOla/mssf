import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { IMG } from "@/lib/images";
import { useMemo, useState } from "react";

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
      <header className="border-b border-border px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">Gallery</p>
          <h1 className="max-w-3xl font-display text-5xl font-semibold leading-tight lg:text-6xl">
            The work, unedited.
          </h1>
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
            <button
              key={p.src}
              onClick={() => setOpen(i)}
              className={`group relative overflow-hidden rounded-sm bg-stone-200 ring-1 ring-black/5 ${p.span ?? ""}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-charcoal/0 transition-colors group-hover:bg-charcoal/20" />
              <div className="absolute bottom-2 left-2 rounded-sm bg-offwhite/85 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-charcoal opacity-0 transition-opacity group-hover:opacity-100">
                {p.cat}
              </div>
            </button>
          ))}
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
