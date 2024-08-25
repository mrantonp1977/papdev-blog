'use client';

import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { CreateSiteAction } from '@/lib/actions/actions';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { siteSchema } from '@/app/utils/zodSchema';
import { useFormState } from 'react-dom';

const NewSiteRoute = () => {
  const [lastResult, action] = useFormState(CreateSiteAction, undefined);
  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, {
        schema: siteSchema,
      });
    },

    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput',
  });
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <Card className="max-w-[450px]">
        <CardHeader>
          <CardTitle className="text-2xl">Create Site</CardTitle>
          <CardDescription>
            Create your Site here. Click the buttom below once you done..
          </CardDescription>
        </CardHeader>
        <form action={action} id={form.id} onSubmit={form.onSubmit}>
          <CardContent>
            <div className="flex flex-col gap-y-6">
              <div className="flex flex-col gap-3">
                <Label className="text-lg">Site Name</Label>
                <Input
                  name={fields.name.name}
                  key={fields.name.key}
                  defaultValue={fields.name.initialValue}
                  placeholder="Site name..."
                />
                <p className="text-red-500 text-sm">{fields.name.errors}</p>
              </div>
              <div className="flex flex-col gap-3">
                <Label className="text-lg">Subdirectoty</Label>
                <Input
                  name={fields.subdirectory.name}
                  key={fields.subdirectory.key}
                  defaultValue={fields.subdirectory.initialValue}
                  placeholder="Subdirectory..."
                />
                <p className="text-red-500 text-sm">
                  {fields.subdirectory.errors}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Label className="text-lg">Description</Label>
                <Textarea
                  name={fields.description.name}
                  key={fields.description.key}
                  defaultValue={fields.description.initialValue}
                  placeholder="Small description for your site..."
                />
                <p className="text-red-500 text-sm">
                  {fields.description.errors}
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button>Submit</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default NewSiteRoute;
