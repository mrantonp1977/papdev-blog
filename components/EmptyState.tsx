import { FileIcon, PlusCircle } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  href: string;
}

export function EmptyState({ title, description, buttonText, href }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="flex size-20 items-center justify-center rounded-full bg-primary/10">
        <FileIcon className="text-primary size-10" />
      </div>
      <h2 className="text-2xl mt-6 font-semibold">{title}</h2>
      <p className="mb-8 mt-2 text-center text-md text-muted-foreground">
        {description}
      </p>
      <Button asChild>
        <Link href={href}>
          <PlusCircle size={18} className="mr-2" />
          {buttonText}
        </Link>
      </Button>
    </div>
  );
}
