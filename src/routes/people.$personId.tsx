import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { SiteShell } from "@/components/site-shell";
import { IMG } from "@/lib/images";
import { ScrollReveal } from "@/components/scroll-reveal";

export const Route = createFileRoute("/people/$personId")({
  head: ({ params }) => {
    const details = profileData[params.personId as keyof typeof profileData];
    return {
      meta: [
        { title: `${details?.name || "Profile"} — My Shining Star Foundation` },
        { name: "description", content: details?.shortRole || "MSSF Team Member Profile" },
      ],
      links: [{ rel: "canonical", href: `/people/${params.personId}` }],
    };
  },
  component: PersonProfilePage,
});

const profileData = {
  shermal: {
    name: "Dr. Shermal Perera",
    role: "Founder, My Shining Star Foundation",
    shortRole: "Founder & Visionary",
    img: IMG.shermal,
    quote: "Promise Made. Promise Kept.",
    bio: [
      "Dr. Shermal Perera is the founder of My Shining Star Foundation (MSSF) and the founder of Agrinexus International. Guided by a deep sense of philanthropy and community responsibility, he established MSSF to bridge the severe educational gap in the rural areas of Cross River State, Nigeria.",
      "His vision is centered around creating a sustainable, people-first development model where corporate agricultural presence actively elevates the surrounding communities. Under his leadership, MSSF has grown from a single classroom renovation at St. Peter's Primary School into a comprehensive educational initiative that provides free daily transport, deworming, clean water, and daily nutritional milk.",
      "Dr. Shermal remains deeply committed to demonstrating how corporate responsibility and local community empowerment can together unlock human potential and ensure no child is left behind.",
    ],
  },
  vijay: {
    name: "Mr. Vijayakumar Sambanthar (Mr. Vijay)",
    role: "Program Director, My Shining Star Foundation",
    shortRole: "Program Director & General Manager",
    img: IMG.vijay,
    quote: "Empowering communities and developing people to deliver lasting impact.",
    bio: [
      "Mr. Vijayakumar Sambanthar (Mr. Vijay) is a seasoned plantation executive with over four decades of global experience across Asia and Africa. As General Manager at Agrinexus International, he leads the JB Farms Oban operations in Cross River State, driving operational excellence and sustainable growth.",
      "He also serves as Program Director of My Shining Star Foundation, where he has transformed the organisation through the renovation of school infrastructure and the advancement of quality education for underserved children.",
      "Inspired by his leadership within Rotary International, Mr. Vijay is deeply committed to humanitarian service. His distinguished career spans senior roles at Trengganu Development Berhad, Technopalm Services Sdn Bhd, Kwantas Plantation Berhad, Goodhope Asia Holdings, and Kuala Lumpur Kepong Berhad, alongside impactful fundraising efforts across Africa, including the ISP Africa Symposium in Ghana.",
      "A leader of vision and purpose, he continues to empower communities, develop people, and deliver lasting impact on the ground in Cross River State.",
    ],
  },
  rebecca: {
    name: "Ms. Rebecca Asuquo",
    role: "Program Coordinator, My Shining Star Foundation",
    shortRole: "Program Coordinator",
    img: IMG.rebecca,
    quote: "Connecting schools, families, and resources for our children's success.",
    bio: [
      "Ms. Rebecca Asuquo is the Program Coordinator for My Shining Star Foundation, managing the day-to-day ground operations and coordination across all partner schools.",
      "She acts as the primary liaison between MSSF, local school committees, head teachers, and student families. Rebecca manages the logistics of termly material distributions, coordinates student records, and ensures that uniform, book, and stationery supplies are delivered seamlessly to every child.",
      "Her dedication to community-level engagement and her local roots make her a trusted advocate for families in the Oban and Akamkpa II communities.",
    ],
  },
  kingsley: {
    name: "Mr. Kingsley Iwobi",
    role: "Volunteer Team Lead, My Shining Star Foundation",
    shortRole: "Volunteer Team Lead",
    img: IMG.kingsley,
    quote: "Mobilizing local energy to keep our children safe and learning.",
    bio: [
      "Mr. Kingsley Iwobi leads the MSSF volunteer network, coordinating on-ground logistics, child transport safety, and student excursion activities.",
      "He manages the security and transport protocols that bring children safely from remote village settlements to school every day. Kingsley also coordinates local sports outreach, excursions to Calabar, and school health camps.",
      "Through his energetic leadership, Mr. Kingsley Iwobi has built a strong team of local volunteers dedicated to the safety, wellbeing, and physical education of the children in Cross River State.",
    ],
  },
};

function PersonProfilePage() {
  const { personId } = useParams({ from: "/people/$personId" });
  const person = profileData[personId as keyof typeof profileData];

  if (!person) {
    return (
      <SiteShell>
        <div className="mx-auto max-w-7xl px-6 py-24 text-center">
          <h1 className="font-display text-4xl font-semibold">Profile Not Found</h1>
          <p className="mt-4 text-charcoal/60">We couldn't find the team member you're looking for.</p>
          <Link to="/who-we-are" className="mt-8 inline-block text-gold font-semibold">
            ← Return to Who We Are
          </Link>
        </div>
      </SiteShell>
    );
  }

  return (
    <SiteShell>
      <article className="mx-auto max-w-5xl px-6 py-20 lg:py-28">
        <div className="mb-8">
          <Link to="/who-we-are" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-gold hover:text-gold-dark">
            ← Back to Team
          </Link>
        </div>

        <div className="grid gap-12 lg:grid-cols-12 items-start">
          {/* Photo & Quote */}
          <div className="lg:col-span-4">
            <ScrollReveal>
              <div className="space-y-6">
                <div className="overflow-hidden rounded-sm ring-1 ring-black/5 aspect-[4/5] shadow-lg">
                  <img
                    src={person.img}
                    alt={person.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                {person.quote && (
                  <blockquote className="border-l-2 border-gold pl-4 font-display text-lg italic text-charcoal/80">
                    "{person.quote}"
                  </blockquote>
                )}
              </div>
            </ScrollReveal>
          </div>

          {/* Detailed Biography */}
          <div className="lg:col-span-8">
            <ScrollReveal delay={150}>
              <div className="space-y-6">
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-gold mb-1">{person.shortRole}</p>
                  <h1 className="font-display text-4xl font-semibold leading-tight text-green lg:text-5xl">
                    {person.name}
                  </h1>
                  <p className="text-sm font-semibold text-charcoal/50 mt-1">{person.role}</p>
                </div>

                <div className="space-y-6 text-base leading-relaxed text-charcoal/80">
                  {person.bio.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-8 border-t border-border flex flex-wrap gap-4">
                  <Link to="/contact" className="rounded-sm bg-green px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-offwhite hover:bg-green-deep">
                    Get in Touch
                  </Link>
                  <Link to="/donate" className="rounded-sm border border-border px-6 py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-black/5">
                    Support MSSF
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </article>
    </SiteShell>
  );
}
