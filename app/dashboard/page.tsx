import React from 'react';
import prisma from '../utils/db';
import { requireUser } from '../utils/requireUser';
import { EmptyState } from '@/components/EmptyState';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Defaultimage from '@/public/assets/default.png';

async function getData(userId: string) {
  const [sites, articles] = await Promise.all([
    prisma.site.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    }),

    prisma.post.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    }),
  ]);

  return {
    sites,
    articles,
  };
}

const DashboardIndexPage = async () => {
  const user = await requireUser();
  const { articles, sites } = await getData(user.id);

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-8">Your Sites</h1>
      {sites.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {sites.map((item) => (
            <Card key={item.id}>
              <Image
                src={item.imageUrl ?? Defaultimage}
                alt={item.name}
                className="rounded-t-lg object-cover w-full h-[200px]"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle className="truncate">{item.name}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/sites/${item.id}`}>
                    View Articles
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="You don't have any sites yet"
          description="Create a new site to get started."
          href="/dashboard/sites/new"
          buttonText="Create Site"
        />
      )}
      <h1 className="text-2xl font-semibold mt-10 mb-8">Recent Articles</h1>
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-7">
          {articles.map((item) => (
            <Card key={item.id}>
              <Image
                src={item.image ?? Defaultimage}
                alt={item.title}
                className="rounded-t-lg object-cover w-full h-[200px]"
                width={400}
                height={200}
              />
              <CardHeader>
                <CardTitle className="truncate">{item.title}</CardTitle>
                <CardDescription className="line-clamp-3">
                  {item.smallDescription}
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild className="w-full">
                  <Link href={`/dashboard/sites/${item.siteId}/${item.id}`}>
                    Edit Article
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <EmptyState
          title="You don't have any articles yet"
          description="Create a new article to get started."
          href="/dashboard/sites"
          buttonText="Create Article"
        />
      )}
    </div>
  );
};

export default DashboardIndexPage;
