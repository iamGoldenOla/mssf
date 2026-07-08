# MSSF Website — Frontend PRD & Build Instructions
**Scope:** Frontend only (React / Vite / Tailwind CSS).

---

## 1. Foundation & Vision

- **What is this site about?** A grassroots Nigerian education NGO (MSSF) proving real, dated, itemized impact in rural Cross River State — and converting that proof into recurring donations, volunteers, and partners.
- **Visual style?** Warm documentary/editorial — not corporate-nonprofit, not glossy stock-photo charity cliché. Should feel like a photo essay, not a brochure.
- **Feeling on arrival (first 3 seconds)?** "This is real. This is working. I want in."
- **Typography feel?** Lora (a warm, credible serif) for headlines, Inter (clean, readable sans-serif) for body and data, and JetBrains Mono for dates and log entries.
- **Color Scheme:**
  - **Muted Gold/Beige:** Neutral background `#C1B382`
  - **Soft Pink:** Star body accent `#FDB3C4`
  - **Deep Magenta/Plum:** Ribbon & outlines `#9F1E61`
  - **Emerald Green:** Highlight accent `#1A9E58`
  - **Off-white background:** `#FBFBFA` / `oklch(0.985 0.008 85)`
  - **Charcoal text:** `#3F3F3F` / `oklch(0.28 0.008 60)`

---

## 2. Page Specifications & Features

### 1. Home
- **Hero Section:** Headline: *Nurturing Futures, One Community at a Time.* Subhead: *Every child deserves a chance — to learn, to grow, and to dream.*
- **Impact Strip:** Live counters showing:
  - 2,000+ Children Impacted
  - 10+ Projects Completed
  - 500+ Learning Materials Distributed
  - 5+ Schools Revitalized
- **Draggable Before/After Slider:** Shows St. Peter's School renovation before/after.
- **Holistic Model of Dignity Grid:** 6 items (Education, Renovation, Free daily transport, Healthcare support, Clean water/milk, Poverty alleviation).
- **Delayed Donation Modal:** Triggers 10s after first load with a "Will you help me stay in school?" call to action.

### 2. Who We Are
- **Story Section:** Narrative about visiting St. Peter's in 2018 and acting instead of just campaigning.
- **Vision/Mission/Values:** Clean lists outlining the 5 core commitments (Dignity First, Radical Transparency, Local Roots, Replicable, Long-term Presence).
- **Team Grid:** Real profiles of Dr. Shermal Perera (Founder), Mr. Vijayakumar Sambanthar (Program Director), Deborah Asuquo (Program Coordinator), and Mr. Kingsley (Volunteer Team Lead).

### 3. What We Do
- **Capability Grid:** 7 detailed programs with link-backs to the timeline.
- **St. Peter's Case Study:** Feature story outlining the blueprint for integrated, community-centered development.

### 4. Projects & Impact
- **Impact Dashboard:** High-level metrics.
- **Year-by-Year Timeline (2024-2026):** Verifiable, dated list of every single MSSF donation, construction phase, or staff recruitment.
- **Bank Details Section:** Zenith Bank account details for NGN donations.

### 5. Gallery
- **Masonry Grid:** Clickable thumbnail photos with category filter tabs (All, School Renovation, Classroom Activities, Community Outreach, Donations & Events). Includes click-to-view lightbox.

### 6. Donate Page
- **Hero Section:** *Change a life for just $5/month.*
- **Currency-split giving flow:**
  - USD Subscriptions ($5, $25, $50 / month).
  - NGN Bank Transfer (Zenith Bank, Account Name: My Shining Star Foundation, Account Number: 1016024813, Email: info@mssf.com.ng).

### 7. Get Involved
- **Paths Grid:** Cards for Volunteer, Partner, Sponsor, and Donate.
- **Partners Block:** Profiles of JB Farms/Agrinexus and Rotary International.

### 8. Contact Us
- **Contact Details:** Email: `info@mssf.com.ng`, Phone: `+234 XXX XXX XXXX`, location details.
- **Form:** Name, Email, Phone, Subject, Message.
- **Map:** Embedded OpenStreetMap location.
