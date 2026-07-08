export function BeforeAfter({
  beforeSrc,
  afterSrc,
  beforeLabel = "Before Renovation",
  afterLabel = "After Renovation",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  return (
    <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
      {/* Before Card */}
      <div className="group relative flex flex-col justify-between rounded-sm border border-border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="space-y-4">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-stone-100 ring-1 ring-black/5">
            <img
              src={beforeSrc}
              alt={beforeLabel}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <span className="absolute left-3 top-3 rounded-sm bg-red px-3 py-1 text-[9px] font-mono uppercase tracking-widest text-offwhite font-semibold shadow-sm">
              {beforeLabel}
            </span>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-charcoal">Dilapidated Classrooms</h3>
            <p className="mt-2 text-sm text-charcoal/65 leading-relaxed">
              Before intervention, the structures at St. Peter's Primary featured rusted, collapsing roofs, zero desks, and crumbling brickwork, creating an unsafe and discouraging environment for students.
            </p>
          </div>
        </div>
      </div>

      {/* After Card */}
      <div className="group relative flex flex-col justify-between rounded-sm border border-border bg-white p-4 shadow-sm hover:shadow-md transition-shadow">
        <div className="space-y-4">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm bg-stone-100 ring-1 ring-black/5">
            <img
              src={afterSrc}
              alt={afterLabel}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <span className="absolute left-3 top-3 rounded-sm bg-green px-3 py-1 text-[9px] font-mono uppercase tracking-widest text-offwhite font-semibold shadow-sm">
              {afterLabel}
            </span>
          </div>
          <div>
            <h3 className="font-display text-lg font-semibold text-charcoal">Renovated & Dignified Spaces</h3>
            <p className="mt-2 text-sm text-charcoal/65 leading-relaxed">
              Under MSSF's supervision, the buildings were upgraded with concrete reinforcement, rust-proof aluminum sheets, classroom desks, and a welcoming community mural to inspire learning.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
