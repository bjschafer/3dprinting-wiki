import { defineRouteMiddleware } from "@astrojs/starlight/route-data";
import { getCollection } from "astro:content";

// Cache stub IDs to avoid repeated collection queries
let stubIds: Set<string> | null = null;

async function getStubIds(): Promise<Set<string>> {
  if (stubIds) return stubIds;

  const docs = await getCollection("docs");
  stubIds = new Set(
    docs
      .filter((doc) => (doc.data as { stub?: boolean }).stub === true)
      .map((doc) => doc.id)
  );
  return stubIds;
}

interface SidebarLink {
  type: "link";
  label: string;
  href: string;
  isCurrent: boolean;
  badge?: { text: string; variant: "note" | "tip" | "caution" | "danger" | "success" | "default" };
  attrs: Record<string, string | number | boolean | undefined>;
}

interface SidebarGroup {
  type: "group";
  label: string;
  entries: SidebarEntry[];
  collapsed: boolean;
  badge?: { text: string; variant: "note" | "tip" | "caution" | "danger" | "success" | "default" };
}

type SidebarEntry = SidebarLink | SidebarGroup;

/**
 * Convert href like "/tuning/first-layer/" to content ID like "tuning/first-layer"
 */
function hrefToContentId(href: string): string {
  return href.replace(/^\//, "").replace(/\/$/, "");
}

function addStubBadges(entries: SidebarEntry[], stubIds: Set<string>): void {
  for (const entry of entries) {
    if (entry.type === "link") {
      // Convert href to content ID format and check if it's a stub
      const contentId = hrefToContentId(entry.href);
      if (stubIds.has(contentId)) {
        entry.badge = {
          text: "Stub",
          variant: "caution",
        };
      }
    } else if (entry.type === "group") {
      // Recursively process group entries
      addStubBadges(entry.entries, stubIds);
    }
  }
}

export const onRequest = defineRouteMiddleware(async (context) => {
  const starlightRoute = context.locals.starlightRoute;
  if (!starlightRoute?.sidebar) return;

  const stubIds = await getStubIds();
  addStubBadges(starlightRoute.sidebar as SidebarEntry[], stubIds);
});
