import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

const localized = z.object({ en: z.string(), zh: z.string() });
const yearMonth = z.string().regex(/^\d{4}(-\d{2})?$/, 'use YYYY or YYYY-MM');
const shortText = z.string().min(30).max(160);

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    description: shortText,
    year: z.number().int(),
    tags: z.array(z.string()).min(1),
    tech: z.array(z.string()).min(1),
    links: z.object({
      repo: z.string().url(),
      docs: z.string().url().optional(),
      homepage: z.string().url().optional(),
      pypi: z.string().url().optional(),
    }),
    license: z.string().optional(),
    featured: z.boolean().default(true),
    order: z.number().int(),
  }),
});

const publications = defineCollection({
  loader: glob({ base: './src/content/publications', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()).min(1),
    venue: z.string(),
    venueFull: z.string().optional(),
    year: z.number().int(),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    pages: z.string().optional(),
    links: z.object({
      pdf: z.string().url().optional(),
      arxiv: z.string().url().optional(),
      openreview: z.string().url().optional(),
      project: z.string().url().optional(),
      venuePage: z.string().url().optional(),
      code: z.string().url().optional(),
    }),
    description: shortText,
    order: z.number().int(),
  }),
});

const career = defineCollection({
  loader: file('./src/content/career.json'),
  schema: z.object({
    type: z.enum(['education', 'experience']),
    org: localized,
    role: localized,
    location: localized.optional(),
    start: yearMonth.optional(),
    end: z.union([z.literal('present'), yearMonth]).optional(),
    summary: localized.optional(),
    skills: z.array(z.string()).optional(),
    order: z.number().int(),
  }),
});

export const collections = { projects, publications, career };
