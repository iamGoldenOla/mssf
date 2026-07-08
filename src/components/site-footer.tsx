import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-offwhite">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-5 flex items-center gap-2.5">
            <div className="grid size-8 place-items-center bg-gold">
              <div className="size-3 rotate-45 bg-green-deep" />
            </div>
            <span className="font-display text-lg font-semibold uppercase tracking-tight">MSSF</span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-offwhite/60">
            My Shining Star Foundation is a Nigerian NGO delivering education, dignity, and
            opportunity to underserved children in rural Cross River State — in partnership with
            JB Farms/Agrinexus and Rotary International.
          </p>
        </div>
        <div>
          <h4 className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
            Explore
          </h4>
          <ul className="space-y-3 text-sm text-offwhite/60">
            <li><Link to="/who-we-are" className="hover:text-gold">Who We Are</Link></li>
            <li><Link to="/what-we-do" className="hover:text-gold">What We Do</Link></li>
            <li><Link to="/projects" className="hover:text-gold">Projects & Impact</Link></li>
            <li><Link to="/gallery" className="hover:text-gold">Gallery</Link></li>
            <li><Link to="/get-involved" className="hover:text-gold">Get Involved</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
            Connect
          </h4>
          <ul className="space-y-3 text-sm text-offwhite/60">
            <li>Calabar, Cross River State, Nigeria</li>
            <li><a href="mailto:hello@mssf.ng" className="hover:text-gold">hello@mssf.ng</a></li>
            <li><a href="#" className="hover:text-gold">WhatsApp Chat</a></li>
            <li><Link to="/donate" className="hover:text-gold">Donate</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-offwhite/5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-[10px] font-mono uppercase tracking-[0.2em] text-offwhite/40 md:flex-row">
          <div>© {new Date().getFullYear()} My Shining Star Foundation</div>
          <div className="flex gap-6">
            <a href="#">Transparency</a>
            <a href="#">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
