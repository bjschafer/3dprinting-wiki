import { getCollection } from 'astro:content';

export interface TagInfo {
	name: string;
	slug: string;
	count: number;
}

export interface DocWithTags {
	id: string;
	slug: string;
	title: string;
	description?: string;
	tags: string[];
}

/**
 * Normalize a tag name to a URL-safe slug
 */
export function tagToSlug(tag: string): string {
	return tag
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '');
}

/**
 * Get all docs with their tags
 */
export async function getDocsWithTags(): Promise<DocWithTags[]> {
	const docs = await getCollection('docs');
	return docs
		.filter((doc) => doc.data.tags && doc.data.tags.length > 0)
		.map((doc) => ({
			id: doc.id,
			slug: doc.id.replace(/\.mdx?$/, ''),
			title: doc.data.title,
			description: doc.data.description,
			tags: doc.data.tags || [],
		}));
}

/**
 * Get all unique tags with their counts
 */
export async function getAllTags(): Promise<TagInfo[]> {
	const docs = await getDocsWithTags();
	const tagCounts = new Map<string, number>();

	for (const doc of docs) {
		for (const tag of doc.tags) {
			tagCounts.set(tag, (tagCounts.get(tag) || 0) + 1);
		}
	}

	return Array.from(tagCounts.entries())
		.map(([name, count]) => ({
			name,
			slug: tagToSlug(name),
			count,
		}))
		.sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get all docs that have a specific tag
 */
export async function getDocsByTag(tag: string): Promise<DocWithTags[]> {
	const docs = await getDocsWithTags();
	const normalizedTag = tag.toLowerCase();
	return docs.filter((doc) =>
		doc.tags.some((t) => t.toLowerCase() === normalizedTag)
	);
}

/**
 * Find the original tag name from a slug
 */
export async function getTagNameFromSlug(slug: string): Promise<string | null> {
	const tags = await getAllTags();
	const tag = tags.find((t) => t.slug === slug);
	return tag ? tag.name : null;
}
