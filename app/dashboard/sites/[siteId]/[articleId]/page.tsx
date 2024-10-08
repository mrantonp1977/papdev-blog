import prisma from '@/app/utils/db';
import { EditArticleForm } from '@/components/EditArticleForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getData(postId: string) {
  const data = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      image: true,
      title: true,
      smallDescription: true,
      slug: true,
      articleContent: true,
      id: true,
    },
  });

  if (!data) {
    return notFound();
  }

  return data;
}

export default async function EditRoute({
  params,
}: {
  params: { articleId: string, siteId: string };
}) {
  const data = await getData(params.articleId);
  return (
    <div className="">
      <div className="flex items-center">
        <Button variant="outline" size="icon" asChild className="mr-4">
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="font-semibold text-2xl">Edit Article</h1>
      </div>
      <EditArticleForm data={data} siteId={params.siteId}/>
    </div>
  );
}
