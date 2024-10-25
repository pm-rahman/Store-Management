import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { FormControl, FormField, FormItem } from "./ui/form";
import ErrorMessage from "./ErrorMessage";
import { cn } from "@/lib/utils";
import { Input } from "./ui/input";

export default function PasswordInput({
  form,
  name,
  type,
  placeholder,
  className,
  icon,
}) {
  const [isShowPassword, setIsShowPassword] = React.useState(false);
  return (
    <FormField
      control={form.control}
      name={name || "password"}
      render={({ field }) => (
        <FormItem className="flex-1 space-y-1 relative">
          {icon && <span className="absolute top-3 left-3">{icon}</span>}
          <FormControl>
            <div className="flex-1 relative">
              <Input
                type={`${!isShowPassword ? type || "password" : "text"}`}
                {...field}
                className={cn(
                  "bg-transparent placeholder:text-muted-foreground focus:shadow-sm ring-offset-0 text-[14px] focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0",
                  className,
                  icon && "pl-10",
                  form.formState.errors[name || "password"] &&
                    "border-destructive text-destructive"
                )}
                placeholder={placeholder || "Enter password"}
              />
              <span className="absolute right-3 top-[25%] size-fit cursor-pointer">
                {!isShowPassword ? (
                  <Eye
                    onClick={() => setIsShowPassword(true)}
                    className="size-5 stroke-gray-400"
                  />
                ) : (
                  <EyeOff
                    onClick={() => setIsShowPassword(false)}
                    className="size-5 stroke-gray-400"
                  />
                )}
              </span>
            </div>
          </FormControl>
          <ErrorMessage error={form.formState.errors[name || "password"]} />
        </FormItem>
      )}
    />
  );
}
