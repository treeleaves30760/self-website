import { DEFAULT_LANG, LANGS, type Lang } from './ui';

export const SITE_URL = 'https://www.treeleaves30760.com';

export const HTML_LANG: Record<Lang, string> = { en: 'en', zh: 'zh-Hant-TW' };
export const OG_LOCALE: Record<Lang, string> = { en: 'en_US', zh: 'zh_TW' };

export function isLang(x: string): x is Lang {
  return (LANGS as readonly string[]).includes(x);
}

/** '' | 'projects' | '/projects' | 'projects/' -> '/projects/' ; '' -> '/' */
export function normalizePath(path: string): string {
  const trimmed = path.replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

/** Site path for a locale. localePath('zh', 'projects') -> '/zh/projects/' */
export function localePath(lang: Lang, path = ''): string {
  const p = normalizePath(path);
  return lang === DEFAULT_LANG ? p : `/${lang}${p}`;
}

/** Split a pathname into locale and locale-free path. */
export function stripLang(pathname: string): { lang: Lang; path: string } {
  const segments = pathname.split('/').filter(Boolean);
  const first = segments[0];
  if (first && first !== DEFAULT_LANG && isLang(first)) {
    return { lang: first, path: normalizePath(segments.slice(1).join('/')) };
  }
  return { lang: DEFAULT_LANG, path: normalizePath(segments.join('/')) };
}

/** Absolute URL for a page path (always trailing slash). */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${normalizePath(path)}`;
}

/** Absolute URL for a static file (no trailing slash). */
export function assetUrl(file: string): string {
  return `${SITE_URL}/${file.replace(/^\/+/, '')}`;
}

/** hreflang alternates for a locale-free path such as 'projects/codefyui'. */
export function alternates(path: string): { hreflang: string; href: string }[] {
  const en = absoluteUrl(localePath('en', path));
  const zh = absoluteUrl(localePath('zh', path));
  return [
    { hreflang: 'en', href: en },
    { hreflang: 'zh-TW', href: zh },
    { hreflang: 'x-default', href: en },
  ];
}

export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'zh' : 'en';
}

const EN_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** '2026-03' -> 'Mar 2026' (en) or '2026年3月' (zh); a bare year '2020' -> '2020' (en) or '2020年' (zh) */
export function formatYearMonth(lang: Lang, ym: string): string {
  const [y, m] = ym.split('-').map(Number);
  if (m === undefined) return lang === 'zh' ? `${y}年` : String(y);
  if (lang === 'zh') return `${y}年${m}月`;
  return `${EN_MONTHS[m - 1]} ${y}`;
}

/** Period label. Without a start date nothing is shown (no guessed dates). */
export function formatPeriod(lang: Lang, start?: string, end?: string): string {
  if (!start) return '';
  const present = lang === 'zh' ? '至今' : 'Present';
  const s = formatYearMonth(lang, start);
  if (!end) return s;
  const e = end === 'present' ? present : formatYearMonth(lang, end);
  return `${s} – ${e}`;
}
