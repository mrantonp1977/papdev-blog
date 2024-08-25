import { z } from 'zod';

export const siteSchema = z.object({
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  subdirectory: z.string().min(3).max(255),
  
});