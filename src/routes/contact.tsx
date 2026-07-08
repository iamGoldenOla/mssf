import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { IMG } from "@/lib/images";
import { useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";

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
      <header className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <img
          src={IMG.teamEvent}
          alt="Contact"
          className="absolute inset-0 h-full w-full object-cover object-[center_35%] animate-ken-burns"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
          <div className="max-w-4xl w-full">
            <ScrollReveal translateY={12}>
              <div className="space-y-4 text-offwhite">
                <p className="font-mono text-xs uppercase tracking-widest text-gold">Contact</p>
                <h1 className="font-display text-4xl font-semibold leading-tight lg:text-6xl text-offwhite">
                  We'd love to hear from you.
                </h1>
                <p className="max-w-2xl text-base text-offwhite/90 mx-auto">
                  Reach out to our teams in Cross River State or partner offices. Let's work together to nurture futures.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-12">
          {/* Details */}
          <div className="space-y-10 lg:col-span-4">
            <ScrollReveal>
              <div className="space-y-10">
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-gold">Email</p>
                  <a href="mailto:info@mssf.com.ng" className="font-display text-xl text-charcoal hover:text-gold">
                    info@mssf.com.ng
                  </a>
                </div>
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-gold">Phone</p>
                  <a href="tel:+234XXXXXXXXX" className="font-display text-xl text-charcoal hover:text-gold">
                    +234 XXX XXX XXXX
                  </a>
                </div>
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-gold">Address</p>
                  <p className="text-charcoal/80 leading-relaxed">
                    Oban, Akamkpa II, Akamkpa LGA,<br />
                    Calabar, Cross River State,<br />
                    Nigeria 542102
                  </p>
                </div>
                <div className="flex flex-wrap gap-3 pt-4">
                  <a href="https://wa.me/234XXXXXXXXX" className="rounded-sm bg-green px-5 py-3 text-xs font-semibold uppercase tracking-widest text-offwhite hover:bg-green-deep">
                    WhatsApp Chat
                  </a>
                  <a href="mailto:info@mssf.com.ng" className="rounded-sm border border-border px-5 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-black/5">
                    Email Us
                  </a>
                </div>
                <div className="overflow-hidden rounded-sm border border-border/80 p-2 bg-card shadow-sm hover:border-gold/60 transition-all duration-300">
                  <img src={IMG.teamEvent} alt="MSSF team" className="w-full object-cover rounded-sm" loading="lazy" />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-8 space-y-8">
            <ScrollReveal delay={150}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
                className="grid gap-6 border border-border/80 bg-card p-8 md:grid-cols-2 shadow-md hover:border-gold/60 transition-all duration-300 rounded-sm"
              >
                <Field label="Full Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[10px] uppercase tracking-widest text-charcoal/60">Subject</label>
                  <select
                    name="subject"
                    className="border border-border/80 bg-offwhite px-3.5 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold/30 rounded-sm focus:outline-none transition-all duration-200"
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
                    className="border border-border/80 bg-offwhite px-3.5 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold/30 rounded-sm focus:outline-none transition-all duration-200"
                  />
                </div>
                <div className="md:col-span-2">
                  <button
                    type="submit"
                    className="rounded-sm bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-charcoal hover:bg-gold-dark cursor-pointer"
                  >
                    Send Message
                  </button>
                  {sent && (
                    <span className="ml-4 text-sm text-green">Thanks — we'll be in touch shortly.</span>
                  )}
                </div>
              </form>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Map */}
                <div className="overflow-hidden rounded-sm border border-border/80 p-2 bg-card shadow-sm hover:border-gold/60 transition-all duration-300">
                  <iframe
                    title="MSSF Calabar location"
                    src="https://maps.google.com/maps?q=Oban,%20Akamkpa,%20Calabar,%20Cross%20River,%20Nigeria&t=&z=10&ie=UTF8&iwloc=&output=embed"
                    className="h-64 w-full border-0 rounded-sm"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>

                {/* YouTube Video */}
                <div className="overflow-hidden rounded-sm border border-border/80 p-2 bg-card shadow-sm hover:border-gold/60 transition-all duration-300">
                  <iframe
                    className="h-64 w-full border-0 rounded-sm"
                    src="https://www.youtube.com/embed/QfduBiaakRo"
                    title="My Shining Star Oban Documentary"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              </div>
            </ScrollReveal>
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
        className="border border-border/80 bg-offwhite px-3.5 py-3 text-sm focus:border-gold focus:ring-1 focus:ring-gold/30 rounded-sm focus:outline-none transition-all duration-200"
      />
    </div>
  );
}
