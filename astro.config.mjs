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
  site: "https://3d-printing.wiki",
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
          items: [{ autogenerate: { directory: "build" } }],
        },
        {
          label: "Tuning and Calibration",
          items: [{ autogenerate: { directory: "tuning" } }],
        },
        {
          label: "Troubleshooting",
          items: [{ autogenerate: { directory: "troubleshooting" } }],
        },
        {
          label: "Slicing",
          items: [{ autogenerate: { directory: "slicing" } }],
        },
        {
          label: "CAD and Design",
          items: [{ autogenerate: { directory: "design" } }],
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
