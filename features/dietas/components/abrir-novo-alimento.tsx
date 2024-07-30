"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { pegarDietas } from "../api/pegar-dietas";
import { usarNovoAlimento } from "../hooks/usar-novo-alimento";

export const AbrirNovoAlimento = () => {
  const { abrir } = usarNovoAlimento();
  const { data, isLoading } = pegarDietas();

  const visibilidadeButton =
    data !== undefined &&
    data?.data?.at(0)?.refeicoes?.at(0)?.alimentos.length !== 0;

  if (isLoading) {
    return;
  }

  return (
    <>
      <Button
        className={cn(
          "rounded-xl hover:bg-primary/70 transition-colors shadow-md flex items-center gap-2 hover:text-primary-foreground",
          visibilidadeButton && "hidden"
        )}
        variant="destructive"
        onClick={abrir}
      >
        <p className="flex">Adicionar alimento</p>
      </Button>
    </>
  );
};
