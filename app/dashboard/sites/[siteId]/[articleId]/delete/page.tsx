import { SubmitButtons } from "@/components/SubmitButtons";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DeletePostAction } from "@/lib/actions/actions";
import Link from "next/link";

export default function DeleteForm({ params }: { params: { siteId: string, articleId: string } }) {
  return (
    <div className="flex flex-1 items-center justify-center">
      <Card className="max-w-xl">
        <CardHeader>
          <CardTitle>
            Are you sure you want to delete this article?
          </CardTitle>
          <CardDescription>
            This action cannot be undone. Please confirm if you want to delete this article.
          </CardDescription>
        </CardHeader>
        <CardFooter className="w-full flex justify-between">
          <Button variant="secondary" asChild>
            <Link href={`/dashboard/sites/${params.siteId}`}>
              Cancel
            </Link>
          </Button>
          <form action={DeletePostAction}>
            <input type="hidden" name="articleId" value={params.articleId} />
            <input type="hidden" name="siteId" value={params.siteId} />
            <SubmitButtons variant="destructive" text="Delete"/>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}