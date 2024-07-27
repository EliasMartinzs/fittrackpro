"use client";

import { Button } from "@/components/ui/button";
import { BsPlus } from "react-icons/bs";
import { cn } from "@/lib/utils";
import { usarNovaDieta } from "../hooks/usar-nova-dieta";
import { pegarDietas } from "../api/pegar-dietas";
import { useMemo } from "react";
import { Loading } from "@/components/global/loading";

export const AbrirNovaDieta = () => {
  const { abrir } = usarNovaDieta();
  const { data, isLoading } = pegarDietas();

  const existeDieta = useMemo(() => {
    return data?.data !== undefined && data?.data?.length > 0;
  }, [data?.data]);

  if (isLoading) {
    return <Loading width={24} height={24} />;
  }

  return (
    <Button
      className={cn(
        "rounded-xl hover:bg-primary/70 transition-colors shadow-md flex items-center gap-2 bg-primary text-primary-foreground",
        data?.data.length !== 0 && "hidden"
      )}
      onClick={abrir}
      disabled={existeDieta}
    >
      {existeDieta ? (
        <>
          <p className="hidden lg:flex">Você já possui uma dieta criada.</p>
        </>
      ) : (
        <>
          <p>Criar nova dieta</p> <BsPlus className="size-6" />
        </>
      )}
    </Button>
  );
};
