// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';

// https://astro.build/config
export default defineConfig({
  site: 'https://rhx225522.github.io',
  base: '/blog-astro',
  trailingSlash: 'ignore',
  build: { format: 'directory' },
  // Expressive Code 负责代码块渲染，配置见 ec.config.mjs
  integrations: [expressiveCode(), sitemap()],
});
