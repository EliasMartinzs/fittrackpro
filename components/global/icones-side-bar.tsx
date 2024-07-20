"use client";

import { sidebarIcones } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

type Props = {
  fechar?: () => void;
};

export const IconesSideBar = ({ fechar }: Props) => {
  const pathname = usePathname();
  const matches = useMediaQuery("(max-width: 768px)", {
    defaultValue: false,
    initializeWithValue: false,
  });

  return (
    <div className="flex flex-col gap-3 lg:gap-7">
      {sidebarIcones.map(({ icon, href, label }) => {
        const Icon = icon;

        return (
          <Link href={href} key={href}>
            {matches ? (
              <div
                className="bg-accent py-5 rounded-2xl shadow-sm flex items-center justify-center gap-3 text-center hover:bg-accent/70 border border-border/70 transition-colors"
                onClick={fechar}
              >
                <Icon className={cn("size-7")} />
                <small className="text-muted-foreground">{label}</small>
              </div>
            ) : (
              <div
                className={cn(
                  "size-10 hover:bg-primary/70 transition-colors grid place-items-center rounded-xl shadow-sm",
                  pathname === href && "bg-primary/80"
                )}
              >
                <Icon
                  className={cn("size-8", pathname === href && "text-white")}
                />
              </div>
            )}
          </Link>
        );
      })}
    </div>
  );
};
