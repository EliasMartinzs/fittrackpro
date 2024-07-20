import { MobileSheet } from "@/components/mobile-top-bar/mobile-sheet";
import React from "react";
import { NovoTreino } from "../features/treinos/components/novo-treino";

export const SheetProvedor = () => {
  return (
    <>
      <MobileSheet />
      <NovoTreino />
    </>
  );
};
