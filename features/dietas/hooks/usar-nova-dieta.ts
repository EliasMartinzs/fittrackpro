import { create } from "zustand";

type Props = {
  estaAberto: boolean;
  abrir: () => void;
  fechar: () => void;
};

export const usarNovaDieta = create<Props>((set) => ({
  estaAberto: false,
  abrir: () => set({ estaAberto: true }),
  fechar: () => set({ estaAberto: false }),
}));
