import prisma from '@/app/utils/db';
import { Button } from '@/components/ui/button';
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { Book, FileIcon, PlusCircle, Settings } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

async function getData(userId: string, siteId: string) {
  const data = await prisma.post.findMany({
    where: {
      userId,
      siteId,
    },
    select: {
      id: true,
      title: true,
      image: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return data;
}

const SiteIdRoute = async ({ params }: { params: { siteId: string } }) => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user) {
    return redirect('/api/auth/login');
  }

  const data = await getData(user.id, params.siteId);

  return (
    <>
      <div className="flex w-full justify-end gap-x-4">
        <Button asChild variant="outline">
          <Link href="#">
            <Book className="mr-2 size-4" />
            View Blog
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="#">
            <Settings className="mr-2 size-4" />
            Settings
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/dashboard/sites/${params.siteId}/create`}>
            <PlusCircle className="mr-2 size-4" />
            Create Article
          </Link>
        </Button>
      </div>
      {data === undefined || data.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
          <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
            <FileIcon className="text-primary size-10" />
          </div>
          <h2 className="text-2xl mt-6 font-semibold">No Sites created yet</h2>
          <p className="mb-8 mt-2 text-center text-md text-muted-foreground">
            You currently do not have any sites. Please create one or more to
            display them here.
          </p>
          <Button asChild>
            <Link href={'/dashboard/sites/new'}>
              <PlusCircle size={18} className="mr-2" />
              Create Site
            </Link>
          </Button>
        </div>
      ) : (
        <h1>Data</h1>
      )}
    </>
  );
};

export default SiteIdRoute;
