import { MobileSheet } from "@/components/mobile-top-bar/mobile-sheet";
import React from "react";
import { NovoTreino } from "../features/treinos/components/novo-treino";
import { NovaDieta } from "@/features/dietas/components/nova-dieta";
import { NovaRefeicao } from "@/features/dietas/components/nova-refeicao";
import { NovoAlimento } from "@/features/dietas/components/novo-alimentos";
import { NovoPesoAtual } from "@/features/dietas/components/novo-peso-atual";
import { AdicionarAgua } from "@/features/dietas/components/adicionar-agua";

export const SheetProvedor = () => {
  return (
    <>
      <MobileSheet />
      <NovoTreino />
      <NovaDieta />
      <NovaRefeicao />
      <NovoAlimento />
      <NovoPesoAtual />
      <AdicionarAgua />
    </>
  );
};
