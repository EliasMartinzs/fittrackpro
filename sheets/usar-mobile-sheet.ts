import { create } from "zustand";

type UsarMobileSheet = {
  estaAberto: boolean;
  abrir: () => void;
  fechar: () => void;
};

export const usarMobileSheet = create<UsarMobileSheet>((set) => ({
  estaAberto: false,
  abrir: () => set({ estaAberto: true }),
  fechar: () => set({ estaAberto: false }),
}));
