import { getCollection, type CollectionEntry } from 'astro:content';
import type { Lang } from '../i18n/ui';

export type ProjectEntry = CollectionEntry<'projects'>;
export type PublicationEntry = CollectionEntry<'publications'>;
export type CareerEntry = CollectionEntry<'career'>;

/** 'en/codefyui' -> 'codefyui' */
export function slugOf(entry: { id: string }): string {
  return entry.id.replace(/^(en|zh)\//, '');
}

function byOrder<T extends { data: { order: number } }>(a: T, b: T): number {
  return a.data.order - b.data.order;
}

export async function getProjects(lang: Lang): Promise<ProjectEntry[]> {
  const entries = await getCollection('projects', (e) => e.id.startsWith(`${lang}/`));
  return entries.sort(byOrder);
}

export async function getProject(lang: Lang, slug: string): Promise<ProjectEntry | undefined> {
  return (await getProjects(lang)).find((e) => slugOf(e) === slug);
}

export async function getPublications(lang: Lang): Promise<PublicationEntry[]> {
  const entries = await getCollection('publications', (e) => e.id.startsWith(`${lang}/`));
  return entries.sort(byOrder);
}

export async function getPublication(lang: Lang, slug: string): Promise<PublicationEntry | undefined> {
  return (await getPublications(lang)).find((e) => slugOf(e) === slug);
}

export async function getCareer(type?: 'education' | 'experience'): Promise<CareerEntry[]> {
  const entries = await getCollection('career', (e) => (type ? e.data.type === type : true));
  return entries.sort(byOrder);
}
