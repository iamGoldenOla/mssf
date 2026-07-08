import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { IMG } from "@/lib/images";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — My Shining Star Foundation" },
      { name: "description", content: "Get in touch with MSSF. Based in Calabar, Cross River State, Nigeria." },
      { property: "og:title", content: "Contact — MSSF" },
      { property: "og:description", content: "We'd love to hear from you." },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <SiteShell>
      <header className="border-b border-border px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">Contact</p>
          <h1 className="max-w-3xl font-display text-5xl font-semibold leading-tight lg:text-6xl">
            We'd love to hear from you.
          </h1>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Details */}
          <div className="space-y-10 lg:col-span-4">
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-gold">Email</p>
              <a href="mailto:hello@mssf.ng" className="font-display text-xl text-charcoal hover:text-gold">
                hello@mssf.ng
              </a>
            </div>
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-gold">Phone</p>
              <a href="tel:+2340000000000" className="font-display text-xl text-charcoal hover:text-gold">
                +234 000 000 0000
              </a>
            </div>
            <div>
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-gold">Location</p>
              <p className="text-charcoal/80">Calabar<br />Cross River State, Nigeria</p>
            </div>
            <div className="flex flex-wrap gap-3 pt-4">
              <a href="https://wa.me/2340000000000" className="rounded-sm bg-green px-5 py-3 text-xs font-semibold uppercase tracking-widest text-offwhite hover:bg-green-deep">
                WhatsApp Chat
              </a>
              <a href="mailto:hello@mssf.ng" className="rounded-sm border border-border px-5 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-black/5">
                Email Us
              </a>
            </div>
            <div className="overflow-hidden rounded-sm ring-1 ring-black/5">
              <img src={IMG.teamEvent} alt="MSSF team" className="w-full object-cover" loading="lazy" />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="grid gap-6 border border-border bg-card p-8 md:grid-cols-2"
            >
              <Field label="Full Name" name="name" required />
              <Field label="Email" name="email" type="email" required />
              <Field label="Phone" name="phone" type="tel" />
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-charcoal/60">Subject</label>
                <select
                  name="subject"
                  className="border border-border bg-offwhite px-3 py-3 text-sm focus:border-gold focus:outline-none"
                >
                  <option>General Enquiry</option>
                  <option>Volunteer</option>
                  <option>Partnership</option>
                  <option>Donation Support</option>
                  <option>Media / Press</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-charcoal/60">Message</label>
                <textarea
                  name="message"
                  rows={6}
                  required
                  className="border border-border bg-offwhite px-3 py-3 text-sm focus:border-gold focus:outline-none"
                />
              </div>
              <div className="md:col-span-2">
                <button
                  type="submit"
                  className="rounded-sm bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-charcoal hover:bg-gold-dark"
                >
                  Send Message
                </button>
                {sent && (
                  <span className="ml-4 text-sm text-green">Thanks — we'll be in touch shortly.</span>
                )}
              </div>
            </form>

            {/* Map */}
            <div className="mt-8 overflow-hidden rounded-sm ring-1 ring-black/5">
              <iframe
                title="MSSF Calabar location"
                src="https://www.openstreetmap.org/export/embed.html?bbox=8.28%2C4.92%2C8.42%2C5.02&layer=mapnik&marker=4.9757%2C8.3417"
                className="h-80 w-full"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[10px] uppercase tracking-widest text-charcoal/60">
        {label}
        {required && <span className="text-gold"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        className="border border-border bg-offwhite px-3 py-3 text-sm focus:border-gold focus:outline-none"
      />
    </div>
  );
}
