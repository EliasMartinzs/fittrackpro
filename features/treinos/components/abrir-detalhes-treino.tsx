"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BsPlus } from "react-icons/bs";
import { usarDetalhesTreino } from "../hooks/usar-detalhes-treino";

export const AbrirDetalhesTreino = () => {
  const { abrir } = usarDetalhesTreino();

  return (
    <Button
      className={cn(
        "rounded-xl hover:bg-primary/70 transition-colors shadow-md flex items-center gap-2"
      )}
      variant="destructive"
      onClick={abrir}
    >
      <p className="hidden lg:flex">Detalhes do treino</p>{" "}
    </Button>
  );
};
