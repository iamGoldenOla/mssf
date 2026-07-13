import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { IMG } from "@/lib/images";
import { useState } from "react";
import { ScrollReveal } from "@/components/scroll-reveal";
import { WP_API_URL, getSiteContent } from "@/lib/cms";

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
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const phoneBlock = getSiteContent("contact-phone-number");
  const emailBlock = getSiteContent("contact-email");
  const addressBlock = getSiteContent("contact-address");
  const whatsappBlock = getSiteContent("whatsapp-link");

  const phoneNumber = phoneBlock?.content ? phoneBlock.content.replace(/<[^>]*>/g, '').trim() : "+234 XXX XXX XXXX";
  const emailAddress = emailBlock?.content ? emailBlock.content.replace(/<[^>]*>/g, '').trim() : "info@mssf.com.ng";
  const addressHtml = addressBlock?.content || "Oban, Akamkpa II, Akamkpa LGA,<br />Calabar, Cross River State,<br />Nigeria 542102";
  const whatsappUrl = whatsappBlock?.content ? whatsappBlock.content.replace(/<[^>]*>/g, '').trim() : "https://wa.me/234XXXXXXXXX";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSent(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      subject: formData.get("subject"),
      message: formData.get("message"),
      website: formData.get("website"), // honeypot
    };

    try {
      const response = await fetch(`${WP_API_URL}/mssf/v1/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.message || "Failed to send your message. Please try again.");
      }

      setSent(true);
      e.currentTarget.reset();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setSubmitting(false);
    }
  };

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
                  <a href={`mailto:${emailAddress}`} className="font-display text-xl text-charcoal hover:text-gold">
                    {emailAddress}
                  </a>
                </div>
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-gold">Phone</p>
                  <a href={`tel:${phoneNumber.replace(/\s+/g, '')}`} className="font-display text-xl text-charcoal hover:text-gold">
                    {phoneNumber}
                  </a>
                </div>
                <div>
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-gold">Address</p>
                  <p className="text-charcoal/80 leading-relaxed" dangerouslySetInnerHTML={{ __html: addressHtml }} />
                </div>
                <div className="flex flex-wrap gap-3 pt-4">
                  <a href={whatsappUrl} className="rounded-sm bg-green px-5 py-3 text-xs font-semibold uppercase tracking-widest text-offwhite hover:bg-green-deep">
                    WhatsApp Chat
                  </a>
                  <a href={`mailto:${emailAddress}`} className="rounded-sm border border-border px-5 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-black/5">
                    Email Us
                  </a>
                </div>
                <div className="overflow-hidden rounded-sm border-2 border-gold/50 p-2 bg-card shadow-sm hover:border-gold transition-all duration-300">
                  <img src={IMG.teamEvent} alt="MSSF team" className="w-full object-cover rounded-sm" loading="lazy" />
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Form */}
          <div className="lg:col-span-8 space-y-8">
            <ScrollReveal delay={150}>
              <form
                onSubmit={handleSubmit}
                className="grid gap-6 border-2 border-green/50 bg-card p-8 md:grid-cols-2 shadow-md hover:border-green transition-all duration-300 rounded-sm"
              >
                {/* Honeypot field (hidden from screen readers & users) */}
                <div className="hidden" aria-hidden="true">
                  <input name="website" type="text" tabIndex={-1} autoComplete="off" />
                </div>

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
                <div className="md:col-span-2 flex flex-col gap-3">
                  <div className="flex items-center gap-4 flex-wrap">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="rounded-sm bg-gold px-8 py-4 text-xs font-semibold uppercase tracking-widest text-charcoal hover:bg-gold-dark cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Sending..." : "Send Message"}
                    </button>
                    {sent && (
                      <span className="text-sm text-green font-semibold">Thanks — we'll be in touch shortly.</span>
                    )}
                  </div>
                  {error && (
                    <span className="text-sm text-red-600 font-semibold">{error}</span>
                  )}
                </div>
              </form>
            </ScrollReveal>
          </div>

            <ScrollReveal delay={200}>
              <div className="grid gap-6 md:grid-cols-2">
                {/* Map */}
                <div className="overflow-hidden rounded-sm border-2 border-gold/50 p-2 bg-card shadow-sm hover:border-gold transition-all duration-300">
                  <iframe
                    title="MSSF Calabar location"
                    src="https://maps.google.com/maps?q=Oban,%20Akamkpa,%20Calabar,%20Cross%20River,%20Nigeria&t=&z=10&ie=UTF8&iwloc=&output=embed"
                    className="h-64 w-full border-0 rounded-sm"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>

                {/* YouTube Video */}
                <div className="overflow-hidden rounded-sm border-2 border-green/50 p-2 bg-card shadow-sm hover:border-green transition-all duration-300">
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
