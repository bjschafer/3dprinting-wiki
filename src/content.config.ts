import { docsLoader } from '@astrojs/starlight/loaders';
import { docsSchema } from '@astrojs/starlight/schema';
import { defineCollection, z } from 'astro:content';

export const collections = {
	docs: defineCollection({
		loader: docsLoader(),
		schema: docsSchema({
			extend: z.object({
				// Tags for categorization (printer families, topics, etc.)
				tags: z.array(z.string()).optional(),
				// Mark articles as stubs/needing improvement
				stub: z.boolean().optional(),
			}),
		}),
	}),
};
