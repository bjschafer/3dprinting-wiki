import type { StarlightPlugin } from "@astrojs/starlight/types";

/**
 * Starlight plugin that automatically adds a "Stub" badge to sidebar entries
 * for pages that have `stub: true` in their frontmatter.
 */
export default function starlightStubBadge(): StarlightPlugin {
  return {
    name: "starlight-stub-badge",
    hooks: {
      "config:setup"({ addRouteMiddleware }) {
        addRouteMiddleware({
          entrypoint: "./src/plugins/stub-badge-middleware.ts",
        });
      },
    },
  };
}
