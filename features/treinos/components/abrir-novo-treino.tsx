"use client";

import { Button } from "@/components/ui/button";
import { BsPlus } from "react-icons/bs";
import { usarNovoTreino } from "../hooks/usar-novo-treino-drawer";
import { cn } from "@/lib/utils";

export const AbrirNovoTreino = () => {
  const { abrir } = usarNovoTreino();

  return (
    <Button
      className={cn(
        "rounded-xl hover:bg-primary/70 transition-colors shadow-md flex items-center gap-2"
      )}
      variant="destructive"
      onClick={abrir}
    >
      <p className="hidden lg:flex">Criar novo treino</p>{" "}
      <BsPlus className="size-6" />
    </Button>
  );
};
