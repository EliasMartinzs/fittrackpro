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

import { usarNovaRefeicao } from "../hooks/usar-nova-refeicao";
import { NovaRefeicaoForm } from "./nova-refeicao-form";

export const NovaRefeicao = () => {
  const { fechar, abrir, estaAberto } = usarNovaRefeicao();
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
            <DialogTitle>Criar nova refeição</DialogTitle>
          </DialogHeader>
          <div>
            <NovaRefeicaoForm />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={estaAberto} onOpenChange={handleOpenChange}>
      <DrawerContent ref={drawerRef}>
        <DrawerHeader className="text-center flex items-center justify-center gap-2">
          <DrawerTitle>Criar nova refeição</DrawerTitle>
        </DrawerHeader>
        <div className="mx-5">
          <div>
            <NovaRefeicaoForm />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
