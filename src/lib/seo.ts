import type { Lang } from '../i18n/ui';
import { HTML_LANG, absoluteUrl, localePath, otherLang } from '../i18n/utils';
import { site } from '../data/site';

export type JsonLd = Record<string, unknown>;

export interface SeoProps {
  lang: Lang;
  /** Page title without the site suffix. Omit on the home page. */
  title?: string;
  description: string;
  /** Locale-free path, e.g. '' | 'projects' | 'projects/codefyui'. */
  path: string;
  noindex?: boolean;
  jsonLd?: JsonLd[];
  ogType?: 'website' | 'article';
}

export function pageTitle(lang: Lang, title?: string): string {
  if (!title) return site.homeTitle[lang];
  return `${title} · ${site.owner[lang]}`;
}

export function isOwner(name: string): boolean {
  return (site.ownerNames as readonly string[]).includes(name.trim());
}

/** One node id for the site owner, so every Person reference resolves to the same entity. */
const PERSON_ID = `${absoluteUrl(localePath('en'))}#person`;

const ownerRef = (): JsonLd => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: site.owner.en,
  alternateName: site.owner.zh,
  url: absoluteUrl(localePath('en')),
});

export function personJsonLd(lang: Lang, opts: { image?: string } = {}): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': PERSON_ID,
    name: site.owner.en,
    alternateName: site.owner.zh,
    url: absoluteUrl(localePath('en')),
    ...(opts.image ? { image: opts.image } : {}),
    email: `mailto:${site.email}`,
    jobTitle: site.jobTitle[lang],
    affiliation: { '@type': 'CollegeOrUniversity', name: site.affiliation[lang] },
    sameAs: [site.github, site.linkedin],
  };
}

export function websiteJsonLd(lang: Lang): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.siteName[lang],
    alternateName: site.siteName[otherLang(lang)],
    url: absoluteUrl(localePath(lang)),
    inLanguage: HTML_LANG[lang],
    author: ownerRef(),
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: it.url })),
  };
}

export function collectionPageJsonLd(lang: Lang, o: { name: string; description: string; url: string }): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: o.name,
    description: o.description,
    url: o.url,
    inLanguage: HTML_LANG[lang],
  };
}

export function softwareSourceCodeJsonLd(
  lang: Lang,
  p: { name: string; description: string; url: string; repo: string; languages: string[]; license?: string; year: number },
): JsonLd {
  const out: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name: p.name,
    description: p.description,
    url: p.url,
    codeRepository: p.repo,
    programmingLanguage: p.languages,
    dateCreated: String(p.year),
    inLanguage: HTML_LANG[lang],
    author: ownerRef(),
  };
  if (p.license) out.license = `https://spdx.org/licenses/${p.license}`;
  return out;
}

export function scholarlyArticleJsonLd(
  lang: Lang,
  p: {
    title: string;
    authors: string[];
    year: number;
    date?: string;
    venue: string;
    venueFull?: string;
    url: string;
    pdf?: string;
    arxiv?: string;
    openreview?: string;
    description: string;
  },
): JsonLd {
  const sameAs = [p.arxiv, p.openreview].filter((x): x is string => Boolean(x));
  const out: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: p.title,
    name: p.title,
    description: p.description,
    url: p.url,
    datePublished: p.date ?? String(p.year),
    inLanguage: 'en',
    author: p.authors.map((name) =>
      isOwner(name) ? { '@type': 'Person', '@id': PERSON_ID, name, url: absoluteUrl(localePath('en')) } : { '@type': 'Person', name },
    ),
    publication: { '@type': 'PublicationEvent', name: p.venueFull ?? p.venue },
  };
  if (sameAs.length) out.sameAs = sameAs;
  if (p.pdf) out.encoding = { '@type': 'MediaObject', contentUrl: p.pdf, encodingFormat: 'application/pdf' };
  return out;
}

export function bibtex(p: { slug: string; title: string; authors: string[]; year: number; venue: string; venueFull?: string; pages?: string }): string {
  const lines = [
    `@inproceedings{${p.slug}-${p.year},`,
    `  title     = {${p.title}},`,
    `  author    = {${p.authors.join(' and ')}},`,
    `  booktitle = {${p.venueFull ?? p.venue}},`,
    `  year      = {${p.year}}${p.pages ? ',' : ''}`,
  ];
  if (p.pages) lines.push(`  pages     = {${p.pages.replace(/[–—-]+/g, '--')}}`);
  lines.push('}');
  return lines.join('\n');
}
