import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

// TODO: gallery content

const blog = defineCollection({
  loader: glob({ pattern: `**/*.{md,mdx}`, base: `./public/blog` }),
  schema: z.object({
    title: z.string(),
    imageUrl: z.string().optional(),
    pubDate: z.coerce.date(),
    editDate: z.coerce.date().optional(),
    tags: z.array(z.string())
  })
});

// const gallery = defineCollection();

export const collections = { blog };