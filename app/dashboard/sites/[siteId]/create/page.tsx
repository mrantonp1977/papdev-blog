'use client';

import { UploadDropzone } from '@/app/utils/UploadthingComponents';
import TailwindEditor from '@/components/EditorWrapper';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Atom } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { JSONContent } from 'novel';
import React, { useState } from 'react';
import { toast } from "sonner"


const ArticleCreationRoute = ({ params }: { params: { siteId: string } }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [value, setValue] = useState<JSONContent | undefined>(undefined);

  return (
    <>
      <div className="flex items-center">
        <Button size="icon" variant="outline" className="mr-4" asChild>
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-xl font-semibold">Create Article</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Article Details</CardTitle>
          <CardDescription>Small description about the article</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input placeholder="Nextjs blog application" />
            </div>
            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input placeholder="Article Slug" />
              <Button className="w-fit mt-4" type="button" variant="secondary">
                <Atom className="mr-2 size-4" />
                Generate Slug
              </Button>
            </div>
            <div className="grid gap-2">
              <Label>Small description</Label>
              <Textarea
                placeholder="Small description for your article... "
                className="h-32"
              />
            </div>
            <div className="grid gap-2">
              <Label>Cover Image</Label>
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Image"
                  className="object-cover w-[200px] h-[200px] rounded-lg"
                  width={200}
                  height={200}
                />
              ) : (
                <UploadDropzone
                  onClientUploadComplete={(res) => {
                    setImageUrl(res[0].url);
                    toast.success("Image uploaded successfully")
                  }}
                  endpoint="imageUploader"
                  onUploadError={() => {
                    toast.error("Image upload failed")
                  }}
                />
              )}
            </div>
            <div className="grid gap-2">
              <label>Article Content</label>
              <TailwindEditor onChange={setValue} initialValue={value}/>
            </div>
            <Button type="submit" className="w-fit">
              Create Article
            </Button>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default ArticleCreationRoute;
