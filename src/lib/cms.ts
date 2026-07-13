/**
 * MSSF CMS Data Layer
 *
 * Single module that provides all CMS content to the frontend.
 * At build time, CI populates `src/data/wp-content.json` from the WordPress
 * REST API. If that file is empty / missing, every accessor falls back to
 * the hardcoded defaults that are baked into this file.
 *
 * Architecture note: this module is the ONLY point of contact between the
 * frontend and the CMS data source. If WordPress is later replaced with a
 * custom dashboard, only this file and the CI fetch script need to change.
 */

import wpContent from "@/data/wp-content.json";
import { IMG } from "@/lib/images";

// ---------------------------------------------------------------------------
// Types — shared between CMS and fallback
// ---------------------------------------------------------------------------

export interface TimelineEntry {
  date: string;
  item: string;
  qty?: string;
  remark: string;
  img?: string | string[];
}

export interface TimelineYear {
  year: string;
  entries: TimelineEntry[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  img: string;
  bio: string;
  isFounder?: boolean;
}

export interface PartnerOrg {
  name: string;
  logo: string;
  description?: string;
}

export interface GalleryPhoto {
  src: string;
  alt: string;
  cat: "School Renovation" | "Classroom" | "Community" | "Events";
  span?: string;
}

export interface SiteContentBlock {
  slug: string;
  title: string;
  content: string;
}

export interface Stat {
  end: number;
  suffix: string;
  label: string;
}

export interface Capability {
  n: string;
  title: string;
  body: string;
}

export interface ValueItem {
  title: string;
  body: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  featuredImage?: string;
  categories?: string[];
}

// ---------------------------------------------------------------------------
// WP REST API response shapes (for the CI fetch script transform)
// ---------------------------------------------------------------------------

export interface WPTimelineEntry {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  meta: {
    entry_date: string;
    category: string;
    quantity: string;
    remark: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
}

export interface WPTeamMember {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  meta: {
    role: string;
    is_founder: boolean;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
}

export interface WPPartnerOrg {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
  };
}

export interface WPGalleryItem {
  id: number;
  title: { rendered: string };
  meta: {
    category: string;
  };
  _embedded?: {
    "wp:featuredmedia"?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url: string }>;
    "wp:term"?: Array<Array<{ name: string }>>;
  };
}

// ---------------------------------------------------------------------------
// Type for the wp-content.json structure
// ---------------------------------------------------------------------------

interface WPContentJSON {
  timeline: TimelineYear[];
  team: TeamMember[];
  partners: PartnerOrg[];
  gallery: GalleryPhoto[];
  siteContent: SiteContentBlock[];
  blogPosts: BlogPost[];
}

const cms = wpContent as WPContentJSON;

// ---------------------------------------------------------------------------
// Fallback data — extracted from the current hardcoded route content
// ---------------------------------------------------------------------------

const FALLBACK_TIMELINE: TimelineYear[] = [
  {
    year: "2026",
    entries: [
      { date: "03 / 2026", item: "Donation of First Aid Box with kits inside", qty: "1 Box", remark: "Delivered to the school for safety and basic health support." },
      { date: "02 / 2026", item: "Donation of Empty Water Kegs & Trash Bins", qty: "8 Kegs, 4 Bins", remark: "Brought to facilitate fetching of clean water and school hygiene." },
      { date: "02 / 2026", item: "Donation of GP Tank for Water", qty: "1 GP Tank", remark: "Installation of a large GP tank to store clean borehole water." },
      { date: "02 / 2026", item: "Completed 3 Rooms of School Toilets", qty: "3 Rooms", remark: "New school toilet facilities completed and keys handed over to the Head Teacher." },
    ],
  },
  {
    year: "2025",
    entries: [
      { date: "10 / 2025", item: "Donation of class registers for teachers", qty: "6 Registers", remark: "Supplied to teachers to track and manage student attendance." },
      { date: "08 / 2025", item: "Donation of Foldable teachers' tables, seats & Football", qty: "4 Tables, 6 Seats, 1 Football", remark: "Delivered to the school; Mr. Christopher received it on behalf of the school." },
      { date: "07 / 2025", item: "Donation of wooden benches without tops for ECCDE writing", qty: "6 Benches", remark: "Benches without tops provided for Early Child Care writing." },
      { date: "06 / 2025", item: "Donation of Colour Books & Pencil Crayons for ECCDE", qty: "4 Books, 2 Pkts", remark: "Supplied for ECCDE early childhood learning usage." },
      { date: "06 / 2025", item: "Donation of exercise books, pencils and pens by Rotary Club", qty: "1000 Books, 4 Pkts, 1 Container", remark: "Rotary Club donated 1000pcs of writing materials, 4 packets of pencils, and 1 container of pens." },
      { date: "05 / 2025", item: "Issuance of class register for the head teacher", qty: "1 Register", remark: "Attendance register issued for the Head Teacher." },
      { date: "03 / 2025", item: "Donation of mattress for teachers", qty: "6 Mattresses", remark: "Donation of mattresses for the 2nd batch of teachers to upgrade living quarters." },
      { date: "03 / 2025", item: "Donation of Hausa mat for ECCDE", qty: "1 Mat", remark: "Provided for early childhood learning environment." },
      { date: "02 / 2025", item: "Donation of wooden benches without tops for ECCDE writing", qty: "3 Benches", remark: "The Head Teacher received the benches." },
    ],
  },
  {
    year: "2024",
    entries: [
      { date: "09 / 2024", item: "Renovation of teachers' quarters", qty: "1 Building", remark: "Upgraded living quarters for teachers, providing mattresses and furniture.", img: IMG.quartersRenovated },
      { date: "06 / 2024", item: "Donation of tables & chairs for teacher's use", qty: "5 Tables, 6 Chairs", remark: "Provided for teacher classroom use.", img: IMG.achievementChairs },
      { date: "05 / 2024", item: "Donation of school drums", qty: "1 Set", remark: "A set of school drums donated to the students.", img: IMG.mssfDrum },
      { date: "03 / 2024", item: "Renovation of dilapidated school building", qty: "St. Peter's School", remark: "Transformation of dilapidated school structure into a safe learning environment.", img: [IMG.dilapitatedBuilding, IMG.achievementBefore] },
      { date: "01 / 2024", item: "Writing materials distribution", qty: "500 Books, 3 Pkts, 2 Containers", remark: "Distributed 500 copies of 40 leaves exercise books, 3 packets of pencils, and 2 containers of erasers." },
      { date: "01 / 2024", item: "Recruitment of teachers", qty: "4 Educators", remark: "Recruitment of 4 qualified and passionate teachers for the school." },
    ],
  },
];

const FALLBACK_TEAM: TeamMember[] = [
  { id: "shermal", name: "Dr. Shermal Perera", role: "Founder", img: IMG.shermal, bio: "Founder of Agrinexus International and My Shining Star Foundation, driving sustainable development and education in Cross River State.", isFounder: true },
  { id: "vijay", name: "Mr. Vijayakumar Sambanthar (Mr. Vijay)", role: "Program Director", img: IMG.vijay, bio: "General Manager at Agrinexus and Program Director of MSSF, coordinating on-ground operations with over 40 years of global experience." },
  { id: "rebecca", name: "Ms. Rebecca Asuquo", role: "Program Coordinator", img: IMG.rebecca, bio: "Program Coordinator managing school partnerships, community relations, and material distribution logistics." },
  { id: "kingsley", name: "Mr. Kingsley Iwobi", role: "Volunteer Team Lead", img: IMG.kingsley, bio: "Volunteer Team Lead directing student transport, local logistics, and community volunteer groups." },
];

const FALLBACK_PARTNERS: PartnerOrg[] = [
  { name: "Agrinexus International", logo: IMG.logoAgrinexus },
  { name: "ISP (Schools Partnership)", logo: IMG.logoIsp },
  { name: "JB Farms", logo: IMG.logoJbfarms },
  { name: "Rotary International", logo: IMG.logoRotary },
];

const FALLBACK_GALLERY: GalleryPhoto[] = [
  { src: IMG.schoolMural, alt: "St. Peter's School mural and students", cat: "School Renovation", span: "md:col-span-2 md:row-span-2" },
  { src: IMG.schoolGroup, alt: "Full school group photo", cat: "Classroom" },
  { src: IMG.uniforms, alt: "Students in blue uniforms", cat: "Classroom" },
  { src: IMG.childrenCloseup, alt: "Children close-up", cat: "Classroom" },
  { src: IMG.achievementBefore, alt: "Renovation of dilapidated school building (March 2024)", cat: "School Renovation" },
  { src: IMG.classroomBoots, alt: "Classroom learning and teacher interaction at St. Peter's", cat: "Classroom" },
  { src: IMG.achievementQuarters, alt: "Renovation of teachers' quarters in progress (September 2024)", cat: "School Renovation", span: "md:col-span-2" },
  { src: IMG.achievementDrums, alt: "A set of school drums donated to pupils (May 2024)", cat: "Events" },
  { src: IMG.achievementChairs, alt: "5 tables & 6 chairs donated for teachers' use (June 2024)", cat: "Events" },
  { src: IMG.boyThumbs, alt: "Student giving a thumbs up on the path to school", cat: "Community", span: "md:row-span-2" },
  { src: IMG.threeBoys, alt: "Three schoolchildren on the palm-lined road", cat: "Community" },
  { src: IMG.twoBoys, alt: "Two children in the village", cat: "Community" },
  { src: IMG.classroomDenim, alt: "Volunteers and pupils outside the school building", cat: "Events", span: "md:col-span-2" },
  { src: IMG.classroomDesk, alt: "Individual classroom support and Subeb intervention materials", cat: "Classroom" },
  { src: IMG.classroomNurse, alt: "Deworming and healthcare administration at green classroom tables", cat: "Classroom" },
  { src: IMG.galleryNew1, alt: "School building exterior and renovation view", cat: "School Renovation" },
  { src: IMG.galleryNew2, alt: "Renovated classrooms and courtyard", cat: "School Renovation" },
  { src: IMG.galleryNew3, alt: "School building side view and landscaping", cat: "School Renovation" },
  { src: IMG.galleryNew4, alt: "Clean school building pathways", cat: "School Renovation" },
  { src: IMG.galleryNew5, alt: "Dilapidated building structure before transformation", cat: "School Renovation" },
  { src: IMG.galleryNew6, alt: "Pupils learning at desks inside the classroom", cat: "Classroom" },
  { src: IMG.galleryNew7, alt: "Classroom activity and student participation", cat: "Classroom" },
  { src: IMG.galleryNew8, alt: "Deworming activity inside the school camp", cat: "Classroom" },
  { src: IMG.galleryNew9, alt: "Pupils lined up for health checkups", cat: "Classroom" },
  { src: IMG.galleryNew10, alt: "Students assembled at new green tables", cat: "Classroom" },
];

const FALLBACK_STATS: Stat[] = [
  { end: 2000, suffix: "+", label: "Children Impacted" },
  { end: 10, suffix: "+", label: "Projects Completed" },
  { end: 500, suffix: "+", label: "Learning Materials" },
  { end: 5, suffix: "+", label: "Schools Revitalized" },
];

const FALLBACK_CAPABILITIES: Capability[] = [
  { n: "01", title: "Education Support", body: "Notebooks, uniforms, and tuition assistance so no child is sent home for lack of funds." },
  { n: "02", title: "School Renovation", body: "Transforming dilapidated structures into safe, bright learning environments." },
  { n: "03", title: "Free Transportation", body: "Our transport reaches children in remote settlements safely, every school day." },
  { n: "04", title: "Healthcare Support", body: "Regular check-ups and first-aid at school to catch illness before it disrupts learning." },
  { n: "05", title: "Clean Water & Milk", body: "Daily nutritional milk and borehole water to combat malnutrition and waterborne disease." },
  { n: "06", title: "Poverty Alleviation", body: "Working with families through JB Farms to build household stability around the child." },
];

const FALLBACK_VALUES: ValueItem[] = [
  { title: "Compassion", body: "Deeply caring about the welfare, growth, and future of every child." },
  { title: "Integrity", body: "Honoring every promise and maintaining absolute transparency in all we do." },
  { title: "Impact", body: "Creating tangible, measurable improvements in rural school systems." },
  { title: "Inclusion", body: "Ensuring no child is left behind due to location, gender, or family income." },
  { title: "Sustainability", body: "Building long-term community capacity so positive changes last for generations." },
];

const FALLBACK_WHO_WE_ARE_VALUES: ValueItem[] = [
  { title: "Dignity First", body: "Every child, every family, every partner treated with respect. No pity narratives." },
  { title: "Radical Transparency", body: "Every intervention is dated, itemized, and traceable. Trust is earned in receipts." },
  { title: "Local Roots", body: "Nigerian-led, community-embedded. We build with, never for." },
  { title: "Replicable, Not Charitable", body: "We're building a blueprint other communities can copy. Handouts don't scale." },
  { title: "Long-term Presence", body: "We return to the same schools year after year. Consistency compounds." },
];

// ---------------------------------------------------------------------------
// Public accessors — CMS data with fallback
// ---------------------------------------------------------------------------

/** Year-grouped timeline entries for the Projects & Impact page */
export function getTimeline(): TimelineYear[] {
  if (cms.timeline?.length > 0) return cms.timeline;
  return FALLBACK_TIMELINE;
}

/** Team members for the Who We Are page */
export function getTeam(): TeamMember[] {
  if (cms.team?.length > 0) return cms.team;
  return FALLBACK_TEAM;
}

/** Partner organizations */
export function getPartners(): PartnerOrg[] {
  if (cms.partners?.length > 0) return cms.partners;
  return FALLBACK_PARTNERS;
}

/** Gallery photos */
export function getGallery(): GalleryPhoto[] {
  if (cms.gallery?.length > 0) return cms.gallery;
  return FALLBACK_GALLERY;
}

/** Impact statistics for the homepage */
export function getStats(): Stat[] {
  return FALLBACK_STATS;
}

/** Capability items for the homepage / what-we-do */
export function getCapabilities(): Capability[] {
  return FALLBACK_CAPABILITIES;
}

/** Core values for the homepage */
export function getValues(): ValueItem[] {
  return FALLBACK_VALUES;
}

/** Values for the Who We Are page */
export function getWhoWeAreValues(): ValueItem[] {
  return FALLBACK_WHO_WE_ARE_VALUES;
}

/**
 * Site-wide content blocks (vision, mission, hero copy, etc.)
 * Access by slug: getSiteContent('hero-copy')
 */
export function getSiteContent(slug: string): SiteContentBlock | undefined {
  const blocks = cms.siteContent?.length > 0 ? cms.siteContent : [];
  return blocks.find((b) => b.slug === slug);
}

/** Blog posts for the /blog listing */
export function getBlogPosts(): BlogPost[] {
  if (cms.blogPosts?.length > 0) return cms.blogPosts;
  return [];
}

/** Single blog post by slug */
export function getBlogPost(slug: string): BlogPost | undefined {
  return getBlogPosts().find((p) => p.slug === slug);
}

/**
 * WP API base URL — used by the contact form for runtime POST.
 * Set via VITE_WP_API_URL environment variable.
 */
export const WP_API_URL = import.meta.env.VITE_WP_API_URL as string || "https://cms.mssf.com.ng/wp-json";
