// @ts-check
import starlight from '@astrojs/starlight';
import catppuccin from "@catppuccin/starlight";
import { defineConfig } from 'astro/config';
import starlightLinksValidator from 'starlight-links-validator';

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: '3D Printing Wiki',
            editLink: {
                baseUrl: 'https://github.com/bjschafer/3dprinting-wiki/edit/main/',
            },
            social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/bjschafer/3dprinting-wiki' }],
            sidebar: [
                {
                    label: 'Guides',
                    items: [
                        // Each item here is one entry in the navigation menu.
                        { label: 'Example Guide', slug: 'guides/example' },
                    ],
                },
                {
                    label: 'Reference',
                    autogenerate: { directory: 'reference' },
                },
                {
                    slug: 'contributing',
                },
            ],
            components: {
                // Override MarkdownContent to show tags and stub banners automatically
                MarkdownContent: './src/components/overrides/MarkdownContent.astro',
                // Override SiteTitle to add Tags link in header
                SiteTitle: './src/components/overrides/SiteTitle.astro',
            },
            plugins: [
                catppuccin(),
                starlightLinksValidator(),
            ],
        }),
    ],
});
