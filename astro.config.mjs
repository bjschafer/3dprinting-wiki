// @ts-check
import starlight from "@astrojs/starlight";
import catppuccin from "@catppuccin/starlight";
import { defineConfig } from "astro/config";
import starlightLinksValidator from "starlight-links-validator";
import starlightStubBadge from "./src/plugins/starlight-stub-badge";

// https://astro.build/config
export default defineConfig({
  image: {
    layout: "constrained",
  },
  integrations: [
    starlight({
      title: "3D Printing Wiki",
      editLink: {
        baseUrl: "https://github.com/bjschafer/3dprinting-wiki/edit/main/",
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/bjschafer/3dprinting-wiki",
        },
      ],
      sidebar: [
        {
          label: "Build",
          autogenerate: { directory: "build" },
        },
        {
          label: "Tuning and Calibration",
          autogenerate: { directory: "tuning" },
        },
        {
          label: "Troubleshooting",
          autogenerate: { directory: "troubleshooting" },
        },
        {
          label: "CAD and Design",
          autogenerate: { directory: "design" },
        },
        {
          slug: "useful-links",
        },
        {
          slug: "contributing",
        },
      ],
      components: {
        // Override MarkdownContent to show tags and stub banners automatically
        MarkdownContent: "./src/components/overrides/MarkdownContent.astro",
        // Override SiteTitle to add Tags link in header
        SiteTitle: "./src/components/overrides/SiteTitle.astro",
      },
      plugins: [starlightStubBadge(), catppuccin(), starlightLinksValidator()],
    }),
  ],
});
