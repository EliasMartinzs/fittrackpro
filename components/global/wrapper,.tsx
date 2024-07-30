import { cn } from "@/lib/utils";
import React from "react";

export const Wrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement & HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-2 lg:max-w-5xl lg:mx-auto", className)}
    {...props}
  />
));

Wrapper.displayName = "Wrapper";
