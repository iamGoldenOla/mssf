import { Link } from "@tanstack/react-router";
import { useState } from "react";

const links = [
  { to: "/who-we-are", label: "Who We Are" },
  { to: "/what-we-do", label: "What We Do" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Gallery" },
  { to: "/get-involved", label: "Get Involved" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-offwhite/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="grid size-8 place-items-center bg-green">
            <div className="size-3 rotate-45 bg-gold" />
          </div>
          <span className="font-display text-lg font-semibold uppercase tracking-tight text-green">
            MSSF
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-xs font-medium uppercase tracking-widest text-charcoal/70 transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/donate"
            className="rounded-sm bg-green px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-offwhite transition-colors hover:bg-green-deep"
          >
            Donate $5 Monthly
          </Link>
          <button
            className="lg:hidden"
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
      {open && (
        <div className="border-t border-border bg-offwhite px-6 py-4 lg:hidden">
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-xs font-medium uppercase tracking-widest text-charcoal/70"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
