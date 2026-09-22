import { describe, expect, it } from 'vitest';
import {
  bibtex,
  breadcrumbJsonLd,
  isOwner,
  pageTitle,
  personJsonLd,
  scholarlyArticleJsonLd,
  softwareSourceCodeJsonLd,
  websiteJsonLd,
} from './seo';

describe('pageTitle', () => {
  it('uses the fixed home titles when no title is given', () => {
    expect(pageTitle('en')).toBe('Po-Hsiang Hsu (許博翔) · LLM & VLM Research, NTHU EE');
    expect(pageTitle('zh')).toBe('許博翔 (Po-Hsiang Hsu) · 清華電機 LLM 與 VLM 研究');
  });
  it('appends the owner name to page titles', () => {
    expect(pageTitle('en', 'Projects')).toBe('Projects · Po-Hsiang Hsu');
    expect(pageTitle('zh', '專案')).toBe('專案 · 許博翔');
  });
});

describe('isOwner', () => {
  it('matches both spellings and nothing else', () => {
    expect(isOwner('Po-Hsiang Hsu')).toBe(true);
    expect(isOwner('許博翔')).toBe(true);
    expect(isOwner('Min Sun')).toBe(false);
  });
});

describe('JSON-LD builders', () => {
  it('builds a Person with sameAs links', () => {
    const p = personJsonLd('en');
    expect(p['@type']).toBe('Person');
    expect(p['name']).toBe('Po-Hsiang Hsu');
    expect(p['alternateName']).toBe('許博翔');
    expect(p['sameAs']).toEqual(['https://github.com/treeleaves30760', 'https://www.linkedin.com/in/hsupohsiang/']);
    expect(p['url']).toBe('https://www.treeleaves30760.com/');
  });
  it('builds a WebSite in the page language', () => {
    expect(websiteJsonLd('zh')).toMatchObject({ '@type': 'WebSite', inLanguage: 'zh-Hant-TW', url: 'https://www.treeleaves30760.com/zh/' });
  });
  it('builds an ordered BreadcrumbList', () => {
    const b = breadcrumbJsonLd([
      { name: 'Home', url: 'https://www.treeleaves30760.com/' },
      { name: 'Projects', url: 'https://www.treeleaves30760.com/projects/' },
    ]);
    expect(b['@type']).toBe('BreadcrumbList');
    expect(b['itemListElement']).toEqual([
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.treeleaves30760.com/' },
      { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://www.treeleaves30760.com/projects/' },
    ]);
  });
  it('builds SoftwareSourceCode with the owner as author', () => {
    const s = softwareSourceCodeJsonLd('en', {
      name: 'pairmux',
      description: 'Terminal primitives for AI agents on tmux.',
      url: 'https://www.treeleaves30760.com/projects/pairmux/',
      repo: 'https://github.com/treeleaves30760/pairmux',
      languages: ['Go'],
      license: 'MIT',
      year: 2026,
    });
    expect(s).toMatchObject({
      '@type': 'SoftwareSourceCode',
      name: 'pairmux',
      codeRepository: 'https://github.com/treeleaves30760/pairmux',
      programmingLanguage: ['Go'],
      license: 'https://spdx.org/licenses/MIT',
      dateCreated: '2026',
    });
    expect((s['author'] as Record<string, unknown>)['@type']).toBe('Person');
  });
  it('builds ScholarlyArticle with all authors', () => {
    const a = scholarlyArticleJsonLd('en', {
      title: 'MenTeR',
      authors: ['Pin-Han Chen', 'Po-Hsiang Hsu'],
      year: 2025,
      venue: 'IEEE ICLAD 2025',
      venueFull: 'IEEE International Conference on LLM-Aided Design (ICLAD) 2025',
      url: 'https://www.treeleaves30760.com/publications/menter/',
      arxiv: 'https://arxiv.org/abs/2505.22990',
      description: 'A multi-agent workflow.',
    });
    expect(a['@type']).toBe('ScholarlyArticle');
    expect(a['author']).toEqual([
      { '@type': 'Person', name: 'Pin-Han Chen' },
      { '@type': 'Person', name: 'Po-Hsiang Hsu', url: 'https://www.treeleaves30760.com/' },
    ]);
    expect(a['sameAs']).toEqual(['https://arxiv.org/abs/2505.22990']);
    expect(a['isPartOf']).toEqual({ '@type': 'PublicationEvent', name: 'IEEE International Conference on LLM-Aided Design (ICLAD) 2025' });
    expect(a['datePublished']).toBe('2025');
  });
});

describe('bibtex', () => {
  it('renders an inproceedings entry with pages', () => {
    expect(
      bibtex({
        slug: 'menter',
        title: 'MenTeR: A fully-automated Multi-agenT workflow',
        authors: ['Pin-Han Chen', 'Po-Hsiang Hsu'],
        year: 2025,
        venue: 'IEEE ICLAD 2025',
        venueFull: 'IEEE International Conference on LLM-Aided Design (ICLAD) 2025',
        pages: '124–132',
      }),
    ).toBe(
      [
        '@inproceedings{menter-2025,',
        '  title     = {MenTeR: A fully-automated Multi-agenT workflow},',
        '  author    = {Pin-Han Chen and Po-Hsiang Hsu},',
        '  booktitle = {IEEE International Conference on LLM-Aided Design (ICLAD) 2025},',
        '  year      = {2025},',
        '  pages     = {124--132}',
        '}',
      ].join('\n'),
    );
  });
  it('omits pages and falls back to venue when venueFull is missing', () => {
    expect(bibtex({ slug: 'x', title: 'T', authors: ['A B'], year: 2026, venue: 'ECCV 2026' })).toBe(
      ['@inproceedings{x-2026,', '  title     = {T},', '  author    = {A B},', '  booktitle = {ECCV 2026},', '  year      = {2026}', '}'].join('\n'),
    );
  });
});
