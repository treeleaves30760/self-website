import { describe, expect, it } from 'vitest';
import {
  absoluteUrl,
  alternates,
  assetUrl,
  formatPeriod,
  formatYearMonth,
  localePath,
  normalizePath,
  otherLang,
  stripLang,
} from './utils';
import { t } from './ui';

describe('normalizePath', () => {
  it('returns / for empty input', () => {
    expect(normalizePath('')).toBe('/');
    expect(normalizePath('/')).toBe('/');
  });
  it('adds leading and trailing slashes', () => {
    expect(normalizePath('projects')).toBe('/projects/');
    expect(normalizePath('/projects')).toBe('/projects/');
    expect(normalizePath('projects/codefyui/')).toBe('/projects/codefyui/');
  });
});

describe('localePath', () => {
  it('leaves English unprefixed', () => {
    expect(localePath('en')).toBe('/');
    expect(localePath('en', 'projects')).toBe('/projects/');
  });
  it('prefixes Chinese with /zh', () => {
    expect(localePath('zh')).toBe('/zh/');
    expect(localePath('zh', 'projects/codefyui')).toBe('/zh/projects/codefyui/');
  });
});

describe('stripLang', () => {
  it('detects zh and strips the prefix', () => {
    expect(stripLang('/zh/projects/')).toEqual({ lang: 'zh', path: '/projects/' });
    expect(stripLang('/zh/')).toEqual({ lang: 'zh', path: '/' });
  });
  it('treats everything else as en', () => {
    expect(stripLang('/projects/codefyui/')).toEqual({ lang: 'en', path: '/projects/codefyui/' });
    expect(stripLang('/')).toEqual({ lang: 'en', path: '/' });
  });
});

describe('absolute URLs', () => {
  it('builds canonical page URLs with trailing slash', () => {
    expect(absoluteUrl('/')).toBe('https://www.treeleaves30760.com/');
    expect(absoluteUrl('/zh/about/')).toBe('https://www.treeleaves30760.com/zh/about/');
  });
  it('builds asset URLs without trailing slash', () => {
    expect(assetUrl('og.png')).toBe('https://www.treeleaves30760.com/og.png');
    expect(assetUrl('/og.png')).toBe('https://www.treeleaves30760.com/og.png');
  });
});

describe('alternates', () => {
  it('returns en, zh-TW and x-default for a locale-free path', () => {
    expect(alternates('projects')).toEqual([
      { hreflang: 'en', href: 'https://www.treeleaves30760.com/projects/' },
      { hreflang: 'zh-TW', href: 'https://www.treeleaves30760.com/zh/projects/' },
      { hreflang: 'x-default', href: 'https://www.treeleaves30760.com/projects/' },
    ]);
  });
});

describe('otherLang', () => {
  it('flips the locale', () => {
    expect(otherLang('en')).toBe('zh');
    expect(otherLang('zh')).toBe('en');
  });
});

describe('dates', () => {
  it('formats year-month per locale', () => {
    expect(formatYearMonth('en', '2026-03')).toBe('Mar 2026');
    expect(formatYearMonth('zh', '2026-03')).toBe('2026年3月');
  });
  it('formats periods with present and missing values', () => {
    expect(formatPeriod('en', '2024-10', '2025-10')).toBe('Oct 2024 – Oct 2025');
    expect(formatPeriod('zh', '2024-10', 'present')).toBe('2024年10月 – 至今');
    expect(formatPeriod('en', undefined, 'present')).toBe('');
    expect(formatPeriod('en', '2024-04')).toBe('Apr 2024');
  });
});

describe('t', () => {
  it('returns strings for both languages', () => {
    expect(t('en', 'nav.projects')).toBe('Projects');
    expect(t('zh', 'nav.projects')).toBe('專案');
  });
});
