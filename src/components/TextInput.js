import React from "react";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import ErrorMessage from "./ErrorMessage";
import { FormControl, FormField, FormItem } from "./ui/form";
export default function TextInput({
  form,
  name,
  type,
  placeholder,
  className,
  icon,
}) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1 space-y-1 relative">
          {icon &&<span className="absolute top-3 left-3">{icon}</span>}
          <FormControl>
            <Input
              {...field}
              className={cn(
                "bg-transparent placeholder:text-muted-foreground focus:shadow-sm ring-offset-0 text-[14px] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0",
                className,
                icon && "pl-10",
                form.formState.errors[name] &&
                  "border-destructive text-destructive"
              )}
              type={type || "text"}
              placeholder={placeholder}
            />
          </FormControl>
          <ErrorMessage error={form.formState.errors[name]} />
        </FormItem>
      )}
    />
  );
}
