"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BsPlus } from "react-icons/bs";
import { pegarDietas } from "../api/pegar-dietas";
import { usarNovaRefeicao } from "../hooks/usar-nova-refeicao";

export const AbrirNovaRefeicao = () => {
  const { abrir } = usarNovaRefeicao();
  const { data, isLoading } = pegarDietas();

  if (isLoading) {
    return;
  }

  return (
    <>
      <Button
        className={cn(
          "rounded-xl hover:bg-primary/70 transition-colors shadow-md flex items-center gap-2 hover:text-primary-foreground",
          data?.data.length === 0 && "hidden"
        )}
        variant="destructive"
        onClick={abrir}
      >
        <p className="flex">Criar refeicão</p>
      </Button>
    </>
  );
};
