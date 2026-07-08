import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { CountUp } from "@/components/count-up";
import { BeforeAfter } from "@/components/before-after";
import { ScrollReveal } from "@/components/scroll-reveal";
import { IMG } from "@/lib/images";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "My Shining Star Foundation — Nurturing Futures in Cross River State" },
      {
        name: "description",
        content:
          "A grassroots Nigerian NGO delivering education, transport, healthcare, and clean water to rural children. See our dated, itemized impact.",
      },
      { property: "og:title", content: "My Shining Star Foundation" },
      { property: "og:description", content: "Nurturing futures, one community at a time." },
      { property: "og:image", content: IMG.heroClassroom },
      { name: "twitter:image", content: IMG.heroClassroom },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: HomePage,
});

const stats = [
  { end: 2000, suffix: "+", label: "Children Impacted" },
  { end: 10, suffix: "+", label: "Projects Completed" },
  { end: 500, suffix: "+", label: "Learning Materials" },
  { end: 5, suffix: "+", label: "Schools Revitalized" },
];

const capabilities = [
  { n: "01", title: "Education Support", body: "Notebooks, uniforms, and tuition assistance so no child is sent home for lack of funds." },
  { n: "02", title: "School Renovation", body: "Transforming dilapidated structures into safe, bright learning environments." },
  { n: "03", title: "Free Transportation", body: "Our transport reaches children in remote settlements safely, every school day." },
  { n: "04", title: "Healthcare Support", body: "Regular check-ups and first-aid at school to catch illness before it disrupts learning." },
  { n: "05", title: "Clean Water & Milk", body: "Daily nutritional milk and borehole water to combat malnutrition and waterborne disease." },
  { n: "06", title: "Poverty Alleviation", body: "Working with families through JB Farms to build household stability around the child." },
];

const timeline = [
  { date: "03 / 2024", title: "St. Peter's Primary — Renovation Phase II", body: "Roofing completion, solar installation, and internal painting for 4 classrooms. Served 120 students." },
  { date: "01 / 2024", title: "Quarterly Learning Kit Distribution", body: "800+ exercise books, 400 pens/pencils, and 50 teacher instructional guides across 3 rural schools." },
  { date: "11 / 2023", title: "Clean Water Access Project", body: "Borehole maintenance and new water purification at Odiofiong Primary. 2,000 L daily capacity." },
];

const slides = [
  { src: IMG.schoolGroup, caption: "MSSF-supported pupils at St. Peter's Primary" },
  { src: IMG.uniforms, caption: "New school uniforms provided to students" },
  { src: IMG.threeBoys, caption: "Students walking safely to school in Cross River State" },
  { src: IMG.twoBoys, caption: "Connecting with children and families in rural communities" },
  { src: IMG.childrenCloseup, caption: "A chance for children in rural communities to dream big!" },
];

const values = [
  { title: "Compassion", body: "Deeply caring about the welfare, growth, and future of every child." },
  { title: "Integrity", body: "Honoring every promise and maintaining absolute transparency in all we do." },
  { title: "Impact", body: "Creating tangible, measurable improvements in rural school systems." },
  { title: "Inclusion", body: "Ensuring no child is left behind due to location, gender, or family income." },
  { title: "Sustainability", body: "Building long-term community capacity so positive changes last for generations." },
];

function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <SiteShell>
      <DonationModal />
      {/* Hero */}
      {/* Hero */}
      <header className="relative h-[85vh] min-h-[500px] w-full overflow-hidden">
        {/* Slideshow background */}
        {slides.map((slide, index) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.src}
              alt={slide.caption}
              className="h-full w-full object-cover object-[center_25%] animate-ken-burns"
            />
            {/* Dark solid overlay + legibility scrim combined */}
            <div className="absolute inset-0 bg-charcoal/45 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent z-10" />
            
            <div className="absolute bottom-8 left-8 z-20 hidden md:block">
              <p className="font-display text-xs italic text-offwhite/70">
                {slide.caption}
              </p>
            </div>
          </div>
        ))}
        
        {/* Centered overlaid text & CTAs */}
        <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-6">
          <div className="max-w-4xl space-y-6 text-offwhite">
            <ScrollReveal translateY={12}>
              <div className="inline-flex items-center gap-3 text-gold justify-center mb-2">
                <div className="h-px w-8 bg-gold" />
                <span className="font-mono text-xs uppercase tracking-widest">Cross River State, Nigeria</span>
                <div className="h-px w-8 bg-gold" />
              </div>
              <h1 className="font-display text-5xl font-semibold leading-[1.05] lg:text-7xl text-offwhite">
                Nurturing Futures, One Community at a Time
              </h1>
              <div className="flex flex-wrap justify-center gap-4 pt-6">
                <Link to="/donate" className="rounded-sm bg-gold px-8 py-4 text-sm font-semibold text-charcoal shadow-lg shadow-gold/20 transition-transform hover:-translate-y-0.5">
                  Donate $5 Monthly
                </Link>
                <Link to="/get-involved" className="rounded-sm border border-offwhite/30 bg-offwhite/10 px-8 py-4 text-sm font-semibold text-offwhite transition-colors hover:bg-offwhite/20">
                  Join Our Mission
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Slideshow Control Dots */}
        <div className="absolute bottom-8 right-8 z-30 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveSlide(index)}
              className={`size-3 rounded-full transition-colors cursor-pointer ${
                index === activeSlide ? "bg-gold" : "bg-offwhite/40 hover:bg-offwhite"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </header>

      {/* Intro Context Section (placed below hero) */}
      <section className="bg-stone-50 border-b border-border py-20 px-6">
        <div className="mx-auto max-w-4xl text-center">
          <ScrollReveal>
            <p className="font-mono text-xs uppercase tracking-widest text-gold mb-4">Our Context & Commitment</p>
            <blockquote className="font-display text-2xl md:text-3xl leading-relaxed text-charcoal italic">
              "In rural communities across Cross River State - Nigeria, too many children are growing up without access to even the most basic education - a fundamental right and the first step toward breaking the cycle of poverty."
            </blockquote>
            <p className="mt-8 text-lg leading-relaxed text-charcoal/80 max-w-3xl mx-auto">
              At My Shining Star Foundation (MSSF), we are changing that - one child at a time. In collaboration with our partners, My Shining Star Foundation (MSSF) launched a holistic educational initiative that reflects our belief in investing in the next generation.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Impact strip */}
      <section className="border-y border-offwhite/10 bg-green py-14">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 lg:grid-cols-4 lg:gap-12">
          {stats.map((s, i) => (
            <div key={s.label} className={`space-y-1 text-center ${i > 0 ? "lg:border-l lg:border-offwhite/10" : ""}`}>
              <div className="font-display text-4xl font-semibold text-gold lg:text-5xl">
                <CountUp end={s.end} suffix={s.suffix} />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-offwhite/60">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who We Are */}
      <section className="mx-auto max-w-7xl px-6 py-24 border-b border-border">
        <div className="grid gap-12 lg:grid-cols-12 items-center">
          <div className="lg:col-span-5">
            <ScrollReveal>
              <div className="space-y-6">
                <p className="font-mono text-xs uppercase tracking-widest text-gold">Who We Are</p>
                <h2 className="font-display text-4xl font-semibold leading-tight">
                  A Nigerian NGO built on receipts, not rhetoric.
                </h2>
                <p className="text-lg leading-relaxed text-charcoal/70">
                  My Shining Star Foundation (MSSF) was born out of a deep desire to bridge the educational gap in underserved rural communities. We witnessed firsthand the struggles children face — broken classrooms, lack of materials, and limited opportunities — and chose to act.
                </p>
                <p className="text-charcoal/70">
                  In collaboration with our partners, we have launched a holistic educational initiative that reflects our belief in investing in the next generation. We don't just campaign; we renovate classrooms, hire qualified teachers, and deliver transport, clean water, and nutritional support.
                </p>
                <div>
                  <Link to="/who-we-are" className="group inline-flex items-center gap-2 font-semibold text-gold">
                    Learn more about our team
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
          <div className="lg:col-span-7">
            <ScrollReveal delay={150}>
              <div className="relative aspect-[16/10] overflow-hidden rounded-sm shadow-lg">
                <img
                  src={IMG.schoolMural}
                  alt="MSSF team at school renovation project"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision Banner */}
      <section className="bg-stone-50 border-b border-border px-6 py-20">
        <ScrollReveal>
          <div className="mx-auto max-w-7xl grid gap-12 lg:grid-cols-2 text-center lg:text-left">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-widest text-gold">Our Mission</p>
              <h2 className="font-display text-2xl font-semibold leading-relaxed text-green">
                "To bring education, dignity, and opportunity to underserved children in rural areas."
              </h2>
            </div>
            <div className="space-y-4 lg:border-l lg:border-border lg:pl-12">
              <p className="font-mono text-xs uppercase tracking-widest text-gold">Our Vision</p>
              <h2 className="font-display text-2xl font-semibold leading-relaxed text-green">
                "A world where every child has access to quality education and the opportunity to thrive."
              </h2>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-7xl px-6 py-24 border-b border-border">
        <ScrollReveal>
          <div className="mb-16 space-y-4 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Core Values</p>
            <h2 className="font-display text-3xl font-semibold lg:text-4xl">
              Five commitments we hold to.
            </h2>
          </div>
        </ScrollReveal>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {values.map((v, i) => (
            <ScrollReveal key={v.title} delay={i * 80}>
              <div className="space-y-4 border border-border p-6 bg-card rounded-sm hover:shadow-md transition-shadow h-full">
                <div className="font-mono text-xs text-gold">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="font-display text-xl font-semibold text-green">{v.title}</h3>
                <p className="text-sm leading-relaxed text-charcoal/70">{v.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Your Donation Provides */}
      <section className="bg-stone-50 border-y border-border px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="mb-16 space-y-4 text-center">
              <p className="font-mono text-xs uppercase tracking-widest text-gold">Our Direct Impact</p>
              <h2 className="font-display text-3xl font-semibold lg:text-4xl">
                But we can’t do it without You.
              </h2>
              <p className="mx-auto max-w-xl text-charcoal/60">
                Your partnership and support directly power these critical components of our child support ecosystem:
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

      {/* What we do */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <ScrollReveal>
          <div className="mb-16 space-y-4 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-gold">What We Do</p>
            <h2 className="font-display text-3xl font-semibold lg:text-4xl">
              A Holistic Model of Dignity
            </h2>
            <p className="mx-auto max-w-xl text-charcoal/60">
              We don't just build walls. We create the ecosystem required for a child to succeed
              through graduation.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid gap-px bg-border ring-1 ring-border md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <ScrollReveal key={c.n} delay={i * 80} className="bg-offwhite h-full">
              <div className="space-y-4 p-10 transition-colors hover:bg-stone-50 h-full">
                <div className="grid size-10 place-items-center rounded-sm bg-gold/10 font-mono text-sm text-gold">
                  {c.n}
                </div>
                <h3 className="font-display text-xl font-semibold">{c.title}</h3>
                <p className="text-sm leading-relaxed text-charcoal/70">{c.body}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Timeline proof */}
      <section className="bg-stone-50 px-6 py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <ScrollReveal>
              <div className="sticky top-32 space-y-6">
                <p className="font-mono text-xs uppercase tracking-widest text-gold">Proof of Progress</p>
                <h2 className="font-display text-4xl font-semibold">Every intervention, itemized.</h2>
                <p className="leading-relaxed text-charcoal/70">
                  Transparency is our commitment. Each project is logged with a date, a scope,
                  and the number of children served.
                </p>
                <Link to="/projects" className="group inline-flex items-center gap-2 font-semibold text-gold">
                  View full impact log
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>
          <div className="space-y-4 lg:col-span-8">
            {timeline.map((t, i) => (
              <ScrollReveal key={t.title} delay={i * 100}>
                <article className="flex items-start gap-8 border border-border bg-card p-6 transition-shadow hover:shadow-sm">
                  <div className="whitespace-nowrap py-1 font-mono text-xs text-gold">{t.date}</div>
                  <div className="space-y-2">
                    <h3 className="font-semibold">{t.title}</h3>
                    <p className="text-sm text-charcoal/70">{t.body}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Horizontal Scroll */}
      <ScrollReveal>
        <section className="border-y border-border bg-stone-50 py-16 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6">
            <p className="mb-8 text-center font-mono text-[10px] uppercase tracking-widest text-gold">Our Strategic Partners</p>
            <div className="relative w-full overflow-hidden">
              <div className="flex gap-6 animate-marquee pause-marquee py-2">
                {[
                  { name: "JB Farms Oban", desc: "Primary renovation & infrastructure partner" },
                  { name: "Agrinexus International", desc: "Corporate social responsibility driver" },
                  { name: "Rotary Club International", desc: "Community service & fundraising" },
                  { name: "Incorporated Society of Planters", desc: "Agricultural network & support" },
                  { name: "Oban Community Committee", desc: "Local engagement & administration" },
                  // Duplicate for seamless infinite loop
                  { name: "JB Farms Oban", desc: "Primary renovation & infrastructure partner" },
                  { name: "Agrinexus International", desc: "Corporate social responsibility driver" },
                  { name: "Rotary Club International", desc: "Community service & fundraising" },
                  { name: "Incorporated Society of Planters", desc: "Agricultural network & support" },
                  { name: "Oban Community Committee", desc: "Local engagement & administration" }
                ].map((partner, idx) => (
                  <div key={`${partner.name}-${idx}`} className="flex flex-col items-center justify-center border border-border p-6 bg-card rounded-sm shadow-sm w-72 text-center flex-shrink-0">
                    <div className="font-display font-bold text-green tracking-wide text-sm">{partner.name}</div>
                    <div className="text-[9px] uppercase tracking-widest text-charcoal/50 mt-1.5">{partner.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Final CTA */}
      <section className="bg-charcoal text-offwhite">
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 lg:grid-cols-2">
          <div className="space-y-8">
            <ScrollReveal>
              <h2 className="font-display text-4xl font-semibold leading-tight lg:text-5xl">
                Be the reason a child stays in school.
              </h2>
              <p className="text-lg text-offwhite/60">
                Your $5 monthly gift is small to you, but transformative for a child in Cross River
                State. Join us in building a legacy of learning.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <Link to="/donate" className="rounded-sm bg-gold px-10 py-5 text-sm font-bold uppercase tracking-widest text-charcoal transition-colors hover:bg-gold-dark">
                  Donate Now
                </Link>
                <Link to="/get-involved" className="rounded-sm border border-offwhite/20 px-10 py-5 text-sm font-bold uppercase tracking-widest text-offwhite transition-colors hover:bg-offwhite/10">
                  Become a Partner
                </Link>
              </div>
            </ScrollReveal>
          </div>
          <div className="w-full">
            <ScrollReveal delay={150}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm ring-1 ring-offwhite/10">
                <img src={IMG.boyThumbs} alt="Student in Cross River State" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="font-display text-lg italic text-offwhite">"Your $5 keeps me in school."</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* YouTube Documentary Section */}
      <section className="bg-stone-50 border-t border-border px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal>
            <div className="mb-12 text-center space-y-4">
              <p className="font-mono text-xs uppercase tracking-widest text-gold">Documentary Video</p>
              <h2 className="font-display text-3xl font-semibold lg:text-4xl">
                Watch the Oban School Project Journey
              </h2>
              <p className="mx-auto max-w-xl text-charcoal/60 text-sm">
                See first-hand the impact of our partnership with JB Farms and Rotary International in Oban, Cross River State.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={150}>
            <div className="overflow-hidden rounded-sm ring-1 ring-black/5 shadow-2xl bg-white p-2">
              <iframe
                className="w-full aspect-video border-0"
                src="https://www.youtube.com/embed/QfduBiaakRo"
                title="My Shining Star Oban Documentary"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </SiteShell>
  );
}

function DonationModal() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (sessionStorage.getItem("mssf-modal-seen")) return;
    const t = setTimeout(() => setOpen(true), 10_000);
    return () => clearTimeout(t);
  }, []);
  const dismiss = () => {
    sessionStorage.setItem("mssf-modal-seen", "1");
    setOpen(false);
  };
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/40 p-4 backdrop-blur-sm animate-fade-in transition-all duration-300">
      <div className="relative w-full max-w-md overflow-hidden rounded-sm bg-offwhite shadow-2xl animate-fade-scale-in">
        <button onClick={dismiss} className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-full bg-offwhite/90 text-charcoal hover:bg-offwhite" aria-label="Close">✕</button>
        <div className="relative h-48">
          <img src={IMG.childrenCloseup} alt="" className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-end bg-gradient-to-t from-charcoal/85 to-transparent p-6">
            <p className="font-display text-xl italic text-offwhite">"Will you help me stay in school?"</p>
          </div>
        </div>
        <div className="space-y-4 p-6">
          <p className="text-sm text-charcoal/70">
            $5 a month covers a child's notebooks, uniform, and daily milk. It's small to you.
            It's everything to a child in Cross River State.
          </p>
          <div className="flex gap-3">
            <Link to="/donate" onClick={dismiss} className="flex-1 rounded-sm bg-gold py-3 text-center text-sm font-semibold text-charcoal hover:bg-gold-dark">
              Donate $5 Now
            </Link>
            <button onClick={dismiss} className="rounded-sm border border-border px-4 text-xs font-medium uppercase tracking-widest text-charcoal/60 hover:bg-black/5">
              Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
