import { conformZodMessage } from '@conform-to/zod';
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

export function SiteCreationSchema(options?: {
  isSubdirectoryUnique?: () => Promise<boolean>;
}) {
  return z.object({
    subdirectory: z.string().min(3).max(255)
      .regex(/^[a-z0-9-]+$/, "Subdirectory must be lowercase, ")
      .transform((value) => value.toLowerCase())
      .pipe(z.string().superRefine((email, ctx) => {
        if (typeof options?.isSubdirectoryUnique !== 'function') {
          ctx.addIssue({
            code: "custom",
            message: conformZodMessage.VALIDATION_UNDEFINED,
            fatal: true,
          });
          return;
        }

        return options.isSubdirectoryUnique().then((isUnique) => {
          if (!isUnique) {
            ctx.addIssue({
              code: "custom",
              message: "Subdirectory is already in use...",
            })
          }
        })
      })
    ),
  name: z.string().min(3).max(255),
  description: z.string().min(3).max(255),
  });
}
  