import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  width: number;
  height: number;
  color?: string;
};

export const Loading = ({ height, width, color = "foreground" }: Props) => {
  return (
    <Loader2
      width={width}
      height={height}
      className={`animate-spin text-${color}`}
    />
  );
};
