import { cn } from "@/lib/utils";
import React from "react";

export const Wrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement & HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-3 md:px-5 lg:px-10 xl:px-16", className)}
    {...props}
  />
));
