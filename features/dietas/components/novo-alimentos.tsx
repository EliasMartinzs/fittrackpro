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
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "usehooks-ts";

import { usarNovoAlimento } from "../hooks/usar-novo-alimento";
import { NovoAlimentoForm } from "./novo-alimento-form";

export const NovoAlimento = () => {
  const { fechar, abrir, estaAberto } = usarNovoAlimento();
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar novo alimento a refeição</DialogTitle>
          </DialogHeader>
          <div>
            <NovoAlimentoForm />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={estaAberto} onOpenChange={handleOpenChange}>
      <DrawerContent ref={drawerRef}>
        <DrawerHeader className="text-center flex items-center justify-center gap-2">
          <DrawerTitle>Adicionar novo alimento a refeição</DrawerTitle>
        </DrawerHeader>
        <div className="mx-5">
          <div>
            <NovoAlimentoForm />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
