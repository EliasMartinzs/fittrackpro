"use client";

import { usarMobileSheet } from "@/sheets/usar-mobile-sheet";
import { CiMenuFries } from "react-icons/ci";

export const AbrirMobileSheet = () => {
  const { abrir } = usarMobileSheet();

  return (
    <CiMenuFries
      className="size-5 rotate-180 cursor-pointer text-foreground"
      onClick={abrir}
    />
  );
};
