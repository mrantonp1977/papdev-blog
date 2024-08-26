import { z } from 'zod';

export const siteSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  subdirectory: z.string().min(3).max(255),  
});


export const PostSchema = z.object({
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  coverImage: z.string().min(1),
  smallDescription: z.string().min(3).max(255),
  articleContent: z.string().min(1),
});