import React from "react";
import { TriangleAlert } from "lucide-react";
import { FormMessage } from "./ui/form";

export default function ErrorMessage({ error }) {
  return (
    error && (
      <div className="flex items-center gap-1">
        <TriangleAlert className="size-3 text-destructive" />
        <FormMessage className="text-destructive text-[13px] font-normal" />
      </div>
    )
  );
}
