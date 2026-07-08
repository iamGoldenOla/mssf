import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { IMG } from "@/lib/images";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-offwhite/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-sm bg-white p-1 ring-1 ring-gold/40 shadow-sm transition-transform duration-300 hover:scale-105">
            <img src={IMG.logo} alt="MSSF Logo" className="h-full w-auto object-contain" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-semibold uppercase tracking-wider text-green leading-none">MSSF</span>
            <span className="font-mono text-[8px] uppercase tracking-widest text-gold mt-1">Shining Star</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-7 lg:flex">
          <Link to="/" className="text-xs font-medium uppercase tracking-widest text-charcoal/70 transition-colors hover:text-gold" activeProps={{ className: "text-gold" }}>
            Home
          </Link>

          {/* Who We Are Dropdown */}
          <div className="relative group">
            <Link to="/who-we-are" className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-charcoal/70 transition-colors hover:text-gold cursor-pointer py-2">
              Who We Are <span className="text-[8px] transition-transform group-hover:rotate-180">▼</span>
            </Link>
            <div className="absolute left-0 mt-0 hidden w-48 rounded-sm border border-border bg-offwhite shadow-lg group-hover:block z-50 animate-fade-in">
              <div className="py-1">
                <Link to="/who-we-are" className="block px-4 py-2.5 text-xs font-medium uppercase tracking-widest text-charcoal/70 hover:bg-black/5 hover:text-gold">
                  About MSSF
                </Link>
                <Link to="/who-we-are" hash="team" className="block px-4 py-2.5 text-xs font-medium uppercase tracking-widest text-charcoal/70 hover:bg-black/5 hover:text-gold">
                  Our People
                </Link>
              </div>
            </div>
          </div>

          {/* What We Do Dropdown */}
          <div className="relative group">
            <Link to="/what-we-do" className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-charcoal/70 transition-colors hover:text-gold cursor-pointer py-2">
              What We Do <span className="text-[8px] transition-transform group-hover:rotate-180">▼</span>
            </Link>
            <div className="absolute left-0 mt-0 hidden w-48 rounded-sm border border-border bg-offwhite shadow-lg group-hover:block z-50 animate-fade-in">
              <div className="py-1">
                <Link to="/what-we-do" className="block px-4 py-2.5 text-xs font-medium uppercase tracking-widest text-charcoal/70 hover:bg-black/5 hover:text-gold">
                  Our Programs
                </Link>
                <Link to="/projects" className="block px-4 py-2.5 text-xs font-medium uppercase tracking-widest text-charcoal/70 hover:bg-black/5 hover:text-gold">
                  Projects & Impact
                </Link>
                <Link to="/get-involved" hash="partners" className="block px-4 py-2.5 text-xs font-medium uppercase tracking-widest text-charcoal/70 hover:bg-black/5 hover:text-gold">
                  Our Partners
                </Link>
              </div>
            </div>
          </div>

          <Link to="/gallery" className="text-xs font-medium uppercase tracking-widest text-charcoal/70 transition-colors hover:text-gold" activeProps={{ className: "text-gold" }}>
            Gallery
          </Link>
          <Link to="/donate" className="text-xs font-medium uppercase tracking-widest text-charcoal/70 transition-colors hover:text-gold" activeProps={{ className: "text-gold" }}>
            Donate
          </Link>
          <Link to="/get-involved" className="text-xs font-medium uppercase tracking-widest text-charcoal/70 transition-colors hover:text-gold" activeProps={{ className: "text-gold" }}>
            Get Involved
          </Link>
          <Link to="/contact" className="text-xs font-medium uppercase tracking-widest text-charcoal/70 transition-colors hover:text-gold" activeProps={{ className: "text-gold" }}>
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/donate"
            className="rounded-sm bg-green px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-offwhite transition-colors hover:bg-green-deep"
          >
            Donate $5 Monthly
          </Link>
          <button
            className="lg:hidden cursor-pointer"
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
          >
            <div className="flex flex-col gap-1">
              <span className="h-px w-6 bg-charcoal" />
              <span className="h-px w-6 bg-charcoal" />
              <span className="h-px w-6 bg-charcoal" />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {open && (
        <div className="border-t border-border bg-offwhite px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            <Link to="/" onClick={() => setOpen(false)} className="text-xs font-medium uppercase tracking-widest text-charcoal/70 py-1.5">
              Home
            </Link>
            
            {/* Who We Are Group */}
            <div className="border-l-2 border-gold/30 pl-3 py-1 space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-green">Who We Are</div>
              <Link to="/who-we-are" onClick={() => setOpen(false)} className="block text-xs font-medium uppercase tracking-widest text-charcoal/60 hover:text-gold">
                - About MSSF
              </Link>
              <Link to="/who-we-are" hash="team" onClick={() => setOpen(false)} className="block text-xs font-medium uppercase tracking-widest text-charcoal/60 hover:text-gold">
                - Our People
              </Link>
            </div>

            {/* What We Do Group */}
            <div className="border-l-2 border-gold/30 pl-3 py-1 space-y-2">
              <div className="text-xs font-bold uppercase tracking-widest text-green">What We Do</div>
              <Link to="/what-we-do" onClick={() => setOpen(false)} className="block text-xs font-medium uppercase tracking-widest text-charcoal/60 hover:text-gold">
                - Our Programs
              </Link>
              <Link to="/projects" onClick={() => setOpen(false)} className="block text-xs font-medium uppercase tracking-widest text-charcoal/60 hover:text-gold">
                - Projects & Impact
              </Link>
              <Link to="/get-involved" hash="partners" onClick={() => setOpen(false)} className="block text-xs font-medium uppercase tracking-widest text-charcoal/60 hover:text-gold">
                - Our Partners
              </Link>
            </div>

            <Link to="/gallery" onClick={() => setOpen(false)} className="text-xs font-medium uppercase tracking-widest text-charcoal/70 py-1.5">
              Gallery
            </Link>
            <Link to="/donate" onClick={() => setOpen(false)} className="text-xs font-medium uppercase tracking-widest text-charcoal/70 py-1.5">
              Donate
            </Link>
            <Link to="/get-involved" onClick={() => setOpen(false)} className="text-xs font-medium uppercase tracking-widest text-charcoal/70 py-1.5">
              Get Involved
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)} className="text-xs font-medium uppercase tracking-widest text-charcoal/70 py-1.5">
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
