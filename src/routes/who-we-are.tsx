import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { IMG } from "@/lib/images";
import { ScrollReveal } from "@/components/scroll-reveal";
import Smooth3DSlideshow from "@/components/smooth-3d-slideshow";

export const Route = createFileRoute("/who-we-are")({
  head: () => ({
    meta: [
      { title: "Who We Are — My Shining Star Foundation" },
      { name: "description", content: "The story, mission, values, and people behind MSSF's work in rural Cross River State." },
      { property: "og:title", content: "Who We Are — MSSF" },
      { property: "og:description", content: "Meet the team building a scalable blueprint for rural Nigerian education." },
    ],
    links: [{ rel: "canonical", href: "/who-we-are" }],
  }),
  component: WhoWeArePage,
});

const values = [
  { title: "Dignity First", body: "Every child, every family, every partner treated with respect. No pity narratives." },
  { title: "Radical Transparency", body: "Every intervention is dated, itemized, and traceable. Trust is earned in receipts." },
  { title: "Local Roots", body: "Nigerian-led, community-embedded. We build with, never for." },
  { title: "Replicable, Not Charitable", body: "We're building a blueprint other communities can copy. Handouts don't scale." },
  { title: "Long-term Presence", body: "We return to the same schools year after year. Consistency compounds." },
];

const team = [
  { id: "shermal", name: "Dr. Shermal Perera", role: "Founder", img: IMG.shermal, bio: "Founder of Agrinexus International and My Shining Star Foundation, driving sustainable development and education in Cross River State." },
  { id: "vijay", name: "Mr. Vijayakumar Sambanthar (Mr. Vijay)", role: "Program Director", img: IMG.vijay, bio: "General Manager at Agrinexus and Program Director of MSSF, coordinating on-ground operations with over 40 years of global experience." },
  { id: "rebecca", name: "Ms. Rebecca Asuquo", role: "Program Coordinator", img: IMG.rebecca, bio: "Program Coordinator managing school partnerships, community relations, and material distribution logistics." },
  { id: "kingsley", name: "Mr. Kingsley Iwobi", role: "Volunteer Team Lead", img: IMG.kingsley, bio: "Volunteer Team Lead directing student transport, local logistics, and community volunteer groups." },
];

import { useEffect, useRef, useState } from "react";

export function CurtainReveal({ src, alt }: { src: string; alt: string }) {
  const [revealed, setRevealed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -5% 0px",
      }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative aspect-[4/5] overflow-hidden rounded-sm bg-stone-900 shadow-xl w-full">
      <img
        src={src}
        alt={alt}
        className={`h-full w-full object-cover transition-transform duration-[1200ms] delay-300 ease-out ${
          revealed ? "scale-100" : "scale-110"
        }`}
        loading="lazy"
      />
      {/* Left Curtain */}
      <div
        className="absolute inset-y-0 left-0 w-1/2 bg-stone-950 transition-transform duration-1000 ease-out-expo origin-left pointer-events-none"
        style={{
          transform: revealed ? "scaleX(0)" : "scaleX(1)",
        }}
      />
      {/* Right Curtain */}
      <div
        className="absolute inset-y-0 right-0 w-1/2 bg-stone-950 transition-transform duration-1000 ease-out-expo origin-right pointer-events-none"
        style={{
          transform: revealed ? "scaleX(0)" : "scaleX(1)",
        }}
      />
    </div>
  );
}

function WhoWeArePage() {
  const router = useRouter();
  return (
    <SiteShell>
      <header className="relative h-[55vh] min-h-[380px] w-full overflow-hidden">
        <img
          src={IMG.schoolGroup}
          alt="Who We Are"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%] animate-ken-burns"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
          <div className="max-w-4xl w-full">
            <ScrollReveal translateY={12}>
              <div className="space-y-4 text-offwhite">
                <p className="font-mono text-xs uppercase tracking-widest text-gold">Who We Are</p>
                <h1 className="font-display text-4xl font-semibold leading-tight lg:text-6xl text-offwhite">
                  A Nigerian NGO built on receipts, not rhetoric.
                </h1>
                <p className="max-w-2xl text-base text-offwhite/90 mx-auto">
                  We are a grassroots team of planners, educators, and volunteers proving that
                  holistic child support is the only way to break the cycle of poverty.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </header>

      {/* Our Story */}
      <section className="px-6 py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">
          <div className="w-full">
            <CurtainReveal src={IMG.schoolMural} alt="MSSF team at St. Peter's School" />
          </div>
          <div className="space-y-6">
            <ScrollReveal delay={150}>
              <p className="font-mono text-xs uppercase tracking-widest text-gold">Our Story</p>
              <h2 className="font-display text-4xl font-semibold leading-tight">
                It started with one abandoned classroom.
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-charcoal/70 mt-4">
                <p>
                  In 2018, our founding team walked into St. Peter's Primary School in rural Cross River
                  State. The roof was open to the sky. The children — hundreds of them — had no desks,
                  no books, and no clean water within walking distance.
                </p>
                <p>
                  We didn't launch a campaign. We didn't post appeals. We started renovating, one
                  classroom at a time, and logged every naira spent and every child served.
                </p>
                <p>
                  Six years later, MSSF is a working blueprint: renovation + staffing + transport +
                  health + water, delivered together, at one real school first. Then the next.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="border-y border-border bg-stone-50 px-6 py-24">
        <ScrollReveal>
          <div className="mx-auto max-w-7xl grid gap-16 lg:grid-cols-2">
            <div className="space-y-4">
              <p className="font-mono text-xs uppercase tracking-widest text-gold">Vision</p>
              <h3 className="font-display text-3xl font-semibold leading-tight text-green">
                A world where every child has access to quality education and the opportunity to thrive.
              </h3>
            </div>
            <div className="space-y-4 lg:border-l lg:border-border lg:pl-12">
              <p className="font-mono text-xs uppercase tracking-widest text-gold">Mission</p>
              <p className="text-lg leading-relaxed text-charcoal/70">
                To bring education, dignity, and opportunity to underserved children in rural areas.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Parallax Quote Section */}
      <section className="relative h-[45vh] min-h-[300px] w-full overflow-hidden parallax-bg flex items-center justify-center text-center px-6" style={{ backgroundImage: `url(${IMG.childrenCloseup})` }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/25" />
        <div className="relative z-10 max-w-4xl space-y-4 text-offwhite">
          <ScrollReveal translateY={12}>
            <p className="font-mono text-xs uppercase tracking-widest text-gold">Our Belief</p>
            <h2 className="font-display text-3xl font-semibold md:text-5xl text-offwhite leading-tight mt-2">
              "We believe every child has a unique star that deserves to shine."
            </h2>
            <div className="h-0.5 w-16 bg-gold mx-auto mt-6" />
          </ScrollReveal>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">Core Values</p>
            <h2 className="mb-12 max-w-2xl font-display text-4xl font-semibold">
              Five commitments we hold to.
            </h2>
          </ScrollReveal>
          <div className="divide-y divide-border border-y border-border">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 80}>
                <div className="grid gap-6 py-8 md:grid-cols-12">
                  <div className="font-mono text-xs text-gold md:col-span-2">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-display text-xl font-semibold md:col-span-4">{v.title}</h3>
                  <p className="text-charcoal/70 md:col-span-6">{v.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Horizontal Scroll */}
      <ScrollReveal>
        <section className="border-b border-border bg-stone-50 py-16 overflow-hidden">
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
                  <div key={`${partner.name}-${idx}`} className="flex flex-col items-center justify-center border border-border/80 p-6 bg-card rounded-sm shadow-sm hover:border-gold/60 hover:-translate-y-0.5 transition-all duration-300 w-72 text-center flex-shrink-0">
                    <div className="font-display font-bold text-green tracking-wide text-sm">{partner.name}</div>
                    <div className="text-[9px] uppercase tracking-widest text-charcoal/50 mt-1.5">{partner.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* People */}
      <section className="bg-stone-50 px-6 py-24" id="team">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="mb-4 font-mono text-xs uppercase tracking-widest text-gold">Our People</p>
              <h2 className="font-display text-4xl font-semibold">The team on the ground.</h2>
              <p className="text-charcoal/60 text-sm mt-3 max-w-md mx-auto">
                Hover to view, or click the active central card to read their full profile biography.
              </p>
            </div>
          </ScrollReveal>

          <div className="h-[480px] w-full mt-8">
            <Smooth3DSlideshow
              slides={team.map((member) => ({
                id: member.id,
                title: member.name,
                role: member.role,
                image: {
                  src: member.img,
                  alt: member.name,
                },
              }))}
              cardWidth={340}
              cardHeight={400}
              radius={4}
              gap={12}
              opacity={60}
              autoplay={true}
              onCardClick={(id) => {
                router.navigate({
                  to: "/people/$personId",
                  params: { personId: id },
                });
              }}
            />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
