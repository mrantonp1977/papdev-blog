"use server";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
import { parseWithZod } from "@conform-to/zod";
import { PostSchema, SiteCreationSchema, siteSchema } from "@/app/utils/zodSchema";
import prisma from "@/app/utils/db";
import { requireUser } from "@/app/utils/requireUser";

export async function CreateSiteAction(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = await parseWithZod(formData, {
    schema: SiteCreationSchema({
      async isSubdirectoryUnique() {
        const existingSubDirectory = await prisma.site.findUnique({
          where: {
            subdirectory: formData.get('subdirectory') as string,
          }
        });
        return !existingSubDirectory;
      },
    }),
    async: true,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const response = await prisma.site.create({
    data: {
      description: submission.value.description,
      name: submission.value.name,
      subdirectory: submission.value.subdirectory,
      userId: user.id,
    }
  })

  return redirect('/dashboard/sites');
}


export async function CreatePostAction(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: PostSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.post.create({
    data: {
      title: submission.value.title,
      smallDescription: submission.value.smallDescription,
      slug: submission.value.slug,
      articleContent: JSON.parse(submission.value.articleContent),
      image: submission.value.coverImage,
      userId: user.id,
      siteId: formData.get('siteId') as string,
    }
  });

  return redirect(`/dashboard/sites/${formData.get('siteId')}`);
}


export async function EditPostAction(prevState: any, formData: FormData) {
  const user = await requireUser();

  const submission = parseWithZod(formData, {
    schema: PostSchema,
  });

  if (submission.status !== "success") {
    return submission.reply();
  }

  const data = await prisma.post.update({
    where: {
      id: formData.get('articleId') as string,
      userId: user.id,
    },
    data: {
      title: submission.value.title,
      smallDescription: submission.value.smallDescription,
      slug: submission.value.slug,
      articleContent: JSON.parse(submission.value.articleContent),
      image: submission.value.coverImage,
    }
  });

  return redirect(`/dashboard/sites/${formData.get('siteId')}`);
}

export async function DeletePostAction(formData: FormData) {
  const user = await requireUser();

  const data = await prisma.post.delete({
    where: {
      id: formData.get('articleId') as string,
      userId: user.id,
    },
  });
  return redirect(`/dashboard/sites/${formData.get('siteId')}`);
}

export async function UpdateImageAction(formData: FormData) {
  const user = await requireUser();

  const data = await prisma.site.update({
    where: {
      id: formData.get('siteId') as string,
      userId: user.id,
    },
    data: {
      imageUrl: formData.get('imageUrl') as string,
    }
  });

  return redirect(`/dashboard/sites/${formData.get('siteId')}`);
}

export async function DeleteSiteAction(formData: FormData) {
  const user = await requireUser();

  const data = await prisma.site.delete({
    where: {
      id: formData.get('siteId') as string,
      userId: user.id,
    },
  });

  return redirect('/dashboard/sites');
}