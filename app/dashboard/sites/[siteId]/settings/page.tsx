import { SubmitButtons } from '@/components/SubmitButtons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import UploadImageForm from '@/components/UploadImageForm';
import { DeleteSiteAction } from '@/lib/actions/actions';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function SettingsSiteRoute({
  params,
}: {
  params: { siteId: string };
}) {
  return (
    <>
      <div className="flex items-center gap-x-2">
        <Button variant="outline" size="icon" className="mr-3">
          <Link href={`/dashboard/sites/${params.siteId}`}>
            <ChevronLeft className="size-6" />
          </Link>
        </Button>
        <h3 className="text-xl font-semibold">Go back</h3>
      </div>
      <UploadImageForm siteId={params.siteId} />
      <Card className="border-red-500 bg-red-500/5">
        <CardHeader>
          <CardTitle className="text-red-500">Danger Zone</CardTitle>
          <CardDescription>
            This will delete the site and all its data. This action is
            irreversible.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <form action={DeleteSiteAction}>
            <input type="hidden" name='siteId' value={params.siteId} />
            <SubmitButtons text="Delete" variant="destructive" />
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
