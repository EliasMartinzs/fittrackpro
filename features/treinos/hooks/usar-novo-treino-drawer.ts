import { create } from "zustand";

type UsarNovoTreino = {
  estaAberto: boolean;
  abrir: () => void;
  fechar: () => void;
};

export const usarNovoTreino = create<UsarNovoTreino>((set) => ({
  estaAberto: false,
  abrir: () => set({ estaAberto: true }),
  fechar: () => set({ estaAberto: false }),
}));
