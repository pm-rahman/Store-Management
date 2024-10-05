import React from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
export default function TransparentInput({
  className,
  value,
  error,
  ...props
}) {
  return (
    <Input
      {...props}
      className={cn(
        "bg-transparent placeholder:text-muted-foreground focus:shadow-sm ring-offset-0 text-[14px] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0",
        className,
        error && "border-destructive text-destructive"
      )}
    />
  );
}
