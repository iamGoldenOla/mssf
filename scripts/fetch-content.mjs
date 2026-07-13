import fs from 'fs';
import path from 'path';

const WP_URL = process.env.VITE_WP_API_URL || 'https://cms.mssf.com.ng/wp-json';

console.log(`[CMS Fetch] Connecting to WordPress REST API at: ${WP_URL}`);

async function fetchFromWP(endpoint) {
  const url = `${WP_URL}/wp/v2/${endpoint}`;
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`HTTP Error ${res.status} when fetching ${endpoint}`);
    }
    const data = await res.json();
    console.log(`[CMS Fetch] Successfully fetched ${data.length} items from ${endpoint}`);
    return data;
  } catch (error) {
    console.error(`[CMS Fetch] Error fetching endpoint ${endpoint}:`, error.message);
    throw error; // Fail the build loudly
  }
}

function getFeaturedImage(item) {
  if (item._embedded && item._embedded['wp:featuredmedia'] && item._embedded['wp:featuredmedia'][0]) {
    return item._embedded['wp:featuredmedia'][0].source_url || '';
  }
  return '';
}

function getFeaturedImageAlt(item) {
  if (item._embedded && item._embedded['wp:featuredmedia'] && item._embedded['wp:featuredmedia'][0]) {
    return item._embedded['wp:featuredmedia'][0].alt_text || item.title?.rendered || '';
  }
  return item.title?.rendered || '';
}

function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

async function run() {
  try {
    // 1. Fetch data from all CPTs
    const wpTimeline = await fetchFromWP('timeline_entry?per_page=100&_embed=1');
    const wpTeam = await fetchFromWP('team_member?per_page=100&_embed=1');
    const wpPartners = await fetchFromWP('partner_org?per_page=100&_embed=1');
    const wpGallery = await fetchFromWP('gallery_item?per_page=100&_embed=1');
    const wpSiteContent = await fetchFromWP('site_content?per_page=100');
    const wpPosts = await fetchFromWP('posts?per_page=100&_embed=1');

    // 2. Transform Timeline
    // Group timeline entries by year extracted from entry_date (e.g. "03 / 2026" -> "2026")
    const timelineMap = {};
    for (const item of wpTimeline) {
      const entryDate = item.meta?.entry_date || '';
      let year = 'Unknown';
      if (entryDate && entryDate.includes('/')) {
        const parts = entryDate.split('/');
        year = parts[parts.length - 1].trim();
      } else {
        // Fallback to post date year
        year = new Date(item.date).getFullYear().toString();
      }

      if (!timelineMap[year]) {
        timelineMap[year] = [];
      }

      timelineMap[year].push({
        date: entryDate || new Date(item.date).toLocaleDateString('en-US', { month: '2-digit', year: 'numeric' }),
        item: item.title?.rendered || '',
        qty: item.meta?.quantity || '',
        remark: item.meta?.remark || '',
        img: getFeaturedImage(item) || undefined
      });
    }

    // Convert map to sorted year arrays
    const timeline = Object.keys(timelineMap)
      .sort((a, b) => b.localeCompare(a)) // Sort years descending
      .map(year => ({
        year,
        entries: timelineMap[year]
      }));

    // 3. Transform Team Members
    const team = wpTeam.map(item => ({
      id: item.slug || String(item.id),
      name: item.title?.rendered || '',
      role: item.meta?.role || '',
      img: getFeaturedImage(item) || '',
      bio: stripHtml(item.content?.rendered || ''),
      isFounder: item.meta?.is_founder === '1' || item.meta?.is_founder === true || false
    }));

    // 4. Transform Partners
    const partners = wpPartners.map(item => ({
      name: item.title?.rendered || '',
      logo: getFeaturedImage(item) || '',
      description: stripHtml(item.content?.rendered || '')
    }));

    // 5. Transform Gallery
    const gallery = wpGallery.map(item => {
      // Map category
      let category = item.meta?.category || 'Classroom';
      // Ensure it maps to expected frontend categories
      if (category === 'donations_events') category = 'Events';
      if (category === 'outreach') category = 'Community';
      if (category === 'classroom') category = 'Classroom';
      if (category === 'renovation') category = 'School Renovation';

      return {
        src: getFeaturedImage(item) || '',
        alt: getFeaturedImageAlt(item),
        cat: category
      };
    });

    // 6. Transform Site Content (One-off blocks)
    const siteContent = wpSiteContent.map(item => ({
      slug: item.slug || '',
      title: item.title?.rendered || '',
      content: item.content?.rendered || ''
    }));

    // 7. Transform Blog Posts
    const blogPosts = wpPosts.map(item => {
      // Extract category names
      let categories = [];
      if (item._embedded && item._embedded['wp:term']) {
        const terms = item._embedded['wp:term'];
        // Typically wp:term is array of taxonomies, term[0] is categories
        const wpCats = terms[0] || [];
        categories = wpCats.map(c => c.name);
      }

      return {
        id: item.id,
        slug: item.slug || '',
        title: item.title?.rendered || '',
        excerpt: item.excerpt?.rendered || '',
        content: item.content?.rendered || '',
        date: item.date,
        featuredImage: getFeaturedImage(item) || undefined,
        categories
      };
    });

    // 8. Output structure
    const output = {
      timeline,
      team,
      partners,
      gallery,
      siteContent,
      blogPosts
    };

    const outputPath = path.resolve('src/data/wp-content.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(output, null, 2), 'utf-8');

    console.log(`[CMS Fetch] Success! Wrote all transformed data to ${outputPath}`);
  } catch (error) {
    console.error('[CMS Fetch] Fatal Error:', error.message);
    process.exit(1); // Exit with error code to fail the build
  }
}

run();
