import { cn } from "@/lib/utils";

function H1({ className, ...props }) {
  return <h1 className={cn("text-heading text-2xl sm:text-4xl", className)} {...props} />;
}

function H2({ className, ...props }) {
  return <h1 className={cn("text-heading text-xl sm:text-3xl", className)} {...props} />;
}
function H3({ className, ...props }) {
  return <h1 className={cn("text-heading text-lg sm:text-2xl", className)} {...props} />;
}
function H4({ className, ...props }) {
  return <h1 className={cn("text-heading text-base sm:text-xl", className)} {...props} />;
}

export { H1, H2, H3, H4 };
