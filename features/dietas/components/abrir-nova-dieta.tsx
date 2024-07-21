"use client";

import { Button } from "@/components/ui/button";
import { BsPlus } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { usarNovaDieta } from "../hooks/usar-nova-dieta";

export const AbrirNovaDieta = () => {
  const { abrir } = usarNovaDieta();

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
