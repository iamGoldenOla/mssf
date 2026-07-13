import http from 'http';
import fs from 'fs';
import path from 'path';
import puppeteer from 'puppeteer';

const PORT = 8080;
const DIST_DIR = path.resolve('dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
};

// 1. Simple HTTP Server mimicking cPanel static routing
function startServer(port, dir) {
  const server = http.createServer((req, res) => {
    let filePath = path.join(dir, decodeURIComponent(req.url));

    // For SPA, check if request lacks a file extension. If so, fallback to index.html
    const ext = path.extname(filePath);
    if (!ext) {
      filePath = path.join(dir, 'index.html');
    }

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
        return;
      }
      const contentType = MIME_TYPES[path.extname(filePath)] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(data);
    });
  });

  return new Promise((resolve) => {
    server.listen(port, () => {
      console.log(`[Prerender Server] Running on http://localhost:${port}`);
      resolve(server);
    });
  });
}

// 2. Prerender a single route and write to its static HTML location
async function prerenderRoute(browser, port, routePath, outputDir) {
  const page = await browser.newPage();
  
  // Set viewport to desktop for initial render
  await page.setViewport({ width: 1200, height: 800 });

  const url = `http://localhost:${port}${routePath}`;
  console.log(`[Prerender] Crawling: ${url}`);

  try {
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
    // Wait a brief moment to ensure React components, animations, and icons hydrate/render
    await new Promise(r => setTimeout(r, 1500));

    const html = await page.content();
    
    // Save to route/index.html (e.g. /who-we-are -> who-we-are/index.html)
    let relativePath = routePath;
    if (relativePath === '/') {
      relativePath = '/index.html';
    } else {
      relativePath = path.join(relativePath, 'index.html');
    }

    const outputPath = path.join(outputDir, relativePath);
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, html, 'utf-8');
    console.log(`[Prerender] Saved pre-rendered HTML to ${outputPath}`);
  } catch (error) {
    console.error(`[Prerender] Error rendering route ${routePath}:`, error.message);
    throw error;
  } finally {
    await page.close();
  }
}

// 3. Generate static sitemap.xml
function generateSitemap(blogSlugs, outputDir) {
  const baseUrl = 'https://mssf.com.ng';
  const staticPaths = [
    '/',
    '/who-we-are',
    '/what-we-do',
    '/projects',
    '/gallery',
    '/donate',
    '/get-involved',
    '/contact',
    '/blog'
  ];

  const allPaths = [...staticPaths, ...blogSlugs.map(slug => `/blog/${slug}`)];
  
  const urls = allPaths.map(p => {
    const priority = p === '/' ? '1.0' : p.startsWith('/blog/') ? '0.6' : '0.8';
    const changefreq = p.startsWith('/blog/') ? 'monthly' : 'weekly';
    return `  <url>
    <loc>${baseUrl}${p}</loc>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;

  const outputPath = path.join(outputDir, 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf-8');
  console.log(`[Prerender] Generated static sitemap.xml at ${outputPath}`);
}

async function run() {
  console.log('[Prerender] Beginning SSG pre-render pass...');

  // Start the server
  const server = await startServer(PORT, DIST_DIR);

  // Load blog post slugs to crawl them too
  let blogSlugs = [];
  try {
    const wpContent = JSON.parse(fs.readFileSync('src/data/wp-content.json', 'utf-8'));
    if (wpContent.blogPosts) {
      blogSlugs = wpContent.blogPosts.map(post => post.slug);
      console.log(`[Prerender] Found ${blogSlugs.length} blog posts to prerender.`);
    }
  } catch (err) {
    console.warn('[Prerender] Could not read wp-content.json, proceeding with static routes only:', err.message);
  }

  // Setup Puppeteer with robust launch options (auto-detecting system Chrome as fallback)
  let launchOptions = {
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  };

  if (process.platform === 'win32') {
    const paths = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
    ];
    for (const p of paths) {
      if (fs.existsSync(p)) {
        launchOptions.executablePath = p;
        break;
      }
    }
  }

  const browser = await puppeteer.launch(launchOptions);

  const staticRoutes = [
    '/',
    '/who-we-are',
    '/what-we-do',
    '/projects',
    '/gallery',
    '/donate',
    '/get-involved',
    '/contact',
    '/blog'
  ];

  const allRoutes = [...staticRoutes, ...blogSlugs.map(slug => `/blog/${slug}`)];

  try {
    for (const route of allRoutes) {
      await prerenderRoute(browser, PORT, route, DIST_DIR);
    }
    
    // Generate sitemap
    generateSitemap(blogSlugs, DIST_DIR);
    
    console.log('[Prerender] Pre-render pass completed successfully!');
  } catch (error) {
    console.error('[Prerender] Fatal error during pre-render pass:', error.message);
    process.exit(1);
  } finally {
    await browser.close();
    server.close();
    console.log('[Prerender] Server stopped.');
  }
}

run();
