'use client';

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface SubmitButtonsProps {
  text: string
  className?: string
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
}


export function SubmitButtons({ text, className, variant }: SubmitButtonsProps) {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <Button 
          variant={variant}
          className={cn('w-fit', className)}
          disabled
        >
          <Loader2 className="animate-spin size-4 mr-2" />
          Please wait...
        </Button>
      ) : (
        <Button 
          variant={variant}
          className={cn('w-fit', className)}
          type="submit"
        >
          {text}
        </Button>
      )}
    </>
  )
}