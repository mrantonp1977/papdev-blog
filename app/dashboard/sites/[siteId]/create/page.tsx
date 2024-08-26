'use client';

import { UploadDropzone } from '@/app/utils/UploadthingComponents';
import { PostSchema } from '@/app/utils/zodSchema';
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
import { CreatePostAction } from '@/lib/actions/actions';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { ArrowLeft, Atom } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { JSONContent } from 'novel';
import React, { useState } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'sonner';
import  slugify  from  'react-slugify';
import { SubmitButtons } from '@/components/SubmitButtons';

const ArticleCreationRoute = ({ params }: { params: { siteId: string } }) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [value, setValue] = useState<JSONContent | undefined>(undefined);
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [slug, setSlugValue] = useState<string | undefined>(undefined);
  const [lastResult, action] = useFormState(CreatePostAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: PostSchema,
      });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });

  function handleSlugGeneration() {
    const titleInput = title;

    if (titleInput?.length === 0 || titleInput === undefined) {
      return toast.error('Title is required to generate slug');
    }

    setSlugValue(slugify(titleInput));

    return toast.success('Slug generated successfully');
  }

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
          <form
            className="flex flex-col gap-6"
            id={form.id}
            onSubmit={form.onSubmit}
            action={action}
          >
            <input type="hidden" name='siteId' value={params.siteId}/>
            <div className="grid gap-2">
              <Label>Title</Label>
              <Input
                key={fields.title.key}
                name={fields.title.name}
                defaultValue={fields.title.initialValue}
                placeholder="Nextjs blog application"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              <p className="text-red-500 text-sm">{fields.title.errors}</p>
            </div>
            <div className="grid gap-2">
              <Label>Slug</Label>
              <Input
                placeholder="Article Slug"
                key={fields.slug.key}
                name={fields.slug.name}
                defaultValue={fields.slug.initialValue}
                onChange={(e) => setSlugValue(e.target.value)}
                value={slug}
              />
              <Button className="w-fit mt-4" type="button" variant="secondary" onClick={handleSlugGeneration}>
                <Atom className="mr-2 size-4" />
                Generate Slug
              </Button>
              <p className="text-red-500 text-sm">{fields.slug.errors}</p>
            </div>
            <div className="grid gap-2">
              <Label>Small description</Label>
              <Textarea
                key={fields.smallDescription.key}
                name={fields.smallDescription.name}
                defaultValue={fields.smallDescription.initialValue}
                placeholder="Small description for your article... "
                className="h-32"
              />
              <p className="text-red-500 text-sm">
                {fields.smallDescription.errors}
              </p>
            </div>
            <div className="grid gap-2">
              <Label>Cover Image</Label>
              <input
                type="hidden"
                key={fields.coverImage.key}
                name={fields.coverImage.name}
                defaultValue={fields.coverImage.initialValue}
                value={imageUrl}
              />
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
                    toast.success('Image uploaded successfully');
                  }}
                  endpoint="imageUploader"
                  onUploadError={() => {
                    toast.error('Image upload failed');
                  }}
                />
              )}
              <p className="text-red-500 text-sm">{fields.coverImage.errors}</p>
            </div>
            <div className="grid gap-2">
              <label>Article Content</label>
              <input
                type="hidden"
                key={fields.articleContent.key}
                name={fields.articleContent.name}
                defaultValue={fields.articleContent.initialValue}
                value={JSON.stringify(value)}
              />
              <TailwindEditor onChange={setValue} initialValue={value} />
              <p className="text-red-500 text-sm">
                {fields.articleContent.errors}
              </p>
            </div>
            <SubmitButtons text="Create Article" />
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default ArticleCreationRoute;
