// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import catppuccin from "@catppuccin/starlight";
import starlightLinksValidator from 'starlight-links-validator';

// https://astro.build/config
export default defineConfig({
    integrations: [
        starlight({
            title: '3D Printing Wiki',
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
            plugins: [
                catppuccin(),
                starlightLinksValidator(),
            ],
        }),
    ],
});
