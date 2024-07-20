"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useMediaQuery } from "usehooks-ts";
import { usarNovoTreino } from "../hooks/usar-novo-treino-drawer";
import { NovoTreinoForm } from "./novo-treino-form";

export const NovoTreino = () => {
  const { estaAberto, fechar } = usarNovoTreino();
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    defaultValue: false,
    initializeWithValue: true,
  });

  if (isDesktop) {
    return (
      <Dialog open={estaAberto} onOpenChange={fechar}>
        <DialogContent className="overflow-y-auto ocultar-scrollbar py-4">
          <DialogHeader>
            <DialogTitle className="text-center font-medium">
              Cadastrar um novo Treino
            </DialogTitle>
          </DialogHeader>
          <NovoTreinoForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Sheet open={estaAberto} onOpenChange={fechar}>
      <SheetContent className="flex flex-col gap-y-6" side="left">
        <SheetHeader>
          <SheetTitle className="text-center font-medium">
            Cadastrar um novo Treino
          </SheetTitle>
        </SheetHeader>
        <NovoTreinoForm />
      </SheetContent>
    </Sheet>
  );
};
