"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { useMediaQuery } from "usehooks-ts";
import { usarNovoTreino } from "../hooks/usar-novo-treino-drawer";
import { NovoTreinoForm } from "./novo-treino-form";
import { useEffect, useRef } from "react";

export const NovoTreino = () => {
  const { estaAberto, fechar, abrir } = usarNovoTreino();
  const isDesktop = useMediaQuery("(min-width: 768px)", {
    defaultValue: false,
    initializeWithValue: true,
  });

  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        drawerRef.current &&
        !drawerRef.current.contains(target) &&
        !document.querySelector(".select-content")?.contains(target)
      ) {
        fechar();
      }
    };

    if (estaAberto && !isDesktop) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [estaAberto, isDesktop, fechar]);

  const handleOpenChange = (open: boolean) => {
    if (open) {
      abrir();
    } else {
      fechar();
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={estaAberto} onOpenChange={handleOpenChange}>
        <DialogContent className="overflow-y-auto ocultar-scrollbar py-4">
          <DialogHeader>
            <DialogTitle className="text-center font-medium">
              Cadastrar um novo treino
            </DialogTitle>
          </DialogHeader>
          <NovoTreinoForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={estaAberto} onOpenChange={handleOpenChange}>
      <DrawerContent ref={drawerRef} className="">
        <DrawerHeader className="text-left">
          <DrawerTitle>Cadastrar um noivo treino</DrawerTitle>
        </DrawerHeader>
        <div className="mx-5 overflow-y-auto ocultar-scrollbar">
          <NovoTreinoForm />
        </div>
      </DrawerContent>
    </Drawer>
  );
};
