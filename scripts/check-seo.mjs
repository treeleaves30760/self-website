// Verifies the built site in dist/. Run after `astro build`.
// Rules: one title/description/canonical per page (unique, correct), hreflang trio
// pointing at built pages (en/zh-TW twins of the page, x-default = en, each code
// once), valid JSON-LD, html lang per locale, internal links
// resolve, locale parity, sitemap covers every route with alternates, 404 is
// noindex, static delivery files present.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, join, relative, sep } from 'node:path';
import { parse } from 'node-html-parser';

const DIST = 'dist';
const SITE = 'https://www.treeleaves30760.com';
const failures = [];
const fail = (where, msg) => failures.push(`${where}: ${msg}`);

function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) out.push(...walk(p));
    else out.push(p);
  }
  return out;
}

if (!existsSync(DIST)) {
  console.error('dist/ not found. Run `pnpm build` first.');
  process.exit(1);
}

const files = walk(DIST);
const pages = files.filter((f) => basename(f) === 'index.html');
const routeOf = (file) => {
  const rel = relative(DIST, dirname(file)).split(sep).filter(Boolean).join('/');
  return rel ? `/${rel}/` : '/';
};
const routes = new Set(pages.map(routeOf));

/** p is a site-absolute path: '/projects/' (page) or '/og.png' (file). */
function pathExists(p) {
  const clean = p.split('#')[0].split('?')[0];
  if (clean.endsWith('/')) return routes.has(clean);
  return existsSync(join(DIST, ...clean.split('/').filter(Boolean)));
}

const seenTitles = new Map();
const seenDescriptions = new Map();

for (const file of pages) {
  const route = routeOf(file);
  const root = parse(readFileSync(file, 'utf8'));

  const lang = root.querySelector('html')?.getAttribute('lang');
  const expectLang = route.startsWith('/zh/') ? 'zh-Hant-TW' : 'en';
  if (lang !== expectLang) fail(route, `<html lang> is "${lang}", expected "${expectLang}"`);

  const titleEls = root.querySelectorAll('title');
  if (titleEls.length !== 1) fail(route, `expected exactly one <title>, found ${titleEls.length}`);
  const title = titleEls[0]?.text.trim() ?? '';
  if (!title) fail(route, 'empty <title>');
  else if (seenTitles.has(title)) fail(route, `duplicate <title>, also used by ${seenTitles.get(title)}`);
  seenTitles.set(title, route);

  const descEls = root.querySelectorAll('meta[name="description"]');
  if (descEls.length !== 1) fail(route, `expected exactly one meta description, found ${descEls.length}`);
  const desc = descEls[0]?.getAttribute('content')?.trim() ?? '';
  if (desc.length < 30 || desc.length > 160) fail(route, `meta description length ${desc.length} (want 30-160)`);
  if (desc && seenDescriptions.has(desc)) fail(route, `duplicate meta description, also used by ${seenDescriptions.get(desc)}`);
  seenDescriptions.set(desc, route);

  const canon = root.querySelectorAll('link[rel="canonical"]');
  if (canon.length !== 1) fail(route, `expected exactly one canonical, found ${canon.length}`);
  else if (canon[0].getAttribute('href') !== `${SITE}${route}`) {
    fail(route, `canonical is ${canon[0].getAttribute('href')}, expected ${SITE}${route}`);
  }

  const altEls = root.querySelectorAll('link[rel="alternate"][hreflang]');
  const alts = new Map(altEls.map((el) => [el.getAttribute('hreflang'), el.getAttribute('href')]));
  const codeCounts = new Map();
  for (const el of altEls) {
    const code = el.getAttribute('hreflang');
    codeCounts.set(code, (codeCounts.get(code) ?? 0) + 1);
  }
  for (const [code, n] of codeCounts) if (n > 1) fail(route, `hreflang="${code}" appears ${n} times`);
  for (const code of ['en', 'zh-TW', 'x-default']) {
    const href = alts.get(code);
    if (!href) {
      fail(route, `missing hreflang="${code}"`);
      continue;
    }
    if (!href.startsWith(SITE)) {
      fail(route, `hreflang ${code} is not absolute: ${href}`);
      continue;
    }
    if (!pathExists(href.slice(SITE.length))) fail(route, `hreflang ${code} points to a missing page: ${href}`);
  }
  // Both twins of a page carry the same pair: en -> English URL, zh-TW -> /zh URL, x-default -> English URL.
  const enRoute = route.startsWith('/zh/') ? route.slice('/zh'.length) : route;
  const expectedAlt = new Map([
    ['en', `${SITE}${enRoute}`],
    ['zh-TW', `${SITE}/zh${enRoute}`],
    ['x-default', `${SITE}${enRoute}`],
  ]);
  for (const el of altEls) {
    const code = el.getAttribute('hreflang');
    const href = el.getAttribute('href');
    const want = expectedAlt.get(code);
    if (want && href !== want) fail(route, `hreflang ${code} is ${href}, expected ${want}`);
  }

  const ldScripts = root.querySelectorAll('script[type="application/ld+json"]');
  if (ldScripts.length === 0) fail(route, 'no JSON-LD script');
  for (const s of ldScripts) {
    try {
      const data = JSON.parse(s.text);
      for (const obj of Array.isArray(data) ? data : [data]) {
        if (!obj || typeof obj !== 'object' || !obj['@type']) fail(route, 'JSON-LD object without @type');
      }
    } catch (e) {
      fail(route, `JSON-LD does not parse: ${e.message}`);
    }
  }

  const og = root.querySelector('meta[property="og:image"]')?.getAttribute('content');
  if (!og) fail(route, 'missing og:image');
  else if (!og.startsWith(SITE) || !pathExists(og.slice(SITE.length))) fail(route, `og:image not built: ${og}`);

  for (const a of root.querySelectorAll('a[href]')) {
    const href = a.getAttribute('href') ?? '';
    if (!href.startsWith('/') || href.startsWith('//')) continue;
    const clean = href.split('#')[0].split('?')[0];
    if (!clean) continue;
    if (!clean.endsWith('/') && !/\.[a-z0-9]+$/i.test(clean)) {
      fail(route, `internal link without trailing slash: ${href}`);
      continue;
    }
    if (!pathExists(clean)) fail(route, `internal link to a missing page: ${href}`);
  }
}

// Locale parity: every English route has a Chinese twin and vice versa.
const enRoutes = [...routes].filter((r) => !r.startsWith('/zh/'));
const zhRoutes = [...routes].filter((r) => r.startsWith('/zh/')).map((r) => r.replace(/^\/zh/, ''));
for (const r of enRoutes) if (!zhRoutes.includes(r)) fail('parity', `missing Chinese page for ${r}`);
for (const r of zhRoutes) if (!enRoutes.includes(r)) fail('parity', `missing English page for /zh${r}`);

// 404 page: must exist at dist/404.html and be noindex.
const notFound = join(DIST, '404.html');
if (!existsSync(notFound)) fail('404', 'dist/404.html missing');
else {
  const robots = parse(readFileSync(notFound, 'utf8')).querySelector('meta[name="robots"]')?.getAttribute('content') ?? '';
  if (!robots.includes('noindex')) fail('404', 'dist/404.html must be noindex');
}

// Sitemap: index exists, lists files that exist, covers every route with both alternates.
const sitemapIndex = join(DIST, 'sitemap-index.xml');
if (!existsSync(sitemapIndex)) fail('sitemap', 'sitemap-index.xml missing');
else {
  const parts = [...readFileSync(sitemapIndex, 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  const urls = new Map();
  for (const partUrl of parts) {
    const partFile = join(DIST, ...partUrl.replace(SITE, '').split('/').filter(Boolean));
    if (!existsSync(partFile)) {
      fail('sitemap', `listed sitemap file missing: ${partUrl}`);
      continue;
    }
    for (const block of readFileSync(partFile, 'utf8').matchAll(/<url>([\s\S]*?)<\/url>/g)) {
      const loc = block[1].match(/<loc>(.*?)<\/loc>/)?.[1];
      const langs = [...block[1].matchAll(/hreflang="([^"]+)"/g)].map((m) => m[1]);
      if (loc) urls.set(loc, langs);
    }
  }
  for (const r of routes) {
    const u = `${SITE}${r}`;
    if (!urls.has(u)) {
      fail('sitemap', `route not in sitemap: ${r}`);
      continue;
    }
    for (const code of ['en', 'zh-TW']) if (!urls.get(u).includes(code)) fail('sitemap', `${r} lacks hreflang ${code} alternate`);
  }
  for (const u of urls.keys()) if (!routes.has(u.replace(SITE, ''))) fail('sitemap', `sitemap lists a URL that was not built: ${u}`);
}

for (const f of ['robots.txt', '_headers', 'favicon.svg', 'favicon.ico', 'apple-touch-icon.png', 'og.png']) {
  if (!existsSync(join(DIST, f))) fail('static', `dist/${f} missing`);
}

if (failures.length) {
  console.error(`SEO check failed with ${failures.length} problem(s):`);
  for (const f of failures) console.error(`  - ${f}`);
  process.exit(1);
}
console.log(`SEO check passed: ${pages.length} pages, ${routes.size} routes, sitemap OK.`);
