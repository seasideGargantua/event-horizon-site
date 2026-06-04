import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const categories = ['ai-agent', 'devtool', 'productivity', 'education', 'content', 'opensource', 'vertical-tool', 'other'] as const;
const stages = ['idea', 'prototype', 'beta', 'launched', 'revenue'] as const;
const investorStates = ['open', 'exploring', 'not_open'] as const;
const visibilityStates = ['public', 'community', 'investor_only'] as const;

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    one_liner: z.string(),
    owner: z.string(),
    category: z.enum(categories),
    stage: z.enum(stages),
    product_url: z.url().optional(),
    cover: z.string().optional(),
    ai_stack: z.array(z.string()).default([]),
    target_user: z.string(),
    problem: z.string(),
    traction_signal: z.string(),
    current_need: z.array(z.string()).default([]),
    collaboration_need: z.array(z.string()).default([]),
    investor_interest: z.enum(investorStates),
    visibility: z.enum(visibilityStates).default('public'),
    risk_note: z.string().optional(),
    last_update: z.coerce.date(),
    next_milestone: z.string(),
    featured: z.boolean().default(false),
  }),
});

const drops = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/drops' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    issue: z.number(),
    summary: z.string(),
    featured_projects: z.array(z.string()).default([]),
    new_projects: z.array(z.string()).default([]),
    updates: z.array(z.string()).default([]),
    collab_needs: z.array(z.string()).default([]),
    investor_notes: z.array(z.string()).default([]),
  }),
});

const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    date: z.coerce.date(),
    type: z.enum(['open-night', 'builder-review', 'collab-night', 'investor-briefing', 'demo-day']),
    location: z.string(),
    status: z.enum(['upcoming', 'done']),
    registration_url: z.url().optional(),
    summary: z.string(),
    related_projects: z.array(z.string()).default([]),
  }),
});

export const collections = { projects, drops, events };
