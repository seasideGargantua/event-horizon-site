import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://event-horizon-site.vercel.app',
  integrations: [mdx(), sitemap()],
});
