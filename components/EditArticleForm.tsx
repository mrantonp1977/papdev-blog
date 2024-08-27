'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from './ui/button';
import { Atom } from 'lucide-react';
import { Textarea } from './ui/textarea';
import Image from 'next/image';
import { UploadDropzone } from '@/app/utils/UploadthingComponents';
import { SubmitButtons } from './SubmitButtons';
import TailwindEditor from './EditorWrapper';
import { toast } from 'sonner';
import { useState } from 'react';
import { JSONContent } from 'novel';
import { useFormState } from 'react-dom';
import { EditPostAction } from '@/lib/actions/actions';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { PostSchema } from '@/app/utils/zodSchema';
import slugify from 'react-slugify';

interface EditArticleFormProps {
  data: {
    id: string;
    title: string;
    articleContent: any;
    smallDescription: string;
    image: string;
    slug: string;
  };
  siteId: string;
}

export function EditArticleForm({ data, siteId }: EditArticleFormProps) {
  const [imageUrl, setImageUrl] = useState<string | undefined>(data.image);
  const [value, setValue] = useState<JSONContent | undefined>(data.articleContent);
  const [title, setTitle] = useState<string | undefined>(data.title);
  const [slug, setSlugValue] = useState<string | undefined>(data.slug);
  const [lastResult, action] = useFormState(EditPostAction, undefined);
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
    <Card className="mt-8">
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
          <input type="hidden" name='articleId' value={data.id}/>
          <input type="hidden" name='siteId' value={siteId}/>
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
            <Button
              className="w-fit mt-4"
              type="button"
              variant="secondary"
              onClick={handleSlugGeneration}
            >
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
              defaultValue={data.smallDescription}
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
          <SubmitButtons text="Edit Article" />
        </form>
      </CardContent>
    </Card>
  );
}
