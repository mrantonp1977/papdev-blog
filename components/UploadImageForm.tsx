'use client';

import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import Image from 'next/image';
import { UploadDropzone } from '@/app/utils/UploadthingComponents';
import { SubmitButtons } from './SubmitButtons';
import { toast } from 'sonner';
import { UpdateImageAction } from '@/lib/actions/actions';

interface UploadImageFormProps {
  siteId: string;
}

const UploadImageForm = ({siteId}: UploadImageFormProps) => {
  const [imageUrl, setImageUrl] = useState<undefined | string>(undefined);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Image</CardTitle>
        <CardDescription>Upload a new image for your site.</CardDescription>
      </CardHeader>
      <CardContent>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt="Uploaded image"
            width={200}
            height={200}
            className="size-[200px] rounded-lg object-cover"
          />
        ) : (
          <UploadDropzone
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res[0].url);
              toast.success('Image uploaded successfully');
            }}
            onUploadError={() => {
              toast.error('Image upload failed');
            }}
          />
        )}
      </CardContent>
      <CardFooter>
        <form action={UpdateImageAction}>
          <input type="hidden" name='siteId' value={siteId}/>
          <input type="hidden" name='imageUrl' value={imageUrl}/>
          <SubmitButtons text="Change Image" />
        </form>
      </CardFooter>
    </Card>
  );
};

export default UploadImageForm;
