import { Loader } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export default function SubmitButton({ form, className,btnTitle, ...props }) {
  return (
    <Button
      {...props}
      className={cn(
        "w-full hover:bg-primary-700 text-base",
        className,
        form.formState.isSubmitting&&'opacity-60'
      )}
    >
      {form.formState.isSubmitting && (
        <Loader className="animate-spin size-4 mr-1" />
      )}
      {btnTitle||'Save'}
    </Button>
  );
}
