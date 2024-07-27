import {
  Tooltip as TooltipMain,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
  trigger: React.ReactNode;
  label: string;
};

export const Tooltip = ({ label, trigger }: Props) => {
  return (
    <TooltipProvider>
      <TooltipMain>
        <TooltipTrigger>{trigger}</TooltipTrigger>
        <TooltipContent>
          <p>{label}</p>
        </TooltipContent>
      </TooltipMain>
    </TooltipProvider>
  );
};
