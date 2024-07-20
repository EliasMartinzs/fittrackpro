import { Loader2 } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {
  width: number;
  height: number;
};

export const Loading = ({ height, width }: Props) => {
  return <Loader2 width={width} height={height} className="animate-spin" />;
};
