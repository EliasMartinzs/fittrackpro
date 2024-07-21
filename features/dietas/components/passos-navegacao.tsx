import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as React from "react";

type Props = {
  passosData: {
    label: string;
    content: any;
  }[];
  passosAtual: number;
};

export const PassosNavegacao = ({ passosAtual, passosData }: Props) => {
  return (
    <div className="flex items-center justify-center gap-4">
      {passosData.map((_, index) => (
        <React.Fragment key={index}>
          <Button
            className={cn(
              "w-10 h-10 bg-accent grid place-items-center rounded-full",
              passosAtual === index && "bg-primary text-primary-foreground"
            )}
          >
            {index + 1}
          </Button>
          {index < passosData.length - 1 && (
            <Separator orientation="horizontal" className="w-10 mx-2" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
