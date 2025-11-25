import { defineCollection, z } from "astro:content";
import { glob, file } from "astro/loaders";

// TODO: gallery content

const blog = defineCollection({
  loader: glob({ pattern: `**/*.{md,mdx}`, base: `./public/blog` }),
  schema: z.object({
    title: z.string(),
    image: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string())
  })
});

// const gallery = defineCollection();

export const collections = { blog };